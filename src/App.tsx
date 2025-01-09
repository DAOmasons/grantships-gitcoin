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
  Title,
  useMantineTheme,
} from '@mantine/core';
import { BrowserRouter, Link } from 'react-router-dom';
import { theme } from './theme';
import { ClientRoutes } from './Routes';

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <HorizontalNav />
        <Container maw={880} pb="xxl">
          <ClientRoutes />
        </Container>
      </MantineProvider>
    </BrowserRouter>
  );
}

const HorizontalNav = () => {
  return (
    <Group ml={40} mt={36} gap="xl">
      <Link to="/">
        <Text fz={28} variant="label" mr={10}>
          GrantShips
        </Text>
      </Link>
      <Link to="/">
        <Text variant="label">Dashboard</Text>
      </Link>
      <Link to="/">
        <Text variant="label" c="subtle">
          Elections
        </Text>
      </Link>
      <Link to="/">
        <Text variant="label" c="subtle">
          Applications
        </Text>
      </Link>
      <Link to="/">
        <Text variant="label" c="subtle">
          Settings
        </Text>
      </Link>
      <Button size="sm" ml="auto" mr={40}>
        Connect Wallet
      </Button>
    </Group>
  );
};
