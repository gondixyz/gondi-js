import { Address } from 'viem';

import { zeroHash } from '@/blockchain';
import { max, sumBigInt } from '@/utils/number';

import { FulfillmentDataResponse, isFulfillAdvancedOrder, isMatchAdvancedOrders } from './types';

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
    let functionArgs = [];
    let fee = 0n;
    if (isMatchAdvancedOrders(transaction)) {
      const inputData = transaction.input_data;

      // Opensea response may return to use a conduit
      // We change to null conduit key to use seaport for allowances
      for (const order of inputData.orders) {
        // We assume that our orders are the ones without signature
        if (order['signature'] === '0x') {
          order['parameters']['conduitKey'] = zeroHash;
        }
      }
      functionArgs = [
        inputData.orders,
        inputData.criteriaResolvers,
        inputData.fulfillments,
        inputData.recipient,
      ];
    } else if (isFulfillAdvancedOrder(transaction)) {
      const inputData = transaction.input_data;
      fee = sumBigInt(
        ...inputData.advancedOrder.parameters.consideration
          .filter((consideration) => consideration.itemType === 1)
          .map((consideration) =>
            max(BigInt(consideration.startAmount), BigInt(consideration.endAmount)),
          ),
      );
      functionArgs = [
        inputData.advancedOrder,
        inputData.criteriaResolvers,
        zeroHash, // Null conduit key means the fulfiller uses the seaport contract for allowances
        inputData.recipient,
      ];
    } else {
      throw new Error(`Invalid function name: ${transaction.function}`);
    }

    return {
      eventName: 'OrderFulfilled',
      functionName,
      functionArgs,
      to: transaction.to,
      value: transaction.value,
      fee,
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
