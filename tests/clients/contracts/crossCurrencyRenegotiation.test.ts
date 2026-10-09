import { describe, expect, mock, test } from 'bun:test';
import { createWalletClient, custom, zeroAddress } from 'viem';
import { mainnet } from 'viem/chains';

import { GondiPublicClient } from '@/clients/contracts';
import { CrossCurrencyRenegotiation } from '@/clients/contracts/CrossCurrencyRenegotiation';
import { MslV6 } from '@/clients/contracts/MslV6';
import { getContracts, getCurrencies } from '@/deploys';
import { EmitLoanArgs } from '@/gondi';
import { LoanToMslLoanType } from '@/utils/loan';

const borrower = '0x0000000000000000000000000000000000001234';
const lender = '0x0000000000000000000000000000000000005678';
const collateral = '0x0000000000000000000000000000000000009999';
const aToken = '0x000000000000000000000000000000000000aaaa';
const { WETH_ADDRESS, USDC_ADDRESS } = getCurrencies(mainnet);
const deployments = getContracts(mainnet);
const oldContract = deployments.MultiSourceLoan['3.1'];
const newContract = deployments.MultiSourceLoan['3.2'];

const loan: LoanToMslLoanType = {
  contractAddress: oldContract,
  borrower,
  nftCollateralAddress: collateral,
  nftCollateralTokenId: 1n,
  principalAddress: USDC_ADDRESS,
  principalAmount: 1000_000000n,
  startTime: 100n,
  contractStartTime: 100n,
  duration: 1000n,
  protocolFee: 0n,
  tranche: [
    {
      loanId: 1n,
      floor: 0n,
      principalAmount: 1000_000000n,
      lender,
      accruedInterest: 0n,
      startTime: 100n,
      aprBps: 1000n,
    },
  ],
};

const executionData: EmitLoanArgs = {
  nftCollateralAddress: collateral,
  tokenId: 1n,
  duration: 1000n,
  offerExecution: [
    {
      amount: 10n ** 18n,
      lenderOfferSignature: '0x1234',
      offer: {
        contractAddress: newContract,
        nftCollateralAddress: collateral,
        nftCollateralTokenId: 1n,
        lenderAddress: lender,
        signerAddress: lender,
        principalAddress: WETH_ADDRESS,
        principalAmount: 10n ** 18n,
        aprBps: 1000n,
        fee: 10n ** 16n,
        capacity: 10n ** 18n,
        duration: 1000n,
        expirationTime: 1000n,
        offerId: 1n,
        maxSeniorRepayment: 0n,
        offerValidators: [],
        borrowerAddress: zeroAddress,
      },
    },
  ],
};

const setup = ({
  whitelisted = true,
  liquidity = 10n ** 20n,
  allowance = 10n ** 20n,
  protocolFeeBps = 0n,
} = {}) => {
  const readContract = mock(async ({ functionName }: { functionName: string }) => {
    switch (functionName) {
      case 'getLoanHash':
        return `0x${'ab'.repeat(32)}`;
      case 'FLASHLOAN_PREMIUM_TOTAL':
        return 5n;
      case 'getReserveData':
        return {
          configuration: { data: (1n << 56n) | (1n << 63n) },
          aTokenAddress: aToken,
        };
      case 'balanceOf':
        return liquidity;
      case 'allowance':
        return allowance;
      case 'isWhitelisted':
        return whitelisted;
      case 'getCollectionManager':
      case 'getCurrencyManager':
        return collateral;
      case 'getMultiSourceLoanAddress':
        return oldContract;
      case 'paused':
        return false;
      case 'isApprovedForAll':
        return true;
      case 'getNonce':
        return 0n;
      case 'getProtocolFee':
        return { recipient: zeroAddress, fraction: protocolFeeBps };
      case 'isOfferCancelled':
        return false;
      case 'getUsedCapacity':
        return 0n;
      default:
        throw new Error(`Unexpected read ${functionName}`);
    }
  });
  const publicClient = {
    readContract,
    getBlock: mock(async () => ({ number: 123n, timestamp: 150n })),
    simulateContract: mock(async () => ({ result: [300000000000000000n, [], [], 0n] })),
  } as unknown as GondiPublicClient;
  const wallet = createWalletClient({
    account: borrower,
    chain: mainnet,
    transport: custom({ request: async () => '0x' }),
  });
  const oldMsl = new MslV6({
    address: oldContract,
    version: '3.1',
    walletClient: wallet,
    publicClient,
  });
  const newMsl = new MslV6({
    address: newContract,
    version: '3.2',
    walletClient: wallet,
    publicClient,
  });
  return {
    client: new CrossCurrencyRenegotiation({
      previousMsl: oldMsl,
      msl: newMsl,
      walletClient: wallet,
      publicClient,
    }),
    publicClient,
  };
};

