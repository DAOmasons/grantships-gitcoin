import { submitApplicationSchema } from '../schemas/submitApplicationSchema';
import { sdk } from '../utils/indexer';

export const getAppDrafts = async () => {
  try {
    const res = await sdk.applicationDrafts();

    const drafts = res.AppDraft;

    if (!drafts) {
      throw new Error('No drafts found');
    }

    return drafts
      .map((draft) => {
        const validated = submitApplicationSchema.safeParse(
          JSON.parse(draft.json)
        );

        if (!validated.success) {
          return undefined;
        }

        return {
          ...draft,
          parsedJSON: validated.data,
        };
      })
      .filter((draft) => draft !== undefined);
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch drafts');
  }
};
