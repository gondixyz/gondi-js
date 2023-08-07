# Gondi.js

A JavaScript library for crypto-native lending: borrow, lend & refinance NFTs (non-fungible tokens). 



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
import { Gondi } from 'gondi'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from "viem/accounts";
import { mainnet } from 'viem/chains'
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...')


const wallet = createWalletClient({
    account: privateKeyToAccount(privateKey),
    transport,
    chain: mainnet,
});
const gondi = new Gondi({ wallet });
```

Typescript types are included in the package.

### Getting NFT/Collection ids
We use integer ids to identify collections and NFTs. We provide helper functions to get them:


```javascript
const nftId = await gondi.nftId({slug: 'collection-slug', tokenId: 0n});
const collectionId = await gondi.collectionId({slug: 'collection-slug'});
```

### Making Offers

#### Single NFT Offer.
```javascript
const offers = await gondi.makeSingleNftOffer({
    nftId,
    principalAddress,                   // Principal currency address.
    principalAmount,                    // Principal amount. In units of currency (e.g. WETH is wei)
    capacity,                           // How much money do you want to loan in total, 
                                        // valid for collection offers.
                                        // If you want N loans for example, it should be N*principalAmount.
    fee,                                // Origination fee.
    aprBps,                             // Apr expressed in basis points.
    expirationTime,                     // Expiration time expressed in seconds since epoch.
    duration,                           // Duration expressed in secconds.
    requiresLiquidation,                // Sets the collateral to be liquidated on default.
    borrowerAddress,                    // Optional: allow only this borrower to accept the offer.
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
const offer = await gondi.offers({
    cusor,                              // Cursor returned by previous calls.
    limit,                              // Number results.
    sortBy,                             // Sort criteria.
    filterBy                            // Filter criteria, result is conjunction of components.
});
```

### Listing Listings

```javascript
const listings = await gondi.listings({
    cusor,                              // Cursor returned by previous calls.
    limit,                              // Number results.
    sortBy,                             // Sort criteria.
    filterBy                            // Filter criteria, result is conjunction of components.
});
```
