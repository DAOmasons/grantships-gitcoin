import { createTheme } from '@mantine/core';
import typographyClasses from './style/typography.module.css';
import buttonClasses from './style/button.module.css';
import cardClasses from './style/card.module.css';
import stepperClasses from './style/stepper.module.css';
import formClasses from './style/form.module.css';
import accordionClasses from './style/accordion.module.css';
import tabClasses from './style/tabs.module.css';
import sliderClasses from './style/slider.module.css';
import { darkTheme } from '@rainbow-me/rainbowkit';
import { Theme as RainbowKitTheme } from '@rainbow-me/rainbowkit';

const KELP = [
  '#ffffff',
  '#f0fcfb',
  '#e1faf7',
  '#b4f0e9',
  '#8ae6d9',
  '#3fd4bd',
  '#00c3a0',
  '#00ad88',
  '#009168',
  '#00754c',
  '#0C1F1C',
] as const;

const DARK = [
  '#f2f2f2',
  '#EFE9E9', // highlight text color
  '#CED4DA', // primary text color
  '#ADB5BD', // subtle text color
  '#828282', // inactive text color
  '#3B3B3B', // highlight/active/panel color
  '#1F1F1F', // accent panel color// dark text color
  '#0D0D0D', // bg color
  '#000000',
  '#000000',
  '#000000',
] as const;

const PURPLE = [
  '#f2f2f2',
  '#f9f5fc',
  '#f5ebfc',
  '#e4cdf7',
  '#d0b1f2',
  '#a37aeb',
  '#9E62FF', // root color
  '#5c3ac9',
  '#4428a8',
  '#301a87',
  '#1B1525',
] as const;

const SUBTLE_TEXT = ['', '', '', '', '#ADB5BD', '', '', '', '', ''] as const;
const HIGHLIGHT_TEXT = ['', '', '', '', '#EFE9E9', '', '', '', '', ''] as const;
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
    highlight: HIGHLIGHT_TEXT,
  },
  components: {
    Text: {
      classNames: {
        root: typographyClasses.root,
      },
    },
    Title: {
      classNames: {
        root: typographyClasses.root,
      },
      defaultProps: {
        c: DARK[1],
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
        stepBody: stepperClasses.stepBody,
      },
    },
    TextInput: {
      classNames: {
        input: formClasses.root,
        label: formClasses.label,
        section: formClasses.inputSection,
        wrapper: formClasses.input,
      },
    },
    Textarea: {
      classNames: {
        input: formClasses.root,
        label: formClasses.label,
      },
      defaultProps: {
        rows: 1,
        autosize: true,
      },
    },
    Radio: {
      classNames: {
        radio: formClasses.radio,
        icon: formClasses.radioIcon,
        root: formClasses.radioRoot,
      },
      defaultProps: {
        color: KELP[6],
      },
    },
    Accordion: {
      classNames: {
        control: accordionClasses.control,
        root: accordionClasses.root,
      },
    },
    Divider: {
      defaultProps: {
        color: DARK[5],
      },
    },
    Modal: {
      classNames: {
        content: cardClasses.modalContent,
      },
    },
    Tabs: {
      classNames: {
        root: tabClasses.root,
        tab: tabClasses.tab,
        list: tabClasses.list,
        section: tabClasses.section,
      },
    },
    Slider: {
      classNames: sliderClasses,
    },
  },
});

export const rbkTheme: RainbowKitTheme = {
  ...darkTheme({}),
  colors: {
    ...darkTheme().colors,
    accentColor: KELP[6],
    modalBackground: DARK[6],
    modalText: DARK[1],
    modalTextSecondary: DARK[4],
    modalBorder: DARK[6],
    modalTextDim: DARK[4],
  },
  radii: {
    ...darkTheme().radii,
    modal: '6px',
    menuButton: '6px',
    modalMobile: '6px',
    actionButton: '4px',
  },
  fonts: {
    body: 'DM Sans',
  },
};
