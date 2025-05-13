import { useLayoutEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getUserProof } from '../../utils/merkle';
import { notifications } from '@mantine/notifications';
import { publicClient } from '../../utils/config';
import { ADDR } from '../../constants/addresses';
import MerklePointsABI from '../../abi/MerklePoints.json';
import gtcLogo from '../../assets/gtc-logo.png';

import { Avatar, Box, Group, Text, Title } from '@mantine/core';
import { TxButton } from '../TxButton';
import { VoteReady } from './VoteReady';

export const VoteUI = ({
  setCurrentTab,
}: {
  setCurrentTab: (tab: string) => void;
}) => {
  const { address } = useAccount();
  const [proof, setProof] = useState<string[] | null>(null);
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
    }
  }, [address]);

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
        // localStorage.setItem(`proof-${address}`, proofFromServer);
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

  if (!eligible) {
    return (
      <Box mb={'lg'}>
        <Title order={3} fz={'h3'} mb={'xl'}>
          Welcome to the New GTC Voting system
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
