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

export const roundNumberString = (numStr: string, decimalPlaces = 2) => {
  const num = Number(numStr);

  if (isNaN(num)) {
    return '--';
  }

  const rounded = num.toFixed(decimalPlaces);

  return rounded.replace(/\.?0+$/, '');
};
