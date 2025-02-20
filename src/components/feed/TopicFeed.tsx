import {
  Avatar,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import { IconGavel } from '@tabler/icons-react';
import { Role } from '../../constants/enum';
import { ReactNode } from 'react';
import { truncateAddr } from '../../utils/common';
import { ADDR } from '../../constants/addresses';
import { AddressAvatar } from '../AddressAvatar';
import { AdminIcon, JudgeIcon, RoleIcon, ShipIcon } from '../RoleIcons';

export const TopicFeed = ({
  topicId,
  title,
}: {
  topicId: string;
  title: string;
}) => {
  // const {} = useQuery({})

  return (
    <Box>
      <Text fz="lg" fw="600" c="highlight" mb="xl">
        {title}
      </Text>
      <Stack gap="lg" mb={72}>
        {Array.from({ length: 5 }).map((_, index) => (
          <FeedItemShell
            title={truncateAddr(ADDR.HATS)}
            role={Role.Admin}
            text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
            
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            graphic={<AddressAvatar size={40} bg="blue" address={ADDR.HATS} />}
          />
        ))}
      </Stack>
      <Textarea
        placeholder="Write a comment..."
        mt="lg"
        minRows={3}
        maxRows={8}
        autosize
      />
      <Group justify="center" mt="lg">
        <Button>Post Comment</Button>
      </Group>
    </Box>
  );
};

const FeedItemShell = ({
  title,
  text,
  role,
  graphic,
}: {
  title: string;
  text: string;
  role?: Role;
  graphic: ReactNode;
}) => {
  return (
    <Box>
      <Group mb="sm" justify="space-between">
        <Group gap="sm">
          <Box w={40} h={40}>
            {graphic}
          </Box>
          <Text fz="lg" c="highlight" fw="600">
            {title}
          </Text>
          {role && <RoleIcon iconRole={role} />}
        </Group>
        <Text c="subtle" fz="sm">
          Jan 1, 2025
        </Text>
      </Group>
      <Card variant="comment">
        <Text className="ws-pre-wrap">{text}</Text>
      </Card>
    </Box>
  );
};
