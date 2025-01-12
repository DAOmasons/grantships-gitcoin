import {
  Accordion,
  Box,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { InnerContainer } from '../layout/Page';
import {
  Icon,
  IconArrowBadgeRight,
  IconAtom,
  IconAward,
  IconGavel,
  IconMilitaryAward,
} from '@tabler/icons-react';
import { BGImage } from '../assets/BGImage';
import { useState } from 'react';

export const Home = () => {
  const theme = useMantineTheme();
  return (
    <Box pos="relative">
      <BGImage />
      <Container maw={1280} mb={120}>
        <Group align="center" h={700} mx="xl">
          <Box maw={450}>
            <Title order={1} fz="h1" mb="sm">
              Fund <span style={{ color: theme.colors.purple[6] }}>More</span>{' '}
              of What Matters
            </Title>
            <Text c="subtle">
              Gitcoin{'<>'}Grantships is an open, decentralized selection{' '}
              mechanism for funding what matters to the Gitcoin DAO
            </Text>
          </Box>
          <Box ml="auto">
            <CycleCircle
              currentPhase={2}
              phases={[
                { label: 'Judge Election', Icon: IconGavel },
                { label: 'Round Selection', Icon: IconMilitaryAward },
                { label: 'Quadratic Round', Icon: IconAtom },
                { label: 'Round Reviews', Icon: IconAward },
              ]}
            />
          </Box>
        </Group>
      </Container>
      <InnerContainer>
        <Box mb={120}>
          <Title mb="xs" fz="h3" order={2}>
            Round Selection
          </Title>
          <Text c="subtle" mb="lg">
            Stage 2 - Select Community Rounds for GG23
          </Text>
          <Card variant="solid">
            <Text mb="md" lh={1.4}>
              In this stage, judges elected by Gitcoin DAO read and rank each
              application against a grading rubric. See the progress of current
              applications, their grading on the Gitcoin round selection rubric,
              and read their written reviews.
            </Text>
            <Group justify="center">
              <Button variant="secondary">View Application Progress</Button>
            </Group>
          </Card>
        </Box>
        <Card variant="kelp-outline" mb={120}>
          <Group justify="space-between">
            <Box>
              <Text fz={28} mb="12">
                Want to Run a Round?
              </Text>
              <Text>Applications can be submitted any time</Text>
            </Box>
            <Button>Submit Application</Button>
          </Group>
        </Card>
        <Box mb={120}>
          <Title mb="xs" fz="h3" order={2}>
            Our Grant Selection Process
          </Title>
          <Text c="subtle" mb="lg">
            The GrantShips evolutionary mechanism in a nutshell
          </Text>
          <Card>
            <Text mb="sm" fw={600}>
              Voting Phases
            </Text>
            <ExplainerAccordion activeRound="2" />
          </Card>
        </Box>
      </InnerContainer>
    </Box>
  );
};

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

const ExplainerAccordion = ({ activeRound }: { activeRound?: string }) => {
  const [value, setValue] = useState<string | null>(activeRound || null);
  const { colors } = useMantineTheme();
  return (
    <Accordion defaultValue={activeRound} value={value} onChange={setValue}>
      {splainerData.map((item) => {
        const isSelected = value === item.value;
        const isActiveRound = activeRound === item.value;
        return (
          <Accordion.Item
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
              >
                <Text fz="xs" c="white">
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
                  <Group gap={8}>
                    <IconArrowBadgeRight
                      size={20}
                      stroke={1.5}
                      color={colors.dark[4]}
                    />
                    <Text>{point}</Text>
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

const CycleCircle = ({
  currentPhase,
  phases,
}: {
  currentPhase: 0 | 1 | 2 | 3 | 4;
  phases: {
    label: string;
    Icon: Icon;
  }[];
}) => {
  const theme = useMantineTheme();
  return (
    <Box pos="relative">
      <svg
        width="428"
        height="428"
        viewBox="0 0 428 428"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M421.433 198.653C424.738 198.409 427.227 195.529 426.89 192.233C421.871 143.134 400.02 97.2064 364.947 62.3064C329.875 27.4065 283.84 5.78206 234.717 1.00506C231.419 0.684334 228.552 3.18792 228.323 6.49376L227.676 15.8715C227.448 19.1773 229.945 22.0326 233.242 22.3636C277.229 26.7795 318.429 46.2073 349.852 77.4758C381.276 108.744 400.906 149.848 405.539 193.813C405.886 197.108 408.754 199.591 412.059 199.347L421.433 198.653Z"
          fill={
            currentPhase >= 2 ? theme.colors.purple[6] : theme.colors.dark[1]
          }
        />
        <path
          d="M229.347 421.433C229.591 424.738 232.471 427.227 235.767 426.89C284.866 421.871 330.794 400.02 365.694 364.947C400.594 329.875 422.218 283.84 426.995 234.717C427.316 231.419 424.812 228.552 421.506 228.323L412.129 227.676C408.823 227.448 405.967 229.945 405.636 233.242C401.221 277.229 381.793 318.429 350.524 349.852C319.256 381.276 278.152 400.906 234.187 405.539C230.892 405.886 228.409 408.754 228.653 412.059L229.347 421.433Z"
          fill={
            currentPhase >= 3 ? theme.colors.purple[6] : theme.colors.dark[1]
          }
        />
        <path
          d="M6.56695 229.347C3.26227 229.591 0.772858 232.47 1.10985 235.767C6.12908 284.866 27.9803 330.794 63.0528 365.694C98.1253 400.593 144.16 422.218 193.283 426.995C196.581 427.316 199.448 424.812 199.677 421.506L200.324 412.129C200.552 408.823 198.055 405.967 194.758 405.636C150.771 401.221 109.571 381.793 78.1475 350.524C46.7244 319.256 27.0936 278.152 22.4608 234.187C22.1136 230.892 19.246 228.409 15.9413 228.653L6.56695 229.347Z"
          fill={
            currentPhase === 4 ? theme.colors.purple[6] : theme.colors.dark[1]
          }
        />
        <path
          d="M198.653 6.56692C198.409 3.26224 195.529 0.772833 192.233 1.10982C143.134 6.12906 97.2064 27.9803 62.3064 63.0528C27.4065 98.1253 5.78205 144.16 1.00505 193.283C0.684324 196.581 3.18791 199.448 6.49375 199.677L15.8715 200.324C19.1773 200.552 22.0326 198.055 22.3636 194.758C26.7794 150.771 46.2073 109.571 77.4758 78.1475C108.744 46.7244 149.848 27.0936 193.813 22.4608C197.108 22.1136 199.591 19.246 199.347 15.9413L198.653 6.56692Z"
          fill={
            currentPhase >= 1 ? theme.colors.purple[6] : theme.colors.dark[1]
          }
        />
      </svg>
      <Box pos="absolute" top="0" right="0" left="0" bottom="0">
        <Stack align="center" mt={64} gap="sm">
          {phases.map((p, index) => (
            <Stack
              key={p.label}
              gap={0}
              py={8}
              bg="white"
              w={189}
              style={{
                border: `1px solid ${currentPhase > index ? theme.colors.purple[6] : theme.colors.dark[1]}`,
                borderRadius: 30,
              }}
              align="center"
            >
              <Group gap={4} mb={2}>
                <p.Icon
                  stroke={1}
                  size={24}
                  color={
                    currentPhase > index
                      ? theme.colors.purple[6]
                      : theme.colors.dark[4]
                  }
                  style={{ transform: 'translateY(-1.5px)' }}
                />
                <Text fz="sm" fw={500} c={currentPhase > index ? '' : 'subtle'}>
                  Stage {index + 1}
                </Text>
              </Group>
              <Text fz="xs" c={currentPhase > index ? '' : 'subtle'}>
                {p.label}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
