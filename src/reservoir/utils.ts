import { adaptViemWallet } from '@reservoir0x/reservoir-sdk';
import { Address, decodeFunctionData, Hash, zeroAddress } from 'viem';

import { Wallet } from '@/blockchain';
import { MSL_V5_TX_HASH } from '@/deploys';
import {
  InterruptedCryptoPunksSendTransactionStepError,
  InterruptedGenericSendTransactionStepError,
  InterruptedSeaportSendTransactionStepError,
} from '@/errors';
import { seaportABI } from '@/generated/blockchain/seaport';

export interface Offer {
  itemType: number;
  token: Address;
  identifierOrCriteria: bigint;
  startAmount: bigint;
  endAmount: bigint;
}

export interface Consideration extends Offer {
  recipient: Address;
}

export interface SeaportAskOrBid {
  rawData: SeaportOrder;
  price: {
    netAmount: {
      raw: string;
    };
  };
}

export interface SeaportOrder {
  offerer: Address;
  zone: Address;
  offer: Offer[];
  consideration: Consideration[];
  orderType: number;
  startTime: bigint;
  endTime: bigint;
  zoneHash: Hash;
  salt: bigint;
  conduitKey: Hash;
  counter: bigint;
}

export interface SeaportOrderParameter extends SeaportOrder {
  totalOriginalConsiderationItems: bigint;
}

export interface FulfillmentComponent {
  orderIndex: bigint;
  itemIndex: bigint;
}

export interface Fulfillment {
  offerComponents: FulfillmentComponent[];
  considerationComponents: FulfillmentComponent[];
}

export const isOpensea = (orderSource: string) => orderSource === 'opensea.io';
export const isCryptopunks = (orderSource: string) => orderSource === 'cryptopunks.app';
export const isNative = (orderSource: string) => orderSource === 'gondi.xyz';

export const adaptWalletToCaptureTxData = (wallet: Wallet, exactOrderSource: string) => {
  const viemWallet = adaptViemWallet(wallet);

  const adaptedWallet = {
    ...viemWallet,
    transport: undefined,
    handleSendTransactionStep: async (
      _chainId: number,
      stepItem: {
        data: { data: Hash; to: Address; value: string };
        orderIds?: string[];
      },
      step: { id: string },
    ) => {
      if (step.id !== 'sale') {
        console.log(step);
        return MSL_V5_TX_HASH;
      }
      const orderId = stepItem.orderIds?.[0] ?? '';
      const to = stepItem.data.to;
      const callbackData = stepItem.data.data;
      const value = BigInt(stepItem.data.value ?? 0);

      if (isOpensea(exactOrderSource)) {
        const functionData = decodeFunctionData({
          abi: seaportABI,
          data: stepItem.data.data,
        });

        const firstArg = functionData?.args?.[0];

        const signature = Array.isArray(firstArg)
          ? (firstArg[0] as { signature: Hash }).signature
          : typeof firstArg === 'object'
          ? (firstArg as { signature: Hash }).signature
          : zeroAddress;

        throw new InterruptedSeaportSendTransactionStepError({
          orderId,
          to,
          callbackData,
          value,
          signature,
        });
      } else if (isCryptopunks(exactOrderSource)) {
        throw new InterruptedCryptoPunksSendTransactionStepError({
          orderId,
          to,
          callbackData,
          value,
        });
      } else {
        throw new InterruptedGenericSendTransactionStepError({
          orderId,
          to,
          callbackData,
          value,
        });
      }
    },
  };
  return adaptedWallet;
};
