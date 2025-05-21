import { Avatar, Box, Group, Tabs, Text, Title } from '@mantine/core';
import { PageLayout } from '../layout/Page';
import {
  IconAward,
  IconStar,
  IconTrophy,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { VoteUI } from '../components/publicvote/VoteUI';
import { Results } from '../components/publicvote/Results';
import { Reviews } from '../components/publicvote/Reviews';
import gtcLogo from '../assets/gitcoin-gtc-logo.png';
import { getTimeFromNow, secondsToLongDate } from '../utils/time';
import { Bold } from '../components/typography';

const VOTE_TIME = 1747936800;

export const Vote = () => {
  const [currentTab, setCurrentTab] = useState('vote');

  // const [_tick, setTick] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTick((prev) => prev + 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // return (
  //   <PageLayout title="Vote">
  //     <Box mb={'lg'}>
  //       <Title order={3} fz={'h3'} mb={'xl'}>
  //         Voting Will be Live {getTimeFromNow(VOTE_TIME)}
  //       </Title>
  //       <Group justify="center">
  //         <Avatar src={gtcLogo} size={171} mb="xl" />
  //       </Group>
  //       <Text c="subtle" mb="sm"></Text>
  //       <Text mb="sm">
  //         In order to be eligible, you must hold at least{' '}
  //         <Bold>100 GTC tokens on mainnet</Bold> before May 21st 2024. Voting
  //         will take place on <Bold>Arbitrum</Bold>
  //       </Text>
  //     </Box>
  //   </PageLayout>
  // );

  return (
    <PageLayout title="Vote">
      <Tabs
        defaultValue={currentTab}
        value={currentTab}
        mb={70}
        onChange={(e) => (e ? setCurrentTab(e) : undefined)}
      >
        <Tabs.List mb="md">
          <Tabs.Tab value="vote" leftSection={<IconStar size={14} />}>
            Vote
          </Tabs.Tab>
          <Tabs.Tab value="results" leftSection={<IconTrophy size={14} />}>
            Results
          </Tabs.Tab>
          <Tabs.Tab value="reviews" leftSection={<IconUsersGroup size={14} />}>
            Reviews
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="vote">
          <VoteUI setCurrentTab={setCurrentTab} />
        </Tabs.Panel>
        <Tabs.Panel value="results">
          <Results />
        </Tabs.Panel>
        <Tabs.Panel value="reviews">
          <Reviews />
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
