import { Box, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { IconGhost } from '@tabler/icons-react';

export const InfoBanner = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { colors, radius } = useMantineTheme();
  return (
    <Box bg={colors.purple[10]} style={{ borderRadius: radius.sm }} py="md">
      <Stack align="center" gap={0} mb="sm">
        <IconGhost size={190} color={colors.purple[6]} stroke={0.25} />
        <Title fz="h3" order={4} mb={8}>
          {title}
        </Title>
        <Text c="subtle" maw={400} ta="center">
          {description}
        </Text>
      </Stack>
    </Box>
  );
};
