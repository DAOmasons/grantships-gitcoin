import '@mantine/core/styles.css';
import {
  Box,
  Button,
  Card,
  Container,
  Group,
  MantineProvider,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Container maw={880} pb="xxl">
        <Yes />
      </Container>
    </MantineProvider>
  );
}

const Yes = () => {
  const theme = useMantineTheme();
  return (
    <Stack mt="xxl">
      <Card variant="solid">
        <Text mb="md">
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
      <Card>
        <Stack h="100%" justify="center" align="center">
          <Card variant="inner">
            <Text c="purple">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Card>
          <Card variant="inner">
            <Text c="kelp">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Card>
          <Card variant="inner">
            <Text c="subtle">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Card>
          <Card variant="inner">
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Card>
        </Stack>
      </Card>
      <Group justify="center">
        <Button variant="secondary">Click me, daddy</Button>
        <Button>Click me, daddy</Button>
      </Group>
    </Stack>
  );
};
