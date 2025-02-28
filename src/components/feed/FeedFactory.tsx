import { Avatar, useMantineTheme } from '@mantine/core';
import {
  FeedItemData,
  SystemNotice,
  UserComment,
} from '../../queries/feedQuery';
import { FeedItemShell } from './FeedItemShell';
import { IconCheck, IconPencilMinus, IconPlus } from '@tabler/icons-react';
import { TAG } from '../../constants/tags';
import { AddressAvatar } from '../AddressAvatar';
import { Address } from 'viem';

export const FeedFactory = (item: FeedItemData) => {
  const { colors } = useMantineTheme();
  if (item.postType === TAG.APPLICATION_POST) {
    const notice = item as SystemNotice;

    return (
      <FeedItemShell
        title={notice.title}
        text={notice.text}
        graphic={
          <Avatar size={48}>
            <IconPlus color={colors.purple[6]} stroke={1.5} />{' '}
          </Avatar>
        }
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
          <AddressAvatar address={comment.userAddress as Address} size={48} />
        }
        createdAt={comment.createdAt}
      />
    );
  }

  if (item.postType === TAG.APPLICATION_EDIT) {
    const notice = item as SystemNotice;
    return (
      <FeedItemShell
        title={notice.title}
        text={notice.text}
        graphic={
          <Avatar size={48}>
            <IconPencilMinus color={colors.purple[6]} stroke={1.5} />
          </Avatar>
        }
        createdAt={notice.createdAt}
      />
    );
  }

  if (item.postType === TAG.APPLICATION_APPROVE) {
    const notice = item as SystemNotice;
    return (
      <FeedItemShell
        title={notice.title}
        text={`${notice.text}`}
        graphic={
          <Avatar size={48}>
            <IconCheck color={colors.kelp[6]} stroke={1.5} />
          </Avatar>
        }
        createdAt={notice.createdAt}
      />
    );
  }
  return null;
};
