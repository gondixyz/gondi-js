import { beforeEach, describe, expect, mock, test } from 'bun:test';

import { SingleNftOrderInput } from '@/generated/graphql';

import { stubGondi } from './utils/gondiStub';

const publishBulkOrders = mock();
const signTypedData = mock();

const gondi = stubGondi({
  wallet: { signTypedData },
  apiClient: { publishBulkOrders },
});

const ORDERS = [{ tokenId: 1n }] as unknown as SingleNftOrderInput[];
const SIGNATURE = '0xsigned';
const SIGNATURE_REQUEST = {
  __typename: 'SignatureRequest',
  typedData: { primaryType: 'BulkOrder' },
};
const PUBLISHED_ORDERS = [{ id: '1' }];
const OPEN_SEA_LISTINGS = [{ tokenId: 1n, orderHash: '0xhash', error: null }];
const PUBLISHED = {
  __typename: 'BulkNFTOrdersResult',
  orders: PUBLISHED_ORDERS,
  openSeaListings: OPEN_SEA_LISTINGS,
};

beforeEach(() => {
  publishBulkOrders.mockReset();
  signTypedData.mockReset();
  signTypedData.mockResolvedValue(SIGNATURE);
  publishBulkOrders.mockResolvedValueOnce(SIGNATURE_REQUEST).mockResolvedValueOnce(PUBLISHED);
});

describe('makeOrdersOnOpenSea', () => {
  test('asks for OpenSea on both calls, since the API rebuilds the signed tree from the input', async () => {
    await gondi.makeOrdersOnOpenSea(ORDERS);

    expect(publishBulkOrders.mock.calls).toEqual([
      [{ orders: ORDERS, listOnOpenSea: true }],
      [{ orders: ORDERS, listOnOpenSea: true, signature: SIGNATURE }],
    ]);
  });

  test('returns what became of each OpenSea listing beside the orders', async () => {
    expect(await gondi.makeOrdersOnOpenSea(ORDERS)).toMatchObject({
      orders: PUBLISHED_ORDERS,
      openSeaListings: OPEN_SEA_LISTINGS,
    });
  });
});

describe('makeOrders', () => {
  test('still returns the orders alone and leaves OpenSea out', async () => {
    expect(await gondi.makeOrders(ORDERS)).toEqual(PUBLISHED_ORDERS as never);
    expect(publishBulkOrders.mock.calls[0]).toEqual([{ orders: ORDERS }]);
  });
});
