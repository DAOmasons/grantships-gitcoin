import { bytesToHex, Hex } from 'viem';

export const truncateAddr = (address: string) =>
  address.slice(0, 6) + '...' + address.slice(-4);

export const generateRandomBytes32 = (): Hex => {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  const randomHexValue = bytesToHex(randomBytes);
  return randomHexValue;
};

export const charLimit = (str: string, limit = 18): string => {
  if (str.length > limit) {
    return str.slice(0, limit) + '...';
  }
  return str;
};

export const urlRegex = /(https?:\/\/[^\s]+)/g;
