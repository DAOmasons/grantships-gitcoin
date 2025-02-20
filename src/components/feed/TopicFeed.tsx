import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
import { Role } from '../../constants/enum';
import { ReactNode, useState } from 'react';
import { RoleIcon } from '../RoleIcons';
import { useQuery } from '@tanstack/react-query';
import {
  FeedItemData,
  getTopicFeed,
  SystemNotice,
  UserComment,
} from '../../queries/feedQuery';
import { TAG } from '../../constants/tags';
import { secondsToLongDate } from '../../utils/time';
import { useTx } from '../../contexts/useTx';
import { useUserData } from '../../hooks/useUserData';
import { ADDR } from '../../constants/addresses';
import SayethAbi from '../../abi/Sayeth.json';
import { useAccount } from 'wagmi';
import { notifications } from '@mantine/notifications';
import { commentSchema } from '../../schemas/feed';
import { Address, encodeAbiParameters, parseAbiParameters } from 'viem';
import { HATS } from '../../constants/setup';
import { TxButton } from '../TxButton';
import { AddressAvatar } from '../AddressAvatar';

export const ApplicationTopicFeed = ({
  topicId,
  title,
  applicantAddress,
}: {
  topicId: string;
  title: string;
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

    console.log('bytes', bytes);

    console.log('tag', tag);
    console.log('referrer', referrer);

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

  const canComment = userData?.isAdmin || userData?.isJudge || isShipOperator;

  return (
    <Box>
      <Text fz="lg" fw="600" c="highlight" mb="xl">
        {title}
      </Text>
      <Stack gap="lg" mb={72}>
        {feedItems?.map((item) => {
          return <FeedFactory key={item.id} {...item} />;
        })}
      </Stack>
      {canComment && (
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

const FeedItemShell = ({
  title,
  text,
  role,
  graphic,
  createdAt,
}: {
  title: string;
  text: string;
  role?: Role;
  graphic: ReactNode;
  createdAt: number;
}) => {
  return (
    <Box>
      <Group mb="sm" justify="space-between">
        <Group gap="sm">
          <Box w={40} h={40}>
            {graphic}
          </Box>
          <Text fz="lg" c="highlight" fw="600">
            {title}
          </Text>
          {role && <RoleIcon iconRole={role} />}
        </Group>
        <Text c="subtle" fz="sm">
          {secondsToLongDate(createdAt)}
        </Text>
      </Group>
      <Card variant="comment">
        <Text className="ws-pre-wrap">{text}</Text>
      </Card>
    </Box>
  );
};

export const FeedFactory = (item: FeedItemData) => {
  const { colors } = useMantineTheme();
  if (item.postType === TAG.APPLICATION_POST) {
    const notice = item as SystemNotice;

    return (
      <FeedItemShell
        title={notice.title}
        text={notice.text}
        graphic={<IconStar color={colors.purple[6]} stroke={1.2} size={40} />}
        createdAt={notice.createdAt}
      />
    );
  }
  if (item.postType === TAG.APPLICATION_COMMENT) {
    const comment = item as UserComment;
    return (
      <FeedItemShell
        title={comment.title}
        text={comment.text}
        role={comment.roleType}
        graphic={
          <AddressAvatar address={comment.userAddress as Address} size={40} />
        }
        createdAt={comment.createdAt}
      />
    );
  }
  return null;
};
