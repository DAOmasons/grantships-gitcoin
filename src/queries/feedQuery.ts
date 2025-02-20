import { TAG } from '../constants/tags';
import { FItemFragment } from '../generated/graphql';
import { systemNoticeSchema } from '../schemas/feed';
import { sdk } from '../utils/indexer';

export type SystemNotice = {
  id: string;
  title: string;
  text: string;
  createdAt: number;
  postType: string;
};

export type FeedItemData = SystemNotice;

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

const resolveFeedData = async (item: FItemFragment) => {
  if (item.postType === TAG.APPLICATION_POST) {
    return resolveAppPost(item);
  }
  return null;
};

export const getTopicFeed = async (topicId: string) => {
  const res = await sdk.topicFeed({ topic: topicId });

  if (!res.FeedItem) {
    throw new Error('Failed to fetch topic feed');
  }

  const resolved = await Promise.all(res.FeedItem.map(resolveFeedData));

  return resolved.filter((item) => item !== null);
};
