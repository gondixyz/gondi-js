import { describe, expect, mock, test } from 'bun:test';
import { zeroAddress } from 'viem';

import { Contracts, GondiPublicClient, Wallet } from '@/clients/contracts';
import { AllV6 } from '@/clients/contracts/AllV6';

import { liquidatorRevert } from '../../utils/liquidatorRevert';

const MSL_V3_1 = '0xf41B389E0C1950dc0B16C9498eaE77131CC08A56';
const COLLECTION = '0x0000000000000000000000000000000000000004';
const LATER_BIDDER = '0x0000000000000000000000000000000000000006';
const TX_HASH = `0x${'1'.repeat(64)}`;

const START_BLOCK = 100n;
const START_TIME = BigInt(Math.floor(Date.now() / 1000)) - 1_000n;

const blockAt = (blockNumber: bigint) => ({
  number: blockNumber,
  timestamp: START_TIME + (blockNumber - START_BLOCK) * 12n,
});

const auction = {
  loanAddress: MSL_V3_1,
  loanId: 1n,
  highestBid: 0n,
  triggerFee: 0n,
  minBid: 10n,
  highestBidder: zeroAddress,
  duration: 86400n,
  asset: zeroAddress,
  startTime: START_TIME,
  originator: zeroAddress,
  lastBidTime: START_TIME,
} as const;

const events = [
  {
    eventName: 'LoanLiquidationStarted',
    blockNumber: START_BLOCK,
    args: { collection: COLLECTION, tokenId: 7n, auction },
  },
  {
    eventName: 'BidPlaced',
    blockNumber: START_BLOCK + 10n,
    args: {
      collection: COLLECTION,
      tokenId: 7n,
      newBidder: LATER_BIDDER,
      bid: 20n,
      loanAddress: MSL_V3_1,
      loanId: 1n,
    },
  },
];

/** The auction as it stands on chain, after the bid in `events`. */
const currentAuction = {
  ...auction,
  highestBid: 20n,
  highestBidder: LATER_BIDDER,
  lastBidTime: blockAt(START_BLOCK + 10n).timestamp,
};

/**
 * Mainnet contracts over a stub chain: blocks every 12 seconds from block 100, a started auction
 * with one bid on it, a liquidator buyout setting of an hour, and a simulation that rejects any
 * other auction struct as stale and otherwise echoes its parameters back as the request.
 */
const setup = ({
  getContractEvents = mock(async () => events),
}: { getContractEvents?: () => Promise<unknown> } = {}) => {
  const simulateContract = mock(async (parameters: { args: unknown[] }) => {
    if ((parameters.args[2] as typeof auction).highestBid !== currentAuction.highestBid) {
      throw liquidatorRevert('InvalidHashAuctionError');
    }
    return { request: parameters };
  });
  const contracts = new Contracts(
    {
      chain: { id: 1 },
      simulateContract,
      getBlock: async ({ blockNumber }: { blockNumber?: bigint } = {}) =>
        blockAt(blockNumber ?? START_BLOCK + 1_000n),
      getContractEvents,
      readContract: async () => 3_600n,
    } as unknown as GondiPublicClient,
    {
      chain: { id: 1 },
      account: { address: zeroAddress },
      transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
      writeContract: mock(async () => TX_HASH),
    } as unknown as Wallet,
  );
  return { liquidator: contracts.All(MSL_V3_1), simulateContract, getContractEvents };
};

describe('v3.1 auction liquidator', () => {
  test('bids with a fresh struct without reading the chain', async () => {
    const getContractEvents = mock(async () => {
      throw new Error('block range too large');
    });
    const { liquidator, simulateContract } = setup({ getContractEvents });

    expect(liquidator).toBeInstanceOf(AllV6);
    await liquidator.placeBid({
      collectionContractAddress: COLLECTION,
      tokenId: 7n,
      bid: 30n,
      auction: currentAuction,
    });

    expect(getContractEvents).not.toHaveBeenCalled();
    expect(simulateContract).toHaveBeenCalledTimes(1);
  });

  test('bids again with the struct on chain when the one the caller holds is stale', async () => {
    const { liquidator, simulateContract } = setup();

    await liquidator.placeBid({
      collectionContractAddress: COLLECTION,
      tokenId: 7n,
      bid: 30n,
      auction,
    });

    const [, [{ args }]] = simulateContract.mock.calls as unknown as [
      unknown,
      [{ args: unknown[] }],
    ];
    expect(args).toEqual([COLLECTION, 7n, currentAuction, 30n]);
  });

  test('counts down the liquidator buyout setting', async () => {
    const remaining = await setup().liquidator.getRemainingLockupSeconds({ auction });

    expect(remaining).toBeWithin(2_598, 2_601);
  });
});
