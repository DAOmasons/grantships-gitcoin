import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useEffect, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { userQuery } from '../queries/userQuery';
import { Address } from 'viem';
import {
  AppRound,
  getPublicRound,
  getRubricRound,
  RawPublicRoundData,
} from '../queries/getRounds';
import { ContestStatus } from '../constants/enum';

type UserData = {
  isJudge: boolean;
  isAdmin: boolean;
  hasApplications?: boolean;
};

type PublicRound = Omit<RawPublicRoundData, 'ships'> & {
  ships: (RawPublicRoundData['ships'][number] & {
    name?: string;
    imgUrl: string;
  })[];
};

type GlobalContextType = {
  userData?: UserData;
  isLoadingUser: boolean;
  userError: Error | null;
  applicationRound?: AppRound;
  isLoadingAppRound: boolean;
  refetchAppRound: () => void;
  appRoundError: Error | null;
  currentStage?: number;
  judgeAmount: number;
  publicRound?: PublicRound;
  isLoadingPublicRound?: boolean;
  publicRoundError?: Error | null;
  refetchPublicRound?: () => void;
};

export const GlobalContext = createContext<GlobalContextType>({
  userData: {
    isJudge: false,
    isAdmin: false,
    hasApplications: false,
  },
  isLoadingUser: false,
  userError: null,
  applicationRound: undefined,
  isLoadingAppRound: false,
  refetchAppRound: () => {},
  appRoundError: null,
  currentStage: 0,
  //
  judgeAmount: 6,
});

const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();

  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['user-state', address],
    queryFn: () => userQuery(address as Address),
    enabled: !!address,
  });

  const {
    data: applicationRound,
    isLoading: isLoadingAppRound,
    error: appRoundError,
    refetch: refetchAppRound,
  } = useQuery({
    queryKey: ['round-application'],
    queryFn: () => getRubricRound(),
  });

  const {
    data: rawPublicRoundData,
    isLoading: isLoadingPublicRound,
    error: publicRoundError,
    refetch: refetchPublicRound,
  } = useQuery({
    queryKey: ['round-public'],
    queryFn: () => getPublicRound(),
  });

  const publicRound = useMemo(() => {
    if (
      rawPublicRoundData &&
      applicationRound &&
      !isLoadingAppRound &&
      !isLoadingPublicRound
    ) {
      const rawPublicRound = {
        ...rawPublicRoundData,

        ships: rawPublicRoundData.ships.map((ship) => {
          const shipApplication = applicationRound.applications.find(
            (app) => app.application.rootId === ship.choiceId
          )?.application;

          if (!shipApplication) {
            console.error(
              `Ship application not found for choiceId: ${ship.choiceId}`
            );
          }

          return {
            ...ship,
            name: shipApplication?.name,
            imgUrl: shipApplication?.imgUrl,
          };
        }),
      };
      const choiceIds = rawPublicRound.ships.map((ship) => ship.choiceId);

      console.log('choiceIds', choiceIds);
      return rawPublicRound as PublicRound;
    }
  }, [rawPublicRoundData, applicationRound]);

  const currentStage = applicationRound?.round?.contestStatus
    ? Number(applicationRound?.round?.contestStatus) ===
      ContestStatus.Populating
      ? 1
      : Number(applicationRound?.round?.contestStatus) === ContestStatus.Voting
        ? 2
        : Number(applicationRound?.round?.contestStatus) ===
            ContestStatus.Continuous
          ? 0
          : Number(applicationRound?.round?.contestStatus) ===
                ContestStatus.Finalized && !!publicRound
            ? 4
            : Number(applicationRound?.round?.contestStatus) ===
                ContestStatus.Finalized
              ? 3
              : 0
    : 0;

  const NUM_JUDGES = 5;

  return (
    <GlobalContext.Provider
      value={{
        userData,
        isLoadingUser,
        userError,
        currentStage,
        refetchAppRound,
        applicationRound,
        isLoadingAppRound,
        appRoundError,
        judgeAmount: NUM_JUDGES,
        publicRound,
        isLoadingPublicRound,
        publicRoundError,
        refetchPublicRound,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
