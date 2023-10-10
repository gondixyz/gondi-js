/* eslint-disable import/no-unresolved */
// @ts-nocheck
import {
  adaptViemWallet,
  createClient,
  getClient,
  reservoirChains,
} from "@reservoir0x/reservoir-sdk";
import { Address, Hash, WalletClient } from "viem";

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

export const getCallbackDataForBuyToken = async ({
  wallet,
  collectionContractAddress,
  tokenId,
}: {
  wallet: WalletClient;
  collectionContractAddress: Address;
  tokenId: bigint;
}) => {
  let callbackData: Hash = "0x0";

  try {
    const adaptedWallet = {
      ...adaptViemWallet(wallet),
      transport: undefined,
      handleSendTransactionStep: async (
        _chainId: number,
        stepItem: { data: { data: Hash } }
      ) => {
        callbackData = stepItem.data.data;
        throw new Error("We don't want the tx to continue");
      },
    };

    await getClient()?.actions.buyToken({
      items: [
        {
          token: `${collectionContractAddress}:${tokenId}`,
          quantity: 1,
        },
      ],
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

  return callbackData as Hash;
};
