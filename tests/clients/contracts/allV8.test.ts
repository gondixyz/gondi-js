import { describe, expect, mock, test } from 'bun:test';
import { Abi, encodeFunctionData, zeroAddress } from 'viem';

import { AuctionV8 } from '@/blockchain';
import { Contracts, GondiPublicClient, Wallet } from '@/clients/contracts';
import { AllV8 } from '@/clients/contracts/AllV8';

import { liquidatorRevert } from '../../utils/liquidatorRevert';

const MSL_V3_2 = '0xE365fF3cad44d19cb7aBa81df8ffd6818A66Ac0a';
const LIQUIDATOR_V3_2 = '0xe6Ef33216348dDb2303a19Bb970e83d6508FabA5';
const COLLECTION = '0x0000000000000000000000000000000000000004';
const TX_HASH = `0x${'1'.repeat(64)}`;

/** `placeBid` with the 13-field `Auction` struct, as found in the deployed v3.2 liquidator's bytecode. */
const PLACE_BID_V3_2_SELECTOR = '0x13ca492f';

const START_BLOCK = 100n;
const START_TIME = BigInt(Math.floor(Date.now() / 1000)) - 1_000n;
const LATER_BIDDER = '0x0000000000000000000000000000000000000006';

const blockAt = (blockNumber: bigint) => ({
  number: blockNumber,
  timestamp: START_TIME + (blockNumber - START_BLOCK) * 12n,
});

const auction: AuctionV8 = {
  loanAddress: MSL_V3_2,
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
  loanHash: `0x${'2'.repeat(64)}`,
  buyoutWindow: 3600n,
};

const liquidationStarted = (startedAuction: AuctionV8) => ({
  eventName: 'LoanLiquidationStarted',
  blockNumber: START_BLOCK,
  args: { collection: COLLECTION, tokenId: 7n, auction: startedAuction },
});

const laterBid = {
  eventName: 'BidPlaced',
  blockNumber: START_BLOCK + 10n,
  args: {
    collection: COLLECTION,
    tokenId: 7n,
    newBidder: LATER_BIDDER,
    bid: 20n,
    loanAddress: MSL_V3_2,
    loanId: 1n,
  },
};

/** The auction as it stands on chain, after `laterBid`. */
const currentAuction: AuctionV8 = {
  ...auction,
  highestBid: 20n,
  highestBidder: LATER_BIDDER,
  lastBidTime: blockAt(START_BLOCK + 10n).timestamp,
};

/**
 * Mainnet contracts over a stub chain: blocks every 12 seconds from block 100, the given v3.2
 * liquidator events, a liquidator buyout setting of two days, and a simulation that rejects any
 * auction struct other than the latest one in `events` as stale and otherwise echoes its
 * parameters back as the request, and receipts that come back reverted.
 */
const setup = (events: unknown[] = [liquidationStarted(auction)]) => {
  const latestHighestBid = events.includes(laterBid) ? laterBid.args.bid : 0n;
  const simulateContract = mock(async (parameters: { args: unknown[] }) => {
    if ((parameters.args[2] as AuctionV8).highestBid !== latestHighestBid) {
      throw liquidatorRevert('InvalidHashAuctionError');
    }
    return { request: parameters };
  });
  const getContractEvents = mock(async () => events);
  const walletClient = {
    chain: { id: 1 },
    account: { address: zeroAddress },
    transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
    writeContract: mock(async () => TX_HASH),
  } as unknown as Wallet;
  const contracts = new Contracts(
    {
      chain: { id: 1 },
      simulateContract,
      getBlock: async ({ blockNumber }: { blockNumber?: bigint } = {}) =>
        blockAt(blockNumber ?? START_BLOCK + 1_000n),
      getContractEvents,
      readContract: async () => 172_800n,
      waitForTransactionReceipt: async () => ({
        status: 'reverted',
        transactionHash: TX_HASH,
        logs: [],
      }),
    } as unknown as GondiPublicClient,
    walletClient,
  );
  return { contracts, simulateContract, getContractEvents };
};

