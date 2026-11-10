import { Address } from 'viem';

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
