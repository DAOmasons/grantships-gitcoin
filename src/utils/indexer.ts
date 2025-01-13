import { getSdk } from '../generated/graphql';
import { GraphQLClient } from 'graphql-request';

export const sdk = getSdk(
  new GraphQLClient('http://localhost:8080/v1/graphql')
);
