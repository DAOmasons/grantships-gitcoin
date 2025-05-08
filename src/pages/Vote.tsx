import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  Rating,
  Slider,
  Stack,
  Tabs,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layout/Page';
import {
  IconStar,
  IconStarFilled,
  IconUfo,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { PromptSchema, testAIServer } from '../utils/ai';
import { useAccount } from 'wagmi';
import { getUserProof } from '../utils/merkle';
import { notifications } from '@mantine/notifications';
import { publicClient } from '../utils/config';
import { ADDR } from '../constants/addresses';
import MerklePointsABI from '../abi/MerklePoints.json';
import gtcLogo from '../assets/gitcoin-gtc-logo.png';
import { TxButton } from '../components/TxButton';

const vectors = [
  {
    key: 'new_funding_mechanism',
    label: 'Innovating new allocation mechanisms is very important',
    rating: 0,
  },
  {
    key: 'matching_donations',
    label: 'Total matching donations are a very important metric',
    rating: 0,
  },
  {
    key: 'participation_count',
    label: 'The amount of participating addresses is an important metric',
    rating: 0,
  },
  {
    key: 'community_events',
    label: 'The quantity of community events and engagement is important',
    rating: 0,
  },
  {
    key: 'project_completion_rate',
    label:
      'The amount of completed or mature projects funded is an important metric',
    rating: 0,
  },
];

export const Vote = () => {
  return (
    <PageLayout title="Vote">
      <Tabs defaultValue="vote" mb={70}>
        <Tabs.List mb="md">
          <Tabs.Tab value="vote" leftSection={<IconStar size={14} />}>
            Vote
          </Tabs.Tab>
          <Tabs.Tab value="results" leftSection={<IconUsersGroup size={14} />}>
            Results
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="vote">
          <VoteUI />
        </Tabs.Panel>
        <Tabs.Panel value="results">
          <></>
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};

const VoteUI = () => {
  const { address } = useAccount();
  const [proof, setProof] = useState('');
  const [checkingEligible, setCheckingEligible] = useState(false);
  const [eligible, setEligible] = useState<boolean | undefined>(false);

  useLayoutEffect(() => {
    // check local storage for proof

    if (!address) {
      return;
    }

    const proof = localStorage.getItem(`proof-${address}`);

    if (proof) {
      setEligible(true);
    }
  }, [address]);

  const checkEligibility = async () => {
    try {
      setCheckingEligible(true);
      if (!address) {
        // notifications.show({
        //   title: 'Error',
        //   message: 'Please connect your wallet to check your eligibility',
        // });
        setCheckingEligible(false);
        return;
      }

      const proofFromServer = await getUserProof(address);

      if (!proofFromServer) {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Error fetching proof from server',
        });
        setCheckingEligible(false);
        return;
      }

      if (!proofFromServer.length) {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'You are not eligible to vote. Please check your wallet.',
        });
        setCheckingEligible(false);
        setEligible(false);
        return;
      }

      const isEligible = await publicClient.readContract({
        address: ADDR.MERKLE_POINTS,
        abi: MerklePointsABI,
        functionName: 'verifyPoints',
        args: [address, 1e18, proofFromServer],
      });

      if (isEligible) {
        // localStorage.setItem(`proof-${address}`, proofFromServer);
        setProof(proofFromServer);
        setEligible(true);
        setCheckingEligible(false);
      } else {
        setEligible(false);
        setCheckingEligible(false);
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'You are not eligible to vote',
        });
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
      notifications.show({
        title: 'Error',
        // color: 'red',
        message: 'Error checking eligibility',
      });
      setCheckingEligible(false);
      return;
    }
  };

  if (!eligible) {
    return (
      <Box mb={'lg'}>
        <Title order={3} fz={'h3'} mb={'xl'}>
          Welcome to the New GTC Voting system
        </Title>
        <Group justify="center">
          <Avatar src={gtcLogo} size={171} mb="xl" />
        </Group>
        <Text c="subtle" mb="sm">
          To participate in the voting process, you need to verify your
          eligibility. Click the button below to check if you're eligible to
          vote.
        </Text>
        <Text mb="sm">
          In order to be eligible, you must hold at least 100 GTC tokens on
          mainnet before May 11th 2024.
        </Text>
        <Group justify="center" mt="xxl">
          <TxButton onClick={checkEligibility} loading={checkingEligible}>
            Check Eligibility
          </TxButton>
        </Group>
      </Box>
    );
  }

  return (
    <Box>
      <VoteReady />
    </Box>
  );
};

