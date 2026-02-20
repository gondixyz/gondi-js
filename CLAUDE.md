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
- **`apiClient`** (`src/clients/api/`) — GraphQL API client using Apollo
- **`openseaClient`** (`src/clients/opensea/`) — OpenSea marketplace integration

### Contract Versioning

The protocol has multiple contract versions (V4–V7, mapped to version strings `'1'`–`'3.1'`). Each version has its own contract wrapper class (e.g., `MslV4.ts`, `MslV5.ts`, `MslV6.ts`) inheriting from `BaseContract.ts`. Contract addresses per chain are in `src/deploys.ts`. Key contract types:

- **MultiSourceLoan (MSL)** — Core lending contract
- **AuctionLoanLiquidator** — Auction-based liquidation
- **UserVault** — Liquidity pool management
- **PurchaseBundler** — Batched operations (BNPL)

### GraphQL Layer

- Queries/mutations live in `src/clients/api/graphql/**/*.gql`
- Generated types output to `src/generated/graphql/index.ts` (do not edit manually)
- Schema saved to `src/generated/graphql/lending-schema.graphql`
- Custom scalar mappings: `BigInt`→`bigint`, `Address`/`Hash`→viem types, `DateTime`→`Date`

### Generated Code

- `src/generated/graphql/` — GraphQL codegen output
- `src/generated/blockchain/` — Contract ABIs (v4–v7, seaport, cryptopunks, etc.)

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json, resolved by tsc-alias at build time).

## Code Style

- Prettier: 100 char width, single quotes, trailing commas
- ESLint: `simple-import-sort` plugin enforces sorted imports
- Unused variables must be prefixed with `_`
- TypeScript strict mode enabled; no unused locals/parameters
- ES modules only (`"type": "module"`)
