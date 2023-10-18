// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { adaptViemWallet } from "@reservoir0x/reservoir-sdk";
import {
  Address,
  decodeFunctionData,
  encodeFunctionData,
  Hash,
  zeroAddress,
} from "viem";

import { Wallet, zeroHash } from "@/blockchain";
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

export interface SeaportOrder {
  offerer: Address;
  zone: Hash;
  offer: Offer[];
  consideration: Consideration[];
  orderType: number;
  startTime: bigint;
  endTime: bigint;
  zoneHash: Hash;
  salt: bigint;
  conduitKey: Hash;
  counter: bigint;
  mockedSignature?: Hash;
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

export const ETH_CONTRACT_ADDRESS = zeroAddress;
export const WETH_CONTRACT_ADDRESS =
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const SEAPORT_CONTRACT_NAME = "Seaport";
const SEAPORT_VERSION = "1.5";
const SEAPORT_CONTRACT_ADDRESS =
  "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC" as const;

export const adaptWalletToCaptureTxData = (wallet: Wallet) => {
  const txData = {
    current: {
      orderId: zeroHash,
      callbackData: zeroHash,
      signature: zeroHash,
    },
  };

  const viemWallet = adaptViemWallet(wallet);

  const adaptedWallet = {
    ...viemWallet,
    transport: undefined,
    handleSendTransactionStep: async (
      _chainId: number,
      stepItem: { data: { data: Hash }; orderIds: Hash[] }
    ) => {
      txData.current.orderId = stepItem.orderIds[0];
      txData.current.callbackData = stepItem.data.data;
      try {
        // We try to decode the function data to know if it's a seaport contract call
        const functionData = decodeFunctionData({
          abi: seaportABI,
          data: stepItem.data.data,
        });

        if (
          functionData.args &&
          functionData.args[0] &&
          typeof functionData.args[0] === "object" &&
          "signature" in functionData.args[0]
        ) {
          txData.current.signature = functionData.args[0].signature;
        }
      } catch {
        // We ignore the error if the tx is not a seaport tx
      }

      throw new Error("We don't want the tx to continue");
    },
  };
  return { adaptedWallet, txData };
};

export const buildOrderParameters = (
  order: SeaportOrder
): SeaportOrderParameter => {
  return {
    offerer: order.offerer,
    zone: order.zone,
    offer: order.offer,
    consideration: order.consideration,
    orderType: order.orderType,
    startTime: order.startTime,
    endTime: order.endTime,
    zoneHash: order.zoneHash,
    salt: order.salt,
    conduitKey: order.conduitKey,
    counter: order.counter,
    totalOriginalConsiderationItems: BigInt(order.consideration.length),
  };
};

export const generateInverseOrder = (
  wallet: Wallet,
  order: SeaportOrder
): SeaportOrderParameter => {
  return {
    offerer: wallet.account?.address ?? zeroAddress,
    zone: zeroAddress,
    offer: order.consideration,
    consideration: order.offer.map((offer) => ({
      ...offer,
      recipient: wallet.account?.address ?? zeroAddress,
    })),
    orderType: 0,
    startTime: BigInt(Math.floor(Math.random() * 100000)), // to make the order "unique"
    endTime: 9999999999n,
    zoneHash: zeroHash,
    salt: 0n,
    conduitKey: zeroHash,
    counter: 0n,
    totalOriginalConsiderationItems: BigInt(order.offer.length),
  };
};

export const generateSignedOrder = async (
  wallet: Wallet,
  order: SeaportOrderParameter
) => {
  const domain = {
    name: SEAPORT_CONTRACT_NAME,
    version: SEAPORT_VERSION,
    chainId: wallet.chain?.id,
    verifyingContract: SEAPORT_CONTRACT_ADDRESS,
  };
  const types = {
    OrderComponents: [
      { name: "offerer", type: "address" },
      { name: "zone", type: "address" },
      { name: "offer", type: "OfferItem[]" },
      { name: "consideration", type: "ConsiderationItem[]" },
      { name: "orderType", type: "uint8" },
      { name: "startTime", type: "uint256" },
      { name: "endTime", type: "uint256" },
      { name: "zoneHash", type: "bytes32" },
      { name: "salt", type: "uint256" },
      { name: "conduitKey", type: "bytes32" },
      { name: "counter", type: "uint256" },
    ],
    OfferItem: [
      { name: "itemType", type: "uint8" },
      { name: "token", type: "address" },
      { name: "identifierOrCriteria", type: "uint256" },
      { name: "startAmount", type: "uint256" },
      { name: "endAmount", type: "uint256" },
    ],
    ConsiderationItem: [
      { name: "itemType", type: "uint8" },
      { name: "token", type: "address" },
      { name: "identifierOrCriteria", type: "uint256" },
      { name: "startAmount", type: "uint256" },
      { name: "endAmount", type: "uint256" },
      { name: "recipient", type: "address" },
    ],
  } as const;

  const signature = await wallet.signTypedData({
    domain,
    types,
    primaryType: "OrderComponents",
    message: order,
  });

  return { parameters: order, signature };
};

export const generateExpectedCurrencyPriceObject = (
  price: bigint,
  currencyAddress: Address
) => ({
  [currencyAddress]: {
    raw: price,
    currencyAddress,
    currencyDecimals: 18,
  },
});

export const generateFulfillmentsForOrderAndInverse = (
  order: SeaportOrderParameter
) => {
  const fulfillments: Fulfillment[] = [];

  // First, we pair each offer with the consideration from the inverse
  order.offer.forEach((_, index) => {
    fulfillments.push({
      offerComponents: [
        {
          orderIndex: 0n,
          itemIndex: BigInt(index),
        },
      ],
      considerationComponents: [
        {
          orderIndex: 1n,
          itemIndex: BigInt(index),
        },
      ],
    });
  });

  // We then pair each consideration with the offer from the inverse
  order.consideration.forEach((_, index) => {
    fulfillments.push({
      offerComponents: [
        {
          orderIndex: 1n,
          itemIndex: BigInt(index),
        },
      ],
      considerationComponents: [
        {
          orderIndex: 0n,
          itemIndex: BigInt(index),
        },
      ],
    });
  });

  return fulfillments;
};

export const generateMatchOrdersCallbackData = async ({
  wallet,
  rawOrder,
  signature,
}: {
  wallet: Wallet;
  rawOrder: SeaportOrder;
  signature: Hash;
}) => {
  const order = {
    parameters: buildOrderParameters(rawOrder),
    signature: rawOrder.mockedSignature ?? signature,
  };

  const inverseOrder = await generateSignedOrder(
    wallet,
    generateInverseOrder(wallet, order.parameters)
  );

  const fulfillments = generateFulfillmentsForOrderAndInverse(order.parameters);

  const matchOrdersCallbackData = encodeFunctionData({
    abi: seaportABI,
    functionName: "matchOrders",
    args: [[order, inverseOrder], fulfillments],
  });

  // See how to attach the total consideration amount to the callback data
  // const total = order.parameters.consideration.reduce(
  //   (acc, consid) =>
  //     acc + (consid.itemType === 0 ? BigInt(consid.startAmount) : 0n),
  //   0n
  // );

  return matchOrdersCallbackData;
};
