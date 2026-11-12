import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  GraphQLRequest,
  InMemoryCache,
} from '@apollo/client/core/index.js';
import { gql } from 'graphql-tag';

import { apiDomain } from '@/clients/api';
import { buildSiweMessage } from '@/clients/api/siwe';
import { Wallet } from '@/clients/contracts';

export type Credential = SessionToken;

const authApiUrl = () => `${apiDomain()}/graphql`;

export const getAuthClient = async () => {
  const link = ApolloLink.from([
    createHttpLink({
      uri: ({ operationName }) => `${authApiUrl()}?operation=${encodeURIComponent(operationName)}`,
    }) as unknown as ApolloLink,
  ]);
  return new ApolloClient({
    link: ApolloLink.from([link]),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    cache: new InMemoryCache({}),
  });
};

export const signIn = async ({ wallet, issuedAt }: { wallet: Wallet; issuedAt?: string }) => {
  const authClient = await getAuthClient();

  const { data, errors } = await authClient.mutate({
    mutation: gql`
      mutation GenerateSignInNonce($nonceInput: NonceInput!) {
        generateSignInNonce(nonceInput: $nonceInput)
      }
    `,
    variables: {
      nonceInput: {
        walletAddress: wallet.account.address,
        blockchain: 'ETHEREUM',
      },
    },
  });

  if (errors) throw new Error(errors.map((e) => e.message).join(', '));

  const nonce = data?.generateSignInNonce;

  const message = buildSiweMessage({
    domain: 'gondi.xyz',
    address: wallet.account.address,
    chainId: wallet.chain.id,
    statement: 'Sign in with Ethereum to the app.',
    uri: authApiUrl(),
    version: '1',
    nonce,
    issuedAt,
  });

  const signature = await wallet.signMessage({
    message,
  });

  const { data: siweData, errors: siweErrors } = await authClient.mutate({
    mutation: gql`
      mutation SignInWithEthereum($siweInput: SiweInput!) {
        signInWithEthereum(siweInput: $siweInput)
      }
    `,
    variables: {
      siweInput: { message, signature },
    },
  });

  if (siweErrors) throw new Error(siweErrors.map((e) => e.message).join(', '));

  const accessToken = siweData?.signInWithEthereum;
  if (!accessToken) throw new Error("Couldn't generate Access Token, please try again later");
  return accessToken;
};

/** How long before its `exp` a session token is replaced, to absorb clock skew with the API. */
const SESSION_EXPIRY_LEEWAY_SECONDS = 60 * 60;

/**
 * The `exp` claim of a session token, in seconds since the epoch, or `undefined` when the token
 * is not a JWT carrying one.
 *
 * IMPLEMENTATION NOTE: `signInWithEthereum` returns a JWT whose payload carries `exp`. A JWT is three base64url segments joined by
 * dots, the second being the JSON claims (https://datatracker.ietf.org/doc/html/rfc7519#section-3),
 * and `exp` is a NumericDate in seconds (https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4).
 * The signature is not checked: the API does that, and the SDK only needs to know when to renew.
 */
const sessionTokenExpiry = (token: string): number | undefined => {
  try {
    const payload = token.split('.')[1] ?? '';
    const claims = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof claims.exp === 'number' ? claims.exp : undefined;
  } catch {
    return undefined;
  }
};

/**
 * The wallet's API session: signs in on the first request and reuses the token until it is about
 * to expire, then signs in again.
 *
 * Requests that start before a sign-in finishes wait for that same sign-in rather than starting
 * their own: every sign-in asks the API for a fresh nonce, which replaces the previous one, so
 * concurrent sign-ins reject all but the last with `SIWE_ERROR`.
 *
 * The token's own `exp` decides when it is renewed. The API answers an expired token as if no
 * token was sent, with an `UNAUTHORIZED` GraphQL error rather than an HTTP 401, and raises that
 * same error for calls the wallet is not allowed to make, so re-signing on it would prompt the
 * wallet on every forbidden call.
 */
export class SessionToken {
  token?: string;
  wallet: Wallet;
  private readonly requestToken: typeof signIn;
  private pendingSignIn?: Promise<string>;

  constructor({
    token,
    wallet,
    requestToken = signIn,
  }: {
    token?: string;
    wallet: Wallet;
    requestToken?: typeof signIn;
  }) {
    this.token = token;
    this.wallet = wallet;
    this.requestToken = requestToken;
  }

  async authorizeRequest(request: GraphQLRequest) {
    await this.signIn();
    const { headers = {} }: { headers?: object } = request.context || {
      headers: {},
    };
    return {
      ...request,
      headers: { ...headers, authorization: `Bearer ${this.token}` },
    };
  }
  private hasLiveToken() {
    if (!this.token) return false;
    const expiry = sessionTokenExpiry(this.token);
    return expiry === undefined || Date.now() / 1000 < expiry - SESSION_EXPIRY_LEEWAY_SECONDS;
  }

  private async signIn() {
    if (this.hasLiveToken()) return;
    this.pendingSignIn ??= this.requestToken({ wallet: this.wallet }).finally(() => {
      this.pendingSignIn = undefined;
    });
    this.token = await this.pendingSignIn;
  }
}
