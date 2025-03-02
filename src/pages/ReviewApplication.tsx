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
import { useQuery } from '@tanstack/react-query';
import {
  ApplicationMetadata,
  getApplicationMetadata,
  getReviewMetadata,
  JudgeReviewMetadata,
} from '../queries/getMetadata';

export const Review = () => {
  const { applicationRound, isLoadingAppRound } = useChews();
  const { colors } = useMantineTheme();

  const { id } = useParams();

  const fragments = id?.split('-');

  const choiceId = fragments?.[1];
  const reviewerId = fragments?.[2];

  const selectedApplication = applicationRound?.applications.find(
    (app) => app.id === choiceId
  );

  const review = selectedApplication?.votes.find(
    (vote) => vote.reviewer === reviewerId
  );

  const { data: reviewMetadata } = useQuery({
    queryKey: ['reviewMetadata', review?.feedback],
    queryFn: () => getReviewMetadata(review?.feedback as string),
    enabled: !!review?.feedback,
  });

  const { data: applicationMetadata } = useQuery({
    queryKey: ['metadata', selectedApplication?.application.ipfsHash],
    queryFn: () =>
      getApplicationMetadata(
        selectedApplication?.application.ipfsHash as string
      ),
    enabled: !!selectedApplication?.application.ipfsHash,
  });

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

  if (!reviewMetadata || !applicationMetadata) {
    return null;
  }

  return (
    <PageLayout title="Review">
      {applicationRound.rubric.sections.map((section) => {
        const judgeReview = reviewMetadata.feedback[section.sectionName];

        return (
          <Box key={section.sectionLabel} mb={120}>
            <Title fz={'h3'} order={3} c={'highlight'} mb="sm">
              {section.sectionName}
            </Title>
            <Box mx="md">
              {section.questions.map((question) => {
                return (
                  <ReviewQuestion
                    key={question.title}
                    question={question}
                    applicationMetadata={applicationMetadata}
                    reviewMetadata={reviewMetadata}
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
                  border: `1px solid ${colors.dark[2]}`,
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
  reviewMetadata,
  applicationMetadata,
  question,
}: {
  applicationMetadata: ApplicationMetadata;
  reviewMetadata: JudgeReviewMetadata;
  question: Question;
}) => {
  const applicantResponse = applicationMetadata[question.title];
  const judgeScore = reviewMetadata.scores[question.title];

  return (
    <Box>
      <Text fz="lg" fw={600} mb="md">
        {question.title}
      </Text>
      <Card variant="inner" mb="md">
        <Text c="subtle">{applicantResponse}</Text>
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
