import { useAccount } from 'wagmi';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, useMantineTheme } from '@mantine/core';
import { useEns } from '../hooks/useEns';

export const ConnectButton = () => {
  const { address, isConnected } = useAccount();
  const theme = useMantineTheme();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { name } = useEns({ address });

  if (isConnected && address) {
    return (
      <Button onClick={openAccountModal} size="sm" variant="secondary">
        {name}
      </Button>
    );
  }
  return (
    <Button
      onClick={() => {
        openConnectModal?.();
      }}
      size="sm"
    >
      Connect Wallet
    </Button>
  );
};
