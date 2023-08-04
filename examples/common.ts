import * as dotenv from "dotenv";
import { Gondi } from "@gondi/sdk";
import { Address, createWalletClient, http, isHex, zeroAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";

dotenv.config();

const RPC = process.env.RPC_URL;

if (!RPC) throw new Error("RPC_URL is not set");

export const localChain = {
  id: 31337,
  name: "local",
  network: "localhost",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [RPC],
    },
    public: {
      http: [RPC],
    },
  },
};

export const secret = "0".repeat(64);
export const transport = http(localChain.rpcUrls.default.http[0]);
export const testTokenId = 10n;
export const testCollection = {
  slug: process.env.TEST_COLLECTION_SLUG as unknown as string,
  address: process.env.TEST_COLLECTION_ADDRESS as unknown as Address,
};

export const testCurrency = process.env
  .TEST_PRINCIPAL_CURRENCY as unknown as Address;

if (!process.env.TEST_WALLETS) {
  throw new Error(
    "TEST_WALLETS not provided, please provide comma separated list"
  );
}
export const wallets = process.env.TEST_WALLETS.split(",").map((privateKey) => {
  if (!isHex(privateKey)) throw new Error("invalid private keys");
  return createWalletClient({
    account: privateKeyToAccount(privateKey as unknown as Address),
    transport,
    chain: localChain,
  });
});

if (wallets.length < 3) throw new Error("not enough wallets, need 3");

export const users = wallets.map((wallet) => new Gondi({ wallet }));

export const testCollectionId = await users[0].collectionId(testCollection);
export const testNftId = await users[0].nftId({
  ...testCollection,
  tokenId: testTokenId,
});

const offerInput = {
  principalAddress: testCurrency,
  principalAmount: 1_000_000_000_000_000_000n,
  capacity: 1_000_000_000_000_000_000n,
  fee: 0n,
  aprBps: 100n,
  expirationTime: 1714841411n,
  duration: 1294967295n,
  requiresLiquidation: false,
  borrowerAddress: zeroAddress,
};

export const testCollectionOfferInput = {
  ...offerInput,
  collectionId: testCollectionId,
};

export const testSingleNftOfferInput = {
  ...offerInput,
  nftId: testNftId,
};

for (const user of users) {
  const approveToken = await user.approveToken(testCurrency);
  await approveToken.waitTxInBlock();
  const approveNFT = await user.approveNFTForAll(testCollection.address);
  await approveNFT.waitTxInBlock();
}
