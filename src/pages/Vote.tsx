import {
  Box,
  Card,
  Rating,
  Stack,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layout/Page';
import { useForm } from '@mantine/form';

export const Vote = () => {
  const { colors } = useMantineTheme();
  const form = useForm({
    initialValues: {
      new_funding_values: 1,
      matching_donations: 1,
      participation_count: 1,
      community_events: 1,
      project_completion_rate: 1,
      context: '',
    },
  });

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
      <Stack>
        <Card bg={colors.dark[6]} p={24}>
          <Text fz="lg" mb={10}>
            How important is innovation on multi mechanism to you?
          </Text>
          <Rating defaultValue={1} color={colors.purple[6]} size={24} />
        </Card>
        <Card bg={colors.dark[6]} p={24}>
          <Text fz="lg" mb={10}>
            How important is the quantity of matching donations?
          </Text>
          <Rating defaultValue={1} color={colors.purple[6]} size={24} />
        </Card>
        <Card bg={colors.dark[6]} p={24}>
          <Text fz="lg" mb={10}>
            How important multi mechanism is to you?
          </Text>
          <Rating defaultValue={1} color={colors.purple[6]} size={24} />
        </Card>
        <Card bg={colors.dark[6]} p={24}>
          <Text fz="lg" mb={10}>
            How important multi mechanism is to you?
          </Text>
          <Rating defaultValue={1} color={colors.purple[6]} size={24} />
        </Card>
        <Card bg={colors.dark[6]} p={24}>
          <Text fz="lg" mb={10}>
            How important multi mechanism is to you?
          </Text>
          <Rating defaultValue={1} color={colors.purple[6]} size={24} />
        </Card>
        <Card bg={colors.dark[6]}>
          <Text fz="lg" mb={10}>
            Would you like to add more context?
          </Text>
          <Textarea variant="inset" size="sm"></Textarea>
        </Card>
      </Stack>
    </PageLayout>
  );
};
