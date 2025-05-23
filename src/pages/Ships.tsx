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
  IconSquareNumber6,
} from '@tabler/icons-react';

import { PageLayout } from '../layout/Page';
import { useChews } from '../hooks/useChews';
import fxClasses from '../style/effects.module.css';
import { roundNumberString } from '../utils/common';
import { secondsToLongDate } from '../utils/time';
import { InfoBanner } from '../components/InfoBanner';
import { useMobile } from '../hooks/useBreakpoints';

const icons = [
  IconSquareNumber1,
  IconSquareNumber2,
  IconSquareNumber3,
  IconSquareNumber4,
  IconSquareNumber5,
  IconSquareNumber6,
];

const publicIcons = [IconSquareNumber1, IconSquareNumber2, IconSquareNumber3];

export const Ships = () => {
  const { colors } = useMantineTheme();

  const isMobile = useMobile();

  const {
    applicationRound,
    publicRound,
    isLoadingAppRound,
    isLoadingPublicRound,
  } = useChews();

  const navigate = useNavigate();

  const transformed = useMemo(
    () =>
      applicationRound?.applications
        .map((app) => {
          const avgScore =
            app?.votes.length === 0
              ? '0'
              : roundNumberString(
                  formatEther(
                    (app.votes.reduce(
                      (acc, vote) => acc + BigInt(vote.amount),
                      0n
                    ) /
                      BigInt(app.votes.length)) *
                      100n
                  ),
                  0
                );

          return {
            ...app,
            avgScore,
          };
        })
        .sort((a, b) => Number(b.avgScore) - Number(a.avgScore)),
    [applicationRound]
  );

  const sortedPublicShips = useMemo(() => {
    if (!publicRound) return null;

    const ships = [...publicRound?.ships].sort(
      (a, b) => Number(b.amountVoted) - Number(a.amountVoted)
    );
    return {
      ...publicRound,
      ships,
    };
  }, [publicRound]);

  if (isLoadingAppRound || isLoadingPublicRound) {
    return null;
  }

  return (
    <PageLayout title="Applications">
      <Title fz="h3" order={3} mb="sm">
        Ship Leaderboard
      </Title>
      <Box mb={72}>
        <Text fz="lg" fw={600}>
          Public Vote
        </Text>
        <Text c={colors.dark[4]} mb="xl">
          Final Public GTC Vote for the GG23 Rounds. Top 3 ships will be
          selected for GG24
        </Text>
        {publicRound && sortedPublicShips?.ships?.length ? (
          <Box>
            {sortedPublicShips?.ships?.map((ship, index) => {
              const Icon = index < publicIcons.length ? icons[index] : null;

              const total = publicRound.totalVoted;

              const scaleFactor = 100n;

              const percentage =
                !ship || !ship.amountVoted || ship.amountVoted === 0n
                  ? 0
                  : Number((ship.amountVoted * 100n * scaleFactor) / total) /
                    Number(scaleFactor);

              return (
                <Group
                  px={isMobile ? 'md' : 'lg'}
                  py="sm"
                  mb={32}
                  key={ship.choiceId}
                  justify="space-between"
                  className={fxClasses.hoverCard}
                  onClick={() => navigate(`/ship/${ship.choiceId}`)}
                >
                  <Group
                    style={{
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: 'start',
                    }}
                  >
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
                      <Avatar size={56} src={ship.imgUrl} bg={colors.dark[0]} />
                    </Box>
                    <Box>
                      <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                        {ship.name}
                      </Text>
                    </Box>
                  </Group>
                  <Stack gap={0} align="flex-end">
                    <Group mb={4} gap={8}>
                      <Text c="subtle">Avg. {percentage} %</Text>
                      <Progress
                        w={160}
                        h={8}
                        value={percentage}
                        color={colors.purple[6]}
                        bg={colors.dark[6]}
                      />
                    </Group>
                    <Text c="subtle">
                      {publicRound?.batchVotes.length} Voted
                    </Text>
                  </Stack>
                </Group>
              );
            })}
          </Box>
        ) : (
          <InfoBanner
            title={'No Votes Yet'}
            description={'No votes have been cast yet for this round.'}
          />
        )}
      </Box>

      <Box>
        <Text fz="lg" fw={600}>
          Judge Rubric Vote
        </Text>
        <Text c={colors.dark[4]} mb="xl">
          Review applications and comments from the Judges
        </Text>
        <Box>
          {transformed?.map((app, index) => {
            const Icon = index < icons.length ? icons[index] : null;
            return (
              <Group
                px={isMobile ? 'md' : 'lg'}
                py="sm"
                mb={32}
                key={app.id}
                justify="space-between"
                className={fxClasses.hoverCard}
                onClick={() => navigate(`/ship/${app.id}`)}
              >
                <Group
                  style={{
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'start',
                  }}
                >
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
                    <Avatar
                      size={56}
                      src={app.application.imgUrl}
                      bg={colors.dark[0]}
                    />
                  </Box>
                  <Box>
                    <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                      {app.application.name}
                    </Text>
                    <Text c="subtle">{secondsToLongDate(app.lastUpdated)}</Text>
                  </Box>
                </Group>
                <Stack gap={0} align="flex-end">
                  <Group mb={4} gap={8}>
                    <Text c="subtle">Avg. {app.avgScore} %</Text>
                    <Progress
                      w={160}
                      h={8}
                      value={Number(app.avgScore)}
                      color={colors.purple[6]}
                      bg={colors.dark[6]}
                    />
                  </Group>
                  <Text c="subtle">{app.amountReviewed} Voted</Text>
                </Stack>
              </Group>
            );
          })}
        </Box>
      </Box>
    </PageLayout>
  );
};
