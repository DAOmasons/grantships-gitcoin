import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageLayout } from '../layout/Page';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useChews } from '../hooks/useChews';
import { useQuery } from '@tanstack/react-query';
import { getApplicationMetadata } from '../queries/getMetadata';
import { JudgeIcon, ShipIcon } from '../components/RoleIcons';
import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react';
import { formatEther } from 'viem';
import { useBreakpoints } from '../hooks/useBreakpoints';

export const Ship = () => {
  const { id } = useParams();
  const { applicationRound } = useChews();
  const { colors } = useMantineTheme();
  const { isTablet } = useBreakpoints();

  const ship = useMemo(() => {
    const locatedShip = applicationRound?.applications.find(
      (app) => app.id === id
    );

    if (!locatedShip) return;

    const avgScore =
      locatedShip?.votes.length === 0
        ? '--'
        : formatEther(
            (locatedShip?.votes.reduce(
              (acc, vote) => acc + BigInt(vote.amount),
              0n
            ) /
              BigInt(locatedShip?.votes.length)) *
              100n
          );

    return { ...locatedShip, avgScore };
  }, [id, applicationRound]);

  const { data: metadata, isLoading: isLoadingMetadata } = useQuery({
    queryKey: ['metadata', ship?.application.ipfsHash],
    queryFn: () => getApplicationMetadata(ship?.application.ipfsHash as string),
    enabled: !!ship?.application.ipfsHash,
  });

  if (!ship) {
    return (
      <PageLayout title="GG 23 Ship">
        <></>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={ship.application.name}>
      <Group justify="center">
        <Avatar src={ship.application.imgUrl} bg="white" size={171} mb="xl" />
      </Group>
      <Stack gap="lg">
        <Box>
          <Group mb="sm" gap="xxs">
            <Title order={3} fz="h3">
              {ship.application.name}
            </Title>
            <ShipIcon size={26} />
          </Group>
          <Text c="subtle">
            {metadata?.description
              ? metadata?.description
              : isLoadingMetadata
                ? ''
                : 'Metadata not found'}
          </Text>
        </Box>
        <Group gap={8}>
          <Text
            component={Link}
            to={`/view-draft/${ship.id}-${ship.application.version}`}
            fw={600}
            td="underline"
          >
            Read Application
          </Text>
          <IconArrowRight size={18} stroke={1} />
        </Group>
        <Divider mb="lg" />

        <Flex
          justify="space-between"
          gap={'6%'}
          align="start"
          direction={isTablet ? 'column' : 'row'}
        >
          <Box w={isTablet ? '100%' : '47%'} mb={isTablet ? 'lg' : undefined}>
            <Group gap={8}>
              <Text fz="lg" fw={600}>
                Judge Vote
              </Text>
              <Tooltip label="Judge Rubric Vote to select Community Rounds">
                <IconInfoCircle size={18} color={colors.purple[6]} />
              </Tooltip>
            </Group>
            <Text c="highlight" fz={80}>
              {ship.avgScore}
              {ship.votes.length > 0 && '%'}
            </Text>
            <Text c="subtle" style={{ transform: 'translateY(-16px)' }} fz="sm">
              *Avg Score calculated across all judges
            </Text>
            {ship.votes.length === 0 && (
              <Text
                c="subtle"
                style={{ transform: 'translateY(-16px)' }}
                fz="sm"
              >
                **No votes yet
              </Text>
            )}
          </Box>
          <Box w={isTablet ? '100%' : '47%'}>
            <Group gap={8}>
              <Text fz="lg" fw={600}>
                Public Vote
              </Text>
              <Tooltip label="Public vote from GTC holders once Community Rounds are complete">
                <IconInfoCircle size={18} color={colors.purple[6]} />
              </Tooltip>
            </Group>
            <Text c="highlight" fz={80}>
              --
            </Text>
            <Text c="subtle" style={{ transform: 'translateY(-16px)' }} fz="sm">
              *Percentage of total community votes
            </Text>
            <Text c="subtle" style={{ transform: 'translateY(-16px)' }} fz="sm">
              **Voting opens after Community Round
            </Text>
          </Box>
        </Flex>
        <Title order={4} fz="h4" mt="lg">
          Judge Reviews
        </Title>
        <Stack gap="lg">
          {Array.from({ length: 5 }).map((_, index) => (
            <Box key={index}>
              <Group justify="space-between" mb="sm">
                <Group gap="sm">
                  <Avatar size={24} bg={'blue'} />
                  <Group gap={4}>
                    <Text fw={600} fz={'lg'}>
                      judge.eth
                    </Text>
                    <JudgeIcon />
                  </Group>
                </Group>
                <Group>
                  <Text c="subtle" fz="sm" fw={600}>
                    Score 30/40
                  </Text>
                  <Button size="xs" variant="secondary">
                    View
                  </Button>
                </Group>
              </Group>
              <Card variant="comment">
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
              </Card>
            </Box>
          ))}
        </Stack>
      </Stack>
    </PageLayout>
  );
};
