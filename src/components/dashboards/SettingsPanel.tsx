import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { useChews } from '../../hooks/useChews';
import { IconArrowRight } from '@tabler/icons-react';
import { TxButton } from '../TxButton';
import { InfoBanner } from '../InfoBanner';
import { useUserData } from '../../hooks/useUserData';
import { useTx } from '../../contexts/useTx';
import { notifications } from '@mantine/notifications';
import { formatEther, isAddress } from 'viem';
import HalChoicesABI from '../../abi/HALChoices.json';
import { ContestStatus } from '../../constants/enum';
import RubricVotesABI from '../../abi/RubricVotes.json';
import { useMemo } from 'react';
import { roundNumberString } from '../../utils/common';
import { deployPublicVoting } from '../../setupScripts/chews';
import { getUserProof } from '../../utils/merkle';

const CONTEST_STATUS_LABEL = {
  [ContestStatus.Populating]: 'Populating',
  [ContestStatus.Voting]: 'Voting',
  [ContestStatus.Finalized]: 'Finalized',
};

const CONTEST_STATUS_DESCRIPTION = {
  [ContestStatus.Populating]:
    'Currently creating choices (Ships) for the judge rubric vote.',
  [ContestStatus.Voting]: 'Currently open for judges Rubric Voting.',
  [ContestStatus.Finalized]: 'Rubric Voting has been finalized.',
};

const CONTEST_STATUS_NEXT_ACTION = {
  [ContestStatus.Populating]:
    'The next stage finalizes the voting choices (Ships) and opens Rubric Voting for judges. WARNING: Firing this transaction will finalize the choices. No more applications can be approved for GG23',
  [ContestStatus.Voting]:
    'The next stage finalizes Rubric Voting for judges. WARNING: Firing this transaction will finalize voting. After finalization, judges will not be able to vote',
  [ContestStatus.Finalized]:
    'Voting is finalized. There are no further actions for this round.',
};

