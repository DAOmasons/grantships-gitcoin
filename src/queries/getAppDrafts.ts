import { submitApplicationSchema } from '../schemas/submitApplicationSchema';
import { appNetwork } from '../utils/config';
import { sdk } from '../utils/indexer';
import { getIpfsJson } from '../utils/ipfs';

export const getAppDrafts = async () => {
  try {
    const res = await sdk.applicationDrafts({ chainId: appNetwork.id });

    const drafts = res.AppDraft;

    if (!drafts) {
      throw new Error('No drafts found');
    }

    return drafts
      .map((draft) => {
        const json = JSON.parse(draft.json);

        return {
          ...draft,
          name: json.name,
          imgUrl: json.imgUrl,
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

    const offchainJson = await getIpfsJson(res.AppDraft_by_pk.ipfsHash);

    const validated = submitApplicationSchema.safeParse(offchainJson);

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
        const json = JSON.parse(draft.json);

        return {
          ...draft,
          name: json.name,
          imgUrl: json.imgUrl,
        };
      })
      .filter((draft) => draft !== undefined);
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch drafts');
  }
};

export const userHasAppDrafts = async (userAddress: string) => {
  try {
    const res = await sdk.applicationDraftsByUser({
      userAddress,
      chainId: appNetwork.id,
    });

    const drafts = res.AppDraft;

    if (!drafts) {
      throw new Error('No drafts found');
    }

    return drafts.length > 0;
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch drafts');
  }
};
