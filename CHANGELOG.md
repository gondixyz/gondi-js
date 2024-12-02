# Breaking Changes 0.15.0b1

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.15.0b1. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Make Order](#replace-makesaleorder-with-makeorder) function renamed and args argument
- [Hide Order](#replace-hidesaleorder-with-hideorder) function renamed and args argument
- [Unhide Order](#replace-unhidesaleorder-with-unhideorder) function renamed and args argument
- [Cancel Order](#cancel-order) deleted function
- [Get Best Native Sale Offer](#get-best-native-sale-offer) deleted function
- [Buy](#buy) deleted function
- [Leverage Buy](#leverage-buy) deleted function
- [Leverage Sell](#leverage-sell-v0.15.0b1) deleted function

---

## Replace makeSaleOrder with makeOrder

**Description:**

`makeSaleOrder` was replaced with `makeOrder`. We added `currencyAddress, taker, isAsk` as arguments

---

## Replace hideSaleOrder with hideOrder

**Description:**

`hideSaleOrder` was replaced with `hideOrder`. `id` argument is now a number

---

## Replace unhideSaleOrder with unhideOrder

**Description:**

`unhideSaleOrder` was replaced with `unhideOrder`. `id` argument is now a number

---

## Cancel Order

**Description:**

The function `cancelSaleOrder` was deleted (for now)

---

## Get Best Native Sale Offer

**Description:**

The function `getBestNativeSaleOffer` was deleted

---

## Buy

**Description:**

The function `buy` was deleted

---

## Leverage Buy

**Description:**

The function `leverageBuy` was deleted

---

<h2 id="leverage-sell-v0.15.0b1">Leverage Sell </h2>

**Description:**

The function `leverageSell` was deleted (for now)

---

# Breaking Changes 0.14.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.14.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Owned NFTs](#emit-loan) arguments update
- [Is Approved NFT](#is-approved-nft) has been deleted
- [Is Approved NFT For All](#is-approved-nft-for-all) arguments update
- [Approve NFT](#approve-nft) has been deleted
- [Approve NFT For All](#approve-nft-for-all) arguments update
- [Create User Vault](#create-user-vault) arguments update

---

## Owned NFTs

**Description:**

`ownedNfts` method argument has been updated to gondi API parameters for query.

---

## Is Approved NFT

**Description:**

`isApprovedNFT` has been removed in favour of `isApprovedNFTForAll`

---

## Is Approved NFT For All

**Description:**

`isApprovedNFTForAll` method argument has been updated to:

```ts
async isApprovedNFTForAll({ nftAddress, standard, to }: {
  nftAddress: Address;
  standard: 'ERC721' | 'ERC1155';
  to?: Address; // Defaults to MSL contract
})
```

---

## Approve NFT

**Description:**

`isApprovedNFT` has been removed in favour of `isApprovedNFTForAll`

---

## Approve NFT For All

**Description:**

`approveNFTForAll` method argument has been updated to:

```ts
async approveNFTForAll({ nftAddress, standard, to }: {
  nftAddress: Address;
  standard: 'ERC721' | 'ERC1155';
  to?: Address; // Defaults to MSL contract
})
```

---

## Create User Vault

**Description:**

`createUserVault` method argument has been updated to:

```ts
type CreateVaultArgs = {
  collection: Address;
  tokenIds: bigint[];
  amounts: bigint[];
  standard: NftStandard;
}[]

async createUserVault({ nfts }: { nfts: CreateVaultArgs })
```

---

# Breaking Changes 0.6.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.6.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Emit Loan](#emit-loan)
- [Revoke Delegate](#revoke-delegate)
- [Make Offer](#make-offer)
- [Make Refinance Offer](#make-refinance-offer)

---

## Emit Loan

**Description:**

`emitLoan` method argument has been updated to:

```ts
interface EmitLoanArgs {
  offerExecution: {
    offer: Omit<model.SingleNftOffer | model.CollectionOffer, 'nftId'>;
    amount?: bigint;
    lenderOfferSignature: Hash;
  }[];
  tokenId: bigint;
  duration: bigint;
  principalReceiver?: Address;
  expirationTime?: bigint;
}
```

**Reason:**

This allows us to introduce further customization of this method in the future for new versions of the contracts.

**Migration Steps:**

See `offerExecutionFromOffers` helper. `amounts` is optional and should specify the amount to be taken from each offer. If index of offer not found in amounts, will default to offer principal ammount.

```ts
offerExecutionFromOffers(offers: OfferFromExecutionOffer[], amounts?: bigint[])
```

---

## Revoke Delegate

**Description:**

As `emitLoan` arguments have been updated, argument `emit` from `revokeDelegate` has to be updated.

**Reason:**

`emitLoan` arguments have been updated and that impacts this method.

**Migration Steps:**

Build `emit` argument the same way it's explained in `emitLoan` migrations steps.

---

## Make Offer

**Description:**

`maxSeniorRepayment` it's been added to object received in `makeCollectionOffer` and `makeSingleNftOffer`.

**Reason:**

This allows us to set a floor when using the current offer with other offer when creating loans.

---

## Make Refinance Offer

**Description:**

`targetPrincipal` it's still required for versions 1 and 2 of Gondi. In future versions, `trancheIndex` will be required in its place.

**Reason:**

Next versions of Gondi will change the way in which sources (future tranches) from loan are refinanced.

---

# Breaking Changes 0.5.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.5.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Offers](#offers)

---

## Offers

**Description:**

`offers` method now expects `lenders: Address[]` instead of `lender: Address` uin the `filterBy` argument.

**Reason:**

Query now allows multiple addresses in the filter.

---

# Breaking Changes 0.3.8

### Important

This document outlines the breaking changes introduced in our codebase for version 0.3.8. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Repay Loan](#repay-loan)
- [Refinance Full Loan](#refinance-full-loan)
- [Refinance Partial Loan](#refinance-partial-loan)
- [Liquidate Loan](#liquidate-loan)
- [Leverage Sell](#leverage-sell)

---

## Repay Loan

**Description:**

`repayLoan` method now expects `loanId` argument:

```ts
  async repayLoan(args: { loan: LoanV4V5; loanId: bigint; nftReceiver?: Address }) { ... }
```

**Reason:**

We previously assumed that the loanId was equal to the loanId of the first source. Due to loan extension that's no longer the case

---

## Refinance Full Loan

**Description:**

`refinanceFullLoan` method now expects `loanId` argument:

```ts
  async refinanceFullLoan(args: { loan: LoanV4V5; loanId: bigint; offer: model.RenegotiationOffer; }) { ... }
```

**Reason:**

We previously assumed that the loanId was equal to the loanId of the first source. Due to loan extension that's no longer the case

---

## Refinance Partial Loan

**Description:**

`refinancePartialLoan` method now expects `loanId` argument:

```ts
  async refinancePartialLoan(args: { loan: LoanV4V5; loanId: bigint; offer: model.RenegotiationOffer; }) { ... }
```

**Reason:**

We previously assumed that the loanId was equal to the loanId of the first source. Due to loan extension that's no longer the case

---

## Liquidate Loan

**Description:**

`liquidateLoan` method now expects one argument with both `loanId` and `loan`:

```ts
  async liquidateLoan(args: { loan: LoanV4V5; loanId: bigint; }) { ... }
```

**Reason:**

We previously assumed that the loanId was equal to the loanId of the first source. Due to loan extension that's no longer the case.
We are also using an object to accomodate for the flexibility of adding new parameters in the future

---

## Leverage Sell

**Description:**

`leverageSell` method now expects `loanId` argument:

```ts
  async leverageSell(args: { loan: LoanV4V5; loanId: bigint; price: bigint; orderSource: string; }) { ... }
```

**Reason:**

We previously assumed that the loanId was equal to the loanId of the first source. Due to loan extension that's no longer the case.

---

# Breaking Changes 0.3.0b4

### Important

**Migration to version 0.3.x is discouraged until release is a stable version, and not a beta version as it is right now.**

---

This document outlines the breaking changes introduced in our codebase for version 0.3.0b4. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Settle Auction](#settle-auction)

---

## Settle Auction

**Description:**

`settleAuction` method now no loger expects `collectionContractAddress` and `tokenId` arguments:

```ts
  async settleAuction(args: { loan: LoanV4V5; auction: model.Auction }) { ... }
```

**Reason:**

Both arguments could be inferred from loan.

---

# Breaking Changes 0.3.0b1

### Important

**Migration to version 0.3.x is discouraged until release is a stable version, and not a beta version as it is right now.**

---

This document outlines the breaking changes introduced in our codebase for version 0.3.0b1. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Approve NFT For All](#approve-nft-for-all)
- [Approve Token](#approve-token)

---

## Approve NFT For All

**Description:**

`approveNFTForAll` method now expects an object with the following shape:

```ts
  async approveNFTForAll(args: { nftAddress: Address; to?: Address }) { ... }
```

`to` is optional and will default to MultiSourceLoan contract.

**Reason:**

Consistency accross other methods.

---

## Approve Token

**Description:**

`approveToken` method now expects an object with the following shape:

```ts
  async approveToken(args: { tokenAddress: Address; amount?: bigint; to?: Address }) { ... }
```

`amount` is optional and will default to MultiSourceLoan contract.

`to` is optional and will default to internal `MAX_NUMBER`` constant.

**Reason:**

Consistency accross other methods.

---

# Breaking Changes 0.2.0

This document outlines the breaking changes introduced in our codebase for version 0.2.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Hide Offer](#hide-offer)
- [Hide Renegotiation Offer](#hide-renegotiation-offer)

---

## Hide Offer

**Description:**
`hideOffer` method now expects an object with an id and contract address inside. This id should be the `offerId` of the offer you want to hide, not the full id.

**Reason:**
Consistency accross other methods.

**Migration Steps:**

Change the argument sent to `hideOffer` to an object containing the `offerId` of the offer you want to hide, and the contract address of the offer

---

## Hide Renegotiation Offer

**Description:**
`hideRenegotiationOffer` method now expects an object with an id and contract address inside. This id should be the `renegotiationId` of the renegotiation you want to hide, not the full id.

**Reason:**
Consistency accross other methods.

**Migration Steps:**

Change the argument sent to `hideRenegotiationOffer` to an object containing the `renegotiationId` of the renegotiation you want to hide, and the `loanAddress` of the renegotiation

---

# Breaking Changes 0.1.0

This document outlines the breaking changes introduced in our codebase for version 0.1.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Cancel Offer](#cancel-offer)
- [Cancel Refinance Offer](#cancel-refinance-offer)
- [Cancel All Offers](#cancel-all-offers)
- [Cancel All Renegotiations](#cancel-all-renegotiations)
- [Repay Loan](#repay-loan-1)
- [Refinance Full Loan](#refinance-full-loan-1)
- [Emit Loan](#emit-loan-1)
- [Make Refinance Offer](#make-refinance-offer-1)

---

## Cancel Offer

**Description:**
`cancelOffer` method now expects an object as an argument, with the id and contractAddress inside

**Reason:**
This allows us to introduce further customization of this method in the future.

**Migration Steps:**

Change the argument sent to `cancelOffer` to an object containing the id of the offer you want to cancel, and the contract address of the related contract

---

## Cancel Refinance Offer

**Description:**
`cancelRefinanceOffer` method now expects an object as an argument, with the id and contractAddress inside

**Reason:**
This allows us to introduce further customization of this method in the future.

**Migration Steps:**

Change the argument sent to `cancelRefinanceOffer` to an object containing the id of the offer you want to cancel, and the contract address of the related contract

---

## Cancel All Offers

**Description:**
`cancelOffers` method now expects the key `contractAddress` instead of `contract` in the argument

**Reason:**
Consistency accross other methods

**Migration Steps:**

Change the key from `contract` to `contractAddress`

---

## Cancel All Renegotiations

**Description:**
`cancelAllRenegotiations` method now expects the key `contractAddress` instead of `contract` in the argument

**Reason:**
Consistency accross other methods

**Migration Steps:**

Change the key from `contract` to `contractAddress`

---

## Repay Loan

**Description:**
`repayLoan` method now expects an object as an argument, with the loan and nftReceiver

**Reason:**
This allows us to introduce further customization of this method in the future.

**Migration Steps:**

Change the argument sent to `repayLoan` to an object containing the loan you want to repay, and the address of the receiver of the NFT

---

## Refinance Full Loan

**Description:**
`refinanceFullLoan` method now expects an object as an argument, with the loan and the refinance offer

**Reason:**
This allows us to introduce further customization of this method in the future.

**Migration Steps:**

Change the argument sent to `refinanceFullLoan` to an object containing the loan you want to refinance, and the refinance offer

---

## Emit Loan

**Description:**
`emitLoan` method now expects an object as an argument, with the offer and tokenId

**Reason:**
This allows us to introduce further customization of this method in the future.

**Migration Steps:**

Change the argument sent to `emitLoan` to an object containing the offer you want to emit, and the tokenId of the NFT

---

## Make Refinance Offer

**Description:**
`makeRefinanceOffer` method now expects an object as an argument, with the renegotiation, the contract address and the skipSignature boolean

**Reason:**
This allows us to introduce further customization of this method in the future.

**Migration Steps:**

Change the argument sent to `makeRefinanceOffer` to an object containing the renegotiation data, the contract address of the related contract and the skipSignature boolean

---
