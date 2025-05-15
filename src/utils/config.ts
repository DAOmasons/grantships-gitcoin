import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { createPublicClient, http } from 'viem';
import { createConfig } from 'wagmi';
import { arbitrumSepolia, arbitrum, mainnet } from 'wagmi/chains';

export const isDev = import.meta.env.VITE_ENV === 'dev';

export const API = 'https://claude-service-api.vercel.app';
// export const API = 'http://localhost:8008';

export const appNetwork = isDev ? arbitrumSepolia : arbitrum;
const rpcUrl = isDev
  ? import.meta.env.VITE_DEV_RPC_URL
  : import.meta.env.VITE_RPC_URL;

export const config = getDefaultConfig({
  appName: 'GG-GS',
  projectId: import.meta.env.VITE_RBK_PROJECT_ID,
  chains: [appNetwork],
  ssr: false,
  transports: {
    [appNetwork.id]: http(rpcUrl),
  },
});

export const publicClient = createPublicClient({
  chain: appNetwork,
  transport: http(rpcUrl),
});

export const ensConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_RPC_URL_ENS_MAINNET),
  },
});
