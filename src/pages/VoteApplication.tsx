import { useEffect, useState } from 'react';
import { PageLayout } from '../layout/Page';
import { Stepper, Text, useMantineTheme } from '@mantine/core';
import { RUBRIC_COPY } from '../constants/rubric';
import { useChews } from '../hooks/useChews';
import { useNavigate, useParams } from 'react-router-dom';
import { RoundApplicationContent } from '../constants/dummyApplications';
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
import { IconCheck } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import {
  ApplicationMetadata,
  getApplicationMetadata,
} from '../queries/getMetadata';

export const VoteApplication = () => {
  const { id } = useParams();
  const { colors } = useMantineTheme();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const { tx } = useTx();
  const { address } = useAccount();
  const navigate = useNavigate();

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

  const registrar = ship?.registrar;

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

  const handleVote = () => {
    const maxScore = 40;

    const totalScore = Object.values(scores).reduce(
      (acc, score) => acc + score,
      0
    );

    const amount =
      parseEther(((totalScore / maxScore) * 100).toString()) / 100n;

    const metadata = JSON.stringify({
      scores,
      feedback,
    });

    if (!applicationRound?.id) {
      console.error('applicationRound not found');
      return;
    }

    const bytes = encodeAbiParameters(parseAbiParameters('(uint256, string)'), [
      [6969420n, metadata],
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

  if (isLoadingMetadata) {
    return null;
  }

  return (
    <PageLayout title="Application Vote">
      <Stepper active={step}>
        {RUBRIC_COPY.sections.map((section, index) => {
          return (
            <Stepper.Step
              key={index}
              label={section.sectionLabel}
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
                registrar={registrar}
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
