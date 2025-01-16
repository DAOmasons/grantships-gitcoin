import React from 'react';
import { PageLayout } from '../layout/Page';
import { Box, Card, Flex, Text, Title, useMantineTheme } from '@mantine/core';

export const Elections = () => {
  const { colors } = useMantineTheme();
  return (
    <PageLayout title="Judge Elections">
      <Title order={3} fz="h3" mb="xxl">
        Judge Elections
      </Title>
      <Card bg={colors.dark[1]}>
        <Flex h={100} justify="center" align="center" direction="column">
          <Text fw={600} fz="lg" mb="sm">
            Under Construction
          </Text>
          <Text>
            We still need to figure out of which platform we would like to use
            for voting
          </Text>
        </Flex>
      </Card>
    </PageLayout>
  );
};
