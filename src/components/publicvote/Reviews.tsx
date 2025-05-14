import { useMemo } from 'react';
import { useChews } from '../../hooks/useChews';
import {
  Avatar,
  AvatarProps,
  Box,
  Group,
  GroupProps,
  Progress,
  Stack,
  Text,
  TextProps,
  useMantineTheme,
} from '@mantine/core';
import { AddressAvatar } from '../AddressAvatar';
import { Address, formatEther } from 'viem';
import { useEns } from '../../hooks/useEns';

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
        choiceId:
          '0x2377bfa0777c385f4d3fdee97d1a65228f836da67ea6f0db96235870ac5cdc82',
        amount: BigInt(23e16),
      },
      {
        choiceId:
          '0xd18608a33ecfd6b9c08a6c8fd99fd934199dff54ae53515e159b195b2cce770c',
        amount: BigInt(17e16),
      },
      {
        choiceId:
          '0xae3add0277ad57036fb34714bdd96872dc971915636e3cafab9aa08e2632b8cf',
        amount: BigInt(20e16),
      },
      {
        choiceId:
          '0x22ed83fde1924b615d904ccb2259c3ab42e72ec0870242399cda94743503682e',
        amount: BigInt(20e16),
      },
      {
        choiceId:
          '0x781ce54b73730667e7390caa0e52d4d585b574f274f780c4e0bb96a18a996c30',
        amount: BigInt(15e16),
      },
      {
        choiceId:
          '0x559f71a3559444c0e12205b095cbecd784199ab4caa271fcddf67b293318eb0f',
        amount: BigInt(5e16),
      },
    ],
  },
  {
    id: '1',
    voter: '0x1234567890abcdef1234567890abcdef12345678',
    timestamp: 1747112117,
    // write a paragraph of dummy data for the metadata
    comment:
      "This ship is amazing! I love the design and the speed. It's perfect for my playstyle.",
    votes: [
      {
        choiceId:
          '0x2377bfa0777c385f4d3fdee97d1a65228f836da67ea6f0db96235870ac5cdc82',
        amount: BigInt(20e16),
      },
      {
        choiceId:
          '0xd18608a33ecfd6b9c08a6c8fd99fd934199dff54ae53515e159b195b2cce770c',
        amount: BigInt(12e16),
      },
      {
        choiceId:
          '0xae3add0277ad57036fb34714bdd96872dc971915636e3cafab9aa08e2632b8cf',
        amount: BigInt(18e16),
      },
      {
        choiceId:
          '0x22ed83fde1924b615d904ccb2259c3ab42e72ec0870242399cda94743503682e',
        amount: BigInt(18e16),
      },
      {
        choiceId:
          '0x781ce54b73730667e7390caa0e52d4d585b574f274f780c4e0bb96a18a996c30',
        amount: BigInt(32e16),
      },
    ],
  },
];

export const Reviews = () => {
  const { publicRound } = useChews();
  const { colors } = useMantineTheme();

  //   const shipLookup = useMemo(() => {
  //     if (!publicRound) return {};

  //     const lookup = {} as Record<string, { name: string; imgUrl: string }>;

  //     for (const ship of publicRound.ships) {
  //       lookup[ship.choiceId] = {
  //         name: ship.name || '',
  //         imgUrl: ship.imgUrl,
  //       };
  //     }
  //     return lookup;
  //   }, [publicRound]);

  if (!publicRound) {
    return null;
  }

  return (
    <Group mt="xl" mx="md" w="100%" gap={0}>
      {dummyData.map((bv) => (
        <Box key={bv.id} w="50%" miw={400}>
          <UserDisplay address={bv.voter as Address} mb="md" />
          <Box mx="sm">
            {publicRound.ships?.map((ship) => {
              const shipVote = bv.votes.find(
                (vote) => vote.choiceId === ship.choiceId
              );

              const numberValue =
                Number(
                  Number(formatEther((shipVote?.amount || 0n) * 100n)).toFixed(
                    0
                  )
                ) || 0;
              return (
                <Box mb="md" w="100%" key={ship.choiceId}>
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
        </Box>
      ))}
    </Group>
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
