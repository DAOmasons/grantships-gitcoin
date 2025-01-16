import React from 'react';
import { PageLayout } from '../layout/Page';
import { Card, Flex, Text, Title, useMantineTheme } from '@mantine/core';

export const Elections = () => {
  const { colors } = useMantineTheme();
  return (
    <PageLayout title="Judge Elections">
      <Title order={3} fz="h3" mb="xxl">
        Judge Elections
      </Title>
      <Card bg={colors.dark[1]}>
        <Flex h={150} justify="center" align="center">
          <Text fw={600} fz="xl">
            Under Construction
          </Text>
        </Flex>
      </Card>
    </PageLayout>
  );
};
