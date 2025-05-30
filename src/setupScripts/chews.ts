import {
  createWalletClient,
  custom,
  encodeAbiParameters,
  Hex,
  parseAbiParameters,
} from 'viem';
import { HATS, ZER0_ADDRESS } from '../constants/setup';
import { ADDR } from '../constants/addresses';
import { arbitrum, arbitrumSepolia } from 'viem/chains';
import { publicClient } from '../utils/config';
import { ContestStatus, TimerType } from '../constants/enum';
import ChewsFactoryABI from '../abi/ChewsFactory.json';
import HalChoicesABI from '../abi/HALChoices.json';
import { RUBRIC_COPY } from '../constants/rubric';
import { dummyApplications } from '../constants/dummyApplications';
import { generateRandomBytes32 } from '../utils/common';

const MODULE_TAG = {
  RUBRIC_VOTES: 'RubricVotes_v0.1.0',
  HAL: 'HatsAllowList_v0.1.1',
  EMPTY_EXECUTION: 'EmptyExecution_v0.2.0',
  EMPTY_POINTS: 'EmptyPoints_v0.1.0',
  PRE_POP: 'PrePop_v0.2.0',
  MERKLE_POINTS: 'MerklePoints_v0.2.0',
  TIMED_VOTES: 'TimedVotes_v1.0.0',
} as const;

export const CONTEST_V = '0.2.1';

const encodeRubricVotesArgs = () => {
  // (uint256 _adminHatId, uint256 _judgeHatId, uint256 _maxVotesForChoice, address _hats) =
  const args = encodeAbiParameters(
    parseAbiParameters('uint256, uint256, uint256, address'),
    [HATS.ADMIN, HATS.JUDGE, BigInt(1e18), ADDR.HATS]
  );

  return args;
};
const encodeHalArgs = () => {
  // (address _hats, uint256 _hatId, bytes[] memory _prepopulatedChoices)
  const args = encodeAbiParameters(
    parseAbiParameters('address, uint256, bytes[]'),
    [ADDR.HATS, HATS.ADMIN, []]
  );

  return args;
};
const emptyExecuteArgs = (): Hex => '0x0';
const emptyPointsArgs = (): Hex => '0x0';

