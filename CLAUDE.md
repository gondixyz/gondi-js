# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gondi.js is a TypeScript SDK for NFT-backed lending on Ethereum. It provides functionality to borrow, lend, refinance, and liquidate NFT loans. Published as the `gondi` npm package.

## Commands

- **Install**: `bun install`
- **Build**: `bun run build` (esbuild bundle + tsc declarations + tsc-alias)
- **Lint**: `bun run lint` (prettier check + eslint)
- **Lint fix**: `bun run lint-fix`
- **Format**: `bun run fmt`
- **GraphQL codegen**: `bun run gql:types` (requires `GONDI_API` env var or defaults to `https://api.gondi.xyz/lending/graphql`; uses `.env` file)
- **Docs**: `bun run docs`

Pre-commit hook runs `bun lint && bun fmt-check`.

## Architecture

### Entry Point & Core Class

`src/index.ts` exports the `Gondi` class (from `src/gondi.ts`) as the main SDK entry point. `Gondi` orchestrates three client layers:

- **`contracts`** (`src/clients/contracts/`) — Smart contract wrappers using viem
- **`apiClient`** (`src/clients/api/`) — GraphQL API client using Apollo (no-cache policy everywhere)
- **`openseaClient`** (`src/clients/opensea/`) — OpenSea marketplace integration

### Contract Versioning

The protocol has multiple contract versions. The mapping between internal version strings and class implementations is critical:

| Version String | Class   | ABI | Notes                                       |
| -------------- | ------- | --- | ------------------------------------------- |
| `'1'`          | `MslV4` | v4  | Legacy, no PurchaseBundler support          |
| `'2'`          | `MslV5` | v5  | Added auction liquidations                  |
| `'3'`          | `MslV6` | v6  | Uses `tranche` instead of `source`          |
| `'3.1'`        | `MslV6` | v7  | Same class as V3, version-conditional logic |

**V3.1 shares the MslV6 class** but passes `version: '3.1'` to the constructor. The class has conditionals like `this.version === '3.1'` for fields and features only available in V3.1 (e.g., `cancelAllRenegotiations`, extra `loanId` field in `signExecutionData`).

Version is determined at runtime from deployed contract addresses via `getVersionFromMslAddress()` in `src/deploys.ts`.

Key contract types: MultiSourceLoan (MSL), AuctionLoanLiquidator, UserVault, PurchaseBundler.

### Contract Interaction Pattern

All contract wrappers extend `BaseContract`. Two critical patterns:

1. **`safeContractWrite`** — A Proxy that simulates every transaction before broadcasting. All state-changing contract calls must go through this. It prevents broadcasting transactions that would revert.
2. **`contract.read`** — Standard viem read operations for view/pure functions.

### GraphQL Layer

- Queries/mutations live in `src/clients/api/graphql/**/*.gql`
- Generated types output to `src/generated/graphql/index.ts` — **never edit manually**
- Schema saved to `src/generated/graphql/lending-schema.graphql`
- After modifying `.gql` files, run `bun run gql:types` to regenerate
- Two-phase mutation pattern: `generate*Hash` (get hash to sign) → `save*` (persist signed data)

Scalar mappings: `BigInt`→`bigint`, `Address`/`Hash`/`Hex`→viem types, `DateTime`→`Date`, `Int64`→`number` (loses precision beyond 2^53-1).

### Generated Code (do not edit)

- `src/generated/graphql/` — GraphQL codegen output
- `src/generated/blockchain/` — Contract ABIs (v4–v7, seaport, cryptopunks, etc.)

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json, resolved by tsc-alias at build time). Always use `@/` imports in source code.

## Critical Patterns & Gotchas

### Loan Types: `tranche` vs `source`

V4/V5 loans use a `source` array. V6+ loans use a `tranche` array. The `loanToMslLoan()` utility in `src/utils/loan.ts` normalizes both to `source` for contract calls. **Always use `loanToMslLoan()` before passing loans to contract methods.**

### `startTime` vs `contractStartTime`

Loans have two timestamps: `startTime` (logical creation from API) and `contractStartTime` (on-chain execution, may be later). The contract uses `contractStartTime` for interest calculations. `loanToMslLoan()` adjusts the duration to account for this delta. When constructing loans from API data for contract calls, set `contractStartTime: loan.startTime` if no separate value exists.

### BigInt & BPS Math

- All blockchain values (amounts, durations, timestamps) are `bigint`
- Basis points constant: `BPS = 10000n` (1 BPS = 0.01%)
- Use `mulDivUp`/`mulDivDown` from `src/utils/number.ts` for fixed-point math
- Blockchain timestamps are in **seconds**; JS `Date` uses **milliseconds** — use `src/utils/dates.ts` for conversion

### Address Comparison

Ethereum addresses are case-insensitive. Always use `areSameAddress()` from `src/utils/string.ts`, never `===`.

### Transaction Results

Contract write methods return an object with `waitTxInBlock()`. Always await this before using the result:

```typescript
const result = await gondi.emitLoan({...});
const { loan, loanId } = await result.waitTxInBlock();
```

### Event Parsing

After transactions, events are parsed with `parseEventLogs`. Always validate the event array length before accessing elements — do not assume events exist.

### Step Callback (UI Integration)

`Gondi.create()` accepts `onStepChange` to track transaction progress (signature waiting/success, tx broadcasted/confirmed). The callback wraps the wallet via `addStepCallback.ts`.

## Code Style

- Prettier: 100 char width, single quotes, trailing commas
- ESLint: `simple-import-sort` plugin enforces sorted imports
- Unused variables must be prefixed with `_`
- TypeScript strict mode; no unused locals/parameters
- ES modules only (`"type": "module"`)
- Use `Optional<T, K>` and `OptionalNullable<T, K>` from `src/utils/types.ts` to derive SDK input types from generated GraphQL types (see `src/model.ts`)

## Workflow

- **Plan first**: Always enter plan mode before starting any task to align on approach before making changes.
- **Post-change steps**: After introducing changes, based on complexity/coverage:
  1. Run `bun run docs` to regenerate documentation.
  2. Bump the package version — **minor** for small/additive changes, **major** for breaking or large-scope changes.
