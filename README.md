# Gondi.js

A JavaScript library for crypto-native lending: borrow, lend & refinance NFTs (non-fungible tokens).

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Headless lender (scripts and AI agents)](#headless-lender-scripts-and-ai-agents)
- [Supported chains and currencies](#supported-chains-and-currencies)
- [Reading lending data](#reading-lending-data)
- [Risks](#risks)
- [Examples](#examples)
- [Need help migrating between versions? Check our Changelog!](./CHANGELOG.md)

## Installation

You can install it via npm:

```bash
npm install --save gondi
# or
yarn add gondi
# or
bun add gondi
```

## Getting Started

To get started, you need to provide a wallet only.

```javascript
import { Gondi } from 'gondi';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...');

const wallet = createWalletClient({
  account: privateKeyToAccount(privateKey),
  transport,
  chain: mainnet,
});
const gondi = new Gondi({ wallet });
```

Typescript types are included in the package.

## Headless lender (scripts and AI agents)

A lender needs no browser: a private key is enough. The first API call signs a Sign-In with
Ethereum message with the wallet (a signature, no gas) and the SDK reuses the session afterwards.
Publishing, listing and hiding offers are API calls; approving the currency and cancelling an
offer are onchain transactions.

```javascript
import { Gondi, OfferStatus } from 'gondi';
import { createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const SECONDS_PER_DAY = 86_400n;

const wallet = createWalletClient({
  account: privateKeyToAccount(process.env.PRIVATE_KEY),
  transport: http(process.env.RPC_URL),
  chain: mainnet,
});
const gondi = new Gondi({ wallet });

// 1. Let the loan contract pull the principal when a borrower takes the offer (onchain, once).
const principalAmount = parseEther('1');
if (!(await gondi.isApprovedToken({ tokenAddress: WETH, amount: principalAmount }))) {
  const approval = await gondi.approveToken({ tokenAddress: WETH }); // Unlimited unless you pass `amount`.
  await approval.waitTxInBlock();
}

// 2. Find the collection to lend against (`gondi.collections({})` pages through all of them).
const collectionId = await gondi.collectionId({ slug: 'pudgypenguins' });

// 3. Sign and publish a collection offer.
const offer = await gondi.makeCollectionOffer({
  collectionId,
  principalAddress: WETH,
  principalAmount,
  capacity: principalAmount, // Total you lend across every loan taken from this offer.
  fee: 0n, // Origination fee, in principal units.
  aprBps: 1_000n, // 10% APR.
  duration: 30n * SECONDS_PER_DAY, // In seconds; see "Loan durations" below.
  expirationTime: BigInt(Math.floor(Date.now() / 1_000)) + SECONDS_PER_DAY, // Valid for one day.
  maxSeniorRepayment: 0n, // 0n: the offer only funds a loan's first (senior) tranche.
});

// 4. List your active offers (pass `cursor` back to read the next page while `hasNextPage`).
const { offers, cursor, hasNextPage } = await gondi.offers({
  filterBy: { lenders: [wallet.account.address], status: [OfferStatus.Active] },
});

// 5. Withdraw it. `hideOffer` only removes it from the API (no gas): the signed offer stays
//    executable onchain until it expires. `cancelOffer` invalidates it onchain.
await gondi.hideOffer({ id: offer.offerId, contractAddress: offer.contractAddress });
const cancellation = await gondi.cancelOffer({
  id: offer.offerId,
  contractAddress: offer.contractAddress,
});
await cancellation.waitTxInBlock();
```

[`examples/headlessLender.ts`](./examples/headlessLender.ts) runs the same flow against the
local chain the other examples use (see [`examples/common.ts`](./examples/common.ts) for the
environment it reads).

API errors are thrown as an `Error` whose message is the JSON of the GraphQL errors.

### Loan durations

`duration` is in seconds and must be a whole number of days: a multiple of 30 days, or one of the
short terms the API accepts (currently 3, 5, 7, 10, 15, 20 or 45 days). Other values fail with
`INVALID_OFFER_DURATION_ERROR`.

## Supported chains and currencies

The SDK picks the contracts from the wallet's chain. Amounts are in the currency's smallest unit.

| Chain            | viem chain  | Chain id | Principal currencies                                                                                               |
| ---------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| Ethereum mainnet | `mainnet`   | 1        | WETH `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`, USDC (6 decimals) `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`  |
| HyperEVM         | `hyperEvm`  | 999      | WHYPE `0x5555555555555555555555555555555555555555`, USDC (6 decimals) `0xb88339CB7199b77E23DB6E890353E22632Ba630f` |
| Robinhood Chain  | `robinhood` | 4663     | WETH `0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73`, USDG (6 decimals) `0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168`  |

## Reading lending data

Lending data is public: the GraphQL API at https://api.gondi.xyz/graphql answers reads without
authentication and supports introspection, so any GraphQL client can explore the schema and query
collections, offers and loans directly.

## Risks

The collateral is an NFT. If the borrower does not repay by the end of the term, the lender does
not get the principal back: a loan with a single lender is foreclosed and the lender claims the
NFT (`liquidateLoan`), whose value may be below what was lent; a loan split across several
tranches goes to auction instead. The protocol takes a fee on the interest the lender earns (and
on any origination fee); `getProtocolFee` reads it.

## Examples

### Getting NFT/Collection ids

We use integer ids to identify collections and NFTs. We provide helper functions to get them:

```javascript
const nftId = await gondi.nftId({ slug: 'collection-slug', tokenId: 0n });
const collectionId = await gondi.collectionId({ slug: 'collection-slug' });
const collectionId = (
  await gondi.collectionId({
    contractAddress: '0x0000000000000000000000000000000000000000',
  })
)[0]; // It's an array because some collections use same contract (e.g. Artblocks)
```

### Making Offers

#### Single NFT Offer

```javascript
const offer = await gondi.makeSingleNftOffer({
  nftId: 1,
  principalAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Principal currency address (e.g. WETH).
  principalAmount: 1_000_000_000_000_000_000n, // In the currency's smallest unit (e.g. 1 WETH in wei).
  capacity: 1_000_000_000_000_000_000n, // How much you lend in total; for N loans on a collection offer, N * principalAmount.
  fee: 0n, // Origination fee.
  aprBps: 100n, // APR in basis points (e.g. 1% APR).
  expirationTime: BigInt(Math.floor(Date.now() / 1_000) + 86_400), // Seconds since epoch (e.g. one day from now).
  duration: 2_592_000n, // Seconds (e.g. 30 days); see "Loan durations".
  maxSeniorRepayment: 0n, // 0n: the offer only funds a loan's first (senior) tranche.
  requiresLiquidation, // Sets the collateral to be liquidated on default.
  borrowerAddress, // Optional: allow only this borrower to accept the offer.
});
```

#### Collection Offer

```javascript
const offer = await gondi.makeCollectionOffer({
    collectionId,
    ... // Same as Single NFT Offer

});
```

#### Trait Offer

```javascript
const offer = await gondi.makeTraitOffer({
    traitIds, // The NFT must carry every one of these traits.
    ... // Same as Single NFT Offer
});
```

The API resolves the traits to the NFTs carrying them when the offer is generated and encodes
that set in the offer's validator, so the offer keeps matching those NFTs afterwards. It is
available where the API has trait loan offers enabled.

### Listing Offers

```javascript
import { OffersSortField, Ordering } from 'gondi';
const offer = await gondi.offers({
  cursor, // Cursor returned by previous calls.
  limit, // Number results.
  sortBy: {
    // Sort criteria.
    field: OffersSortField.CreatedDate,
    order: Ordering.Asc,
  },
  filterBy, // Filter criteria, result is conjunction of components.
});
```

### Listing Listings

```javascript
const listings = await gondi.listings({
  cursor, // Cursor returned by previous calls.
  limit, // Number results.
  collections, // Optional: only listings of these collection ids.
});
```
