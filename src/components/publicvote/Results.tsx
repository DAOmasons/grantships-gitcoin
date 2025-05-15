import { useMemo } from 'react';
import { useChews } from '../../hooks/useChews';
import {
  Avatar,
  Box,
  Group,
  Progress,
  Rating,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { InfoBanner } from '../InfoBanner';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { formatEther } from 'viem';

export const Results = () => {
  const { publicRound } = useChews();
  const { colors } = useMantineTheme();

  const totalPreferences = useMemo(() => {
    if (!publicRound) return null;

    let preferenceTotals = {} as {
      [key: string]: {
        value: number;
        label: string;
      };
    };
    for (const bv of publicRound.batchVotes) {
      const { prefs } = bv;

      for (const pref of prefs) {
        const { label, key, value } = pref;

        if (!preferenceTotals[key] || !preferenceTotals[key].value) {
          const newPref = {
            value: 0,
            label,
          };
          preferenceTotals[key] = newPref;
        }

        preferenceTotals[key].value += Number(value);
      }
    }

    return preferenceTotals;
  }, [publicRound]);

  if (!publicRound) {
    return (
      <Box>
        <Title order={3} mb="md" fz="h3">
          Vote Results
        </Title>
        <InfoBanner
          title={'No Public Round'}
          description={'Public Round not found'}
        />
      </Box>
    );
  }

  if (!publicRound.batchVotes.length) {
    return (
      <Box>
        <Title order={3} mb="md" fz="h3">
          Vote Results
        </Title>
        <InfoBanner
          title={'No Votes Yet'}
          description={'No votes have been cast yet for this round.'}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Title order={3} mb="xl" fz="h3">
        Voting Total
      </Title>
      <Box mx="md" mb="xl">
        {publicRound.ships.map((ship) => {
          const { choiceId, amountVoted, imgUrl, name } = ship;

          const total = publicRound.totalVoted;

          const percentage =
            amountVoted === 0n
              ? 0
              : Number(Number((amountVoted * 100n) / total).toFixed(0));
          return (
            <Box key={choiceId} mb="md">
              <Group gap="sm" mb={'xs'}>
                <Avatar src={imgUrl} size={40} />
                <Text fz="md" maw={350} lineClamp={1}>
                  {name}
                </Text>
              </Group>
              <Group ml={55}>
                <Progress
                  value={percentage}
                  size="sm"
                  color={colors.purple[7]}
                  bg={colors.dark[6]}
                  w="90%"
                />
                <Text fz="xs">{percentage}%</Text>
              </Group>
            </Box>
          );
        })}
      </Box>
      <Title order={4} mb="xl" fz="h3">
        Preferences Total
      </Title>
      <Box mx="md" mb="xl">
        {totalPreferences &&
          Object.entries(totalPreferences).map(([key, pref]) => {
            const { label, value } = pref;

            const total = publicRound.batchVotes.length;

            const average = total === 0 ? 0 : value / total;

            return (
              <Box key={key} mb="md">
                <Group gap="sm" mb={'xs'}>
                  <Text fz="md">{label}</Text>
                </Group>
                <Group>
                  <Rating
                    value={average}
                    readOnly
                    fractions={4}
                    emptySymbol={
                      <IconStar color={colors.purple[6]} stroke={1.5} />
                    }
                    fullSymbol={<IconStarFilled color={colors.purple[6]} />}
                  />
                  <Text fz="xs">(Avg {average.toFixed(2)})</Text>
                </Group>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
