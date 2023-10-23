// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { adaptViemWallet } from "@reservoir0x/reservoir-sdk";
import {
  Address,
  decodeFunctionData,
  encodeAbiParameters,
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

// We don't have this abi in the generated files
export const EXECUTION_INFO_ABI = [
  {
    name: "ExecutionInfo",
    type: "tuple",
    components: [
      { name: "module", type: "address" },
      { name: "data", type: "bytes" },
      { name: "value", type: "uint256" },
    ],
  },
] as const;

export const getExecutionData = ({
  module,
  data,
  value,
}: {
  module: Address;
  data: Hash;
  value: bigint;
}) => encodeAbiParameters(EXECUTION_INFO_ABI, [{ module, data, value }]);

export const adaptWalletToCaptureTxData = (wallet: Wallet) => {
  // Here we will store the tx data we want to capture
  const txData = {
    orderId: zeroHash,
    callbackData: zeroHash,
    to: zeroAddress as Address,
    value: 0n,
    signature: zeroHash,
  };

  const viemWallet = adaptViemWallet(wallet);

  const adaptedWallet = {
    ...viemWallet,
    transport: undefined,
    handleSendTransactionStep: async (
      _chainId: number,
      stepItem: {
        data: { data: Hash; to: Address; value: bigint };
        orderIds: Hash[];
      },
    ) => {
      txData.orderId = stepItem.orderIds[0];
      txData.to = stepItem.data.to;
      txData.callbackData = stepItem.data.data;
      txData.value = stepItem.data.value;
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
          txData.signature = functionData.args[0].signature;
        }
      } catch {
        // We ignore the error if the tx is not a seaport tx
      }

      // We throw the error to stop the tx, we will do it inside the Leverage contract
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

export const generateMatchOrdersExecutionData = async ({
  wallet,
  askOrBid,
  signature,
  side = "ask",
}: {
  wallet: Wallet;
  askOrBid: SeaportAskOrBid;
  signature: Hash;
  side?: "ask" | "bid";
}) => {
  const order = {
    parameters: buildOrderParameters(askOrBid.rawData),
    signature: askOrBid.rawData.mockedSignature ?? signature,
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

  // When we are buying the nft, we need to send the total amount of the consideration in ETH
  // When we are selling the nft, we need to **receive** the netAmount of WETH
  const total =
    side === "ask"
      ? order.parameters.consideration.reduce(
          (acc, consid) =>
            acc + (consid.itemType === 0 ? BigInt(consid.startAmount) : 0n),
          0n
        )
      : BigInt(askOrBid.price.netAmount.raw);

  return {
    callbackData: getExecutionData({
      module: SEAPORT_CONTRACT_ADDRESS,
      data: matchOrdersCallbackData,
      value: total,
    }),
    value: total,
    isSeaportCall: true,
  };
};
