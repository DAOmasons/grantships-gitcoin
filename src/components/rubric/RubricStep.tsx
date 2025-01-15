import {
  Box,
  Button,
  Divider,
  Group,
  InputLabel,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { RoundApplicationContent } from '../../constants/dummyApplications';
import { RubricSection } from '../../constants/rubric';
import { RubricQuestion } from './RubricQuestion';

export const RubricStep = ({
  section,
  scores,
  setScores,
  setFeedback,
  feedback,
  finalComment,
  index,
  setStep,
  totalSteps,
  appCopy,
  registrar,
}: {
  section: RubricSection;
  scores: Record<string, number>;
  setScores: (key: string, value: number) => void;
  setFeedback: (key: string, value: string) => void;
  feedback?: string;
  finalComment?: string;
  index: number;
  setStep: (step: number) => void;
  totalSteps?: number;
  appCopy: RoundApplicationContent;
  registrar?: string;
}) => {
  const theme = useMantineTheme();

  const allQuestionsAnswered = section.questions.every(
    (question) => scores[question.title]
  );

  const finalStep = totalSteps && index === totalSteps - 1;

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
            registrar={registrar}
          />
        ))}
      </Box>
      <Divider mb="xl" />
      <Box mx="xl" mb={finalStep === true ? 'xl' : 70}>
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
      {finalStep === true && (
        <Box mx="xl" mb={70}>
          <InputLabel fz="lg" fw={600} required mb={24}>
            Closing Comment
          </InputLabel>
          <Textarea
            key={section.sectionName}
            value={finalComment}
            placeholder="Enter feedback here..."
            onChange={(e) => setFeedback('Closing Comment', e.target.value)}
          />
        </Box>
      )}
      <Group justify="center" gap="xl">
        <Button
          variant="secondary"
          disabled={index === 0}
          onClick={() => (index === 0 ? undefined : setStep(index - 1))}
        >
          Back
        </Button>
        {finalStep === true ? (
          <Button
            disabled={!feedback || !allQuestionsAnswered || !finalComment}
            onClick={() => setStep(index + 1)}
          >
            Submit
          </Button>
        ) : (
          <Button
            disabled={!feedback || !allQuestionsAnswered}
            onClick={() => setStep(index + 1)}
          >
            Next
          </Button>
        )}
      </Group>
    </Box>
  );
};
