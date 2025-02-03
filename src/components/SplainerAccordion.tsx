import { Accordion, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import {
  IconArrowBadgeRight,
  IconAtom,
  IconAward,
  IconGavel,
  IconMilitaryAward,
} from '@tabler/icons-react';
import { useState } from 'react';

const splainerData = [
  {
    value: '1',
    label: 'Stage 1: Judge Election',
    description: [
      'Community members apply to be judges',
      'GTC holders vote on judges',
      'Top 4 judges are elected',
    ],
    icon: IconGavel,
  },
  {
    value: '2',
    label: 'Stage 2: Round Selection',
    description: [
      'Prospective round operators submit applications',
      'Judges score applications on a rubric',
      'Top five applications become GG Community Rounds',
      'Highest scoring rounds get additional funding',
    ],
    icon: IconMilitaryAward,
  },
  {
    value: '3',
    label: 'Stage 3: GG23 Community Rounds',
    description: [
      'Winning rounds compete to run the best Quadratic Round on GG23',
      'Metrics are recorded for review',
    ],
    icon: IconAtom,
  },
  {
    value: '4',
    label: 'Stage 4: Review Rounds',
    description: [
      'Judges review the performance of each Community Round',
      'All rounds are scored on a rubric',
      'Top 2 rounds are automatically selected for the next round',
    ],
    icon: IconAward,
  },
];

export const SplainerAccordion = ({
  activeRound,
}: {
  activeRound?: string;
}) => {
  const [value, setValue] = useState<string | null>(activeRound || null);
  const { colors } = useMantineTheme();
  return (
    <Accordion defaultValue={activeRound} value={value} onChange={setValue}>
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
                  <Group gap={8} key={point}>
                    <IconArrowBadgeRight
                      size={20}
                      stroke={1.5}
                      color={colors.dark[4]}
                    />
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
