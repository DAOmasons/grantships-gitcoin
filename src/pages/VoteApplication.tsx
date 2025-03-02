import { useEffect, useState } from 'react';
import { PageLayout } from '../layout/Page';
import {
  Box,
  Group,
  Skeleton,
  Stack,
  Stepper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { RUBRIC_COPY } from '../constants/rubric';
import { useChews } from '../hooks/useChews';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RubricStep } from '../components/rubric/RubricStep';
import { useTx } from '../contexts/useTx';
import {
  Address,
  encodeAbiParameters,
  parseAbiParameters,
  parseEther,
} from 'viem';
import ContestAbi from '../abi/Contest.json';
import { useAccount } from 'wagmi';
import { IconCheck, IconExternalLink } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import {
  ApplicationMetadata,
  getApplicationMetadata,
} from '../queries/getMetadata';
import { judgeResponseSchema } from '../schemas/submitApplicationSchema';
import { notifications } from '@mantine/notifications';
import { pinJSONToIPFS } from '../utils/ipfs';
import { useBreakpoints } from '../hooks/useBreakpoints';

export const VoteApplication = () => {
  const { id } = useParams();
  const { colors } = useMantineTheme();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const { tx } = useTx();
  const { address } = useAccount();
  const navigate = useNavigate();
  const { isMobile } = useBreakpoints();

  const { applicationRound, isLoadingAppRound, refetchAppRound } = useChews();

  const ship = applicationRound?.applications.find((app) => app.id === id);

  const { data: metadata, isLoading: isLoadingMetadata } = useQuery({
    queryKey: ['metadata', ship?.application.ipfsHash],
    queryFn: () => getApplicationMetadata(ship?.application.ipfsHash as string),
    enabled: !!ship?.application.ipfsHash,
  });

  const hasUserVoted = ship?.votes.some((vote) => vote.reviewer === address);

  const appCopy = ship?.application;

  useEffect(() => {
    if (hasUserVoted) {
      const userVote = ship?.votes.find((vote) => vote.reviewer === address);
      navigate(`/review/${userVote?.id}`);
    }
  }, [hasUserVoted]);

  if (isLoadingMetadata || isLoadingAppRound) {
    return (
      <PageLayout title="Application Vote">
        <LoadingSkeleton />
      </PageLayout>
    );
  }

  if (!appCopy) {
    return (
      <PageLayout title="Application Vote">
        <Text>Application not found</Text>
      </PageLayout>
    );
  }

  const handleVote = async () => {
    const maxScore = 40;

    const totalScore = Object.values(scores).reduce(
      (acc, score) => acc + score,
      0
    );

    const amount =
      parseEther(((totalScore / maxScore) * 100).toString()) / 100n;

    const metadata = {
      scores,
      feedback,
    };

    const validated = judgeResponseSchema.safeParse(metadata);

    if (!validated.success) {
      notifications.show({
        title: 'Error',
        message: 'Invalid feedback data',
        color: 'red',
      });
      return;
    }
    const pinRes = await pinJSONToIPFS(metadata);

    if (!pinRes.IpfsHash) {
      notifications.show({
        title: 'Error',
        message: 'Failed to pin metadata to IPFS',
        color: 'red',
      });
      return;
    }

    if (!applicationRound?.id) {
      notifications.show({
        title: 'Error',
        message: 'Invalid application round',
        color: 'red',
      });
      return;
    }

    const bytes = encodeAbiParameters(parseAbiParameters('(uint256, string)'), [
      [1n, pinRes.IpfsHash],
    ]);

    tx({
      writeContractParams: {
        address: applicationRound.id as Address,
        abi: ContestAbi,
        functionName: 'vote',
        args: [id, amount, bytes],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchAppRound?.();
        },
      },
    });
  };

  const handleChangeScore = (key: string, value: number) => {
    setScores({ ...scores, [key]: value });
  };

  const handleChangeFeedback = (key: string, value: string) => {
    setFeedback({ ...feedback, [key]: value });
  };

  return (
    <PageLayout title="Application Vote">
      <Group mb={'md'} justify="end">
        <Group gap={4}>
          <Text
            fz="sm"
            component={Link}
            to={`/view-draft/${ship.application.id}`}
            rel={'noopener noreferrer'}
            target={'_blank'}
            td={'underline'}
            c="subtle"
          >
            {' '}
            View Application
          </Text>
          <IconExternalLink size={16} stroke={1.5} color={colors.dark[3]} />
        </Group>
      </Group>
      <Stepper active={step}>
        {RUBRIC_COPY.sections.map((section, index) => {
          return (
            <Stepper.Step
              key={index}
              label={isMobile ? undefined : section.sectionLabel}
              completedIcon={<IconCheck color={colors.dark[6]} />}
            >
              <RubricStep
                section={section}
                scores={scores}
                imgUrl={appCopy.imgUrl}
                setScores={handleChangeScore}
                setFeedback={handleChangeFeedback}
                feedback={feedback[section.sectionName]}
                finalComment={feedback['Closing Comment']}
                setStep={setStep}
                index={index}
                totalSteps={RUBRIC_COPY.sections.length}
                appCopy={metadata as ApplicationMetadata}
                handleVote={handleVote}
                roundName={appCopy.name}
              />
            </Stepper.Step>
          );
        })}
      </Stepper>
    </PageLayout>
  );
};

const LoadingSkeleton = () => {
  const { isMobile } = useBreakpoints();
  return (
    <Box>
      <Group justify="end" mb="md">
        <Skeleton h={20} w={125} />
      </Group>
      <Group justify="space-between">
        <Group gap={8}>
          <Skeleton circle w={40} h={40} />
          {!isMobile && <Skeleton h={16} w={100} />}
        </Group>
        <Group gap={8}>
          <Skeleton circle w={40} h={40} />
          {!isMobile && <Skeleton h={16} w={100} />}
        </Group>
        <Group gap={8}>
          <Skeleton circle w={40} h={40} />
          {!isMobile && <Skeleton h={16} w={100} />}
        </Group>
        <Group gap={8}>
          <Skeleton circle w={40} h={40} />
          {!isMobile && <Skeleton h={16} w={100} />}
        </Group>
      </Group>
      <Box mt={48}>
        <Skeleton w="50%" h={50} mb={24} />
        <Skeleton w="40%" h={20} mb={40} />
        <Box mx="md">
          <Stack gap={28}>
            <Group gap={16}>
              <Skeleton w={24} h={24} circle />
              <Skeleton w={'40%'} h={24} />
            </Group>
            <Group gap={16}>
              <Skeleton w={24} h={24} circle />
              <Skeleton w={'30%'} h={24} />
            </Group>
            <Group gap={16}>
              <Skeleton w={24} h={24} circle />
              <Skeleton w={'70%'} h={24} />
            </Group>
            <Group gap={16}>
              <Skeleton w={24} h={24} circle />
              <Skeleton w={'20%'} h={24} />
            </Group>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
