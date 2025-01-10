import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import { ClientRoutes } from './Routes';
import { HorizontalNav } from './layout/HorizontalNav';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from './utils/config';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme} defaultColorScheme="light">
            <HorizontalNav />
            <ClientRoutes />
          </MantineProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}
