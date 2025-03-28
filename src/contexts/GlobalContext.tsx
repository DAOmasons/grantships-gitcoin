import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { userQuery } from '../queries/userQuery';
import { Address } from 'viem';
import { AppRound, getRounds } from '../queries/getRounds';
import { ContestStatus } from '../constants/enum';

type UserData = {
  isJudge: boolean;
  isAdmin: boolean;
  hasApplications?: boolean;
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
    queryFn: () => getRounds(),
  });

  console.log('applicationRound', applicationRound);

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
              ContestStatus.Finalized
            ? 3
            : Number(applicationRound?.round?.contestStatus) ===
                ContestStatus.Executed
              ? 4
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
