// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { adaptViemWallet } from "@reservoir0x/reservoir-sdk";
import {
  Address,
  Chain,
  createPublicClient,
  createTransport,
  decodeFunctionData,
  encodeFunctionData,
  Hash,
  zeroAddress,
} from "viem";

import { Wallet, zeroHash } from "@/blockchain";
import { seaportABI } from "@/generated/blockchain/seaport";
import { millisToSeconds } from "@/utils";

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
  mockedSignature?: Hash;
}

export interface SeaportOrderParameter extends SeaportOrder {
  totalOriginalConsiderationItems: bigint;
}

export const ETH_CONTRACT_ADDRESS = zeroAddress;

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
    startTime: BigInt(millisToSeconds(Date.now())),
    endTime: 9999999999n,
    zoneHash: zeroHash,
    salt: 0n,
    conduitKey: zeroHash,
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
    OrderParameters: [
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
      { name: "totalOriginalConsiderationItems", type: "uint256" },
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
    primaryType: "OrderParameters",
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
  return [
    {
      offerComponents: [
        {
          orderIndex: 0n,
          itemIndex: 0n,
        },
      ],
      considerationComponents: [
        {
          orderIndex: 1n,
          itemIndex: 0n,
        },
      ],
    },
    {
      offerComponents: order.consideration.map((_, index) => ({
        orderIndex: 1n,
        itemIndex: BigInt(index),
      })),
      considerationComponents: order.consideration.map((_, index) => ({
        orderIndex: 0n,
        itemIndex: BigInt(index),
      })),
    },
  ];
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

  console.log("ORDER: ", order);

  console.log("INVERSE ORDER: ", inverseOrder);

  console.log("FULFILLMENTS: ", fulfillments[0], fulfillments[1]);

  try {
    const client = createPublicClient({
      transport: ({ chain: _chain }: { chain?: Chain }) =>
        createTransport(wallet.transport),
    });

    const pepe = await client.simulateContract({
      abi: seaportABI,
      functionName: "matchOrders",
      args: [[order, inverseOrder], fulfillments],
      address: SEAPORT_CONTRACT_ADDRESS,
    });
    console.log(pepe);
  } catch (e: any) {
    console.log('ERROR', e);
  }

  const matchOrdersCallbackData = encodeFunctionData({
    abi: seaportABI,
    functionName: "matchOrders",
    args: [[order, inverseOrder], fulfillments],
  });

  return matchOrdersCallbackData;
};
