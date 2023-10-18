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
  generateMatchOrdersCallbackData,
  SeaportOrder,
  WETH_CONTRACT_ADDRESS,
} from "./utils";

export class Reservoir {
  baseApiUrl: string;
  mainnetClient: PublicClient;

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
      .then(({ orders }) => orders[0]);
  }

  async getBid({ orderId }: { orderId: Hash }) {
    return fetch(
      `${this.baseApiUrl}/orders/bids/v6?ids=${orderId}&includeRawData=true`
    )
      .then((res) => res.json() as Promise<{ orders: unknown[] }>)
      .then(({ orders }) => orders[0]);
  }

  async getCallbackDataForBuyToken({
    wallet,
    collectionContractAddress,
    tokenId,
    price,
    exactOrderSource,
  }: {
    wallet: Wallet;
    collectionContractAddress: string;
    tokenId: bigint;
    price: bigint;
    exactOrderSource?: string;
  }) {
    const { adaptedWallet, txData } = adaptWalletToCaptureTxData(wallet);

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

    const { orderId, callbackData, signature } = txData.current;

    if (orderId === zeroHash) {
      throw new Error(`No available offer for price ${price}`);
    }

    if (signature !== zeroHash) {
      const apiOrder = await this.getAsk({ orderId });

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
    exactOrderSource,
  }: {
    wallet: Wallet;
    collectionContractAddress: Address;
    tokenId: bigint;
    price: bigint;
    exactOrderSource?: string;
  }) {
    const { adaptedWallet, txData } = adaptWalletToCaptureTxData(wallet);

    const erc721 = getContract({
      abi: erc721ABI,
      address: collectionContractAddress,
      publicClient: this.mainnetClient,
    });

    // We override the taker address, since reservoir requires it to be the real owner
    // This is to make this sdk method testeable without having to mock the whole reservoir sdk
    // On production, owner will be the taker eitherway
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
          taker: owner,
        },
      });
    } catch (e) {
      // We ignore the error thrown by the handleSendTransactionStep inside the adapted wallet
    }

    const { orderId, callbackData, signature } = txData.current;

    if (orderId === zeroHash) {
      throw new Error(`No available offer for price ${price}`);
    }

    const apiOrder = await this.getBid({ orderId });

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
