import { describe, expect, mock, test } from 'bun:test';
import { Address, zeroAddress, zeroHash } from 'viem';

import { auctionWithBuyoutLoanLiquidatorAbi } from '@/generated/blockchain/v8';
import { isInvalidHashAuctionError, readAuction, writeWithCurrentAuction } from '@/utils/auction';

import { liquidatorRevert } from './liquidatorRevert';

const LIQUIDATOR = '0x0000000000000000000000000000000000000008';
const LOAN_CONTRACT = '0x0000000000000000000000000000000000000009';
const COLLECTION = '0x0000000000000000000000000000000000000004';
const BIDDER = '0x0000000000000000000000000000000000000005';
const LATER_BIDDER = '0x0000000000000000000000000000000000000006';

const START_BLOCK = 100n;
const START_TIME = 1_000n;
const BLOCK_TIME = 12n;

const blockAt = (blockNumber: bigint) => ({
  number: blockNumber,
  timestamp: START_TIME + (blockNumber - START_BLOCK) * BLOCK_TIME,
});

const startedAuction = (loanId: bigint) => ({
  loanAddress: LOAN_CONTRACT as Address,
  loanId,
  highestBid: 0n,
  triggerFee: 0n,
  minBid: 50n,
  highestBidder: zeroAddress,
  duration: 86_400n,
  asset: zeroAddress,
  startTime: START_TIME,
  originator: zeroAddress,
  lastBidTime: START_TIME,
  loanHash: zeroHash,
  buyoutWindow: 0n,
});

const liquidationStarted = (loanId: bigint) => ({
  eventName: 'LoanLiquidationStarted',
  blockNumber: START_BLOCK,
  args: { collection: COLLECTION, tokenId: loanId, auction: startedAuction(loanId) },
});

const bidPlaced = (loanId: bigint, newBidder: Address, bid: bigint, blockNumber: bigint) => ({
  eventName: 'BidPlaced',
  blockNumber,
  args: {
    collection: COLLECTION,
    tokenId: loanId,
    newBidder,
    bid,
    loanAddress: LOAN_CONTRACT,
    loanId,
  },
});

/**
 * Reads auction `loanId` off a stub chain: blocks every 12 seconds from block 100 at time 1000,
 * and the given liquidator events.
 */
const read = (events: unknown[], loanId: bigint) => {
  const getContractEvents = mock(async () => events);
  const client = {
    chain: { id: 1 },
    getBlock: async ({ blockNumber }: { blockNumber?: bigint } = {}) =>
      blockAt(blockNumber ?? START_BLOCK + 1_000n),
    getContractEvents,
  } as unknown as Parameters<typeof readAuction>[0]['client'];
  const result = readAuction({
    client,
    address: LIQUIDATOR,
    abi: auctionWithBuyoutLoanLiquidatorAbi,
    auction: { loanAddress: LOAN_CONTRACT, loanId, startTime: START_TIME },
  });
  return { result, getContractEvents };
};

describe('readAuction', () => {
  test('reads the liquidator events from the block the auction started in', async () => {
    const { result, getContractEvents } = read([liquidationStarted(7n)], 7n);
    await result;

    expect(getContractEvents.mock.calls[0]).toEqual([
      expect.objectContaining({ address: LIQUIDATOR, fromBlock: START_BLOCK }) as never,
    ]);
  });

  test('applies the latest bid on the auction to the struct it started with', async () => {
    const { result } = read(
      [
        liquidationStarted(8n),
        liquidationStarted(7n),
        bidPlaced(7n, BIDDER, 60n, 110n),
        bidPlaced(7n, LATER_BIDDER, 70n, 120n),
        bidPlaced(8n, BIDDER, 99n, 130n),
      ],
      7n,
    );

    expect(await result).toEqual({
      auction: {
        ...startedAuction(7n),
        highestBid: 70n,
        highestBidder: LATER_BIDDER,
        lastBidTime: blockAt(120n).timestamp,
      },
      collectionContractAddress: COLLECTION,
      tokenId: 7n,
    });
  });

  test('returns the struct the auction started with while nobody has bid', async () => {
    const { result } = read([liquidationStarted(7n)], 7n);

    expect((await result).auction).toEqual(startedAuction(7n));
  });

  test('throws when the auction never started', async () => {
    const { result } = read([liquidationStarted(8n)], 7n);

    await expect(result).rejects.toThrow('Auction for loan 7 not found');
  });
});

describe('isInvalidHashAuctionError', () => {
  test('recognises the liquidator rejecting a stale auction struct', () => {
    expect(isInvalidHashAuctionError(liquidatorRevert('InvalidHashAuctionError'))).toBe(true);
  });

  test('does not take another revert, or a non-viem error, for it', () => {
    expect(isInvalidHashAuctionError(liquidatorRevert('AuctionOverError'))).toBe(false);
    expect(isInvalidHashAuctionError(new Error('InvalidHashAuctionError'))).toBe(false);
  });
});

describe('writeWithCurrentAuction', () => {
  const readCurrent = () => mock(async () => 'current');

  test('writes the held auction without reading the chain', async () => {
    const read = readCurrent();
    const write = mock(async (auction: string) => auction);

    expect(await writeWithCurrentAuction({ held: 'held', readCurrent: read, write })).toBe('held');
    expect(read).not.toHaveBeenCalled();
  });

  test('rewrites with the auction on chain when the held one is stale', async () => {
    const write = mock(async (auction: string) => {
      if (auction === 'held') throw liquidatorRevert('InvalidHashAuctionError');
      return auction;
    });

    expect(await writeWithCurrentAuction({ held: 'held', readCurrent: readCurrent(), write })).toBe(
      'current',
    );
  });

  test('rethrows any other revert without reading the chain', async () => {
    const read = readCurrent();
    const auctionOver = liquidatorRevert('AuctionOverError');
    const write = mock(async () => {
      throw auctionOver;
    });

    await expect(writeWithCurrentAuction({ held: 'held', readCurrent: read, write })).rejects.toBe(
      auctionOver,
    );
    expect(read).not.toHaveBeenCalled();
  });

  test('reads the chain first when the caller holds no auction', async () => {
    const write = mock(async (auction: string) => auction);

    expect(
      await writeWithCurrentAuction({ held: undefined, readCurrent: readCurrent(), write }),
    ).toBe('current');
  });
});
