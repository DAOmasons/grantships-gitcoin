import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Card,
  Group,
  Rating,
  Slider,
  Stack,
  Tabs,
  Text,
  Textarea,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { PageLayout } from '../layout/Page';
import {
  IconList,
  IconStar,
  IconStarFilled,
  IconUfo,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { PromptSchema, testAIServer } from '../utils/ai';
import { useAccount } from 'wagmi';
import { getUserProof } from '../utils/merkle';
import { notifications } from '@mantine/notifications';
import { publicClient } from '../utils/config';
import { ADDR } from '../constants/addresses';
import { TxButton } from '../components/TxButton';
import { encodeAbiParameters, Hex, parseAbiParameters } from 'viem';
import { useTx } from '../contexts/useTx';
import ContestABI from '../abi/Contest.json';
import { useChews } from '../hooks/useChews';
import { Link } from 'react-router-dom';
import { batchVoteSchema } from '../schemas/batchVote';
import { GG_MD_POINTER } from '../constants/tags';
import { VoteUI } from '../components/publicvote/VoteUI';

export const Vote = () => {
  const [currentTab, setCurrentTab] = useState('vote');
  return (
    <PageLayout title="Vote">
      <Tabs defaultValue={currentTab} value={currentTab} mb={70}>
        <Tabs.List mb="md">
          <Tabs.Tab value="vote" leftSection={<IconStar size={14} />}>
            Vote
          </Tabs.Tab>
          <Tabs.Tab value="results" leftSection={<IconUsersGroup size={14} />}>
            Results
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="vote">
          <VoteUI setCurrentTab={setCurrentTab} />
        </Tabs.Panel>
        <Tabs.Panel value="results">
          <></>
        </Tabs.Panel>
      </Tabs>
    </PageLayout>
  );
};
