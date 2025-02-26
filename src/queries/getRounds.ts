import { ADDR } from '../constants/addresses';
import { RoundApplicationContent } from '../constants/dummyApplications';
import { Rubric } from '../constants/rubric';
import {
  ApplicationFragment,
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
  copy: RoundApplicationContent;
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
      applications: data.applications
        .map((app) => ({
          ...app,
          copy: JSON.parse(app.application as string),
          votes: app.votes.map(
            (vote) =>
              ({ ...vote, review: JSON.parse(vote.feedback) }) as ResolvedVote
          ),
        }))
        .filter(
          (app) =>
            app.id !==
            'choice-0x850cb4905526aed514f256ebc7ba01790295704f7652d22f87ef91a67507e2a0'
        ),
    } as AppRound;

    return resolved;
  } catch (error) {
    throw new Error('Failed to fetch application round');
  }
};
