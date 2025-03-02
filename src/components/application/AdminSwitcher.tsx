import {
  ActionIcon,
  Button,
  Group,
  Textarea,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { TxButton } from '../TxButton';
import { IconCheck, IconMessage, IconX } from '@tabler/icons-react';
import { useChews } from '../../hooks/useChews';
import { ContestStatus } from '../../constants/enum';
import { TxActionIcon } from '../TxActionIcon';

export const AdminSwitcher = ({
  commentText,
  setCommentText,
  handlePostComment,
  handleApprove,
  isComment,
  setIsComment,
  isApproved,
}: {
  commentText: string;
  setCommentText: (e: string) => void;
  handlePostComment: () => void;
  handleApprove: () => void;
  isComment: boolean;
  setIsComment: (e: boolean) => void;
  isApproved: boolean;
}) => {
  const { applicationRound } = useChews();

  const isPopulatingStage =
    applicationRound?.round?.contestStatus === ContestStatus.Populating;

  const { colors } = useMantineTheme();
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
      <Tooltip label="Leave a comment">
        <ActionIcon onClick={() => setIsComment(true)}>
          <IconMessage />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label={
          isApproved
            ? 'Application is already approved'
            : !isPopulatingStage
              ? 'Incorrect vote stage to approve application'
              : 'Approve Application for Upcoming Round'
        }
      >
        {isApproved || !isPopulatingStage ? (
          <IconCheck color={colors.dark[5]} />
        ) : (
          <TxActionIcon onClick={() => handleApprove()}>
            <IconCheck />
          </TxActionIcon>
        )}
      </Tooltip>
    </Group>
  );
};
