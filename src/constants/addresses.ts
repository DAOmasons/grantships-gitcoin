import { Address } from 'viem';
import { isDev } from '../utils/config';

type Keychain = Record<string, Address>;

export const ADDR_TESTNET: Keychain = {
  HATS: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
  CHEWS: '0xC75C7d885252d1863C647F30E4d739eC097896b1',
};

export const ADDR_MAINNET: Keychain = {
  HATS: '0x3bc1A0Ad72417f2d411118085256fC53CBdDd137',
  CHEWS: '0x72429C2392d79458c411BC5DecEb8cCd28530BF0',
};

export const ADDR: Keychain = isDev ? ADDR_TESTNET : ADDR_MAINNET;
