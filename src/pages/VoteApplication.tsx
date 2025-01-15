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
import { useInputState } from '@mantine/hooks';

export const VoteApplication = () => {
  const [active, setActive] = useState(0);
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
      <Stepper active={active}>
        {RUBRIC_COPY.sections.map((section, index) => {
          return (
            <Stepper.Step
              key={index}
              label={section.sectionLabel}
              completedIcon={index + 1}
            >
              <RubricStep
                section={section}
                setScores={handleChangeScore}
                setFeedback={handleChangeFeedback}
                feedback={feedback[section.sectionName]}
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
  setScores,
  setFeedback,
  feedback,
}: {
  section: RubricSection;
  setScores: (key: string, value: number) => void;
  setFeedback: (key: string, value: string) => void;
  feedback?: string;
}) => {
  const theme = useMantineTheme();
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
          value={feedback}
          onChange={(e) => setFeedback(section.sectionName, e.target.value)}
        />
      </Box>
      <Group justify="center" gap="xl">
        <Button variant="secondary" disabled>
          Back
        </Button>
        <Button variant="primary" disabled>
          Next
        </Button>
      </Group>
    </Box>
  );
};

const RubricQuestion = ({
  question,
  setScores,
}: {
  question: Question;
  setScores: (key: string, value: number) => void;
}) => {
  const [value, setValue] = useState<string | null>(null);
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
            checked={value === option.optionText}
            onChange={() => {
              setValue(option.optionText);
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
