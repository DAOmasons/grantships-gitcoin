import {
  ActionIcon,
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
  IconList,
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
import { encodeAbiParameters, Hex, parseAbiParameters } from 'viem';
import { useTx } from '../contexts/useTx';
import ContestABI from '../abi/Contest.json';
import { useChews } from '../hooks/useChews';
import { Link } from 'react-router-dom';

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
  const [proof, setProof] = useState<string[] | null>(null);
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
      <VoteReady proof={proof} />
    </Box>
  );
};

type SliderData = {
  name: string;
  id: string;
  imgUrl: string;
  value: number;
};

const fakeSliderData = [
  {
    id: '0x2377bfa0777c385f4d3fdee97d1a65228f836da67ea6f0db96235870ac5cdc82',
    imgUrl:
      'https://www.regencoordination.xyz/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F4514bed5-d3e3-402c-b4e4-5aa68faa39ff%2F65e941b3-a87e-4054-b665-2b194bf1ba44%2FGroup_5551008.png?table=block&id=11a2e725-1f2f-8091-bcc9-fd0caf288e72&spaceId=4514bed5-d3e3-402c-b4e4-5aa68faa39ff&width=250&userId=&cache=v2',
    name: 'Regen Coordination ImpactQF',
    value: 22,
  },
  {
    id: '0xd18608a33ecfd6b9c08a6c8fd99fd934199dff54ae53515e159b195b2cce770c',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUyEe2kfJf8ShHARPQph24tuzPHOhuz7tzWA&s',
    name: 'GoodDollar GoodBuilders Kickoff Round ',
    value: 8,
  },
  {
    id: '0xae3add0277ad57036fb34714bdd96872dc971915636e3cafab9aa08e2632b8cf',
    imgUrl:
      'https://github.com/CommonsBuild/tec-branding-assets/blob/main/Logo/Icon/TEC%20Icon%20Color%403x.png',
    name: 'Token Engineering the Superchain Retro Round',
    value: 34,
  },
  {
    id: '0x22ed83fde1924b615d904ccb2259c3ab42e72ec0870242399cda94743503682e',
    imgUrl:
      "https://cdn.charmverse.io/user-content/ac22a202-547a-4ee0-96b5-5b50858e5ab3/069a8d51-d841-4fef-96d3-0f4f3922dbff/DALL%C2%B7E-2025-03-01-16.30.39---A-minimalist-conceptual-icon-for-'Regen-Rio-de-Janeiro,'-designed-for-a-Gitcoin-Funding-Round-avatar.-The-icon-features_-__--A-stylized-outline-of-Sug.webp",
    name: 'Regen Rio de Janeiro',
    value: 12,
  },
  {
    id: '0x781ce54b73730667e7390caa0e52d4d585b574f274f780c4e0bb96a18a996c30',
    imgUrl: 'https://imgur.com/8jwrl00.png',
    name: 'Gitcoin Grants Garden 🌱',
    value: 24,
  },
  {
    id: '0x559f71a3559444c0e12205b095cbecd784199ab4caa271fcddf67b293318eb0f',
    imgUrl: 'https://ibb.co/Wdrg0ph',
    name: 'Web3 for Universities',
    value: 0,
  },
];

const VoteReady = ({ proof }: { proof: string[] | null }) => {
  const { colors } = useMantineTheme();

  const [context, setContext] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [sliders, setSliders] = useState<SliderData[]>(fakeSliderData);
  const [isLoading, setIsLoading] = useState(false);

  const { publicRound } = useChews();

  const loadingShipRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

  const { tx } = useTx();

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

  const submitVote = async () => {
    const EMPTY_METADATA = [0n, ''] as [bigint, string];

    if (!proof) {
      notifications.show({
        title: 'Error',
        message: 'No proof found',
      });
      return;
    }

    const pointsData = encodeAbiParameters(
      parseAbiParameters('bytes32[], uint256'),
      [proof as Hex[], BigInt(1e18)]
    );

    const votesData = encodeAbiParameters(
      parseAbiParameters('(uint256,string)'),
      [EMPTY_METADATA]
    );

    const data = encodeAbiParameters(parseAbiParameters('bytes, bytes'), [
      votesData,
      pointsData,
    ]);

    const choiceIds = sliders.map((slider) => slider.id);
    const amounts = sliders.map((slider) => slider.value);
    const dataForEach = sliders.map((_slider) => data);

    console.log('amounts', amounts);
    console.log('choiceIds', choiceIds);
    console.log('dataForEach', dataForEach);

    const voteCopy = JSON.stringify({
      ratings,
      context,
    });

    const batchMetadata = [6665n, voteCopy] as [bigint, string];

    if (
      choiceIds.length !== amounts.length ||
      choiceIds.length !== dataForEach.length
    ) {
      notifications.show({
        title: 'Error',
        message: 'Invalid vote data',
      });
      return;
    }

    tx({
      writeContractParams: {
        address: ADDR.PUBLIC_ROUND,
        abi: ContestABI,
        functionName: 'batchVote',
        args: [choiceIds, amounts, dataForEach, 100, batchMetadata],
      },
    });
  };

  const handleSliderChange = (id: string, newValue: number) => {
    const otherValuesTotal = sliders.reduce(
      (sum, slider) => (slider.id !== id ? sum + slider.value : sum),
      0
    );

    const maxAllowed = 100 - otherValuesTotal;
    const clampedValue = Math.min(newValue, maxAllowed);

    // Update the slider value

    const updatedSliders = sliders.map((slider) =>
      slider.id === id ? { ...slider, value: clampedValue } : slider
    );

    setSliders(updatedSliders);
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
                  <Box key={slider.id} mb="lg">
                    <Group mb="sm" justify="space-between" w="90%">
                      <Box w="fit-content">
                        <Link
                          to={`/ship/${slider.id}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Group gap="xs">
                            <Avatar src={slider.imgUrl} size={40} />
                            <Text lineClamp={1} maw={200}>
                              {slider.name}
                            </Text>
                          </Group>
                        </Link>
                      </Box>
                      <ActionIcon size={16}>
                        <IconList />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Slider
                        w={'90%'}
                        value={slider.value}
                        size={2}
                        color={colors.dark[5]}
                        onChange={(value) =>
                          handleSliderChange(slider.id, value)
                        }
                      />
                      <Text fz="xs">{slider.value} %</Text>
                    </Group>
                  </Box>
                ))}
              </Stack>
            </Card>
            <Group justify="center" mt="xxl">
              <TxButton onClick={submitVote}>Submit Vote</TxButton>
            </Group>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
