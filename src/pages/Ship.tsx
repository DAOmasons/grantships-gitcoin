import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import {
  getApplicationMetadata,
  getReviewsWithMetadata,
} from '../queries/getMetadata';
import { JudgeIcon, ShipIcon } from '../components/RoleIcons';
import { IconArrowRight, IconInfoCircle } from '@tabler/icons-react';
import { formatEther } from 'viem';
import { useBreakpoints } from '../hooks/useBreakpoints';
import { GgApplicationVote } from '../generated/graphql';
import { roundNumberString, truncateAddr } from '../utils/common';
import { InfoBanner } from '../components/InfoBanner';

export const Ship = () => {
  const { id } = useParams();
  const { applicationRound, publicRound } = useChews();
  const { colors } = useMantineTheme();
  const { isTablet } = useBreakpoints();
  const navigate = useNavigate();

  const ship = useMemo(() => {
    const locatedShip = applicationRound?.applications.find(
      (app) => app.id === id
    );

    if (!locatedShip) return;

    const avgScore =
      locatedShip?.votes.length === 0
        ? '--'
        : roundNumberString(
            formatEther(
              (locatedShip?.votes.reduce(
                (acc, vote) => acc + BigInt(vote.amount),
                0n
              ) /
                BigInt(locatedShip?.votes.length)) *
                100n
            )
          );

    return { ...locatedShip, avgScore };
  }, [id, applicationRound]);

  const publicScore = useMemo(() => {
    if (!publicRound) return '--';

    const locatedShip = publicRound?.ships.find((ship) => ship.choiceId === id);

    if (!locatedShip) return '--';

    const total = publicRound.totalVoted;

    const scaleFactor = 100n;

    const percentage =
      locatedShip.amountVoted === 0n
        ? 0
        : Number((locatedShip.amountVoted * 100n * scaleFactor) / total) /
          Number(scaleFactor);

    return `${percentage}%`;
  }, [publicRound]);

  const { data: metadata, isLoading: isLoadingMetadata } = useQuery({
    queryKey: ['metadata', ship?.application.ipfsHash],
    queryFn: () => getApplicationMetadata(ship?.application.ipfsHash as string),
    enabled: !!ship?.application.ipfsHash,
  });

  const { data: reviewsWithMetadata } = useQuery({
    queryKey: ['reviewsWithMetadata', ship?.id],
    queryFn: () => getReviewsWithMetadata(ship?.votes as GgApplicationVote[]),
    enabled: !!ship?.votes,
  });

  if (!ship || !publicRound || !applicationRound) {
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
          <Text c="subtle" className="ws-pre-wrap">
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
              {publicScore}
            </Text>
            <Text c="subtle" style={{ transform: 'translateY(-16px)' }} fz="sm">
              *Percentage of total community votes
            </Text>
            <Text
              c="subtle"
              td="underline"
              component={Link}
              to="/vote"
              style={{ transform: 'translateY(-36px)' }}
              fz="sm"
            >
              See Voting
            </Text>
          </Box>
        </Flex>
        <Title order={4} fz="h4" mt="lg">
          Judge Reviews
        </Title>
        <Stack gap="lg">
          {reviewsWithMetadata &&
            reviewsWithMetadata?.length > 0 &&
            reviewsWithMetadata.map((review) => (
              <Box key={review.id}>
                <Group justify="space-between" mb="sm">
                  <Group gap="sm">
                    <Avatar size={24} bg={'blue'} />
                    <Group gap={4}>
                      <Text fw={600} fz={'lg'}>
                        {truncateAddr(review.reviewer)}
                      </Text>
                      <JudgeIcon />
                    </Group>
                  </Group>
                  <Group>
                    <Text c="subtle" fz="sm" fw={600}>
                      Score{' '}
                      {Object.values(review.metadata.scores).reduce(
                        (acc, score) => acc + score,
                        0
                      )}
                      /40
                    </Text>
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => navigate(`/review/${review.id}`)}
                    >
                      View
                    </Button>
                  </Group>
                </Group>
                <Card variant="comment">
                  {review.metadata.feedback['Closing Comment']}
                </Card>
              </Box>
            ))}
        </Stack>
      </Stack>
    </PageLayout>
  );
};
