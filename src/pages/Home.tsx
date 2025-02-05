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
import { useNavigate } from 'react-router-dom';
import { useChews } from '../hooks/useChews';
import { useMobile, useTablet } from '../hooks/useBreakpoints';
import { useMediaQuery } from '@mantine/hooks';

export const Home = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { currentStage } = useChews();

  const isMobile = useMobile();
  const isTablet = useTablet();
  const collapseTopSection = useMediaQuery('(max-width: 1100px)');

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
        <Box
          mb={120}
          maw={isTablet ? 450 : undefined}
          mx={isTablet ? 'auto' : undefined}
        >
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
