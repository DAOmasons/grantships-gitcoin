import {
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { IconGavel, IconStar } from '@tabler/icons-react';
import { Role } from '../../constants/enum';
import { ReactNode } from 'react';
import { truncateAddr } from '../../utils/common';
import { ADDR } from '../../constants/addresses';
import { AddressAvatar } from '../AddressAvatar';
import { RoleIcon } from '../RoleIcons';
import { useQuery } from '@tanstack/react-query';
import {
  FeedItemData,
  getTopicFeed,
  SystemNotice,
} from '../../queries/feedQuery';
import { TAG } from '../../constants/tags';
import { secondsToLongDate } from '../../utils/time';

export const TopicFeed = ({
  topicId,
  title,
}: {
  topicId: string;
  title: string;
}) => {
  console.log('topicId', topicId);
  const { data: feedItems } = useQuery({
    queryKey: ['comment feed', topicId],
    queryFn: () => getTopicFeed(topicId),
    enabled: !!topicId,
  });

  return (
    <Box>
      <Text fz="lg" fw="600" c="highlight" mb="xl">
        {title}
      </Text>
      <Stack gap="lg" mb={72}>
        {feedItems?.map((item) => {
          return <FeedFactory key={item.id} {...item} />;
        })}
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
  createdAt,
}: {
  title: string;
  text: string;
  role?: Role;
  graphic: ReactNode;
  createdAt: number;
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
          {secondsToLongDate(createdAt)}
        </Text>
      </Group>
      <Card variant="comment">
        <Text className="ws-pre-wrap">{text}</Text>
      </Card>
    </Box>
  );
};

export const FeedFactory = (item: FeedItemData) => {
  const { colors } = useMantineTheme();
  if (item.postType === TAG.APPLICATION_POST) {
    const notice = item as SystemNotice;

    return (
      <FeedItemShell
        title={notice.title}
        text={notice.text}
        graphic={<IconStar color={colors.purple[6]} stroke={1.2} size={40} />}
        createdAt={notice.createdAt}
      />
    );
  }
};
