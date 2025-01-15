import {
  Box,
  Button,
  Group,
  Loader,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconExclamationMark, IconX } from '@tabler/icons-react';

export const LoadingState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Box>
      <Group justify="center" mt={4} mb="md">
        <Loader type="bars" color={colors.purple[6]} size={56} />
      </Group>
      <Text ta="center" mb="xxs">
        {title}
      </Text>
      <Text ta="center" c="subtle">
        {description}
      </Text>
    </Box>
  );
};

export const ErrorState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Box>
      <Group justify="center" mt={4} mb="md">
        <IconX size={56} color={colors.red[6]} />
      </Group>
      <Text ta="center" mb="xxs">
        {title}
      </Text>
      <Text ta="center" c="subtle">
        {description}
      </Text>
    </Box>
  );
};

export const TimeoutState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { colors } = useMantineTheme();
  return (
    <Box>
      <Group justify="center" mt={4} mb="md">
        <IconExclamationMark size={56} color={colors.purple[6]} />
      </Group>
      <Text ta="center" mb="xxs">
        {title}
      </Text>
      <Text ta="center" c="subtle">
        {description}
      </Text>
    </Box>
  );
};

export const SuccessState = ({
  title,
  description,
  successButton,
}: {
  title: string;
  description: string;
  successButton?: {
    label: string;
    onClick: () => void;
  };
}) => {
  const { colors } = useMantineTheme();
  return (
    <Box>
      <Group justify="center" mt={4} mb="md">
        <IconCheck size={56} color={colors.kelp[6]} />
      </Group>
      <Text ta="center" mb="xxs">
        {title}
      </Text>
      <Text ta="center" c="subtle" mb="md">
        {description}
      </Text>
      {successButton && (
        <Group justify="center">
          <Button onClick={successButton.onClick} h="fit-content" py="xxs">
            {successButton.label}
          </Button>
        </Group>
      )}
    </Box>
  );
};
