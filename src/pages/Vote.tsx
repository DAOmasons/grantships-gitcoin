import { Tabs } from '@mantine/core';
import { PageLayout } from '../layout/Page';
import { IconStar, IconTrophy, IconUsersGroup } from '@tabler/icons-react';
import { useState } from 'react';
import { VoteUI } from '../components/publicvote/VoteUI';
import { Results } from '../components/publicvote/Results';
import { Reviews } from '../components/publicvote/Reviews';
import { useMobile } from '../hooks/useBreakpoints';

export const Vote = () => {
  const [currentTab, setCurrentTab] = useState('results');
  const isMobile = useMobile();

  return (
    <PageLayout title="Vote">
      <Tabs
        fz="lg"
        defaultValue={currentTab}
        value={currentTab}
        mb={70}
        onChange={(e) => (e ? setCurrentTab(e) : undefined)}
      >
        <Tabs.List mb="md">
          {/* <Tabs.Tab
            value="vote"
            leftSection={<IconStar size={14} />}
            px={isMobile ? 'sm' : 'md'}
          >
            Vote
          </Tabs.Tab> */}
          <Tabs.Tab
            value="results"
            leftSection={<IconTrophy size={14} />}
            px={isMobile ? 'sm' : 'md'}
          >
            Results
          </Tabs.Tab>
          <Tabs.Tab
            value="reviews"
            leftSection={<IconUsersGroup size={14} />}
            px={isMobile ? 'sm' : 'md'}
          >
            Reviews
          </Tabs.Tab>
        </Tabs.List>
        {/* <Tabs.Panel value="vote">
          <VoteUI setCurrentTab={setCurrentTab} />
        </Tabs.Panel> */}
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
