import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  gql,
  GraphQLRequest,
  InMemoryCache,
} from "@apollo/client/core";
import { SiweMessage } from "siwe";

import { Wallet } from "./blockchain";
import { authApiUrl } from "./const";

export type Credential = SessionToken;

export const getAuthClient = async () => {
  const link = ApolloLink.from([
    createHttpLink({
      uri: ({ operationName }) =>
        `${authApiUrl}?operation=${encodeURIComponent(operationName)}`,
    }) as unknown as ApolloLink,
  ]);
  return new ApolloClient({
    link: ApolloLink.from([link]),
    defaultOptions: {
      query: {
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
    cache: new InMemoryCache({}),
  });
};

export const signIn = async ({ wallet }: { wallet: Wallet }) => {
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
        blockchain: "ETHEREUM",
      },
    },
  });

  if (errors) throw new Error(errors.map((e) => e.message).join(", "));

  const nonce = data?.generateSignInNonce;

  const message = new SiweMessage({
    domain: "gondi.xyz",
    address: wallet.account.address,
    chainId: wallet.chain.id,
    statement: "Sign in with Ethereum to the app.",
    uri: authApiUrl(),
    version: "1",
    nonce,
  });

  const signature = await wallet.signMessage({
    message: message.prepareMessage(),
  });

  const { data: siweData, errors: siweErrors } = await authClient.mutate({
    mutation: gql`
      mutation SignInWithEthereum($siweInput: SiweInput!) {
        signInWithEthereum(siweInput: $siweInput)
      }
    `,
    variables: {
      siweInput: { message: message.prepareMessage(), signature: signature },
    },
  });

  if (siweErrors) throw new Error(siweErrors.map((e) => e.message).join(", "));

  const accessToken = siweData?.signInWithEthereum;
  if (!accessToken)
    throw new Error("Couldn't generate Access Token, please try again later");
  return accessToken;
};

export class SessionToken {
  token?: string;
  wallet: Wallet;

  constructor({ token, wallet }: { token?: string; wallet: Wallet }) {
    this.token = token;
    this.wallet = wallet;
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
  private async signIn() {
    if (!this.token) {
      this.token = await signIn({ wallet: this.wallet });
    }
  }
}
