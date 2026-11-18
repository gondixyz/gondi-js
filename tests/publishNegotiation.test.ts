import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address } from 'viem';

import { stubGondi } from './utils/gondiStub';

const SIGNATURE_REQUEST = {
  __typename: 'SignatureRequest',
  key: 'signature',
  typedData: { types: {}, primaryType: 'Order', domain: {}, message: {} },
};
const EXTRA_SEAPORT_DATA = { __typename: 'ExtraSeaportData', extraData: '0x', criteriaProof: [] };
const COLLECTION = '0x0000000000000000000000000000000000000001' as Address;

const publish = mock();
const signTypedData = mock(async () => '0x12');
const gondi = stubGondi({
  apiClient: {
    publishOrder: publish,
    publishDeal: publish,
    publishSellAndRepayOrder: publish,
    publishBuyNowPayLaterOrder: publish,
  },
  wallet: { signTypedData },
});

/** Each publishing method whose API negotiation repeats until the API settles the order. */
const NEGOTIATIONS = {
  makeOrder: () => gondi.makeOrder({ collectionId: 1 } as never),
  makeDeal: () => gondi.makeDeal({} as never),
  makeSellAndRepayOrder: () => gondi.makeSellAndRepayOrder({} as never),
  buyNowPayLater: () =>
    gondi.buyNowPayLater({
      amounts: [],
      contractAddress: COLLECTION,
      loanDuration: 1n,
      offers: [],
      tokenId: 1n,
    }),
};

beforeEach(() => {
  publish.mockReset();
  signTypedData.mockClear();
});

describe('API negotiation', () => {
  for (const [name, negotiate] of Object.entries(NEGOTIATIONS)) {
    test(`${name} stops prompting the wallet when the API keeps asking for a signature`, async () => {
      publish.mockResolvedValue(SIGNATURE_REQUEST);

      await expect(negotiate()).rejects.toThrow('The API asked again for signature');
      expect([publish.mock.calls.length, signTypedData.mock.calls.length]).toEqual([2, 1]);
    });

    test(`${name} signs every distinct step however many the API asks for`, async () => {
      for (const key of ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'])
        publish.mockResolvedValueOnce({ ...SIGNATURE_REQUEST, key });
      publish.mockResolvedValue(SIGNATURE_REQUEST);

      await expect(negotiate()).rejects.toThrow('The API asked again for signature');
      expect([publish.mock.calls.length, signTypedData.mock.calls.length]).toEqual([8, 7]);
    });
  }

  for (const name of ['makeSellAndRepayOrder', 'buyNowPayLater'] as const) {
    test(`${name} stops publishing when the API keeps refreshing marketplace data`, async () => {
      publish.mockResolvedValue(EXTRA_SEAPORT_DATA);

      await expect(NEGOTIATIONS[name]()).rejects.toThrow(
        'The API asked again for extraSeaportData',
      );
      expect(publish.mock.calls.length).toBe(2);
    });
  }

  for (const [name, negotiate] of Object.entries(NEGOTIATIONS)) {
    test(`${name} rejects a response it cannot handle instead of publishing again`, async () => {
      publish.mockResolvedValue({ __typename: 'Unknown' });

      await expect(negotiate()).rejects.toThrow('Unexpected API response Unknown');
      expect(publish.mock.calls.length).toBe(1);
    });
  }

  for (const name of ['makeOrder', 'makeDeal'] as const) {
    test(`${name} rejects marketplace data it never asks for`, async () => {
      publish.mockResolvedValue(EXTRA_SEAPORT_DATA);

      await expect(NEGOTIATIONS[name]()).rejects.toThrow(
        'Unexpected API response ExtraSeaportData',
      );
      expect(publish.mock.calls.length).toBe(1);
    });
  }
});
