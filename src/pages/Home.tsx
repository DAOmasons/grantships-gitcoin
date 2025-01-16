import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { InnerContainer } from '../layout/Page';
import {
  IconAtom,
  IconAward,
  IconGavel,
  IconMilitaryAward,
} from '@tabler/icons-react';
import { BGImage } from '../assets/BGImage';
import { SplainerAccordion } from '../components/SplainerAccordion';
import { CycleCircle } from '../components/CycleCircle';
import {
  createApplication,
  deployRubricVoting,
  finalizeChoices,
} from '../setupScripts/chews';
import { mintJudgeHat } from '../setupScripts/setupHats';

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
      {/* <Button onClick={mintJudgeHat}>Fire</Button> */}
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
            <SplainerAccordion activeRound="2" />
          </Card>
        </Box>
      </InnerContainer>
    </Box>
  );
};
