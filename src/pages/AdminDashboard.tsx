import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useChews } from '../hooks/useChews';
import { PageLayout } from '../layout/Page';
import {
  IconCheck,
  IconChevronRight,
  IconFile,
  IconFileDescription,
  IconManualGearbox,
  IconRocket,
  IconShip,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAppDrafts } from '../queries/getAppDrafts';
import { useTablet } from '../hooks/useBreakpoints';
import { InfoBanner } from '../components/InfoBanner';
import { secondsToLongDate } from '../utils/time';
import fxClasses from '../style/effects.module.css';
import { useNavigate } from 'react-router-dom';
import { CURRENT_ROUND } from '../constants/tags';

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
          <ApplicationPanel />
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

const ApplicationPanel = () => {
  const isTablet = useTablet();
  const { data: drafts } = useQuery({
    queryKey: ['applications'],
    queryFn: getAppDrafts,
  });
  const { colors } = useMantineTheme();
  const navigate = useNavigate();

  const { approved, pending } = useMemo(() => {
    if (!drafts) return { approved: [], pending: [] };

    const approved = drafts.filter((draft) =>
      draft.approvedRounds.includes(CURRENT_ROUND)
    );
    const pending = drafts.filter(
      (draft) => !draft.approvedRounds.includes(CURRENT_ROUND)
    );

    return { approved, pending };
  }, [drafts]);

  return (
    <Box>
      <Title fz="h3" order={3} mb="sm">
        GG23 Applications
      </Title>
      <Text c={'subtle'} mb="xl">
        Applications wishing to compete in the current round
      </Text>
      <Text fz="lg" fw={600} mb="xs">
        Approved Ships
      </Text>
      <Box mb="xxl">
        {approved?.length ? (
          approved?.map((draft) => {
            return (
              <Flex
                px={isTablet ? 'sm' : 'lg'}
                py="sm"
                mb={32}
                key={draft.id}
                justify="space-between"
                direction={isTablet ? 'column' : 'row'}
              >
                <Group mb={isTablet ? 'md' : undefined}>
                  <Avatar size={56} bg={colors.dark[2]} src={draft.imgUrl} />
                  <Box>
                    <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                      {draft.name}
                    </Text>
                    <Text c="subtle">
                      {secondsToLongDate(draft.lastUpdated)}
                    </Text>
                  </Box>
                </Group>
                <Group gap="sm">
                  <Tooltip label="View Application">
                    <ActionIcon
                      onClick={() => navigate(`/ship/${draft.rootId}`)}
                    >
                      <IconRocket
                        size={24}
                        stroke={1.2}
                        color={colors.purple[6]}
                      />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="View Application">
                    <ActionIcon
                      onClick={() => navigate(`/view-draft/${draft.id}`)}
                    >
                      <IconChevronRight size={24} stroke={1.5} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Flex>
            );
          })
        ) : (
          <Box>
            <InfoBanner
              title="No Applications"
              description="No applications have been submitted yet."
            />
          </Box>
        )}
      </Box>
      <Text fz="lg" fw={600} mb="xs">
        Applications In Review
      </Text>
      <Box>
        {pending?.length ? (
          pending?.map((draft) => {
            return (
              <Flex
                px={isTablet ? 'sm' : 'lg'}
                py="sm"
                mb={32}
                key={draft.id}
                justify="space-between"
                direction={isTablet ? 'column' : 'row'}
              >
                <Group mb={isTablet ? 'md' : undefined}>
                  <Avatar size={56} bg={colors.dark[2]} src={draft.imgUrl} />
                  <Box>
                    <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                      {draft.name}
                    </Text>
                    <Text c="subtle">
                      {secondsToLongDate(draft.lastUpdated)}
                    </Text>
                  </Box>
                </Group>

                <Group gap="sm">
                  <Tooltip label="Approve Application">
                    <ActionIcon
                      onClick={() => navigate(`/ship/${draft.rootId}`)}
                    >
                      <IconCheck
                        size={24}
                        color={colors.kelp[6]}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="View Application">
                    <ActionIcon
                      onClick={() => navigate(`/view-draft/${draft.id}`)}
                    >
                      <IconChevronRight size={24} stroke={1.5} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Flex>
            );
          })
        ) : (
          <Box>
            <InfoBanner
              title="No Applications"
              description="No applications have been submitted yet."
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
