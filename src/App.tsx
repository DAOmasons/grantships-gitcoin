import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { rbkTheme, theme } from './theme';
import { ClientRoutes } from './Routes';
import { HorizontalNav } from './layout/HorizontalNav';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from './utils/config';
import {
  ConnectButton,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={rbkTheme}>
            <MantineProvider theme={theme} defaultColorScheme="light">
              <HorizontalNav />
              <ClientRoutes />
            </MantineProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}
