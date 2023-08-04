import {
  ApolloClient,
  MutationOptions,
  OperationVariables,
  QueryOptions,
} from "@apollo/client/core";
import { DocumentNode } from "graphql";

import { getSdk, Requester } from "@generated/graphql";

export type ApolloRequesterOptions<V, R> =
  | Omit<QueryOptions<V>, "variables" | "query">
  | Omit<MutationOptions<R, V>, "variables" | "mutation">;

const validDocDefOps = ["mutation", "query", "subscription"];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getSdkApollo<C>(client: ApolloClient<C>) {
  const requester: Requester = async <R, V>(
    doc: DocumentNode,
    variables?: V,
    options?: ApolloRequesterOptions<OperationVariables, R>
  ): Promise<R> => {
    options = {
      ...options,
      context: {
        ...options?.context,
        clientName: "lending",
      },
    };
    // Valid document should contain *single* query or mutation unless it's has a fragment
    if (
      doc.definitions.filter(
        (d) =>
          d.kind === "OperationDefinition" &&
          validDocDefOps.includes(d.operation)
      ).length !== 1
    ) {
      throw new Error(
        "DocumentNode passed to Apollo Client must contain single query or mutation"
      );
    }

    const definition = doc.definitions[0];

    // Valid document should contain *OperationDefinition*
    if (definition.kind !== "OperationDefinition") {
      throw new Error(
        "DocumentNode passed to Apollo Client must contain single query or mutation"
      );
    }

    switch (definition.operation) {
      case "mutation": {
        const response = await client.mutate({
          mutation: doc,
          variables: variables as unknown as OperationVariables,
          ...options,
          fetchPolicy: "no-cache",
        });

        if (response.errors) {
          throw new Error(JSON.stringify(response.errors));
        }

        if (response.data === undefined || response.data === null) {
          throw new Error("No data presented in the GraphQL response");
        }

        return response.data;
      }
      case "query": {
        const response = await client.query({
          query: doc,
          variables: variables as unknown as OperationVariables,
          ...options,
        });

        if (response.errors) {
          throw new Error(JSON.stringify(response.errors));
        }

        if (response.data === undefined || response.data === null) {
          throw new Error("No data presented in the GraphQL response");
        }

        return response.data;
      }
      case "subscription": {
        throw new Error(
          "Subscription requests through SDK interface are not supported"
        );
      }
      default:
        throw new Error("Operation not supported");
    }
  };

  return getSdk(requester);
}

export type Sdk = ReturnType<typeof getSdkApollo>;
