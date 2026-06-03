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
