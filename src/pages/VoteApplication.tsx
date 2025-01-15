import { useMemo, useState } from 'react';
import { PageLayout } from '../layout/Page';
import {
  Avatar,
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Group,
  InputLabel,
  Radio,
  Stepper,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Question, RUBRIC_COPY, RubricSection } from '../constants/rubric';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useChews } from '../hooks/useChews';
import { useParams } from 'react-router-dom';
import { RoundApplicationContent } from '../constants/dummyApplications';
import { useDisclosure } from '@mantine/hooks';

export const VoteApplication = () => {
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const { applicationRound, isLoadingAppRound } = useChews();

  const currentApplication = applicationRound?.applications.find(
    (app) => app.id === id
  );

  const appCopy = currentApplication?.copy;

  if (isLoadingAppRound) {
    return null;
  }

  if (!appCopy) {
    return (
      <PageLayout title="Application Vote">
        <Text>Application not found</Text>
      </PageLayout>
    );
  }

  const handleChangeScore = (key: string, value: number) => {
    setScores({ ...scores, [key]: value });
  };

  const handleChangeFeedback = (key: string, value: string) => {
    setFeedback({ ...feedback, [key]: value });
  };

  return (
    <PageLayout title="Application Vote">
      <Stepper active={step}>
        {RUBRIC_COPY.sections.map((section, index) => {
          return (
            <Stepper.Step
              key={index}
              label={section.sectionLabel}
              completedIcon={index + 1}
            >
              <RubricStep
                section={section}
                scores={scores}
                setScores={handleChangeScore}
                setFeedback={handleChangeFeedback}
                feedback={feedback[section.sectionName]}
                setStep={setStep}
                index={index}
                totalSteps={RUBRIC_COPY.sections.length}
                appCopy={appCopy as RoundApplicationContent}
              />
            </Stepper.Step>
          );
        })}
      </Stepper>
    </PageLayout>
  );
};

const RubricStep = ({
  section,
  scores,
  setScores,
  setFeedback,
  feedback,
  index,
  setStep,
  totalSteps,
  appCopy,
}: {
  section: RubricSection;
  scores: Record<string, number>;
  setScores: (key: string, value: number) => void;
  setFeedback: (key: string, value: string) => void;
  feedback?: string;
  index: number;
  setStep: (step: number) => void;
  totalSteps?: number;
  appCopy: RoundApplicationContent;
}) => {
  const theme = useMantineTheme();

  const allQuestionsAnswered = section.questions.every(
    (question) => scores[question.title]
  );

  return (
    <Box mt={56}>
      <Title order={3} fz="h3" c={theme.colors.kelp[6]} mb="sm">
        {section.sectionName}
      </Title>
      <Text mb="lg">
        {section?.questions?.length > 1
          ? 'Select one choice for each vote'
          : 'Select once choice'}{' '}
        (0-10 points)
      </Text>
      <Box mx="lg">
        {section.questions.map((question) => (
          <RubricQuestion
            question={question}
            scores={scores}
            key={question.title}
            setScores={setScores}
            appCopy={appCopy}
          />
        ))}
      </Box>
      <Divider mb="xl" />
      <Box mx="xl" mb={70}>
        <InputLabel fz="lg" fw={600} required mb={24}>
          Feedback - {section.sectionName}
        </InputLabel>
        <Textarea
          key={section.sectionName}
          value={feedback}
          placeholder="Enter feedback here..."
          onChange={(e) => setFeedback(section.sectionName, e.target.value)}
        />
      </Box>
      <Group justify="center" gap="xl">
        <Button
          variant="secondary"
          disabled={index === 0}
          onClick={() => (index === 0 ? undefined : setStep(index - 1))}
        >
          Back
        </Button>
        <Button
          variant="primary"
          disabled={!feedback || !allQuestionsAnswered}
          onClick={() => setStep(index + 1)}
        >
          Next
        </Button>
      </Group>
    </Box>
  );
};

const RubricQuestion = ({
  question,
  setScores,
  scores,
  appCopy,
}: {
  scores: Record<string, number>;
  question: Question;
  setScores: (key: string, value: number) => void;
  appCopy: RoundApplicationContent;
}) => {
  const { colors } = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  const applicantResponse = useMemo(() => {
    return appCopy.responses.find(
      (response) => response.title === question.title
    );
  }, [appCopy, question.title]);

  return (
    <Box mb="xxl">
      <InputLabel fw={600} fz="lg" mb={24} key={question.title} required>
        {question.title}
      </InputLabel>
      {question.options.map((option) => {
        return (
          <Radio
            key={option.optionText}
            size="md"
            checked={scores[question.title] === option.optionScore}
            onChange={() => {
              setScores(question.title, option.optionScore);
            }}
            mb={22}
            label={`${option.optionText} (${option.optionScore} points)`}
          />
        );
      })}
      <Group gap={8} mt={24}>
        <Text fz="lg" c={colors.dark[4]}>
          Response from
        </Text>
        <Avatar fz={24} />
        <Text fz="lg" c={colors.dark[4]}>
          {appCopy.roundName}
        </Text>
        <Group gap={4} style={{ cursor: 'pointer' }} onClick={() => toggle()}>
          <Text c={colors.dark[4]} fz="lg" td="underline" fw={500}>
            Expand
          </Text>
          {opened ? <IconChevronUp /> : <IconChevronDown />}
        </Group>
      </Group>
      <Collapse in={opened}>
        <Card variant="inner" mt={'md'}>
          <Text c={colors.dark[4]}>{applicantResponse?.response}</Text>
        </Card>
      </Collapse>
    </Box>
  );
};
