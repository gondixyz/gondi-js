import {
  createClient,
  getClient,
  // @ts-ignore
  // eslint-disable-next-line import/no-unresolved
} from "@reservoir0x/reservoir-sdk";
import { Hash } from "viem";

import { Wallet, zeroHash } from "@/blockchain";

import {
  adaptWalletToCaptureTxData,
  ETH_CONTRACT_ADDRESS,
  generateExpectedCurrencyPriceObject,
  generateMatchOrdersCallbackData,
  SeaportOrder,
} from "./utils";

export class Reservoir {
  baseApiUrl: string;

  constructor({
    baseApiUrl = "https://api.reservoir.tools",
    apiKey,
    wallet,
  }: {
    baseApiUrl?: string;
    apiKey?: string;
    wallet: Wallet;
  }) {
    this.baseApiUrl = baseApiUrl;

    createClient({
      chains: [
        {
          id: wallet.chain.id,
          name: wallet.chain.name,
          baseApiUrl,
          active: true,
        },
      ],
      apiKey,
      source: "gondi.xyz",
    });
  }

  async getOrder({ orderId }: { orderId: Hash }) {
    return fetch(
      `${this.baseApiUrl}/orders/asks/v5?ids=${orderId}&includeRawData=true`
    )
      .then((res) => res.json() as Promise<{ orders: unknown[] }>)
      .then(({ orders }) => orders[0]);
  }

  async getCallbackDataForBuyToken({
    wallet,
    collectionContractAddress,
    tokenId,
    price,
  }: {
    wallet: Wallet;
    collectionContractAddress: string;
    tokenId: bigint;
    price: bigint;
  }) {
    const { adaptedWallet, txData } = adaptWalletToCaptureTxData(wallet);

    try {
      await getClient()?.actions.buyToken({
        items: [
          {
            token: `${collectionContractAddress}:${tokenId}`,
            quantity: 1,
            // exactOrderSource: "opensea.io",
          },
        ],
        expectedPrice: generateExpectedCurrencyPriceObject(
          price,
          ETH_CONTRACT_ADDRESS
        ),
        wallet: adaptedWallet,
        onProgress: () => null,
        precheck: false,
        options: {
          excludeEOA: true,
          skipBalanceCheck: true,
        },
      });
    } catch (e) {
      // We ignore the error thrown by the handleSendTransactionStep inside the adapted wallet
    }

    const { orderId, callbackData, signature } = txData.current;

    if (orderId === zeroHash) {
      throw new Error(`No available offer for price ${price}`);
    }

    if (signature !== zeroHash) {
      const apiOrder = await this.getOrder({ orderId });

      // Seaport order -- we can save a tx by using matchOrders method from the seaport contract
      return await generateMatchOrdersCallbackData({
        wallet,
        rawOrder: (apiOrder as { rawData: SeaportOrder }).rawData,
        signature,
      });
    }

    // TODO: deal with cryptopunks
    return callbackData;
  }

  async getCallbackDataForSellToken({
    wallet,
    collectionContractAddress,
    tokenId,
    price,
  }: {
    wallet: Wallet;
    collectionContractAddress: string;
    tokenId: bigint;
    price: bigint;
  }) {
    const { adaptedWallet, txData } = adaptWalletToCaptureTxData(wallet);

    try {
      await getClient()?.actions.acceptOffer({
        items: [
          {
            token: `${collectionContractAddress}:${tokenId}`,
            quantity: 1,
            // exactOrderSource: "opensea.io",
          },
        ],
        expectedPrice: generateExpectedCurrencyPriceObject(
          price,
          ETH_CONTRACT_ADDRESS
        ),
        wallet: adaptedWallet,
        onProgress: () => null,
        precheck: false,
        options: {
          excludeEOA: true,
          skipBalanceCheck: true,
        },
      });
    } catch (e) {
      // We ignore the error thrown by the handleSendTransactionStep inside the adapted wallet
    }

    const { orderId, callbackData, signature } = txData.current;

    if (orderId === zeroHash) {
      throw new Error(`No available offer for price ${price}`);
    }

    const apiOrder = await this.getOrder({ orderId });

    if (signature !== zeroHash) {
      // Seaport order -- we can save a tx by using matchOrders method from the seaport contract
      return generateMatchOrdersCallbackData({
        wallet,
        rawOrder: (apiOrder as { rawData: SeaportOrder }).rawData,
        signature,
      });
    }

    // TODO: deal with cryptopunks
    return callbackData;
  }
}
