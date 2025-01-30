import {
  Box,
  Card,
  Divider,
  Radio,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useChews } from '../hooks/useChews';
import { PageLayout } from '../layout/Page';
import { Question } from '../constants/rubric';
import { useParams } from 'react-router-dom';
import { ResolvedApplication, ResolvedVote } from '../queries/getRounds';

export const Review = () => {
  const { applicationRound, isLoadingAppRound } = useChews();
  const { colors } = useMantineTheme();

  const { id } = useParams();

  const fragments = id?.split('-');

  const choiceId = fragments?.[1];
  const reviewerId = fragments?.[2];

  const selectedApplication = applicationRound?.applications.find(
    (app) => app.id === `choice-${choiceId}`
  );

  const review = selectedApplication?.votes.find(
    (vote) => vote.reviewer === reviewerId
  );

  if (isLoadingAppRound) {
    return null;
  }

  if (!applicationRound) {
    return (
      <Card>
        <Text>No Application Found</Text>
      </Card>
    );
  }

  if (!review) {
    return (
      <Card>
        <Text>No Review Found</Text>
      </Card>
    );
  }

  if (!selectedApplication) {
    return (
      <Card>
        <Text>No Application Found</Text>
      </Card>
    );
  }

  return (
    <PageLayout title="Review">
      {applicationRound.rubric.sections.map((section) => {
        const judgeReview = review.review.feedback[section.sectionName];
        return (
          <Box key={section.sectionLabel} mb={120}>
            <Title fz={'h3'} order={3} c={colors.kelp[6]} mb="sm">
              {section.sectionName}
            </Title>
            <Box mx="md">
              {section.questions.map((question) => {
                return (
                  <ReviewQuestion
                    key={question.title}
                    question={question}
                    application={selectedApplication}
                    review={review}
                  />
                );
              })}
            </Box>
            <Divider mb="md" />
            <Box mx="md">
              <Text fz="lg" fw={600} mb="md">
                Judge Feedback - {section.sectionName}
              </Text>
              <Card
                variant="inner"
                style={{
                  border: `1px solid ${colors.purple[6]}`,
                }}
              >
                <Text>{judgeReview}</Text>
              </Card>
            </Box>
          </Box>
        );
      })}
    </PageLayout>
  );
};

const ReviewQuestion = ({
  application,
  review,
  question,
}: {
  application: ResolvedApplication;
  review: ResolvedVote;
  question: Question;
}) => {
  const applicantResponse = application.copy.responses.find(
    (res) => res.title === question.title
  );

  const judgeScore = review.review.scores[question.title];

  return (
    <Box>
      <Text fz="lg" fw={600} mb="md">
        {question.title}
      </Text>
      <Card variant="inner" mb="md">
        <Text c="subtle">{applicantResponse?.response}</Text>
      </Card>
      <Box mb="xxl">
        {question.options.map((option) => {
          const checked = judgeScore === option.optionScore;
          return (
            <Radio
              key={option.optionText}
              size="md"
              checked={checked}
              readOnly
              mb={22}
              label={`${option.optionText} (${option.optionScore} points)`}
              disabled={!checked}
            />
          );
        })}
      </Box>
    </Box>
  );
};
