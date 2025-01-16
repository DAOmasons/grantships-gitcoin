import {
  Box,
  Card,
  Group,
  Progress,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layout/Page';
import { AddressAvatar } from '../components/AddressAvatar';
import { useChews } from '../hooks/useChews';
import { Address } from 'viem';
import fxClasses from '../style/effects.module.css';

export const Applications = () => {
  const { colors } = useMantineTheme();
  const { applicationRound } = useChews();

  return (
    <PageLayout title="Applications">
      <Title fz="h3" order={3} mb="sm">
        Applications
      </Title>
      <Text c={colors.dark[4]} mb="xl">
        Review application status and comments from the Judges
      </Text>
      <Box>
        {applicationRound?.applications.map((app) => (
          <Group
            px="lg"
            py="sm"
            mb={32}
            key={app.id}
            justify="space-between"
            className={fxClasses.hoverCard}
          >
            <Group>
              <AddressAvatar size={56} address={app.registrar as Address} />
              <Box>
                <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                  {app.copy.roundName}
                </Text>
                <Text c="subtle">Last Updated Jan 1, 2025</Text>
              </Box>
            </Group>
            <Stack gap={0} align="flex-end">
              <Group mb={4} gap={8}>
                <Text c="subtle">Total 35/40</Text>
                <Progress
                  w={160}
                  h={8}
                  value={80}
                  color={colors.purple[6]}
                  bg={colors.dark[2]}
                />
              </Group>
              <Text c="subtle">Currently {app.amountReviewed} Voted</Text>
            </Stack>
          </Group>
        ))}
      </Box>
    </PageLayout>
  );
};
