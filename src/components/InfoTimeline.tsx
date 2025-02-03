import { Box, Flex, Group, Text, useMantineTheme } from '@mantine/core';
import React from 'react';

type InfoTimelineProps = {
  events: string[];
  step: number;
};

export const InfoTimeline = ({ events, step }: InfoTimelineProps) => {
  const { colors } = useMantineTheme();
  return (
    <Group wrap={'nowrap'} gap="xxs">
      {events?.map((event, index) => (
        <Box key={`${event}-${index}`} w={`${100 / events.length}%`}>
          <Text
            fz="xs"
            mb="xxs"
            c={step > index ? colors.dark[2] : colors.dark[4]}
          >
            Step {index + 1}
          </Text>
          <Group gap={0} wrap={'nowrap'} mb="xxs">
            <Box
              bg={step > index ? colors.purple[6] : colors.dark[6]}
              style={{
                borderRadius: '50%',
              }}
              h="6px"
              w="6px"
            />
            <Box
              w="100%"
              bg={step > index ? colors.purple[6] : colors.dark[6]}
              h={2}
            />
          </Group>
          <Group
            justify="center"
            h={22}
            bg={colors.dark[6]}
            style={{ borderRadius: '4px' }}
          >
            <Text
              fz="xs"
              lineClamp={1}
              c={step > index ? colors.dark[2] : colors.dark[4]}
            >
              {event}
            </Text>
          </Group>
        </Box>
      ))}
    </Group>
  );
};
