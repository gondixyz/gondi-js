import { Address } from 'viem';

/**
 * Thrown by `createUserVault` when the vault was minted but a deposit that follows it failed.
 * The vault and every deposit in `receipts` stay on-chain, so the caller resumes with `vaultId`
 * through the `depositUserVault*` methods instead of minting another vault. `cause` is the
 * deposit's own error.
 */
export class CreateVaultError extends Error {
  vaultId: bigint;
  receipts: unknown[];

  constructor({
    vaultId,
    receipts,
    cause,
  }: {
    vaultId: bigint;
    receipts: unknown[];
    cause: unknown;
  }) {
    super(`Vault ${vaultId} was created but a deposit into it failed`, { cause });
    this.name = 'CreateVaultError';
    this.vaultId = vaultId;
    this.receipts = receipts;
  }
}

/**
 * Thrown before a loan is emitted or refinanced against an NFT the GONDI API flags (for example
 * reported as stolen), or against a wrapper holding one. Lenders' collection offers cannot exclude
 * a flagged NFT on-chain, so the SDK refuses to borrow against it unless the `Gondi` instance was
 * created with `skipFlaggedNftCheck`.
 */
export class FlaggedNftError extends Error {
  nftCollateralAddress: Address;
  tokenId: bigint;

  constructor({
    nftCollateralAddress,
    tokenId,
  }: {
    nftCollateralAddress: Address;
    tokenId: bigint;
  }) {
    super(`NFT ${nftCollateralAddress} #${tokenId} is flagged and cannot be borrowed against`);
    this.name = 'FlaggedNftError';
    this.nftCollateralAddress = nftCollateralAddress;
    this.tokenId = tokenId;
  }
}

/**
 * Why `relistOrdersOnOpenSea` was refused as a whole:
 *
 * - `NOT_FAILED`: some orders have no failed OpenSea listing to sign again. They are not the
 *   wallet's, their listing is still waiting or was posted, or it failed more than a few days ago.
 *   Read the current state with `openSeaListingResults` and retry without them.
 * - `STALE_SIGNATURE`: the signature did not match the listings the API builds now, usually
 *   because OpenSea's terms changed between the signature request and the signature. Call
 *   `relistOrdersOnOpenSea` again to sign the current ones, a bounded number of times: a wallet
 *   whose signature the API cannot verify gets this reason on every attempt.
 */
export type RelistOnOpenSeaErrorReason = 'NOT_FAILED' | 'STALE_SIGNATURE';

const NOT_FAILED_MESSAGE = /Orders without a failed OpenSea listing: ([\d, ]+)/;
const STALE_SIGNATURE_MESSAGE = 'Invalid bulk signature';

/**
 * Thrown by `relistOrdersOnOpenSea` when the GONDI API refuses the whole call for a reason the
 * caller can act on, named by `reason`. Nothing was listed again and no GONDI ask changed.
 * `orderIds` holds the refused orders for `NOT_FAILED`, and is empty otherwise. `cause` is the
 * API's own error.
 */
export class RelistOnOpenSeaError extends Error {
  reason: RelistOnOpenSeaErrorReason;
  orderIds: number[];

  constructor({
    reason,
    orderIds = [],
    cause,
  }: {
    reason: RelistOnOpenSeaErrorReason;
    orderIds?: number[];
    cause: unknown;
  }) {
    super(
      reason === 'NOT_FAILED'
        ? `Orders without a failed OpenSea listing: ${orderIds.join(', ')}`
        : 'The OpenSea terms changed while signing: sign the listings again',
      { cause },
    );
    this.name = 'RelistOnOpenSeaError';
    this.reason = reason;
    this.orderIds = orderIds;
  }

  /**
   * The typed error for a refusal of the re-list mutation, or `error` itself when it is anything
   * else.
   *
   * IMPLEMENTATION NOTE: the GONDI API reports a refusal as a GraphQL error carrying only a
   * message, which the API client rethrows with that message in its own. So a refusal is
   * recognised by its wording, and one the API words differently is rethrown unchanged.
   */
  static from(error: unknown): unknown {
    const message = error instanceof Error ? error.message : '';
    const notFailed = NOT_FAILED_MESSAGE.exec(message);
    if (notFailed) {
      const orderIds = notFailed[1].split(',').map(Number);
      return new RelistOnOpenSeaError({ reason: 'NOT_FAILED', orderIds, cause: error });
    }
    if (message.includes(STALE_SIGNATURE_MESSAGE)) {
      return new RelistOnOpenSeaError({ reason: 'STALE_SIGNATURE', cause: error });
    }
    return error;
  }
}
