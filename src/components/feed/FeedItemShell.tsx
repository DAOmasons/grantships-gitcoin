import { ReactNode } from 'react';
import { Role } from '../../constants/enum';
import { Box, Card, Group, Text } from '@mantine/core';
import { RoleIcon } from '../RoleIcons';
import { secondsToLongDate } from '../../utils/time';

export const FeedItemShell = ({
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
