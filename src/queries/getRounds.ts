import { ADDR } from '../constants/addresses';
import { RoundApplicationContent } from '../constants/dummyApplications';
import { Rubric } from '../constants/rubric';
import { ApplicationFragment, GgApplicationRound } from '../generated/graphql';
import { sdk } from '../utils/indexer';

export type ResolvedApplication = ApplicationFragment & {
  copy: RoundApplicationContent;
};

export type AppRound = Omit<GgApplicationRound, 'applications'> & {
  rubric: Rubric;
  applications: ResolvedApplication[];
};

export const getRounds = async (): Promise<AppRound | undefined> => {
  try {
    const res = await sdk.getApplicationRound({ id: ADDR.APP_ROUND });

    if (!res.GGApplicationRound_by_pk) {
      throw new Error('Round not found in the database');
    }

    const data = res.GGApplicationRound_by_pk;
    return {
      ...data,
      rubric: JSON.parse(data.rubric as string) as Rubric,
      applications: data.applications.map((app) => ({
        ...app,
        copy: JSON.parse(app.application as string),
      })),
    } as AppRound;
  } catch (error) {
    throw new Error('Failed to fetch application round');
  }
};
