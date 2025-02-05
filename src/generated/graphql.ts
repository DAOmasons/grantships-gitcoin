import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  contract_type: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

/** columns and relationships of "AppDraft" */
export type AppDraft = {
  __typename?: 'AppDraft';
  chainId: Scalars['Int']['output'];
  contentProtocol: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  ipfsHash: Scalars['String']['output'];
  json: Scalars['String']['output'];
  lastUpdated: Scalars['Int']['output'];
  tag: Scalars['String']['output'];
  userAddress: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "AppDraft". All fields are combined with a logical 'AND'. */
export type AppDraft_Bool_Exp = {
  _and?: InputMaybe<Array<AppDraft_Bool_Exp>>;
  _not?: InputMaybe<AppDraft_Bool_Exp>;
  _or?: InputMaybe<Array<AppDraft_Bool_Exp>>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  contentProtocol?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  ipfsHash?: InputMaybe<String_Comparison_Exp>;
  json?: InputMaybe<String_Comparison_Exp>;
  lastUpdated?: InputMaybe<Int_Comparison_Exp>;
  tag?: InputMaybe<String_Comparison_Exp>;
  userAddress?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "AppDraft". */
export type AppDraft_Order_By = {
  chainId?: InputMaybe<Order_By>;
  contentProtocol?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ipfsHash?: InputMaybe<Order_By>;
  json?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  tag?: InputMaybe<Order_By>;
  userAddress?: InputMaybe<Order_By>;
};

/** select columns of table "AppDraft" */
export enum AppDraft_Select_Column {
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ContentProtocol = 'contentProtocol',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  IpfsHash = 'ipfsHash',
  /** column name */
  Json = 'json',
  /** column name */
  LastUpdated = 'lastUpdated',
  /** column name */
  Tag = 'tag',
  /** column name */
  UserAddress = 'userAddress'
}

/** Streaming cursor of the table "AppDraft" */
export type AppDraft_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AppDraft_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AppDraft_Stream_Cursor_Value_Input = {
  chainId?: InputMaybe<Scalars['Int']['input']>;
  contentProtocol?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  ipfsHash?: InputMaybe<Scalars['String']['input']>;
  json?: InputMaybe<Scalars['String']['input']>;
  lastUpdated?: InputMaybe<Scalars['Int']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
  userAddress?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "AskHausContest" */
export type AskHausContest = {
  __typename?: 'AskHausContest';
  answerType: Scalars['String']['output'];
  /** An object relationship */
  basicChoices?: Maybe<BasicChoices>;
  basicChoices_id: Scalars['String']['output'];
  /** An object relationship */
  choicesParams?: Maybe<Params_BaalGate_V0_2_0>;
  choicesParams_id: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  link?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  pointsParams?: Maybe<Params_BaalPoints_V0_2_0>;
  pointsParams_id: Scalars['String']['output'];
  postedBy: Scalars['String']['output'];
  requestComment?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  round?: Maybe<Round>;
  round_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  /** An object relationship */
  votesParams?: Maybe<Params_TimedVotes_V0_2_0>;
  votesParams_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "AskHausContest". All fields are combined with a logical 'AND'. */
export type AskHausContest_Bool_Exp = {
  _and?: InputMaybe<Array<AskHausContest_Bool_Exp>>;
  _not?: InputMaybe<AskHausContest_Bool_Exp>;
  _or?: InputMaybe<Array<AskHausContest_Bool_Exp>>;
  answerType?: InputMaybe<String_Comparison_Exp>;
  basicChoices?: InputMaybe<BasicChoices_Bool_Exp>;
  basicChoices_id?: InputMaybe<String_Comparison_Exp>;
  choicesParams?: InputMaybe<Params_BaalGate_V0_2_0_Bool_Exp>;
  choicesParams_id?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Int_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  link?: InputMaybe<String_Comparison_Exp>;
  pointsParams?: InputMaybe<Params_BaalPoints_V0_2_0_Bool_Exp>;
  pointsParams_id?: InputMaybe<String_Comparison_Exp>;
  postedBy?: InputMaybe<String_Comparison_Exp>;
  requestComment?: InputMaybe<Boolean_Comparison_Exp>;
  round?: InputMaybe<Round_Bool_Exp>;
  round_id?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  votesParams?: InputMaybe<Params_TimedVotes_V0_2_0_Bool_Exp>;
  votesParams_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "AskHausContest". */
export type AskHausContest_Order_By = {
  answerType?: InputMaybe<Order_By>;
  basicChoices?: InputMaybe<BasicChoices_Order_By>;
  basicChoices_id?: InputMaybe<Order_By>;
  choicesParams?: InputMaybe<Params_BaalGate_V0_2_0_Order_By>;
  choicesParams_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  pointsParams?: InputMaybe<Params_BaalPoints_V0_2_0_Order_By>;
  pointsParams_id?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  requestComment?: InputMaybe<Order_By>;
  round?: InputMaybe<Round_Order_By>;
  round_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  votesParams?: InputMaybe<Params_TimedVotes_V0_2_0_Order_By>;
  votesParams_id?: InputMaybe<Order_By>;
};

/** select columns of table "AskHausContest" */
export enum AskHausContest_Select_Column {
  /** column name */
  AnswerType = 'answerType',
  /** column name */
  BasicChoicesId = 'basicChoices_id',
  /** column name */
  ChoicesParamsId = 'choicesParams_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Link = 'link',
  /** column name */
  PointsParamsId = 'pointsParams_id',
  /** column name */
  PostedBy = 'postedBy',
  /** column name */
  RequestComment = 'requestComment',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Title = 'title',
  /** column name */
  VotesParamsId = 'votesParams_id'
}

/** Streaming cursor of the table "AskHausContest" */
export type AskHausContest_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AskHausContest_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AskHausContest_Stream_Cursor_Value_Input = {
  answerType?: InputMaybe<Scalars['String']['input']>;
  basicChoices_id?: InputMaybe<Scalars['String']['input']>;
  choicesParams_id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  pointsParams_id?: InputMaybe<Scalars['String']['input']>;
  postedBy?: InputMaybe<Scalars['String']['input']>;
  requestComment?: InputMaybe<Scalars['Boolean']['input']>;
  round_id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  votesParams_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "AskHausPoll" */
export type AskHausPoll = {
  __typename?: 'AskHausPoll';
  answerType: Scalars['String']['output'];
  /** An object relationship */
  choicesParams?: Maybe<Params_PrePop_V0_2_0>;
  choicesParams_id: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  pointsParams?: Maybe<Params_BaalPoints_V0_2_0>;
  pointsParams_id: Scalars['String']['output'];
  pollLink?: Maybe<Scalars['String']['output']>;
  postedBy: Scalars['String']['output'];
  requestComment?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  round?: Maybe<Round>;
  round_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  /** An object relationship */
  votesParams?: Maybe<Params_TimedVotes_V0_2_0>;
  votesParams_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "AskHausPoll". All fields are combined with a logical 'AND'. */
export type AskHausPoll_Bool_Exp = {
  _and?: InputMaybe<Array<AskHausPoll_Bool_Exp>>;
  _not?: InputMaybe<AskHausPoll_Bool_Exp>;
  _or?: InputMaybe<Array<AskHausPoll_Bool_Exp>>;
  answerType?: InputMaybe<String_Comparison_Exp>;
  choicesParams?: InputMaybe<Params_PrePop_V0_2_0_Bool_Exp>;
  choicesParams_id?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Int_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  pointsParams?: InputMaybe<Params_BaalPoints_V0_2_0_Bool_Exp>;
  pointsParams_id?: InputMaybe<String_Comparison_Exp>;
  pollLink?: InputMaybe<String_Comparison_Exp>;
  postedBy?: InputMaybe<String_Comparison_Exp>;
  requestComment?: InputMaybe<Boolean_Comparison_Exp>;
  round?: InputMaybe<Round_Bool_Exp>;
  round_id?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  votesParams?: InputMaybe<Params_TimedVotes_V0_2_0_Bool_Exp>;
  votesParams_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "AskHausPoll". */
export type AskHausPoll_Order_By = {
  answerType?: InputMaybe<Order_By>;
  choicesParams?: InputMaybe<Params_PrePop_V0_2_0_Order_By>;
  choicesParams_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  pointsParams?: InputMaybe<Params_BaalPoints_V0_2_0_Order_By>;
  pointsParams_id?: InputMaybe<Order_By>;
  pollLink?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  requestComment?: InputMaybe<Order_By>;
  round?: InputMaybe<Round_Order_By>;
  round_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  votesParams?: InputMaybe<Params_TimedVotes_V0_2_0_Order_By>;
  votesParams_id?: InputMaybe<Order_By>;
};

/** select columns of table "AskHausPoll" */
export enum AskHausPoll_Select_Column {
  /** column name */
  AnswerType = 'answerType',
  /** column name */
  ChoicesParamsId = 'choicesParams_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  PointsParamsId = 'pointsParams_id',
  /** column name */
  PollLink = 'pollLink',
  /** column name */
  PostedBy = 'postedBy',
  /** column name */
  RequestComment = 'requestComment',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Title = 'title',
  /** column name */
  VotesParamsId = 'votesParams_id'
}

/** Streaming cursor of the table "AskHausPoll" */
export type AskHausPoll_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AskHausPoll_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AskHausPoll_Stream_Cursor_Value_Input = {
  answerType?: InputMaybe<Scalars['String']['input']>;
  choicesParams_id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  pointsParams_id?: InputMaybe<Scalars['String']['input']>;
  pollLink?: InputMaybe<Scalars['String']['input']>;
  postedBy?: InputMaybe<Scalars['String']['input']>;
  requestComment?: InputMaybe<Scalars['Boolean']['input']>;
  round_id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  votesParams_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "BasicChoice" */
export type BasicChoice = {
  __typename?: 'BasicChoice';
  amountVoted: Scalars['numeric']['output'];
  /** An object relationship */
  basicChoices?: Maybe<BasicChoices>;
  basicChoices_id: Scalars['String']['output'];
  bytes: Scalars['String']['output'];
  choiceId: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isValid: Scalars['Boolean']['output'];
  link?: Maybe<Scalars['String']['output']>;
  postedAt: Scalars['Int']['output'];
  postedBy: Scalars['String']['output'];
  registrar: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** order by aggregate values of table "BasicChoice" */
export type BasicChoice_Aggregate_Order_By = {
  avg?: InputMaybe<BasicChoice_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BasicChoice_Max_Order_By>;
  min?: InputMaybe<BasicChoice_Min_Order_By>;
  stddev?: InputMaybe<BasicChoice_Stddev_Order_By>;
  stddev_pop?: InputMaybe<BasicChoice_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<BasicChoice_Stddev_Samp_Order_By>;
  sum?: InputMaybe<BasicChoice_Sum_Order_By>;
  var_pop?: InputMaybe<BasicChoice_Var_Pop_Order_By>;
  var_samp?: InputMaybe<BasicChoice_Var_Samp_Order_By>;
  variance?: InputMaybe<BasicChoice_Variance_Order_By>;
};

/** order by avg() on columns of table "BasicChoice" */
export type BasicChoice_Avg_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "BasicChoice". All fields are combined with a logical 'AND'. */
export type BasicChoice_Bool_Exp = {
  _and?: InputMaybe<Array<BasicChoice_Bool_Exp>>;
  _not?: InputMaybe<BasicChoice_Bool_Exp>;
  _or?: InputMaybe<Array<BasicChoice_Bool_Exp>>;
  amountVoted?: InputMaybe<Numeric_Comparison_Exp>;
  basicChoices?: InputMaybe<BasicChoices_Bool_Exp>;
  basicChoices_id?: InputMaybe<String_Comparison_Exp>;
  bytes?: InputMaybe<String_Comparison_Exp>;
  choiceId?: InputMaybe<String_Comparison_Exp>;
  color?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  isActive?: InputMaybe<Boolean_Comparison_Exp>;
  isValid?: InputMaybe<Boolean_Comparison_Exp>;
  link?: InputMaybe<String_Comparison_Exp>;
  postedAt?: InputMaybe<Int_Comparison_Exp>;
  postedBy?: InputMaybe<String_Comparison_Exp>;
  registrar?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "BasicChoice" */
export type BasicChoice_Max_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  basicChoices_id?: InputMaybe<Order_By>;
  bytes?: InputMaybe<Order_By>;
  choiceId?: InputMaybe<Order_By>;
  color?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  registrar?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "BasicChoice" */
export type BasicChoice_Min_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  basicChoices_id?: InputMaybe<Order_By>;
  bytes?: InputMaybe<Order_By>;
  choiceId?: InputMaybe<Order_By>;
  color?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  registrar?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "BasicChoice". */
export type BasicChoice_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  basicChoices?: InputMaybe<BasicChoices_Order_By>;
  basicChoices_id?: InputMaybe<Order_By>;
  bytes?: InputMaybe<Order_By>;
  choiceId?: InputMaybe<Order_By>;
  color?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isActive?: InputMaybe<Order_By>;
  isValid?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  registrar?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** select columns of table "BasicChoice" */
export enum BasicChoice_Select_Column {
  /** column name */
  AmountVoted = 'amountVoted',
  /** column name */
  BasicChoicesId = 'basicChoices_id',
  /** column name */
  Bytes = 'bytes',
  /** column name */
  ChoiceId = 'choiceId',
  /** column name */
  Color = 'color',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'isActive',
  /** column name */
  IsValid = 'isValid',
  /** column name */
  Link = 'link',
  /** column name */
  PostedAt = 'postedAt',
  /** column name */
  PostedBy = 'postedBy',
  /** column name */
  Registrar = 'registrar',
  /** column name */
  Title = 'title'
}

/** order by stddev() on columns of table "BasicChoice" */
export type BasicChoice_Stddev_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "BasicChoice" */
export type BasicChoice_Stddev_Pop_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "BasicChoice" */
export type BasicChoice_Stddev_Samp_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "BasicChoice" */
export type BasicChoice_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BasicChoice_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BasicChoice_Stream_Cursor_Value_Input = {
  amountVoted?: InputMaybe<Scalars['numeric']['input']>;
  basicChoices_id?: InputMaybe<Scalars['String']['input']>;
  bytes?: InputMaybe<Scalars['String']['input']>;
  choiceId?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isValid?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  postedAt?: InputMaybe<Scalars['Int']['input']>;
  postedBy?: InputMaybe<Scalars['String']['input']>;
  registrar?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "BasicChoice" */
export type BasicChoice_Sum_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "BasicChoice" */
export type BasicChoice_Var_Pop_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "BasicChoice" */
export type BasicChoice_Var_Samp_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "BasicChoice" */
export type BasicChoice_Variance_Order_By = {
  amountVoted?: InputMaybe<Order_By>;
  postedAt?: InputMaybe<Order_By>;
};

/** columns and relationships of "BasicChoices" */
export type BasicChoices = {
  __typename?: 'BasicChoices';
  /** An array relationship */
  choices: Array<BasicChoice>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
};


/** columns and relationships of "BasicChoices" */
export type BasicChoicesChoicesArgs = {
  distinct_on?: InputMaybe<Array<BasicChoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicChoice_Order_By>>;
  where?: InputMaybe<BasicChoice_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "BasicChoices". All fields are combined with a logical 'AND'. */
export type BasicChoices_Bool_Exp = {
  _and?: InputMaybe<Array<BasicChoices_Bool_Exp>>;
  _not?: InputMaybe<BasicChoices_Bool_Exp>;
  _or?: InputMaybe<Array<BasicChoices_Bool_Exp>>;
  choices?: InputMaybe<BasicChoice_Bool_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "BasicChoices". */
export type BasicChoices_Order_By = {
  choices_aggregate?: InputMaybe<BasicChoice_Aggregate_Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "BasicChoices" */
export enum BasicChoices_Select_Column {
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "BasicChoices" */
export type BasicChoices_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BasicChoices_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BasicChoices_Stream_Cursor_Value_Input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "BasicVote" */
export type BasicVote = {
  __typename?: 'BasicVote';
  amount: Scalars['numeric']['output'];
  /** An object relationship */
  batch?: Maybe<BatchVote>;
  batch_id: Scalars['String']['output'];
  /** An object relationship */
  choice?: Maybe<BasicChoice>;
  choice_id: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  round?: Maybe<Round>;
  round_id: Scalars['String']['output'];
  voter: Scalars['String']['output'];
};

/** order by aggregate values of table "BasicVote" */
export type BasicVote_Aggregate_Order_By = {
  avg?: InputMaybe<BasicVote_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BasicVote_Max_Order_By>;
  min?: InputMaybe<BasicVote_Min_Order_By>;
  stddev?: InputMaybe<BasicVote_Stddev_Order_By>;
  stddev_pop?: InputMaybe<BasicVote_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<BasicVote_Stddev_Samp_Order_By>;
  sum?: InputMaybe<BasicVote_Sum_Order_By>;
  var_pop?: InputMaybe<BasicVote_Var_Pop_Order_By>;
  var_samp?: InputMaybe<BasicVote_Var_Samp_Order_By>;
  variance?: InputMaybe<BasicVote_Variance_Order_By>;
};

/** order by avg() on columns of table "BasicVote" */
export type BasicVote_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "BasicVote". All fields are combined with a logical 'AND'. */
export type BasicVote_Bool_Exp = {
  _and?: InputMaybe<Array<BasicVote_Bool_Exp>>;
  _not?: InputMaybe<BasicVote_Bool_Exp>;
  _or?: InputMaybe<Array<BasicVote_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  batch?: InputMaybe<BatchVote_Bool_Exp>;
  batch_id?: InputMaybe<String_Comparison_Exp>;
  choice?: InputMaybe<BasicChoice_Bool_Exp>;
  choice_id?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  round?: InputMaybe<Round_Bool_Exp>;
  round_id?: InputMaybe<String_Comparison_Exp>;
  voter?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "BasicVote" */
export type BasicVote_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  batch_id?: InputMaybe<Order_By>;
  choice_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
  voter?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "BasicVote" */
export type BasicVote_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  batch_id?: InputMaybe<Order_By>;
  choice_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
  voter?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "BasicVote". */
export type BasicVote_Order_By = {
  amount?: InputMaybe<Order_By>;
  batch?: InputMaybe<BatchVote_Order_By>;
  batch_id?: InputMaybe<Order_By>;
  choice?: InputMaybe<BasicChoice_Order_By>;
  choice_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  round?: InputMaybe<Round_Order_By>;
  round_id?: InputMaybe<Order_By>;
  voter?: InputMaybe<Order_By>;
};

/** select columns of table "BasicVote" */
export enum BasicVote_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BatchId = 'batch_id',
  /** column name */
  ChoiceId = 'choice_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Voter = 'voter'
}

/** order by stddev() on columns of table "BasicVote" */
export type BasicVote_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "BasicVote" */
export type BasicVote_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "BasicVote" */
export type BasicVote_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "BasicVote" */
export type BasicVote_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BasicVote_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BasicVote_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  batch_id?: InputMaybe<Scalars['String']['input']>;
  choice_id?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  round_id?: InputMaybe<Scalars['String']['input']>;
  voter?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "BasicVote" */
export type BasicVote_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "BasicVote" */
export type BasicVote_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "BasicVote" */
export type BasicVote_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "BasicVote" */
export type BasicVote_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "BatchVote" */
export type BatchVote = {
  __typename?: 'BatchVote';
  comment?: Maybe<Scalars['String']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  /** An object relationship */
  round?: Maybe<Round>;
  round_id: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  totalVoted: Scalars['numeric']['output'];
  voter: Scalars['String']['output'];
  /** An array relationship */
  votes: Array<BasicVote>;
};


/** columns and relationships of "BatchVote" */
export type BatchVoteVotesArgs = {
  distinct_on?: InputMaybe<Array<BasicVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicVote_Order_By>>;
  where?: InputMaybe<BasicVote_Bool_Exp>;
};

/** order by aggregate values of table "BatchVote" */
export type BatchVote_Aggregate_Order_By = {
  avg?: InputMaybe<BatchVote_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BatchVote_Max_Order_By>;
  min?: InputMaybe<BatchVote_Min_Order_By>;
  stddev?: InputMaybe<BatchVote_Stddev_Order_By>;
  stddev_pop?: InputMaybe<BatchVote_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<BatchVote_Stddev_Samp_Order_By>;
  sum?: InputMaybe<BatchVote_Sum_Order_By>;
  var_pop?: InputMaybe<BatchVote_Var_Pop_Order_By>;
  var_samp?: InputMaybe<BatchVote_Var_Samp_Order_By>;
  variance?: InputMaybe<BatchVote_Variance_Order_By>;
};

/** order by avg() on columns of table "BatchVote" */
export type BatchVote_Avg_Order_By = {
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "BatchVote". All fields are combined with a logical 'AND'. */
export type BatchVote_Bool_Exp = {
  _and?: InputMaybe<Array<BatchVote_Bool_Exp>>;
  _not?: InputMaybe<BatchVote_Bool_Exp>;
  _or?: InputMaybe<Array<BatchVote_Bool_Exp>>;
  comment?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  round?: InputMaybe<Round_Bool_Exp>;
  round_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Int_Comparison_Exp>;
  totalVoted?: InputMaybe<Numeric_Comparison_Exp>;
  voter?: InputMaybe<String_Comparison_Exp>;
  votes?: InputMaybe<BasicVote_Bool_Exp>;
};

/** order by max() on columns of table "BatchVote" */
export type BatchVote_Max_Order_By = {
  comment?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
  voter?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "BatchVote" */
export type BatchVote_Min_Order_By = {
  comment?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  round_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
  voter?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "BatchVote". */
export type BatchVote_Order_By = {
  comment?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  round?: InputMaybe<Round_Order_By>;
  round_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
  voter?: InputMaybe<Order_By>;
  votes_aggregate?: InputMaybe<BasicVote_Aggregate_Order_By>;
};

/** select columns of table "BatchVote" */
export enum BatchVote_Select_Column {
  /** column name */
  Comment = 'comment',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TotalVoted = 'totalVoted',
  /** column name */
  Voter = 'voter'
}

/** order by stddev() on columns of table "BatchVote" */
export type BatchVote_Stddev_Order_By = {
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "BatchVote" */
export type BatchVote_Stddev_Pop_Order_By = {
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "BatchVote" */
export type BatchVote_Stddev_Samp_Order_By = {
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "BatchVote" */
export type BatchVote_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BatchVote_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BatchVote_Stream_Cursor_Value_Input = {
  comment?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  round_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  totalVoted?: InputMaybe<Scalars['numeric']['input']>;
  voter?: InputMaybe<Scalars['String']['input']>;
};

/** order by sum() on columns of table "BatchVote" */
export type BatchVote_Sum_Order_By = {
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "BatchVote" */
export type BatchVote_Var_Pop_Order_By = {
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "BatchVote" */
export type BatchVote_Var_Samp_Order_By = {
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "BatchVote" */
export type BatchVote_Variance_Order_By = {
  timestamp?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** columns and relationships of "Factory" */
export type Factory = {
  __typename?: 'Factory';
  address: Scalars['String']['output'];
  admins: Array<Scalars['String']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Factory". All fields are combined with a logical 'AND'. */
export type Factory_Bool_Exp = {
  _and?: InputMaybe<Array<Factory_Bool_Exp>>;
  _not?: InputMaybe<Factory_Bool_Exp>;
  _or?: InputMaybe<Array<Factory_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  admins?: InputMaybe<String_Array_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Factory". */
export type Factory_Order_By = {
  address?: InputMaybe<Order_By>;
  admins?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Factory" */
export enum Factory_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Admins = 'admins',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Factory" */
export type Factory_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Factory_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Factory_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  admins?: InputMaybe<Array<Scalars['String']['input']>>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "GGApplication" */
export type GgApplication = {
  __typename?: 'GGApplication';
  amountReviewed: Scalars['Int']['output'];
  application: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  /** An object relationship */
  ggRound?: Maybe<GgApplicationRound>;
  ggRound_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastUpdated: Scalars['Int']['output'];
  postedBy: Scalars['String']['output'];
  registrar: Scalars['String']['output'];
  totalVoted: Scalars['numeric']['output'];
  validApplication: Scalars['Boolean']['output'];
  /** An array relationship */
  votes: Array<GgApplicationVote>;
};


/** columns and relationships of "GGApplication" */
export type GgApplicationVotesArgs = {
  distinct_on?: InputMaybe<Array<GgApplicationVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GgApplicationVote_Order_By>>;
  where?: InputMaybe<GgApplicationVote_Bool_Exp>;
};

/** columns and relationships of "GGApplicationRound" */
export type GgApplicationRound = {
  __typename?: 'GGApplicationRound';
  /** An array relationship */
  applications: Array<GgApplication>;
  /** An object relationship */
  choicesParams?: Maybe<Params_Hal_V0_1_1>;
  choicesParams_id: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  postedBy: Scalars['String']['output'];
  /** An object relationship */
  round?: Maybe<Round>;
  round_id: Scalars['String']['output'];
  rubric: Scalars['String']['output'];
  validRubric: Scalars['Boolean']['output'];
  /** An object relationship */
  votesParams?: Maybe<Params_RubricVotes_V0_1_0>;
  votesParams_id: Scalars['String']['output'];
};


/** columns and relationships of "GGApplicationRound" */
export type GgApplicationRoundApplicationsArgs = {
  distinct_on?: InputMaybe<Array<GgApplication_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GgApplication_Order_By>>;
  where?: InputMaybe<GgApplication_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "GGApplicationRound". All fields are combined with a logical 'AND'. */
export type GgApplicationRound_Bool_Exp = {
  _and?: InputMaybe<Array<GgApplicationRound_Bool_Exp>>;
  _not?: InputMaybe<GgApplicationRound_Bool_Exp>;
  _or?: InputMaybe<Array<GgApplicationRound_Bool_Exp>>;
  applications?: InputMaybe<GgApplication_Bool_Exp>;
  choicesParams?: InputMaybe<Params_Hal_V0_1_1_Bool_Exp>;
  choicesParams_id?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Int_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  postedBy?: InputMaybe<String_Comparison_Exp>;
  round?: InputMaybe<Round_Bool_Exp>;
  round_id?: InputMaybe<String_Comparison_Exp>;
  rubric?: InputMaybe<String_Comparison_Exp>;
  validRubric?: InputMaybe<Boolean_Comparison_Exp>;
  votesParams?: InputMaybe<Params_RubricVotes_V0_1_0_Bool_Exp>;
  votesParams_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "GGApplicationRound". */
export type GgApplicationRound_Order_By = {
  applications_aggregate?: InputMaybe<GgApplication_Aggregate_Order_By>;
  choicesParams?: InputMaybe<Params_Hal_V0_1_1_Order_By>;
  choicesParams_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  round?: InputMaybe<Round_Order_By>;
  round_id?: InputMaybe<Order_By>;
  rubric?: InputMaybe<Order_By>;
  validRubric?: InputMaybe<Order_By>;
  votesParams?: InputMaybe<Params_RubricVotes_V0_1_0_Order_By>;
  votesParams_id?: InputMaybe<Order_By>;
};

/** select columns of table "GGApplicationRound" */
export enum GgApplicationRound_Select_Column {
  /** column name */
  ChoicesParamsId = 'choicesParams_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  PostedBy = 'postedBy',
  /** column name */
  RoundId = 'round_id',
  /** column name */
  Rubric = 'rubric',
  /** column name */
  ValidRubric = 'validRubric',
  /** column name */
  VotesParamsId = 'votesParams_id'
}

/** Streaming cursor of the table "GGApplicationRound" */
export type GgApplicationRound_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: GgApplicationRound_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GgApplicationRound_Stream_Cursor_Value_Input = {
  choicesParams_id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  postedBy?: InputMaybe<Scalars['String']['input']>;
  round_id?: InputMaybe<Scalars['String']['input']>;
  rubric?: InputMaybe<Scalars['String']['input']>;
  validRubric?: InputMaybe<Scalars['Boolean']['input']>;
  votesParams_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "GGApplicationVote" */
export type GgApplicationVote = {
  __typename?: 'GGApplicationVote';
  amount: Scalars['numeric']['output'];
  /** An object relationship */
  choice?: Maybe<GgApplication>;
  choice_id: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  feedback: Scalars['String']['output'];
  id: Scalars['String']['output'];
  reviewer: Scalars['String']['output'];
  validFeedback: Scalars['Boolean']['output'];
};

/** order by aggregate values of table "GGApplicationVote" */
export type GgApplicationVote_Aggregate_Order_By = {
  avg?: InputMaybe<GgApplicationVote_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GgApplicationVote_Max_Order_By>;
  min?: InputMaybe<GgApplicationVote_Min_Order_By>;
  stddev?: InputMaybe<GgApplicationVote_Stddev_Order_By>;
  stddev_pop?: InputMaybe<GgApplicationVote_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<GgApplicationVote_Stddev_Samp_Order_By>;
  sum?: InputMaybe<GgApplicationVote_Sum_Order_By>;
  var_pop?: InputMaybe<GgApplicationVote_Var_Pop_Order_By>;
  var_samp?: InputMaybe<GgApplicationVote_Var_Samp_Order_By>;
  variance?: InputMaybe<GgApplicationVote_Variance_Order_By>;
};

/** order by avg() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "GGApplicationVote". All fields are combined with a logical 'AND'. */
export type GgApplicationVote_Bool_Exp = {
  _and?: InputMaybe<Array<GgApplicationVote_Bool_Exp>>;
  _not?: InputMaybe<GgApplicationVote_Bool_Exp>;
  _or?: InputMaybe<Array<GgApplicationVote_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  choice?: InputMaybe<GgApplication_Bool_Exp>;
  choice_id?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Int_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  feedback?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  reviewer?: InputMaybe<String_Comparison_Exp>;
  validFeedback?: InputMaybe<Boolean_Comparison_Exp>;
};

/** order by max() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  choice_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  feedback?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reviewer?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  choice_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  feedback?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reviewer?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "GGApplicationVote". */
export type GgApplicationVote_Order_By = {
  amount?: InputMaybe<Order_By>;
  choice?: InputMaybe<GgApplication_Order_By>;
  choice_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  feedback?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  reviewer?: InputMaybe<Order_By>;
  validFeedback?: InputMaybe<Order_By>;
};

/** select columns of table "GGApplicationVote" */
export enum GgApplicationVote_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  ChoiceId = 'choice_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Feedback = 'feedback',
  /** column name */
  Id = 'id',
  /** column name */
  Reviewer = 'reviewer',
  /** column name */
  ValidFeedback = 'validFeedback'
}

/** order by stddev() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "GGApplicationVote" */
export type GgApplicationVote_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: GgApplicationVote_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GgApplicationVote_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  choice_id?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Int']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  feedback?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  reviewer?: InputMaybe<Scalars['String']['input']>;
  validFeedback?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by sum() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "GGApplicationVote" */
export type GgApplicationVote_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
};

/** order by aggregate values of table "GGApplication" */
export type GgApplication_Aggregate_Order_By = {
  avg?: InputMaybe<GgApplication_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GgApplication_Max_Order_By>;
  min?: InputMaybe<GgApplication_Min_Order_By>;
  stddev?: InputMaybe<GgApplication_Stddev_Order_By>;
  stddev_pop?: InputMaybe<GgApplication_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<GgApplication_Stddev_Samp_Order_By>;
  sum?: InputMaybe<GgApplication_Sum_Order_By>;
  var_pop?: InputMaybe<GgApplication_Var_Pop_Order_By>;
  var_samp?: InputMaybe<GgApplication_Var_Samp_Order_By>;
  variance?: InputMaybe<GgApplication_Variance_Order_By>;
};

/** order by avg() on columns of table "GGApplication" */
export type GgApplication_Avg_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "GGApplication". All fields are combined with a logical 'AND'. */
export type GgApplication_Bool_Exp = {
  _and?: InputMaybe<Array<GgApplication_Bool_Exp>>;
  _not?: InputMaybe<GgApplication_Bool_Exp>;
  _or?: InputMaybe<Array<GgApplication_Bool_Exp>>;
  amountReviewed?: InputMaybe<Int_Comparison_Exp>;
  application?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  ggRound?: InputMaybe<GgApplicationRound_Bool_Exp>;
  ggRound_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  lastUpdated?: InputMaybe<Int_Comparison_Exp>;
  postedBy?: InputMaybe<String_Comparison_Exp>;
  registrar?: InputMaybe<String_Comparison_Exp>;
  totalVoted?: InputMaybe<Numeric_Comparison_Exp>;
  validApplication?: InputMaybe<Boolean_Comparison_Exp>;
  votes?: InputMaybe<GgApplicationVote_Bool_Exp>;
};

/** order by max() on columns of table "GGApplication" */
export type GgApplication_Max_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  application?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  ggRound_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  registrar?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "GGApplication" */
export type GgApplication_Min_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  application?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  ggRound_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  registrar?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "GGApplication". */
export type GgApplication_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  application?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  ggRound?: InputMaybe<GgApplicationRound_Order_By>;
  ggRound_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  postedBy?: InputMaybe<Order_By>;
  registrar?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
  validApplication?: InputMaybe<Order_By>;
  votes_aggregate?: InputMaybe<GgApplicationVote_Aggregate_Order_By>;
};

/** select columns of table "GGApplication" */
export enum GgApplication_Select_Column {
  /** column name */
  AmountReviewed = 'amountReviewed',
  /** column name */
  Application = 'application',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  GgRoundId = 'ggRound_id',
  /** column name */
  Id = 'id',
  /** column name */
  LastUpdated = 'lastUpdated',
  /** column name */
  PostedBy = 'postedBy',
  /** column name */
  Registrar = 'registrar',
  /** column name */
  TotalVoted = 'totalVoted',
  /** column name */
  ValidApplication = 'validApplication'
}

/** order by stddev() on columns of table "GGApplication" */
export type GgApplication_Stddev_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "GGApplication" */
export type GgApplication_Stddev_Pop_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "GGApplication" */
export type GgApplication_Stddev_Samp_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "GGApplication" */
export type GgApplication_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: GgApplication_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type GgApplication_Stream_Cursor_Value_Input = {
  amountReviewed?: InputMaybe<Scalars['Int']['input']>;
  application?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  ggRound_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lastUpdated?: InputMaybe<Scalars['Int']['input']>;
  postedBy?: InputMaybe<Scalars['String']['input']>;
  registrar?: InputMaybe<Scalars['String']['input']>;
  totalVoted?: InputMaybe<Scalars['numeric']['input']>;
  validApplication?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by sum() on columns of table "GGApplication" */
export type GgApplication_Sum_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "GGApplication" */
export type GgApplication_Var_Pop_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "GGApplication" */
export type GgApplication_Var_Samp_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "GGApplication" */
export type GgApplication_Variance_Order_By = {
  amountReviewed?: InputMaybe<Order_By>;
  lastUpdated?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** columns and relationships of "ModuleClone" */
export type ModuleClone = {
  __typename?: 'ModuleClone';
  /** An object relationship */
  contest?: Maybe<Round>;
  contest_id?: Maybe<Scalars['String']['output']>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  filterTag: Scalars['String']['output'];
  id: Scalars['String']['output'];
  moduleAddress: Scalars['String']['output'];
  moduleName: Scalars['String']['output'];
  /** An object relationship */
  moduleTemplate?: Maybe<ModuleTemplate>;
  moduleTemplate_id: Scalars['String']['output'];
  roundAddress?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "ModuleClone". All fields are combined with a logical 'AND'. */
export type ModuleClone_Bool_Exp = {
  _and?: InputMaybe<Array<ModuleClone_Bool_Exp>>;
  _not?: InputMaybe<ModuleClone_Bool_Exp>;
  _or?: InputMaybe<Array<ModuleClone_Bool_Exp>>;
  contest?: InputMaybe<Round_Bool_Exp>;
  contest_id?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  filterTag?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  moduleAddress?: InputMaybe<String_Comparison_Exp>;
  moduleName?: InputMaybe<String_Comparison_Exp>;
  moduleTemplate?: InputMaybe<ModuleTemplate_Bool_Exp>;
  moduleTemplate_id?: InputMaybe<String_Comparison_Exp>;
  roundAddress?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "ModuleClone". */
export type ModuleClone_Order_By = {
  contest?: InputMaybe<Round_Order_By>;
  contest_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  filterTag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  moduleAddress?: InputMaybe<Order_By>;
  moduleName?: InputMaybe<Order_By>;
  moduleTemplate?: InputMaybe<ModuleTemplate_Order_By>;
  moduleTemplate_id?: InputMaybe<Order_By>;
  roundAddress?: InputMaybe<Order_By>;
};

/** select columns of table "ModuleClone" */
export enum ModuleClone_Select_Column {
  /** column name */
  ContestId = 'contest_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  FilterTag = 'filterTag',
  /** column name */
  Id = 'id',
  /** column name */
  ModuleAddress = 'moduleAddress',
  /** column name */
  ModuleName = 'moduleName',
  /** column name */
  ModuleTemplateId = 'moduleTemplate_id',
  /** column name */
  RoundAddress = 'roundAddress'
}

/** Streaming cursor of the table "ModuleClone" */
export type ModuleClone_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ModuleClone_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ModuleClone_Stream_Cursor_Value_Input = {
  contest_id?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  filterTag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  moduleAddress?: InputMaybe<Scalars['String']['input']>;
  moduleName?: InputMaybe<Scalars['String']['input']>;
  moduleTemplate_id?: InputMaybe<Scalars['String']['input']>;
  roundAddress?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "ModuleTemplate" */
export type ModuleTemplate = {
  __typename?: 'ModuleTemplate';
  active: Scalars['Boolean']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  mdPointer: Scalars['String']['output'];
  mdProtocol: Scalars['numeric']['output'];
  moduleName: Scalars['String']['output'];
  templateAddress: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "ModuleTemplate". All fields are combined with a logical 'AND'. */
export type ModuleTemplate_Bool_Exp = {
  _and?: InputMaybe<Array<ModuleTemplate_Bool_Exp>>;
  _not?: InputMaybe<ModuleTemplate_Bool_Exp>;
  _or?: InputMaybe<Array<ModuleTemplate_Bool_Exp>>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  mdPointer?: InputMaybe<String_Comparison_Exp>;
  mdProtocol?: InputMaybe<Numeric_Comparison_Exp>;
  moduleName?: InputMaybe<String_Comparison_Exp>;
  templateAddress?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "ModuleTemplate". */
export type ModuleTemplate_Order_By = {
  active?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mdPointer?: InputMaybe<Order_By>;
  mdProtocol?: InputMaybe<Order_By>;
  moduleName?: InputMaybe<Order_By>;
  templateAddress?: InputMaybe<Order_By>;
};

/** select columns of table "ModuleTemplate" */
export enum ModuleTemplate_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  MdPointer = 'mdPointer',
  /** column name */
  MdProtocol = 'mdProtocol',
  /** column name */
  ModuleName = 'moduleName',
  /** column name */
  TemplateAddress = 'templateAddress'
}

/** Streaming cursor of the table "ModuleTemplate" */
export type ModuleTemplate_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ModuleTemplate_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ModuleTemplate_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mdPointer?: InputMaybe<Scalars['String']['input']>;
  mdProtocol?: InputMaybe<Scalars['numeric']['input']>;
  moduleName?: InputMaybe<Scalars['String']['input']>;
  templateAddress?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Params_BaalGate_v0_2_0" */
export type Params_BaalGate_V0_2_0 = {
  __typename?: 'Params_BaalGate_v0_2_0';
  checkpoint: Scalars['numeric']['output'];
  /** An object relationship */
  clone?: Maybe<ModuleClone>;
  clone_id: Scalars['String']['output'];
  dao: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  endTime: Scalars['numeric']['output'];
  holderThreshold: Scalars['numeric']['output'];
  holderType: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  lootToken: Scalars['String']['output'];
  sharesToken: Scalars['String']['output'];
  startTime: Scalars['numeric']['output'];
  timed: Scalars['Boolean']['output'];
};

/** Boolean expression to filter rows from the table "Params_BaalGate_v0_2_0". All fields are combined with a logical 'AND'. */
export type Params_BaalGate_V0_2_0_Bool_Exp = {
  _and?: InputMaybe<Array<Params_BaalGate_V0_2_0_Bool_Exp>>;
  _not?: InputMaybe<Params_BaalGate_V0_2_0_Bool_Exp>;
  _or?: InputMaybe<Array<Params_BaalGate_V0_2_0_Bool_Exp>>;
  checkpoint?: InputMaybe<Numeric_Comparison_Exp>;
  clone?: InputMaybe<ModuleClone_Bool_Exp>;
  clone_id?: InputMaybe<String_Comparison_Exp>;
  dao?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  endTime?: InputMaybe<Numeric_Comparison_Exp>;
  holderThreshold?: InputMaybe<Numeric_Comparison_Exp>;
  holderType?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  lootToken?: InputMaybe<String_Comparison_Exp>;
  sharesToken?: InputMaybe<String_Comparison_Exp>;
  startTime?: InputMaybe<Numeric_Comparison_Exp>;
  timed?: InputMaybe<Boolean_Comparison_Exp>;
};

/** Ordering options when selecting data from "Params_BaalGate_v0_2_0". */
export type Params_BaalGate_V0_2_0_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  clone?: InputMaybe<ModuleClone_Order_By>;
  clone_id?: InputMaybe<Order_By>;
  dao?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  holderThreshold?: InputMaybe<Order_By>;
  holderType?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lootToken?: InputMaybe<Order_By>;
  sharesToken?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
  timed?: InputMaybe<Order_By>;
};

/** select columns of table "Params_BaalGate_v0_2_0" */
export enum Params_BaalGate_V0_2_0_Select_Column {
  /** column name */
  Checkpoint = 'checkpoint',
  /** column name */
  CloneId = 'clone_id',
  /** column name */
  Dao = 'dao',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  EndTime = 'endTime',
  /** column name */
  HolderThreshold = 'holderThreshold',
  /** column name */
  HolderType = 'holderType',
  /** column name */
  Id = 'id',
  /** column name */
  LootToken = 'lootToken',
  /** column name */
  SharesToken = 'sharesToken',
  /** column name */
  StartTime = 'startTime',
  /** column name */
  Timed = 'timed'
}

/** Streaming cursor of the table "Params_BaalGate_v0_2_0" */
export type Params_BaalGate_V0_2_0_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Params_BaalGate_V0_2_0_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Params_BaalGate_V0_2_0_Stream_Cursor_Value_Input = {
  checkpoint?: InputMaybe<Scalars['numeric']['input']>;
  clone_id?: InputMaybe<Scalars['String']['input']>;
  dao?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  endTime?: InputMaybe<Scalars['numeric']['input']>;
  holderThreshold?: InputMaybe<Scalars['numeric']['input']>;
  holderType?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lootToken?: InputMaybe<Scalars['String']['input']>;
  sharesToken?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['numeric']['input']>;
  timed?: InputMaybe<Scalars['Boolean']['input']>;
};

/** columns and relationships of "Params_BaalPoints_v0_2_0" */
export type Params_BaalPoints_V0_2_0 = {
  __typename?: 'Params_BaalPoints_v0_2_0';
  checkpoint: Scalars['numeric']['output'];
  /** An object relationship */
  clone?: Maybe<ModuleClone>;
  clone_id: Scalars['String']['output'];
  dao: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  holderType: Scalars['numeric']['output'];
  id: Scalars['String']['output'];
  lootToken: Scalars['String']['output'];
  sharesToken: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Params_BaalPoints_v0_2_0". All fields are combined with a logical 'AND'. */
export type Params_BaalPoints_V0_2_0_Bool_Exp = {
  _and?: InputMaybe<Array<Params_BaalPoints_V0_2_0_Bool_Exp>>;
  _not?: InputMaybe<Params_BaalPoints_V0_2_0_Bool_Exp>;
  _or?: InputMaybe<Array<Params_BaalPoints_V0_2_0_Bool_Exp>>;
  checkpoint?: InputMaybe<Numeric_Comparison_Exp>;
  clone?: InputMaybe<ModuleClone_Bool_Exp>;
  clone_id?: InputMaybe<String_Comparison_Exp>;
  dao?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  holderType?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  lootToken?: InputMaybe<String_Comparison_Exp>;
  sharesToken?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Params_BaalPoints_v0_2_0". */
export type Params_BaalPoints_V0_2_0_Order_By = {
  checkpoint?: InputMaybe<Order_By>;
  clone?: InputMaybe<ModuleClone_Order_By>;
  clone_id?: InputMaybe<Order_By>;
  dao?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  holderType?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lootToken?: InputMaybe<Order_By>;
  sharesToken?: InputMaybe<Order_By>;
};

/** select columns of table "Params_BaalPoints_v0_2_0" */
export enum Params_BaalPoints_V0_2_0_Select_Column {
  /** column name */
  Checkpoint = 'checkpoint',
  /** column name */
  CloneId = 'clone_id',
  /** column name */
  Dao = 'dao',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  HolderType = 'holderType',
  /** column name */
  Id = 'id',
  /** column name */
  LootToken = 'lootToken',
  /** column name */
  SharesToken = 'sharesToken'
}

/** Streaming cursor of the table "Params_BaalPoints_v0_2_0" */
export type Params_BaalPoints_V0_2_0_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Params_BaalPoints_V0_2_0_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Params_BaalPoints_V0_2_0_Stream_Cursor_Value_Input = {
  checkpoint?: InputMaybe<Scalars['numeric']['input']>;
  clone_id?: InputMaybe<Scalars['String']['input']>;
  dao?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  holderType?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  lootToken?: InputMaybe<Scalars['String']['input']>;
  sharesToken?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Params_HAL_v0_1_1" */
export type Params_Hal_V0_1_1 = {
  __typename?: 'Params_HAL_v0_1_1';
  adminHatId: Scalars['numeric']['output'];
  /** An object relationship */
  clone?: Maybe<ModuleClone>;
  clone_id: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Params_HAL_v0_1_1". All fields are combined with a logical 'AND'. */
export type Params_Hal_V0_1_1_Bool_Exp = {
  _and?: InputMaybe<Array<Params_Hal_V0_1_1_Bool_Exp>>;
  _not?: InputMaybe<Params_Hal_V0_1_1_Bool_Exp>;
  _or?: InputMaybe<Array<Params_Hal_V0_1_1_Bool_Exp>>;
  adminHatId?: InputMaybe<Numeric_Comparison_Exp>;
  clone?: InputMaybe<ModuleClone_Bool_Exp>;
  clone_id?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Params_HAL_v0_1_1". */
export type Params_Hal_V0_1_1_Order_By = {
  adminHatId?: InputMaybe<Order_By>;
  clone?: InputMaybe<ModuleClone_Order_By>;
  clone_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Params_HAL_v0_1_1" */
export enum Params_Hal_V0_1_1_Select_Column {
  /** column name */
  AdminHatId = 'adminHatId',
  /** column name */
  CloneId = 'clone_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Params_HAL_v0_1_1" */
export type Params_Hal_V0_1_1_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Params_Hal_V0_1_1_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Params_Hal_V0_1_1_Stream_Cursor_Value_Input = {
  adminHatId?: InputMaybe<Scalars['numeric']['input']>;
  clone_id?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Params_PrePop_v0_2_0" */
export type Params_PrePop_V0_2_0 = {
  __typename?: 'Params_PrePop_v0_2_0';
  /** An object relationship */
  basicChoices?: Maybe<BasicChoices>;
  basicChoices_id: Scalars['String']['output'];
  /** An object relationship */
  clone?: Maybe<ModuleClone>;
  clone_id: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Params_PrePop_v0_2_0". All fields are combined with a logical 'AND'. */
export type Params_PrePop_V0_2_0_Bool_Exp = {
  _and?: InputMaybe<Array<Params_PrePop_V0_2_0_Bool_Exp>>;
  _not?: InputMaybe<Params_PrePop_V0_2_0_Bool_Exp>;
  _or?: InputMaybe<Array<Params_PrePop_V0_2_0_Bool_Exp>>;
  basicChoices?: InputMaybe<BasicChoices_Bool_Exp>;
  basicChoices_id?: InputMaybe<String_Comparison_Exp>;
  clone?: InputMaybe<ModuleClone_Bool_Exp>;
  clone_id?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Params_PrePop_v0_2_0". */
export type Params_PrePop_V0_2_0_Order_By = {
  basicChoices?: InputMaybe<BasicChoices_Order_By>;
  basicChoices_id?: InputMaybe<Order_By>;
  clone?: InputMaybe<ModuleClone_Order_By>;
  clone_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "Params_PrePop_v0_2_0" */
export enum Params_PrePop_V0_2_0_Select_Column {
  /** column name */
  BasicChoicesId = 'basicChoices_id',
  /** column name */
  CloneId = 'clone_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id'
}

/** Streaming cursor of the table "Params_PrePop_v0_2_0" */
export type Params_PrePop_V0_2_0_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Params_PrePop_V0_2_0_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Params_PrePop_V0_2_0_Stream_Cursor_Value_Input = {
  basicChoices_id?: InputMaybe<Scalars['String']['input']>;
  clone_id?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Params_RubricVotes_v0_1_0" */
export type Params_RubricVotes_V0_1_0 = {
  __typename?: 'Params_RubricVotes_v0_1_0';
  adminHatId: Scalars['numeric']['output'];
  /** An object relationship */
  clone?: Maybe<ModuleClone>;
  clone_id: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  judgeHatId: Scalars['numeric']['output'];
  roundAddress: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "Params_RubricVotes_v0_1_0". All fields are combined with a logical 'AND'. */
export type Params_RubricVotes_V0_1_0_Bool_Exp = {
  _and?: InputMaybe<Array<Params_RubricVotes_V0_1_0_Bool_Exp>>;
  _not?: InputMaybe<Params_RubricVotes_V0_1_0_Bool_Exp>;
  _or?: InputMaybe<Array<Params_RubricVotes_V0_1_0_Bool_Exp>>;
  adminHatId?: InputMaybe<Numeric_Comparison_Exp>;
  clone?: InputMaybe<ModuleClone_Bool_Exp>;
  clone_id?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  judgeHatId?: InputMaybe<Numeric_Comparison_Exp>;
  roundAddress?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Params_RubricVotes_v0_1_0". */
export type Params_RubricVotes_V0_1_0_Order_By = {
  adminHatId?: InputMaybe<Order_By>;
  clone?: InputMaybe<ModuleClone_Order_By>;
  clone_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  judgeHatId?: InputMaybe<Order_By>;
  roundAddress?: InputMaybe<Order_By>;
};

/** select columns of table "Params_RubricVotes_v0_1_0" */
export enum Params_RubricVotes_V0_1_0_Select_Column {
  /** column name */
  AdminHatId = 'adminHatId',
  /** column name */
  CloneId = 'clone_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  JudgeHatId = 'judgeHatId',
  /** column name */
  RoundAddress = 'roundAddress'
}

/** Streaming cursor of the table "Params_RubricVotes_v0_1_0" */
export type Params_RubricVotes_V0_1_0_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Params_RubricVotes_V0_1_0_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Params_RubricVotes_V0_1_0_Stream_Cursor_Value_Input = {
  adminHatId?: InputMaybe<Scalars['numeric']['input']>;
  clone_id?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  judgeHatId?: InputMaybe<Scalars['numeric']['input']>;
  roundAddress?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "Params_TimedVotes_v0_2_0" */
export type Params_TimedVotes_V0_2_0 = {
  __typename?: 'Params_TimedVotes_v0_2_0';
  /** An object relationship */
  clone?: Maybe<ModuleClone>;
  clone_id: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  duration?: Maybe<Scalars['numeric']['output']>;
  endTime?: Maybe<Scalars['numeric']['output']>;
  id: Scalars['String']['output'];
  startTime?: Maybe<Scalars['numeric']['output']>;
};

/** Boolean expression to filter rows from the table "Params_TimedVotes_v0_2_0". All fields are combined with a logical 'AND'. */
export type Params_TimedVotes_V0_2_0_Bool_Exp = {
  _and?: InputMaybe<Array<Params_TimedVotes_V0_2_0_Bool_Exp>>;
  _not?: InputMaybe<Params_TimedVotes_V0_2_0_Bool_Exp>;
  _or?: InputMaybe<Array<Params_TimedVotes_V0_2_0_Bool_Exp>>;
  clone?: InputMaybe<ModuleClone_Bool_Exp>;
  clone_id?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  duration?: InputMaybe<Numeric_Comparison_Exp>;
  endTime?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  startTime?: InputMaybe<Numeric_Comparison_Exp>;
};

/** Ordering options when selecting data from "Params_TimedVotes_v0_2_0". */
export type Params_TimedVotes_V0_2_0_Order_By = {
  clone?: InputMaybe<ModuleClone_Order_By>;
  clone_id?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  duration?: InputMaybe<Order_By>;
  endTime?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  startTime?: InputMaybe<Order_By>;
};

/** select columns of table "Params_TimedVotes_v0_2_0" */
export enum Params_TimedVotes_V0_2_0_Select_Column {
  /** column name */
  CloneId = 'clone_id',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Duration = 'duration',
  /** column name */
  EndTime = 'endTime',
  /** column name */
  Id = 'id',
  /** column name */
  StartTime = 'startTime'
}

/** Streaming cursor of the table "Params_TimedVotes_v0_2_0" */
export type Params_TimedVotes_V0_2_0_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Params_TimedVotes_V0_2_0_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Params_TimedVotes_V0_2_0_Stream_Cursor_Value_Input = {
  clone_id?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  duration?: InputMaybe<Scalars['numeric']['input']>;
  endTime?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['numeric']['input']>;
};

/** columns and relationships of "Round" */
export type Round = {
  __typename?: 'Round';
  /** An array relationship */
  batchVotes: Array<BatchVote>;
  /** An object relationship */
  choicesModule?: Maybe<ModuleClone>;
  choicesModule_id: Scalars['String']['output'];
  contestStatus: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  /** An object relationship */
  executionModule?: Maybe<ModuleClone>;
  executionModule_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isContinuous: Scalars['Boolean']['output'];
  isRetractable: Scalars['Boolean']['output'];
  mdPointer: Scalars['String']['output'];
  mdProtocol: Scalars['numeric']['output'];
  /** An object relationship */
  pointsModule?: Maybe<ModuleClone>;
  pointsModule_id: Scalars['String']['output'];
  roundAddress: Scalars['String']['output'];
  totalVoted: Scalars['numeric']['output'];
  /** An array relationship */
  votes: Array<BasicVote>;
  /** An object relationship */
  votesModule?: Maybe<ModuleClone>;
  votesModule_id: Scalars['String']['output'];
};


/** columns and relationships of "Round" */
export type RoundBatchVotesArgs = {
  distinct_on?: InputMaybe<Array<BatchVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BatchVote_Order_By>>;
  where?: InputMaybe<BatchVote_Bool_Exp>;
};


/** columns and relationships of "Round" */
export type RoundVotesArgs = {
  distinct_on?: InputMaybe<Array<BasicVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicVote_Order_By>>;
  where?: InputMaybe<BasicVote_Bool_Exp>;
};

/** columns and relationships of "RoundClone" */
export type RoundClone = {
  __typename?: 'RoundClone';
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  filterTag: Scalars['String']['output'];
  id: Scalars['String']['output'];
  roundAddress: Scalars['String']['output'];
  roundVersion: Scalars['String']['output'];
  /** An object relationship */
  template?: Maybe<RoundTemplate>;
  template_id: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "RoundClone". All fields are combined with a logical 'AND'. */
export type RoundClone_Bool_Exp = {
  _and?: InputMaybe<Array<RoundClone_Bool_Exp>>;
  _not?: InputMaybe<RoundClone_Bool_Exp>;
  _or?: InputMaybe<Array<RoundClone_Bool_Exp>>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  filterTag?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  roundAddress?: InputMaybe<String_Comparison_Exp>;
  roundVersion?: InputMaybe<String_Comparison_Exp>;
  template?: InputMaybe<RoundTemplate_Bool_Exp>;
  template_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "RoundClone". */
export type RoundClone_Order_By = {
  db_write_timestamp?: InputMaybe<Order_By>;
  filterTag?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  roundAddress?: InputMaybe<Order_By>;
  roundVersion?: InputMaybe<Order_By>;
  template?: InputMaybe<RoundTemplate_Order_By>;
  template_id?: InputMaybe<Order_By>;
};

/** select columns of table "RoundClone" */
export enum RoundClone_Select_Column {
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  FilterTag = 'filterTag',
  /** column name */
  Id = 'id',
  /** column name */
  RoundAddress = 'roundAddress',
  /** column name */
  RoundVersion = 'roundVersion',
  /** column name */
  TemplateId = 'template_id'
}

/** Streaming cursor of the table "RoundClone" */
export type RoundClone_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: RoundClone_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type RoundClone_Stream_Cursor_Value_Input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  filterTag?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  roundAddress?: InputMaybe<Scalars['String']['input']>;
  roundVersion?: InputMaybe<Scalars['String']['input']>;
  template_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "RoundTemplate" */
export type RoundTemplate = {
  __typename?: 'RoundTemplate';
  active: Scalars['Boolean']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  mdPointer: Scalars['String']['output'];
  mdProtocol: Scalars['numeric']['output'];
  roundAddress: Scalars['String']['output'];
  roundVersion: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "RoundTemplate". All fields are combined with a logical 'AND'. */
export type RoundTemplate_Bool_Exp = {
  _and?: InputMaybe<Array<RoundTemplate_Bool_Exp>>;
  _not?: InputMaybe<RoundTemplate_Bool_Exp>;
  _or?: InputMaybe<Array<RoundTemplate_Bool_Exp>>;
  active?: InputMaybe<Boolean_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  mdPointer?: InputMaybe<String_Comparison_Exp>;
  mdProtocol?: InputMaybe<Numeric_Comparison_Exp>;
  roundAddress?: InputMaybe<String_Comparison_Exp>;
  roundVersion?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "RoundTemplate". */
export type RoundTemplate_Order_By = {
  active?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mdPointer?: InputMaybe<Order_By>;
  mdProtocol?: InputMaybe<Order_By>;
  roundAddress?: InputMaybe<Order_By>;
  roundVersion?: InputMaybe<Order_By>;
};

/** select columns of table "RoundTemplate" */
export enum RoundTemplate_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  MdPointer = 'mdPointer',
  /** column name */
  MdProtocol = 'mdProtocol',
  /** column name */
  RoundAddress = 'roundAddress',
  /** column name */
  RoundVersion = 'roundVersion'
}

/** Streaming cursor of the table "RoundTemplate" */
export type RoundTemplate_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: RoundTemplate_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type RoundTemplate_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  mdPointer?: InputMaybe<Scalars['String']['input']>;
  mdProtocol?: InputMaybe<Scalars['numeric']['input']>;
  roundAddress?: InputMaybe<Scalars['String']['input']>;
  roundVersion?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "Round". All fields are combined with a logical 'AND'. */
export type Round_Bool_Exp = {
  _and?: InputMaybe<Array<Round_Bool_Exp>>;
  _not?: InputMaybe<Round_Bool_Exp>;
  _or?: InputMaybe<Array<Round_Bool_Exp>>;
  batchVotes?: InputMaybe<BatchVote_Bool_Exp>;
  choicesModule?: InputMaybe<ModuleClone_Bool_Exp>;
  choicesModule_id?: InputMaybe<String_Comparison_Exp>;
  contestStatus?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  executionModule?: InputMaybe<ModuleClone_Bool_Exp>;
  executionModule_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  isContinuous?: InputMaybe<Boolean_Comparison_Exp>;
  isRetractable?: InputMaybe<Boolean_Comparison_Exp>;
  mdPointer?: InputMaybe<String_Comparison_Exp>;
  mdProtocol?: InputMaybe<Numeric_Comparison_Exp>;
  pointsModule?: InputMaybe<ModuleClone_Bool_Exp>;
  pointsModule_id?: InputMaybe<String_Comparison_Exp>;
  roundAddress?: InputMaybe<String_Comparison_Exp>;
  totalVoted?: InputMaybe<Numeric_Comparison_Exp>;
  votes?: InputMaybe<BasicVote_Bool_Exp>;
  votesModule?: InputMaybe<ModuleClone_Bool_Exp>;
  votesModule_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Round". */
export type Round_Order_By = {
  batchVotes_aggregate?: InputMaybe<BatchVote_Aggregate_Order_By>;
  choicesModule?: InputMaybe<ModuleClone_Order_By>;
  choicesModule_id?: InputMaybe<Order_By>;
  contestStatus?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  executionModule?: InputMaybe<ModuleClone_Order_By>;
  executionModule_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isContinuous?: InputMaybe<Order_By>;
  isRetractable?: InputMaybe<Order_By>;
  mdPointer?: InputMaybe<Order_By>;
  mdProtocol?: InputMaybe<Order_By>;
  pointsModule?: InputMaybe<ModuleClone_Order_By>;
  pointsModule_id?: InputMaybe<Order_By>;
  roundAddress?: InputMaybe<Order_By>;
  totalVoted?: InputMaybe<Order_By>;
  votesModule?: InputMaybe<ModuleClone_Order_By>;
  votesModule_id?: InputMaybe<Order_By>;
  votes_aggregate?: InputMaybe<BasicVote_Aggregate_Order_By>;
};

/** select columns of table "Round" */
export enum Round_Select_Column {
  /** column name */
  ChoicesModuleId = 'choicesModule_id',
  /** column name */
  ContestStatus = 'contestStatus',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  ExecutionModuleId = 'executionModule_id',
  /** column name */
  Id = 'id',
  /** column name */
  IsContinuous = 'isContinuous',
  /** column name */
  IsRetractable = 'isRetractable',
  /** column name */
  MdPointer = 'mdPointer',
  /** column name */
  MdProtocol = 'mdProtocol',
  /** column name */
  PointsModuleId = 'pointsModule_id',
  /** column name */
  RoundAddress = 'roundAddress',
  /** column name */
  TotalVoted = 'totalVoted',
  /** column name */
  VotesModuleId = 'votesModule_id'
}

/** Streaming cursor of the table "Round" */
export type Round_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Round_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Round_Stream_Cursor_Value_Input = {
  choicesModule_id?: InputMaybe<Scalars['String']['input']>;
  contestStatus?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  executionModule_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isContinuous?: InputMaybe<Scalars['Boolean']['input']>;
  isRetractable?: InputMaybe<Scalars['Boolean']['input']>;
  mdPointer?: InputMaybe<Scalars['String']['input']>;
  mdProtocol?: InputMaybe<Scalars['numeric']['input']>;
  pointsModule_id?: InputMaybe<Scalars['String']['input']>;
  roundAddress?: InputMaybe<Scalars['String']['input']>;
  totalVoted?: InputMaybe<Scalars['numeric']['input']>;
  votesModule_id?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "TX" */
export type Tx = {
  __typename?: 'TX';
  blockNumber: Scalars['numeric']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  srcAddress: Scalars['String']['output'];
  timestamp: Scalars['Int']['output'];
  txHash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "TX". All fields are combined with a logical 'AND'. */
export type Tx_Bool_Exp = {
  _and?: InputMaybe<Array<Tx_Bool_Exp>>;
  _not?: InputMaybe<Tx_Bool_Exp>;
  _or?: InputMaybe<Array<Tx_Bool_Exp>>;
  blockNumber?: InputMaybe<Numeric_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  srcAddress?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Int_Comparison_Exp>;
  txHash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "TX". */
export type Tx_Order_By = {
  blockNumber?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  srcAddress?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  txHash?: InputMaybe<Order_By>;
};

/** select columns of table "TX" */
export enum Tx_Select_Column {
  /** column name */
  BlockNumber = 'blockNumber',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  Id = 'id',
  /** column name */
  SrcAddress = 'srcAddress',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  TxHash = 'txHash'
}

/** Streaming cursor of the table "TX" */
export type Tx_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tx_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tx_Stream_Cursor_Value_Input = {
  blockNumber?: InputMaybe<Scalars['numeric']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  srcAddress?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "chain_metadata" */
export type Chain_Metadata = {
  __typename?: 'chain_metadata';
  block_height: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  end_block?: Maybe<Scalars['Int']['output']>;
  first_event_block_number?: Maybe<Scalars['Int']['output']>;
  is_hyper_sync: Scalars['Boolean']['output'];
  latest_fetched_block_number: Scalars['Int']['output'];
  latest_processed_block?: Maybe<Scalars['Int']['output']>;
  num_batches_fetched: Scalars['Int']['output'];
  num_events_processed?: Maybe<Scalars['Int']['output']>;
  start_block: Scalars['Int']['output'];
  timestamp_caught_up_to_head_or_endblock?: Maybe<Scalars['timestamptz']['output']>;
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type Chain_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Chain_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  block_height?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  end_block?: InputMaybe<Int_Comparison_Exp>;
  first_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  is_hyper_sync?: InputMaybe<Boolean_Comparison_Exp>;
  latest_fetched_block_number?: InputMaybe<Int_Comparison_Exp>;
  latest_processed_block?: InputMaybe<Int_Comparison_Exp>;
  num_batches_fetched?: InputMaybe<Int_Comparison_Exp>;
  num_events_processed?: InputMaybe<Int_Comparison_Exp>;
  start_block?: InputMaybe<Int_Comparison_Exp>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type Chain_Metadata_Order_By = {
  block_height?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  end_block?: InputMaybe<Order_By>;
  first_event_block_number?: InputMaybe<Order_By>;
  is_hyper_sync?: InputMaybe<Order_By>;
  latest_fetched_block_number?: InputMaybe<Order_By>;
  latest_processed_block?: InputMaybe<Order_By>;
  num_batches_fetched?: InputMaybe<Order_By>;
  num_events_processed?: InputMaybe<Order_By>;
  start_block?: InputMaybe<Order_By>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Order_By>;
};

/** select columns of table "chain_metadata" */
export enum Chain_Metadata_Select_Column {
  /** column name */
  BlockHeight = 'block_height',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  EndBlock = 'end_block',
  /** column name */
  FirstEventBlockNumber = 'first_event_block_number',
  /** column name */
  IsHyperSync = 'is_hyper_sync',
  /** column name */
  LatestFetchedBlockNumber = 'latest_fetched_block_number',
  /** column name */
  LatestProcessedBlock = 'latest_processed_block',
  /** column name */
  NumBatchesFetched = 'num_batches_fetched',
  /** column name */
  NumEventsProcessed = 'num_events_processed',
  /** column name */
  StartBlock = 'start_block',
  /** column name */
  TimestampCaughtUpToHeadOrEndblock = 'timestamp_caught_up_to_head_or_endblock'
}

/** Streaming cursor of the table "chain_metadata" */
export type Chain_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chain_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chain_Metadata_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  end_block?: InputMaybe<Scalars['Int']['input']>;
  first_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  is_hyper_sync?: InputMaybe<Scalars['Boolean']['input']>;
  latest_fetched_block_number?: InputMaybe<Scalars['Int']['input']>;
  latest_processed_block?: InputMaybe<Scalars['Int']['input']>;
  num_batches_fetched?: InputMaybe<Scalars['Int']['input']>;
  num_events_processed?: InputMaybe<Scalars['Int']['input']>;
  start_block?: InputMaybe<Scalars['Int']['input']>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Boolean expression to compare columns of type "contract_type". All fields are combined with logical 'AND'. */
export type Contract_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['contract_type']['input']>;
  _gt?: InputMaybe<Scalars['contract_type']['input']>;
  _gte?: InputMaybe<Scalars['contract_type']['input']>;
  _in?: InputMaybe<Array<Scalars['contract_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['contract_type']['input']>;
  _lte?: InputMaybe<Scalars['contract_type']['input']>;
  _neq?: InputMaybe<Scalars['contract_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['contract_type']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "dynamic_contract_registry" */
export type Dynamic_Contract_Registry = {
  __typename?: 'dynamic_contract_registry';
  chain_id: Scalars['Int']['output'];
  contract_address: Scalars['String']['output'];
  contract_type: Scalars['contract_type']['output'];
  id: Scalars['String']['output'];
  registering_event_block_number: Scalars['Int']['output'];
  registering_event_block_timestamp: Scalars['Int']['output'];
  registering_event_contract_name: Scalars['String']['output'];
  registering_event_log_index: Scalars['Int']['output'];
  registering_event_name: Scalars['String']['output'];
  registering_event_src_address: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "dynamic_contract_registry". All fields are combined with a logical 'AND'. */
export type Dynamic_Contract_Registry_Bool_Exp = {
  _and?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  _not?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
  _or?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  contract_type?: InputMaybe<Contract_Type_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  registering_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  registering_event_block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  registering_event_contract_name?: InputMaybe<String_Comparison_Exp>;
  registering_event_log_index?: InputMaybe<Int_Comparison_Exp>;
  registering_event_name?: InputMaybe<String_Comparison_Exp>;
  registering_event_src_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "dynamic_contract_registry". */
export type Dynamic_Contract_Registry_Order_By = {
  chain_id?: InputMaybe<Order_By>;
  contract_address?: InputMaybe<Order_By>;
  contract_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  registering_event_block_number?: InputMaybe<Order_By>;
  registering_event_block_timestamp?: InputMaybe<Order_By>;
  registering_event_contract_name?: InputMaybe<Order_By>;
  registering_event_log_index?: InputMaybe<Order_By>;
  registering_event_name?: InputMaybe<Order_By>;
  registering_event_src_address?: InputMaybe<Order_By>;
};

/** select columns of table "dynamic_contract_registry" */
export enum Dynamic_Contract_Registry_Select_Column {
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractAddress = 'contract_address',
  /** column name */
  ContractType = 'contract_type',
  /** column name */
  Id = 'id',
  /** column name */
  RegisteringEventBlockNumber = 'registering_event_block_number',
  /** column name */
  RegisteringEventBlockTimestamp = 'registering_event_block_timestamp',
  /** column name */
  RegisteringEventContractName = 'registering_event_contract_name',
  /** column name */
  RegisteringEventLogIndex = 'registering_event_log_index',
  /** column name */
  RegisteringEventName = 'registering_event_name',
  /** column name */
  RegisteringEventSrcAddress = 'registering_event_src_address'
}

/** Streaming cursor of the table "dynamic_contract_registry" */
export type Dynamic_Contract_Registry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dynamic_Contract_Registry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dynamic_Contract_Registry_Stream_Cursor_Value_Input = {
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_address?: InputMaybe<Scalars['String']['input']>;
  contract_type?: InputMaybe<Scalars['contract_type']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  registering_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  registering_event_block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  registering_event_contract_name?: InputMaybe<Scalars['String']['input']>;
  registering_event_log_index?: InputMaybe<Scalars['Int']['input']>;
  registering_event_name?: InputMaybe<Scalars['String']['input']>;
  registering_event_src_address?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data = {
  __typename?: 'end_of_block_range_scanned_data';
  block_hash: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "end_of_block_range_scanned_data". All fields are combined with a logical 'AND'. */
export type End_Of_Block_Range_Scanned_Data_Bool_Exp = {
  _and?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  _not?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
  _or?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "end_of_block_range_scanned_data". */
export type End_Of_Block_Range_Scanned_Data_Order_By = {
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
};

/** select columns of table "end_of_block_range_scanned_data" */
export enum End_Of_Block_Range_Scanned_Data_Select_Column {
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id'
}

/** Streaming cursor of the table "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input = {
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "event_sync_state" */
export type Event_Sync_State = {
  __typename?: 'event_sync_state';
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  is_pre_registering_dynamic_contracts: Scalars['Boolean']['output'];
  log_index: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "event_sync_state". All fields are combined with a logical 'AND'. */
export type Event_Sync_State_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  _not?: InputMaybe<Event_Sync_State_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Boolean_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "event_sync_state". */
export type Event_Sync_State_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
};

/** select columns of table "event_sync_state" */
export enum Event_Sync_State_Select_Column {
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  IsPreRegisteringDynamicContracts = 'is_pre_registering_dynamic_contracts',
  /** column name */
  LogIndex = 'log_index'
}

/** Streaming cursor of the table "event_sync_state" */
export type Event_Sync_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Sync_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Sync_State_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Scalars['Boolean']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "persisted_state" */
export type Persisted_State = {
  __typename?: 'persisted_state';
  abi_files_hash: Scalars['String']['output'];
  config_hash: Scalars['String']['output'];
  envio_version: Scalars['String']['output'];
  handler_files_hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  schema_hash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "persisted_state". All fields are combined with a logical 'AND'. */
export type Persisted_State_Bool_Exp = {
  _and?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  _not?: InputMaybe<Persisted_State_Bool_Exp>;
  _or?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  abi_files_hash?: InputMaybe<String_Comparison_Exp>;
  config_hash?: InputMaybe<String_Comparison_Exp>;
  envio_version?: InputMaybe<String_Comparison_Exp>;
  handler_files_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  schema_hash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "persisted_state". */
export type Persisted_State_Order_By = {
  abi_files_hash?: InputMaybe<Order_By>;
  config_hash?: InputMaybe<Order_By>;
  envio_version?: InputMaybe<Order_By>;
  handler_files_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  schema_hash?: InputMaybe<Order_By>;
};

/** select columns of table "persisted_state" */
export enum Persisted_State_Select_Column {
  /** column name */
  AbiFilesHash = 'abi_files_hash',
  /** column name */
  ConfigHash = 'config_hash',
  /** column name */
  EnvioVersion = 'envio_version',
  /** column name */
  HandlerFilesHash = 'handler_files_hash',
  /** column name */
  Id = 'id',
  /** column name */
  SchemaHash = 'schema_hash'
}

/** Streaming cursor of the table "persisted_state" */
export type Persisted_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Persisted_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Persisted_State_Stream_Cursor_Value_Input = {
  abi_files_hash?: InputMaybe<Scalars['String']['input']>;
  config_hash?: InputMaybe<Scalars['String']['input']>;
  envio_version?: InputMaybe<Scalars['String']['input']>;
  handler_files_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  schema_hash?: InputMaybe<Scalars['String']['input']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "AppDraft" */
  AppDraft: Array<AppDraft>;
  /** fetch data from the table: "AppDraft" using primary key columns */
  AppDraft_by_pk?: Maybe<AppDraft>;
  /** fetch data from the table: "AskHausContest" */
  AskHausContest: Array<AskHausContest>;
  /** fetch data from the table: "AskHausContest" using primary key columns */
  AskHausContest_by_pk?: Maybe<AskHausContest>;
  /** fetch data from the table: "AskHausPoll" */
  AskHausPoll: Array<AskHausPoll>;
  /** fetch data from the table: "AskHausPoll" using primary key columns */
  AskHausPoll_by_pk?: Maybe<AskHausPoll>;
  /** fetch data from the table: "BasicChoice" */
  BasicChoice: Array<BasicChoice>;
  /** fetch data from the table: "BasicChoice" using primary key columns */
  BasicChoice_by_pk?: Maybe<BasicChoice>;
  /** fetch data from the table: "BasicChoices" */
  BasicChoices: Array<BasicChoices>;
  /** fetch data from the table: "BasicChoices" using primary key columns */
  BasicChoices_by_pk?: Maybe<BasicChoices>;
  /** fetch data from the table: "BasicVote" */
  BasicVote: Array<BasicVote>;
  /** fetch data from the table: "BasicVote" using primary key columns */
  BasicVote_by_pk?: Maybe<BasicVote>;
  /** fetch data from the table: "BatchVote" */
  BatchVote: Array<BatchVote>;
  /** fetch data from the table: "BatchVote" using primary key columns */
  BatchVote_by_pk?: Maybe<BatchVote>;
  /** fetch data from the table: "Factory" */
  Factory: Array<Factory>;
  /** fetch data from the table: "Factory" using primary key columns */
  Factory_by_pk?: Maybe<Factory>;
  /** fetch data from the table: "GGApplication" */
  GGApplication: Array<GgApplication>;
  /** fetch data from the table: "GGApplicationRound" */
  GGApplicationRound: Array<GgApplicationRound>;
  /** fetch data from the table: "GGApplicationRound" using primary key columns */
  GGApplicationRound_by_pk?: Maybe<GgApplicationRound>;
  /** fetch data from the table: "GGApplicationVote" */
  GGApplicationVote: Array<GgApplicationVote>;
  /** fetch data from the table: "GGApplicationVote" using primary key columns */
  GGApplicationVote_by_pk?: Maybe<GgApplicationVote>;
  /** fetch data from the table: "GGApplication" using primary key columns */
  GGApplication_by_pk?: Maybe<GgApplication>;
  /** fetch data from the table: "ModuleClone" */
  ModuleClone: Array<ModuleClone>;
  /** fetch data from the table: "ModuleClone" using primary key columns */
  ModuleClone_by_pk?: Maybe<ModuleClone>;
  /** fetch data from the table: "ModuleTemplate" */
  ModuleTemplate: Array<ModuleTemplate>;
  /** fetch data from the table: "ModuleTemplate" using primary key columns */
  ModuleTemplate_by_pk?: Maybe<ModuleTemplate>;
  /** fetch data from the table: "Params_BaalGate_v0_2_0" */
  Params_BaalGate_v0_2_0: Array<Params_BaalGate_V0_2_0>;
  /** fetch data from the table: "Params_BaalGate_v0_2_0" using primary key columns */
  Params_BaalGate_v0_2_0_by_pk?: Maybe<Params_BaalGate_V0_2_0>;
  /** fetch data from the table: "Params_BaalPoints_v0_2_0" */
  Params_BaalPoints_v0_2_0: Array<Params_BaalPoints_V0_2_0>;
  /** fetch data from the table: "Params_BaalPoints_v0_2_0" using primary key columns */
  Params_BaalPoints_v0_2_0_by_pk?: Maybe<Params_BaalPoints_V0_2_0>;
  /** fetch data from the table: "Params_HAL_v0_1_1" */
  Params_HAL_v0_1_1: Array<Params_Hal_V0_1_1>;
  /** fetch data from the table: "Params_HAL_v0_1_1" using primary key columns */
  Params_HAL_v0_1_1_by_pk?: Maybe<Params_Hal_V0_1_1>;
  /** fetch data from the table: "Params_PrePop_v0_2_0" */
  Params_PrePop_v0_2_0: Array<Params_PrePop_V0_2_0>;
  /** fetch data from the table: "Params_PrePop_v0_2_0" using primary key columns */
  Params_PrePop_v0_2_0_by_pk?: Maybe<Params_PrePop_V0_2_0>;
  /** fetch data from the table: "Params_RubricVotes_v0_1_0" */
  Params_RubricVotes_v0_1_0: Array<Params_RubricVotes_V0_1_0>;
  /** fetch data from the table: "Params_RubricVotes_v0_1_0" using primary key columns */
  Params_RubricVotes_v0_1_0_by_pk?: Maybe<Params_RubricVotes_V0_1_0>;
  /** fetch data from the table: "Params_TimedVotes_v0_2_0" */
  Params_TimedVotes_v0_2_0: Array<Params_TimedVotes_V0_2_0>;
  /** fetch data from the table: "Params_TimedVotes_v0_2_0" using primary key columns */
  Params_TimedVotes_v0_2_0_by_pk?: Maybe<Params_TimedVotes_V0_2_0>;
  /** fetch data from the table: "Round" */
  Round: Array<Round>;
  /** fetch data from the table: "RoundClone" */
  RoundClone: Array<RoundClone>;
  /** fetch data from the table: "RoundClone" using primary key columns */
  RoundClone_by_pk?: Maybe<RoundClone>;
  /** fetch data from the table: "RoundTemplate" */
  RoundTemplate: Array<RoundTemplate>;
  /** fetch data from the table: "RoundTemplate" using primary key columns */
  RoundTemplate_by_pk?: Maybe<RoundTemplate>;
  /** fetch data from the table: "Round" using primary key columns */
  Round_by_pk?: Maybe<Round>;
  /** fetch data from the table: "TX" */
  TX: Array<Tx>;
  /** fetch data from the table: "TX" using primary key columns */
  TX_by_pk?: Maybe<Tx>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "end_of_block_range_scanned_data" using primary key columns */
  end_of_block_range_scanned_data_by_pk?: Maybe<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
};


export type Query_RootAppDraftArgs = {
  distinct_on?: InputMaybe<Array<AppDraft_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AppDraft_Order_By>>;
  where?: InputMaybe<AppDraft_Bool_Exp>;
};


export type Query_RootAppDraft_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAskHausContestArgs = {
  distinct_on?: InputMaybe<Array<AskHausContest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AskHausContest_Order_By>>;
  where?: InputMaybe<AskHausContest_Bool_Exp>;
};


export type Query_RootAskHausContest_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootAskHausPollArgs = {
  distinct_on?: InputMaybe<Array<AskHausPoll_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AskHausPoll_Order_By>>;
  where?: InputMaybe<AskHausPoll_Bool_Exp>;
};


export type Query_RootAskHausPoll_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBasicChoiceArgs = {
  distinct_on?: InputMaybe<Array<BasicChoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicChoice_Order_By>>;
  where?: InputMaybe<BasicChoice_Bool_Exp>;
};


export type Query_RootBasicChoice_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBasicChoicesArgs = {
  distinct_on?: InputMaybe<Array<BasicChoices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicChoices_Order_By>>;
  where?: InputMaybe<BasicChoices_Bool_Exp>;
};


export type Query_RootBasicChoices_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBasicVoteArgs = {
  distinct_on?: InputMaybe<Array<BasicVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicVote_Order_By>>;
  where?: InputMaybe<BasicVote_Bool_Exp>;
};


export type Query_RootBasicVote_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootBatchVoteArgs = {
  distinct_on?: InputMaybe<Array<BatchVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BatchVote_Order_By>>;
  where?: InputMaybe<BatchVote_Bool_Exp>;
};


export type Query_RootBatchVote_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootFactoryArgs = {
  distinct_on?: InputMaybe<Array<Factory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Factory_Order_By>>;
  where?: InputMaybe<Factory_Bool_Exp>;
};


export type Query_RootFactory_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootGgApplicationArgs = {
  distinct_on?: InputMaybe<Array<GgApplication_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GgApplication_Order_By>>;
  where?: InputMaybe<GgApplication_Bool_Exp>;
};


export type Query_RootGgApplicationRoundArgs = {
  distinct_on?: InputMaybe<Array<GgApplicationRound_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GgApplicationRound_Order_By>>;
  where?: InputMaybe<GgApplicationRound_Bool_Exp>;
};


export type Query_RootGgApplicationRound_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootGgApplicationVoteArgs = {
  distinct_on?: InputMaybe<Array<GgApplicationVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GgApplicationVote_Order_By>>;
  where?: InputMaybe<GgApplicationVote_Bool_Exp>;
};


export type Query_RootGgApplicationVote_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootGgApplication_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootModuleCloneArgs = {
  distinct_on?: InputMaybe<Array<ModuleClone_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ModuleClone_Order_By>>;
  where?: InputMaybe<ModuleClone_Bool_Exp>;
};


export type Query_RootModuleClone_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootModuleTemplateArgs = {
  distinct_on?: InputMaybe<Array<ModuleTemplate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ModuleTemplate_Order_By>>;
  where?: InputMaybe<ModuleTemplate_Bool_Exp>;
};


export type Query_RootModuleTemplate_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootParams_BaalGate_V0_2_0Args = {
  distinct_on?: InputMaybe<Array<Params_BaalGate_V0_2_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_BaalGate_V0_2_0_Order_By>>;
  where?: InputMaybe<Params_BaalGate_V0_2_0_Bool_Exp>;
};


export type Query_RootParams_BaalGate_V0_2_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootParams_BaalPoints_V0_2_0Args = {
  distinct_on?: InputMaybe<Array<Params_BaalPoints_V0_2_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_BaalPoints_V0_2_0_Order_By>>;
  where?: InputMaybe<Params_BaalPoints_V0_2_0_Bool_Exp>;
};


export type Query_RootParams_BaalPoints_V0_2_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootParams_Hal_V0_1_1Args = {
  distinct_on?: InputMaybe<Array<Params_Hal_V0_1_1_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_Hal_V0_1_1_Order_By>>;
  where?: InputMaybe<Params_Hal_V0_1_1_Bool_Exp>;
};


export type Query_RootParams_Hal_V0_1_1_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootParams_PrePop_V0_2_0Args = {
  distinct_on?: InputMaybe<Array<Params_PrePop_V0_2_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_PrePop_V0_2_0_Order_By>>;
  where?: InputMaybe<Params_PrePop_V0_2_0_Bool_Exp>;
};


export type Query_RootParams_PrePop_V0_2_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootParams_RubricVotes_V0_1_0Args = {
  distinct_on?: InputMaybe<Array<Params_RubricVotes_V0_1_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_RubricVotes_V0_1_0_Order_By>>;
  where?: InputMaybe<Params_RubricVotes_V0_1_0_Bool_Exp>;
};


export type Query_RootParams_RubricVotes_V0_1_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootParams_TimedVotes_V0_2_0Args = {
  distinct_on?: InputMaybe<Array<Params_TimedVotes_V0_2_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_TimedVotes_V0_2_0_Order_By>>;
  where?: InputMaybe<Params_TimedVotes_V0_2_0_Bool_Exp>;
};


export type Query_RootParams_TimedVotes_V0_2_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRoundArgs = {
  distinct_on?: InputMaybe<Array<Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Round_Order_By>>;
  where?: InputMaybe<Round_Bool_Exp>;
};


export type Query_RootRoundCloneArgs = {
  distinct_on?: InputMaybe<Array<RoundClone_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RoundClone_Order_By>>;
  where?: InputMaybe<RoundClone_Bool_Exp>;
};


export type Query_RootRoundClone_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRoundTemplateArgs = {
  distinct_on?: InputMaybe<Array<RoundTemplate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RoundTemplate_Order_By>>;
  where?: InputMaybe<RoundTemplate_Bool_Exp>;
};


export type Query_RootRoundTemplate_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootRound_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootTxArgs = {
  distinct_on?: InputMaybe<Array<Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tx_Order_By>>;
  where?: InputMaybe<Tx_Bool_Exp>;
};


export type Query_RootTx_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Query_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootDynamic_Contract_RegistryArgs = {
  distinct_on?: InputMaybe<Array<Dynamic_Contract_Registry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dynamic_Contract_Registry_Order_By>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Query_RootDynamic_Contract_Registry_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootEnd_Of_Block_Range_Scanned_DataArgs = {
  distinct_on?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Order_By>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Query_RootEnd_Of_Block_Range_Scanned_Data_By_PkArgs = {
  block_number: Scalars['Int']['input'];
  chain_id: Scalars['Int']['input'];
};


export type Query_RootEvent_Sync_StateArgs = {
  distinct_on?: InputMaybe<Array<Event_Sync_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Sync_State_Order_By>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Query_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootPersisted_StateArgs = {
  distinct_on?: InputMaybe<Array<Persisted_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persisted_State_Order_By>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Query_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Query_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int']['input'];
};

/** columns and relationships of "raw_events" */
export type Raw_Events = {
  __typename?: 'raw_events';
  block_fields: Scalars['jsonb']['output'];
  block_hash: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  contract_name: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  event_id: Scalars['numeric']['output'];
  event_name: Scalars['String']['output'];
  log_index: Scalars['Int']['output'];
  params: Scalars['jsonb']['output'];
  serial: Scalars['Int']['output'];
  src_address: Scalars['String']['output'];
  transaction_fields: Scalars['jsonb']['output'];
};


/** columns and relationships of "raw_events" */
export type Raw_EventsBlock_FieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsParamsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsTransaction_FieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type Raw_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  _not?: InputMaybe<Raw_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  block_fields?: InputMaybe<Jsonb_Comparison_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_name?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  event_id?: InputMaybe<Numeric_Comparison_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  params?: InputMaybe<Jsonb_Comparison_Exp>;
  serial?: InputMaybe<Int_Comparison_Exp>;
  src_address?: InputMaybe<String_Comparison_Exp>;
  transaction_fields?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "raw_events". */
export type Raw_Events_Order_By = {
  block_fields?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  contract_name?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  params?: InputMaybe<Order_By>;
  serial?: InputMaybe<Order_By>;
  src_address?: InputMaybe<Order_By>;
  transaction_fields?: InputMaybe<Order_By>;
};

/** select columns of table "raw_events" */
export enum Raw_Events_Select_Column {
  /** column name */
  BlockFields = 'block_fields',
  /** column name */
  BlockHash = 'block_hash',
  /** column name */
  BlockNumber = 'block_number',
  /** column name */
  BlockTimestamp = 'block_timestamp',
  /** column name */
  ChainId = 'chain_id',
  /** column name */
  ContractName = 'contract_name',
  /** column name */
  DbWriteTimestamp = 'db_write_timestamp',
  /** column name */
  EventId = 'event_id',
  /** column name */
  EventName = 'event_name',
  /** column name */
  LogIndex = 'log_index',
  /** column name */
  Params = 'params',
  /** column name */
  Serial = 'serial',
  /** column name */
  SrcAddress = 'src_address',
  /** column name */
  TransactionFields = 'transaction_fields'
}

/** Streaming cursor of the table "raw_events" */
export type Raw_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Raw_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Raw_Events_Stream_Cursor_Value_Input = {
  block_fields?: InputMaybe<Scalars['jsonb']['input']>;
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_name?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['numeric']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Scalars['jsonb']['input']>;
  serial?: InputMaybe<Scalars['Int']['input']>;
  src_address?: InputMaybe<Scalars['String']['input']>;
  transaction_fields?: InputMaybe<Scalars['jsonb']['input']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "AppDraft" */
  AppDraft: Array<AppDraft>;
  /** fetch data from the table: "AppDraft" using primary key columns */
  AppDraft_by_pk?: Maybe<AppDraft>;
  /** fetch data from the table in a streaming manner: "AppDraft" */
  AppDraft_stream: Array<AppDraft>;
  /** fetch data from the table: "AskHausContest" */
  AskHausContest: Array<AskHausContest>;
  /** fetch data from the table: "AskHausContest" using primary key columns */
  AskHausContest_by_pk?: Maybe<AskHausContest>;
  /** fetch data from the table in a streaming manner: "AskHausContest" */
  AskHausContest_stream: Array<AskHausContest>;
  /** fetch data from the table: "AskHausPoll" */
  AskHausPoll: Array<AskHausPoll>;
  /** fetch data from the table: "AskHausPoll" using primary key columns */
  AskHausPoll_by_pk?: Maybe<AskHausPoll>;
  /** fetch data from the table in a streaming manner: "AskHausPoll" */
  AskHausPoll_stream: Array<AskHausPoll>;
  /** fetch data from the table: "BasicChoice" */
  BasicChoice: Array<BasicChoice>;
  /** fetch data from the table: "BasicChoice" using primary key columns */
  BasicChoice_by_pk?: Maybe<BasicChoice>;
  /** fetch data from the table in a streaming manner: "BasicChoice" */
  BasicChoice_stream: Array<BasicChoice>;
  /** fetch data from the table: "BasicChoices" */
  BasicChoices: Array<BasicChoices>;
  /** fetch data from the table: "BasicChoices" using primary key columns */
  BasicChoices_by_pk?: Maybe<BasicChoices>;
  /** fetch data from the table in a streaming manner: "BasicChoices" */
  BasicChoices_stream: Array<BasicChoices>;
  /** fetch data from the table: "BasicVote" */
  BasicVote: Array<BasicVote>;
  /** fetch data from the table: "BasicVote" using primary key columns */
  BasicVote_by_pk?: Maybe<BasicVote>;
  /** fetch data from the table in a streaming manner: "BasicVote" */
  BasicVote_stream: Array<BasicVote>;
  /** fetch data from the table: "BatchVote" */
  BatchVote: Array<BatchVote>;
  /** fetch data from the table: "BatchVote" using primary key columns */
  BatchVote_by_pk?: Maybe<BatchVote>;
  /** fetch data from the table in a streaming manner: "BatchVote" */
  BatchVote_stream: Array<BatchVote>;
  /** fetch data from the table: "Factory" */
  Factory: Array<Factory>;
  /** fetch data from the table: "Factory" using primary key columns */
  Factory_by_pk?: Maybe<Factory>;
  /** fetch data from the table in a streaming manner: "Factory" */
  Factory_stream: Array<Factory>;
  /** fetch data from the table: "GGApplication" */
  GGApplication: Array<GgApplication>;
  /** fetch data from the table: "GGApplicationRound" */
  GGApplicationRound: Array<GgApplicationRound>;
  /** fetch data from the table: "GGApplicationRound" using primary key columns */
  GGApplicationRound_by_pk?: Maybe<GgApplicationRound>;
  /** fetch data from the table in a streaming manner: "GGApplicationRound" */
  GGApplicationRound_stream: Array<GgApplicationRound>;
  /** fetch data from the table: "GGApplicationVote" */
  GGApplicationVote: Array<GgApplicationVote>;
  /** fetch data from the table: "GGApplicationVote" using primary key columns */
  GGApplicationVote_by_pk?: Maybe<GgApplicationVote>;
  /** fetch data from the table in a streaming manner: "GGApplicationVote" */
  GGApplicationVote_stream: Array<GgApplicationVote>;
  /** fetch data from the table: "GGApplication" using primary key columns */
  GGApplication_by_pk?: Maybe<GgApplication>;
  /** fetch data from the table in a streaming manner: "GGApplication" */
  GGApplication_stream: Array<GgApplication>;
  /** fetch data from the table: "ModuleClone" */
  ModuleClone: Array<ModuleClone>;
  /** fetch data from the table: "ModuleClone" using primary key columns */
  ModuleClone_by_pk?: Maybe<ModuleClone>;
  /** fetch data from the table in a streaming manner: "ModuleClone" */
  ModuleClone_stream: Array<ModuleClone>;
  /** fetch data from the table: "ModuleTemplate" */
  ModuleTemplate: Array<ModuleTemplate>;
  /** fetch data from the table: "ModuleTemplate" using primary key columns */
  ModuleTemplate_by_pk?: Maybe<ModuleTemplate>;
  /** fetch data from the table in a streaming manner: "ModuleTemplate" */
  ModuleTemplate_stream: Array<ModuleTemplate>;
  /** fetch data from the table: "Params_BaalGate_v0_2_0" */
  Params_BaalGate_v0_2_0: Array<Params_BaalGate_V0_2_0>;
  /** fetch data from the table: "Params_BaalGate_v0_2_0" using primary key columns */
  Params_BaalGate_v0_2_0_by_pk?: Maybe<Params_BaalGate_V0_2_0>;
  /** fetch data from the table in a streaming manner: "Params_BaalGate_v0_2_0" */
  Params_BaalGate_v0_2_0_stream: Array<Params_BaalGate_V0_2_0>;
  /** fetch data from the table: "Params_BaalPoints_v0_2_0" */
  Params_BaalPoints_v0_2_0: Array<Params_BaalPoints_V0_2_0>;
  /** fetch data from the table: "Params_BaalPoints_v0_2_0" using primary key columns */
  Params_BaalPoints_v0_2_0_by_pk?: Maybe<Params_BaalPoints_V0_2_0>;
  /** fetch data from the table in a streaming manner: "Params_BaalPoints_v0_2_0" */
  Params_BaalPoints_v0_2_0_stream: Array<Params_BaalPoints_V0_2_0>;
  /** fetch data from the table: "Params_HAL_v0_1_1" */
  Params_HAL_v0_1_1: Array<Params_Hal_V0_1_1>;
  /** fetch data from the table: "Params_HAL_v0_1_1" using primary key columns */
  Params_HAL_v0_1_1_by_pk?: Maybe<Params_Hal_V0_1_1>;
  /** fetch data from the table in a streaming manner: "Params_HAL_v0_1_1" */
  Params_HAL_v0_1_1_stream: Array<Params_Hal_V0_1_1>;
  /** fetch data from the table: "Params_PrePop_v0_2_0" */
  Params_PrePop_v0_2_0: Array<Params_PrePop_V0_2_0>;
  /** fetch data from the table: "Params_PrePop_v0_2_0" using primary key columns */
  Params_PrePop_v0_2_0_by_pk?: Maybe<Params_PrePop_V0_2_0>;
  /** fetch data from the table in a streaming manner: "Params_PrePop_v0_2_0" */
  Params_PrePop_v0_2_0_stream: Array<Params_PrePop_V0_2_0>;
  /** fetch data from the table: "Params_RubricVotes_v0_1_0" */
  Params_RubricVotes_v0_1_0: Array<Params_RubricVotes_V0_1_0>;
  /** fetch data from the table: "Params_RubricVotes_v0_1_0" using primary key columns */
  Params_RubricVotes_v0_1_0_by_pk?: Maybe<Params_RubricVotes_V0_1_0>;
  /** fetch data from the table in a streaming manner: "Params_RubricVotes_v0_1_0" */
  Params_RubricVotes_v0_1_0_stream: Array<Params_RubricVotes_V0_1_0>;
  /** fetch data from the table: "Params_TimedVotes_v0_2_0" */
  Params_TimedVotes_v0_2_0: Array<Params_TimedVotes_V0_2_0>;
  /** fetch data from the table: "Params_TimedVotes_v0_2_0" using primary key columns */
  Params_TimedVotes_v0_2_0_by_pk?: Maybe<Params_TimedVotes_V0_2_0>;
  /** fetch data from the table in a streaming manner: "Params_TimedVotes_v0_2_0" */
  Params_TimedVotes_v0_2_0_stream: Array<Params_TimedVotes_V0_2_0>;
  /** fetch data from the table: "Round" */
  Round: Array<Round>;
  /** fetch data from the table: "RoundClone" */
  RoundClone: Array<RoundClone>;
  /** fetch data from the table: "RoundClone" using primary key columns */
  RoundClone_by_pk?: Maybe<RoundClone>;
  /** fetch data from the table in a streaming manner: "RoundClone" */
  RoundClone_stream: Array<RoundClone>;
  /** fetch data from the table: "RoundTemplate" */
  RoundTemplate: Array<RoundTemplate>;
  /** fetch data from the table: "RoundTemplate" using primary key columns */
  RoundTemplate_by_pk?: Maybe<RoundTemplate>;
  /** fetch data from the table in a streaming manner: "RoundTemplate" */
  RoundTemplate_stream: Array<RoundTemplate>;
  /** fetch data from the table: "Round" using primary key columns */
  Round_by_pk?: Maybe<Round>;
  /** fetch data from the table in a streaming manner: "Round" */
  Round_stream: Array<Round>;
  /** fetch data from the table: "TX" */
  TX: Array<Tx>;
  /** fetch data from the table: "TX" using primary key columns */
  TX_by_pk?: Maybe<Tx>;
  /** fetch data from the table in a streaming manner: "TX" */
  TX_stream: Array<Tx>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<Chain_Metadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  chain_metadata_stream: Array<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table in a streaming manner: "dynamic_contract_registry" */
  dynamic_contract_registry_stream: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "end_of_block_range_scanned_data" using primary key columns */
  end_of_block_range_scanned_data_by_pk?: Maybe<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table in a streaming manner: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data_stream: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<Event_Sync_State>;
  /** fetch data from the table in a streaming manner: "event_sync_state" */
  event_sync_state_stream: Array<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<Persisted_State>;
  /** fetch data from the table in a streaming manner: "persisted_state" */
  persisted_state_stream: Array<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
  /** fetch data from the table in a streaming manner: "raw_events" */
  raw_events_stream: Array<Raw_Events>;
};


export type Subscription_RootAppDraftArgs = {
  distinct_on?: InputMaybe<Array<AppDraft_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AppDraft_Order_By>>;
  where?: InputMaybe<AppDraft_Bool_Exp>;
};


export type Subscription_RootAppDraft_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAppDraft_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AppDraft_Stream_Cursor_Input>>;
  where?: InputMaybe<AppDraft_Bool_Exp>;
};


export type Subscription_RootAskHausContestArgs = {
  distinct_on?: InputMaybe<Array<AskHausContest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AskHausContest_Order_By>>;
  where?: InputMaybe<AskHausContest_Bool_Exp>;
};


export type Subscription_RootAskHausContest_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAskHausContest_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AskHausContest_Stream_Cursor_Input>>;
  where?: InputMaybe<AskHausContest_Bool_Exp>;
};


export type Subscription_RootAskHausPollArgs = {
  distinct_on?: InputMaybe<Array<AskHausPoll_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<AskHausPoll_Order_By>>;
  where?: InputMaybe<AskHausPoll_Bool_Exp>;
};


export type Subscription_RootAskHausPoll_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootAskHausPoll_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AskHausPoll_Stream_Cursor_Input>>;
  where?: InputMaybe<AskHausPoll_Bool_Exp>;
};


export type Subscription_RootBasicChoiceArgs = {
  distinct_on?: InputMaybe<Array<BasicChoice_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicChoice_Order_By>>;
  where?: InputMaybe<BasicChoice_Bool_Exp>;
};


export type Subscription_RootBasicChoice_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBasicChoice_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BasicChoice_Stream_Cursor_Input>>;
  where?: InputMaybe<BasicChoice_Bool_Exp>;
};


export type Subscription_RootBasicChoicesArgs = {
  distinct_on?: InputMaybe<Array<BasicChoices_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicChoices_Order_By>>;
  where?: InputMaybe<BasicChoices_Bool_Exp>;
};


export type Subscription_RootBasicChoices_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBasicChoices_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BasicChoices_Stream_Cursor_Input>>;
  where?: InputMaybe<BasicChoices_Bool_Exp>;
};


export type Subscription_RootBasicVoteArgs = {
  distinct_on?: InputMaybe<Array<BasicVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BasicVote_Order_By>>;
  where?: InputMaybe<BasicVote_Bool_Exp>;
};


export type Subscription_RootBasicVote_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBasicVote_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BasicVote_Stream_Cursor_Input>>;
  where?: InputMaybe<BasicVote_Bool_Exp>;
};


export type Subscription_RootBatchVoteArgs = {
  distinct_on?: InputMaybe<Array<BatchVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<BatchVote_Order_By>>;
  where?: InputMaybe<BatchVote_Bool_Exp>;
};


export type Subscription_RootBatchVote_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootBatchVote_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<BatchVote_Stream_Cursor_Input>>;
  where?: InputMaybe<BatchVote_Bool_Exp>;
};


export type Subscription_RootFactoryArgs = {
  distinct_on?: InputMaybe<Array<Factory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Factory_Order_By>>;
  where?: InputMaybe<Factory_Bool_Exp>;
};


export type Subscription_RootFactory_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootFactory_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Factory_Stream_Cursor_Input>>;
  where?: InputMaybe<Factory_Bool_Exp>;
};


export type Subscription_RootGgApplicationArgs = {
  distinct_on?: InputMaybe<Array<GgApplication_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GgApplication_Order_By>>;
  where?: InputMaybe<GgApplication_Bool_Exp>;
};


export type Subscription_RootGgApplicationRoundArgs = {
  distinct_on?: InputMaybe<Array<GgApplicationRound_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GgApplicationRound_Order_By>>;
  where?: InputMaybe<GgApplicationRound_Bool_Exp>;
};


export type Subscription_RootGgApplicationRound_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootGgApplicationRound_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<GgApplicationRound_Stream_Cursor_Input>>;
  where?: InputMaybe<GgApplicationRound_Bool_Exp>;
};


export type Subscription_RootGgApplicationVoteArgs = {
  distinct_on?: InputMaybe<Array<GgApplicationVote_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<GgApplicationVote_Order_By>>;
  where?: InputMaybe<GgApplicationVote_Bool_Exp>;
};


export type Subscription_RootGgApplicationVote_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootGgApplicationVote_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<GgApplicationVote_Stream_Cursor_Input>>;
  where?: InputMaybe<GgApplicationVote_Bool_Exp>;
};


export type Subscription_RootGgApplication_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootGgApplication_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<GgApplication_Stream_Cursor_Input>>;
  where?: InputMaybe<GgApplication_Bool_Exp>;
};


export type Subscription_RootModuleCloneArgs = {
  distinct_on?: InputMaybe<Array<ModuleClone_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ModuleClone_Order_By>>;
  where?: InputMaybe<ModuleClone_Bool_Exp>;
};


export type Subscription_RootModuleClone_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootModuleClone_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ModuleClone_Stream_Cursor_Input>>;
  where?: InputMaybe<ModuleClone_Bool_Exp>;
};


export type Subscription_RootModuleTemplateArgs = {
  distinct_on?: InputMaybe<Array<ModuleTemplate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<ModuleTemplate_Order_By>>;
  where?: InputMaybe<ModuleTemplate_Bool_Exp>;
};


export type Subscription_RootModuleTemplate_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootModuleTemplate_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<ModuleTemplate_Stream_Cursor_Input>>;
  where?: InputMaybe<ModuleTemplate_Bool_Exp>;
};


export type Subscription_RootParams_BaalGate_V0_2_0Args = {
  distinct_on?: InputMaybe<Array<Params_BaalGate_V0_2_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_BaalGate_V0_2_0_Order_By>>;
  where?: InputMaybe<Params_BaalGate_V0_2_0_Bool_Exp>;
};


export type Subscription_RootParams_BaalGate_V0_2_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootParams_BaalGate_V0_2_0_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Params_BaalGate_V0_2_0_Stream_Cursor_Input>>;
  where?: InputMaybe<Params_BaalGate_V0_2_0_Bool_Exp>;
};


export type Subscription_RootParams_BaalPoints_V0_2_0Args = {
  distinct_on?: InputMaybe<Array<Params_BaalPoints_V0_2_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_BaalPoints_V0_2_0_Order_By>>;
  where?: InputMaybe<Params_BaalPoints_V0_2_0_Bool_Exp>;
};


export type Subscription_RootParams_BaalPoints_V0_2_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootParams_BaalPoints_V0_2_0_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Params_BaalPoints_V0_2_0_Stream_Cursor_Input>>;
  where?: InputMaybe<Params_BaalPoints_V0_2_0_Bool_Exp>;
};


export type Subscription_RootParams_Hal_V0_1_1Args = {
  distinct_on?: InputMaybe<Array<Params_Hal_V0_1_1_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_Hal_V0_1_1_Order_By>>;
  where?: InputMaybe<Params_Hal_V0_1_1_Bool_Exp>;
};


export type Subscription_RootParams_Hal_V0_1_1_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootParams_Hal_V0_1_1_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Params_Hal_V0_1_1_Stream_Cursor_Input>>;
  where?: InputMaybe<Params_Hal_V0_1_1_Bool_Exp>;
};


export type Subscription_RootParams_PrePop_V0_2_0Args = {
  distinct_on?: InputMaybe<Array<Params_PrePop_V0_2_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_PrePop_V0_2_0_Order_By>>;
  where?: InputMaybe<Params_PrePop_V0_2_0_Bool_Exp>;
};


export type Subscription_RootParams_PrePop_V0_2_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootParams_PrePop_V0_2_0_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Params_PrePop_V0_2_0_Stream_Cursor_Input>>;
  where?: InputMaybe<Params_PrePop_V0_2_0_Bool_Exp>;
};


export type Subscription_RootParams_RubricVotes_V0_1_0Args = {
  distinct_on?: InputMaybe<Array<Params_RubricVotes_V0_1_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_RubricVotes_V0_1_0_Order_By>>;
  where?: InputMaybe<Params_RubricVotes_V0_1_0_Bool_Exp>;
};


export type Subscription_RootParams_RubricVotes_V0_1_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootParams_RubricVotes_V0_1_0_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Params_RubricVotes_V0_1_0_Stream_Cursor_Input>>;
  where?: InputMaybe<Params_RubricVotes_V0_1_0_Bool_Exp>;
};


export type Subscription_RootParams_TimedVotes_V0_2_0Args = {
  distinct_on?: InputMaybe<Array<Params_TimedVotes_V0_2_0_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Params_TimedVotes_V0_2_0_Order_By>>;
  where?: InputMaybe<Params_TimedVotes_V0_2_0_Bool_Exp>;
};


export type Subscription_RootParams_TimedVotes_V0_2_0_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootParams_TimedVotes_V0_2_0_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Params_TimedVotes_V0_2_0_Stream_Cursor_Input>>;
  where?: InputMaybe<Params_TimedVotes_V0_2_0_Bool_Exp>;
};


export type Subscription_RootRoundArgs = {
  distinct_on?: InputMaybe<Array<Round_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Round_Order_By>>;
  where?: InputMaybe<Round_Bool_Exp>;
};


export type Subscription_RootRoundCloneArgs = {
  distinct_on?: InputMaybe<Array<RoundClone_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RoundClone_Order_By>>;
  where?: InputMaybe<RoundClone_Bool_Exp>;
};


export type Subscription_RootRoundClone_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRoundClone_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RoundClone_Stream_Cursor_Input>>;
  where?: InputMaybe<RoundClone_Bool_Exp>;
};


export type Subscription_RootRoundTemplateArgs = {
  distinct_on?: InputMaybe<Array<RoundTemplate_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<RoundTemplate_Order_By>>;
  where?: InputMaybe<RoundTemplate_Bool_Exp>;
};


export type Subscription_RootRoundTemplate_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRoundTemplate_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<RoundTemplate_Stream_Cursor_Input>>;
  where?: InputMaybe<RoundTemplate_Bool_Exp>;
};


export type Subscription_RootRound_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootRound_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Round_Stream_Cursor_Input>>;
  where?: InputMaybe<Round_Bool_Exp>;
};


export type Subscription_RootTxArgs = {
  distinct_on?: InputMaybe<Array<Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tx_Order_By>>;
  where?: InputMaybe<Tx_Bool_Exp>;
};


export type Subscription_RootTx_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootTx_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tx_Stream_Cursor_Input>>;
  where?: InputMaybe<Tx_Bool_Exp>;
};


export type Subscription_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootChain_Metadata_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chain_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_RegistryArgs = {
  distinct_on?: InputMaybe<Array<Dynamic_Contract_Registry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dynamic_Contract_Registry_Order_By>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_Registry_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDynamic_Contract_Registry_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Dynamic_Contract_Registry_Stream_Cursor_Input>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_DataArgs = {
  distinct_on?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Order_By>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_Data_By_PkArgs = {
  block_number: Scalars['Int']['input'];
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_Data_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_StateArgs = {
  distinct_on?: InputMaybe<Array<Event_Sync_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Sync_State_Order_By>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEvent_Sync_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Sync_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootPersisted_StateArgs = {
  distinct_on?: InputMaybe<Array<Persisted_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persisted_State_Order_By>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPersisted_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Persisted_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Subscription_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int']['input'];
};


export type Subscription_RootRaw_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Raw_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

export type DraftFragment = { __typename?: 'AppDraft', id: string, tag: string, userAddress: string, lastUpdated: number, contentProtocol: any, json: string, ipfsHash: string };

export type ApplicationDraftsQueryVariables = Exact<{
  chainId: Scalars['Int']['input'];
}>;


export type ApplicationDraftsQuery = { __typename?: 'query_root', AppDraft: Array<{ __typename?: 'AppDraft', id: string, tag: string, userAddress: string, lastUpdated: number, contentProtocol: any, json: string, ipfsHash: string }> };

export type ApplicationDraftQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ApplicationDraftQuery = { __typename?: 'query_root', AppDraft_by_pk?: { __typename?: 'AppDraft', id: string, tag: string, userAddress: string, lastUpdated: number, contentProtocol: any, json: string, ipfsHash: string } | null };

export type ApplicationDraftsByUserQueryVariables = Exact<{
  userAddress: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
}>;


export type ApplicationDraftsByUserQuery = { __typename?: 'query_root', AppDraft: Array<{ __typename?: 'AppDraft', id: string, tag: string, userAddress: string, lastUpdated: number, contentProtocol: any, json: string, ipfsHash: string }> };

export type VoteFragment = { __typename?: 'GGApplicationVote', id: string, createdAt: number, amount: any, feedback: string, reviewer: string };

export type ApplicationFragment = { __typename?: 'GGApplication', id: string, registrar: string, application: string, validApplication: boolean, amountReviewed: number, postedBy: string, lastUpdated: number, totalVoted: any, votes: Array<{ __typename?: 'GGApplicationVote', id: string, createdAt: number, amount: any, feedback: string, reviewer: string }> };

export type GetApplicationRoundQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetApplicationRoundQuery = { __typename?: 'query_root', GGApplicationRound_by_pk?: { __typename?: 'GGApplicationRound', id: string, createdAt: number, votesParams_id: string, choicesParams_id: string, postedBy: string, rubric: string, validRubric: boolean, applications: Array<{ __typename?: 'GGApplication', id: string, registrar: string, application: string, validApplication: boolean, amountReviewed: number, postedBy: string, lastUpdated: number, totalVoted: any, votes: Array<{ __typename?: 'GGApplicationVote', id: string, createdAt: number, amount: any, feedback: string, reviewer: string }> }> } | null };

export type GetRecentTransactionQueryVariables = Exact<{
  txHash: Scalars['String']['input'];
}>;


export type GetRecentTransactionQuery = { __typename?: 'query_root', TX_by_pk?: { __typename?: 'TX', id: string } | null };

export const DraftFragmentDoc = gql`
    fragment Draft on AppDraft {
  id
  tag
  userAddress
  lastUpdated
  contentProtocol
  json
  ipfsHash
}
    `;
export const VoteFragmentDoc = gql`
    fragment Vote on GGApplicationVote {
  id
  createdAt
  amount
  feedback
  reviewer
}
    `;
export const ApplicationFragmentDoc = gql`
    fragment Application on GGApplication {
  id
  registrar
  application
  validApplication
  amountReviewed
  postedBy
  lastUpdated
  totalVoted
  votes {
    ...Vote
  }
}
    ${VoteFragmentDoc}`;
export const ApplicationDraftsDocument = gql`
    query applicationDrafts($chainId: Int!) {
  AppDraft(where: {chainId: {_eq: $chainId}}) {
    ...Draft
  }
}
    ${DraftFragmentDoc}`;
export const ApplicationDraftDocument = gql`
    query applicationDraft($id: String!) {
  AppDraft_by_pk(id: $id) {
    ...Draft
  }
}
    ${DraftFragmentDoc}`;
export const ApplicationDraftsByUserDocument = gql`
    query applicationDraftsByUser($userAddress: String!, $chainId: Int!) {
  AppDraft(where: {userAddress: {_eq: $userAddress}, chainId: {_eq: $chainId}}) {
    ...Draft
  }
}
    ${DraftFragmentDoc}`;
export const GetApplicationRoundDocument = gql`
    query getApplicationRound($id: String!) {
  GGApplicationRound_by_pk(id: $id) {
    id
    createdAt
    votesParams_id
    choicesParams_id
    postedBy
    rubric
    validRubric
    applications {
      ...Application
    }
  }
}
    ${ApplicationFragmentDoc}`;
export const GetRecentTransactionDocument = gql`
    query getRecentTransaction($txHash: String!) {
  TX_by_pk(id: $txHash) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    applicationDrafts(variables: ApplicationDraftsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ApplicationDraftsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ApplicationDraftsQuery>(ApplicationDraftsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'applicationDrafts', 'query', variables);
    },
    applicationDraft(variables: ApplicationDraftQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ApplicationDraftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ApplicationDraftQuery>(ApplicationDraftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'applicationDraft', 'query', variables);
    },
    applicationDraftsByUser(variables: ApplicationDraftsByUserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ApplicationDraftsByUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ApplicationDraftsByUserQuery>(ApplicationDraftsByUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'applicationDraftsByUser', 'query', variables);
    },
    getApplicationRound(variables: GetApplicationRoundQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetApplicationRoundQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetApplicationRoundQuery>(GetApplicationRoundDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getApplicationRound', 'query', variables);
    },
    getRecentTransaction(variables: GetRecentTransactionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetRecentTransactionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRecentTransactionQuery>(GetRecentTransactionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRecentTransaction', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;