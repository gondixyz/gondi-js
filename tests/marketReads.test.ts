import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address, zeroHash } from 'viem';

import {
  CollectionOrderType,
  Ordering,
  OrderMatchMode,
  OrderSide,
  OrderSortField,
  OrderStatusType,
} from '../src/generated/graphql';
import { stubGondi } from './utils/gondiStub';

const MAKER = '0x0000000000000000000000000000000000000001' as Address;
const WETH = '0x0000000000000000000000000000000000000002' as Address;
const CONTRACT = '0x0000000000000000000000000000000000000003' as Address;
const CONDUIT_KEY = zeroHash;

const listOrders = mock();
const collectionMarket = mock();

const gondi = stubGondi({ apiClient: { listOrders, collectionMarket } });

beforeEach(() => {
  listOrders.mockReset();
  collectionMarket.mockReset();
});

describe('orders', () => {
  test('lists only active orders unless statuses are given', async () => {
    listOrders.mockResolvedValue({ orders: [], hasNextPage: false, cursor: null });

    await gondi.orders({ side: OrderSide.Bid, collections: [7] });

    expect(listOrders).toHaveBeenCalledWith(
      expect.objectContaining({
        side: OrderSide.Bid,
        collectionIds: [7],
        statuses: [OrderStatusType.Active],
        first: 20,
      }),
    );
  });

  test('sorts newest first unless sortBy is given', async () => {
    listOrders.mockResolvedValue({ orders: [], hasNextPage: false, cursor: null });

    await gondi.orders({ side: OrderSide.Bid });
    await gondi.orders({
      side: OrderSide.Bid,
      sortBy: [{ field: OrderSortField.Expiration, order: Ordering.Asc }],
    });

    expect(listOrders).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        sortBy: [{ field: OrderSortField.CreatedDate, order: Ordering.Desc }],
      }),
    );
    expect(listOrders).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        sortBy: [{ field: OrderSortField.Expiration, order: Ordering.Asc }],
      }),
    );
  });

  test('maps every filter onto the API names', async () => {
    listOrders.mockResolvedValue({ orders: [], hasNextPage: false, cursor: null });

    await gondi.orders({
      side: OrderSide.Bid,
      traits: [3],
      nfts: [{ collectionId: 7, nftId: 9 }],
      makers: [MAKER],
      excludeMakers: [MAKER],
      currencies: [WETH],
      statuses: [OrderStatusType.Executed],
      matchMode: OrderMatchMode.Any,
      orderTypes: [CollectionOrderType.Collection],
      limit: 5,
      cursor: 'next',
    });

    expect(listOrders).toHaveBeenCalledWith(
      expect.objectContaining({
        traitIds: [3],
        nfts: [{ collectionId: 7, nftId: 9 }],
        maker: [MAKER],
        excludeMaker: [MAKER],
        currencyAddresses: [WETH],
        statuses: [OrderStatusType.Executed],
        matchMode: OrderMatchMode.Any,
        orderTypes: [CollectionOrderType.Collection],
        first: 5,
        after: 'next',
      }),
    );
  });
});

describe('collectionMarket', () => {
  test('returns the id, the floor, the highest bid and the royalties', async () => {
    const floorPrice = { amount: 10n, currency: { address: WETH } };
    const highestBid = { id: '1', price: 8n };
    const royalties = [{ beneficiary: MAKER, percentage: 5, required: true }];
    collectionMarket.mockResolvedValue({
      id: '7',
      seaportConduitKey: CONDUIT_KEY,
      contractData: { contractAddress: CONTRACT },
      royalties,
      statistics: { minAskPrice: floorPrice, highestApplicableBid: highestBid },
    });

    const market = await gondi.collectionMarket({ slug: 'punks', currencies: [WETH] });

    expect(collectionMarket).toHaveBeenCalledWith({ slug: 'punks', currencyAddresses: [WETH] });
    expect(market).toEqual({
      collectionId: 7,
      contractAddress: CONTRACT,
      seaportConduitKey: CONDUIT_KEY,
      floorPrice,
      highestBid,
      royalties,
    });
  });

  test('returns null floor and bid when the collection has neither', async () => {
    collectionMarket.mockResolvedValue({
      id: '7',
      seaportConduitKey: CONDUIT_KEY,
      contractData: { contractAddress: CONTRACT },
      royalties: [],
      statistics: { minAskPrice: null, highestApplicableBid: null },
    });

    expect(await gondi.collectionMarket({ slug: 'punks' })).toEqual({
      collectionId: 7,
      contractAddress: CONTRACT,
      seaportConduitKey: CONDUIT_KEY,
      floorPrice: null,
      highestBid: null,
      royalties: [],
    });
  });

  test('throws for an unknown collection', async () => {
    collectionMarket.mockResolvedValue(null);

    await expect(gondi.collectionMarket({ slug: 'punks' })).rejects.toThrow(
      'invalid collection punks',
    );
  });
});
