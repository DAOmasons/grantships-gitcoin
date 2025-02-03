import '@mantine/core/styles.css';
import './index.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import { TxProvider } from './contexts/TxContext';
import { BrowserRouter } from 'react-router-dom';
import { rbkTheme, theme } from './theme';
import { ClientRoutes } from './Routes';
import { HorizontalNav } from './layout/HorizontalNav';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from './utils/config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import GlobalContextProvider from './contexts/GlobalContext';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={rbkTheme}>
            <GlobalContextProvider>
              <MantineProvider theme={theme} defaultColorScheme="dark">
                <TxProvider>
                  <HorizontalNav />
                  <ClientRoutes />
                </TxProvider>
              </MantineProvider>
            </GlobalContextProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  );
}
