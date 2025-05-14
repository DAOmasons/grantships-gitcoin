import { useState } from 'react';
import { useChews } from '../../hooks/useChews';
import {
  ActionIcon,
  Avatar,
  AvatarProps,
  Box,
  Group,
  GroupProps,
  Progress,
  Rating,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  TextProps,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { AddressAvatar } from '../AddressAvatar';
import { Address, formatEther } from 'viem';
import { useEns } from '../../hooks/useEns';
import { IconMessage, IconStar, IconStarFilled } from '@tabler/icons-react';
import { InfoBanner } from '../InfoBanner';

const dummyData = [
  {
    id: '1',
    voter: '0x756ee8B8E898D497043c2320d9909f1DD5a7077F',
    timestamp: 1747112117,
    // write a paragraph of dummy data for the metadata
    comment:
      "This ship is amazing! I love the design and the speed. It's perfect for my playstyle.",
    votes: [
      {
        choice_id:
          '0x2377bfa0777c385f4d3fdee97d1a65228f836da67ea6f0db96235870ac5cdc82',
        amount: BigInt(23e16),
      },
      {
        choice_id:
          '0xd18608a33ecfd6b9c08a6c8fd99fd934199dff54ae53515e159b195b2cce770c',
        amount: BigInt(17e16),
      },
      {
        choice_id:
          '0xae3add0277ad57036fb34714bdd96872dc971915636e3cafab9aa08e2632b8cf',
        amount: BigInt(20e16),
      },
      {
        choice_id:
          '0x22ed83fde1924b615d904ccb2259c3ab42e72ec0870242399cda94743503682e',
        amount: BigInt(20e16),
      },
      {
        choice_id:
          '0x781ce54b73730667e7390caa0e52d4d585b574f274f780c4e0bb96a18a996c30',
        amount: BigInt(15e16),
      },
      {
        choice_id:
          '0x559f71a3559444c0e12205b095cbecd784199ab4caa271fcddf67b293318eb0f',
        amount: BigInt(5e16),
      },
    ],
    prefs: [
      {
        key: 'new_funding_mechanism',
        label: 'Innovating new allocation mechanisms is very important',
        rating: 1,
      },
      {
        key: 'matching_donations',
        label: 'Total matching donations are a very important metric',
        rating: 4,
      },
      {
        key: 'participation_count',
        label: 'The amount of participating addresses is an important metric',
        rating: 4,
      },
      {
        key: 'community_events',
        label: 'The quantity of community events and engagement is important',
        rating: 2,
      },
      {
        key: 'project_completion_rate',
        label:
          'The amount of completed or mature projects funded is an important metric',
        rating: 3,
      },
    ],
  },
  {
    id: '2',
    voter: '0x1234567890abcdef1234567890abcdef12345678',
    timestamp: 1747112117,
    // write a paragraph of dummy data for the metadata
    comment:
      "This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle. This ship is amazing! I love the design and the speed. It's perfect for my playstyle.",
    votes: [
      {
        choice_id:
          '0x2377bfa0777c385f4d3fdee97d1a65228f836da67ea6f0db96235870ac5cdc82',
        amount: BigInt(20e16),
      },
      {
        choice_id:
          '0xd18608a33ecfd6b9c08a6c8fd99fd934199dff54ae53515e159b195b2cce770c',
        amount: BigInt(12e16),
      },
      {
        choice_id:
          '0xae3add0277ad57036fb34714bdd96872dc971915636e3cafab9aa08e2632b8cf',
        amount: BigInt(18e16),
      },
      {
        choice_id:
          '0x22ed83fde1924b615d904ccb2259c3ab42e72ec0870242399cda94743503682e',
        amount: BigInt(18e16),
      },
      {
        choice_id:
          '0x781ce54b73730667e7390caa0e52d4d585b574f274f780c4e0bb96a18a996c30',
        amount: BigInt(32e16),
      },
    ],
    prefs: [
      {
        key: 'new_funding_mechanism',
        label: 'Innovating new allocation mechanisms is very important',
        rating: 3,
      },
      {
        key: 'matching_donations',
        label: 'Total matching donations are a very important metric',
        rating: 4,
      },
      {
        key: 'participation_count',
        label: 'The amount of participating addresses is an important metric',
        rating: 1,
      },
      {
        key: 'community_events',
        label: 'The quantity of community events and engagement is important',
        rating: 3,
      },
      {
        key: 'project_completion_rate',
        label:
          'The amount of completed or mature projects funded is an important metric',
        rating: 2,
      },
    ],
  },
];

export const Reviews = () => {
  const { publicRound, isLoadingPublicRound } = useChews();

  //   const shipLookup = useMemo(() => {
  //     if (!publicRound) return {};

  //     const lookup = {} as Record<string, { name: string; imgUrl: string }>;

  //     for (const ship of publicRound.ships) {
  //       lookup[ship.choice_id] = {
  //         name: ship.name || '',
  //         imgUrl: ship.imgUrl,
  //       };
  //     }
  //     return lookup;
  //   }, [publicRound]);

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
            <Text>{comment}</Text>
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

const UserDisplay = (
  props: GroupProps & {
    address: Address;
    avatarProps?: AvatarProps;
    textProps?: TextProps;
  }
) => {
  const { address, avatarProps, textProps, ...rest } = props;
  const { name } = useEns({ avatar: true, address, name: true });

  return (
    <Group gap={'sm'} {...rest}>
      <AddressAvatar address={address} {...(avatarProps || {})} />
      <Text {...(textProps || {})}>{name}</Text>
    </Group>
  );
};
