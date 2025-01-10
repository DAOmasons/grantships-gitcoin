import { Container, Group, Text } from '@mantine/core';
import { ReactNode } from 'react';

export const PageLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <InnerContainer>
      <PageTitle title={title} />
      {children}
    </InnerContainer>
  );
};

export const PageTitle = ({ title }: { title: string }) => {
  return (
    <Group>
      <Text>{title}</Text>
    </Group>
  );
};

export const InnerContainer = ({ children }: { children: ReactNode }) => {
  return <Container mt={40}>{children}</Container>;
};
