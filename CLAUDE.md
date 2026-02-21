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

## Maintenance Guidelines

### Changelog Management

- **CRITICAL**: Update CHANGELOG.md with every version bump in package.json
- Document all breaking changes, new features, and bug fixes
- Follow the existing format with version headers (# Breaking Changes X.X.X)
- Breaking changes must include:
  - Clear **Description** section
  - **Reason** for the change (when applicable)
  - **Migration Steps** with code examples
- Use consistent categories: BREAKING, NEW, ENHANCEMENT, FIX
- Each version section should include:
  - Version number header
  - "Important" section
  - Table of Contents with linked entries
  - Detailed descriptions for each change

### Documentation Generation

- **MANDATORY**: Run `bun run docs` after every version change
- Documentation outputs to `docs/{version}` and `docs/lts/`
- Ensure TypeDoc reflects all API changes
- Update documentation before publishing new npm package versions
- Documentation should include all exported types, methods, and interfaces

### Code Review Considerations

When reviewing PRs (including @claude reviews), ensure:

1. **CHANGELOG.md is updated** for any public API changes
2. **Version bump** in package.json matches change severity:
   - MAJOR: Breaking changes
   - MINOR: New features (backwards compatible)
   - PATCH: Bug fixes (backwards compatible)
3. **Documentation regenerated** if API changes present (check `docs/` directory)
4. **Breaking changes clearly documented** with migration guides
5. All exported types, methods, and interfaces are documented with JSDoc comments
6. GraphQL schema changes trigger `bun run gql:types` regeneration

### GitHub Actions Setup

- **Claude PR Review**: Requires `CLAUDE_CODE_OAUTH_TOKEN` repository secret
  - Install Claude GitHub App: https://github.com/apps/claude
  - Or run `/install-github-app` from Claude Code CLI
  - Workflow triggers on @claude mentions in PR comments
  - Reviews are informational and don't block merges
- Pre-commit hooks run `bun lint && bun fmt-check`
