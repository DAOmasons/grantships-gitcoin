import { Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  ErrorState,
  LoadingState,
  SuccessState,
  TimeoutState,
} from '../components/ModalStates';
import { Config, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import {
  WaitForTransactionReceiptErrorType,
  WriteContractErrorType,
} from 'viem';
import { WriteContractMutate } from 'wagmi/query';
import { pollEnvio } from '../utils/indexer';

type WriteContractParams = Parameters<
  ReturnType<typeof useWriteContract>['writeContract']
>[0];
type WriteContractOptions = Parameters<
  ReturnType<typeof useWriteContract>['writeContract']
>[1] & {
  onPollSuccess?: () => void;
  onPollError?: () => void;
  onPollTimeout?: () => void;
};

enum PollStatus {
  Idle,
  Polling,
  Error,
  Success,
  Timeout,
}

type ViewParams = {
  awaitEnvioPoll?: boolean;
  loading?: {
    title?: string;
    description?: string;
  };
  polling?: {
    title?: string;
    description?: string;
  };
  success?: {
    title?: string;
    description?: string;
    shouldCloseAfterButton?: boolean;
  };
  error?: {
    title?: string;
    fallback?: string;
  };
  successButton?: {
    label: string;
    onClick: () => void;
  };
};

type TxContextType = {
  tx: (params: {
    writeContractParams: WriteContractParams;
    writeContractOptions?: WriteContractOptions;
    viewParams?: ViewParams;
    onComplete?: () => void;
    onError?: (error: WriteContractErrorType) => void;
  }) => void;
  writeContract: WriteContractMutate<Config, unknown>;
  isAwaitingSignature: boolean;
  isConfirming: boolean;
  isLoading: boolean;
  isConfirmed: boolean;
  isError: boolean;
  txHash?: string;
  isIdle: boolean;
  txError: WaitForTransactionReceiptErrorType | null;
  error: WriteContractErrorType | null;
  txData: ReturnType<typeof useWaitForTransactionReceipt>['data'];
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const TxContext = createContext<TxContextType | undefined>(undefined);

export const TxProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isPending: isAwaitingSignature,
    data: hash,
    writeContract,
    isError,
    reset,
    error,
    isIdle,
  } = useWriteContract();

  const {
    isSuccess: isConfirmed,
    isLoading: isConfirming,
    error: txError,
    isError: waitError,
    data: txData,
  } = useWaitForTransactionReceipt({
    hash: hash,
  });
  const [opened, { open, close }] = useDisclosure();
  const [viewParams, setViewParams] = useState<ViewParams | undefined>(
    undefined
  );
  const [pollStatus, setPollStatus] = useState(PollStatus.Idle);

  const clearTx = useCallback(() => {
    reset();
    setViewParams(undefined);
  }, [reset, setViewParams]);

  const handleClose = useCallback(() => {
    clearTx();
    close();
    setPollStatus(PollStatus.Idle);
  }, [clearTx, close]);

  const tx = ({
    viewParams,
    writeContractParams,
    writeContractOptions,
    onComplete,
    onError,
  }: {
    writeContractParams: WriteContractParams;
    writeContractOptions?: WriteContractOptions;
    viewParams?: ViewParams;
    onError?: (error: WriteContractErrorType) => void;
    onComplete?: () => void;
  }) => {
    open();
    writeContract(writeContractParams, {
      ...writeContractOptions,
      onSuccess: (data, variables, context) => {
        writeContractOptions?.onSuccess?.(data, variables, context);
        if (viewParams?.awaitEnvioPoll !== false && data) {
          setPollStatus(PollStatus.Polling);
          pollEnvio({
            txHash: data,
            onPollSuccess: () => {
              writeContractOptions?.onPollSuccess?.();
              setPollStatus(PollStatus.Success);
              onComplete?.();
            },
            onPollError: () => {
              writeContractOptions?.onPollError?.();
              setPollStatus(PollStatus.Error);
            },
            onPollTimeout: () => {
              writeContractOptions?.onPollTimeout?.();
              setPollStatus(PollStatus.Timeout);
            },
          });
        } else {
          onComplete?.();
        }
      },
      onError: (error, variables, context) => {
        console.error('error', error);
        onError?.(error as WriteContractErrorType);
        writeContractOptions?.onError?.(error, variables, context);
      },
    });
    setViewParams(viewParams);
  };

  const shouldWaitForPoll =
    viewParams?.awaitEnvioPoll !== false && pollStatus === PollStatus.Polling;

  const isLoading = isConfirming || isAwaitingSignature || shouldWaitForPoll;

  const txModalContent = useMemo(() => {
    if (isLoading) {
      const validateTitle =
        viewParams?.loading?.title || 'Validating Transaction';
      const validateDescription =
        viewParams?.loading?.description || 'Please wait...';
      const pollTitle = viewParams?.polling?.title || 'Polling Indexer';
      const pollDescription =
        viewParams?.polling?.description ||
        'Transaction successful! Indexing data to the indexer...';
      const title = shouldWaitForPoll ? pollTitle : validateTitle;
      const description = shouldWaitForPoll
        ? pollDescription
        : validateDescription;
      return <LoadingState title={title} description={description} />;
    }
    if (isError || waitError)
      return (
        <ErrorState
          title={viewParams?.error?.title || 'Whoops!'}
          description={'Something went wrong.'}
          //   errMsg={
          //     error?.message ||
          //     viewParams?.error?.fallback ||
          //     'Error message unknown.'
          //   }
        />
      );
    if (pollStatus === PollStatus.Timeout) {
      return (
        <TimeoutState
          title="Polling Timeout"
          description="Transaction succeeded, but the indexer will need some time to catch up"
        />
      );
    }
    if (isConfirmed)
      return (
        <SuccessState
          title="Transaction Successful"
          description="Your transaction is complete! Close window to continue."
          successButton={{ label: 'Close', onClick: handleClose }}
        />
      );
  }, [
    isConfirmed,
    waitError,
    isError,
    isLoading,
    // hash,
    viewParams,
    error,
    shouldWaitForPoll,
    pollStatus,
  ]);

  return (
    <TxContext.Provider
      value={{
        tx,
        isConfirmed,
        isConfirming,
        txHash: hash,
        writeContract,
        isLoading,
        isError,
        isIdle,
        txError,
        txData,
        error: error as WriteContractErrorType | null,
        isAwaitingSignature,
        isModalOpen: opened,
        openModal: open,
        closeModal: handleClose,
      }}
    >
      {children}
      <Modal.Root opened={opened} onClose={close} centered w={300}>
        <Modal.Overlay />
        <Modal.Content miw={300} maw={392} p="sm" pb="lg">
          <Group w="100%">
            <Modal.CloseButton />
          </Group>
          {txModalContent}
        </Modal.Content>
      </Modal.Root>
    </TxContext.Provider>
  );
};
