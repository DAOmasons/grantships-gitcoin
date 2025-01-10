import React from 'react';
import { Address } from 'viem';
import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';
import { ensConfig } from '../utils/config';
import { truncateAddr } from '../utils/common';

export const useEns = ({
  avatar = false,
  name = true,
  address,
}: {
  avatar?: boolean;
  name?: boolean;
  address?: Address;
}) => {
  const { data: ensName } = useEnsName({
    address,
    config: ensConfig,
    chainId: mainnet.id,
  });

  return { name: ensName || truncateAddr(address || '') };
};
