import '@mantine/core/styles.css';
import { Button, Container, Group, MantineProvider, Text } from '@mantine/core';
import { BrowserRouter, Link } from 'react-router-dom';
import { theme } from './theme';
import { ClientRoutes } from './Routes';
import { HorizontalNav } from './layout/HorizontalNav';
import { PageLayout } from './layout/Page';

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <HorizontalNav />
        <ClientRoutes />
      </MantineProvider>
    </BrowserRouter>
  );
}
