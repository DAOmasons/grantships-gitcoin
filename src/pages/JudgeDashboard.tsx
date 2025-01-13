import { Avatar, Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { InfoTimeline } from '../components/InfoTimeline';
import { PageLayout } from '../layout/Page';
import { useChews } from '../hooks/useChews';

// const items = [
//   {
//     name: 'nftguy.eth',
//     imgurl: 'https://i.pravatar.cc/150?img=1',
//     lastUpdated: 1736537962,
//     amountVoted: 3,
//     hasUserVoted: false,
//   },
//   {
//     name: 'jord.eth',
//     imgurl: 'https://i.pravatar.cc/150?img=2',
//     lastUpdated: 1736537962,
//     amountVoted: 2,
//     hasUserVoted: false,
//   },
//   {
//     name: 'mask.eth',
//     imgurl: 'https://i.pravatar.cc/150?img=3',
//     lastUpdated: 1736537962,
//     amountVoted: 3,
//     hasUserVoted: false,
//   },
//   {
//     name: 'mememe.eth',
//     imgurl: 'https://i.pravatar.cc/150?img=4',
//     lastUpdated: 1736537962,
//     amountVoted: 1,
//     hasUserVoted: true,
//   },
//   {
//     name: 'baebuluh.eth',
//     imgurl: 'https://i.pravatar.cc/150?img=5',
//     lastUpdated: 1736537962,
//     amountVoted: 5,
//     hasUserVoted: false,
//   },
//   {
//     name: 'serious.eth',
//     imgurl: 'https://i.pravatar.cc/150?img=6',
//     lastUpdated: 1736537962,
//     amountVoted: 0,
//     hasUserVoted: true,
//   },
// ];

export const JudgeDashboard = () => {
  const { applicationRound, isLoadingAppRound } = useChews();

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
          step={2}
        />
      </Box>
      <Title order={3} fz="h3">
        Round Operator Applications
      </Title>
      <Text fz="16" c="subtle" fw={500} mb="xl">
        Community leaders volunteering their expertise
      </Text>
      <Box>
        {/* {items.map((item) => (
          <Group key={item.name} px={32} py={16} mb={8}>
            <Avatar src={item.imgurl} size={56} />
            <Box>
              <Text fw={600} mb={4}>
                {item.name}
              </Text>
              <Text c={'subtle'}>Last Updated Jan 1, 2025 </Text>
            </Box>
            <Stack ml="auto" gap={4} align="end">
              <Button size="xs" variant={item.hasUserVoted ? 'secondary' : ''}>
                {item.hasUserVoted ? 'Vote Completed' : 'Vote'}
              </Button>
              <Text c="subtle" fz="sm">
                Currently {item.amountVoted} Voted
              </Text>
            </Stack>
          </Group>
        ))} */}
      </Box>
    </PageLayout>
  );
};
