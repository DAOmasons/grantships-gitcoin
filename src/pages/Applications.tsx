import { PageLayout } from '../layout/Page';
import { useQuery } from '@tanstack/react-query';
import { getAppDrafts } from '../queries/getAppDrafts';
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import fxClasses from '../style/effects.module.css';
import { useNavigate } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';
import { useTablet } from '../hooks/useBreakpoints';
import { InfoBanner } from '../components/InfoBanner';
import { secondsToLongDate } from '../utils/time';

export const Applications = () => {
  const { data: drafts } = useQuery({
    queryKey: ['applications'],
    queryFn: getAppDrafts,
  });

  const { colors } = useMantineTheme();
  const isTablet = useTablet();

  const navigate = useNavigate();

  return (
    <PageLayout title="Round Applications">
      <Title fz="h3" order={3} mb="sm">
        GG23 Applications
      </Title>
      <Text c={'subtle'} mb="xl">
        Applications submitted by prospective ship operators for the GG23.
      </Text>
      <Box>
        {drafts?.length ? (
          drafts?.map((draft) => {
            return (
              <Group
                px={isTablet ? 'sm' : 'lg'}
                py="sm"
                mb={32}
                key={draft.id}
                justify="space-between"
                className={fxClasses.hoverCard}
                onClick={() => navigate(`/view-draft/${draft.id}`)}
              >
                <Group>
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
                {!isTablet && (
                  <Group>
                    <Box>
                      <Text mb={10}>Status</Text>
                      <Text c="subtle">In Review</Text>
                    </Box>
                    <IconChevronRight size={24} />
                  </Group>
                )}
              </Group>
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
        <Card variant="kelp-outline" mt="100px">
          <Flex
            justify="space-between"
            align={'center'}
            gap="md"
            direction={isTablet ? 'column' : 'row'}
          >
            <Box>
              <Text fz={isTablet ? 24 : 28} mb="12">
                Want to Run a Round?
              </Text>
              <Text>Applications can be submitted any time</Text>
            </Box>
            <Button
              onClick={() => navigate('/submit-application')}
              size={isTablet ? 'sm' : undefined}
            >
              Submit Application
            </Button>
          </Flex>
        </Card>
      </Box>
    </PageLayout>
  );
};
