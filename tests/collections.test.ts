import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address } from 'viem';

import { stubGondi } from './utils/gondiStub';

const WETH = '0x0000000000000000000000000000000000000002' as Address;
const PAGE_INFO = { endCursor: null, hasNextPage: false };

const collections = mock();

const gondi = stubGondi({ apiClient: { collections } });

const pageOf = (highestBid: unknown) => ({
  collections: {
    pageInfo: PAGE_INFO,
    edges: [{ node: { id: '7', statistics: { totalVolume: 3, highestBid } } }],
  },
});

beforeEach(() => {
  collections.mockReset();
});

describe('collections', () => {
  test('reads bestOffer from the highest bid, its net amount in whole units', async () => {
    const currency = { address: WETH, decimals: 18 };
    collections.mockResolvedValue(pageOf({ netAmount: 1_500_000_000_000_000_000n, currency }));

    const result = await gondi.collections({});

    expect(result).toEqual({
      collections: [
        { id: '7', statistics: { totalVolume: 3, bestOffer: { amount: 1.5, currency } } },
      ],
      pageInfo: PAGE_INFO,
    });
  });

  test('answers a null bestOffer for a collection with no bid', async () => {
    collections.mockResolvedValue(pageOf(null));

    const result = await gondi.collections({});

    expect(result.collections[0]?.statistics).toEqual({ totalVolume: 3, bestOffer: null });
  });
});
