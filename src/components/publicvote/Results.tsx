import { useMemo } from 'react';
import { useChews } from '../../hooks/useChews';
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  Progress,
  Rating,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { InfoBanner } from '../InfoBanner';
import {
  IconList,
  IconReport,
  IconRocket,
  IconSearch,
  IconStar,
  IconStarFilled,
} from '@tabler/icons-react';
import { ROUND_DATA } from '../../constants/reports';
import { Link } from 'react-router-dom';
import { useMobile, useTablet } from '../../hooks/useBreakpoints';
import { replaceCommonString } from '../../utils/common';

export const Results = () => {
  const { publicRound } = useChews();
  const { colors } = useMantineTheme();
  const isTablet = useTablet();
  const isMobile = useMobile();

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

  const sortedRound = useMemo(() => {
    if (!publicRound) return null;

    const newShips = [...publicRound?.ships].sort(
      (a, b) => Number(b.amountVoted) - Number(a.amountVoted)
    );

    return { ...publicRound, ships: newShips };
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
        {sortedRound &&
          sortedRound.ships.map((ship) => {
            const { choiceId, amountVoted, imgUrl, name } = ship;

            const total = publicRound.totalVoted;

            const shipData = ROUND_DATA[choiceId]
              ? ROUND_DATA[choiceId]
              : {
                  reportLink: '',
                  roundLink: '',
                };

            const scaleFactor = 100n;

            const percentage =
              amountVoted === 0n
                ? 0
                : Number((amountVoted * 100n * scaleFactor) / total) /
                  Number(scaleFactor);
            return (
              <Box key={choiceId} mb="md">
                <Group justify="space-between" w={isTablet ? '100%' : '95.5%'}>
                  <Group
                    gap="sm"
                    mb={'xs'}
                    style={{
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: isMobile ? 'start' : 'center',
                    }}
                  >
                    <Avatar src={imgUrl} size={40} />
                    <Text
                      fz="md"
                      lineClamp={1}
                      maw={isTablet ? '250px' : '350px'}
                    >
                      {name}
                    </Text>
                  </Group>
                  <Menu
                    position="bottom-start"
                    transitionProps={{
                      transition: 'fade-up',
                      duration: 150,
                    }}
                  >
                    <Menu.Target>
                      <Tooltip label="Read Ship Data">
                        <ActionIcon size={20}>
                          <IconList />
                        </ActionIcon>
                      </Tooltip>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconReport size={20} />}
                        component={'a'}
                        href={shipData.reportLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Read Report
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconSearch size={20} />}
                        component="a"
                        href={shipData.roundLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        See Round
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconRocket size={20} />}
                        component={Link}
                        to={`/ship/${ship.choiceId}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        See Ship Page
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
                <Group ml={isTablet ? 0 : 55}>
                  <Progress
                    value={percentage}
                    size="sm"
                    color={colors.purple[7]}
                    bg={colors.dark[6]}
                    w={isTablet ? '100%' : '90%'}
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
                  <Text fz="md">{replaceCommonString(label)}</Text>
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
