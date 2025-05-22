import { Tabs, useMantineTheme } from '@mantine/core';
import { PageLayout } from '../layout/Page';
import { IconFileDescription, IconManualGearbox } from '@tabler/icons-react';
import { useState } from 'react';
import { ApplicationPanel } from '../components/dashboards/ApplicationPanel';
import { SettingsPanel } from '../components/dashboards/SettingsPanel';

export const AdminDashboard = () => {
  const { colors } = useMantineTheme();
  const [tab, setTab] = useState<string | null>('applications');

  return (
    <PageLayout title="Admin Dashboard">
      <Tabs color={colors.dark[3]} value={tab} onChange={setTab}>
        <Tabs.List mb={70}>
          <Tabs.Tab
            value="applications"
            leftSection={<IconFileDescription stroke={1.2} />}
          >
            Applications
          </Tabs.Tab>
          <Tabs.Tab
            value="settings"
            leftSection={<IconManualGearbox stroke={1.2} />}
          >
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="applications">
          <ApplicationPanel />
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <SettingsPanel />
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
