import * as dotenv from 'dotenv';
import { Gondi } from 'gondi';
import { Address, createWalletClient, http, isAddress, isHex, zeroAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

dotenv.config();

const RPC = process.env.RPC_URL;
const MULTI_SOURCE_LOAN_CONTRACT_V6 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? '';
const POOL_WETH_ADDRESS = process.env.POOL_WETH ?? '';
const POOL_USDC_ADDRESS = process.env.POOL_USDC ?? '';
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

export const MAX_NUMBER =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

if (!isAddress(MULTI_SOURCE_LOAN_CONTRACT_V6)) {
  throw new Error('invalid MULTI_SOURCE_LOAN_CONTRACT_V6 address');
}

if (!isAddress(POOL_WETH_ADDRESS)) {
  throw new Error('invalid POOL_WETH address');
}
if (!isAddress(POOL_USDC_ADDRESS)) {
  throw new Error('invalid POOL_USDC address');
}

if (!RPC) throw new Error('RPC_URL is not set');

export const localChain = {
  id: 31337,
  name: 'local',
  network: 'localhost',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
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

export const secret = '0'.repeat(64);
export const transport = http(localChain.rpcUrls.default.http[0]);
export const testTokenId = BigInt(process.env.TEST_TOKEN_ID ?? 0);
export const test721Collection = {
  contractAddress: process.env.TEST_COLLECTION as unknown as Address,
};
export const zeroHash = '0x' + '0'.repeat(64);
export const testCurrency = process.env.TEST_PRINCIPAL_CURRENCY as unknown as Address;

if (!testCurrency) {
  throw new Error('TEST_PRINCIPAL_CURRENCY not provided, please provide address');
}

if (!process.env.TEST_WALLETS) {
  throw new Error('TEST_WALLETS not provided, please provide comma separated list');
}
export const wallets: Gondi['wallet'][] = process.env.TEST_WALLETS.split(',').map((privateKey) => {
  if (!isHex(privateKey)) throw new Error('invalid private keys');
  return createWalletClient({
    account: privateKeyToAccount(privateKey as unknown as Address),
    transport,
    chain: localChain,
  });
});

if (wallets.length < 3) throw new Error('not enough wallets, need 3');

export const users = wallets.map(
  (wallet) =>
    new Gondi({
      wallet,
    }),
);

export const testCollectionId = (await users[0].collectionId(test721Collection))[0];
export const testNftId = await users[0].nftId({
  ...test721Collection,
  tokenId: testTokenId,
});

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const expirationTimeSeconds = Math.ceil(tomorrow.getTime() / 1_000);

const offerInput = {
  principalAddress: testCurrency,
  principalAmount: 1_000_000_000_000_000_000n,
  capacity: 1_000_000_000_000_000_000n,
  fee: 100n,
  aprBps: 100n,
  expirationTime: BigInt(expirationTimeSeconds),
  duration: 1294967295n,
  borrowerAddress: zeroAddress,
  maxSeniorRepayment: 0n,
};

export const testCollectionOfferInput = {
  ...offerInput,
  collectionId: testCollectionId,
};

export const testSingleNftOfferInput = {
  ...offerInput,
  nftId: testNftId,
};

export const approveToken = async (
  user: Gondi,
  to: Address,
  currency: Address | undefined = testCurrency,
) => {
  const isEnoughApproved = await user.isApprovedToken({
    tokenAddress: currency,
    amount: MAX_NUMBER / 2n,
    to,
  });
  if (!isEnoughApproved) {
    const approveToken = await user.approveToken({
      tokenAddress: currency,
      to,
    });
    await approveToken.waitTxInBlock();
  }
};

export const approveNFT = async (
  user: Gondi,
  to: Address,
  collection: Address,
  standard: 'ERC721' | 'ERC1155',
) => {
  const isApprovedAlready = await user.isApprovedNFTForAll({
    nftAddress: collection,
    standard,
    to,
  });
  if (!isApprovedAlready) {
    const approveNFT = await user.approveNFTForAll({
      nftAddress: collection,
      standard,
      to,
    });
    await approveNFT.waitTxInBlock();
  }
};

const approveForUser = async (user: Gondi, to: Address) => {
  await approveToken(user, to, WETH);
  await approveToken(user, to, USDC);
  await approveNFT(user, to, test721Collection.contractAddress, 'ERC721');
};

const SEAPORT_CONTRACT_ADDRESS = '0x0000000000000068F116a894984e2DB1123eB395';
const CONTRACTS = [
  MULTI_SOURCE_LOAN_CONTRACT_V6,
  process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '',
  process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '',
  process.env.PURCHASE_BUNDLER_ADDRESS ?? '',
  SEAPORT_CONTRACT_ADDRESS,
  POOL_WETH_ADDRESS,
  POOL_USDC_ADDRESS,
];

export const setAllowances = async () => {
  for (const [i, user] of users.entries()) {
    console.log(`approving tokens for user ${i}`);
    for (let k = 0; k < CONTRACTS.length; k++) {
      const contract = CONTRACTS[k];
      if (isAddress(contract)) {
        await approveForUser(user, contract);
      }
    }
  }
};

// Assuming MSL contract default: 3 days (seconds)
export const AUCTION_DEFAULT_DURATION = 3n * 24n * 60n * 60n;

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateBlock = async () => await sleep(6000);

const POOL_WETH = POOL_WETH_ADDRESS;
const POOL_USDC = POOL_USDC_ADDRESS;

export { POOL_WETH, POOL_USDC };
