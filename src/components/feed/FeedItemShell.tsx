import { ReactNode, useMemo } from 'react';
import { Role } from '../../constants/enum';
import { Box, Card, Group, Text } from '@mantine/core';
import { RoleIcon } from '../RoleIcons';
import { secondsToLongDate } from '../../utils/time';
import {
  applyTextTransformations,
  handleInjectedLink,
} from '../../utils/transformations';

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
  const resolvedText = useMemo(() => {
    return applyTextTransformations(text, [handleInjectedLink]);
  }, [text]);
  return (
    <Card variant="comment">
      <Group mb="sm" justify="space-between">
        <Group gap="sm">
          <Box w={48} h={48}>
            {graphic}
          </Box>
          <Box>
            <Group gap={8} align="center">
              <Text fz="lg" c="highlight" fw="600">
                {title}
              </Text>
              {role && (
                <RoleIcon
                  iconRole={role}
                  size={20}
                  style={{ transform: 'translateY(-2px)' }}
                />
              )}
            </Group>
            <Text c="subtle" fz="sm">
              {secondsToLongDate(createdAt)}
            </Text>
          </Box>
        </Group>
      </Group>
      <Text className="ws-pre-wrap">{resolvedText}</Text>
    </Card>
  );
};
