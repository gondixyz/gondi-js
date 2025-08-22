import { Gondi } from 'gondi';
import { Address, getContract } from 'viem';

import {
  approveNFT,
  approveToken,
  testNftCollateralAddress,
  testSingleNftOfferInput,
  users,
} from '../common';
import erc721AbiWithMint from './erc721withMint';

// This script will mint and emit loans to the blockchain
// We will emit N loans per currency on each contract
// We will do this on M collections
// Therefore we will mint (#Contracts * #Currencies * N) NFTs on each collection

const CHROMIES = '0x059edd72cd353df5106d2b9cc5ab83a52287ac3a' as const;
const MONKES = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d' as const;
const AZUKI = '0xed5af388653567af2f388e6224dc7c4b3241c544' as const;

const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as const;
const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' as const;

type SomeCollection = typeof CHROMIES | typeof MONKES | typeof AZUKI;

const COLLECTION_TOKEN_ID_BASE = {
  [CHROMIES]: 0,
  [MONKES]: 0,
  [AZUKI]: 0,
} as const;

const COLLECTION_FLOOR_PRICE_ETH = {
  [CHROMIES]: 5.5,
  [MONKES]: 16,
  [AZUKI]: 4.2,
};

const COLLECTION_ADDRESSES = [CHROMIES, MONKES, AZUKI];
const CURRENCIES = [WETH, USDC];
const ETH_TO_CURRENCY = {
  [WETH]: 10 ** 18,
  [USDC]: 3148 * 10 ** 6,
};

const APR_BPS = 1700;

const CONTRACTS = [
  process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? '',
  process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '',
  process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '',
].filter(Boolean) as Address[];
const NFT_AMOUNT = 5;
const TOKEN_ID_TO_MINT_FROM = 1000;

const TWO_HOURS = 2 * 60 * 60;

const genRandomFloatBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const mintNftsFromCollection = async (collection: SomeCollection) => {
  const adminUser = users[0];
  const publicClient = adminUser.bcClient;
  const walletClient = adminUser.wallet;

  const erc721 = getContract({
    abi: erc721AbiWithMint,
    publicClient,
    walletClient,
    address: collection,
  });

  const tokensToMint = await Promise.all(
    new Array(CURRENCIES.length * CONTRACTS.length * NFT_AMOUNT).fill(0).map(async (_, i) => {
      const tokenIdToMint = BigInt(
        COLLECTION_TOKEN_ID_BASE[collection] + TOKEN_ID_TO_MINT_FROM + i,
      );
      try {
        await erc721.read.ownerOf([tokenIdToMint]);
      } catch {
        return [tokenIdToMint, true] as const;
      }
      return [tokenIdToMint, false] as const;
    }),
  );

  for (const [tokenIdToMint, toMint] of tokensToMint) {
    if (!toMint) continue;
    try {
      const txhash = await erc721.write.mint([adminUser.wallet.account.address, tokenIdToMint]);
      await publicClient.waitForTransactionReceipt({ hash: txhash });
      console.log('Minted NFT', tokenIdToMint.toString() + ' on collection ' + collection);
    } catch (e) {
      // TODO: handle error
      console.log(
        'Error while minting NFT ' +
          tokenIdToMint.toString() +
          ' on collection ' +
          collection +
          ': ' +
          e.shortMessage,
      );
    }
  }
};

const makeOffers = async (collection: SomeCollection) => {
  const nftIds = await Promise.all(
    new Array(CURRENCIES.length * CONTRACTS.length * NFT_AMOUNT).fill('').map((_, i) => {
      const tokenId = BigInt(COLLECTION_TOKEN_ID_BASE[collection] + TOKEN_ID_TO_MINT_FROM + i);
      return users[0].nftId({ contractAddress: collection, tokenId });
    }),
  );

  // make all offers
  const emitLoanArgs: Parameters<Gondi['emitLoan']>[0][] = [];
  for (let i = 0; i < CONTRACTS.length; i++) {
    for (let j = 0; j < CURRENCIES.length; j++) {
      for (let k = 0; k < NFT_AMOUNT; k++) {
        const baseIndex = i * CURRENCIES.length * NFT_AMOUNT + j * NFT_AMOUNT;
        const principalAmount = BigInt(
          Math.floor(
            (COLLECTION_FLOOR_PRICE_ETH[collection] - genRandomFloatBetween(0, 2)) *
              ETH_TO_CURRENCY[CURRENCIES[j]],
          ),
        );
        const signedOffer = await users[1]._makeSingleNftOffer(
          {
            ...testSingleNftOfferInput,
            principalAddress: CURRENCIES[j],
            nftId: nftIds[baseIndex + k],
            duration: BigInt(TWO_HOURS),
            fee: 0n,
            principalAmount,
            capacity: principalAmount,
            aprBps: BigInt(APR_BPS - Math.floor(genRandomFloatBetween(0, 500))),
          },
          CONTRACTS[i],
        );
        emitLoanArgs.push({
          offerExecution: users[1].offerExecutionFromOffers([signedOffer]),
          nftCollateralAddress: testNftCollateralAddress,
          duration: signedOffer.duration,
          tokenId: BigInt(
            COLLECTION_TOKEN_ID_BASE[collection] + TOKEN_ID_TO_MINT_FROM + baseIndex + k,
          ),
        });
      }
    }
  }

  return emitLoanArgs;
};

// Mint NFTs
for (const collection of COLLECTION_ADDRESSES) {
  await mintNftsFromCollection(collection);
  console.log('Minted NFTs on collection ' + collection);
}

// Approve NFTs and Currencies
for (const contract of CONTRACTS) {
  for (const collection of COLLECTION_ADDRESSES) {
    await approveNFT(users[0], contract, collection, 'ERC721');
  }
  for (const currency of CURRENCIES) {
    await approveToken(users[1], contract, currency);
  }
}
console.log('Approved NFTs and Currencies');

const emitLoanArgs: Parameters<Gondi['emitLoan']>[0][] = [];

// Make offers
for (const collection of COLLECTION_ADDRESSES) {
  emitLoanArgs.push(...(await makeOffers(collection)));
  console.log('Made offers on collection ' + collection);
}

// Emit loans
for (const emitLoanArg of emitLoanArgs) {
  const emitLoan = await users[0].emitLoan(emitLoanArg);
  await emitLoan.waitTxInBlock();
}

console.log('Emit loans done');
