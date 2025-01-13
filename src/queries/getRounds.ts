import { ADDR } from '../constants/addresses';
import { RoundApplicationContent } from '../constants/dummyApplications';
import { Rubric } from '../constants/rubric';
import { ApplicationFragment, GgApplicationRound } from '../generated/graphql';
import { sdk } from '../utils/indexer';

export type AppRound = GgApplicationRound & {
  rubric: Rubric;
  applications: (ApplicationFragment & { appCopy: RoundApplicationContent })[];
};

export const getRounds = async () => {
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
        appCopy: JSON.parse(
          app.application as string
        ) as RoundApplicationContent,
      })),
    } as AppRound;
  } catch (error) {
    throw new Error('Failed to fetch application round');
  }
};
