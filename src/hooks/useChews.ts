import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

export const useChews = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useChews must be used within a GlobalContextProvider');
  }

  return {
    applicationRound: context.applicationRound,
    isLoadingAppRound: context.isLoadingAppRound,
    appRoundError: context.appRoundError,
    refetchAppRound: context.refetchAppRound,
  };
};
