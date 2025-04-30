import { Address } from 'viem';

import { FulfillmentDataResponse } from './types';

type ConstructorArgs = {
  apiUrl?: string;
  apiKey?: string;
};

export class Opensea {
  apiUrl: string;
  apiKey?: string;

  constructor({ apiUrl, apiKey }: ConstructorArgs) {
    this.apiUrl = apiUrl ?? 'https://api.opensea.io/api/v2';
    this.apiKey = apiKey;
  }

  async fulfillOrder({
    hash,
    protocolAddress: protocol_address,
    fulfiller,
    consideration: considerationInput,
  }: {
    hash: string;
    protocolAddress: Address;
    fulfiller: { address: Address };
    consideration?: {
      contract: Address;
      token_id: string;
    };
  }) {
    const consideration = considerationInput
      ? {
          asset_contract_address: considerationInput.contract,
          token_id: considerationInput.token_id,
        }
      : undefined;

    const {
      fulfillment_data: { transaction },
    } = await this.postApi<FulfillmentDataResponse>(`/offers/fulfillment_data`, {
      offer: {
        hash,
        protocol_address,
        chain: 'ethereum',
      },
      fulfiller,
      consideration,
    });

    const functionName = transaction.function.split('(')[0];
    const isMatchAdvancedOrders = functionName === 'matchAdvancedOrders';
    const isFulfillAdvancedOrder = functionName === 'fulfillAdvancedOrder';

    if (!isMatchAdvancedOrders && !isFulfillAdvancedOrder) {
      throw new Error(`Invalid function name: ${functionName}`);
    }

    const functionArgs = isMatchAdvancedOrders
      ? [
          transaction.input_data.orders,
          transaction.input_data.criteriaResolvers,
          transaction.input_data.fulfillments,
          transaction.input_data.recipient,
        ]
      : [
          transaction.input_data.advancedOrder,
          transaction.input_data.criteriaResolvers,
          transaction.input_data.fulfillerConduitKey,
          transaction.input_data.recipient,
        ];

    return {
      eventName: 'OrderFulfilled',
      functionName,
      functionArgs,
      to: transaction.to,
      value: transaction.value,
    };
  }

  private async postApi<T>(path: string, body?: Record<string, unknown>): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey || '',
    };

    const response = await fetch(`${this.apiUrl}/${path}`, {
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`OpenSea API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}
