import {
  ActionIcon,
  Container,
  Group,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft } from '@tabler/icons-react';

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
  const { colors } = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Group justify="space-between" h={70} align="center" mb="xl">
      <ActionIcon onClick={() => navigate(-1)}>
        <IconChevronLeft color={colors.dark[4]} size={24} />
      </ActionIcon>
      <Text fz={20}>{title}</Text>
      <>
        <Text style={{ display: 'hidden' }}></Text>
      </>
    </Group>
  );
};

export const InnerContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Container mt="md" mb="xxl" maw={880}>
      {children}
    </Container>
  );
};
