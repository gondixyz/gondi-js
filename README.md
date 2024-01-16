# Gondi.js

A JavaScript library for crypto-native lending: borrow, lend & refinance NFTs (non-fungible tokens).

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Examples](#examples)
- [Migrating from X <= 0.0.1b9 to 0.1.0](./CHANGELOG.md)

## Installation

You can install it via npm:

```bash
npm install --save gondi
# or
yarn add gondi
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
const offers = await gondi.makeSingleNftOffer({
    nftId=1,
    principalAddress="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",  // Principal currency address. (e.g. WETH)
    principalAmount=1_000_000_000_000_000_000n,                     // Principal amount. In units of currency (e.g. WETH is wei)(e.g. 1WETH)
    capacity=1_000_000_000_000_000_000n,                            // How much money do you want to loan in total,
                                                                    // valid for collection offers.
                                                                    // If you want N loans for example, it should be N*principalAmount.
    fee=0n,                                                         // Origination fee.
    aprBps=100n,                                                    // Apr expressed in basis points. (e.g. 1% apr)
    expirationTime=1700000000n,                                     // Expiration time expressed in seconds since epoch. (e.g. 2023/11/14)
    duration=31_536_000n,                                           // Duration expressed in secconds. (e.g. 1 year)
    requiresLiquidation,                                            // Sets the collateral to be liquidated on default.
    borrowerAddress,                                                // Optional: allow only this borrower to accept the offer.
});
```

#### Collection Offer

```javascript
const offer = await gondi.makeCollectionOffer({
    collectionId,
    ... // Same as Single NFT Offer

});
```

### Listing Offers

```javascript
import { OffersSortField, Ordering } from 'gondi';
const offer = await gondi.offers({
  cusor, // Cursor returned by previous calls.
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
  cusor, // Cursor returned by previous calls.
  limit, // Number results.
  sortBy, // Sort criteria.
  filterBy, // Filter criteria, result is conjunction of components.
});
```
