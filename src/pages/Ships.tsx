import {
  Avatar,
  Box,
  Group,
  Progress,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { formatEther } from 'viem';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  IconSquareNumber1,
  IconSquareNumber2,
  IconSquareNumber3,
  IconSquareNumber4,
  IconSquareNumber5,
} from '@tabler/icons-react';

import { PageLayout } from '../layout/Page';
import { useChews } from '../hooks/useChews';
import fxClasses from '../style/effects.module.css';
import { InfoBanner } from '../components/InfoBanner';

const icons = [
  IconSquareNumber1,
  IconSquareNumber2,
  IconSquareNumber3,
  IconSquareNumber4,
  IconSquareNumber5,
];

const AWAITING_REVEAL = true;

export const Ships = () => {
  const { colors } = useMantineTheme();
  const { applicationRound } = useChews();

  const navigate = useNavigate();

  const transformed = useMemo(
    () =>
      applicationRound?.applications
        .map((app) => {
          const avgScore =
            app?.votes.length === 0
              ? '0'
              : formatEther(
                  (app.votes.reduce(
                    (acc, vote) => acc + BigInt(vote.amount),
                    0n
                  ) /
                    BigInt(app.votes.length)) *
                    100n
                );

          return {
            ...app,
            avgScore,
          };
        })
        .sort((a, b) => Number(b.avgScore) - Number(a.avgScore)),
    [applicationRound]
  );

  return (
    <PageLayout title="Applications">
      <Title fz="h3" order={3} mb="sm">
        Ship Leaderboard
      </Title>
      <Text c={colors.dark[4]} mb="xl">
        Review application status and comments from the Judges
      </Text>
      <Box>
        {AWAITING_REVEAL ? (
          <InfoBanner
            title="Coming up soon!"
            description="Applications are still being reviewed and prepared for the Judge Vote"
          />
        ) : (
          transformed?.map((app, index) => {
            const Icon = index < icons.length ? icons[index] : null;
            return (
              <Group
                px="lg"
                py="sm"
                mb={32}
                key={app.id}
                justify="space-between"
                className={fxClasses.hoverCard}
                onClick={() => navigate(`/view-application/${app.id}`)}
              >
                <Group>
                  <Box pos="relative">
                    {Icon && (
                      <Icon
                        size={30}
                        fill={'white'}
                        color={colors.dark[6]}
                        style={{
                          position: 'absolute',
                          top: -4,
                          right: -8,
                          zIndex: 1,
                        }}
                      />
                    )}
                    <Avatar size={56} src={app.copy.imgUrl} />
                  </Box>
                  <Box>
                    <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                      {app.copy.roundName}
                    </Text>
                    <Text c="subtle">Last Updated Jan 1, 2025</Text>
                  </Box>
                </Group>
                <Stack gap={0} align="flex-end">
                  <Group mb={4} gap={8}>
                    <Text c="subtle">
                      Avg. {Number(app.avgScore).toFixed()} %
                    </Text>
                    <Progress
                      w={160}
                      h={8}
                      value={Number(app.avgScore)}
                      color={colors.purple[6]}
                      bg={colors.dark[6]}
                    />
                  </Group>
                  <Text c="subtle">Currently {app.amountReviewed} Voted</Text>
                </Stack>
              </Group>
            );
          })
        )}
      </Box>
    </PageLayout>
  );
};
