import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createPublicClient, http } from 'viem';
import { createConfig } from 'wagmi';
import { arbitrum, mainnet } from 'wagmi/chains';

export const appNetwork = arbitrum;

export const config = getDefaultConfig({
  appName: 'GG-GS',
  projectId: import.meta.env.VITE_RBK_PROJECT_ID,
  chains: [appNetwork],
  ssr: false,
  transports: {
    [appNetwork.id]: http(import.meta.env.VITE_RPC_URL),
  },
});

export const publicClient = createPublicClient({
  chain: appNetwork,
  transport: http(import.meta.env.VITE_RPC_URL),
});

export const ensConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_RPC_URL_ENS_MAINNET),
  },
});
