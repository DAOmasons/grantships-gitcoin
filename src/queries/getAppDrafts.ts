import { submitApplicationSchema } from '../schemas/submitApplicationSchema';
import { appNetwork } from '../utils/config';
import { sdk } from '../utils/indexer';

export const getAppDrafts = async () => {
  try {
    const res = await sdk.applicationDrafts({ chainId: appNetwork.id });

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

export const getAppDraft = async (id: string) => {
  try {
    const res = await sdk.applicationDraft({ id });

    if (!res.AppDraft_by_pk) {
      throw new Error('No draft found');
    }

    const validated = submitApplicationSchema.safeParse(
      JSON.parse(res.AppDraft_by_pk.json)
    );

    if (!validated.success) {
      throw new Error('Invalid draft');
    }

    return {
      ...res.AppDraft_by_pk,
      parsedJSON: validated.data,
    };
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch draft');
  }
};

export const getAppDraftsByUser = async (userAddress: string) => {
  try {
    const res = await sdk.applicationDraftsByUser({
      userAddress,
      chainId: appNetwork.id,
    });

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
