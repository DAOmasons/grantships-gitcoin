import {
  ActionIcon,
  Box,
  Button,
  Group,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';
import { Role } from '../../constants/enum';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTopicFeed } from '../../queries/feedQuery';
import { TAG } from '../../constants/tags';
import { useTx } from '../../contexts/useTx';
import { useUserData } from '../../hooks/useUserData';
import { ADDR } from '../../constants/addresses';
import SayethAbi from '../../abi/Sayeth.json';
import { useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { commentSchema } from '../../schemas/feed';
import { encodeAbiParameters, parseAbiParameters } from 'viem';
import { HATS } from '../../constants/setup';
import { TxButton } from '../TxButton';
import { FeedFactory } from '../feed/FeedFactory';
import { IconCheck, IconMessage, IconX } from '@tabler/icons-react';

export const ApplicationFooter = ({
  topicId,
  applicantAddress,
}: {
  topicId: string;
  applicantAddress: string;
}) => {
  const [commentText, setCommentText] = useState('');
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

const AdminSwitcher = ({
  commentText,
  setCommentText,
  handlePostComment,
}: {
  commentText: string;
  setCommentText: (e: string) => void;
  handlePostComment: () => void;
}) => {
  const [isComment, setIsComment] = useState(false);

  if (isComment) {
    return (
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
          <Button variant="secondary" onClick={() => setIsComment(false)}>
            Cancel
          </Button>
          <TxButton onClick={() => handlePostComment()}>Post Comment</TxButton>
        </Group>
      </>
    );
  }

  return (
    <Group justify="center" mt="lg">
      <ActionIcon onClick={() => setIsComment(true)}>
        <IconMessage />
      </ActionIcon>
      <ActionIcon>
        <IconCheck />
      </ActionIcon>
      <ActionIcon>
        <IconX />
      </ActionIcon>
    </Group>
  );
};
