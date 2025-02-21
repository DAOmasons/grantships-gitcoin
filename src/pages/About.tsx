// import {} from 'react';
import {
  Box,
  Card,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layout/Page';
import {
  IconAlarm,
  IconBatteryCharging,
  IconClearAll,
  IconRefresh,
  IconReportAnalytics,
  IconRotateClockwise,
  IconTrendingUp,
} from '@tabler/icons-react';

const test = {
  title: 'About',
  description:
    'Donations are accepted for the duration of the round. Transactions are recorded and displayed onchain, metrics collected in preparation for the judge’s vote.',
};

const test1 = {
  title: 'About',
  description: 'Donations are accepted for the duration of the round.',
};

export const About = () => {
  const { colors } = useMantineTheme();
  return (
    <PageLayout title="About">
      <Title order={3} fz="h3" mt={136} mb="xl">
        About GrantShips
      </Title>
      <Text>
        Join our panel of distinguished judges to evaluate and select impactful
        community projects. As a judge, you'll review grant proposals, provide
        valuable feedback, and help allocate resources to initiatives that
        matter. We're looking for individuals with diverse expertise and a
        passion for community development.
      </Text>

      <Title order={3} fz="h3" mt={136} mb="xl">
        How GrantShips Works
      </Title>
      <Text fz="xl" mb="xl">
        Round Performance & Rating
      </Text>
      <Box mb={80}>
        <TimeChart items={[test, test, test1, test]} orientation="alternate" />
      </Box>
      <Text fz="xl" mb="xl">
        The Evolutionary Mechanism
      </Text>
      <TimeChart items={[test, test, test1, test]} orientation="above" />
      <Group mt="20" wrap="nowrap" align="start" mb={120}>
        <Group justify="center" w="100%">
          <Stack gap={30}>
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
          </Stack>
          <Stack gap={30} style={{ transform: 'translateY(30px)' }}>
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
          </Stack>
        </Group>
        <Group justify="center" w="100%">
          <Stack gap={30}>
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.pink[6]}
              style={{ borderRadius: '50%', transform: 'translateY(146px)' }}
            />
          </Stack>
          <Stack gap={30} style={{ transform: 'translateY(30px)' }}>
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
            {/* <Box style={{ transform: 'translateY(146px)' }}></Box> */}
            <Box
              w={40}
              h={40}
              bg={colors.pink[6]}
              style={{ borderRadius: '50%', transform: 'translateY(146px)' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.pink[6]}
              style={{ borderRadius: '50%', transform: 'translateY(146px)' }}
            />
          </Stack>
        </Group>
        <Group justify="center" w="100%">
          <Stack gap={30}>
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
          </Stack>
          <Stack gap={30} style={{ transform: 'translateY(0px)' }}>
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
          </Stack>
        </Group>
        <Group justify="center" w="100%">
          <Stack gap={30}>
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
          </Stack>
          <Stack gap={30} style={{ transform: 'translateY(30px)' }}>
            <Box
              w={40}
              h={40}
              bg={colors.kelp[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
            <Box
              w={40}
              h={40}
              bg={colors.purple[6]}
              style={{ borderRadius: '50%' }}
            />
          </Stack>
        </Group>
      </Group>
      <Title order={3} fz="h3" mt={250} mb="xl">
        Overarching Goals
      </Title>
      <Stack gap={48}>
        <Flex gap={48}>
          <Card w="50%" variant="inner">
            <Group justify="space-between" mb="md">
              <Text fz={22} c={colors.purple[6]}>
                Streamline <br /> the Process
              </Text>
              <IconRotateClockwise
                size={40}
                color={colors.purple[6]}
                stroke="1.2"
              />
            </Group>
            <Text style={{ letterSpacing: -0.4 }}>
              The operational flow will be streamlined with clear next steps for
              every actor involved. Workflows are defined in smart contracts
              with clear division of responsibility among actors. The system
              should become more autonomous, decentralized, and trusted over
              time.
            </Text>
          </Card>
          <Card w="50%" variant="inner">
            <Group justify="space-between" mb="md">
              <Text fz={22} c={colors.purple[6]}>
                Accelerate <br /> the Timeline
              </Text>
              <IconAlarm size={40} color={colors.purple[6]} stroke="1.2" />
            </Group>
            <Text style={{ letterSpacing: -0.4 }}>
              The cyclical nature of the operational flow allows for more
              concurrent and ongoing processes which reduces the time between
              major operational milestones.
            </Text>
          </Card>
        </Flex>
        <Flex gap={48}>
          <Card w="50%">
            <Group justify="space-between" mb="md">
              <Text fz={22} c={colors.purple[6]}>
                Provide Clarity <br /> and Transparency
              </Text>
              <IconClearAll size={40} color={colors.purple[6]} stroke="1.2" />
            </Group>
            <Text style={{ letterSpacing: -0.4 }}>
              Each step is clearly presented through a unified UX, and every
              outcome is published on-chain and easily reviewed and revisited.
            </Text>
          </Card>
          <Card w="50%">
            <Group justify="space-between" mb="md">
              <Text fz={22} c={colors.purple[6]}>
                Enable <br /> Evolution
              </Text>
              <IconTrendingUp size={40} color={colors.purple[6]} stroke="1.2" />
            </Group>
            <Text style={{ letterSpacing: -0.4 }}>
              The system should create more of what the community wants over
              time. It should progressively, iteratively course-correct to
              changing demands, and its programs should strive to become more
              efficient, fair, and impactful with each passing round.
            </Text>
          </Card>
        </Flex>
        <Flex gap={48}>
          <Card w="50%">
            <Group justify="space-between">
              <Text fz={22} c={colors.purple[6]}>
                Rubric and <br /> Metric Voting
              </Text>
              <IconReportAnalytics
                size={40}
                color={colors.purple[6]}
                stroke="1.2"
              />
            </Group>
          </Card>
          <Card w="50%">
            <Group justify="space-between">
              <Text fz={22} c={colors.purple[6]}>
                Batteries <br /> Included
              </Text>
              <IconBatteryCharging
                size={40}
                color={colors.purple[6]}
                stroke="1.2"
              />
            </Group>
          </Card>
        </Flex>
      </Stack>
    </PageLayout>
  );
};

type TimeChartItem = {
  title: string;
  description?: string;
  titleColor?: string;
};

const TimeChart = ({
  items,
  orientation = 'above',
}: {
  items: TimeChartItem[];
  orientation: 'alternate' | 'above';
}) => {
  const { colors } = useMantineTheme();
  return (
    <Stack gap={'sm'}>
      <Flex
        wrap={'nowrap'}
        gap={9}
        align={orientation === 'above' ? 'start' : 'end'}
      >
        {items.map((item, index) => {
          const isEven = index % 2 === 1;
          if (
            (orientation === 'alternate' && isEven) ||
            orientation === 'above'
          ) {
            return (
              <Box w="100%">
                <Text fz="xs" fw={500} c={colors.purple[6]} mb={10}>
                  {item.title}
                </Text>
                <Text fz="xs" mr={10}>
                  {item.description}
                </Text>
              </Box>
            );
          }
          return <Box w="100%" />;
        })}
      </Flex>
      <Flex wrap={'nowrap'} gap={9}>
        {items.map((item, index) => {
          return (
            <Group wrap="nowrap" gap={0} w="100%" key={item.title}>
              <Box
                bg={colors.dark[4]}
                style={{ borderRadius: '50%' }}
                h="6px"
                w="6px"
              />
              <Box w="100%" bg={colors.dark[4]} h={2} />
            </Group>
          );
        })}
      </Flex>
      {orientation === 'alternate' && (
        <Flex wrap={'nowrap'} gap={9} align={'start'}>
          {items.map((item, index) => {
            const isOdd = index % 2 === 0;
            if (orientation === 'alternate' && isOdd) {
              return (
                <Box w="100%">
                  <Text fz="xs" fw={500} c={colors.purple[6]} mb={10}>
                    {item.title}
                  </Text>
                  <Text fz="xs" mr={10}>
                    {item.description}
                  </Text>
                </Box>
              );
            }
            return <Box w="100%" />;
          })}
        </Flex>
      )}
    </Stack>
  );
};
