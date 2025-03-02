import { z } from 'zod';
import { submitApplicationSchema } from '../schemas/submitApplicationSchema';
import { getIpfsJson } from '../utils/ipfs';

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
