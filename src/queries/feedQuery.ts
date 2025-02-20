import { TAG } from '../constants/tags';
import { FItemFragment } from '../generated/graphql';
import { sdk } from '../utils/indexer';

export type SystemNotice = {
  id: string;
  title: string;
  text: string;
  createdAt: number;
};

const resolveAppPost = async (feedItem: FItemFragment): SystemNotice => {};

const resolveFeedData = async (item: FItemFragment) => {
  if (item.postType === TAG.APPLICATION_POST) {
    return resolveAppPost(item);
  }
};

export const getTopicFeed = async (topicId: string) => {
  const res = await sdk.topicFeed({ topic: topicId });

  if (!res.FeedItem) {
    throw new Error('Failed to fetch topic feed');
  }

  const resolved = await Promise.all(res.FeedItem.map(resolveFeedData));
};