describe('cross-currency loan quotes', () => {
  test('keeps the reusable old-currency approval independent of quote refreshes', async () => {
    const { client, publicClient } = setup();
    const first = await client.quote({ loan, loanId: 1n, executionData });
    publicClient.getBlock = mock(async () => ({
      number: 124n,
      timestamp: 400n,
    })) as typeof publicClient.getBlock;
    const refreshed = await client.quote({ loan, loanId: 1n, executionData });
    expect(refreshed.repaymentAmount).toBeGreaterThan(first.repaymentAmount);
    expect(refreshed.oldCurrencyApprovalAmount).toBe(first.oldCurrencyApprovalAmount);
    expect(refreshed.oldCurrencyApprovalAmount).toBeGreaterThan(refreshed.repaymentAmount);
  });

  test('a changed conversion budget requires approval of the refreshed exact cap', async () => {
    const { client, publicClient } = setup();
    const first = await client.quote({ loan, loanId: 1n, executionData });
    publicClient.simulateContract = mock(async () => ({
      result: [310000000000000000n, [], [], 0n],
    })) as typeof publicClient.simulateContract;
    const refreshed = await client.quote({ loan, loanId: 1n, executionData });
    const originalRead = publicClient.readContract;
    publicClient.readContract = mock(async (args: Parameters<typeof originalRead>[0]) =>
      args.functionName === 'allowance' ? first.maximumFlashRepayment : originalRead(args),
    ) as typeof originalRead;
    await expect(
      client.execute({ loan, loanId: 1n, executionData, quote: refreshed }),
    ).rejects.toThrow('exact quoted');
  });
  test('records the live replacement contract fee instead of assuming a version fee', async () => {
    const { client } = setup({ protocolFeeBps: 1750n });
    const quote = await client.quote({ loan, loanId: 1n, executionData });
    expect(quote.replacementProtocolFeeBps).toBe(1750n);
  });

  test('requires a refreshed quote if the target protocol fee changes', async () => {
    const { client } = setup({ protocolFeeBps: 1750n });
    const quote = await client.quote({ loan, loanId: 1n, executionData });
    client.msl.getProtocolFee = mock(async () => ({ recipient: zeroAddress, fraction: 2000n }));
    await expect(client.execute({ loan, loanId: 1n, executionData, quote })).rejects.toThrow(
      'protocol fee',
    );
  });

  test('honors an earlier borrower execution expiration', async () => {
    const { client } = setup();
    const quote = await client.quote({
      loan,
      loanId: 1n,
      executionData: { ...executionData, expirationTime: 200n },
    });
    expect(quote.deadline).toBe(200n);
  });

  test('rejects duplicate offer identities rather than double-counting capacity', async () => {
    const { client } = setup();
    await expect(
      client.quote({
        loan,
        loanId: 1n,
        executionData: {
          ...executionData,
          offerExecution: [executionData.offerExecution[0], executionData.offerExecution[0]],
        },
      }),
    ).rejects.toThrow('duplicate');
  });

  test('requires the bundler Permit2 allowance to cover the full input budget', async () => {
    const { client } = setup({ allowance: 1n });
    await expect(client.quote({ loan, loanId: 1n, executionData })).rejects.toThrow(
      'uninitialized',
    );
  });

  test('quotes USDC debt separately from WETH funding and fees', async () => {
    const { client } = setup();
    const quote = await client.quote({ loan, loanId: 1n, executionData });
    expect({
      oldCurrency: quote.oldCurrency,
      newCurrency: quote.newCurrency,
      newPrincipal: quote.newPrincipal,
      originationFee: quote.originationFee,
      maximumInput: quote.maximumInput,
      maximumTopUp: quote.maximumTopUp,
      deadline: quote.deadline,
    }).toEqual({
      oldCurrency: USDC_ADDRESS,
      newCurrency: WETH_ADDRESS,
      newPrincipal: 10n ** 18n,
      originationFee: 10n ** 16n,
      maximumInput: 303000000000000000n,
      maximumTopUp: 0n,
      deadline: 270n,
    });
  });

  test('refuses a route that has not been activated', async () => {
    const { client } = setup({ whitelisted: false });
    await expect(client.quote({ loan, loanId: 1n, executionData })).rejects.toThrow('whitelist');
  });

  test('refuses insufficient flash liquidity', async () => {
    const { client } = setup({ liquidity: 1n });
    await expect(client.quote({ loan, loanId: 1n, executionData })).rejects.toThrow('liquidity');
  });

  test('refuses same-currency requests', async () => {
    const { client } = setup();
    await expect(
      client.quote({
        loan: { ...loan, principalAddress: WETH_ADDRESS },
        loanId: 1n,
        executionData,
      }),
    ).rejects.toThrow('different');
  });

  test('refuses a replacement against different collateral', async () => {
    const { client } = setup();
    await expect(
      client.quote({ loan, loanId: 1n, executionData: { ...executionData, tokenId: 2n } }),
    ).rejects.toThrow('collateral');
  });

  test('refuses a loan owned by another borrower', async () => {
    const { client } = setup();
    await expect(
      client.quote({ loan: { ...loan, borrower: lender }, loanId: 1n, executionData }),
    ).rejects.toThrow('borrower');
  });

  test('requires an exact capped migrator allowance before execution', async () => {
    const { client } = setup();
    const quote = await client.quote({ loan, loanId: 1n, executionData });
    await expect(client.execute({ loan, loanId: 1n, executionData, quote })).rejects.toThrow(
      'allowance',
    );
  });
});
