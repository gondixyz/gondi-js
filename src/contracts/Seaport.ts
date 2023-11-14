import {
  Account,
  Address,
  Chain,
  Transport,
  WalletClient,
  zeroAddress,
} from "viem";

import { filterLogs, zeroHash } from "@/blockchain";
import { getContracts, getCurrencies } from "@/deploys";
import { seaportABI } from "@/generated/blockchain/seaport";
import { SaleOfferInfoFragment } from "@/generated/graphql";
import {
  Fulfillment,
  SeaportOrder,
  SeaportOrderParameter,
} from "@/reservoir/utils";
import { millisToSeconds } from "@/utils";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class Seaport extends Contract<typeof seaportABI> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { SeaportAddress } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: SeaportAddress,
      abi: seaportABI,
    });
  }

  async getOrderHash(order: SeaportOrder) {
    return this.contract.read.getOrderHash([order]);
  }

  async getCounter() {
    return await (this.contract.read.getCounter([this.wallet.account.address])) + 1n;
  }

  async signOrder(order: SeaportOrderParameter) {
    const domain = {
      name: "Seaport",
      version: "1.5",
      chainId: this.wallet.chain?.id,
      verifyingContract: this.address,
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

    return this.wallet.signTypedData({
      domain,
      types,
      primaryType: "OrderComponents",
      message: order,
    });
  }

  async generateOrderFromSaleOffer({
    collectionContractAddress,
    tokenId,
    price,
    expirationTime,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    price: bigint;
    expirationTime: bigint;
  }) {
    const { WETH_ADDRESS } = getCurrencies();

    const orderParameters: SeaportOrderParameter = {
      offerer: this.wallet.account.address,
      zone: zeroAddress,
      offer: [
        {
          itemType: 1,
          token: WETH_ADDRESS,
          identifierOrCriteria: 0n,
          startAmount: price,
          endAmount: price,
        },
      ],
      consideration: [
        {
          itemType: 2,
          token: collectionContractAddress,
          identifierOrCriteria: tokenId,
          startAmount: 1n,
          endAmount: 1n,
          recipient: this.wallet.account.address,
        },
      ],
      orderType: 0,
      startTime: BigInt(Math.floor(millisToSeconds(Date.now()))),
      endTime: expirationTime,
      zoneHash: zeroHash,
      salt: 0n,
      conduitKey: zeroHash,
      counter: await this.getCounter(),
      totalOriginalConsiderationItems: 1n,
    };

    const signature = await this.signOrder(orderParameters);

    return {
      parameters: orderParameters,
      signature,
    };
  }

  async recoverOrderFromNativeBid(nativeBid: SaleOfferInfoFragment) {
    const { WETH_ADDRESS } = getCurrencies();

    const orderParameters: SeaportOrderParameter = {
      offerer: nativeBid.maker,
      zone: zeroAddress,
      offer: [
        {
          itemType: 1,
          token: WETH_ADDRESS,
          identifierOrCriteria: 0n,
          startAmount: nativeBid.netAmount,
          endAmount: nativeBid.netAmount,
        },
      ],
      consideration: [
        {
          itemType: 2,
          token:
            nativeBid.nft.collection?.contractData?.contractAddress ??
            zeroAddress,
          identifierOrCriteria: nativeBid.nft.tokenId,
          startAmount: 1n,
          endAmount: 1n,
          recipient: nativeBid.maker,
        },
      ],
      orderType: 0,
      startTime: BigInt(
        Math.floor(millisToSeconds(nativeBid.startTime.getTime()))
      ),
      endTime: BigInt(
        Math.floor(
          millisToSeconds(nativeBid.expiration?.getTime() ?? Date.now())
        )
      ),
      zoneHash: zeroHash,
      salt: 0n,
      conduitKey: zeroHash,
      counter: await this.getCounter(),
      totalOriginalConsiderationItems: 1n,
    };

    return orderParameters;
  }

  async generateInverseOrder(
    order: SeaportOrder
  ): Promise<SeaportOrderParameter> {
    return {
      offerer: this.wallet.account?.address ?? zeroAddress,
      zone: zeroAddress,
      offer: order.consideration,
      consideration: order.offer.map((offer) => ({
        ...offer,
        recipient: this.wallet.account?.address ?? zeroAddress,
      })),
      orderType: 0,
      startTime: order.startTime,
      endTime: order.endTime,
      zoneHash: zeroHash,
      salt: 0n,
      conduitKey: zeroHash,
      counter: await this.getCounter(),
      totalOriginalConsiderationItems: BigInt(order.offer.length),
    };
  }

  generateFulfillmentsForOrderAndInverse(order: SeaportOrderParameter) {
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
  }

  async cancel({ orderComponents }: { orderComponents: SeaportOrder }) {
    const txHash = await this.safeContractWrite.cancel([[orderComponents]]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.OrderCancelled({
          offerer: orderComponents.offerer,
        });
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Order not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }
}
