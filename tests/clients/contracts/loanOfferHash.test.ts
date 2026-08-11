import { describe, expect, test } from 'bun:test';
import { encodeAbiParameters, hashStruct, zeroAddress } from 'viem';

import { MslV6 } from '@/clients/contracts/MslV6';

/**
 * The v3.2 LoanOffer digest, pinned against the vector florida-contracts asserts on in
 * test/Hash.t.sol. The contract recomputes the digest from its own type string, so an SDK
 * that disagrees produces a signature recovering to the wrong address rather than a revert
 * anyone can read. Driving the real `loanOfferType()` keeps the two in step.
 */
const SOLIDITY_LOAN_OFFER_HASH =
  '0x1525929998ea0392687fd3fc0bc29fd84111c9bb94d87ecc4df830df01c50457';

const NAMED_BORROWER = '0x0000000000000000000000000000000000006666';

const addr = (suffix: string) => `0x${suffix.padStart(40, '0')}` as const;

const mslFor = (version: '3.1' | '3.2') =>
  new MslV6({
    walletClient: {
      chain: { id: 1 },
      account: { address: zeroAddress },
      transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
    },
    address: addr('5'),
    version,
  } as unknown as ConstructorParameters<typeof MslV6>[0]);

const offerTypesFor = (version: '3.1' | '3.2') => ({
  LoanOffer: (mslFor(version) as unknown as { loanOfferType: () => unknown[] }).loanOfferType(),
  OfferValidator: [
    { name: 'validator', type: 'address' },
    { name: 'arguments', type: 'bytes' },
  ],
});

const sampleOffer = (borrower: string = NAMED_BORROWER) => ({
  offerId: 7n,
  lender: addr('3333'),
  fee: 11n,
  capacity: 13n,
  nftCollateralAddress: addr('4444'),
  nftCollateralTokenId: 17n,
  principalAddress: addr('5555'),
  principalAmount: 19n,
  aprBps: 23n,
  expirationTime: 29n,
  duration: 31n,
  maxSeniorRepayment: 37n,
  validators: [
    {
      validator: addr('1111'),
      arguments: encodeAbiParameters([{ type: 'uint256' }, { type: 'uint256' }], [3n, 9n]),
    },
    { validator: addr('2222'), arguments: '0x' as const },
  ],
  lenderRefinanceDisabled: true,
  borrower,
});

const hashOffer = (version: '3.1' | '3.2', borrower?: string) =>
  hashStruct({
    data: sampleOffer(borrower),
    primaryType: 'LoanOffer',
    types: offerTypesFor(version) as never,
  });

describe('v3.2 LoanOffer hashing', () => {
  test('matches the digest florida-contracts pins', () => {
    expect(hashOffer('3.2')).toEqual(SOLIDITY_LOAN_OFFER_HASH);
  });

  test('naming a borrower changes the digest', () => {
    expect(hashOffer('3.2')).not.toEqual(hashOffer('3.2', zeroAddress));
  });

  test('3.1 leaves the borrower out of the digest', () => {
    expect(hashOffer('3.1')).toEqual(hashOffer('3.1', zeroAddress));
  });
});
