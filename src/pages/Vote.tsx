import {
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
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { useState } from 'react';
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

  const handleRatingChange = (key: string, value: number) => {
    const updatedRatings = ratings.map((vector) =>
      vector.key === key ? { ...vector, rating: value } : vector
    );
    setRatings(updatedRatings);
  };

  const handleSubmit = async () => {
    console.log('ratings', ratings);
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

    const result = await testAIServer(promptSeed as PromptSchema);

    const reasoning = result?.data?.reasoning;

    if (!reasoning) {
      console.error('No reasoning provided');
      return;
    }

    setReasoning(reasoning);
    console.log('result', result);
    setSliders(
      result.data.allocations.map((allocation) => ({
        label: allocation.program,
        value: allocation.percentage,
      }))
    );
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
      <Group justify="center" mb="lg">
        <Button onClick={handleSubmit}>Submit</Button>
      </Group>
      <Box>
        <Stack mb="lg" gap={'md'}>
          {sliders.map((slider) => (
            <Box>
              <Text>{slider.label}</Text>
              <Slider key={slider.label} value={slider.value} />
            </Box>
          ))}
        </Stack>
        <Text className="ws-pre-wrap">{reasoning}</Text>
      </Box>
    </PageLayout>
  );
};
