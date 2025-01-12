import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';
import { useAccount, useChainId } from 'wagmi';

type UserData = {
  isJudge: boolean;
  isAdmin: boolean;
};

type GlobalContextType = {
  userData: UserData;
  isLoadingUser: boolean;
  userError: Error | null;
};

export const GlobalContext = createContext<GlobalContextType>({
  userData: {
    isJudge: false,
    isAdmin: false,
  },
  isLoadingUser: false,
  userError: null,
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { address } = useAccount();

  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ['user-state', address],
    queryFn: async () => {},
    enabled: !!address,
  });

  return (
    <GlobalContext.Provider value={{ userData: {}, isLoadingUser, userError }}>
      {children}
    </GlobalContext.Provider>
  );
};
