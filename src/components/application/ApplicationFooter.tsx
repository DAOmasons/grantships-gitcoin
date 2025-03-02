import { Box, Group, Stack, Text, Textarea } from '@mantine/core';
import { ContestStatus, Role } from '../../constants/enum';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTopicFeed } from '../../queries/feedQuery';
import { TAG } from '../../constants/tags';
import { useTx } from '../../contexts/useTx';
import { useUserData } from '../../hooks/useUserData';
import { ADDR } from '../../constants/addresses';
import SayethAbi from '../../abi/Sayeth.json';
import HalChoicesABI from '../../abi/HALChoices.json';
import { useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { commentSchema } from '../../schemas/feed';
import { encodeAbiParameters, isAddress, parseAbiParameters } from 'viem';
import { HATS } from '../../constants/setup';
import { TxButton } from '../TxButton';
import { FeedFactory } from '../feed/FeedFactory';
import { AdminSwitcher } from './AdminSwitcher';
import { useChews } from '../../hooks/useChews';

export const ApplicationFooter = ({
  topicId,
  applicantAddress,
  contentHash,
  isApproved,
}: {
  topicId: string;
  applicantAddress: string;
  contentHash: string;
  isApproved: boolean;
}) => {
  const [commentText, setCommentText] = useState('');
  const [isAdminComment, setIsAdminComment] = useState(false);
  const { applicationRound } = useChews();
  const { address } = useAccount();
  const { userData } = useUserData();
  const { data: feedItems, refetch } = useQuery({
    queryKey: ['comment feed', topicId],
    queryFn: () => getTopicFeed(topicId),
    enabled: !!topicId,
  });

  const { tx } = useTx();

  const isShipOperator = address === applicantAddress;

  const handlePostComment = async () => {
    const role = userData?.isAdmin
      ? Role.Admin
      : userData?.isJudge
        ? Role.Judge
        : isShipOperator
          ? Role.Operator
          : undefined;

    if (!role) {
      notifications.show({
        title: 'Error',
        message: 'You do not have permission to post comments',
        color: 'red',
      });
      return;
    }

    const tag = `${TAG.APPLICATION_COMMENT}:${topicId}`;
    const data = {
      body: commentText,
      roleType: role,
    };

    const valid = commentSchema.safeParse(data);

    if (!valid.success) {
      notifications.show({
        title: 'Error',
        message: 'Invalid comment data',
        color: 'red',
      });
      return;
    }

    let bytes;

    if (role === Role.Admin) {
      bytes = encodeAbiParameters(
        parseAbiParameters('string, string, (uint256, string), uint256'),
        [tag, JSON.stringify(data), [0n, ''], HATS.ADMIN]
      );
    } else if (role === Role.Judge) {
      bytes = encodeAbiParameters(
        parseAbiParameters('string, string, (uint256, string), uint256'),
        [tag, JSON.stringify(data), [0n, ''], HATS.JUDGE]
      );
    } else if (role === Role.Operator) {
      bytes = encodeAbiParameters(
        parseAbiParameters('string, string, (uint256, string)'),
        [tag, JSON.stringify(data), [999999999n, 'this is empty']]
      );
    } else {
      notifications.show({
        title: 'Error',
        message: 'Invalid role',
        color: 'red',
      });
      return;
    }

    const referrer =
      role === Role.Admin || role === Role.Judge
        ? ADDR.HATS_REFERRER
        : ADDR.REFERRER;

    tx({
      writeContractParams: {
        functionName: 'sayeth',
        address: ADDR.SAYETH,
        abi: SayethAbi,
        args: [referrer, bytes, false],
      },
      writeContractOptions: {
        onPollSuccess() {
          refetch();
          setCommentText('');
          setIsAdminComment(false);
        },
      },
    });
  };

  const approveApplication = async () => {
    const choicesAddress = applicationRound?.choicesParams_id;

    if (!applicationRound || !choicesAddress) {
      notifications.show({
        title: 'Error',
        message: 'Rubric voting round not found',
        color: 'red',
      });
      return;
    }

    if (
      Number(applicationRound.round?.contestStatus) !== ContestStatus.Populating
    ) {
      notifications.show({
        title: 'Error',
        message: 'Rubric voting round is not in Populating state',
        color: 'red',
      });
      return;
    }

    if (!isAddress(applicantAddress)) {
      notifications.show({
        title: 'Error',
        message: 'Invalid applicant address',
        color: 'red',
      });
      return;
    }

    if (!isAddress(choicesAddress)) {
      notifications.show({
        title: 'Error',
        message: 'Invalid choices address',
        color: 'red',
      });
      return;
    }

    const choiceData = encodeAbiParameters(
      parseAbiParameters('bytes, (uint256, string)'),
      [applicantAddress, [999999n, contentHash]]
    );

    const topicIdRoot = topicId.split('-')[0];

    tx({
      writeContractParams: {
        address: choicesAddress,
        functionName: 'registerChoice',
        abi: HalChoicesABI,
        args: [topicIdRoot, choiceData],
      },
      writeContractOptions: {
        onPollSuccess() {
          notifications.show({
            title: 'Success',
            message: 'Application approved',
            color: 'green',
          });

          refetch();
        },
      },
    });
  };

  return (
    <Box>
      <Text fz="lg" fw="600" c="highlight" mb="xl">
        History & Comments
      </Text>
      <Stack gap="lg" mb={72}>
        {feedItems?.map((item) => {
          return <FeedFactory key={item.id} {...item} />;
        })}
      </Stack>
      {userData?.isAdmin && (
        <AdminSwitcher
          commentText={commentText}
          setCommentText={setCommentText}
          handlePostComment={handlePostComment}
          isComment={isAdminComment}
          setIsComment={setIsAdminComment}
          handleApprove={approveApplication}
          isApproved={isApproved}
        />
      )}
      {(isShipOperator || userData?.isJudge) && (
        <>
          <Textarea
            placeholder="Write a comment..."
            mt="lg"
            minRows={3}
            maxRows={8}
            autosize
            value={commentText}
            onChange={(e) => setCommentText(e.currentTarget.value)}
          />
          <Group justify="center" mt="lg">
            <TxButton onClick={() => handlePostComment()}>
              Post Comment
            </TxButton>
          </Group>
        </>
      )}
    </Box>
  );
};
