import { PageLayout } from '../layout/Page';
import { useQuery } from '@tanstack/react-query';
import { getAppDrafts, getAppDraftsByUser } from '../queries/getAppDrafts';
import {
  Avatar,
  Box,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import fxClasses from '../style/effects.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';

export const MyApplications = () => {
  const { address } = useParams();
  const { data: drafts } = useQuery({
    queryKey: ['my-applications', address],
    queryFn: () => getAppDraftsByUser(address as string),
  });

  const { colors } = useMantineTheme();

  const navigate = useNavigate();

  return (
    <PageLayout title="Round Applications">
      <Title fz="h3" order={3} mb="sm">
        My Applications
      </Title>
      <Text c={'subtle'} mb="xl">
        Your applications submitted to become a Grant Ship operator for GG23.
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
                <Avatar
                  size={56}
                  bg={colors.dark[2]}
                  src={draft.parsedJSON.imgUrl}
                />
                <Box>
                  <Text fw={600} fz="lg" mb={4} maw={240} lineClamp={1}>
                    {draft.parsedJSON.name}
                  </Text>
                  <Text c="subtle">Last Updated Jan 1, 2025</Text>
                </Box>
              </Group>
              <Group>
                <Box>
                  <Text mb={10}>Status</Text>
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
