import { useMemo } from 'react';
import { useChews } from '../../hooks/useChews';
import { Box } from '@mantine/core';

const dummyData = [
  {
    id: '1',
    voter: '0x1234567890abcdef1234567890abcdef12345678',
    timestamp: 1747112117,
    // write a paragraph of dummy data for the metadata
    comment:
      "This ship is amazing! I love the design and the speed. It's perfect for my playstyle.",
    votes: [
      {
        choiceId: '1',
        amount: 20e16,
      },
      {
        choiceId: '2',
        amount: 20e16,
      },
      {
        choiceId: '3',
        amount: 20e16,
      },
      {
        choiceId: '4',
        amount: 25e16,
      },
      {
        choiceId: '5',
        amount: 15e16,
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
        choiceId: '1',
        amount: 20e16,
      },
      {
        choiceId: '3',
        amount: 20e16,
      },
      {
        choiceId: '4',
        amount: 25e16,
      },
      {
        choiceId: '5',
        amount: 15e16,
      },
      {
        choiceId: '6',
        amount: 25e16,
      },
    ],
  },
];

export const Reviews = () => {
  const { publicRound } = useChews();

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

  return <Box></Box>;
};
