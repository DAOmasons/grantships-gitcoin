import React from 'react';
import { TxContext } from '../contexts/TxContext';

export const useTx = () => {
  const context = React.useContext(TxContext);

  if (context === undefined) {
    throw new Error('useTx must be used within a TxProvider');
  }

  return context;
};
