import { Address, Hash, zeroHash } from 'viem';

/**
 * A delegation the loan contract holds for a token: its delegate and every rights value enabled
 * for it, as the API's `Delegation.delegateTo` and `Delegation.rights` report them. A bare address
 * stands for the delegate's full-rights (`zeroHash`) delegation.
 */
export type LoanDelegation = Address | { to: Address; rights: readonly Hash[] };

/**
 * One `revokeDelegate` call per (delegate, rights) pair of `delegations`.
 *
 * IMPLEMENTATION NOTE: the delegate.xyz registry keys each delegation by its rights, so a
 * revocation names the exact value it removes, and revoking one that was never enabled is a no-op
 * (https://docs.delegate.xyz/technical-documentation/delegate-registry/idelegateregistry.sol).
 */
export const delegationRevocations = (delegations: readonly LoanDelegation[]) =>
  delegations.flatMap((delegation) => {
    const { to, rights } =
      typeof delegation === 'string' ? { to: delegation, rights: [zeroHash] } : delegation;
    return rights.map((right) => ({ to, rights: right }));
  });
