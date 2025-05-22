import { useLayoutEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getUserProof } from '../../utils/merkle';
import { notifications } from '@mantine/notifications';
import { publicClient } from '../../utils/config';
import { ADDR } from '../../constants/addresses';
import MerklePointsABI from '../../abi/MerklePoints.json';
import gtcLogo from '../../assets/gitcoin-gtc-logo.png';

import {
  Avatar,
  Box,
  Button,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { TxButton } from '../TxButton';
import { VoteReady } from './VoteReady';
import { useChews } from '../../hooks/useChews';
import { IconCheck } from '@tabler/icons-react';

export const VoteUI = ({
  setCurrentTab,
}: {
  setCurrentTab: (tab: string) => void;
}) => {
  const { address } = useAccount();
  const { publicRound } = useChews();
  const { colors } = useMantineTheme();
  const [proof, setProof] = useState<string[] | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [checkingEligible, setCheckingEligible] = useState(false);
  const [eligible, setEligible] = useState<boolean | undefined>(false);

  useLayoutEffect(() => {
    // check local storage for proof

    if (!address) {
      return;
    }

    const proof = localStorage.getItem(`proof-${address}`);

    if (proof) {
      setEligible(true);
      setProof(JSON.parse(proof));
    }
  }, [address]);

  useLayoutEffect(() => {
    const hasVoted = publicRound?.batchVotes.some(
      (vote) => vote.voter === address
    );

    if (hasVoted) {
      setHasVoted(true);
    } else {
      setHasVoted(false);
    }
  }, [publicRound, address]);

  const checkEligibility = async () => {
    try {
      setCheckingEligible(true);
      if (!address) {
        // notifications.show({
        //   title: 'Error',
        //   message: 'Please connect your wallet to check your eligibility',
        // });
        setCheckingEligible(false);
        return;
      }

      const proofFromServer = await getUserProof(address);

      if (!proofFromServer) {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'Error fetching proof from server',
        });
        setCheckingEligible(false);
        return;
      }

      if (!proofFromServer.length) {
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'You are not eligible to vote. Please check your wallet.',
        });
        setCheckingEligible(false);
        setEligible(false);
        return;
      }

      const isEligible = await publicClient.readContract({
        address: ADDR.MERKLE_POINTS,
        abi: MerklePointsABI,
        functionName: 'verifyPoints',
        args: [address, 1e18, proofFromServer],
      });

      if (isEligible) {
        localStorage.setItem(
          `proof-${address}`,
          JSON.stringify(proofFromServer)
        );
        setProof(proofFromServer);
        setEligible(true);
        setCheckingEligible(false);
      } else {
        setEligible(false);
        setCheckingEligible(false);
        notifications.show({
          title: 'Error',
          color: 'red',
          message: 'You are not eligible to vote',
        });
      }
    } catch (error) {
      console.error('Error checking eligibility:', error);
      notifications.show({
        title: 'Error',
        // color: 'red',
        message: 'Error checking eligibility',
      });
      setCheckingEligible(false);
      return;
    }
  };

  if (hasVoted) {
    return (
      <Box mb={'lg'}>
        <Title order={3} fz={'h3'} mb={'xl'} ta="center">
          Thank you for voting!
        </Title>
        <Group justify="center">
          <Avatar size={171} mb="xl">
            <IconCheck size={120} color={colors.kelp[7]} />
          </Avatar>
        </Group>
        <Text c="subtle" mb="sm" ta="center">
          Thank you for participating in Grant Ships for GG23! Your vote has
          been recorded onchain and tallied in the results.
        </Text>
        <Group justify="center" mt="xxl">
          <Button onClick={() => setCurrentTab('results')}>View Results</Button>
        </Group>
      </Box>
    );
  }

  if (!eligible) {
    return (
      <Box mb={'lg'}>
        <Title order={3} fz={'h3'} mb={'xl'}>
          GG23 Community Round Vote
        </Title>
        <Group justify="center">
          <Avatar src={gtcLogo} size={171} mb="xl" />
        </Group>
        <Text c="subtle" mb="sm">
          To participate in the voting process, you need to verify your
          eligibility. Click the button below to check if you're eligible to
          vote.
        </Text>
        <Text mb="sm">
          In order to be eligible, you must hold at least 100 GTC tokens on
          mainnet before May 11th 2024.
        </Text>
        <Group justify="center" mt="xxl">
          <TxButton onClick={checkEligibility} loading={checkingEligible}>
            Check Eligibility
          </TxButton>
        </Group>
      </Box>
    );
  }

  return <VoteReady proof={proof} setCurrentTab={setCurrentTab} />;
};
