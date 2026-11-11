import { describe, expect, test } from 'bun:test';
import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  encodeAbiParameters,
  Hex,
  toFunctionSelector,
  zeroAddress,
} from 'viem';
import { mainnet } from 'viem/chains';

import { Contracts } from '@/clients/contracts';
import { AllV8 } from '@/clients/contracts/AllV8';
import { getContracts } from '@/deploys';

const { MultiSourceLoan, AuctionLoanLiquidator } = getContracts(mainnet);
const collection = '0x0000000000000000000000000000000000009999';
const rotatedOutLiquidator = '0x000000000000000000000000000000000000aaaa';
const winningBidder = '0x000000000000000000000000000000000000bbbb';
const ownerOfSelector = toFunctionSelector('ownerOf(uint256)');
const auctionHash = `0x${'11'.repeat(32)}` as const;

/**
 * Contracts whose `ownerOf` answers `holder` and whose every other `eth_call` (the liquidator's
 * `getAuctionHash`) answers `auctionHashReply`, raw: `0x` is what an account without code returns.
 */
const contractsWithCollateralHeldBy = (holder: Address, auctionHashReply: Hex) => {
  const transport = custom({
    request: async ({ method, params }) => {
      if (method === 'eth_call') {
        const [{ data }] = params as [{ data: Hex }];
        return data.startsWith(ownerOfSelector)
          ? encodeAbiParameters([{ type: 'address' }], [holder])
          : auctionHashReply;
      }
      if (method === 'eth_chainId') return `0x${mainnet.id.toString(16)}`;
      throw new Error(`unexpected ${method}`);
    },
  });
  return new Contracts(
    createPublicClient({ chain: mainnet, transport }),
    createWalletClient({ account: zeroAddress, chain: mainnet, transport }),
  );
};

const collateral = {
  mslContractAddress: MultiSourceLoan['3.1'],
  collectionContractAddress: collection,
  tokenId: 1n,
} as const;

describe('Contracts.AllForCollateral', () => {
  test('targets the liquidator holding the collateral, not the address book entry', async () => {
    const contracts = contractsWithCollateralHeldBy(rotatedOutLiquidator, auctionHash);
    const liquidator = await contracts.AllForCollateral(collateral);
    expect(liquidator.address).toBe(rotatedOutLiquidator);
    expect(liquidator.address).not.toBe(AuctionLoanLiquidator['3.1']);
  });

  test("targets the v3.2 liquidator holding a v3.2 loan's collateral", async () => {
    const contracts = contractsWithCollateralHeldBy(rotatedOutLiquidator, auctionHash);
    const liquidator = await contracts.AllForCollateral({
      ...collateral,
      mslContractAddress: MultiSourceLoan['3.2'],
    });
    expect(liquidator).toBeInstanceOf(AllV8);
    expect(liquidator.address).toBe(rotatedOutLiquidator);
  });

  test('rejects collateral held by an account without code, such as a settled auction winner', async () => {
    const contracts = contractsWithCollateralHeldBy(winningBidder, '0x');
    await expect(contracts.AllForCollateral(collateral)).rejects.toThrow('No running auction');
  });

  test('rejects a liquidator that no longer records an auction on the collateral', async () => {
    const contracts = contractsWithCollateralHeldBy(
      rotatedOutLiquidator,
      encodeAbiParameters([{ type: 'bytes32' }], [`0x${'00'.repeat(32)}`]),
    );
    await expect(contracts.AllForCollateral(collateral)).rejects.toThrow('No running auction');
  });
});
