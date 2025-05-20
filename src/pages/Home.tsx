import {
  Box,
  Button,
  Card,
  Container,
  Flex,
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
import { GSMotif } from '../assets/GSMotif';
import { Link, useNavigate } from 'react-router-dom';
import { useChews } from '../hooks/useChews';
import { useBreakpoints, useMobile, useTablet } from '../hooks/useBreakpoints';
import { useMediaQuery } from '@mantine/hooks';
import { TxButton } from '../components/TxButton';
import { deployPublicVoting } from '../setupScripts/chews';

const displayTextCopy = [
  {
    title: 'Awaiting Launch',
    subtitle: 'Stage 0 - Pre-Flight Checks',
    description:
      'In this stage, the GrantShips process is being prepared for launch. The process will begin once the judge vote is initialized.',
    buttonLabel: 'Read More',
    href: 'https://grantships.fun',
  },
  {
    title: 'Judge Election',
    subtitle: 'Stage 1 - Elect Judges for Round Selection',
    description:
      'In this stage, Gitcoin DAO votes to elect judges who will be responsible for the selection of grant rounds. For this round of GrantShips, this vote will be held off-app. Click the button below to see the progress of the election.',
    buttonLabel: 'View Election Progress',
    href: 'https://gov.gitcoin.co/t/2025-delegate-nominations/19903',
  },
  {
    title: 'Round Selection',
    subtitle: 'Stage 2 - Select GG23 Community Rounds',
    description:
      "In this stage, elected Gitcoin Council members review round applications. Using a rubric, they score each application based on the round's alignment with Gitcoin's mission, the round's community, and other vital criteria. The top 6 applications are selected to move on to the Community Round.",
    buttonLabel: 'View Selection Progress',
    to: '/ships',
  },
  {
    title: 'Community Round',
    subtitle: 'Stage 3 - Community Voting',
    description:
      'In this stage, the Gitcoin Community Rounds are open on Gitcoin. Each ship implements their round on the Gitcoin platform.',
    buttonLabel: 'View Community Round',
    to: '/ships',
  },
  {
    title: 'Round Reviews',
    subtitle: 'Stage 4 - Final Round Reviews',
    description:
      'In this stage, GTC holders review the results of the Community Round and vote on the best round. The winning rounds can opt to automatically advance to the next round!',
    buttonLabel: 'View Reviews',
    to: '/vote',
  },
];

export const Home = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { currentStage } = useChews();

  const isMobile = useMobile();
  const isTablet = useTablet();
  const collapseTopSection = useMediaQuery('(max-width: 1100px)');

  const displayText = currentStage ? displayTextCopy[currentStage] : undefined;

  return (
    <Box>
      <Box
        pos="absolute"
        top="86px"
        bottom="0"
        left="0"
        right="0"
        style={{ zIndex: -1 }}
      >
        <BGImage />
      </Box>
      <Container maw={1280} mb={120}>
        <Flex
          align={'center'}
          h={700}
          mx={collapseTopSection ? undefined : 'xl'}
          gap="md"
          justify={collapseTopSection ? 'center' : 'space-between'}
          direction={collapseTopSection ? 'column' : 'row'}
        >
          <Box
            maw={450}
            pos="relative"
            mb={collapseTopSection ? 75 : undefined}
            pt={collapseTopSection ? 75 : undefined}
          >
            {!isMobile && <GSMotif sm={collapseTopSection} />}
            <Title order={1} fz={isMobile ? 'h2' : 'h1'} mb="sm" c="highlight">
              <span style={{ color: theme.colors.purple[6] }}>Accelerate</span>
              <br />
              What Matters
            </Title>
            <Text c="subtle">
              Grantships is an open, decentralized selection mechanism that
              helps Gitcoin fund more of what matters.
            </Text>
          </Box>
          <Box ml={collapseTopSection ? undefined : 'auto'}>
            <CycleCircle
              currentPhase={currentStage || 0}
              sm={collapseTopSection}
              phases={[
                { label: 'Judge Election', Icon: IconGavel },
                { label: 'Round Selection', Icon: IconMilitaryAward },
                { label: 'Community Round', Icon: IconAtom },
                { label: 'Round Reviews', Icon: IconAward },
              ]}
            />
          </Box>
        </Flex>
      </Container>
      {/* <Button
        onClick={() =>
          getUserProof('0x756ee8B8E898D497043c2320d9909f1DD5a7077F')
        }
      >
        Test API
      </Button> */}
      {/* <TxButton onClick={deployPublicVoting}>Fire!</TxButton> */}
      <InnerContainer>
        <Card
          variant="kelp-outline"
          mb={120}
          maw={isTablet ? 450 : undefined}
          mx={isTablet ? 'auto' : undefined}
        >
          <Flex
            justify="space-between"
            align={'center'}
            gap="md"
            direction={isTablet ? 'column' : 'row'}
          >
            <Box>
              <Text fz={isTablet ? 24 : 28} mb="12">
                Want to Run a Round?
              </Text>
              <Text>Applications can be submitted any time</Text>
            </Box>
            <Button
              onClick={() => navigate('submit-application')}
              size={isTablet ? 'sm' : undefined}
            >
              Submit Application
            </Button>
          </Flex>
        </Card>
        {displayText && <LeaderDisplay displayText={displayText} />}
        <Box
          mb={120}
          maw={isTablet ? 450 : undefined}
          mx={isTablet ? 'auto' : undefined}
        >
          <Title mb="xs" fz="h3" order={2}>
            Our Grant Selection Process
          </Title>
          <Text c="subtle" mb={isTablet ? 'lg' : undefined}>
            The GrantShips evolutionary mechanism in a nutshell
          </Text>
          <Box p={isTablet ? undefined : 'lg'}>
            <SplainerAccordion
              activeRound={
                currentStage != null ? currentStage.toString() : undefined
              }
            />
          </Box>
        </Box>
      </InnerContainer>
    </Box>
  );
};

type DisplayText = {
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
  href?: string;
  to?: string;
};

const LeaderDisplay = ({ displayText }: { displayText: DisplayText }) => {
  const { isTablet } = useBreakpoints();
  return (
    <Box
      mb={120}
      maw={isTablet ? 450 : undefined}
      mx={isTablet ? 'auto' : undefined}
    >
      <Title mb="xs" fz="h3" order={2}>
        {displayText.title}
      </Title>
      <Text c="subtle" mb="lg">
        {displayText.subtitle}
      </Text>
      <Card variant="solid">
        <Text mb="md" lh={1.4}>
          {displayText.description}
        </Text>
        <Group justify="center">
          {displayText.href && (
            <Button
              variant="secondary"
              component="a"
              href={displayText.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {displayText.buttonLabel}
            </Button>
          )}
          {displayText.to && (
            <Button variant="secondary" component={Link} to="/ships">
              View Progress
            </Button>
          )}
        </Group>
      </Card>
    </Box>
  );
};
