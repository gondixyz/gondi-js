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
