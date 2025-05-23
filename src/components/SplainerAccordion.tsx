import {
  Accordion,
  Box,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowBadgeRight,
  IconAtom,
  IconAward,
  IconGavel,
  IconMilitaryAward,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTablet } from '../hooks/useBreakpoints';

const splainerData = [
  {
    value: '1',
    label: 'Stage 1: Judge Election',
    description: [
      'Community members apply to be judges',
      'GTC holders vote on judges',
      'Top 5 judges are elected',
    ],
    icon: IconGavel,
  },
  {
    value: '2',
    label: 'Stage 2: Round Selection',
    description: [
      'Prospective round operators submit applications',
      'Judges score applications on a rubric',
      'Top applicants become GG Community Rounds',
    ],
    icon: IconMilitaryAward,
  },
  {
    value: '3',
    label: 'Stage 3: GG23 Community Rounds',
    description: [
      'Winning rounds compete to run the best Community Round on GG23',
      'Impact/Achievements are recorded for review',
    ],
    icon: IconAtom,
  },
  {
    value: '4',
    label: 'Stage 4: Review Rounds',
    description: [
      'GTC holders review the performance of each Community Round',
      'All rounds are scored on self-reported success metrics',
      'Top 3 rounds are automatically selected for the next round',
    ],
    icon: IconAward,
  },
];

export const SplainerAccordion = ({
  activeRound,
}: {
  activeRound?: string;
}) => {
  const [value, setValue] = useState<string | null>(null);
  const { colors } = useMantineTheme();
  const isTablet = useTablet();

  useEffect(() => {
    if (value === null && activeRound && activeRound !== '0') {
      setValue(activeRound);
    }
  }, [value, activeRound]);
  return (
    <Accordion value={value} onChange={setValue}>
      {splainerData.map((item) => {
        const isSelected = value === item.value;
        const isActiveRound = activeRound === item.value;
        return (
          <Accordion.Item
            key={item.value}
            value={item.value}
            style={{
              border: `1px solid ${isSelected ? colors.purple[6] : 'transparent'}`,
              borderRadius: '6px',
            }}
          >
            {isActiveRound && isSelected && (
              <Group
                justify="center"
                bg={colors.purple[6]}
                align="center"
                gap={0}
                style={{ borderRadius: '4px' }}
                mt="sm"
                mx="sm"
                p={2}
              >
                <Text fz="xs" c={colors.dark[6]} fw={700}>
                  Active Now!
                </Text>
              </Group>
            )}
            <Accordion.Control
              icon={
                <item.icon
                  stroke={1.5}
                  size={24}
                  color={isSelected ? colors.purple[6] : colors.dark[4]}
                />
              }
            >
              <Text fz="lg">{item.label}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="sm">
                {item.description.map((point) => (
                  <Group
                    gap={8}
                    key={point}
                    wrap="nowrap"
                    align={isTablet ? 'start' : undefined}
                  >
                    <Box h={20} w={20}>
                      <IconArrowBadgeRight
                        size={20}
                        stroke={1.5}
                        color={colors.dark[4]}
                        style={
                          isTablet
                            ? { transform: 'translateY(1px)' }
                            : undefined
                        }
                      />
                    </Box>
                    <Text c="subtle">{point}</Text>
                  </Group>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
