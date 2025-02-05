import { Address } from 'viem';
import { publicClient } from '../utils/config';
import { ADDR } from '../constants/addresses';
import HatsAbi from '../abi/Hats.json';
import { HATS } from '../constants/setup';
import { userHasAppDrafts } from './getAppDrafts';

const userApplications = async (address: Address) => {
  const appDrafts = await userHasAppDrafts(address);

  return {
    hasApplications: appDrafts,
    userDrafts: appDrafts,
  };
};

const hatsRoleQuery = async (address: Address) => {
  try {
    const adminHatPromise = publicClient.readContract({
      address: ADDR.HATS,
      abi: HatsAbi,
      functionName: 'isWearerOfHat',
      args: [address, HATS.ADMIN],
    });

    const judgeHatPromise = publicClient.readContract({
      address: ADDR.HATS,
      abi: HatsAbi,
      functionName: 'isWearerOfHat',
      args: [address, HATS.JUDGE],
    });

    const [adminHat, judgeHat] = await Promise.all([
      adminHatPromise,
      judgeHatPromise,
    ]);

    return { isAdmin: adminHat as boolean, isJudge: judgeHat as boolean };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to query user roles. Error ${error}`);
  }
};

export const userQuery = async (userAddress: Address) => {
  try {
    const { isAdmin, isJudge } = await hatsRoleQuery(userAddress);
    const { hasApplications } = await userApplications(userAddress);

    return { isAdmin, isJudge, hasApplications };
  } catch (error) {
    throw new Error(`Failed to query user roles. Error ${error}`);
  }
};