const VoteReady = () => {
  const { colors } = useMantineTheme();

  const [context, setContext] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [sliders, setSliders] = useState<{ label: string; value: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const loadingShipRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

  const [ratings, setRatings] = useState(vectors);
  const handleRatingChange = (key: string, value: number) => {
    const updatedRatings = ratings.map((vector) =>
      vector.key === key ? { ...vector, rating: value } : vector
    );
    setRatings(updatedRatings);
  };

  const handleSubmit = async () => {
    if (!ratings.every((rating) => rating.rating)) {
      return;
    }

    const seedRatings = ratings.reduce((acc, rating) => {
      acc[rating.key] = rating.rating;
      return acc;
    }, {});

    const promptSeed = {
      ...seedRatings,
      context: context,
    };
    setIsLoading(true);

    setTimeout(() => {
      if (loadingShipRef.current) {
        loadingShipRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 400);

    const result = await testAIServer(promptSeed as PromptSchema);

    const reasoning = result?.data?.reasoning;

    if (!reasoning) {
      console.error('No reasoning provided');
      console.log('result', result);
      return;
    }

    setReasoning(reasoning);

    setSliders(
      result.data.allocations
        .map((allocation) => ({
          label: allocation.program,
          value: allocation.percentage,
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
    );

    setIsLoading(false);

    setTimeout(() => {
      if (readoutRef.current) {
        readoutRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 400);
  };

  return (
    <Box>
      <Box mb={'lg'}>
        <Title order={3} fz={'h3'} mb={'xl'}>
          Welcome to the New GTC Voting system
        </Title>
        <Text c="subtle" mb="sm">
          You'll go through a set of questions to express your preferences and
          rank what matters most to you. Feel free to add comments if you want
          to explain your thoughts. Click a star from 1 to 5 to rate, then press
          Submit to confirm your choice.
        </Text>
        <Text c="subtle" mb="sm">
          Once you submit your responses, AI will process the data to understand
          your priorities. Based on this, you'll receive a suggested vote that
          aligns with what you value most.
        </Text>
      </Box>
      <Stack mb="xl">
        {ratings.map((vector) => (
          <Card bg={colors.dark[6]} p={24} h={120} key={vector.key}>
            <Text fz="lg" mb={10}>
              {vector.label}
            </Text>
            <Rating
              color={colors.purple[6]}
              size={24}
              value={vector.rating}
              onChange={(value) => handleRatingChange(vector.key, value)}
              emptySymbol={
                <IconStar size={24} color={colors.purple[6]} stroke={1.5} />
              }
              fullSymbol={<IconStarFilled size={24} color={colors.purple[6]} />}
            />
          </Card>
        ))}

        <Card bg={colors.dark[6]}>
          <Text fz="lg" mb={'sm'}>
            Would you like to add more context? (Optional)
          </Text>
          <Textarea
            variant="inset"
            size="sm"
            onChange={(e) => setContext(e.currentTarget.value)}
          />
        </Card>
      </Stack>
      {!reasoning && (
        <Group justify="center">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            loading={isLoading}
          >
            {isLoading ? 'Generating...' : 'Submit'}
          </Button>
        </Group>
      )}

      <Stack
        my={70}
        justify="center"
        align="center"
        gap="sm"
        style={{
          display: isLoading || reasoning ? 'flex' : 'none',
        }}
      >
        <Avatar size={56} bg="rgba(252,114,255,0.1)" ref={loadingShipRef}>
          <IconUfo size={30} stroke={1.2} color={'#FC72FF'} />
        </Avatar>
        <Text>
          {isLoading
            ? 'Generating voting weights based on program metrics and preferences...'
            : 'AI-powered voting insights based on your rating'}
        </Text>
      </Stack>

      <Stack gap="lg">
        <Box
          style={{
            display: reasoning ? 'block' : 'none',
          }}
        >
          <Text mb="sm">
            The AI's suggestion is just a recommendation. You can review,
            adjust, or override it before casting your final vote.
          </Text>
          <Card>
            <Text className="ws-pre-wrap" ref={readoutRef}>
              {reasoning}
            </Text>
          </Card>
        </Box>

        {sliders?.length > 0 && (
          <Box>
            <Text mb="sm">
              Based on your responses, AI has generated a recommended voting
              weight for each round. You can review these suggestions and adjust
              them using the sliders to reflect your final decision.
            </Text>
            <Text mb="sm">
              The AI’s recommendation is based on your priorities, but you have
              full control to fine-tune your vote before submitting.
            </Text>
            <Card>
              <Stack mb="lg" gap={'md'}>
                {sliders.map((slider) => (
                  <Box>
                    <Text>{slider.label}</Text>
                    <Slider key={slider.label} value={slider.value} />
                  </Box>
                ))}
              </Stack>
            </Card>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
