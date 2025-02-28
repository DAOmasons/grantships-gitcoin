import { ADDR } from '../constants/addresses';
import { Rubric } from '../constants/rubric';
import {
  ApplicationFragment,
  DraftFragment,
  GgApplicationRound,
  GgApplicationVote,
} from '../generated/graphql';
import { sdk } from '../utils/indexer';

export type ResolvedVote = GgApplicationVote & {
  review: {
    scores: Record<string, number>;
    feedback: Record<string, string>;
  };
};

export type ResolvedApplication = Omit<ApplicationFragment, 'votes'> & {
  application: DraftFragment & { name: string; imgUrl: string };
  votes: ResolvedVote[];
};

export type AppRound = Omit<GgApplicationRound, 'applications' | 'rubric'> & {
  rubric: Rubric;
  applications: ResolvedApplication[];
};

export const getRounds = async (): Promise<AppRound | undefined> => {
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
          votes: app.votes.map(
            (vote) =>
              ({ ...vote, review: JSON.parse(vote.feedback) }) as ResolvedVote
          ),
        };
      }),
    } as AppRound;

    return resolved;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch application round');
  }
};
