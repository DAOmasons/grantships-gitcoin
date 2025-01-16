import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layout/Page';
import { useChews } from '../hooks/useChews';
import { useParams } from 'react-router-dom';
import { IconBrandTelegram, IconBrandX, IconMail } from '@tabler/icons-react';
import { AddressAvatar } from '../components/AddressAvatar';
import { truncateAddr } from '../utils/common';

export const ViewApplication = () => {
  const { id } = useParams();
  const theme = useMantineTheme();

  const { applicationRound } = useChews();

  const selectedApplication = applicationRound?.applications.find(
    (app) => app.id === id
  );

  return (
    <PageLayout title={selectedApplication?.copy.roundName || ''}>
      <Group justify="center">
        <Avatar src={selectedApplication?.copy.imgUrl} size={171} mb="xl" />
      </Group>
      <Stack gap="lg" mb={100}>
        <Group wrap="nowrap" gap="sm">
          <Box w="50%">
            <Text fw={600} mb={10}>
              Name
            </Text>
            <Card variant="inner">
              <Text c="subtle" lineClamp={1}>
                {selectedApplication?.copy.roundName}
              </Text>
            </Card>
          </Box>
          <Box w="50%">
            <Text fw={600} mb={10}>
              Address
            </Text>
            <Card variant="inner">
              <Text c="subtle" lineClamp={1}>
                {selectedApplication?.registrar}
              </Text>
            </Card>
          </Box>
        </Group>
        {selectedApplication?.copy.responses.map((response, index) => {
          return (
            <Box key={response.title}>
              <Text fw={600} mb={10}>
                {response.title}
              </Text>
              <Card variant="inner">
                <Text c="subtle">{response.response}</Text>
              </Card>
            </Box>
          );
        })}
        <Group gap="lg" wrap="nowrap">
          <Box w="50%">
            <Text fw={600} mb={10}>
              Email
            </Text>
            <Card variant="inner">
              <Group gap={10}>
                <IconMail size={28} stroke={1} color={theme.colors.dark[4]} />
                <Text c="subtle">daomasons@gmail.com</Text>
              </Group>
            </Card>
          </Box>
          <Box w="50%">
            <Text fw={600} mb={10}>
              X
            </Text>
            <Card variant="inner">
              <Group gap={10}>
                <IconBrandX size={28} stroke={1} color={theme.colors.dark[4]} />
                <Text c="subtle">@daomasons</Text>
              </Group>
            </Card>
          </Box>
        </Group>
        <Group gap="lg" wrap="nowrap">
          <Box w="50%">
            <Text fw={600} mb={10}>
              Discord
            </Text>
            <Card variant="inner">
              <Group gap={10}>
                <IconMail size={28} stroke={1} color={theme.colors.dark[4]} />
                <Text c="subtle">https://discord.gg/zf8H97fx</Text>
              </Group>
            </Card>
          </Box>
          <Box w="50%">
            <Text fw={600} mb={10}>
              Github
            </Text>
            <Card variant="inner">
              <Group gap={10}>
                <IconBrandX size={28} stroke={1} color={theme.colors.dark[4]} />
                <Text c="subtle">https://github.com/DAOmasons</Text>
              </Group>
            </Card>
          </Box>
        </Group>

        <Group gap="lg" wrap="nowrap">
          <Box w="50%">
            <Text fw={600} mb={10}>
              Telegram
            </Text>
            <Card variant="inner">
              <Group gap={10}>
                <IconBrandTelegram
                  size={28}
                  stroke={1}
                  color={theme.colors.dark[4]}
                />
                <Text c="subtle">https://t.me/grantships</Text>
              </Group>
            </Card>
          </Box>
          <Box w="50%"></Box>
        </Group>
      </Stack>
      <Divider color={theme.colors.dark[1]} mb="lg" />
      {selectedApplication?.votes && selectedApplication.votes.length > 0 && (
        <Text fw={600} fz="lg" mb="md">
          Closing comment from the judges
        </Text>
      )}
      {selectedApplication?.votes?.map((vote) => {
        return (
          <Box mb="lg">
            <Group mb={18} justify="space-between">
              <Group gap="sm">
                <AddressAvatar
                  address={'0xd800b05c70a2071bc1e5eac5b3390da1eb67bc9d'}
                />
                <Text fz="lg" fw={600}>
                  {truncateAddr('0xd800b05c70a2071bc1e5eac5b3390da1eb67bc9d')}
                </Text>
              </Group>
              <Group gap="sm">
                <Text c="subtle">Score 34/40</Text>
                <Button variant="secondary" size="xs" onClick={() => {}}>
                  Read Review
                </Button>
              </Group>
            </Group>
            <Card
              variant="inner"
              style={{
                border: `1px solid ${theme.colors.dark[4]}`,
              }}
            >
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Card>
          </Box>
        );
      })}
    </PageLayout>
  );
};
