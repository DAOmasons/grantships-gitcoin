import { isDev } from '../utils/config';

export const ZER0_ADDRESS = '0x0000000000000000000000000000000000000000';

const HATS_DEV = {
  TOP: 0n,
  ADMIN: 0n,
  JUDGE: 0n,
};

const HATS_PROD = {
  TOP: 0n,
  ADMIN: 0n,
  JUDGE: 0n,
};

export const HATS = isDev ? HATS_DEV : HATS_PROD;
