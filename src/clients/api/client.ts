import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core/index.js';
import { setContext } from '@apollo/client/link/context/index.js';
import { withScalars } from 'apollo-link-scalars';
import { buildSchema } from 'graphql';

import { lendingApiDomain } from '@/clients/api';
import { Credential, SessionToken } from '@/clients/api/auth';
import { Wallet } from '@/clients/contracts';
import lendingSchemaText from '@/generated/graphql/lending-schema.graphql';

const apiUrl = () => `${lendingApiDomain()}/graphql`;
const lendingSchema = buildSchema(lendingSchemaText);

Object.assign(BigInt.prototype, {
  toJSON() {
    return this.toString();
  },
});

const typesMap = {
  datetime: {
    serialize: (parsed: unknown) => {
      if (parsed instanceof Date) return parsed.toISOString();
      return null;
    },
    parseValue: (raw: unknown) => {
      if (typeof raw === 'string') return new Date(raw);
      if (raw instanceof Date) return raw;
      return null;
    },
  },
  BigInt: {
    serialize: (parsed: unknown) => {
      if (typeof parsed === 'bigint') return String(parsed);
      return null;
    },
    parseValue: (raw: unknown) => {
      if (typeof raw === 'string') return BigInt(raw);
      return null;
    },
  },
  DateTime: {
    serialize: (parsed: unknown) => {
      if (parsed instanceof Date) return parsed.toISOString();
      return null;
    },
    parseValue: (raw: unknown) => {
      if (typeof raw === 'string') return new Date(raw);
      if (raw instanceof Date) return raw;
      return null;
    },
  },
};

const authLink = (credential: Credential) =>
  setContext(async (request) => {
    return await credential.authorizeRequest(request);
  });

const link = ApolloLink.from([
  withScalars({ schema: lendingSchema, typesMap }),
  createHttpLink({
    uri: ({ operationName }) => `${apiUrl()}?operation=${encodeURIComponent(operationName)}`,
  }),
]);

export const apolloClient = (wallet: Wallet) => {
  const credential = new SessionToken({ wallet });
  return new ApolloClient({
    link: ApolloLink.from([authLink(credential), link]),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
      mutate: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
        nextFetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
    },
    cache: new InMemoryCache({}),
  });
};
