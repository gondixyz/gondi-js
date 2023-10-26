// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { adaptViemWallet } from "@reservoir0x/reservoir-sdk";
import { Address, decodeFunctionData, Hash, zeroAddress } from "viem";

import { Wallet } from "@/blockchain";
import { InterruptedSendTransactionStepError } from "@/errors";
import { seaportABI } from "@/generated/blockchain/seaport";

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

export const adaptWalletToCaptureTxData = (wallet: Wallet) => {
  const viemWallet = adaptViemWallet(wallet);

  const adaptedWallet = {
    ...viemWallet,
    transport: undefined,
    handleSendTransactionStep: async (
      _chainId: number,
      stepItem: {
        data: { data: Hash; to: Address; value: bigint };
        orderIds: Hash[];
      }
    ) => {
      const orderId = stepItem.orderIds[0];
      const to = stepItem.data.to;
      const callbackData = stepItem.data.data;
      const value = stepItem.data.value;
      let signature: Address = zeroAddress;
      let isSeaportCall = true;
      try {
        // We try to decode the function data to know if it's a seaport contract call
        // If it is, we can save a tx by using matchOrders method from the seaport contract
        // If it's not, we use the same tx data
        const functionData = decodeFunctionData({
          abi: seaportABI,
          data: stepItem.data.data,
        });

        // seaport contract calls have a signature in the argument
        if (
          functionData.args &&
          functionData.args[0] &&
          typeof functionData.args[0] === "object" &&
          "signature" in functionData.args[0]
        ) {
          signature = functionData.args[0].signature;
        }
      } catch {
        // We ignore the error if the tx is not a seaport tx
        isSeaportCall = false;
      }

      // We throw the error to stop the tx, we will do it inside the Leverage contract
      throw new InterruptedSendTransactionStepError({
        orderId,
        to,
        callbackData,
        value,
        signature,
        isSeaportCall,
      });
    },
  };
  return adaptedWallet;
};
