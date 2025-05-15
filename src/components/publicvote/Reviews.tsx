import { useState } from 'react';
import { useChews } from '../../hooks/useChews';
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Progress,
  Rating,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { Address, formatEther } from 'viem';
import { IconMessage, IconStar, IconStarFilled } from '@tabler/icons-react';
import { InfoBanner } from '../InfoBanner';
import { UserDisplay } from '../UserDisplay';
import { dummyData } from './voteData';

export const Reviews = () => {
  const { publicRound, isLoadingPublicRound } = useChews();

  if (isLoadingPublicRound) {
    return null;
  }

  if (!publicRound) {
    return (
      <InfoBanner
        title={'No Public Round'}
        description={'Public Round not found'}
      />
    );
  }

  // if (!publicRound.batchVotes.length) {
  //   return (
  //     <InfoBanner
  //       title={'No Votes Yet'}
  //       description={'No votes have been cast yet for this round.'}
  //     />
  //   );
  // }

  return (
    <Box>
      <Title order={3} mb="md" fz="h3">
        All Votes
      </Title>
      <Group mt="xl" mx="md" w="100%" gap={'lg'} justify="center">
        {dummyData.map((bv) => (
          <VoteCard
            key={bv.id}
            id={bv.id}
            voter={bv.voter}
            votes={bv.votes}
            comment={bv.comment}
            prefs={bv.prefs}
          />
        ))}
      </Group>
    </Box>
  );
};

const VoteCard = ({
  id,
  voter,
  votes,
  comment,
  prefs,
}: {
  id: string;
  voter: string;
  votes: { choice_id: string; amount: bigint }[];
  prefs: { key: string; label: string; rating: number }[];
  comment?: string;
}) => {
  const [cardDisplay, setCardDisplay] = useState<'votes' | 'comment' | 'prefs'>(
    'votes'
  );
  const { colors } = useMantineTheme();
  const { publicRound } = useChews();

  if (!publicRound) return null;

  const toggleCommentDisplay = () => {
    setCardDisplay((prev) => (prev === 'comment' ? 'votes' : 'comment'));
  };

  const togglePrefsDisplay = () => {
    setCardDisplay((prev) => (prev === 'prefs' ? 'votes' : 'prefs'));
  };

  return (
    <Box key={id} w="47%" miw={400} h={510}>
      <Group mb="md" justify="space-between" mr="lg">
        <UserDisplay address={voter as Address} />
        <Group gap={4}>
          <Tooltip label={comment ? 'Toggle Comment' : 'No Comment'}>
            <ActionIcon onClick={toggleCommentDisplay} disabled={!comment}>
              <IconMessage
                size={16}
                color={cardDisplay === 'comment' ? colors.kelp[7] : undefined}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Toggle Voter Preferences">
            <ActionIcon onClick={togglePrefsDisplay}>
              <IconStar
                size={16}
                color={cardDisplay === 'prefs' ? colors.kelp[7] : undefined}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      {cardDisplay === 'comment' && (
        <Box mx="sm">
          <ScrollArea h={410}>
            <Text className="ws-pre-wrap">{comment}</Text>
          </ScrollArea>
        </Box>
      )}
      {cardDisplay === 'prefs' && (
        <Box mx="sm">
          <ScrollArea h={410}>
            <Stack>
              {prefs.map((pref) => (
                <Box key={pref.key}>
                  <Text fz="xs" mb={4}>
                    {pref.label}
                  </Text>
                  <Rating
                    value={pref.rating}
                    readOnly
                    emptySymbol={
                      <IconStar
                        size={16}
                        color={colors.purple[6]}
                        stroke={1.5}
                      />
                    }
                    fullSymbol={
                      <IconStarFilled size={16} color={colors.purple[6]} />
                    }
                  />
                </Box>
              ))}
            </Stack>
          </ScrollArea>
        </Box>
      )}
      {cardDisplay === 'votes' && (
        <Box mx="sm">
          {publicRound.ships?.map((ship) => {
            const shipVote = votes.find(
              (vote) => vote.choice_id === ship.choiceId
            );

            const numberValue =
              Number(
                Number(
                  formatEther(BigInt(shipVote?.amount || '0') * 100n)
                ).toFixed(0)
              ) || 0;

            return (
              <Box mb="md" w="100%" key={`${ship.choiceId}-${id}`}>
                <Group gap={'sm'} mb={8}>
                  <Avatar src={ship.imgUrl} size={24} />
                  <Text fz="sm" maw={'200px'} lineClamp={1}>
                    {ship.name}
                  </Text>
                </Group>
                <Group>
                  <Progress
                    value={numberValue}
                    size="xs"
                    color={colors.purple[7]}
                    bg={colors.dark[6]}
                    w="80%"
                  />
                  <Text fz="xs">{numberValue}%</Text>
                </Group>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
