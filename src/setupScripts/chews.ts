import {
  createWalletClient,
  custom,
  encodeAbiParameters,
  Hex,
  parseAbiParameters,
} from 'viem';
import { HATS } from '../constants/setup';
import { ADDR } from '../constants/addresses';
import { arbitrumSepolia } from 'viem/chains';
import { publicClient } from '../utils/config';
import { ContestStatus } from '../constants/enum';
import ChewsFactoryABI from '../abi/ChewsFactory.json';
import { RUBRIC_COPY } from '../constants/rubric';

const MODULE_TAG = {
  RUBRIC_VOTES: 'RubricVotes_v0.1.0',
  HAL: 'HatsAllowList_v0.1.1',
  EMPTY_EXECUTION: 'EmptyExecution_v0.2.0',
  EMPTY_POINTS: 'EmptyPoints_v0.1.0',
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
  const TAG_PREFIX = 'TEST_GG_APPLICATION_REVIEW';
  const nonce = 0;

  const filterTag = `${TAG_PREFIX}_${nonce}`;

  const client = createWalletClient({
    chain: arbitrumSepolia,
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