export const SettingsPanel = () => {
  const { applicationRound, refetchAppRound, judgeAmount } = useChews();

  const { userData } = useUserData();

  const { tx } = useTx();

  const haveAllJudgesVoted = useMemo(() => {
    if (!applicationRound) return false;

    if (applicationRound.applications.length === 0) return false;

    return applicationRound.applications.every(
      (app) => app.votes.length === judgeAmount
    );
  }, [applicationRound, judgeAmount]);

  const finalizeChoices = async () => {
    if (!applicationRound) {
      notifications.show({
        title: 'Error',
        message: 'Rubric Voting round not found',
      });
      return;
    }

    if (!userData?.isAdmin) {
      notifications.show({
        title: 'Error',
        message: 'You do not have permission to finalize choices',
      });
      return;
    }

    const choicesAddress = applicationRound?.choicesParams_id;

    if (!isAddress(choicesAddress)) {
      notifications.show({
        title: 'Error',
        message: 'Invalid choices address',
      });
      return;
    }

    tx({
      writeContractParams: {
        address: choicesAddress,
        abi: HalChoicesABI,
        functionName: 'finalizeChoices',
        args: [],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchAppRound();
          notifications.show({
            title: 'Success',
            message: 'Choices finalized',
            color: 'green',
          });
        },
      },
    });
  };

  const finalizeVoting = async () => {
    if (!applicationRound) {
      notifications.show({
        title: 'Error',
        message: 'Rubric Voting round not found',
      });
      return;
    }

    if (!userData?.isAdmin) {
      notifications.show({
        title: 'Error',
        message: 'You do not have permission to finalize choices',
      });
      return;
    }

    if (!haveAllJudgesVoted) {
      notifications.show({
        title: 'Error',
        message: 'Not all judges have voted',
      });
      return;
    }

    const votesAddress = applicationRound?.votesParams_id;

    if (!isAddress(votesAddress)) {
      notifications.show({
        title: 'Error',
        message: 'Invalid votes address',
      });
      return;
    }

    tx({
      writeContractParams: {
        address: votesAddress,
        abi: RubricVotesABI,
        functionName: 'finalizeVotes',
        args: [],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetchAppRound();
          notifications.show({
            title: 'Success',
            message: 'Votes finalized',
            color: 'green',
          });
        },
      },
    });
  };

  const launchVoting = async () => {
    const sortedShips = applicationRound?.applications
      .map((app) => {
        const avgScore =
          app?.votes.length === 0
            ? '0'
            : roundNumberString(
                formatEther(
                  (app.votes.reduce(
                    (acc, vote) => acc + BigInt(vote.amount),
                    0n
                  ) /
                    BigInt(app.votes.length)) *
                    100n
                ),
                0
              );

        return {
          ...app,
          avgScore,
        };
      })
      .sort((a, b) => Number(b.avgScore) - Number(a.avgScore));

    const topSixShipIds = sortedShips?.slice(0, 6).map((ship) => ship.id);

    if (!topSixShipIds || topSixShipIds.length === 0) {
      notifications.show({
        title: 'Error',
        message: 'No ships found or incorrect amount of ships',
      });
      return;
    }

    deployPublicVoting(topSixShipIds);
  };

  const isRubricPopulating =
    Number(applicationRound?.round?.contestStatus) === ContestStatus.Populating;

  const isRubricVoting =
    Number(applicationRound?.round?.contestStatus) === ContestStatus.Voting;

  const rubricVoteNextAction = isRubricPopulating
    ? finalizeChoices
    : isRubricVoting
      ? finalizeVoting
      : () => {};

  const testCORS = async () => {
    const result = await getUserProof(
      '0x57abda4ee50Bb3079A556C878b2c345310057569'
    );

    console.log('result', result);
  };

  return (
    <Box>
      <Title fz="h3" order={3} mb="sm">
        Contract Settings
      </Title>
      <Text mb="xl" c={'subtle'}>
        Manage vote contract states, progress rounds
      </Text>

      <Stack gap="md" mb={80}>
        <Text fz="xl" fw={600} c="highlight">
          Rubric Vote
        </Text>
        <Group gap={8}>
          <Text component={'a'} href={``} fw={600} td="underline">
            Contract Address
          </Text>
          <IconArrowRight size={18} stroke={1} />
        </Group>
        <Box>
          <Text mb="xxs" fw={600}>
            Current Status:{' '}
            {CONTEST_STATUS_LABEL[applicationRound?.round?.contestStatus] ||
              'Error'}
          </Text>
          <Text fz="sm" fs={'italic'} c="subtle">
            {CONTEST_STATUS_DESCRIPTION[
              applicationRound?.round?.contestStatus
            ] || 'Error'}
          </Text>
        </Box>
        <Box>
          <Text mb="xxs" fw={600}>
            Next Action:{' '}
          </Text>
          <Text fz="sm" fs={'italic'} c="subtle" mb="lg">
            {CONTEST_STATUS_NEXT_ACTION[
              applicationRound?.round?.contestStatus
            ] || 'Error'}
          </Text>
          <TxButton
            onClick={rubricVoteNextAction}
            disabled={!isRubricPopulating && !isRubricVoting}
          >
            Accelerate!
          </TxButton>
        </Box>
      </Stack>
      <Stack gap="md">
        <Text fz="xl" fw={600} c="highlight">
          Public Vote
        </Text>
        <Group gap={8}>
          <Text component={'a'} href={``} fw={600} td="underline">
            Contract Address
          </Text>
          <IconArrowRight size={18} stroke={1} />
        </Group>
        <Box>
          <Text mb="xxs" fw={600}>
            Do
            {/* Current Status:{' '}
            {CONTEST_STATUS_LABEL[applicationRound?.round?.contestStatus] ||
              'Error'} */}
          </Text>
          <Text fz="sm" fs={'italic'} c="subtle">
            Do
            {/* {CONTEST_STATUS_DESCRIPTION[
              applicationRound?.round?.contestStatus
            ] || 'Error'} */}
          </Text>
        </Box>
        <Box>
          <Text mb="xxs" fw={600}>
            Next Action:{' '}
          </Text>
          <Text fz="sm" fs={'italic'} c="subtle" mb="lg">
            {CONTEST_STATUS_NEXT_ACTION[
              applicationRound?.round?.contestStatus
            ] || 'Error'}
          </Text>
          <TxButton
            // onClick={nextAction} disabled={!isPopulating && !isVoting}
            onClick={launchVoting}
          >
            Accelerate!
          </TxButton>
          <Button onClick={testCORS}>Test cors</Button>
        </Box>
      </Stack>
    </Box>
  );
};
