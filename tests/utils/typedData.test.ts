import { describe, expect, test } from 'bun:test';
import { hashTypedData } from 'viem';

import { sanitizeTypedDataMessage } from '@/utils/typedData';

const types = {
  ExecutionData: [
    { name: 'offerExecution', type: 'OfferExecution[]' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'callbackData', type: 'bytes' },
  ],
  OfferExecution: [
    { name: 'offer', type: 'LoanOffer' },
    { name: 'amount', type: 'uint256' },
    { name: 'lenderOfferSignature', type: 'bytes' },
  ],
  LoanOffer: [
    { name: 'offerId', type: 'uint256' },
    { name: 'lender', type: 'address' },
    { name: 'validators', type: 'OfferValidator[]' },
  ],
  OfferValidator: [
    { name: 'validator', type: 'address' },
    { name: 'arguments', type: 'bytes' },
  ],
} as const;

const lender = '0x12e6ad13e280779264e2c4ee0b40b312d4b97142' as const;
const validator = '0x1111111111111111111111111111111111111111' as const;

const message = {
  offerExecution: [
    {
      offer: {
        offerId: 12829n,
        lender,
        lenderName: 'lender.eth',
        validators: [{ validator, arguments: '0x' as const, id: 'validator-row-id' }],
        nft: {
          name: 'Vault #1115',
          image: { cacheUrl: 'https://cdn.gondi.xyz/image/abc' },
        },
        currency: { symbol: 'USDC', decimals: 6 },
      },
      amount: 26000000000n,
      lenderOfferSignature: '0xabcdef' as const,
      eApr: 16,
    },
  ],
  tokenId: 1115n,
  callbackData: '0x' as const,
  extraTopLevel: 'dropped',
};

describe('sanitizeTypedDataMessage', () => {
  test('keeps only the declared fields, recursing into structs and arrays', () => {
    const { message: sanitized } = sanitizeTypedDataMessage({
      primaryType: 'ExecutionData',
      types,
      message,
    });

    expect(sanitized).toEqual({
      offerExecution: [
        {
          offer: {
            offerId: 12829n,
            lender,
            validators: [{ validator, arguments: '0x' }],
          },
          amount: 26000000000n,
          lenderOfferSignature: '0xabcdef',
        },
      ],
      tokenId: 1115n,
      callbackData: '0x',
    });
    expect(
      JSON.stringify(sanitized, (key, value) => (typeof value === 'bigint' ? `${value}` : value)),
    ).not.toContain('https://');
  });

  test('preserves the EIP-712 hash of the unsanitized message', () => {
    const domain = {
      name: 'GONDI_MULTI_SOURCE_LOAN',
      version: '3.1',
      chainId: 1,
      verifyingContract: '0xf41b389e0c1950dc0b16c9498eae77131cc08a56',
    } as const;

    const sanitized = sanitizeTypedDataMessage({
      domain,
      primaryType: 'ExecutionData',
      types,
      message,
    });

    expect(
      hashTypedData({ domain, primaryType: 'ExecutionData', types, message: sanitized.message }),
    ).toBe(hashTypedData({ domain, primaryType: 'ExecutionData', types, message }));
  });

  test('returns non-struct primary type messages untouched', () => {
    const parameters = {
      primaryType: 'SignableRepaymentData',
      types: {
        SignableRepaymentData: [
          { name: 'loanId', type: 'uint256' },
          { name: 'callbackData', type: 'bytes' },
        ],
      },
      message: { loanId: 41774n, callbackData: '0x' as const },
    };

    expect(sanitizeTypedDataMessage(parameters).message).toEqual(parameters.message);
  });
});
