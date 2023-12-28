import {
  createClient,
  paths,
  ReservoirClient,
} from "@reservoir0x/reservoir-sdk";
import {
  Address,
  createPublicClient,
  encodeAbiParameters,
  encodeFunctionData,
  getContract,
  Hash,
  http,
  PublicClient,
  zeroAddress,
} from "viem";
import { mainnet } from "viem/chains";

import { Wallet, zeroHash } from "@/blockchain";
import { CryptoPunks } from "@/contracts/CryptoPunks";
import { Seaport } from "@/contracts/Seaport";
import { getApiKeys, getContracts, getCurrencies } from "@/deploys";
import {
  InterruptedCryptoPunksSendTransactionStepError,
  InterruptedGenericSendTransactionStepError,
  InterruptedSeaportSendTransactionStepError,
} from "@/errors";
import { seaportABI } from "@/generated/blockchain/seaport";
import { erc721ABI } from "@/generated/blockchain/v5";

import {
  adaptWalletToCaptureTxData,
  isOpensea,
  SeaportAskOrBid,
} from "./utils";

export class Reservoir {
  baseApiUrl: string;
  mainnetClient: PublicClient;
  wallet: Wallet;
  Seaport: Seaport;
  CryptoPunks: CryptoPunks;
  client: ReservoirClient;

  // We don't have this abi in the generated files
  EXECUTION_INFO_ABI = [
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

  constructor({
    baseApiUrl = "https://api.reservoir.tools",
    wallet,
    Seaport,
    CryptoPunks,
  }: {
    baseApiUrl?: string;
    wallet: Wallet;
    Seaport: Seaport;
    CryptoPunks: CryptoPunks;
  }) {
    this.baseApiUrl = baseApiUrl;
    this.wallet = wallet;
    this.Seaport = Seaport;
    this.CryptoPunks = CryptoPunks;

    const { reservoirApiKey, infuraApiKey } = getApiKeys();

    this.client = createClient({
      chains: [
        {
          id: wallet.chain.id,
          name: wallet.chain.name,
          baseApiUrl,
          active: true,
        },
      ],
      apiKey: reservoirApiKey,
      source: "gondi.xyz",
    });

    this.mainnetClient = createPublicClient({
      chain: mainnet,
      transport: http(`https://mainnet.infura.io/v3/${infuraApiKey}`),
    });
  }

  async getAsk({ orderId }: { orderId: string }) {
    return fetch(
      `${this.baseApiUrl}/orders/asks/v5?ids=${orderId}&includeRawData=true`
    )
      .then(
        (res) =>
          res.json() as Promise<{
            orders: paths["/orders/asks/v5"]["get"]["responses"]["200"]["schema"]["orders"];
          }>
      )
      .then(({ orders }) => {
        if (!orders) {
          throw new Error(`Order ${orderId} is not available anymore`);
        }
        return orders[0];
      });
  }

  async getBid({ orderId }: { orderId: string }) {
    return fetch(
      `${this.baseApiUrl}/orders/bids/v6?ids=${orderId}&includeRawData=true`
    )
      .then(
        (res) =>
          res.json() as Promise<{
            orders: paths["/orders/bids/v6"]["get"]["responses"]["200"]["schema"]["orders"];
          }>
      )
      .then(({ orders }) => {
        if (!orders) {
          throw new Error(`Order ${orderId} is not available anymore`);
        }
        return orders[0];
      });
  }

  generateExpectedCurrencyPriceObject(price: bigint, currencyAddress: Address) {
    return {
      [currencyAddress]: {
        raw: price,
        currencyAddress,
        currencyDecimals: 18,
      },
    };
  }

  encodeExecutionData({
    module,
    data,
    value,
  }: {
    module: Address;
    data: Hash;
    value: bigint;
  }) {
    return encodeAbiParameters(this.EXECUTION_INFO_ABI, [
      { module, data, value },
    ]);
  }

  async generateMatchOrdersExecutionData({
    askOrBid,
    signature,
    side = "ask",
  }: {
    askOrBid: SeaportAskOrBid;
    signature: Hash;
    side?: "ask" | "bid";
  }) {
    const order = {
      parameters: {
        ...askOrBid.rawData,
        totalOriginalConsiderationItems: BigInt(
          askOrBid.rawData.consideration.length
        ),
      },
      signature,
    };

    const inverseOrderParameters = await this.Seaport.generateInverseOrder(
      order.parameters
    );

    const inverseOrder = {
      parameters: inverseOrderParameters,
      signature: await this.Seaport.signOrder(inverseOrderParameters),
    };

    const fulfillments = this.Seaport.generateFulfillmentsForOrderAndInverse(
      order.parameters
    );

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
              acc + (consid.itemType === 0 ? BigInt(consid.endAmount) : 0n),
            0n
          )
        : BigInt(askOrBid.price.netAmount.raw);

    return {
      callbackData: this.encodeExecutionData({
        module: this.Seaport.address,
        data: matchOrdersCallbackData,
        value: total,
      }),
      value: total,
      isSeaportCall: true,
    };
  }

