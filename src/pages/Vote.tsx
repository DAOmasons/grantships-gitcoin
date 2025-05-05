import {
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
import { PageLayout } from '../layout/Page';
import { IconStar, IconStarFilled, IconUfo } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { PromptSchema, testAIServer } from '../utils/ai';

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
  const { colors } = useMantineTheme();
  const [ratings, setRatings] = useState(vectors);
  const [context, setContext] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [sliders, setSliders] = useState<{ label: string; value: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const loadingShipRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

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
    <PageLayout title="Vote">
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
    </PageLayout>
  );
};
