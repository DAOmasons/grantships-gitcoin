import { createTheme, Stepper } from '@mantine/core';
import typographyClasses from './style/typography.module.css';
import buttonClasses from './style/button.module.css';
import cardClasses from './style/card.module.css';
import stepperClasses from './style/stepper.module.css';
import formClasses from './style/form.module.css';
import { lightTheme } from '@rainbow-me/rainbowkit';
import { Theme as RainbowKitTheme } from '@rainbow-me/rainbowkit';

const KELP = [
  '#f2f2f2',
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
] as const;

// E2E8F0

const DARK = [
  '#f2f2f2',
  '#E2E8F0', // common grey
  '#c4c4c4',
  '#656a68', // secondary text color
  '#595959',
  '#111111', // common text color
  '#0f0e0e',
  '#0d0a0a',
  '#0a0606',
  '#080303',
  '#050101',
] as const;

const PURPLE = [
  '#f2f2f2',
  '#f9f5fc',
  '#f5ebfc',
  '#e4cdf7',
  '#d0b1f2',
  '#a37aeb',
  '#6e48e0', // root color
  '#5c3ac9',
  '#4428a8',
  '#301a87',
  '#1e0e66',
] as const;

const SUBTLE_TEXT = [
  '',
  '',
  '',
  '',
  '',
  '',
  '#656a68',
  '',
  '',
  '',
  '',
] as const;

export const theme = createTheme({
  fontFamily: 'DM Sans, sans-serif',
  spacing: {
    root: '24px',
    xxs: '8px',
    xs: '12px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px',
    xxl: '48px',
  },
  fontSizes: {
    root: '16px',
    xxs: '10px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    xxl: '32px',
    h1: '52px',
    h2: '44px',
    h3: '36px',
    h4: '28px',
    h5: '20px',
    h6: '16px',
  },

  defaultRadius: 'sm',
  colors: {
    kelp: KELP,
    dark: DARK,
    purple: PURPLE,
    subtle: SUBTLE_TEXT,
  },

  components: {
    Text: {
      classNames: {
        root: typographyClasses.root,
      },
    },
    Button: {
      classNames: {
        root: buttonClasses.root,
      },
    },
    Card: {
      classNames: {
        root: cardClasses.root,
      },
    },
    ActionIcon: {
      classNames: {
        root: buttonClasses.action,
      },
    },
    Stepper: {
      classNames: {
        root: stepperClasses.root,
        stepIcon: stepperClasses.stepIcon,
        stepLabel: stepperClasses.stepLabel,
        separator: stepperClasses.separator,
      },
    },
    Radio: {
      classNames: {
        root: formClasses.radio,
      },
    },
  },
});

export const rbkTheme: RainbowKitTheme = {
  ...lightTheme({}),
  colors: {
    ...lightTheme().colors,
    accentColor: KELP[6],
    modalText: DARK[6],
    modalTextSecondary: DARK[3],
    // modalTextDim: 'red',
  },
  radii: {
    ...lightTheme().radii,
    modal: '6px',
    menuButton: '6px',
    modalMobile: '6px',
    actionButton: '4px',
  },
  fonts: {
    body: 'DM Sans',
  },
};
