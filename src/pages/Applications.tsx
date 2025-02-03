import { PageLayout } from '../layout/Page';
import { useQuery } from '@tanstack/react-query';
import { getAppDrafts } from '../queries/getAppDrafts';
import { Avatar, Box, Group, Text, Title } from '@mantine/core';
import fxClasses from '../style/effects.module.css';
import { useNavigate } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';

export const Applications = () => {
  const { data: drafts } = useQuery({
    queryKey: ['applications'],
    queryFn: getAppDrafts,
  });

  const navigate = useNavigate();

  return (
    <PageLayout title="Round Applications">
      <Title fz="h3" order={3} mb="sm">
        GG23 Applications
      </Title>
      <Text>
        <Text c={'subtle'} mb="xl">
          Applications submitted by prospective ship operators for the GG23.
        </Text>
      </Text>
      <Box>
        {drafts?.map((draft) => {
          return (
            <Group
              px="lg"
              py="sm"
              mb={32}
              key={draft.id}
              justify="space-between"
              className={fxClasses.hoverCard}
              onClick={() => navigate(`/view-draft/${draft.id}`)}
            >
              <Group>
                <Avatar size={56} src={draft.parsedJSON.imgUrl} />
                <Box>
                  <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                    {draft.parsedJSON.name}
                  </Text>
                  <Text c="subtle">Last Updated Jan 1, 2025</Text>
                </Box>
              </Group>
              <Group>
                <Box>
                  <Text>Status</Text>
                  <Text c="subtle">In Review</Text>
                </Box>
                <IconChevronRight size={24} />
              </Group>
            </Group>
          );
        })}
      </Box>
    </PageLayout>
  );
};