describe('v3.2 auction liquidator', () => {
  test('resolves the v3.2 liquidator for a v3.2 loan contract', () => {
    const liquidator = setup().contracts.All(MSL_V3_2);

    expect(liquidator).toBeInstanceOf(AllV8);
    expect(liquidator.address).toBe(LIQUIDATOR_V3_2);
  });

  test('bids with a fresh v3.2 struct without reading the chain', async () => {
    const { contracts, simulateContract, getContractEvents } = setup([
      liquidationStarted(auction),
      laterBid,
    ]);

    await contracts.All(MSL_V3_2).placeBid({
      collectionContractAddress: COLLECTION,
      tokenId: 7n,
      bid: 30n,
      auction: currentAuction,
    });

    expect(getContractEvents).not.toHaveBeenCalled();
    expect(simulateContract).toHaveBeenCalledTimes(1);
  });

  test('bids again with the struct on chain when the v3.2 one the caller holds is stale', async () => {
    const { contracts, simulateContract } = setup([liquidationStarted(auction), laterBid]);

    await contracts.All(MSL_V3_2).placeBid({
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

  test('reads the v3.2 struct from the chain when the caller holds one without its fields', async () => {
    const { contracts, simulateContract } = setup([liquidationStarted(auction), laterBid]);
    const { loanHash: _loanHash, buyoutWindow: _buyoutWindow, ...apiAuction } = auction;

    await contracts.All(MSL_V3_2).placeBid({
      collectionContractAddress: COLLECTION,
      tokenId: 7n,
      bid: 30n,
      auction: apiAuction,
    });

    const [parameters] = simulateContract.mock.calls[0] as unknown as [
      { abi: Abi; functionName: string; args: unknown[] },
    ];
    expect(encodeFunctionData(parameters).slice(0, 10)).toBe(PLACE_BID_V3_2_SELECTOR);
    expect(simulateContract).toHaveBeenCalledTimes(1);
    expect(parameters.args).toEqual([COLLECTION, 7n, currentAuction, 30n]);
  });

  test('rejects a bid whose transaction reverted on-chain as reverted, not as a missing event', async () => {
    const { contracts } = setup();

    const { waitTxInBlock } = await contracts.All(MSL_V3_2).placeBid({
      collectionContractAddress: COLLECTION,
      tokenId: 7n,
      bid: 11n,
      auction,
    });

    await expect(waitTxInBlock()).rejects.toThrow(`Transaction reverted: ${TX_HASH}`);
  });

  test('counts down the buyout window the caller holds, without reading the chain', async () => {
    const { contracts, getContractEvents } = setup();

    const remaining = await contracts.All(MSL_V3_2).getRemainingLockupSeconds({ auction });

    expect(remaining).toBeWithin(2_598, 2_601);
    expect(getContractEvents).not.toHaveBeenCalled();
  });

  test('reads the buyout window the auction snapshotted once, not the liquidator setting', async () => {
    const { contracts, getContractEvents } = setup();
    const { loanAddress, loanId, startTime } = auction;

    await contracts
      .All(MSL_V3_2)
      .getRemainingLockupSeconds({ auction: { loanAddress, loanId, startTime } });
    const remaining = await contracts
      .All(MSL_V3_2)
      .getRemainingLockupSeconds({ auction: { loanAddress, loanId, startTime } });

    expect(remaining).toBeWithin(2_598, 2_601);
    expect(getContractEvents).toHaveBeenCalledTimes(1);
  });

  test('has no lockup on an auction whose main lender is a pool', async () => {
    const { contracts } = setup([liquidationStarted({ ...auction, buyoutWindow: 0n })]);
    const { loanAddress, loanId, startTime } = auction;

    expect(
      await contracts
        .All(MSL_V3_2)
        .getRemainingLockupSeconds({ auction: { loanAddress, loanId, startTime } }),
    ).toBe(0);
  });
});
