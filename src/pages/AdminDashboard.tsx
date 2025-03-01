import { Box, Tabs, Text, Title, useMantineTheme } from '@mantine/core';
import { useChews } from '../hooks/useChews';
import { PageLayout } from '../layout/Page';
import {
  IconFile,
  IconFileDescription,
  IconManualGearbox,
} from '@tabler/icons-react';
import { useState } from 'react';

export const AdminDashboard = () => {
  const { applicationRound } = useChews();
  const { colors } = useMantineTheme();
  const [tab, setTab] = useState<string | null>('applications');

  return (
    <PageLayout title="Admin Dashboard">
      <Tabs color={colors.dark[3]} value={tab} onChange={setTab}>
        <Tabs.List mb={70}>
          <Tabs.Tab
            value="applications"
            leftSection={
              <IconFileDescription
                stroke={1.2}
                // color={
                //   tab === 'applications' ? colors.purple[6] : colors.dark[4]
                // }
              />
            }
          >
            Applications
          </Tabs.Tab>
          <Tabs.Tab
            value="settings"
            leftSection={
              <IconManualGearbox
                stroke={1.2}
                // color={tab === 'settings' ? colors.purple[6] : colors.dark[4]}
              />
            }
          >
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="applications">
          <Box>
            <Title fz="h3" order={3} mb="sm">
              GG23 Applications
            </Title>
            <Text c={'subtle'}>
              Applications wishing to compete in the current round
            </Text>
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <Box>
            <Title fz="h3" order={3} mb="sm">
              Contract Settings
            </Title>
            <Text c={'subtle'}>
              Manage vote contract states, progress rounds
            </Text>
          </Box>
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
