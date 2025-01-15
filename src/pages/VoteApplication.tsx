import { useState } from 'react';
import { PageLayout } from '../layout/Page';
import {
  Avatar,
  Box,
  Button,
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
import { IconChevronDown } from '@tabler/icons-react';

export const VoteApplication = () => {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});

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
}: {
  section: RubricSection;
  scores: Record<string, number>;
  setScores: (key: string, value: number) => void;
  setFeedback: (key: string, value: string) => void;
  feedback?: string;
  index: number;
  setStep: (step: number) => void;
  totalSteps?: number;
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
}: {
  scores: Record<string, number>;
  question: Question;
  setScores: (key: string, value: number) => void;
}) => {
  const { colors } = useMantineTheme();

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
          mask.eth
        </Text>
        <Group gap={4} style={{ cursor: 'pointer' }} onClick={() => {}}>
          <Text c={colors.dark[4]} fz="lg" td="underline" fw={500}>
            Expand
          </Text>
          <IconChevronDown />
        </Group>
      </Group>
    </Box>
  );
};
