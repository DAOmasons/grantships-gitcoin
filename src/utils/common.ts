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
  // Convert to number
  const num = Number(numStr);

  if (isNaN(num)) {
    return '--';
  }

  // Round to specified decimal places
  const rounded = num.toFixed(decimalPlaces);

  // If decimal places is 0, just return the rounded number as is
  if (decimalPlaces === 0) {
    return rounded;
  }

  // Only for decimal places > 0, remove trailing zeros
  return rounded.replace(/\.(\d*[1-9])0+$/, '.$1').replace(/\.0+$/, '');
};

export const replaceCommonString = (string: string) => {
  if (string === 'Additional matching donations raised are important') {
    return 'Additional matching funds raised are important';
  }

  if (string === 'Total donations received is important') {
    return 'Total funds raised is important';
  }
  return string;
};
