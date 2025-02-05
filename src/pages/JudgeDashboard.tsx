import { Avatar, Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { InfoTimeline } from '../components/InfoTimeline';
import { PageLayout } from '../layout/Page';
import { useChews } from '../hooks/useChews';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { InfoBanner } from '../components/InfoBanner';

const AWAITING_REVEAL = true;

export const JudgeDashboard = () => {
  const { applicationRound, isLoadingAppRound } = useChews();
  const { address } = useAccount();

  return (
    <PageLayout title="Judge Dashboard">
      <Box px="lg" mb="76">
        <InfoTimeline
          events={[
            'Round Applications',
            'Judge Vote',
            'Rounds Live',
            'Round Review',
          ]}
          step={1}
        />
      </Box>
      <Title order={3} fz="h3">
        Round Operator Applications
      </Title>
      <Text fz="16" c="subtle" fw={500} mb="xl">
        Community leaders volunteering their expertise
      </Text>
      <Box>
        {AWAITING_REVEAL ? (
          <InfoBanner
            title="Coming Up Soon!"
            description="Applications are still being reviewed and prepared for the Judge Vote"
          />
        ) : (
          !isLoadingAppRound &&
          applicationRound?.applications.map((app, index) => {
            const hasUserVoted = app.votes.some(
              (vote) => vote.reviewer === address
            );

            return (
              <Group key={`${app.registrar}-${index}`} px={32} py={16} mb={8}>
                <Avatar src={app.copy.imgUrl} size={56} />
                <Box component={Link} to={`/view-application/${app.id}`}>
                  <Text fw={600} mb={4}>
                    {app.copy.roundName}
                  </Text>
                  <Text c={'subtle'}>Last Updated Jan 1, 2025 </Text>
                </Box>
                <Stack ml="auto" gap={4} align="end">
                  <Button
                    size="xs"
                    variant={hasUserVoted ? 'secondary' : undefined}
                    component={Link}
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
          })
        )}
      </Box>
    </PageLayout>
  );
};
