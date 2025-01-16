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
import { useChews } from '../hooks/useChews';
import { PageLayout } from '../layout/Page';
import { Address, formatEther } from 'viem';
import { AddressAvatar } from '../components/AddressAvatar';
import { truncateAddr } from '../utils/common';
import fxClasses from '../style/effects.module.css';
import { useNavigate } from 'react-router-dom';

export const Reviews = () => {
  const { applicationRound, isLoadingAppRound } = useChews();
  const { colors } = useMantineTheme();
  const navigate = useNavigate();

  if (!applicationRound || isLoadingAppRound) {
    return null;
  }
  return (
    <PageLayout title="Reviews">
      <Title order={3} fz="h3" mb="sm">
        Reviews
      </Title>
      <Text c="subtle" mb="xl">
        Reviews of all applicants currently competing
      </Text>
      <Box mx="md">
        {applicationRound?.applications.map((app) => {
          if (app.votes.length === 0) {
            return null;
          }
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
          return (
            <Box mb={100} key={app.id}>
              <Group gap={0} justify="space-between" mb="xl">
                <Group gap="sm">
                  <Avatar src={app.copy.imgUrl} size={56} />
                  <Box>
                    <Text fz="lg" fw={600} mb={4}>
                      {app.copy.roundName}
                    </Text>
                    <Text>Last Updated Jan 1, 2025</Text>
                  </Box>
                </Group>
                <Stack gap="xs">
                  <Progress
                    w={160}
                    h={8}
                    value={Number(avgScore)}
                    color={colors.purple[6]}
                    bg={colors.dark[2]}
                  />
                  <Text c="subtle">Avg. {Number(avgScore).toFixed()} %</Text>
                </Stack>
              </Group>
              <Text fw={600} fz="lg" mb="md">
                Reviews From the Judges
              </Text>

              {app.votes.length === 0 ? (
                <></>
              ) : (
                app.votes.map((vote) => {
                  const totalScore = Object.values(vote.review.scores).reduce(
                    (acc, val) => acc + val,
                    0
                  );
                  return (
                    <Group
                      justify="space-between"
                      py={8}
                      px={6}
                      mb="xs"
                      className={fxClasses.hoverCard}
                      onClick={() => navigate(`/review/${vote.id}`)}
                    >
                      <Group gap="xs">
                        <AddressAvatar
                          address={vote.reviewer as Address}
                          size={24}
                        />
                        <Text>{truncateAddr(vote.reviewer)}</Text>
                      </Group>
                      <Box>
                        <Progress
                          mb={4}
                          value={(totalScore / 40) * 100}
                          w={160}
                          h={8}
                          color={colors.dark[2]}
                          //   opacity={0.6}
                        />
                        <Text c="subtle">Total {totalScore}/40</Text>
                      </Box>
                    </Group>
                  );
                })
              )}
            </Box>
          );
        })}
      </Box>
    </PageLayout>
  );
};
