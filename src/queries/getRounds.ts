import { ADDR } from '../constants/addresses';
import { sdk } from '../utils/indexer';

export const getRounds = async () => {
  const res = await sdk.getApplicationRound({ id: ADDR.APP_ROUND });

  if (!res.GGApplicationRound_by_pk) {
    throw new Error('Round not found in the database');
  }

  const data = res.GGApplicationRound_by_pk;
  return {
    ...data,
    application: JSON.parse(data.rubric as string),
  };
};
