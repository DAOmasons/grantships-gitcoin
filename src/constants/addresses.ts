import { Address } from 'viem';
import { isDev } from '../utils/config';

type Keychain = Record<string, Address>;

export const ADDR_TESTNET: Keychain = {
  HATS: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
};

export const ADDR_MAINNET: Keychain = {
  HATS: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
};

export const ADDR: Keychain = isDev ? ADDR_TESTNET : ADDR_MAINNET;
