import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address, Hex } from 'viem';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Gondi } = await import('@/gondi');

const LENDER = '0x0000000000000000000000000000000000000001' as Address;
const MSL = '0x0000000000000000000000000000000000000002' as Address;
const COLLECTION = '0x0000000000000000000000000000000000000003' as Address;
const VALIDATOR = '0x0000000000000000000000000000000000000004' as Address;
const ARGUMENTS = '0x80' as Hex;
const SIGNATURE = '0xsigned' as Hex;
const OFFER_HASH = `0x${'ab'.repeat(32)}` as Hex;

const generateTraitOfferHash = mock();
const saveTraitOffer = mock();
const signOffer = mock();
const Msl = mock(() => ({ address: MSL, signOffer }));

const gondi = Object.assign(Object.create(Gondi.prototype) as Gondi, {
  account: { address: LENDER },
  apiClient: { generateTraitOfferHash, saveTraitOffer },
  contracts: { Msl },
  getDefaults: () => ({ Msl: MSL }),
});

const TERMS = {
  traitIds: [11, 12],
  principalAddress: '0x0000000000000000000000000000000000000005' as Address,
  principalAmount: 1_000n,
  capacity: 2_000n,
  fee: 0n,
  aprBps: 100n,
  expirationTime: 4_000_000_000n,
  duration: 2_592_000n,
  maxSeniorRepayment: 0n,
};

const GENERATED = {
  offer: {
    offerHash: OFFER_HASH,
    offerId: 7n,
    lenderAddress: LENDER,
    signerAddress: LENDER,
    borrowerAddress: '0x0000000000000000000000000000000000000000' as Address,
    collateralAddress: COLLECTION,
    fee: 3n,
    validators: [{ validator: VALIDATOR, arguments: ARGUMENTS }],
    collection: { contractData: { contractAddress: COLLECTION } },
  },
};

beforeEach(() => {
  for (const fn of [generateTraitOfferHash, saveTraitOffer, signOffer]) fn.mockReset();
  Msl.mockClear();
  generateTraitOfferHash.mockResolvedValue(GENERATED);
  signOffer.mockResolvedValue(SIGNATURE);
  saveTraitOffer.mockImplementation(async (offer: unknown) => offer);
});

describe('makeTraitOffer', () => {
  test('signs the struct the API generated, validator and collateral included', async () => {
    await gondi.makeTraitOffer(TERMS);

    const { structToSign } = signOffer.mock.calls[0][0] as {
      structToSign: Record<string, unknown>;
    };
    expect(structToSign).toMatchObject({
      offerId: 7n,
      fee: 3n,
      lender: LENDER,
      signer: LENDER,
      nftCollateralAddress: COLLECTION,
      nftCollateralTokenId: 0n,
      validators: [{ validator: VALIDATOR, arguments: ARGUMENTS }],
      traitIds: [11, 12],
      contractAddress: MSL,
    });
  });

  test('saves the signed offer with the generated validators and the trait ids', async () => {
    const saved = await gondi.makeTraitOffer(TERMS);

    expect(saveTraitOffer).toHaveBeenCalledTimes(1);
    expect(saved).toMatchObject({
      offerId: 7n,
      offerHash: OFFER_HASH,
      signature: SIGNATURE,
      traitIds: [11, 12],
      fee: 3n,
      offerValidators: [{ validator: VALIDATOR, arguments: ARGUMENTS }],
    });
  });

  test('defaults the lender to the account and the borrower to the zero address', async () => {
    await gondi.makeTraitOffer(TERMS);

    const { offerInput } = generateTraitOfferHash.mock.calls[0][0] as {
      offerInput: Record<string, unknown>;
    };
    expect(offerInput).toMatchObject({
      lenderAddress: LENDER,
      signerAddress: LENDER,
      borrowerAddress: '0x0000000000000000000000000000000000000000',
      contractAddress: MSL,
    });
  });

  test('signs for the contract it is given', async () => {
    const other = '0x0000000000000000000000000000000000000009' as Address;

    await gondi._makeTraitOffer(TERMS, other);

    expect(Msl).toHaveBeenCalledWith(other);
  });
});
