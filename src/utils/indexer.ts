import { getSdk } from '../generated/graphql';
import { GraphQLClient } from 'graphql-request';

export const sdk = getSdk(
  new GraphQLClient('https://indexer.hyperindex.xyz/e188121/v1/graphql')
);

type PollEnvioParams = {
  txHash: string;
  interval?: number;
  tries?: number;
  onPollSuccess?: (txHash: string) => void;
  onPollError?: (error: Error) => void;
  onPollTimeout?: () => void;
};

export const fetchRecentTransaction = async (txHash: string) => {
  const res = await sdk.getRecentTransaction({ txHash });

  return res?.TX_by_pk?.id;
};

export const pollEnvio = async ({
  txHash,
  interval = 2000,
  tries = 20,
  onPollSuccess,
  onPollError,
  onPollTimeout,
}: PollEnvioParams) => {
  let triesCount = 0;
  console.log('************* Polling Envio *************');
  const checkRecentTransaction = async () => {
    try {
      const txHashFromEnvio = await fetchRecentTransaction(txHash);
      console.log('Given transaction hash (from client): ', txHash);
      console.log(
        'Queried transaction hash (undefined means not yet indexed): ',
        txHashFromEnvio
      );
      console.log('Polling attempt:', triesCount + 1);

      if (txHashFromEnvio && txHashFromEnvio === txHash) {
        console.log('Poll Success!');
        console.log('Transaction has been indexed by the Envio indexer');
        onPollSuccess?.(txHashFromEnvio);
        clearInterval(intervalId);
      } else {
        console.log('Polling again in', interval, 'ms');
        triesCount++;
        if (triesCount >= tries) {
          console.log('Poll Timeout!');
          onPollTimeout?.();
          clearInterval(intervalId);
        }
      }
    } catch (error: any) {
      console.log('Poll Error!');
      console.error(error);
      onPollError?.(error);
      clearInterval(intervalId);
    }
  };
  const intervalId = setInterval(checkRecentTransaction, interval);

  return triesCount;
};
