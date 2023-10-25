import {
  createClient,
  getClient,
  // @ts-ignore
  // eslint-disable-next-line import/no-unresolved
} from "@reservoir0x/reservoir-sdk";
import {
  Address,
  createPublicClient,
  getContract,
  Hash,
  http,
  PublicClient,
} from "viem";
import { mainnet } from "viem/chains";

import { Wallet, zeroHash } from "@/blockchain";
import { erc721ABI } from "@/generated/blockchain/v5";

import {
  adaptWalletToCaptureTxData,
  ETH_CONTRACT_ADDRESS,
  generateExpectedCurrencyPriceObject,
  generateMatchOrdersExecutionData,
  getExecutionData,
  SeaportAskOrBid,
  WETH_CONTRACT_ADDRESS,
} from "./utils";

export class Reservoir {
  baseApiUrl: string;
  mainnetClient: PublicClient;
  wallet: Wallet;

  constructor({
    baseApiUrl = "https://api.reservoir.tools",
    apiKey,
    infuraApiKey,
    wallet,
  }: {
    baseApiUrl?: string;
    apiKey?: string;
    infuraApiKey?: string;
    wallet: Wallet;
  }) {
    this.baseApiUrl = baseApiUrl;
    this.wallet = wallet;

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

    this.mainnetClient = createPublicClient({
      chain: mainnet,
      transport: http(`https://mainnet.infura.io/v3/${infuraApiKey}`),
    });
  }

  async getAsk({ orderId }: { orderId: Hash }) {
    return fetch(
      `${this.baseApiUrl}/orders/asks/v5?ids=${orderId}&includeRawData=true`
    )
      .then((res) => res.json() as Promise<{ orders: unknown[] }>)
      .then(({ orders }) => orders[0] as SeaportAskOrBid);
  }

  async getBid({ orderId }: { orderId: Hash }) {
    return fetch(
      `${this.baseApiUrl}/orders/bids/v6?ids=${orderId}&includeRawData=true`
    )
      .then((res) => res.json() as Promise<{ orders: unknown[] }>)
      .then(({ orders }) => orders[0] as SeaportAskOrBid);
  }

  async getExecutionDataForBuyToken({
    collectionContractAddress,
    tokenId,
    price,
    exactOrderSource,
  }: {
    collectionContractAddress: string;
    tokenId: bigint;
    price: bigint;
    exactOrderSource?: string;
  }) {
    const { adaptedWallet, txData } = adaptWalletToCaptureTxData(this.wallet);

    try {
      await getClient()?.actions.buyToken({
        items: [
          {
            token: `${collectionContractAddress}:${tokenId}`,
            quantity: 1,
            exactOrderSource,
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

    const { orderId, to, callbackData, value, signature } = txData;

    if (orderId === zeroHash) {
      throw new Error(`No available offer for price ${price}`);
    }

    const apiOrder = await this.getAsk({ orderId });

    if (signature !== zeroHash) {
      // Seaport order -- we can save a tx by using matchOrders method from the seaport contract
      return generateMatchOrdersExecutionData({
        wallet: this.wallet,
        askOrBid: apiOrder,
        signature,
      });
    }

    return {
      callbackData: getExecutionData({ module: to, data: callbackData, value }),
      value,
      isSeaportCall: false,
    };
  }

  async getCallbackDataForSellToken({
    collectionContractAddress,
    tokenId,
    price,
    exactOrderSource,
    leverageAddress,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    price: bigint;
    exactOrderSource: string;
    leverageAddress: Address;
  }) {
    const { adaptedWallet, txData } = adaptWalletToCaptureTxData(this.wallet);

    const erc721 = getContract({
      abi: erc721ABI,
      address: collectionContractAddress,
      publicClient: this.mainnetClient,
    });

    const owner = await erc721.read.ownerOf([tokenId]);

    try {
      await getClient()?.actions.acceptOffer({
        items: [
          {
            token: `${collectionContractAddress}:${tokenId}`,
            quantity: 1,
            exactOrderSource,
          },
        ],
        expectedPrice: generateExpectedCurrencyPriceObject(
          price,
          WETH_CONTRACT_ADDRESS
        ),
        wallet: adaptedWallet,
        onProgress: () => null,
        precheck: false,
        options: {
          excludeEOA: true,
          // For opensea orders ONLY, the taker needs to be the real owner of the NFT
          // Since we will be generating matchOrders callbackData for the seaport contract, there is no problem in setting the taker
          // to the real owner, just to get the order id from this
          // For other order sources, the taker needs to be the leverage contract, since it's the contract that will execute the tx
          taker: exactOrderSource === 'opensea.io' ? owner : leverageAddress,
        },
      });
    } catch (e) {
      // We ignore the error thrown by the handleSendTransactionStep inside the adapted wallet
    }

    const { orderId, to, callbackData, signature } = txData;

    if (orderId === zeroHash) {
      throw new Error(`No available offer for price ${price}`);
    }

    const apiOrder = await this.getBid({ orderId });

    if (signature !== zeroHash) {
      // Seaport order -- we can save a tx by using matchOrders method from the seaport contract
      return generateMatchOrdersExecutionData({
        wallet: this.wallet,
        askOrBid: apiOrder,
        signature,
        side: "bid",
      });
    }

    return {
      callbackData: getExecutionData({
        module: to,
        data: callbackData,
        value: BigInt(apiOrder.price.netAmount.raw),
      }),
      value: BigInt(apiOrder.price.netAmount.raw),
      isSeaportCall: false,
    };
  }
}