  async generateFulfillOrderExecutionData({
    askOrBid,
    signature,
    tokenId,
  }: {
    askOrBid: SeaportAskOrBid;
    signature: Hash;
    tokenId: bigint;
  }) {
    const order = {
      parameters: {
        ...askOrBid.rawData,
        totalOriginalConsiderationItems: BigInt(
          askOrBid.rawData.consideration.length
        ),
      },
      numerator: 1n,
      denominator: 1n,
      signature,
      extraData: "0x" as Hash,
    };

    const nftWithCriteriaIndex = order.parameters.consideration.findIndex(
      (consid) => consid.itemType === 4
    );

    const fulfillOrderCallbackData = encodeFunctionData({
      abi: seaportABI,
      functionName: "fulfillAdvancedOrder",
      args: [
        order,
        nftWithCriteriaIndex !== -1
          ? [
              {
                orderIndex: 0n,
                side: 1, // consideration
                index: BigInt(nftWithCriteriaIndex),
                identifier: tokenId,
                criteriaProof: [],
              },
            ]
          : [],
        zeroHash,
        zeroAddress,
      ],
    });

    // When we are selling the nft, we need to **receive** the netAmount of WETH
    const total = BigInt(askOrBid.price.netAmount.raw);

    return {
      callbackData: this.encodeExecutionData({
        module: this.Seaport.address,
        data: fulfillOrderCallbackData,
        value: total,
      }),
      value: total,
      isSeaportCall: true,
    };
  }

  async buyTokens(
    tokensToBuy: {
      collectionContractAddress: Address;
      tokenId: bigint;
      price: bigint;
      orderSource: string;
    }[]
  ) {
    const { ETH_ADDRESS } = getCurrencies();
    const totalPrice = tokensToBuy.reduce((acc, cur) => acc + cur.price, 0n);
    return this.client?.actions.buyToken({
      items: tokensToBuy.map((token) => ({
        token: `${token.collectionContractAddress}:${token.tokenId}`,
        quantity: 1,
        exactOrderSource: token.orderSource,
      })),
      expectedPrice: this.generateExpectedCurrencyPriceObject(
        totalPrice,
        ETH_ADDRESS
      ),
      wallet: this.wallet,
      onProgress: () => null,
      precheck: false,
      options: {
        excludeEOA: true,
        skipBalanceCheck: true,
      },
    });
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
    exactOrderSource: string;
  }) {
    const adaptedWallet = adaptWalletToCaptureTxData(
      this.wallet,
      exactOrderSource
    );
    const { ETH_ADDRESS } = getCurrencies();

    try {
      await this.client?.actions.buyToken({
        items: [
          {
            token: `${collectionContractAddress}:${tokenId}`,
            quantity: 1,
            exactOrderSource,
          },
        ],
        expectedPrice: this.generateExpectedCurrencyPriceObject(
          price,
          ETH_ADDRESS
        ),
        wallet: adaptedWallet,
        onProgress: () => null,
        precheck: false,
        options: {
          excludeEOA: true,
          skipBalanceCheck: true,
        },
      });
      throw new Error(
        "This should never happen since we will throw inside the wallet tx"
      );
    } catch (err) {
      if (err instanceof InterruptedSeaportSendTransactionStepError) {
        // We can save a tx by using match orders execution data
        const { orderId, signature } = err;

        const apiOrder = await this.getAsk({ orderId });

        return this.generateMatchOrdersExecutionData({
          askOrBid: apiOrder as unknown as SeaportAskOrBid,
          signature,
        });
      } else if (
        err instanceof InterruptedCryptoPunksSendTransactionStepError
      ) {
        // We need to build the calldata since reservoir doesn't directly generate it
        const { value } = err;
        const callData = await this.CryptoPunks.encodeBuyPunk(tokenId);

        return {
          callbackData: this.encodeExecutionData({
            module: this.CryptoPunks.address,
            data: callData,
            value,
          }),
          value,
          isSeaportCall: false,
        };
      } else if (err instanceof InterruptedGenericSendTransactionStepError) {
        // We use the same callbackData that we get from reservoir
        const { to, callbackData, value } = err;
        return {
          callbackData: this.encodeExecutionData({
            module: to,
            data: callbackData,
            value,
          }),
          value,
          isSeaportCall: false,
        };
      } else {
        throw new Error(`No available offer for price ${price}`);
      }
    }
  }

  async getCallbackDataForSellToken({
    collectionContractAddress,
    tokenId,
    price,
    exactOrderSource,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    price: bigint;
    exactOrderSource: string;
  }) {
    const adaptedWallet = adaptWalletToCaptureTxData(
      this.wallet,
      exactOrderSource
    );
    const { WETH_ADDRESS } = getCurrencies();
    const { LeverageAddress } = getContracts(this.wallet.chain);

    const erc721 = getContract({
      abi: erc721ABI,
      address: collectionContractAddress,
      publicClient: this.mainnetClient,
    });

    const owner = await erc721.read.ownerOf([tokenId]);

    try {
      await this.client?.actions.acceptOffer({
        items: [
          {
            token: `${collectionContractAddress}:${tokenId}`,
            quantity: 1,
            exactOrderSource,
          },
        ],
        expectedPrice: this.generateExpectedCurrencyPriceObject(
          price,
          WETH_ADDRESS
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
          taker: isOpensea(exactOrderSource) ? owner : LeverageAddress,
        },
      });
      throw new Error(
        "This should never happen since we will throw inside the wallet tx"
      );
    } catch (err) {
      if (err instanceof InterruptedSeaportSendTransactionStepError) {
        // We can save a tx by using match orders execution data
        const { orderId, signature } = err;

        const apiOrder = await this.getBid({ orderId });

        return this.generateFulfillOrderExecutionData({
          askOrBid: apiOrder as unknown as SeaportAskOrBid,
          signature,
          tokenId,
        });
      } else if (err instanceof InterruptedGenericSendTransactionStepError) {
        // We use the same callbackData that we get from reservoir
        const { orderId, to, callbackData } = err;
        const apiOrder = await this.getBid({ orderId });
        return {
          callbackData: this.encodeExecutionData({
            module: to,
            data: callbackData,
            value: BigInt(apiOrder.price?.netAmount?.raw ?? 0n),
          }),
          value: BigInt(apiOrder.price?.netAmount?.raw ?? 0n),
          isSeaportCall: false,
        };
      } else {
        throw new Error(`No available offer for price ${price}`);
      }
    }
  }
}
