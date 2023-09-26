# Breaking Changes

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
