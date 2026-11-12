# Bug Fixes 0.61.1

## Important

The docs of the hide and cancel calls now say which ones change on-chain state. No behaviour changes.

## Table of Contents

- [Hiding an offer does not cancel it](#hiding-an-offer-does-not-cancel-it)

## Hiding an offer does not cancel it

**Description:**

- FIX: the docs of `gondi.hideOffer`, `gondi.hideOffers` and `gondi.hideRenegotiationOffer` now say they only hide the offer from the GONDI API. The lender's signature stays valid, so anyone already holding it can still execute the offer; `gondi.cancelOffer`, `gondi.cancelOffers` and `gondi.cancelRefinanceOffer` cancel it on-chain.
- FIX: the docs of `gondi.cancelOrders` now say that its default cancels every order: only the bids no one can fill without the API skip the transaction, and every other order is cancelled on-chain.

**Migration Steps:**

- None. To make a loan offer unexecutable rather than just hidden, cancel it on-chain:

```typescript
const { waitTxInBlock } = await gondi.cancelOffer({ id, contractAddress });
await waitTxInBlock();
```

# Breaking Changes 0.61.0

## Important

Auction calls fall back to the auction on chain when the struct the caller passes is stale, `liquidateLoan` says which way the loan was liquidated, and the buyout lockup of a contract version 3.2 auction is the auction's own.

## Table of Contents

- [Stale auctions are read from the chain](#stale-auctions-are-read-from-the-chain)
- [Version 3.2 buyout lockup](#version-32-buyout-lockup)
- [liquidateLoan result](#liquidateloan-result)

## Stale auctions are read from the chain

**Description:**

- FIX: `gondi.placeBid`, `gondi.settleAuction` and `gondi.settleAuctionWithBuyout` on contract versions 3, 3.1 and 3.2 first send the auction the caller passes. When the liquidator rejects it as stale (`InvalidHashAuctionError`), they rebuild the auction from its liquidator's `LoanLiquidationStarted` and latest `BidPlaced` events and send again.
- FIX: a version 3.2 auction passed without `loanHash` and `buyoutWindow` is rebuilt from the chain straight away instead of throwing.

**Reason:**

The liquidator stores only the hash of the auction and checks every call against it. A struct read before someone else's bid no longer matched, so the next bid or settlement reverted.

**Migration Steps:**

- None. A fresh struct costs no extra read. The rebuild uses `eth_getLogs` from the block the auction started in, so it needs an RPC provider that serves that block range.

## Version 3.2 buyout lockup

**Description:**

- FIX: `gondi.getAuctionRemainingLockupSeconds` on a version 3.2 auction counts down the `buyoutWindow` the auction recorded when it started. It used to read the liquidator's current `getTimeForMainLenderToBuy()`, which is two days even for an auction whose main lender is a pool, where the window is 0. The window comes from the `auction` argument when it has one, and from the chain otherwise, read once per auction.
- BREAKING: its `auction` argument now needs `loanId` as well as `loanAddress` and `startTime`, and accepts an optional `buyoutWindow`.

**Migration Steps:**

```typescript
const seconds = await gondi.getAuctionRemainingLockupSeconds({
  auction: { loanAddress, loanId, startTime },
});
```

## liquidateLoan result

**Description:**

- BREAKING: the result of `liquidateLoan(...).waitTxInBlock()` on contract versions 3, 3.1 and 3.2 has a `liquidation` field: `'foreclosed'` when the lender took the NFT, with the `LoanForeclosed` arguments, or `'auction'` when the loan went to the liquidator, with the `LoanSentToLiquidator` arguments plus `collectionContractAddress`, `tokenId` and the `auction` struct that started.

**Reason:**

The result used to merge the arguments of whichever event was found into one shape, so a caller could not tell a foreclosure from an auction, and had no auction struct to bid with.

**Migration Steps:**

```typescript
const result = await(await gondi.liquidateLoan({ loan, loanId })).waitTxInBlock();
if (result.liquidation === 'auction') {
  const { auction, collectionContractAddress, tokenId } = result;
}
```

# Bug Fixes 0.60.1

## Important

The SDK signs in again before its API session expires, so a long-lived `Gondi` instance keeps working. Existing calls keep working.

## Table of Contents

- [Expired sessions](#expired-sessions)

## Expired sessions

**Description:**

- FIX: the SDK signs in again when its API session is within an hour of expiring. It used to keep the first session forever, so once the API expired it (60 days after sign-in) every authenticated call failed with `UNAUTHORIZED` until the `Gondi` instance was rebuilt. A `Gondi` instance that lives that long now asks the wallet for one new sign-in signature instead.

**Migration Steps:**

- None.

# New Features 0.60.0

## Important

`makeOrdersOnOpenSea` can now price each OpenSea listing on its own, so a seller can ask more on OpenSea and receive there what they receive on GONDI after OpenSea's higher fees.

## Table of Contents

- [Price the OpenSea listing on its own](#price-the-opensea-listing-on-its-own)

## Price the OpenSea listing on its own

**Description:**

- NEW: `openSeaPrice` on each order passed to `gondi.makeOrdersOnOpenSea`. The OpenSea listing asks that price instead of the GONDI one, and both stay under the same signature. It must be at least the order's `price`; the API refuses a lower one, and refuses `openSeaPrice` on `makeOrder` and `makeOrders`.

**Migration Steps:**

- None: leave `openSeaPrice` out to list on OpenSea at the GONDI price, as before.

```typescript
await gondi.makeOrdersOnOpenSea([
  { ...order, price: 1_000_000_000_000_000_000n, openSeaPrice: 1_010_000_000_000_000_000n },
]);
```

# Bug Fixes 0.59.2

## Important

Prorated origination fees target the effective APR they are given, instead of one basis point below it for some two-decimal APRs. Existing calls keep working.

## Table of Contents

- [Prorated origination fees hit the whole basis point](#prorated-origination-fees-hit-the-whole-basis-point)

## Prorated origination fees hit the whole basis point

**Description:**

- FIX: `gondi.calculateProratedOriginationFee` converted `effectiveApr` to basis points with a bare floor, which IEEE-754 products like `9.03 * 100 === 902.9999999999999` truncated one basis point low: `effectiveApr: 9.03` targeted 902 bps instead of 903, and 573 of the 10,000 two-decimal percentages up to 100% were off. The product is now rounded to 12 significant digits before the floor, so every two-decimal percentage maps to its exact basis points, and a fraction of a basis point (`10.0599` → 1005) is still dropped.

**Migration Steps:**

- None.

# Bug Fixes 0.59.1

## Important

`efficientRefinanceFromOffers` and `crossCurrencyRenegotiation` now ask for the repayment signature last. Existing calls keep working.

## Table of Contents

- [Repayment signature asked for last](#repayment-signature-asked-for-last)

## Repayment signature asked for last

**Description:**

- FIX: `gondi.efficientRefinanceFromOffers` and `gondi.crossCurrencyRenegotiation` ask the borrower to sign the expiring execution data before the repayment data. The repayment signature carries no nonce or expiry, so a borrower who declined the second prompt used to leave a valid repayment signature behind. Now declining the first prompt ends the flow before any repayment signature exists.
- FIX: both flows finish their reads (the borrower's balance, the migrator nonce) before the first signature prompt, so a failed read can no longer strand a signature.

**Migration Steps:**

- None. The wallet prompts arrive in the new order: execution data first, repayment data second.

# New Features 0.59.0

## Important

`createUserVault` now reports a deposit that fails after the vault is minted with a `CreateVaultError` that carries the new vault's id, so the caller can finish depositing into that vault instead of losing it.

## Table of Contents

- [createUserVault keeps the vault id when a deposit fails](#createuservault-keeps-the-vault-id-when-a-deposit-fails)

## createUserVault keeps the vault id when a deposit fails

**Description:**

- NEW: `CreateVaultError`, exported from the package root, with `vaultId` (the minted vault), `receipts` (the deposits already mined) and `cause` (the error of the deposit that failed).
- FIX: `gondi.createUserVault` throws a `CreateVaultError` when a deposit after the mint fails. It used to rethrow the deposit's error alone, so the caller lost the id of a vault that already existed on-chain.
- FIX: `gondi.createUserVault` groups NFTs by collection case-insensitively, so one collection written in two cases (for example lowercase and checksummed) is deposited in one transaction instead of two.

**Migration Steps:**

- A caller that matched the deposit's error message now finds that error at `error.cause`. To resume after a failed deposit:

```typescript
try {
  await gondi.createUserVault({ nfts, currencies });
} catch (error) {
  if (!(error instanceof CreateVaultError)) throw error;
  // error.vaultId exists on-chain; deposit what is missing with gondi.depositUserVaultERC721s,
  // gondi.depositUserVaultERC1155s or gondi.depositUserVaultERC20.
}
```

# Bug Fixes 0.58.8

## Important

Bids and settlements on contract version 3.2 auctions now encode the version 3.2 `Auction` struct, and the SDK can read and claim a bid refund the liquidator holds. Calls on older auctions are unchanged.

## Table of Contents

- [Version 3.2 auctions](#version-32-auctions)

## Version 3.2 auctions

**Description:**

- FIX: `gondi.placeBid`, `gondi.settleAuction` and `gondi.settleAuctionWithBuyout` on a version 3.2 loan used the version 3 liquidator ABI, whose `Auction` struct lacks `loanHash` and `buyoutWindow`, so every call encoded the wrong struct and reverted. They now use the version 3.2 liquidator ABI, and reject an auction without `loanHash` before simulating it.
- NEW: `gondi.getAuctionPendingRefund({ loanAddress, token, bidder })` reads the bid refund the version 3.2 liquidator holds for a bidder whose outbid refund transfer failed; it is `0n` on older versions.
- NEW: `gondi.claimAuctionRefund({ loanAddress, token })` claims that refund for the wallet.
- NEW: the `AuctionV8` type, the version 3.2 `Auction` struct, is part of `Auction`.
- FIX: bids and settlements on a version 3.2 auction find the liquidator holding the collateral, as they do on older versions.

**Migration Steps:**

- For a version 3.2 auction, pass the on-chain `Auction` struct including `loanHash` and `buyoutWindow` (from the `LoanLiquidationStarted` event):

```typescript
await gondi.placeBid({
  collectionContractAddress,
  tokenId,
  bid,
  auction: { ...auction, loanHash, buyoutWindow },
});
```

# Bug Fixes 0.58.7

## Important

An offer published with `publication` is refused once its `expirationTime` has passed, instead of being resent or signed. Calls with live terms keep working.

## Table of Contents

- [Expired publications are refused](#expired-publications-are-refused)

## Expired publications are refused

**Description:**

- FIX: `gondi.makeSingleNftOffer`, `gondi.makeCollectionOffer` and `gondi.makeRefinanceOffer` called with `publication` resent the signature of an earlier identical call whose save failed, even after its `expirationTime` had passed, so a retry after a long pause published an offer nobody could accept. They now throw `Offer expired` once `expirationTime` has passed, before asking for a signature, and drop the pending signature.

**Migration Steps:**

- None. Catch `Offer expired` and retry with a later `expirationTime`.

# Bug Fixes 0.58.6

## Important

`getRemainingLockupSeconds` now reads the lock of a loan's newest tranche after a partial refinance. Existing calls keep working.

## Table of Contents

- [Tranche lock after a partial refinance](#tranche-lock-after-a-partial-refinance)

## Tranche lock after a partial refinance

**Description:**

- FIX: `gondi.getRemainingLockupSeconds` picks the tranche (v3 and later) or source (v2) with the latest `startTime`, which is the one the contract waits on before a full refinance. It used to read the last tranche or the first source, and after `refinancePartial` an earlier one can be newer, so it reported a loan as unlocked while a refinance would still revert with `TrancheCannotBeRefinancedError`.

# Bug Fixes 0.58.5

## Important

`cancelAllOffers` and `cancelAllRenegotiations` now say which contract versions lack them instead of failing with an ABI error. Existing calls on V1, V2 and V3 contracts are unchanged.

## Table of Contents

- [cancelAllOffers and cancelAllRenegotiations refuse versions without them](#cancelalloffers-and-cancelallrenegotiations-refuse-versions-without-them)

## cancelAllOffers and cancelAllRenegotiations refuse versions without them

**Description:**

- FIX: `gondi.cancelAllOffers` on a V3.2 contract now rejects with `cancelAllOffers is not supported on V3.2` before sending anything. It used to call a function the V3.2 ABI lacks and fail with an ABI error. V3.1 rejects with the same message.
- FIX: `gondi.cancelAllRenegotiations` on any V3 contract (3, 3.1 or 3.2) rejects with `cancelAllRenegotiations is not supported on V<version>`, naming the version, since none of them has the function.

**Migration Steps:**

- None. To cancel offers on V3.1 or V3.2, cancel them by id with `gondi.cancelOffers({ ids, contractAddress })`.

# Bug Fixes 0.58.4

## Important

A reverted transaction now rejects `waitTxInBlock()` with `Transaction reverted: <hash>` on every contract call, instead of a missing-event error such as `Loan not emitted`. Successful calls are unchanged.

## Table of Contents

- [waitTxInBlock reports reverted transactions](#waittxinblock-reports-reverted-transactions)

## waitTxInBlock reports reverted transactions

**Description:**

- FIX: every `waitTxInBlock()` the SDK returns checks the receipt's status before reading its events, so a transaction that was mined but reverted rejects with `Transaction reverted: <hash>`. Before, most calls (loan emits, repayments, refinances, offer cancellations, auctions, vaults, purchase bundler, NFT and ERC20 approvals, NFT transfers) looked for their event in the reverted receipt and rejected with a misleading message such as `Loan not emitted`.

**Migration Steps:**

- None. Code that matched a missing-event message to detect a revert should match `Transaction reverted` instead.

# Bug Fixes 0.58.3

## Important

Offers that set `lenderRefinanceDisabled` now sign for MultiSourceLoan v3.2 when no contract is given. Ordinary offers are unchanged.

## Table of Contents

- [Protected offers sign for v3.2](#protected-offers-sign-for-v32-0583)

## Protected offers sign for v3.2 0.58.3

**Description:**

- FIX: `makeSingleNftOffer`, `makeCollectionOffer` and `makeTraitOffer` signed every offer for v3.1, the default contract, including offers with `lenderRefinanceDisabled`. v3.1 does not sign that flag, so the API refused those offers. They now sign for v3.2, the only version that signs it. On a chain without a v3.2 deployment the call throws before asking for a signature. Offers without the flag still sign for v3.1. Entry 0.31.0 said the default contract was v3.2; it has been v3.1 since, and this is the routing that entry meant.
- `offerContractAddress(offer?)` takes the offer and returns the contract it signs for: v3.2 for a `lenderRefinanceDisabled` offer, so a lender approves the principal for the right contract. Called with no offer it still returns the default contract.

**Migration Steps:**

- None. Callers that pass a contract to sign for keep signing for that contract.

# Bug Fixes 0.58.2

## Important

A transaction the wallet speeds up now resolves with its result instead of timing out. Existing calls keep working.

## Table of Contents

- [Sped-up transactions resolve](#sped-up-transactions-resolve)

## Sped-up transactions resolve

**Description:**

- FIX: when the wallet replaces a pending transaction with the same call at a higher fee, write methods now return the hash of the replacement that mined, so `waitTxInBlock()` finds its receipt and returns the result (for example the `loanId` of `emitLoan`). It used to wait on the dropped original hash, and could only give up after six minutes with `WaitForTransactionReceiptTimeoutError`.

**Migration Steps:**

- None. `txHash` on a sped-up transaction is now the replacement's hash; the `success` step of `onStepChange` still reports the original as `originalTransactionHash`.

# Bug Fixes 0.58.1

## Important

An ERC20 buy with a loan of a listed loan (the flash route) now pays the Aave flash-loan premium on the amount it borrows, not on the whole price. Existing calls keep working.

## Table of Contents

- [Flash route borrows net of the initial payment](#flash-route-borrows-net-of-the-initial-payment)

## Flash route borrows net of the initial payment

**Description:**

- FIX: `PurchaseBundlerV2.executeSellWithLoan` flash-borrows `price - initialPayment` for an ERC20 listing, as it already did for ETH, instead of the whole price. The buyer's initial payment is collected when the sale runs. On a 100,000 USDC purchase with a 40,000 USDC initial payment, the premium is 30 USDC instead of 50, and the route needs less Aave liquidity.
- FIX: `gondi.quoteBuyWithLoan` quotes the flash route's `initialPayment` and `approvalCaps` with the premium on the borrowed amount, so an ERC20 quote asks for slightly less.
- `gondi.buyNowPayLater` on the flash route collects `initialPayment` in the listing currency when the sale runs, so the wallet must hold and approve that amount in the listing currency, including when `repayFlashLoanSwapParams` converts another currency. Anything the swap brings in beyond the repayment is refunded at the end, as before.

# New Features 0.58.0

## Important

No breaking changes. Bulk asks can be listed on OpenSea under the same signature.

## Table of Contents

- [List bulk asks on OpenSea](#list-bulk-asks-on-opensea)

## List bulk asks on OpenSea

**Description:**

- NEW: `makeOrdersOnOpenSea(orders)` publishes the batch like `makeOrders` and lists each ask on OpenSea too, with one signature. It returns `{ orders, openSeaListings }`, with one `openSeaListings` entry per ask: its `orderHash` once OpenSea took it, or the `error` saying why not.
- Public asks on Ethereum only. The owner must have approved OpenSea's conduit for each collection. A refusal never touches the GONDI ask.
- `makeOrders` is unchanged.

# Bug Fixes 0.57.1

## Important

Bids and settlements go to the liquidator running the auction, even after the loan contract's liquidator has been rotated. Existing calls keep working.

## Table of Contents

- [Auctions use their own liquidator](#auctions-use-their-own-liquidator)

## Auctions use their own liquidator

**Description:**

- FIX: `gondi.placeBid`, `gondi.settleAuction` and `gondi.settleAuctionWithBuyout` send the transaction to the collateral's current owner, which is the liquidator the auction was started on, instead of the address book's current liquidator for the loan contract's version. An auction started before a liquidator rotation was sent to the new liquidator, where it does not exist. When the collateral's owner records no running auction on it (the auction already settled, or the loan was foreclosed to the lender), they throw `No running auction` before simulating anything, instead of sending a transaction to the new owner.
- NEW: `contracts.AllForCollateral({ mslContractAddress, collectionContractAddress, tokenId })` returns the liquidator holding the collateral, and `contracts.All` takes an optional liquidator `address`. Every liquidator wrapper gets `hasAuction({ collectionContractAddress, tokenId })`.

**Migration Steps:**

- None.

# Breaking Changes 0.57.0

## Important

`onStepChange` now reports a failed step: a signature, transaction or API mutation that fails is reported with `status: 'error'` before the SDK call rejects. Callbacks that treat every status other than `waiting` as done need a change.

## Table of Contents

- [Steps report an error status](#steps-report-an-error-status)

## Steps report an error status

**Description:**

- BREAKING: every step type gains `status: 'error'` with the `error` the SDK call rejects with. A signature or API mutation step reports it when the wallet refuses the signature or the mutation fails. A transaction step reports it when the wallet refuses to send it (no `transactionHash`), or when it was sent and then reverted, was cancelled or was replaced by a different call (with the broadcast `transactionHash`).
- An error thrown by the `onStepChange` callback itself is not reported as a failed step: the SDK call rejects with it, and no `error` step follows a `broadcasted` or `success` one. An error thrown while handling `status: 'error'` is dropped, so the call still rejects with the original cause.
- FIX: API mutation steps are now awaited like signature and transaction steps, so the mutation is sent only after the `waiting` callback settles, and resolves only after the `success` one does.

**Reason:**

Without a failure state, a UI listening to `onStepChange` stayed on `waiting` or `broadcasted` after a step threw, and had to infer the failure from the rejected SDK call.

**Migration Steps:**

- Handle `status: 'error'` wherever a callback branches on `status`. A check such as `step.status === 'waiting' ? 'requested' : 'completed'` now also reads a refused signature as completed:

```typescript
const onStepChange: OnStepChange = async (step) => {
  if (step.status === 'error') {
    showFailure(step.error);
    return;
  }
  if (step.type === 'transaction' && step.status === 'broadcasted') {
    showPending(step.transactionHash);
  }
};
```

# Breaking Changes 0.56.0

## Important

The approval helpers no longer guess the spender: `to` is required. Calls that already pass `to` are unchanged.

## Table of Contents

- [Approval helpers require the spender](#approval-helpers-require-the-spender)

## Approval helpers require the spender

**Description:**

- BREAKING: `isApprovedToken`, `approveToken`, `currencyAllowance`, `isApprovedNFTForAll` and `approveNFTForAll` take `to` as a required parameter. Without it they used to fall back to MultiSourceLoan 3.1.
- NEW: `offerContractAddress()` returns the MultiSourceLoan address the offer methods sign for on the wallet's chain.

**Reason:**

The spender depends on the call the approval is for: `repayLoan` pulls from `loan.contractAddress`, which can be any MultiSourceLoan version, a buy now pay later purchase pulls from its PurchaseBundler, and Seaport orders from Seaport. The read and the write helpers shared the same 3.1 default, so a check-then-approve guard reported success while the real spender stayed unapproved, `approveToken` granted 3.1 an unlimited allowance it did not need, and the later transaction reverted on allowance with no hint which contract was short.

**Migration Steps:**

- Pass the contract that will pull the tokens or the NFT. For a repayment, that is the loan's contract:

```typescript
if (!(await gondi.isApprovedToken({ tokenAddress, amount, to: loan.contractAddress }))) {
  const approval = await gondi.approveToken({ tokenAddress, amount, to: loan.contractAddress });
  await approval.waitTxInBlock();
}
```

- For offers made with `makeSingleNftOffer`, `makeCollectionOffer` or `makeTraitOffer`, pass the new `offerContractAddress()`: the MultiSourceLoan contract those offers sign for on the wallet's chain, and the address the previous default resolved to. The address differs per chain, so do not hardcode it:

```typescript
const to = gondi.offerContractAddress();
if (!(await gondi.isApprovedToken({ tokenAddress, amount, to }))) {
  const approval = await gondi.approveToken({ tokenAddress, to });
  await approval.waitTxInBlock();
}
```

- JavaScript callers get no compile error: a call that still omits `to` now fails at runtime instead of approving MultiSourceLoan 3.1.

# New Features 0.55.0

## Important

The SDK can now read the order book: the bids and listings on a collection, a trait or an item, and a collection's floor, highest bid and royalties. Existing calls are unchanged.

## Table of Contents

- [Order book reads](#order-book-reads)
- [Concurrent first requests](#concurrent-first-requests)

## Order book reads

**Description:**

- NEW: `gondi.orders({ side, collections, traits, nfts, makers, excludeMakers, currencies, statuses, matchMode, orderTypes, sortBy, limit, cursor })` lists trade orders across the marketplaces GONDI indexes, active ones unless `statuses` says otherwise, newest first unless `sortBy` says otherwise, one page at a time. `matchMode: ANY` with `side: BID` lists every bid an item of the collection can fill; `orderTypes` narrows it, e.g. to collection bids only.
- NEW: `gondi.collectionMarket({ slug, currencies })` returns the collection's `collectionId`, `contractAddress` and `seaportConduitKey`, its `floorPrice` (cheapest active listing in `currencies`), its `highestBid` any item can fill, and its `royalties`.

**Migration Steps:**

- None. To read the best competing collection bid, excluding your own:

```typescript
const { orders } = await gondi.orders({
  side: OrderSide.Bid,
  collections: [collectionId],
  orderTypes: [CollectionOrderType.Collection],
  excludeMakers: [myAddress],
  sortBy: [{ field: OrderSortField.Price, order: Ordering.Desc }],
  limit: 1,
});
```

## Concurrent first requests

**Description:**

- FIX: requests that start together before the wallet has signed in now share one sign-in. Each sign-in asked the API for a fresh nonce, which replaced the previous one, so all but the last concurrent request failed with `SIWE_ERROR` (for example a `Promise.all` of reads right after `new Gondi(...)`).

**Migration Steps:**

- None.

# Bug Fixes 0.54.1

## Important

`wrapOldERC721` no longer sends the wrap after its transfer to the Stash reverts. Existing calls keep working.

## Table of Contents

- [wrapOldERC721 stops when its Stash transfer reverts](#wrapolderc721-stops-when-its-stash-transfer-reverts)

## wrapOldERC721 stops when its Stash transfer reverts

**Description:**

- FIX: `gondi.wrapOldERC721` now rejects with the transaction hash when the transfer of the NFT to the wallet's Stash reverts, instead of sending a `wrap` that reverts too and costs a second transaction's gas.
- FIX: `gondi.wrapOldERC721` compares the NFT's owner with the wallet and the Stash case-insensitively, so a checksummed owner address is no longer refused as `NFT not owned`.

**Migration Steps:**

- None.

# New Features 0.54.0

## Important

A bid can now fill with any NFT that a condition over the collection's traits and items matches: AND, OR and exclusions, in one bid. Existing calls keep working. Condition bids are not enabled yet, so the API rejects them until they are.

## Table of Contents

- [Condition bids](#condition-bids)

## Condition bids

**Description:**

- NEW: `gondi.makeOrder({ ..., collectionId, condition: { expression } })` publishes a condition bid. `expression` is a tree of `{ all: [nodes] }`, `{ any: [nodes] }`, `{ not: node }` (only inside an `all`, beside what it excludes from), `{ trait: traitId }`, `{ token: nftId }` and `{ collection: true }` (only inside an `all` with a `not`). The API resolves it into the NFTs the bid fills with when the bid is signed, as a set bid. The root is an `all` or an `any`, at most 4 levels deep, naming at most 10 traits and 1,000 NFTs. `condition.anyTraitIds` still works.

**Migration Steps:**

- None. To bid on (Background: Blue or Red) and Fur: Gold, excluding Hat: Cap and one item:

```typescript
await gondi.makeOrder({
  ...orderTerms,
  collectionId,
  condition: {
    expression: {
      all: [
        { any: [{ trait: blueId }, { trait: redId }] },
        { trait: goldFurId },
        { not: { any: [{ trait: capId }, { token: nftId }] } },
      ],
    },
  },
});
```

# New Features 0.53.0

## Important

The SDK can now unwrap a CryptoPunks 721 token back into a naked CryptoPunk. Existing calls keep working.

## Table of Contents

- [Unwrap a CryptoPunks 721 punk](#unwrap-a-cryptopunks-721-punk)

## Unwrap a CryptoPunks 721 punk

**Description:**

- NEW: `gondi.unwrapPunk721({ tokenId })` burns the wallet's CryptoPunks 721 token and returns the naked punk to the wallet, in one transaction with no approval. It refuses unless `punk721WrapState` is `'wrapped'`, so a 721 token held by a loan, a vault or anyone else is never sent. It returns `{ txHash, waitTxInBlock }`.

**Migration Steps:**

- None. To unwrap a punk the wallet holds as a 721 token:

```typescript
if ((await gondi.punk721WrapState({ tokenId })) === 'wrapped') {
  await(await gondi.unwrapPunk721({ tokenId })).waitTxInBlock();
}
```

# New Features 0.52.0

## Important

`gondi.makeOrder` can now publish an OR trait bid: one price for any NFT of a collection carrying one of several values of a trait key, such as "Background: Blue or Red". Existing calls keep working.

## Table of Contents

- [OR trait bids](#or-trait-bids)

## OR trait bids

**Description:**

- NEW: `NftSetOrderInput` takes `condition: { anyTraitIds }` in place of `nftIds`: 2 to 10 trait ids of the same key in `collectionId`. The API resolves the NFTs carrying any of them (up to 20,000) when the bid is signed and publishes a `SetBidOrder` through `publishOrderForNftSet`, which fills up to `maxExecutions` times with any of those NFTs.
- NEW: `SetBidOrder.condition { anyTraits }` in the generated types, null for a handpicked set.
- `nftIds` is now optional on `NftSetOrderInput`; pass exactly one of `nftIds` or `condition`.
- OR trait bids are switched on per API environment. Where they are not yet enabled, `makeOrder` with a `condition` rejects with `OR trait bids are not enabled`.

**Migration Steps:**

- None. To bid on several values of one trait key, pass `condition` alongside `collectionId`:

```typescript
const order = await gondi.makeOrder({
  collectionId,
  condition: { anyTraitIds: [blueBackgroundTraitId, redBackgroundTraitId] },
  maxExecutions: 3n,
  currencyAddress,
  price,
  startTime,
  expirationTime,
});
```

# New Features 0.51.0

## Important

The SDK can now wrap a naked CryptoPunk into CryptoPunks 721, one transaction per step. Existing calls keep working.

## Table of Contents

- [Wrap a CryptoPunk into CryptoPunks 721](#wrap-a-cryptopunk-into-cryptopunks-721)

## Wrap a CryptoPunk into CryptoPunks 721

**Description:**

- NEW: `gondi.punk721WrapState({ tokenId })` reads where the wallet's punk stands: `'wallet'` (held naked), `'stash'` (in the wallet's Stash, ready to wrap), `'wrapped'` (the wallet holds its 721 token) or `'other'`. The `Punk721WrapState` type is exported.
- NEW: `gondi.transferPunkToStash721({ tokenId })` moves a punk the wallet holds into its Stash, and `gondi.wrapPunk721({ tokenId })` wraps a punk waiting there, minting the 721 token to the wallet. Each refuses a punk in any other state, and returns `{ txHash, waitTxInBlock }`.
- NEW: `Cryptopunks721` in the address book (`CRYPTOPUNKS_721` overrides it on Anvil) and a `contracts.Cryptopunks721(address)` client.

**Migration Steps:**

- None. To wrap a punk, run only the steps its state still needs:

```typescript
if ((await gondi.punk721WrapState({ tokenId })) === 'wallet') {
  await(await gondi.transferPunkToStash721({ tokenId })).waitTxInBlock();
}
if ((await gondi.punk721WrapState({ tokenId })) === 'stash') {
  await(await gondi.wrapPunk721({ tokenId })).waitTxInBlock();
}
```

# New Features 0.50.0

## Important

`gondi.makeOrder` can now publish a set bid: one bid that fills with any of a handpicked set of NFTs of one collection. Existing calls keep working.

## Table of Contents

- [Set bids](#set-bids)

## Set bids

**Description:**

- NEW: `gondi.makeOrder` (and `apiClient.publishOrder`) take a `NftSetOrderInput`: `collectionId`, `nftIds` (2 to 1,000 NFTs of that collection, duplicates ignored) and an optional `maxExecutions`, plus the usual order terms. It is published through the API's `publishOrderForNftSet` mutation, signed like every other bid, and resolves to a `SetBidOrder`.
- The bid fills with any NFT in `nftIds`, up to `maxExecutions` times. An NFT outside the set, including a wrapped twin in another collection, cannot fill it.

**Migration Steps:**

- None. To bid on a set, pass `nftIds` alongside `collectionId`:

```typescript
const order = await gondi.makeOrder({
  collectionId,
  nftIds: [nftId1, nftId2, nftId3],
  maxExecutions: 2n,
  currencyAddress,
  price,
  startTime,
  expirationTime,
});
```

# New Features 0.49.0

## Important

A new loan can now revoke each delegation with the rights it was made with. Existing calls keep working.

## Table of Contents

- [Delegation rights on revoke](#delegation-rights-on-revoke)

## Delegation rights on revoke

**Description:**

- NEW: the `delegations` of `gondi.revokeDelegationsAndEmitLoan` also take `{ to, rights }` entries (the exported `LoanDelegation` type), as the API's `Delegation.delegateTo` and `Delegation.rights` report them. Each one is revoked with every rights value it lists. A bare address is still revoked with `zeroHash` only.
- On loan contracts whose `revokeDelegate` takes no rights, each delegate is revoked once, as before.

**Reason:**

The delegate.xyz registry keys each delegation by its rights, and a revocation has to name the exact value. A delegation made with other rights, such as the global Shadow rights (`0x…00ffffffffff`) that Yuga's `ExclusiveDelegateResolver` reads for ApeChain and the Mudwater BAYC/MAYC claim, survived into the new loan.

**Migration Steps:**

- None. To revoke every rights value, pass `{ to, rights }` from the API's delegations.

```typescript
await gondi.revokeDelegationsAndEmitLoan({
  delegations: delegations.map(({ delegateTo, rights }) => ({ to: delegateTo, rights })),
  emit,
});
```

---

# New Features 0.48.0

## Important

A private refinance offer can now carry a fallback offer. Existing calls are unchanged.

## Table of Contents

- [NEW: Private refinance offers with a fallback](#new-private-refinance-offers-with-a-fallback)

## NEW: Private refinance offers with a fallback

**Description:**

- NEW: `gondi.makeRefinanceOffer({ ..., private: true, withFallbackOffer: true, borrowerAddress })` signs the fallback offer for `borrowerAddress`, the loan's borrower, so the fallback is private too and the API accepts the pair.
  - `borrowerAddress` is required when `private` and `withFallbackOffer` are both set, and only allowed then. A call without it throws before asking for a signature.
  - A public refinance offer's fallback stays open to anyone, as before.

**Reason:**

A private refinance offer could not keep its fallback: the fallback is a single-NFT offer with the same terms, so a public one would publish what the private offer hides.

**Migration Steps:**

- None. Calls that combined `private` with `withFallbackOffer` did not compile before.

```typescript
await gondi.makeRefinanceOffer({
  renegotiation,
  contractAddress,
  private: true,
  withFallbackOffer: true,
  principalAddress,
  nftId,
  borrowerAddress: loan.borrowerAddress,
});
```

---

# New Features 0.47.0

## Important

This release lets a lender make a refinance offer private. Existing calls are unchanged and their offers stay public.

## Table of Contents

- [NEW: Private refinance offers](#new-private-refinance-offers)

## NEW: Private refinance offers

**Description:**

- NEW: `gondi.makeRefinanceOffer({ ..., private: true })` saves the offer so that only the loan's borrower and the lender see it. Other lenders cannot read its terms from the API.
  - The API accepts it only for a principal worth at least $50k, and rejects the save otherwise.
  - `private` and `withFallbackOffer` cannot be combined: the fallback would be a public offer with the same terms. The SDK throws before asking for a signature.
  - The flag is not part of the signed struct, so the signature is unchanged.
- The generated GraphQL types are regenerated from the production schema, which adds `Renegotiation.private`.

**Reason:**

Lenders were front-run on large refinance offers: others read the pending terms and posted a slightly better offer before the borrower accepted.

**Migration Steps:**

- None.

```typescript
await gondi.makeRefinanceOffer({ renegotiation, contractAddress, private: true });
```

---

# New Features 0.46.0

## Important

This release adds `emitLoans` and transaction identity fields to step callbacks; existing methods and callbacks that read steps remain compatible. Code that builds a `broadcasted` or `success` transaction step by hand, such as a test fixture, now has to supply its hashes.

## Table of Contents

- [emitLoans emits several loans in one transaction](#emitloans-emits-several-loans-in-one-transaction-0460)
- [Transaction step identity](#transaction-step-identity)
- [A cancelled or replaced transaction is a failure](#a-cancelled-or-replaced-transaction-is-a-failure)

---

## emitLoans emits several loans in one transaction 0.46.0

**Description:**

- NEW: `gondi.emitLoans(loans)` takes a list of `emitLoan` arguments and sends them as one transaction, through the MultiSourceLoan contract's `multicall`: either every loan is emitted or none is.
  - Every offer of every loan must belong to the same MultiSourceLoan contract, of version 3 or later; an empty list, mixed contracts or an older contract throw before anything is sent.
  - Each NFT goes through the flagged-NFT check `emitLoan` runs, and `skipFlaggedNftCheck` turns it off as it does there.
  - `waitTxInBlock()` resolves to `loans`, one per item and in the same order, each with the `loan`, `loanId` and `offerIds` `emitLoan` returns, alongside the transaction receipt.

**Reason:**

Borrowing against several NFTs took one transaction, and one wallet confirmation, per NFT.

**Migration Steps:**

- None. Existing methods are unchanged.

```typescript
const { waitTxInBlock } = await gondi.emitLoans([firstLoanArgs, secondLoanArgs]);
const { loans } = await waitTxInBlock();
```

---

## Transaction step identity

**ENHANCEMENT:** Transaction `broadcasted` and `success` callbacks include `transactionHash`, `originalTransactionHash` (on receipt), and `chainId`. The transaction step type is split by `status`, so narrowing on it makes those hashes required rather than optional. The success callback uses the mined receipt hash, including a replacement when reported by the provider. The waiting callback has no transaction hash. Consumers can register a broadcast before receipt waiting completes without changing transaction submission or return values.

---

## A cancelled or replaced transaction is a failure

**FIX:** When the wallet cancels or replaces a broadcast transaction with a different call, `writeContract` and `sendTransaction` on the step-callback wallet now reject with `Transaction cancelled: <hash> by <replacement hash>` (or `replaced`) and no `success` step is emitted, the same way a revert is handled. A cancellation mines a 0-value transfer to the sender, so its receipt succeeds and was previously reported as the call itself succeeding. A `repriced` replacement (the same call at a higher fee) still succeeds, with `transactionHash` set to the replacement's hash.

# New Features 0.45.0

## Important

This release adds optional unsigned publication metadata for loan offers and full loan replacements. Existing calls and signed EIP-712 payloads remain compatible.

## Table of Contents

- [NEW: Loan offer publication](#new-loan-offer-publication)
- [FIX: Signed publication retries](#fix-signed-publication-retries)

## NEW: Loan offer publication

Optional `LoanOfferPublicationInput` lists the offer IDs a publication replaces, for single NFT offers, collection offers and full replacements. Item offers and replacements can be checked before signing. Collection publications remain globally admitted and are evaluated independently for each NFT.

## FIX: Signed publication retries

Retrying an unchanged publication reuses its signed nonce and payload. Full replacements retain both the renegotiation and matching fallback signatures after a failed API save.

# New Features 0.44.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.44.0.

## Table of Contents

- [Borrowing against a flagged NFT throws FlaggedNftError](#borrowing-against-a-flagged-nft-throws-flaggednfterror-0440)

---

## Borrowing against a flagged NFT throws FlaggedNftError 0.44.0

**Description:**

- NEW: `emitLoan`, `revokeDelegationsAndEmitLoan`, `refinanceFromOffers`, `efficientRefinanceFromOffers` and `crossCurrencyRenegotiation` ask the API whether the collateral NFT, or an NFT it wraps, is flagged (for example reported as stolen) and throw `FlaggedNftError` before sending when it is. `FlaggedNftError` is exported from the package root and carries `nftCollateralAddress` and `tokenId`.
  - An NFT the API does not know throws `NOT_FOUND`, and an API that does not answer throws its error: the loan is only sent once the API confirms the NFT is not flagged.
- NEW: `skipFlaggedNftCheck` on the `Gondi` constructor and `Gondi.create` turns the check off, for callers that already keep flagged NFTs out of their borrow flows.

**Reason:**

A collection offer's signature covers every token of the collection, so the protocol cannot stop a flagged NFT from taking it, and the GONDI web app is the only place that gated it. Integrators building on the SDK now get the same guard without having to know about flags.

**Migration Steps:**

- Catch `FlaggedNftError` where a borrow can target a user-chosen NFT:

```typescript
import { FlaggedNftError } from 'gondi';

try {
  await gondi.emitLoan(args);
} catch (error) {
  if (error instanceof FlaggedNftError) {
    // tell the user this NFT cannot be borrowed against
  }
}
```

- Pass `skipFlaggedNftCheck: true` only if your app already checks `isFlagged` itself.

---

# Bug Fixes 0.43.1

### Important

---

This document outlines the changes introduced in our codebase for version 0.43.1.

## Table of Contents

- [Borrower-signed loans expire within minutes](#borrower-signed-loans-expire-within-minutes-0431)

---

## Borrower-signed loans expire within minutes 0.43.1

**Description:**

- FIX: `buyNowPayLater` without a purchase quote now sends `emitExpirationTime`, five minutes ahead, so the borrower's signed loan execution data expires then instead of when the listing does.
- FIX: `efficientRefinanceFromOffers` and any `encodeEmitLoan({ withSignature: true })` call without an explicit `expirationTime` sign execution data that expires after five minutes instead of a day. `emitLoan` and `revokeDelegationsAndEmitLoan`, which the borrower sends without a signature, keep the one-day default.

**Reason:**

A borrower's signature on loan execution data has no reason to outlive the transaction that carries it.

**Migration Steps:**

- Upgrade before using `buyNowPayLater` without a purchase quote: the API requires `emitExpirationTime` on `BNPLOrderInput` unless `creditPurchaseExecution` is set, and refuses earlier versions' requests.
- A purchase or refinance whose transaction is not mined within five minutes of signing reverts with `ExpiredOfferError`; sign again.

---

# New Features 0.43.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.43.0.

## Table of Contents

- [makeTraitOffer places a loan offer on the NFTs carrying a set of traits](#maketraitoffer-places-a-loan-offer-on-the-nfts-carrying-a-set-of-traits-0430)
- [offers() returns set and trait offers](#offers-returns-set-and-trait-offers-0430)

---

## makeTraitOffer places a loan offer on the NFTs carrying a set of traits 0.43.0

**Description:**

- NEW: `gondi.makeTraitOffer({ traitIds, ...terms })` signs and saves a loan offer that any NFT of the collection carrying every one of `traitIds` can borrow against. The terms are those of `makeCollectionOffer`, with `traitIds` in place of `collectionId`.
  - The API resolves the traits to the NFTs carrying them and returns the offer's validator with that set encoded; the SDK signs what the API returns and saves it, as the collection offer flow does.
  - Saving fails with `INVALID_OFFER_VALIDATORS_ERROR` when the NFTs carrying the traits changed between the two steps; generate again. A lender may hold at most two active offers for the same traits, contract, duration and currency.
  - It is available where the API has trait loan offers enabled; elsewhere the mutations do not exist and the call fails with a GraphQL validation error.

**Reason:**

A collection offer reaches every NFT of a collection and an item offer one NFT; nothing covered the NFTs sharing a trait. The protocol's token-set validators now let a lender sign a set of token ids, and the API builds that set from traits.

**Migration Steps:**

- None. Existing methods are unchanged.

---

## offers() returns set and trait offers 0.43.0

**Description:**

- NEW: `gondi.offers(...)` nodes can now be `SetOffer` or `TraitOffer`, both with `collection`; a `TraitOffer` also carries `traits { id type value }`. Their other fields are the `Offer` interface's, as for a `CollectionOffer`.

**Reason:**

The API lists the offers `makeTraitOffer` creates, and the ones recorded from on-chain loans, beside collection offers.

**Migration Steps:**

- Code that switches on `__typename` and treats anything that is not a `SingleNFTOffer` as a collection offer keeps working; code that matched `'CollectionOffer'` exactly should also accept `'SetOffer'` and `'TraitOffer'` where it reads `collection`.

# New Features 0.42.0

### Important

The new purchase route requires API execution support, initialized bundler swap approvals and
enabled marketplace methods. Quote preparation requests no wallet signature. Quotes expire
within 120 seconds. Protected v3.2 buyer offers and taxed nested modules fail closed.

### Table of Contents

- [Buyer currency purchases](#buyer-currency-purchases-0420)

## Buyer currency purchases 0.42.0

**Description:**

- NEW: `quoteBuyWithLoan` prepares unsigned USDC/WETH financing of ETH/WETH/USDC listings,
  including ordinary purchases, v3.1 flash resales and v3.2 nested resales.
- ENHANCEMENT: `buyNowPayLater({ ...input, buyWithLoanQuote })` executes the exact quoted listing,
  signed offers, marketplace payments, swaps and deadline. Existing `creditPurchaseQuote`
  execution and calls without a purchase quote retain their existing routes.
- NEW: exported `BuyWithLoanInput` and discriminated `BuyWithLoanQuote` types.
- ENHANCEMENT: `CreditPurchaseQuote.inputAmount` and nested `BuyWithLoanQuote.inputAmount`
  expose the canonical buyer-token swap budget, including full-funding slippage bounds or
  partial-funding input. Wallet allowances still come from `approvalCaps`.
- ENHANCEMENT: quotes read the live flash premium and expose exact token spending consent in
  `approvalCaps`; execution rechecks allowances and seller state after signing.

**Migration Steps:**

Prepare and confirm a quote, then set every token allowance in `quote.approvalCaps` to exactly
its `amount` for `quote.buyerBundler`, including zero amounts. Native ETH flash purchases financed
with USDC require revoking the WETH allowance to zero so the flash repayment cannot fall back to
unquoted WETH. Send only `quote.initialPayment` as native ETH when the listing is native.
Execute the same quote before its deadline. If it expires or seller state or route permissions
change, prepare and confirm a fresh quote and update every exact allowance before execution.

# New Features 0.41.0

### Important

Nested purchases require the seller executeSell selector to be enabled, zero module taxes, initialized router swap approvals, and the exact quoted buyer allowance. Lowering a larger existing allowance deliberately limits this transaction's spending consent; a later legacy purchase can request its usual approval again.

### Table of Contents

- [Credit purchases of v3.2 seller loans](#credit-purchases-of-v32-seller-loans-0410)

## Credit purchases of v3.2 seller loans 0.41.0

**Description:**

- NEW: `quoteCreditPurchase` fixes the buyer's maximum initial payment and settlement callback
  for v3.1 USDC/WETH buyer loans against v3.2 sell-and-repay listings in USDC, WETH or native ETH.
  Full and partial buyer financing are supported. Quotes expire within 120 seconds.
- `buyNowPayLater({ ...input, creditPurchaseQuote })` uses the v3.1 buyer bundler to call the
  v3.2 seller bundler. It repays the seller loan and escrows the NFT in the buyer's v3.1 loan
  without an outer Aave flash loan. The signed terms and returned API calldata must match the
  confirmed quote. Calls without `creditPurchaseQuote` keep their existing route.
- NEW: exported `CreditPurchaseInput` and `CreditPurchaseQuote` types.

**Migration Steps:**

Activate the seller bundler's `executeSell` selector in the deployed method manager, require
zero extra buyer-bundler taxes for that module, and initialize swap approvals. Set the buyer's
listing-currency allowance to exactly `quote.initialPayment`, or send only that amount as native
ETH. Refresh expired quotes before signing. Protected v3.2 buyer offers are unsupported.

# New Features 0.40.0

### Important

Cross-currency replacement requires the Ethereum migrator route to be activated. It supports
v3.1/v3.2 loans and USDC/WETH only. Existing renegotiation methods are unchanged.

## Table of Contents

- [Atomic cross-currency loan replacement](#atomic-cross-currency-loan-replacement-0400)

## Atomic cross-currency loan replacement 0.40.0

**Description:**

- NEW: `quoteCrossCurrencyRenegotiation({ loan, loanId, executionData, slippageBps? })`
  returns repayment in the old currency and funding, fees, maximum top-up and minimum surplus
  in the new currency. Quotes expire after at most 120 seconds; default slippage is 1%.
- NEW: `crossCurrencyRenegotiation({ ...input, quote })` atomically swaps, repays the old
  loan, and originates a separate replacement loan. Unused swap input returns to the borrower.
- FIX: `mulDivUp` returns zero for a zero product, including zero-APR repayment and existing
  buy-now-pay-later principal calculations.
- FIX: Repayment interest clamps elapsed time to zero before a tranche starts.
- NEW: exported `CrossCurrencyRenegotiationInput` and `CrossCurrencyRenegotiationQuote` types.
- Both currency directions support all v3.1/v3.2 source and destination pairs. The selected
  signed offers determine the destination; no automatic migration is required. Quotes include
  the destination's current lender protocol fee, which is rechecked before execution.

**Migration Steps:**

Use an initial quote to approve `oldCurrencyApprovalAmount` to the old loan contract (the
repayment ceiling through maturity), and approve the NFT to the replacement contract.
Then obtain and confirm a fresh quote, set the migrator allowance to exactly that quote's
`maximumFlashRepayment`, and execute **the same quote** before expiry. If it expires, obtain
and confirm a new quote and update the exact migrator approval; the earlier stable approvals
remain reusable while the old loan is unchanged.
`waitTxInBlock()` returns both the old loan ID and the new loan ID.

# New Features 0.39.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.39.0.

## Table of Contents

- [cancelOrders cancels signed-zone bids without a transaction](#cancelorders-cancels-signed-zone-bids-without-a-transaction-0390)

---

## cancelOrders cancels signed-zone bids without a transaction 0.39.0

**Description:**

- NEW: `gondi.cancelOrders({ orderIds, onChain? })` cancels the wallet's trade orders by id, at most 50 per call.
  - One API call (`cancelTradeOrders`) cancels the bids restricted to the GONDI signed zone (`cancelsOffChain`) without a transaction, and returns the Seaport cancel calldata of every other live order, sent as one transaction per marketplace, as `cancelOrder` sends it. Orders that are already cancelled, filled or expired are skipped.
  - `onChain: true` cancels every order on-chain, including signed-zone bids.
  - It resolves to `{ offChainOrderIds, transactions }`, one `{ txHash, waitTxInBlock }` per transaction. With `onStepChange` set, the API call and each transaction report their steps.
- NEW: orders returned by the API carry `cancelsOffChain`.

**Reason:**

A signed-zone bid only fills with a short-lived signature the API issues, so the API stops signing once the bid is cancelled. An off-chain cancel is final once the last signature already issued for the bid expires, a few minutes at most. An on-chain cancel is final as soon as it is mined, which is what `onChain: true` is for.

**Migration Steps:**

None. `cancelOrder` is unchanged.

# Breaking Changes 0.38.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.38.0.

## Table of Contents

- [collections() no longer returns statistics.numberOfOffers](#collections-no-longer-returns-statisticsnumberofoffers-0380) because the field it read is deprecated and always answered 0

---

## collections() no longer returns statistics.numberOfOffers 0.38.0

**Description:**

- BREAKING: `gondi.collections(...)` no longer selects `statistics.numberOfOffers`, so the field is gone from each returned collection and from the `CollectionsQuery` type.

**Reason:**

`CollectionStatistics.numberOfOffers(currencyAddress:)` is deprecated in the API in favour of `numberOfOffersForCurrencies`, and it answered 0 for every collection regardless of the currency passed, so the value was never usable.

**Migration Steps:**

- If you read `collection.statistics.numberOfOffers`, drop it: it was always 0. There is no single-currency replacement on this query; query `numberOfOffersForCurrencies` against the API directly if you need the count.

# Bug Fixes 0.37.2

### Important

---

This document outlines the changes introduced in our codebase for version 0.37.2.

## Table of Contents

- [Reverted transactions reject instead of reporting success](#reverted-transactions-reject-instead-of-reporting-success-0372)

---

## Reverted transactions reject instead of reporting success 0.37.2

**Description:**

- FIX: with `onStepChange` set, every contract write and raw transaction waited for its receipt and then reported a `success` step, even when the transaction reverted on-chain, and the SDK method resolved normally. A reverted transaction now rejects with `Transaction reverted: <hash>` after the `broadcasted` step, and no `success` step is sent.
- FIX: `OldERC721Wrapper.wrapOldERC721` and `unwrap` returned a `waitMined` that resolved with the receipt of a reverted transaction. It now rejects the same way.
- `assertTransactionSucceeded` (`src/utils/blockchain.ts`) does the check for both.

**Reason:**

viem's `waitForTransactionReceipt` resolves for reverted transactions and only reports the revert in `receipt.status`. A caller that treats the resolved promise or the `success` step as final showed a reverted transaction, such as a repayment, as completed.

**Migration Steps:**

None for correct callers. Code that previously continued after a reverted write now gets a rejection, and should handle it the same way as any other failed transaction.

# Bug Fixes 0.37.1

### Important

---

This document outlines the changes introduced in our codebase for version 0.37.1.

## Table of Contents

- [Tagged calldata is sent as a named contract write](#tagged-calldata-is-sent-as-a-named-contract-write-0371) so transaction steps report the function name again

---

## Tagged calldata is sent as a named contract write 0.37.1

**Description:**

- FIX: `sendTransactionData` used to broadcast any calldata carrying bytes past the ABI-encoded arguments as a raw transaction, so `onStepChange` received the 4-byte selector (`0xf2d12b12`) instead of `matchAdvancedOrders` for every Seaport sale, purchase and trade built by the Gondi API, which appends an attribution tag to that calldata. The trailing bytes are now passed to viem as `dataSuffix`, so the call goes through the simulated, named write path and steps report the function name, while the tag still reaches the chain unchanged.
- `safeContractWrite` accepts `dataSuffix` in its options (`SafeContractWriteOptions`).

**Reason:**

Integrators key their step descriptions by function name. A raw send has no name to report, and the tag is the only reason those sends were raw.

# Breaking Changes 0.37.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.37.0.

## Table of Contents

- [OpenSea bids are fulfilled through the Gondi API](#opensea-bids-are-fulfilled-through-the-gondi-api-0370) so no OpenSea API key is needed client-side

---

## OpenSea bids are fulfilled through the Gondi API 0.37.0

**Description:**

- BREAKING: the `openseaClient` field and the `src/clients/opensea` module are gone. `sellNft` no longer calls the OpenSea API from the client.
- BREAKING: the `openseaApiKey` constructor option is removed. The API key never leaves the server anymore, so the SDK has no use for it.
- ENHANCEMENT: `sellNft` fetches the calldata through `apiClient.getSaleCalldata` for Native and OpenSea bids alike and sends it to the order's marketplace. The API settles OpenSea bids as a Seaport match, so the seller no longer approves WETH before accepting a token-specific bid. For both marketplaces the result is `{ txHash, waitTxInBlock }`, and `waitTxInBlock()` resolves to the transaction receipt only after verifying the Seaport `OrderFulfilled` event was emitted; the OpenSea path used to merge the parsed event arguments into the result instead.

**Reason:**

Fulfilling an OpenSea bid needs OpenSea fulfillment data, which requires an OpenSea API key. Fetching it client-side meant every consumer had to ship that key. The Gondi API already holds one, so it now builds the calldata server-side.

**Migration Steps:**

- Remove `openseaApiKey` from `new Gondi({...})` and `Gondi.create({...})`; passing it is now a type error.
- Replace any use of `gondi.openseaClient.fulfillOrder(...)` with `gondi.sellNft(...)`, or call `gondi.apiClient.getSaleCalldata(...)` directly to get the calldata.
- Grant the collection approval yourself before calling `sellNft`: `setApprovalForAll` on the NFT contract to `order.marketPlaceAddress` (Seaport, for Native and OpenSea bids alike), for example through `gondi.approveNFTForAll`. `sellNft` grants no approval, and the WETH allowance the OpenSea path used to grant for `fulfillAdvancedOrder` is no longer needed.
- If you read `OrderFulfilled` event arguments from the `sellNft` result, parse them from the receipt's `logs` instead.

# Bug Fixes 0.36.2

### Important

---

This document outlines the changes introduced in our codebase for version 0.36.2.

## Table of Contents

- [Native sales priced with every native sentinel](#native-sales-priced-with-every-native-sentinel-0362) so `sellNft` works on chains whose native currency marker is not the zero address

---

## Native sales priced with every native sentinel 0.36.2

**Description:**

- FIX: `sellNft` decided whether an order is priced in the native currency by comparing `order.currencyAddress` to the zero address. Chains such as HyperEVM and Robinhood mark their native currency with a non-zero synthetic sentinel, so a native ask on those chains was fulfilled with `value: 0` (an underfunded transaction) and the OpenSea approval branch treated the sentinel as an ERC-20 to approve. Both checks now go through the existing `isNativeCurrency` helper, which recognizes the zero address and every native sentinel.

**Reason:**

The zero address is only one of the native currency markers. Every native-vs-ERC20 decision must use `isNativeCurrency` so all chains fulfill sales with the correct transaction value.

# Bug Fixes 0.36.1

### Important

---

This document outlines the changes introduced in our codebase for version 0.36.1.

## Table of Contents

- [Typed data messages reduced to the EIP-712 fields](#typed-data-messages-reduced-to-the-eip-712-fields-0361) so wallets only receive the struct being signed

---

## Typed data messages reduced to the EIP-712 fields 0.36.1

**Description:**

- FIX: every locally built `eth_signTypedData_v4` request (`signOffer`, `signRenegotiationOffer`, `signRepaymentData`, `signExecutionData` and the position migration signature) now strips the message down to the fields declared in its EIP-712 `types` before it reaches the wallet.

Structs assembled by spreading API objects used to carry every extra property along: nested NFT and collection metadata, image URLs, lender names and balances. Those extras never affect the EIP-712 hash - signatures are byte-for-byte identical before and after this change - but they were serialized into the wallet request, bloating the signing prompt and tripping wallet security heuristics. Rabby (>= v0.93.99) scans unrecognized typed data for URLs and warns "The transaction is not associated with the website that initiated it" when any URL host differs from the connected site, which flagged refinance and BNPL signatures containing CDN image URLs.

**Reason:**

Wallets should only be shown the data that is actually being signed. Reducing the message to the typed fields removes the scary Rabby warning, keeps the signing prompt readable, and stops leaking unrelated API data to wallet extensions.

# New Features 0.36.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.36.0.

## Table of Contents

- [MSL v3.2 on mainnet](#msl-v32-on-mainnet-0360) the v3.2 deployment addresses, so `lenderRefinanceDisabled` offers resolve on Ethereum

---

## MSL v3.2 on mainnet 0.36.0

**Description:**

- NEW: mainnet addresses for the v3.2 loan suite. `MultiSourceLoan`, `AuctionLoanLiquidator` and `PurchaseBundler` resolve their `3.2` entries to real deployments instead of `zeroAddress`.

Every consumer that keys off deployment presence follows automatically: `getVersionFromMslAddress` resolves a v3.2 loan instead of throwing, and version lookups that skip `zeroAddress` entries now include `3.2`. Offers carrying `lenderRefinanceDisabled` can be signed for the v3.2 contract on Ethereum, and loans on it can be repaid, refinanced and migrated through the SDK.

| Contract              | Address                                      |
| --------------------- | -------------------------------------------- |
| MultiSourceLoan       | `0xE365fF3cad44d19cb7aBa81df8ffd6818A66Ac0a` |
| AuctionLoanLiquidator | `0xe6Ef33216348dDb2303a19Bb970e83d6508FabA5` |
| PurchaseBundler       | `0x2B5E66c44B223b9D3B192e697F58795febCd6C10` |

**Reason:**

The v3.2 suite is deployed and verified on Ethereum. Until these addresses shipped, the SDK resolved `3.2` to `zeroAddress` on mainnet, so no v3.2 loan or offer could be addressed there.

---

# Breaking Changes 0.35.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.35.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Listings can no longer be hidden](#listings-can-no-longer-be-hidden-0350) `hideOrder()` and `showOrder()` are bid-only and now require `isAsk`

---

## Listings can no longer be hidden (0.35.0)

**Description:**

Hiding a listing off-chain is gone. Cancelling a listing on-chain is the only supported way to take it down, and a listing hidden before this change stays hidden — it is cancelled rather than brought back.

- BREAKING: `hideOrder()` and `showOrder()` now require an `isAsk` argument. Passing `true` throws; the call is never sent.
- DEPRECATED: both methods, which apply to bids only. The API rejects a listing in either direction.

**Reason:**

The API refuses to hide or unhide a listing, so relaying one costs a round trip to a call that always fails. Making `isAsk` required means the caller states the side up front and gets a local error instead, and no caller can silently keep hiding listings against an API that no longer allows it.

**Migration Steps:**

Pass `isAsk` on every call, and replace listing hides with an on-chain cancellation:

```typescript
// Before
await gondi.hideOrder({ id: order.id });

// After — a bid
await gondi.hideOrder({ id: order.id, isAsk: order.isAsk });

// After — a listing
await gondi.cancelOrder({
  cancelCalldata: order.cancelCalldata,
  marketPlaceAddress: order.marketPlaceAddress,
});
```

---

# New Features 0.34.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.34.0.

## Table of Contents

- [Dedicated public client](#dedicated-public-client-0340) optional `publicClient` to run reads, simulations and receipt polling on your own RPC instead of the wallet's transport

---

## Dedicated public client 0.34.0

**Description:**

- NEW: `Gondi` (and `Gondi.create`) accept an optional `publicClient`. When provided, every read operation — pre-broadcast transaction simulations (`safeContractWrite`), `waitForTransactionReceipt` polling (including the `onStepChange` wallet wrapper) and contract reads — goes through that client instead of a client derived from the wallet's transport. This avoids wallet-provider RPC flakiness (rate limits, load-balanced nodes with inconsistent state) that could surface as spurious failures after a transaction had already landed on-chain. The client must be connected to the same chain as `wallet`. When omitted, behavior is unchanged: reads keep using the wallet's transport.
- ENHANCEMENT: contract wrappers now share the `Gondi` instance's public client (with its receipt-wait retries) instead of each deriving their own from the wallet's transport, extending the 0.30.2 receipt-polling fix to the contract-level `waitTxInBlock` calls.

```typescript
const publicClient = createPublicClient({ chain: mainnet, transport: http(MY_RPC_URL) });
const gondi = Gondi.create({ wallet, publicClient, onStepChange });
```

---

# New Features 0.33.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.33.0.

## Table of Contents

- [Robinhood Chain deployment addresses](#robinhood-chain-deployment-addresses-0330) fill the contract registry with the deployed, on-chain verified contracts

## Robinhood Chain deployment addresses (0.33.0)

- NEW: the Robinhood Chain (chain id 4663) contract registry now carries the deployed and on-chain verified contracts: MultiSourceLoan `'3.1'` (`0x0e79e08e9E35388382b7FebB26Bc73F80465e2fB`), AuctionLoanLiquidator `'3.1'` (`0xF4b2c5735247c74F40D7505EF2B5bA368651A5C8`), UserVault `'3'` (`0xcf0DF26aE14D132084E95EE8a9426d53eb027cb7`), and PurchaseBundler `'3.1_PB_V2'` (`0xfa13dfde6fdf37A2CB4151195f95940285F70754`). PurchaseBundler `'3.1'` stays at the zero address in favour of `'3.1_PB_V2'`, matching mainnet.
- ENHANCEMENT: with the registry filled, version lookups and the default contract resolution work on Robinhood Chain: MultiSourceLoan resolves to `'3.1'`, the purchase bundler resolves to the PB_V2 client, and the UserVault default resolves to `'3'`. Aave has no deployment on the chain, so the sell-and-repay flash-loan paths remain unavailable there by design; Cryptopunks likewise stays at the zero address.

# New Features 0.32.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.32.0.

## Table of Contents

- [Robinhood Chain scaffolding](#robinhood-chain-scaffolding-0320) adds the chain, its currencies, and marketplace routing ahead of the contract deployment
- [Version lookups skip undeployed slots](#version-lookups-skip-undeployed-slots-0320) so a zero address can no longer resolve to a placeholder version

## Robinhood Chain scaffolding (0.32.0)

- NEW: `robinhood` chain export (chain id 4663) and a contract registry entry. Gondi lending contracts are not deployed there yet — every slot holds the zero address and fills in with the deployment; Seaport is live at its canonical address.
- ENHANCEMENT: `getCurrencies(chain)` is chain-aware (defaulting to mainnet for backwards compatibility) and the purchase-bundler flash-loan path resolves the wrapped native for the wallet's chain instead of always mainnet WETH. On Robinhood Chain `USDC_ADDRESS` carries USDG, the chain's dollar stable.
- ENHANCEMENT: `isNativeCurrency` recognizes the Robinhood native-ETH sentinel; OpenSea order fulfillment maps the chain to its `robinhood` slug.
- ENHANCEMENT: the `hyperliquid` and `robinhood` chain exports now come from `viem/chains` (full chain definitions instead of `{ id }` stubs). The viem peer requirement is raised to `^2.55.13`, the first release shipping both definitions.

## Version lookups skip undeployed slots (0.32.0)

- FIX: `getVersionFromMslAddress`, `getVersionFromPurchaseBundlerAddress`, and `getVersionFromUserVaultAddress` no longer match undeployed zero-address slots; looking up the zero address now throws instead of silently resolving to a placeholder version.

# New Features 0.31.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.31.0.

## Table of Contents

- [MultiSourceLoan v3.2, lenderRefinanceDisabled and named borrowers](#multisourceloan-v32-lenderrefinancedisabled-and-named-borrowers-0310) support the new contract version, the lender opt-out of refinances, and offers restricted to one borrower

---

## MultiSourceLoan v3.2, lenderRefinanceDisabled and named borrowers 0.31.0

**Description:**

- NEW: contract version `'3.2'` is supported end to end: v3.2 ABI (`generated/blockchain/v8`), address book entries (`GONDI_MULTI_SOURCE_LOAN_V8`, `GONDI_AUCTION_LOAN_LIQUIDATOR_V8`, `GONDI_PURCHASE_BUNDLER_V8` overrides on Anvil), and `MslV6` handling with EIP-712 domain version `3.2`.
- NEW: `lenderRefinanceDisabled` on single-NFT and collection offer inputs (optional, defaults to `false`) lets a lender refuse refinances of the loans their offer funds. On v3.2 it is part of the lender-signed `LoanOffer`, and a loan is flagged when any funding offer sets it. `refinanceFull` and `refinancePartial` against a flagged loan revert with `LenderRefinanceDisabledError`, while repayment and borrower-funded refinances (`refinanceFromOffers`) keep working.
- NEW: `borrowerAddress` on an offer is part of the lender-signed `LoanOffer` from v3.2, so an offer can name the only borrower allowed to take it. The zero address, which the SDK still fills in when no borrower is given, leaves the offer open to anyone; taking a named offer as anyone else reverts with `InvalidBorrowerError`.
- NEW: `isLoanVersion` returns `isV3_2`.
- ENHANCEMENT: `listOffers` and `listLoans` select `lenderRefinanceDisabled`, so offers passed to `emitLoan` and loans passed to contract calls carry the flag.
- ENHANCEMENT: the default MultiSourceLoan contract resolves to v3.2 where it is deployed and falls back to v3.1 otherwise.

**Notes:**

- Loans and offers fetched outside the SDK must include `lenderRefinanceDisabled` for v3.2 contract calls; the field defaults to `false` when absent, which only matches unflagged loans and offers.

---

# New Features 0.30.4

### Important

---

This document outlines the changes introduced in our codebase for version 0.30.4.

## Table of Contents

- [Anvil chain id override](#anvil-chain-id-override-0304) `ANVIL_CHAIN_ID` environment variable overrides the local anvil chain id

---

## Anvil chain id override 0.30.4

**Description:**

- NEW: the chain id used for the local anvil contract deployment can now be overridden with the `ANVIL_CHAIN_ID` environment variable (default remains `31337`). Multi-instance local dev environments that run each anvil fork on its own chain id can now use the SDK against those forks; previously `getContracts` threw `No contracts found for chain <id>` for any local chain id other than `31337`. The variable is read lazily, like the existing `GONDI_*` contract address overrides, so it can be set any time before the first contract call.

---

# Bug Fixes 0.30.3

### Important

---

This document outlines the changes introduced in our codebase for version 0.30.3.

## Table of Contents

- [Patient receipt waits](#patient-receipt-waits-0303) transaction receipt waits retry pending lookups and give up only after 6 minutes

---

## Patient receipt waits 0.30.3

**Description:**

- FIX: every `waitForTransactionReceipt` (the step callback's broadcasted→success wait and all `waitTxInBlock` results) previously inherited viem's defaults, which reject with `TransactionReceiptNotFoundError` after only a handful of lookup retries when the RPC node lags behind the mempool — often seconds after broadcasting — and otherwise time out at 180s. Slow-to-mine transactions surfaced as failures even though they later confirmed. All public clients now retry pending-receipt lookups and keep waiting for up to 6 minutes total, throwing `WaitForTransactionReceiptTimeoutError` (with the transaction hash) only once that window is exhausted.

---

# Bug Fixes 0.30.2

### Important

---

This document outlines the changes introduced in our codebase for version 0.30.2.

## Table of Contents

- [OpenSea error logging](#opensea-error-logging-0302) surface the OpenSea response body and request path in failed fulfillment errors

---

## OpenSea error logging 0.30.2

**Description:**

- FIX: `Opensea.postApi` discarded OpenSea's response body on non-2xx responses, so `sellNft` failures surfaced only as opaque `OpenSea API error: 400` messages (empty `statusText`, no reason). The thrown error now includes the request path and OpenSea's response body, making stale/invalid-offer rejections diagnosable.
- FIX: the request URL joined `apiUrl` and `path` with a literal slash while both already carried one, producing a double slash (`/api/v2//offers/...`). The join now trims the boundary slashes.

---

# Bug Fixes 0.30.1

### Important

---

This document outlines the changes introduced in our codebase for version 0.30.1.

## Table of Contents

- [Anvil UserVault address](#anvil-uservault-address-0301) corrected stale fallback and per-call environment resolution

---

## Anvil UserVault address 0.30.1

**Description:**

- FIX: the anvil fallback address for `UserVault` version `3` pointed at a contract that is no longer the vault on dev chains (`0x4A67…`), so `createUserVault` reverted on `mint`. It now defaults to the deployed dev vault (`0x0963…`).
- FIX: `getContracts` builds its per-chain table on every call, so `GONDI_*` environment overrides set by the host application at any point (for example `GONDI_USER_VAULT_V6`) are honored instead of being snapshotted at module load.

---

# New Features 0.30.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.30.0.

## Table of Contents

- [NFT Transfer](#nft-transfer-0300) new `transferNFT` method to send an NFT to another wallet

---

## NFT Transfer 0.30.0

**Description:**

- NEW: `transferNFT` transfers an NFT owned by the connected wallet to another wallet. It supports `ERC721` (default), `ERC1155`, naked `CryptoPunks` (`transferPunk`) and old pre-ERC721 collections (`OldERC721`). The write is simulated before broadcasting and the returned `waitTxInBlock` resolves with the parsed transfer event and the receipt.

```typescript
const { txHash, waitTxInBlock } = await gondi.transferNFT({
  to: '0xRecipient',
  nftAddress: '0xCollection',
  tokenId: 1n,
});
const result = await waitTxInBlock();
```

---

# Bug Fixes 0.29.15

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.15.

## Table of Contents

- [Configurable SIWE `issuedAt`](#configurable-siwe-issuedat-02915) allow callers to provide a server-issued timestamp for sign-in messages

---

## Configurable SIWE `issuedAt` 0.29.15

**Description:**

- ENHANCEMENT: `buildSiweMessage` now accepts an optional `issuedAt` timestamp. When provided, the SIWE message uses that timestamp instead of reading the local client clock.
- ENHANCEMENT: The SDK `signIn` helper accepts and forwards the optional `issuedAt` timestamp to `buildSiweMessage`. Existing callers keep the previous behavior when the argument is omitted.

---

# Bug Fixes 0.29.14

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.14.

## Table of Contents

- [Contract Address Update](#contract-address-update-02914) updated PurchaseBundler `3` address

---

## Contract Address Update 0.29.14

**Description:**

Updated the PurchaseBundler version `'3'` contract address on mainnet to the latest deployment (`0xcea7eea12c6fc82d0318704b9d35a4192c2d260a`).

---

# Bug Fixes 0.29.13

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.13.

## Table of Contents

- [Contract Address Update](#contract-address-update-02913) updated PurchaseBundler `3.1_PB_V2` address

---

## Contract Address Update 0.29.13

**Description:**

Updated the PurchaseBundler version `'3.1_PB_V2'` contract address on mainnet to the latest deployment (`0xf46a58cada29ff34cf62f72357d2b37815506feb`).

---

# New Features 0.29.12

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.12.

## Table of Contents

- [`maxSeniorRepayment` on Refinance Fallback Offer](#maxseniorrepayment-on-refinance-fallback-offer-02912) configure the fallback `SingleNFTOffer` produced by `makeRefinanceOffer({ withFallbackOffer: true })`

---

## `maxSeniorRepayment` on Refinance Fallback Offer 0.29.12

**Description:**

- ENHANCEMENT: `Gondi.makeRefinanceOffer` now accepts an optional `maxSeniorRepayment` argument when `withFallbackOffer: true`. The value is forwarded to the fallback `SingleNFTOffer` instead of the previously hardcoded `0n`, letting callers cap senior-tranche repayment on the fallback path the same way they would for a stand-alone offer. The argument is only valid alongside `withFallbackOffer: true`; the other variants of `makeRefinanceOffer` continue to reject it at the type level. Default behavior is unchanged when the argument is omitted.

---

# New Features 0.29.11

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.11.

## Table of Contents

- [Preserve Trailing Bytes on Raw Contract Calls](#preserve-trailing-bytes-on-raw-contract-calls-02911) attribution-tag bytes appended past the ABI payload are no longer dropped

---

## Preserve Trailing Bytes on Raw Contract Calls 0.29.11

**Description:**

- FIX: `BaseContract.sendTransactionWithAbiValidation` previously decoded calldata against the contract ABI and routed it through `safeContractWrite`, which re-encodes from `args` and silently dropped any trailing bytes (e.g. the gondi attribution tag appended to seaport calldata by the backend). When trailing bytes are detected, the call now goes through a new `safeRawWrite` path that `eth_call`s the original calldata for revert safety and broadcasts the original bytes unchanged.
- ENHANCEMENT: Reverts from the raw-calldata path are decoded against the contract ABI via `decodeErrorResult`, so callers see the same custom-error names and args that `safeContractWrite` would have surfaced through `simulateContract`.

---

# New Features 0.29.10

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.10.

## Table of Contents

- [Drop `siwe` and `ethers` runtime dependencies](#drop-siwe-and-ethers-runtime-dependencies-02910) inline a minimal SIWE message builder
- [Move tests to top-level `tests/` folder](#move-tests-to-top-level-tests-folder-02910) tests now live as a sibling of `src/`

---

## Drop `siwe` and `ethers` runtime dependencies 0.29.10

**Description:**

- CHANGE: Removed `siwe` and `ethers` from `dependencies`. The SIWE message used during sign-in is now produced by a minimal local helper, `buildSiweMessage`, in `src/clients/api/siwe.ts` (re-exported as `Gondi.buildSiweMessage`). The function emits a byte-for-byte identical EIP-4361 message to what `new SiweMessage(...).prepareMessage()` produced.
- CHANGE: `buildSiweMessage` validates the `address` argument with viem's `getAddress` and throws if the input isn't already in EIP-55 checksum form. This matches the previous behavior of `SiweMessage`, which rejected non-checksummed and otherwise malformed addresses at construction time. In practice the address comes from `wallet.account.address` (viem returns checksummed), so the production flow is unaffected.
- CHANGE: `siwe` is now a `devDependency` only, used by the parity test under `tests/clients/api/auth.test.ts` to lock the new helper's output against the upstream library.
- **Why this matters**: Removes ~hundreds of KB of transitive deps (notably `ethers`) from the published bundle. SDK consumers who imported `SiweMessage` from `siwe` transitively via `gondi` should add `siwe` to their own dependencies.

---

## Move tests to top-level `tests/` folder 0.29.10

**Description:**

- CHANGE: Existing `*.test.ts` files were moved out of `src/` into a sibling `tests/` directory mirroring the source layout (e.g. `src/utils/algorithm.test.ts` → `tests/utils/algorithm.test.ts`). `bun test` discovers them automatically; no script changes were required.
- NEW: Added `tests/clients/api/auth.test.ts` covering `buildSiweMessage` parity with `SiweMessage.prepareMessage()` across multiple chains/nonces and verifying both implementations reject the same set of malformed addresses (wrong checksum, all-lowercase, wrong length, missing `0x`, non-hex).

---

# New Features 0.29.9

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.9.

## Table of Contents

- [Mutation Variables in Step Callback](#mutation-variables-in-step-callback-0299) `onStepChange` now exposes the variables sent with each mutation

---

## Mutation Variables in Step Callback 0.29.9

**Description:**

- ENHANCEMENT: The `'api'` variant of the `Step` type emitted to `onStepChange` now carries an optional `variables: OperationVariables` field, populated for both the `'waiting'` and `'success'` statuses inside `getSdkApollo`. Consumers building UI/telemetry on top of `onStepChange` can now correlate the mutation step with the payload that was sent, without intercepting the Apollo link.

---

# New Features 0.29.8

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.8.

## Table of Contents

- [Multiple Trait Order Support](#multiple-trait-order-support-0298) publish flow now resolves to `MultipleTraitOrder` in addition to `TraitOrder`

---

## Multiple Trait Order Support 0.29.8

**Description:**

- ENHANCEMENT: `publishOrderForTrait` GraphQL mutation now selects the `MultipleTraitOrder` branch of the `TraitOrderSignatureRequest` union, exposing `id`, `status`, `signature`, and `marketPlaceAddress` when the backend resolves the input as a multi-trait order.
- ENHANCEMENT: `Gondi.makeOrder()` recognizes `MultipleTraitOrder` as a valid resolved order `__typename` alongside `SingleNFTOrder`, `CollectionOrder`, and `TraitOrder`, so callers no longer hit the "This should never happen" guard when the backend returns a multi-trait order.
- CHANGE: Regenerated GraphQL types and schema to reflect new backend fields: `executions`/`maxExecutions` on `TraitOrder` and `MultipleTraitOrder`, `itemType` on `Collection`, `collection` and `statistics` on `Edition` (with new `EditionStatistics` type), a `CollectionOrderType` enum, and an `orderTypes` argument on `listOrdersV2`.

---

# New Features 0.29.7

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.7.

## Table of Contents

- [Prorated Origination Fee Helper](#prorated-origination-fee-helper-0297) compute the smallest origination fee for a target effective APR
- [Backend-Signed Offer Fee](#backend-signed-offer-fee-0297) offer signatures now bind to the fee returned by the backend

---

## Prorated Origination Fee Helper 0.29.7

**Description:**

- NEW: Added `calculateProratedOriginationFee` as a static method on the `Gondi` class (`Gondi.calculateProratedOriginationFee`). Given `principal`, `aprBps`, `duration` (seconds), and a target `effectiveApr` (percent), it returns `{ fee, actualEaprBps }` — the smallest origination fee (as `bigint`) whose backend-computed effective APR reaches the target, along with that APR in basis points. Because the backend's `getEaprBps` applies floor division twice, some target eAPRs are unrepresentable as a step in the integer fee domain; callers detect this by comparing `actualEaprBps` against the expected target.
- NEW: Added `lowerBound` in `@/utils/algorithm` — smallest `bigint` in `[lo, hi]` where a monotonic predicate becomes true. Uses `lo + (hi - lo) / 2n` to stay correct on negative ranges under BigInt's truncate-toward-zero division.
- NEW: Added `product` in `@/utils/array` — a generator for the cartesian product of arrays, typed to preserve each input's element type.
- NEW: Added shared helpers in `@/utils/number`: `perToBps`, `bpsToPer`, `floatToBigInt`.
- NEW: Added `DAYS_IN_YEAR` and renamed `SECONDS_PER_YEAR` → `SECONDS_IN_YEAR` in `@/utils/dates`.
- NEW: Tests added under `src/utils/originationFee.test.ts` and `src/utils/algorithm.test.ts` exercised via `bun test` (new `test` script in `package.json`). `@types/bun` added to devDependencies and `bun` appended to `tsconfig.json` types.

---

## Backend-Signed Offer Fee 0.29.7

**Description:**

- CHANGE: `makeSingleNftOffer` and `makeCollectionOffer` now sign the `fee` returned by the backend's `generate*OfferHash` response rather than any client-supplied value. The backend-authoritative fee is folded into both the struct passed to the wallet for signing and the final signed-offer payload.
- CHANGE: The `generateSingleNftOfferHash` and `generateCollectionOfferHash` GraphQL mutations now select the `fee` field; the generated schema and TypeScript types have been regenerated accordingly.
- **Why this matters**: The on-chain fee is now pinned by the backend, so signatures cannot be reused with a different fee than the one the backend approved. Integrators that previously relied on the client-set `fee` in the signed struct should double-check their flow — the backend's value wins.

---

# New Features 0.29.6

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.6.

## Table of Contents

- [Publish Trait Orders](#publish-trait-orders-0296) support publishing marketplace orders for NFT traits

---

## Publish Trait Orders 0.29.6

**Description:**

- NEW: Added `publishOrderForTrait` GraphQL mutation in `@/clients/api/graphql/mutations/orders` for publishing trait-based orders.
- ENHANCEMENT: `Gondi.makeOrder()` and `Api.publishOrder()` now accept `TraitOrderInput` in addition to `SingleNftOrderInput` and `CollectionOrderInput`. Trait orders are routed automatically based on the presence of `traitIds` in the input.
- ENHANCEMENT: The response handler in `makeOrder()` now recognizes `TraitOrder` as a valid resolved order type alongside `SingleNFTOrder` and `CollectionOrder`.

---

# Changes 0.29.5

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.5.

## Table of Contents

- [Lending API URL Split](#lending-api-url-split-0295) separate lending GraphQL endpoint from the general API domain

---

## Lending API URL Split 0.29.5

**Description:**

- NEW: Added `lendingApiDomain()` helper in `@/clients/api` that returns the lending GraphQL endpoint (`https://api2.gondi.xyz`), independent from the existing `apiDomain()` (`https://api.gondi.xyz`). Both still honor `GONDI_URL` when set.
- CHANGE: The Apollo lending client now builds its URL from `lendingApiDomain()` instead of `apiDomain()`, so the lending GraphQL endpoint no longer piggy-backs on the general API host.
- CHANGE: Updated the default `GONDI_API` schema URL used by `bun run gql:types` (codegen) to point at `https://api2.gondi.xyz/lending/graphql`.

---

# Bug Fixes 0.29.4

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.4.

## Table of Contents

- [BNPL Hyperliquid Fix](#bnpl-hyperliquid-fix-0294) fix native currency detection for Hyperliquid

---

## BNPL Hyperliquid Fix 0.29.4

**Description:**

- FIX: Extended `isNativeCurrency` to recognize Hyperliquid's native HYPE token address (`0x0000000000000000000000000000000000000999`) in addition to the standard ETH zero address
- NEW: Exported `__ETH_ADDRESS` and `__HYPE_ADDRESS` constants for native currency addresses

---

# Changes 0.29.3

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.3.

## Table of Contents

- [CI Fix](#ci-fix-0293) fix npm publish and prevent orphaned releases

---

## CI Fix 0.29.3

**Description:**

- FIX: Pinned esbuild devDependency to `0.25.12` to match override and resolve `EOVERRIDE` error during `npm publish`
- FIX: Reordered CI workflow to run npm publish before creating GitHub tag/release
- FIX: Removed silent error swallowing (`|| echo "Does not publish"`) so publish failures are visible
- ENHANCEMENT: GitHub release and tag are now conditional on successful npm publish

---

# Changes 0.29.2

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.2.

## Table of Contents

- [CI Improvements](#ci-improvements-0292) verify script, security audit, and changelog check fixes

---

## CI Improvements 0.29.2

**Description:**

- NEW: Added `verify` script in `package.json` combining `lint` and `fmt-check`
- NEW: Added `bun audit` security audit step to CI workflows (`lint.yaml` and `main.yaml`)
- FIX: Fixed `changelog-check.yml` workflow bypassing failure when later commits don't touch `package.json`
- ENHANCEMENT: Changelog check now accepts multiple header types (`Breaking Changes`, `New Features`, `Changes`, `Bug Fixes`)
- ENHANCEMENT: Added `overrides` in `package.json` to resolve transitive dependency vulnerabilities (minimatch, ws, handlebars, flatted, picomatch, node-fetch, immutable, ajv, lodash, yaml, yargs-parser, esbuild)

---

# Changes 0.29.1

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.1.

## Table of Contents

- [Enable V3 Sell and Repay](#enable-v3-sell-and-repay-0291) PurchaseBundler V3 mapping fix and Hyperliquid support

---

## Enable V3 Sell and Repay 0.29.1

**Description:**

- FIX: PurchaseBundler version `'3'` now correctly maps to `PurchaseBundlerV2` instead of `PurchaseBundlerV1`
- FIX: Removed incompatibility check that prevented `PurchaseBundlerV2` from working with MslV5/MslV6
- FIX: Updated PurchaseBundler `'3'` and `'3.1'` contract addresses on mainnet
- NEW: Added `hyperliquid` blockchain configuration (chain ID 999)

---

# New Features 0.29.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.29.0.

## Table of Contents

- [Cancel Offers](#cancel-offers-0290) batch offer cancellation in a single transaction

---

## Cancel Offers 0.29.0

**Description:**

Added a new `cancelOffers()` method to the `Gondi` class for canceling multiple offers in a single transaction via multicall. Supported on V5 and V6 contracts (V4 throws "Not implemented").

**API:**

```typescript
await gondi.cancelOffers({
  ids: [offerId1, offerId2, offerId3],
  contractAddress: mslContractAddress,
});
```

Returns transaction hash and receipt with parsed `OfferCancelled` events.

---

# Bug Fixes 0.28.1

### Important

---

This document outlines the changes introduced in our codebase for version 0.28.1.

## Table of Contents

- [Contract Address Fix](#contract-address-fix-0281) updated PurchaseBundler 3.1_PB_V2 address

---

## Contract Address Fix 0.28.1

**Description:**

Updated the PurchaseBundler version `'3.1_PB_V2'` contract address on mainnet to the correct deployment address.

---

# Breaking Changes 0.28.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.28.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [New Features](#new-features-0280) bulk NFT orders publishing added

---

## New Features 0.28.0

**Description:**

Added a new `makeOrders()` method to the `Gondi` class for publishing multiple NFT orders in a single batch operation. This complements the existing single-order flow and improves efficiency when creating multiple orders at once.

The method supports a signature request flow: if the API requires a signature, it will prompt the wallet to sign the typed data before finalizing the orders.

**API:**

```typescript
const orders = await gondi.makeOrders([
  {
    // SingleNftOrderInput
    nftId: '...',
    price: 1000000000000000000n,
    // ... other order fields
  },
  // ... more orders
]);
```

The method returns the published orders from the `BulkNFTOrdersResult`.

---

# Breaking Changes 0.27.3

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.27.3. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [OnStepChange Refactor](#onstepchange-refactor) `id` and `executionId` removed, new `api` step type added
- [reservoirApiKey Removed](#reservoirapikey-removed) removed from `GondiProps`
- [encodeRepayLoan / encodeEmitLoan](#encoderepayloan--encodeemitloan) `onStepChange` parameter removed from internal contract methods

---

## OnStepChange Refactor

**Description:**

The `onStepChange` callback system has been refactored:

- BREAKING: The `id` field has been removed from the `Step` type. Steps no longer carry an incrementing numeric identifier.
- BREAKING: The `executionId` parameter has been removed from `Gondi.create()`.
- NEW: A new `'api'` step type has been added to track GraphQL mutation progress (with `mutationName` field).
- ENHANCEMENT: `onStepChange` can now be passed directly to the `Gondi` constructor (not just `Gondi.create()`), and it now also tracks API mutations automatically.

**Migration Steps:**

```typescript
// Before
const gondi = Gondi.create({
  wallet,
  onStepChange: (step) => {
    console.log(step.id, step.type, step.status);
  },
  executionId: 5,
});

// After
const gondi = Gondi.create({
  wallet,
  onStepChange: (step) => {
    // step.id no longer exists
    // step.type can now be 'signature' | 'transaction' | 'api'
    console.log(step.type, step.status);
  },
});

// Or pass onStepChange directly to the constructor:
const gondi = new Gondi({
  wallet,
  onStepChange: (step) => {
    console.log(step.type, step.status);
  },
});
```

---

## reservoirApiKey Removed

**Description:**

The `reservoirApiKey` option has been removed from `GondiProps`.

**Migration Steps:**

Remove any `reservoirApiKey` usage from your Gondi constructor calls:

```typescript
// Before
const gondi = new Gondi({ wallet, reservoirApiKey: 'key' });

// After
const gondi = new Gondi({ wallet });
```

---

## encodeRepayLoan / encodeEmitLoan

**Description:**

The `onStepChange` parameter has been removed from `encodeRepayLoan` (MslV5, MslV6) and `encodeEmitLoan` (MslV6). Step tracking is now handled automatically at the wallet level via the `onStepChange` callback passed to `Gondi.create()` or the constructor.

**Migration Steps:**

Remove the `onStepChange` parameter from calls to these internal methods:

```typescript
// Before
await msl.encodeRepayLoan({ repayArgs, withSignature: true, onStepChange: () => {} });
await msl.encodeEmitLoan({ emitArgs, withSignature: true, onStepChange: () => {} });

// After
await msl.encodeRepayLoan({ repayArgs, withSignature: true });
await msl.encodeEmitLoan({ emitArgs, withSignature: true });
```

---

# Bug Fixes 0.27.2

### Important

---

This document outlines the changes introduced in our codebase for version 0.27.2.

## Table of Contents

- [BNPL Currency Fix](#bnpl-currency-fix-0272) fixed ETH being passed for non-native currency loans

---

## BNPL Currency Fix 0.27.2

**Description:**

Fixed `buyNowPayLater()` to only pass ETH value when the loan currency is native (ETH). Previously, ETH was always sent regardless of the currency type, which caused issues with stablecoin-denominated loans.

Added `isNativeCurrency()` utility function and updated GraphQL schema with new `currencyAddress` field on `BuyNowPayLaterOrder`.

---

# Breaking Changes 0.27.1

### Important

---

This document outlines the changes introduced in our codebase for version 0.27.1. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [New Features](#new-features-0271) hideOffers batch mutation method added

---

## New Features 0.27.1

**Description:**

Added a new `hideOffers()` method to the `Gondi` class for batch hiding multiple offers in a single transaction. This complements the existing `hideOffer()` method and improves efficiency when managing multiple offers.

**API:**

```typescript
await gondi.hideOffers({
  ids: offerIds,
  contractAddress: contractAddress,
});
```

The method accepts an array of offer IDs and hides them all in a single batch mutation.

---

# Breaking Changes 0.27.0

### Important

---

This document outlines the changes introduced in our codebase for version 0.27.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Bug Fixes](#bug-fixes-0270) fixed missing Int64 field references

---

## Bug Fixes 0.27.0

**Description:**

- Fixed missing Int64 field references that were introduced in v0.26.3. The Int64 scalar type was previously added in v0.26.3 where `orderId` changed from `bigint` to `number`, but some references were missing and have now been corrected.

---

# Breaking Changes 0.26.3

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.26.3. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Int64 Scalar Type](#int64-scalar-type) orderId type changed from bigint to number

---

## Int64 Scalar Type

**Description:**

The `orderId` field type has been changed from `bigint` to `number` (Int64 scalar) in the following methods:

- `hideOrder()` mutation
- `showOrder()` mutation
- `getSaleCalldata()` query

This change aligns with GraphQL's Int64 scalar type for better API compatibility. Note that Int64 can represent values up to 2^53-1 accurately in JavaScript.

**Migration Steps:**

Update any code that passes `orderId` as `bigint` to use `number` instead:

```typescript
// Before
await gondi.hideOrder({ id: 123n, contractAddress: '0x...' });

// After
await gondi.hideOrder({ id: 123, contractAddress: '0x...' });
```

---

# Breaking Changes 0.26.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.26.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [PurchaseBundler V2](#purchasebundler-v2) major refactor with new required parameters

---

## PurchaseBundler V2

**Description:**

PurchaseBundler has been upgraded to V2 with significant changes:

- `PurchaseBundler.ts` renamed to `PurchaseBundlerV1.ts`
- New `PurchaseBundlerV2` contract wrapper added
- Methods now require `purchaseBundlerAddress` parameter:
  - `buyNowPayLater()`
  - `buyWithSellAndRepay()`
  - `sellAndRepay()`
- Added swap data support for improved trading flexibility

**Migration Steps:**

Update all PurchaseBundler method calls to include the new required parameter:

```typescript
// Before
await gondi.buyNowPayLater({
  loan,
  price,
  // ... other params
});

// After
await gondi.buyNowPayLater({
  loan,
  price,
  purchaseBundlerAddress: '0x...', // Required
  sellAndRepaySwapData: swapData, // Optional
  repayFlashLoanSwapParams: swapParams, // Optional
  // ... other params
});
```

---

# Breaking Changes 0.25.1

### Important

---

This document outlines the changes introduced in our codebase for version 0.25.1. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Make Deal](#make-deal) new method for publishing deals

---

## Make Deal

**Description:**

New `makeDeal()` method added for publishing deals with signatures:

```typescript
const deal = await gondi.makeDeal({
  // DealInput parameters
});
```

---

# Breaking Changes 0.25.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.25.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [OnStepChange Opt-In](#onstepchange-optin) enhanced callback handling for transaction tracking

---

## OnStepChange Opt-In

**Description:**

Enhanced the `onStepChange` callback feature (originally introduced in v0.24.4) with opt-in improvements:

- Refined callback behavior to be opt-in
- Better integration with wallet step tracking
- Improved transaction progress monitoring

**Migration Steps:**

The `onStepChange` callback remains optional when creating Gondi instance:

```typescript
const gondi = await Gondi.create({
  wallet,
  onStepChange: (step) => {
    console.log('Transaction step:', step);
  },
  executionId: 'unique-id', // Optional
});
```

---

# Breaking Changes 0.24.7

### Important

---

This document outlines the changes introduced in our codebase for version 0.24.7. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Sell and Repay OpenSea](#sell-and-repay-opensea) enhanced OpenSea data support

---

## Sell and Repay OpenSea

**Description:**

Enhanced `makeSellAndRepayOrder()` with additional OpenSea data support for improved marketplace integration.

---

# Breaking Changes 0.24.4

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.24.4. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [OnStepChange Callback](#onstepchange-callback) Gondi.create() now accepts callback for transaction tracking

---

## OnStepChange Callback

**Description:**

`Gondi.create()` now accepts an optional `onStepChange` callback for tracking transaction progress:

- New `OnStepChange` type exported
- Added `executionId` parameter
- Step tracking with new types and codes for monitoring transaction states

**Migration Steps:**

To track transaction progress, provide the callback when creating Gondi instance:

```typescript
const gondi = await Gondi.create({
  wallet,
  onStepChange: (step) => {
    console.log('Transaction step:', step);
  },
  executionId: 'unique-id', // Optional
});
```

---

# Breaking Changes 0.24.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.24.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [PositionMigrator Contract](#positionmigrator-contract) new contract for loan migrations

---

## PositionMigrator Contract

**Description:**

New `PositionMigrator` contract wrapper added for loan position migrations:

- `flashRenegotiation()` method for flash loan-based renegotiations
- Smart Migrate V2 contract integration (added in v0.24.3)
- Enhanced MSL V5 refinancing support

```typescript
await gondi.flashRenegotiation({
  // Flash renegotiation parameters
});
```

---

# Breaking Changes 0.23.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.23.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Refinance batch](#refinance-bath) refinanceBatch has been removed from sdk.

---

## Refinance batch

**Description:**

`refinanceBatch` has been removed from sdk.

# Breaking Changes 0.22.0

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.22.0. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Emit Loan](#emit-loan) emitLoan now expects a new argument `nftCollateralAddress`

---

## Emit Loan

**Description:**

`emitLoan` now expects a new argument `nftCollateralAddress`. It should be the address of the NFT collateral.

# Breaking Changes 0.18.6

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.18.6. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [Make Order](#replace-makeorder-with-makesellandrepayorder) makeOrder was renamed to makeSellAndRepayOrder

---

## Replace makeOrder with makeSellAndRepayOrder

**Description:**

`makeOrder` was renamed to `makeSellAndRepayOrder`. `makeOrder` now creates a single-nft-order instead of a sell-and-repay order.

# Breaking Changes 0.16.1

### Important

---

This document outlines the breaking changes introduced in our codebase for version 0.16.1. Please review these changes carefully to ensure a smooth migration.

## Table of Contents

- [End Lock Up](#end-lockup-new-loan-property) end lockup now needs an extra property of the loan

---

## End Lockup new loan property

**Description:**

`isEndLockedUp` now needs the `durationFromRenegotiationOrStart` property of the loan

# Breaking Changes 0.15.0b2

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
- [Leverage Sell](#replace-leveragesell-with-sellandrepay) function renamed and args argument

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

## replace leverageSell With sellAndRepay

**Description:**

`leverageSell` was replaced with `sellAndRepay`. The function now expects a single argument `repaymentCalldata` which is the encoded structured data that the `repayLoan` fn expects

`borrowerSignature` must be calculated since `PurchaseBundler` will be the msg.sender of the transaction

```
struct LoanRepaymentData {
    SignableRepaymentData data;
    Loan loan;
    bytes borrowerSignature;
}
```

Internal Types:

```
struct SignableRepaymentData {
    uint256 loanId;
    bytes callbackData;
    bool shouldDelegate;
}

// For Loan type, check the loan version, for V2:
struct Loan {
    address borrower;
    uint256 nftCollateralTokenId;
    address nftCollateralAddress;
    address principalAddress;
    uint256 principalAmount;
    uint256 startTime;
    uint256 duration;
    Source[] source;
}

struct Source {
    uint256 loanId;
    address lender;
    uint256 principalAmount;
    uint256 accruedInterest;
    uint256 startTime;
    uint256 aprBps;
}

// For V3:
struct Loan {
    address borrower;
    uint256 nftCollateralTokenId;
    address nftCollateralAddress;
    address principalAddress;
    uint256 principalAmount;
    uint256 startTime;
    uint256 duration;
    Tranche[] tranche;
    uint256 protocolFee;
}
struct Tranche {
    uint256 loanId;
    uint256 floor;
    uint256 principalAmount;
    address lender;
    uint256 accruedInterest;
    uint256 startTime;
    uint256 aprBps;
}
```

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
