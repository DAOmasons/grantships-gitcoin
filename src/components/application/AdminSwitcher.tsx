import { ActionIcon, Button, Group, Textarea, Tooltip } from '@mantine/core';
import { TxButton } from '../TxButton';
import { IconCheck, IconMessage, IconX } from '@tabler/icons-react';

export const AdminSwitcher = ({
  commentText,
  setCommentText,
  handlePostComment,
  isComment,
  setIsComment,
}: {
  commentText: string;
  setCommentText: (e: string) => void;
  handlePostComment: () => void;
  isComment: boolean;
  setIsComment: (e: boolean) => void;
}) => {
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
      <Tooltip label="Approve Application for Upcoming Round">
        <ActionIcon>
          <IconCheck />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Reject Application">
        <ActionIcon>
          <IconX />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};
