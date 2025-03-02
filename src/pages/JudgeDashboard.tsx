import { Avatar, Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { InfoTimeline } from '../components/InfoTimeline';
import { PageLayout } from '../layout/Page';
import { useChews } from '../hooks/useChews';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { ContestStatus } from '../constants/enum';
import { secondsToLongDate } from '../utils/time';

export const JudgeDashboard = () => {
  const { applicationRound, isLoadingAppRound } = useChews();
  const { address } = useAccount();
  const { isMobile, isTablet } = useBreakpoints();

  const step = applicationRound ? applicationRound.round?.contestStatus : 0;

  const canJudgesVote =
    Number(applicationRound?.round?.contestStatus) === ContestStatus.Voting;

  return (
    <PageLayout title="Judge Dashboard">
      <Box px="lg" mb="76">
        {!isMobile && (
          <InfoTimeline
            events={[
              'Round Applications',
              'Judge Vote',
              'Rounds Live',
              'Round Review',
            ]}
            step={step}
          />
        )}
      </Box>
      <Title order={3} fz="h3">
        Round Operator Applications
      </Title>
      <Text fz="16" c="subtle" fw={500} mb="xl">
        Community leaders volunteering their expertise
      </Text>
      <Box>
        {!isLoadingAppRound &&
          applicationRound?.applications.map((app, index) => {
            const hasUserVoted = app.votes.some(
              (vote) => vote.reviewer === address
            );

            return (
              <Group key={`${app.registrar}-${index}`} px={32} py={16} mb={8}>
                <Avatar src={app.application.imgUrl} size={56} bg="white" />
                <Box component={Link} to={`/ship/${app.id}`}>
                  <Text fw={600} mb={4}>
                    {app.application.name}
                  </Text>
                  <Text c={'subtle'}>
                    {secondsToLongDate(app.application.lastUpdated)}
                  </Text>
                </Box>
                <Stack
                  ml={isTablet ? 0 : 'auto'}
                  gap={4}
                  align={isTablet ? 'start' : 'end'}
                >
                  <Button
                    size="xs"
                    variant={hasUserVoted ? 'secondary' : undefined}
                    component={Link}
                    disabled={!hasUserVoted && !canJudgesVote}
                    to={
                      hasUserVoted
                        ? `/view-application/${app.id}`
                        : `/vote-application/${app.id}`
                    }
                  >
                    {hasUserVoted ? 'Vote Completed' : 'Vote'}
                  </Button>
                  <Text c="subtle" fz="sm">
                    Currently {app.amountReviewed} Voted
                  </Text>
                </Stack>
              </Group>
            );
          })}
      </Box>
    </PageLayout>
  );
};
