/* eslint-disable import/no-unresolved */
// @ts-nocheck
import {
  adaptViemWallet,
  createClient,
  getClient,
  reservoirChains,
} from "@reservoir0x/reservoir-sdk";
import { Address, Hash, WalletClient, zeroAddress } from "viem";

import { zeroHash } from "./blockchain";

const ETH_CONTRACT_ADDRESS = zeroAddress;

const generateExpectedCurrencyPriceObject = (
  price: bigint,
  currencyAddress: Address
) => ({
  [currencyAddress]: {
    raw: price,
    currencyAddress,
    currencyDecimals: 18,
  },
});

createClient({
  chains: [
    {
      ...reservoirChains.mainnet,
      active: true,
    },
  ],
  // TODO: add api key
  source: "gondi.xyz",
});

const adaptWalletToGetCallbackData = (wallet: WalletClient) => {
  const callbackDataRef = { current: zeroHash };
  const adaptedWallet = {
    ...adaptViemWallet(wallet),
    transport: undefined,
    handleSendTransactionStep: async (
      _chainId: number,
      stepItem: { data: { data: Hash } }
    ) => {
      callbackDataRef.current = stepItem.data.data;
      throw new Error("We don't want the tx to continue");
    },
  };
  return { adaptedWallet, callbackDataRef };
};

export const getCallbackDataForBuyToken = async ({
  wallet,
  collectionContractAddress,
  tokenId,
  price,
}: {
  wallet: WalletClient;
  collectionContractAddress: Address;
  tokenId: bigint;
  price: bigint;
}) => {
  const { adaptedWallet, callbackDataRef } =
    adaptWalletToGetCallbackData(wallet);

  try {
    await getClient()?.actions.buyToken({
      items: [
        {
          token: `${collectionContractAddress}:${tokenId}`,
          quantity: 1,
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
  } catch {
    // We ignore the error thrown by the handleSendTransactionStep
  }

  return callbackDataRef.current;
};

export const getCallbackDataForSellToken = async ({
  wallet,
  collectionContractAddress,
  tokenId,
  price,
}: {
  wallet: WalletClient;
  collectionContractAddress: Address;
  tokenId: bigint;
  price: bigint;
}) => {
  const { adaptedWallet, callbackDataRef } =
    adaptWalletToGetCallbackData(wallet);

  try {
    await getClient()?.actions.acceptOffer({
      items: [
        {
          token: `${collectionContractAddress}:${tokenId}`,
          quantity: 1,
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
  } catch {
    // We ignore the error thrown by the handleSendTransactionStep
  }

  return callbackDataRef.current;
};
