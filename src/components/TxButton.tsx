import {
  Button,
  ButtonProps,
  ElementProps,
  createPolymorphicComponent,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { appNetwork } from '../utils/config';
import React, { forwardRef, useRef } from 'react';
import { useAccount, useConnect, useSwitchChain } from 'wagmi';

import { injected } from 'wagmi/connectors';
import { useTx } from '../contexts/useTx';
import { set } from 'zod';

interface Base extends ElementProps<'button'> {}

type CustomButtonProps = Base & ButtonProps;

export const TxButton = createPolymorphicComponent<'button', CustomButtonProps>(
  forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ onClick, ...props }, ref) => {
      const { isConnected, chainId } = useAccount();
      const { switchChainAsync } = useSwitchChain();
      const { connectAsync } = useConnect();
      const { isLoading } = useTx();

      const clicked = useRef<boolean>(false);

      if (props.type === 'submit') {
        throw new Error(
          'TxButton should not be used with type="submit", include the switch network and connect wallet logic in the onSubmit function instead.'
        );
      }
      const isCorrectChain = chainId === appNetwork.id;

      const handleClick = async (
        event: React.MouseEvent<HTMLButtonElement>
      ) => {
        // if (clicked) return;

        // clicked.current = true;

        if (!isConnected) {
          if (window?.ethereum?.isMetaMask === true) {
            await connectAsync({ connector: injected() });
          } else {
            notifications.show({
              title: 'Error',
              message: 'Please connect your wallet',
              color: 'red',
            });
            return;
          }
        }

        if (!isCorrectChain) {
          await switchChainAsync({ chainId: appNetwork.id });
        }

        onClick?.(event);

        // setIsClicked(false);
      };

      return (
        <Button
          {...props}
          ref={ref}
          onClick={handleClick}
          loading={isLoading || props.loading}
          disabled={isLoading || props.disabled}
        >
          {!isConnected
            ? 'Connect Wallet'
            : !isCorrectChain
              ? 'Switch Network'
              : props.children || 'Submit'}
        </Button>
      );
    }
  )
);
