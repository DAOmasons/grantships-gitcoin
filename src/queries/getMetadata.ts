import { z } from 'zod';
import {
  judgeResponseSchema,
  submitApplicationSchema,
} from '../schemas/submitApplicationSchema';
import { getIpfsJson } from '../utils/ipfs';
import { GgApplicationVote } from '../generated/graphql';

export type ApplicationMetadata = z.infer<typeof submitApplicationSchema>;

export const getApplicationMetadata = async (
  ipfsHash: string
): Promise<ApplicationMetadata> => {
  try {
    const offchainJson = await getIpfsJson(ipfsHash);

    if (!offchainJson) {
      throw new Error('Invalid metadata');
    }

    const validated = submitApplicationSchema.safeParse(offchainJson);

    if (!validated.success) {
      throw new Error('Invalid metadata');
    }

    return validated.data as ApplicationMetadata;
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch metadata');
  }
};

export type JudgeReviewMetadata = z.infer<typeof judgeResponseSchema>;

export const getReviewMetadata = async (
  ipfsHash: string
): Promise<JudgeReviewMetadata> => {
  try {
    const offchainJson = await getIpfsJson(ipfsHash);

    if (!offchainJson) {
      throw new Error('Invalid metadata');
    }

    const validated = judgeResponseSchema.safeParse(offchainJson);

    if (!validated.success) {
      throw new Error('Invalid metadata');
    }

    return validated.data as JudgeReviewMetadata;
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch metadata');
  }
};

export const getReviewsWithMetadata = async (reviews: GgApplicationVote[]) => {
  try {
    const metadata = await Promise.all(
      reviews.map(async (review) => {
        const offchainJson = await getIpfsJson(review.feedback);

        if (!offchainJson) {
          throw new Error('Invalid metadata');
        }

        const validated = judgeResponseSchema.safeParse(offchainJson);

        if (!validated.success) {
          throw new Error('Invalid metadata');
        }

        return {
          ...review,
          metadata: validated.data as JudgeReviewMetadata,
        };
      })
    );

    return metadata;
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch metadata');
  }
};
