import {
  Box,
  Button,
  Divider,
  Group,
  InputLabel,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { RubricSection } from '../../constants/rubric';
import { RubricQuestion } from './RubricQuestion';
import { ApplicationMetadata } from '../../queries/getMetadata';

export const RubricStep = ({
  section,
  roundName,
  scores,
  setScores,
  imgUrl,
  setFeedback,
  feedback,
  finalComment,
  index,
  setStep,
  totalSteps,
  appCopy,
  registrar,
  handleVote,
}: {
  section: RubricSection;
  roundName: string;
  scores: Record<string, number>;
  setScores: (key: string, value: number) => void;
  setFeedback: (key: string, value: string) => void;
  feedback?: string;
  imgUrl: string;
  finalComment?: string;
  index: number;
  setStep: (step: number) => void;
  totalSteps?: number;
  appCopy: ApplicationMetadata;
  registrar?: string;
  handleVote: () => void;
}) => {
  const allQuestionsAnswered = section.questions.every(
    (question) => scores[question.title] != null
  );

  const finalStep = totalSteps && index === totalSteps - 1;

  return (
    <Box mt={'xl'}>
      <Title order={3} fz="h3" mb="sm">
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
            imgUrl={imgUrl}
            scores={scores}
            key={question.title}
            setScores={setScores}
            appCopy={appCopy}
            registrar={registrar}
            roundName={roundName}
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
            onClick={handleVote}
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
