import { TAG } from '../constants/tags';
import { FItemFragment } from '../generated/graphql';
import { commentSchema, systemNoticeSchema } from '../schemas/feed';
import { truncateAddr } from '../utils/common';
import { sdk } from '../utils/indexer';

export type SystemNotice = {
  id: string;
  title: string;
  text: string;
  createdAt: number;
  postType: string;
};

export type UserComment = {
  id: string;
  title: string;
  text: string;
  createdAt: number;
  postType: string;
  roleType: number;
  userAddress: string;
};

export type FeedItemData = SystemNotice | UserComment;

const resolveAppPost = (feedItem: FItemFragment): SystemNotice => {
  if (!feedItem.json) {
    throw new Error('Invalid system notice data');
  }
  const valid = systemNoticeSchema.safeParse(JSON.parse(feedItem.json));

  if (!valid.success) {
    throw new Error('Invalid system notice data');
  }

  return {
    id: feedItem.id,
    title: valid.data.title,
    text: valid.data.body,
    createdAt: feedItem.createdAt,
    postType: feedItem.postType,
  };
};

const resolveEditPost = (feedItem: FItemFragment): SystemNotice => {
  if (!feedItem.json) {
    throw new Error('Invalid system notice data');
  }
  const valid = systemNoticeSchema.safeParse(JSON.parse(feedItem.json));

  if (!valid.success) {
    throw new Error('Invalid system notice data');
  }

  return {
    id: feedItem.id,
    title: valid.data.title,
    text: valid.data.body,
    createdAt: feedItem.createdAt,
    postType: feedItem.postType,
  };
};

const resolveAppApprove = (feedItem: FItemFragment): SystemNotice => {
  if (!feedItem.json) {
    throw new Error('Invalid system notice data');
  }
  const valid = systemNoticeSchema.safeParse(JSON.parse(feedItem.json));

  if (!valid.success) {
    throw new Error('Invalid system notice data');
  }

  return {
    id: feedItem.id,
    title: valid.data.title,
    text: valid.data.body,
    createdAt: feedItem.createdAt,
    postType: feedItem.postType,
  };
};

const resolveAppVote = (feedItem: FItemFragment): SystemNotice => {
  if (!feedItem.json) {
    throw new Error('Invalid system notice data');
  }
  const valid = systemNoticeSchema.safeParse(JSON.parse(feedItem.json));

  if (!valid.success) {
    throw new Error('Invalid system notice data');
  }

  return {
    id: feedItem.id,
    title: valid.data.title,
    text: valid.data.body,
    createdAt: feedItem.createdAt,
    postType: feedItem.postType,
  };
};

const resolveAppComment = (feedItem: FItemFragment): UserComment => {
  if (!feedItem.json) {
    throw new Error('Invalid comment data');
  }
  const valid = commentSchema.safeParse(JSON.parse(feedItem.json));

  if (!valid.success) {
    throw new Error('Invalid comment data');
  }

  return {
    id: feedItem.id,
    title: truncateAddr(feedItem.userAddress),
    userAddress: feedItem.userAddress,
    text: valid.data.body,
    createdAt: feedItem.createdAt,
    postType: feedItem.postType,
    roleType: valid.data.roleType,
  };
};

const resolveFeedData = async (item: FItemFragment) => {
  if (item.postType === TAG.APPLICATION_POST) {
    return resolveAppPost(item);
  }

  if (item.postType === TAG.APPLICATION_EDIT) {
    return resolveEditPost(item);
  }

  if (item.postType === TAG.APPLICATION_COMMENT) {
    return resolveAppComment(item);
  }
  if (item.postType === TAG.APPLICATION_APPROVE) {
    return resolveAppApprove(item);
  }

  if (item.postType === TAG.APPLICATION_VOTE) {
    return resolveAppVote(item);
  }
  return null;
};

export const getTopicFeed = async (topicId: string) => {
  try {
    const res = await sdk.topicFeed({ topic: topicId });

    if (!res.FeedItem) {
      console.error('Failed to fetch topic feed');
      throw new Error('Failed to fetch topic feed');
    }

    const resolved = await Promise.all(res.FeedItem.map(resolveFeedData));

    return resolved.filter((item) => item !== null);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch topic feed. Error: ${error}`);
  }
};
