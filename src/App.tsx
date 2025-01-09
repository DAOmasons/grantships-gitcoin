import '@mantine/core/styles.css';
import { Button, Container, MantineProvider, Stack } from '@mantine/core';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Container h="100vh">
        <Stack h="100%" justify="center" align="center">
          <Button>Click me, daddy</Button>
        </Stack>
      </Container>
    </MantineProvider>
  );
}
