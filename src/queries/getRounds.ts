import { ADDR } from '../constants/addresses';
import { Rubric } from '../constants/rubric';
import {
  ApplicationFragment,
  DraftFragment,
  GgApplicationRound,
  GgApplicationVote,
} from '../generated/graphql';
import { batchVoteSchema } from '../schemas/batchVote';
import { sdk } from '../utils/indexer';

export type ResolvedVote = GgApplicationVote;

export type ResolvedApplication = Omit<ApplicationFragment, 'votes'> & {
  application: DraftFragment & { name: string; imgUrl: string };
  votes: ResolvedVote[];
};

export type AppRound = Omit<GgApplicationRound, 'applications' | 'rubric'> & {
  rubric: Rubric;
  applications: ResolvedApplication[];
};

export const getRubricRound = async (): Promise<AppRound | undefined> => {
  try {
    const res = await sdk.getApplicationRound({ id: ADDR.RUBRIC_ROUND });

    if (!res.GGApplicationRound_by_pk) {
      throw new Error('Round not found in the database');
    }

    const data = res.GGApplicationRound_by_pk;

    const resolved = {
      ...data,
      rubric: JSON.parse(data.rubric as string) as Rubric,
      applications: data.applications.map((app) => {
        const json = JSON.parse(app.application?.json as string);

        return {
          ...app,
          application: {
            ...app.application,
            name: json.name,
            imgUrl: json.imgUrl,
          },
        };
      }),
    } as AppRound;

    return resolved;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch application round');
  }
};

export type RawPublicRoundData = {
  id: string;
  contestStatus: number;
  ships: {
    choiceId: string;
    amountVoted: bigint;
  }[];
  batchVotes: {
    voter: string;
    timestamp: number;
    metadata: {
      ratings: {
        key: string;
        label: string;
        value: bigint;
      }[];
      context: string;
    };
  }[];
};

export const getPublicRound = async (): Promise<RawPublicRoundData | void> => {
  try {
    const res = await sdk.getPublicRound({ id: ADDR.PUBLIC_ROUND });

    if (!res.GGPublicRound_by_pk) {
      throw new Error('Round not found in the database');
    }

    const raw = res.GGPublicRound_by_pk.choicesParams?.basicChoices?.choices;

    if (!raw) {
      throw new Error('No ships found in the round');
    }

    const ships = raw.map((choice) => ({
      choiceId: choice.choiceId,
      amountVoted: BigInt(choice.amountVoted),
    }));

    return {
      id: ADDR.PUBLIC_ROUND,
      ships,
      contestStatus: Number(res.GGPublicRound_by_pk.round?.contestStatus),
      batchVotes: res.BatchVote.map((vote) => {
        const metadata = JSON.parse(vote.comment as string);

        const validated = batchVoteSchema.safeParse(metadata);

        if (!validated.success) {
          throw new Error('Invalid metadata format');
        }
        return {
          voter: vote.voter,
          timestamp: vote.timestamp,
          metadata: validated.data,
        };
      }),
    };
  } catch (error) {
    console.error(error);
  }
};
