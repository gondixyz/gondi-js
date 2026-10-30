import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address, Hex } from 'viem';

import { stubGondi } from './utils/gondiStub';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Api } = await import('@/clients/api');

const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' as Address;
const SIGNATURE = '0xsigned' as Hex;
const TYPED_DATA = { types: {}, primaryType: 'OrderComponents', domain: {}, message: {} };

const ORDER_TERMS = {
  startTime: 1_700_000_000n,
  expirationTime: 1_800_000_000n,
  currencyAddress: WETH,
  price: 1_000n,
  collectionId: 7,
};
const SET_BID = { ...ORDER_TERMS, nftIds: [11, 12, 13], maxExecutions: 2n };
const OR_TRAIT_BID = { ...ORDER_TERMS, condition: { anyTraitIds: [21, 22] }, maxExecutions: 2n };

const publishOrderForNftSet = mock();
const publishOrderForCollection = mock();

/**
 * Builds an `Api` without running its constructor, whose generated SDK records
 * which publish mutation each input reaches.
 */
const api = Object.assign(Object.create(Api.prototype), {
  api: { publishOrderForNftSet, publishOrderForCollection },
}) as InstanceType<typeof Api>;

const signTypedData = mock();
const gondi = stubGondi({ apiClient: api, wallet: { signTypedData } });

beforeEach(() => {
  for (const fn of [publishOrderForNftSet, publishOrderForCollection, signTypedData]) {
    fn.mockReset();
  }
  publishOrderForNftSet
    .mockResolvedValueOnce({
      result: { __typename: 'SignatureRequest', key: 'signature', typedData: TYPED_DATA },
    })
    .mockResolvedValueOnce({ result: { __typename: 'SetBidOrder', id: '42', status: 'ACTIVE' } });
  publishOrderForCollection.mockResolvedValue({
    result: { __typename: 'CollectionOrder', id: '43' },
  });
  signTypedData.mockResolvedValue(SIGNATURE);
});

describe('publishOrder', () => {
  test('sends a set bid to publishOrderForNftSet, not to the collection mutation', async () => {
    await api.publishOrder({ ...SET_BID });

    expect([
      publishOrderForNftSet.mock.calls.length,
      publishOrderForCollection.mock.calls.length,
    ]).toEqual([1, 0]);
  });

  test('sends an OR trait bid to publishOrderForNftSet, not to the collection mutation', async () => {
    await api.publishOrder({ ...OR_TRAIT_BID });

    expect([
      publishOrderForNftSet.mock.calls.length,
      publishOrderForCollection.mock.calls.length,
    ]).toEqual([1, 0]);
  });

  test('still sends a collection bid to publishOrderForCollection', async () => {
    await api.publishOrder({ ...ORDER_TERMS });

    expect([
      publishOrderForNftSet.mock.calls.length,
      publishOrderForCollection.mock.calls.length,
    ]).toEqual([0, 1]);
  });
});

describe('makeOrder', () => {
  test('signs a set bid and returns the published SetBidOrder', async () => {
    const order = await gondi.makeOrder({ ...SET_BID });

    expect(order).toMatchObject({
      __typename: 'SetBidOrder',
      id: '42',
      nftIds: [11, 12, 13],
      signature: SIGNATURE,
    });
  });

  test('publishes the signed set bid with the signature the wallet produced', async () => {
    await gondi.makeOrder({ ...SET_BID });

    expect(publishOrderForNftSet.mock.calls[1][0]).toEqual({
      orderInput: { ...SET_BID, signature: SIGNATURE },
    });
  });
});
