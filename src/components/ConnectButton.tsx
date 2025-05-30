import { useAccount } from 'wagmi';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, ButtonProps, useMantineTheme } from '@mantine/core';
import { useEns } from '../hooks/useEns';

export const ConnectButton = (props: ButtonProps) => {
  const { address, isConnected } = useAccount();
  const theme = useMantineTheme();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { name } = useEns({ address });

  if (isConnected && address) {
    return (
      <Button
        onClick={openAccountModal}
        size="sm"
        variant="secondary"
        {...props}
      >
        {name}
      </Button>
    );
  }
  return (
    <Button
      onClick={() => {
        console.log('openConnectModal', openConnectModal);
        openConnectModal?.();
      }}
      size="sm"
      {...props}
    >
      Connect Wallet
    </Button>
  );
};
