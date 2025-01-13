import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { userQuery } from '../queries/userQuery';
import { Address } from 'viem';
import { getRounds } from '../queries/getRounds';

type UserData = {
  isJudge: boolean;
  isAdmin: boolean;
};

type GlobalContextType = {
  userData?: UserData;
  isLoadingUser: boolean;
  userError: Error | null;
  applicationRound?: any;
  isLoadingAppRound: boolean;
  appRoundError: Error | null;
  judgeAmount: number;
};

export const GlobalContext = createContext<GlobalContextType>({
  userData: {
    isJudge: false,
    isAdmin: false,
  },
  isLoadingUser: false,
  userError: null,
  applicationRound: null,
  isLoadingAppRound: false,
  appRoundError: null,
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
  } = useQuery({
    queryKey: ['round-application'],
    queryFn: () => getRounds(),
  });

  const NUM_JUDGES = 6;

  return (
    <GlobalContext.Provider
      value={{
        userData,
        isLoadingUser,
        userError,
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