export const deployRubricVoting = async () => {
  const votesArgs = encodeRubricVotesArgs();
  const choicesArgs = encodeHalArgs();
  const pointsArgs = emptyPointsArgs();
  const executeArgs = emptyExecuteArgs();

  const initData = encodeAbiParameters(
    parseAbiParameters('string[4],bytes[4]'),
    [
      [
        MODULE_TAG.RUBRIC_VOTES,
        MODULE_TAG.EMPTY_POINTS,
        MODULE_TAG.HAL,
        MODULE_TAG.EMPTY_EXECUTION,
      ],
      [votesArgs, pointsArgs, choicesArgs, executeArgs],
    ]
  );

  const content = JSON.stringify(RUBRIC_COPY);
  const protocol = 6969420n;
  const TAG_PREFIX = 'GG_APPLICATION_JUDGE_VOTE';
  const nonce = 1;

  const filterTag = `${TAG_PREFIX}_${nonce}`;

  const client = createWalletClient({
    chain: arbitrum,
    transport: custom(window.ethereum),
  });

  const [address] = await client.getAddresses();

  const { request } = await publicClient.simulateContract({
    account: address,
    address: ADDR.CHEWS,
    abi: ChewsFactoryABI,
    functionName: 'buildContest',
    args: [
      [protocol, content],
      initData,
      CONTEST_V,
      ContestStatus.Populating,
      false,
      filterTag,
    ],
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
  console.log('filterTag', filterTag);
};

export const createApplication = async (applicantNumber: number) => {
  const CHOICES_ADDR = '0xF14B4Ae687424604A42e39ffB10E79FD5Bd3a928';

  const application = dummyApplications[applicantNumber];

  if (!application) {
    console.error('Application not found');
    return;
  }

  const client = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  });

  const choiceData = encodeAbiParameters(
    parseAbiParameters('bytes, (uint256, string)'),
    [application.address, [6969420n, JSON.stringify(application)]]
  );
  const choiceId = generateRandomBytes32();

  const [address] = await client.getAddresses();

  const { request } = await publicClient.simulateContract({
    account: address,
    address: CHOICES_ADDR,
    abi: HalChoicesABI,
    functionName: 'registerChoice',
    args: [choiceId, choiceData],
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
};

export const finalizeChoices = async () => {
  const CHOICES_ADDR = '0xF14B4Ae687424604A42e39ffB10E79FD5Bd3a928';

  const client = createWalletClient({
    chain: arbitrumSepolia,
    transport: custom(window.ethereum),
  });
  const [address] = await client.getAddresses();

  const { request } = await publicClient.simulateContract({
    account: address,
    address: CHOICES_ADDR,
    abi: HalChoicesABI,
    functionName: 'finalizeChoices',
    args: [],
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
};

const encodeTimedVotingArgs = (): Hex => {
  const TEN_DAYS = 10n * 24n * 60n * 60n;

  const args = encodeAbiParameters(
    parseAbiParameters('uint256, uint256, uint8, uint256, address'),
    [TEN_DAYS, 0n, TimerType.Auto, HATS.ADMIN, ADDR.HATS]
  );

  return args;
};

const encodePrepopChoicesArgs = (choices: any, choiceIds: any): Hex => {
  const args = encodeAbiParameters(
    parseAbiParameters('((uint256,string),bytes,bool,address)[], bytes32[]'),
    [choices, choiceIds]
  );

  return args;
};

export const encodeMerklePointsArgs = (): Hex => {
  const MERKLE_ROOT =
    '0x015d90b40100b4ca0c13fb5473545f3b19a16a19a1dcd042f4f8cb92bdc4ae5c';
  const args = encodeAbiParameters(parseAbiParameters('bytes32'), [
    MERKLE_ROOT,
  ]);

  return args;
};

export const deployPublicVoting = async (topSixShipIds: string[]) => {
  const choices = topSixShipIds.map((shipId) => [
    [6665n, shipId],
    shipId,
    true,
    ZER0_ADDRESS,
  ]);

  const votesArgs = encodeTimedVotingArgs();
  const choicesArgs = encodePrepopChoicesArgs(choices, topSixShipIds);
  const pointsArgs = encodeMerklePointsArgs();
  const executeArgs = emptyExecuteArgs();

  const MODULE_TAGS = [
    MODULE_TAG.TIMED_VOTES,
    MODULE_TAG.MERKLE_POINTS,
    MODULE_TAG.PRE_POP,
    MODULE_TAG.EMPTY_EXECUTION,
  ] as const;

  console.log('MODULE_TAGS', MODULE_TAGS);
  console.log('CONTEST_V', CONTEST_V);

  const initData = encodeAbiParameters(
    parseAbiParameters('string[4],bytes[4]'),
    [MODULE_TAGS, [votesArgs, pointsArgs, choicesArgs, executeArgs]]
  );

  const content = '';
  const protocol = 0n;
  const TAG_PREFIX = 'GG_APPLICATION_PUBLIC_VOTE';
  const nonce = 10;

  const filterTag = `${TAG_PREFIX}_${nonce}`;

  const client = createWalletClient({
    chain: arbitrum,
    transport: custom(window.ethereum),
  });

  const [address] = await client.getAddresses();

  const args = [
    [protocol, content],
    initData,
    CONTEST_V,
    ContestStatus.Voting,
    false,
    filterTag,
  ];

  console.log('args', args);

  console.log('ADDR.CHEWS', ADDR.CHEWS);

  const { request } = await publicClient.simulateContract({
    account: address,
    address: ADDR.CHEWS,
    abi: ChewsFactoryABI,
    functionName: 'buildContest',
    args,
  });

  const hash = await client.writeContract(request);

  console.log('hash', hash);
  console.log('filterTag', filterTag);
};
