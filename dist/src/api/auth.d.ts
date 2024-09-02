import { ApolloClient, GraphQLRequest } from '@apollo/client/core/index.js';
import { Wallet } from '../contracts';
export type Credential = SessionToken;
export declare const getAuthClient: () => Promise<ApolloClient<import("@apollo/client/core/index.js").NormalizedCacheObject>>;
export declare const signIn: ({ wallet }: {
    wallet: Wallet;
}) => Promise<any>;
export declare class SessionToken {
    token?: string;
    wallet: Wallet;
    constructor({ token, wallet }: {
        token?: string;
        wallet: Wallet;
    });
    authorizeRequest(request: GraphQLRequest): Promise<{
        headers: {
            authorization: string;
        };
        query: import("graphql/language/ast").DocumentNode;
        variables?: Record<string, any> | undefined;
        operationName?: string | undefined;
        context?: import("@apollo/client/core/types").DefaultContext | undefined;
        extensions?: Record<string, any> | undefined;
    }>;
    private signIn;
}
