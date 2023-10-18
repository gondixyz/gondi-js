# Breaking Changes 0.3.0b1

### Important

**Migration to version 0.3.x is discouraged until release is a stable version, and not a beta version as it is right now.**

--- 

This document outlines the breaking changes introduced in our codebase for version 0.3.0b1. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Approve NFT For All](#approveNFTForAll)
- [Approve Token](#approveToken)

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
- [Repay Loan](#repay-loan)
- [Refinance Full Loan](#refinance-full-loan)
- [Emit Loan](#emit-loan)
- [Make Refinance Offer](#make-refinance-offer)

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
