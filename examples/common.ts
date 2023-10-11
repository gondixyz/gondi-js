import * as dotenv from "dotenv";
import { Gondi } from "gondi";
import {
  Address,
  createWalletClient,
  http,
  isAddress,
  isHex,
  zeroAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

dotenv.config();

const RPC = process.env.RPC_URL;
const MULTI_SOURCE_LOAN_CONTRACT = process.env.MULTI_SOURCE_LOAN_CONTRACT ?? "";

if (!isAddress(MULTI_SOURCE_LOAN_CONTRACT)) {
  throw new Error("invalid multi_source_loan_contract address");
}

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
export const testTokenId = BigInt(process.env.TEST_TOKEN_ID ?? 0);
export const testCollection = {
  contractAddress: process.env.TEST_COLLECTION as unknown as Address,
};
export const zeroHash = "0x" + "0".repeat(64);
export const testCurrency = process.env
  .TEST_PRINCIPAL_CURRENCY as unknown as Address;

if (!testCurrency) {
  throw new Error(
    "TEST_PRINCIPAL_CURRENCY not provided, please provide address"
  );
}

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

export const testCollectionId = (
  await users[0].collectionId(testCollection)
)[0];
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
  const approveToken = await user.approveToken({
    tokenAddress: testCurrency,
    contract: MULTI_SOURCE_LOAN_CONTRACT,
  });
  await approveToken.waitTxInBlock();
  const approveNFT = await user.approveNFTForAll({
    nftAddress: testCollection.contractAddress,
    contract: MULTI_SOURCE_LOAN_CONTRACT,
  });
  await approveNFT.waitTxInBlock();
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
