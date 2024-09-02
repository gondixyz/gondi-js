import { ApolloClient } from '@apollo/client/core/index.js';
import { Wallet } from '../contracts';
export declare const apolloClient: (wallet: Wallet) => ApolloClient<import("@apollo/client/core/index.js").NormalizedCacheObject>;
