import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

export const useUserData = () => {
  const context = useContext(GlobalContext);

  if (context === undefined) {
    throw new Error('useUserData must be used within a GlobalContextProvider');
  }

  return {
    userData: context.userData,
    isLoadingUser: context.isLoadingUser,
    userError: context.userError,
  };
};
