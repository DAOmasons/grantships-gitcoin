import {
  Box,
  Card,
  Divider,
  Group,
  Radio,
  Skeleton,
  Stack,
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
import { InfoBanner } from '../components/InfoBanner';

export const Review = () => {
  const { applicationRound, isLoadingAppRound, appRoundError } = useChews();
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

  const {
    data: reviewMetadata,
    isLoading: isLoadingReviewMd,
    error: reviewMdError,
  } = useQuery({
    queryKey: ['reviewMetadata', review?.feedback],
    queryFn: () => getReviewMetadata(review?.feedback as string),
    enabled: !!review?.feedback,
  });

  const {
    data: applicationMetadata,
    isLoading: isLoadingAppMd,
    error: applicationMdError,
  } = useQuery({
    queryKey: ['metadata', selectedApplication?.application.ipfsHash],
    queryFn: () =>
      getApplicationMetadata(
        selectedApplication?.application.ipfsHash as string
      ),
    enabled: !!selectedApplication?.application.ipfsHash,
  });

  if (isLoadingAppRound || isLoadingReviewMd || isLoadingAppMd) {
    return (
      <PageLayout title="Review">
        <LoadingSkeleton />
      </PageLayout>
    );
  }

  if (reviewMdError || applicationMdError || appRoundError) {
    return (
      <PageLayout title="Review">
        <InfoBanner
          title="Error"
          description="An error occurred while fetching the review data."
        />
      </PageLayout>
    );
  }

  if (!applicationRound) {
    return (
      <PageLayout title="Review">
        <InfoBanner title="Error" description="No application round found." />
      </PageLayout>
    );
  }

  if (
    !review ||
    !selectedApplication ||
    !applicationMetadata ||
    !reviewMetadata
  ) {
    return (
      <PageLayout title="Review">
        <InfoBanner
          title="404: Error"
          description="No review found for the selected application."
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Review">
      <Stack gap={80}>
        {applicationRound.rubric.sections.map((section) => {
          const judgeReview = reviewMetadata.feedback[section.sectionName];

          return (
            <Box key={section.sectionLabel}>
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
      </Stack>
      <Box mx="md" mt="lg" mb={120}>
        <Text fz="lg" fw={600} mb="md">
          Closing Comment
        </Text>
        <Card
          variant="inner"
          style={{
            border: `1px solid ${colors.dark[2]}`,
          }}
        >
          <Text>{reviewMetadata.feedback['Closing Comment']}</Text>
        </Card>
      </Box>
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

const LoadingSkeleton = () => {
  return (
    <Stack gap={80}>
      <SkeletonSection />
      <SkeletonSection />
      <SkeletonSection />
    </Stack>
  );
};

const SkeletonSection = () => {
  return (
    <Box>
      <Skeleton w="50%" h={50} mb={16} />
      <Box mx="md">
        <Skeleton w="100%" h={60} mb={24} />
        <Stack gap={22}>
          <Group gap={16}>
            <Skeleton w={24} h={24} circle />
            <Skeleton w={'40%'} h={34} />
          </Group>
          <Group gap={16}>
            <Skeleton w={24} h={24} circle />
            <Skeleton w={'30%'} h={34} />
          </Group>
          <Group gap={16}>
            <Skeleton w={24} h={24} circle />
            <Skeleton w={'70%'} h={34} />
          </Group>
          <Group gap={16}>
            <Skeleton w={24} h={24} circle />
            <Skeleton w={'20%'} h={34} />
          </Group>
        </Stack>
      </Box>
    </Box>
  );
};
