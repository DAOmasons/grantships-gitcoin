import { createWalletClient, custom } from 'viem';
import { publicClient } from '../utils/config';
import { ADDR } from '../constants/addresses';
import HatsABI from '../abi/Hats.json';
import { arbitrumSepolia } from 'viem/chains';
import { DUMMY_ADDRESS, HATS } from '../constants/setup';

export const createTopHat = async () => {
  const client = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  });

  const [address] = await client.getAddresses();

  const { request } = await publicClient.simulateContract({
    account: address,
    abi: HatsABI,
    address: ADDR.HATS,
    functionName: 'mintTopHat',
    args: [
      '0xDE6bcde54CF040088607199FC541f013bA53C21E',
      'Gitcoin <> GrantShips Test Top Hat',
      'GG-GS',
    ],
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
};

export const createAdminHat = async () => {
  const client = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  });

  const [address] = await client.getAddresses();

  const { request } = await publicClient.simulateContract({
    account: address,
    abi: HatsABI,
    address: ADDR.HATS,
    functionName: 'createHat',
    args: [
      HATS.TOP,
      'Admin is responsible for the overall management of the Gitcoin <> GrantShips system',
      100n,
      DUMMY_ADDRESS,
      DUMMY_ADDRESS,
      true,
      '',
    ],
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
};

export const mintAdminHat = async () => {
  const client = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  });

  const [address] = await client.getAddresses();

  const { request } = await publicClient.simulateContract({
    account: address,
    abi: HatsABI,
    address: ADDR.HATS,
    functionName: 'mintHat',
    args: [HATS.ADMIN, '0x57abda4ee50Bb3079A556C878b2c345310057569'],
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
};

export const createJudgeHat = async () => {
  const client = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  });

  const [address] = await client.getAddresses();

  const { request } = await publicClient.simulateContract({
    account: address,
    abi: HatsABI,
    address: ADDR.HATS,
    functionName: 'createHat',
    args: [
      HATS.ADMIN,
      'Judges are responsible for the grading applications and reviewing GG Community Rounds',
      100n,
      DUMMY_ADDRESS,
      DUMMY_ADDRESS,
      true,
      '',
    ],
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
};

export const mintJudgeHat = async () => {
  const client = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  });

  const [address] = await client.getAddresses();

  const { request } = await publicClient.simulateContract({
    account: address,
    abi: HatsABI,
    address: ADDR.HATS,
    functionName: 'batchMintHats',
    // args: [[HATS.JUDGE], ['']],
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
};
