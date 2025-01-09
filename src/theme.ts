import { createTheme } from '@mantine/core';

const KELP = [
  '#e9f5f4',
  '#d5edec',
  '#9dd1ce',
  '#6bb3ad',
  '#257a72',
  '#00433b', // root color
  '#003b31',
  '#003025',
  '#00291d',
  '#001f13',
  '#00140c',
] as const;

// E2E8F0

const DARK = [
  '#f2f2f2',
  '#E2E8F0', // common grey
  '#c4c4c4',
  '#929695', // secondary text color
  '#595959',
  '#111111', // common text color
  '#0f0e0e',
  '#0d0a0a',
  '#0a0606',
  '#080303',
  '#050101',
] as const;

const PURPLE = [
  '#f9f5fc',
  '#f5ebfc',
  '#e4cdf7',
  '#d0b1f2',
  '#a37aeb',
  '#6e48e0',
  '#5c3ac9',
  '#4428a8',
  '#301a87',
  '#1e0e66',
  '#100642',
] as const;

export const theme = createTheme({
  fontFamily: 'DM Sans, sans-serif',
  defaultRadius: 'sm',
  colors: {
    kelp: KELP,
    dark: DARK,
    purple: PURPLE,
  },

  components: {
    Text: {},
  },
});
