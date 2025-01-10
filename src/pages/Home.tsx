import { Box, Button, Card, Group, Stack, Text, Title } from '@mantine/core';

export const Home = () => {
  return (
    <Stack>
      <Box mb="xl">
        <Title mb="xs">Judge Application</Title>
        <Text c="subtle" mb="lg">
          Stage 1 - Help shape the future of community project
        </Text>
        <Card variant="solid">
          <Text mb="md" lh={1.4}>
            Join our panel of distinguished judges to evaluate and select
            impactful community projects. As a judge, you'll review grant
            proposals, provide valuable feedback, and help allocate resources to
            initiatives that matter. We're looking for individuals with diverse
            expertise and a passion for community development.
          </Text>
          <Group justify="center">
            <Button variant="secondary">Apply to become a judge</Button>
          </Group>
        </Card>
      </Box>

      <Group justify="center">
        <Button variant="secondary">Click me, daddy</Button>
        <Button>Click me, daddy</Button>
      </Group>
    </Stack>
  );
};
