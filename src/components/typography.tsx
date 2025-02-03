import { Text, TextProps } from '@mantine/core';
import { ReactNode } from 'react';
import typeClasses from '../style/typography.module.css';

console.log('typeClasses', typeClasses);

export const ExternalLink = ({
  children,
  href,
  external = true,
  ...props
}: TextProps & { children?: ReactNode; href: string; external?: boolean }) => (
  <Text
    {...props}
    component="a"
    href={href}
    classNames={{ root: typeClasses.textLink }}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
  >
    {children}
  </Text>
);

export const Bold = ({
  children,
  ...props
}: { children: ReactNode } & TextProps) => (
  <Text component="span" fw={900} fz="inherit" c="inherit" {...props}>
    {children}
  </Text>
);

export const Italic = ({ children }: { children: ReactNode }) => (
  <Text component="span" fw={'inherit'} fz="inherit" fs="italic" c="inherit">
    {children}
  </Text>
);

export const BoldItalic = ({ children }: { children: ReactNode }) => (
  <Text component="span" fw={900} fz="inherit" fs="italic" c="inherit">
    {children}
  </Text>
);
