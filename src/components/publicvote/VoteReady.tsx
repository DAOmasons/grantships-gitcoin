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
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useRef, useState } from 'react';
import { useChews } from '../../hooks/useChews';
import { useTx } from '../../contexts/useTx';
import { PromptSchema, searchPrefs } from '../../utils/ai';
import { encodeAbiParameters, Hex, parseAbiParameters } from 'viem';
import ContestABI from '../../abi/Contest.json';
import { notifications } from '@mantine/notifications';
import { batchVoteSchema } from '../../schemas/batchVote';
import { GG_MD_POINTER } from '../../constants/tags';
import { ADDR } from '../../constants/addresses';
import {
  IconChefHat,
  IconList,
  IconStar,
  IconStarFilled,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { TxButton } from '../TxButton';
import { SliderData, vectors } from './voteData';
import { Bold } from '../typography';

export const VoteReady = ({
  proof,
  setCurrentTab,
}: {
  proof: string[] | null;
  setCurrentTab: (tab: string) => void;
}) => {
  const { colors } = useMantineTheme();
  const { publicRound, refetchPublicRound } = useChews();
  const { tx } = useTx();

  const [context, setContext] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [sliders, setSliders] = useState<SliderData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState(vectors);

  const loadingShipRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

  const handleRatingChange = (key: string, value: number) => {
    const updatedRatings = ratings.map((vector) =>
      vector.key === key ? { ...vector, rating: value } : vector
    );
    setRatings(updatedRatings);
  };

  const handleSubmit = async () => {
    try {
      if (!publicRound) {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Public Round not found',
        });
        return;
      }

      if (!publicRound?.ships || publicRound.ships?.length === 0) {
        console.log('publicRound', publicRound);
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Public Round ships not found',
        });
        return;
      }

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

      const result = await searchPrefs(promptSeed as PromptSchema);

      if (!result) {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Error fetching AI suggestions',
        });
        setIsLoading(false);
        return;
      }

      const reasoning = result?.data?.reasoning;

      if (!reasoning) {
        console.error('No reasoning provided');
        console.log('result', result);
        return;
      }

      let cannotFind = false;

      const allocations = publicRound?.ships?.map((ship) => {
        const sliderData = result?.data?.allocations.find(
          (program) => program.id.slice(4) === ship.choiceId.slice(4)
        );

        if (!sliderData) {
          console.log('publicRound.ships', publicRound.ships);
          console.log('sliderData', sliderData);
          console.log('result?.data?.allocations', result?.data?.allocations);

          cannotFind = true;
        }

        return {
          name: ship.name,
          id: ship.choiceId,
          imgUrl: ship.imgUrl,
          value: sliderData ? sliderData.percentage : 0,
        } as SliderData;
      });

      setReasoning(reasoning);

      setSliders(allocations);

      if (cannotFind) {
        notifications.show({
          title: 'Error',
          color: 'yellow',
          message: 'AI suggestions not found for all ships',
        });
      }

      setIsLoading(false);

      setTimeout(() => {
        if (readoutRef.current) {
          readoutRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 400);
    } catch (error: any) {
      console.error('Error generating vote:', error.message);
      setIsLoading(false);
      notifications.show({
        title: 'Error',
        color: 'red',
        message: error.message,
      });
    }
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

    const nonZeroSliders = sliders.filter((slider) => slider.value > 0);

    const choiceIds = nonZeroSliders.map((slider) => slider.id);
    const amounts = nonZeroSliders.map(
      (slider) => BigInt(slider.value) * BigInt(1e16)
    );
    const dataForEach = nonZeroSliders.map((_slider) => data);

    const voteCopy = {
      ratings: ratings.map((rating) => ({ ...rating, value: rating.rating })),
      context,
    };

    const total =
      BigInt(nonZeroSliders.reduce((sum, slider) => sum + slider.value, 0)) *
      BigInt(1e16);

    const validated = batchVoteSchema.safeParse(voteCopy);

    if (total != BigInt(1e18)) {
      notifications.show({
        title: 'Error',
        color: 'red',
        message: 'Vote total must be 100%',
      });
      return;
    }

    if (!validated.success) {
      notifications.show({
        title: 'Error',
        color: 'red',
        message: 'Invalid vote metadata',
      });
      return;
    }

    const batchMetadata = [GG_MD_POINTER, JSON.stringify(validated.data)] as [
      bigint,
      string,
    ];

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

    const args = [choiceIds, amounts, dataForEach, BigInt(1e18), batchMetadata];

    tx({
      writeContractParams: {
        address: ADDR.PUBLIC_ROUND,
        abi: ContestABI,
        functionName: 'batchVote',
        args,
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchPublicRound?.();
          setCurrentTab('results');
        },
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
              readOnly={sliders.length > 0}
              value={vector.rating}
              onChange={(value) => handleRatingChange(vector.key, value)}
              emptySymbol={
                <IconStar
                  size={24}
                  color={sliders.length > 0 ? colors.dark[4] : colors.purple[6]}
                  stroke={1.5}
                />
              }
              fullSymbol={
                <IconStarFilled
                  size={24}
                  color={sliders.length > 0 ? colors.dark[4] : colors.purple[6]}
                />
              }
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
            disabled={sliders.length > 0}
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
        <Avatar size={86} bg="rgba(252,114,255,0.1)" ref={loadingShipRef}>
          <IconChefHat size={54} stroke={1.2} color={'#FC72FF'} />
        </Avatar>
        <Text>
          {isLoading
            ? 'Cooking up some AI-powered voting weights from your preferences. This may take a few minutes.'
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
              The AI’s recommendation is based on your priorities,
              <Bold>
                but you have full control to fine-tune your vote before
                submitting.{' '}
              </Bold>
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
