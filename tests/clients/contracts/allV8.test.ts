import { describe, expect, mock, test } from 'bun:test';
import { Abi, encodeFunctionData, zeroAddress } from 'viem';

import { AuctionV8 } from '@/blockchain';
import { Contracts, GondiPublicClient, Wallet } from '@/clients/contracts';
import { AllV8 } from '@/clients/contracts/AllV8';

const MSL_V3_2 = '0xE365fF3cad44d19cb7aBa81df8ffd6818A66Ac0a';
const LIQUIDATOR_V3_2 = '0xe6Ef33216348dDb2303a19Bb970e83d6508FabA5';
const COLLECTION = '0x0000000000000000000000000000000000000004';
const TX_HASH = `0x${'1'.repeat(64)}`;

/** `placeBid` with the 13-field `Auction` struct, as found in the deployed v3.2 liquidator's bytecode. */
const PLACE_BID_V3_2_SELECTOR = '0x13ca492f';

const auction: AuctionV8 = {
  loanAddress: MSL_V3_2,
  loanId: 1n,
  highestBid: 0n,
  triggerFee: 0n,
  minBid: 10n,
  highestBidder: zeroAddress,
  duration: 86400,
  asset: zeroAddress,
  startTime: 1,
  originator: zeroAddress,
  lastBidTime: 0,
  loanHash: `0x${'2'.repeat(64)}`,
  buyoutWindow: 3600,
};

/** Mainnet contracts over stub clients whose simulation echoes its parameters back as the request. */
const setup = () => {
  const simulateContract = mock(async (parameters: unknown) => ({ request: parameters }));
  const waitForTransactionReceipt = mock(async () => ({
    status: 'reverted',
    transactionHash: TX_HASH,
    logs: [],
  }));
  const walletClient = {
    chain: { id: 1 },
    account: { address: zeroAddress },
    transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
    writeContract: mock(async () => TX_HASH),
  } as unknown as Wallet;
  const contracts = new Contracts(
    { simulateContract, waitForTransactionReceipt } as unknown as GondiPublicClient,
    walletClient,
  );
  return { contracts, simulateContract };
};

describe('v3.2 auction liquidator', () => {
  test('resolves the v3.2 liquidator for a v3.2 loan contract', () => {
    const liquidator = setup().contracts.All(MSL_V3_2);

    expect(liquidator).toBeInstanceOf(AllV8);
    expect(liquidator.address).toBe(LIQUIDATOR_V3_2);
  });

  test('encodes a bid with the loanHash and buyoutWindow fields', async () => {
    const { contracts, simulateContract } = setup();

    await contracts.All(MSL_V3_2).placeBid({
      collectionContractAddress: COLLECTION,
      tokenId: 7n,
      bid: 11n,
      auction,
    });

    const [parameters] = simulateContract.mock.calls[0] as unknown as [
      { abi: Abi; functionName: string; args: unknown[] },
    ];
    expect(encodeFunctionData(parameters).slice(0, 10)).toBe(PLACE_BID_V3_2_SELECTOR);
    expect(parameters.args[2]).toEqual(auction);
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

  test('refuses an auction without loanHash instead of sending one that reverts', async () => {
    const { contracts, simulateContract } = setup();
    const { loanHash: _loanHash, buyoutWindow: _buyoutWindow, ...versionThreeAuction } = auction;

    await expect(
      contracts.All(MSL_V3_2).placeBid({
        collectionContractAddress: COLLECTION,
        tokenId: 7n,
        bid: 11n,
        auction: versionThreeAuction,
      }),
    ).rejects.toThrow('loanHash and buyoutWindow are required');
    expect(simulateContract).not.toHaveBeenCalled();
  });
});
