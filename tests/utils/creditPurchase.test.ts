import { describe, expect, mock, test } from 'bun:test';
import {
  decodeAbiParameters,
  decodeFunctionData,
  encodeAbiParameters,
  encodePacked,
  zeroAddress,
} from 'viem';
import { mainnet } from 'viem/chains';

import { getContracts, getCurrencies } from '@/deploys';
import { PurchaseBundlerV2 } from '@/clients/contracts/PurchaseBundlerV2';
import {
  assertCreditPurchaseExecution,
  assertCreditPurchaseRoute,
  buildCreditPurchaseSwap,
  quoteCreditPurchase,
} from '@/utils/creditPurchase';
import { universalRouterExecuteAbi } from '@/utils/crossCurrencyRenegotiation';

const { USDC_ADDRESS, WETH_ADDRESS } = getCurrencies(mainnet);
const base = {
  loanCurrency: USDC_ADDRESS,
  purchaseCurrency: WETH_ADDRESS,
  amount: 10n,
  limit: 20n,
  exactInput: false,
  deadline: 100n,
};

describe('credit purchase swaps', () => {
  test('keeps exact-output spending bounded in buyer loan currency', () => {
    const encoded = buildCreditPurchaseSwap(base);
    const decoded = decodeFunctionData({ abi: universalRouterExecuteAbi, data: encoded });
    expect(decoded.args[0]).toBe('0x01');
    expect(decoded.args[2]).toBe(100n);
    expect(
      decodeAbiParameters(
        [
          { type: 'address' },
          { type: 'uint256' },
          { type: 'uint256' },
          { type: 'bytes' },
          { type: 'bool' },
        ],
        decoded.args[1][0],
      ),
    ).toEqual([
      '0x0000000000000000000000000000000000000001',
      10n,
      20n,
      encodePacked(['address', 'uint24', 'address'], [WETH_ADDRESS, 500, USDC_ADDRESS]),
      true,
    ]);
  });
  test('uses exact input for partial funding with a minimum purchase-currency output', () => {
    const decoded = decodeFunctionData({
      abi: universalRouterExecuteAbi,
      data: buildCreditPurchaseSwap({ ...base, exactInput: true }),
    });
    expect(decoded.args[0]).toBe('0x00');
    const input = decodeAbiParameters(
      [
        { type: 'address' },
        { type: 'uint256' },
        { type: 'uint256' },
        { type: 'bytes' },
        { type: 'bool' },
      ],
      decoded.args[1][0],
    );
    expect(input.slice(1, 3)).toEqual([20n, 10n]);
  });
  test('unwraps WETH for an ETH listing without claiming the debt is ETH', () => {
    const decoded = decodeFunctionData({
      abi: universalRouterExecuteAbi,
      data: buildCreditPurchaseSwap({
        ...base,
        loanCurrency: WETH_ADDRESS,
        purchaseCurrency: '0x0000000000000000000000000000000000000000',
      }),
    });
    expect(decoded.args[0]).toBe('0x020c');
  });
});

test('rejects changed buyer offer amounts and fee terms', () => {
  const offer = {
    offerId: 1n,
    lender: zeroAddress,
    fee: 1n,
    capacity: 0n,
    nftCollateralAddress: zeroAddress,
    nftCollateralTokenId: 1n,
    principalAddress: USDC_ADDRESS,
    principalAmount: 100n,
    aprBps: 100n,
    expirationTime: 200n,
    duration: 30n,
    maxSeniorRepayment: 0n,
    validators: [],
  };
  const expected = {
    offerExecution: [{ offer, amount: 100n, lenderOfferSignature: '0x12' as const }],
    loanId: 0n,
    nftCollateralAddress: zeroAddress,
    tokenId: 1n,
    duration: 30n,
    expirationTime: 100n,
    principalReceiver: zeroAddress,
    callbackData: '0x' as const,
  };
  expect(() => assertCreditPurchaseExecution(expected, expected)).not.toThrow();
  expect(() =>
    assertCreditPurchaseExecution(expected, {
      ...expected,
      offerExecution: [{ ...expected.offerExecution[0], amount: 101n }],
    }),
  ).toThrow('confirmed');
  expect(() =>
    assertCreditPurchaseExecution(expected, {
      ...expected,
      offerExecution: [{ ...expected.offerExecution[0], offer: { ...offer, fee: 2n } }],
    }),
  ).toThrow('confirmed');
});

test('rejects changed collateral, duration, funding or callback before signing', () => {
  const expected = {
    offerExecution: [],
    loanId: 0n,
    nftCollateralAddress: zeroAddress,
    tokenId: 1n,
    duration: 30n,
    expirationTime: 100n,
    principalReceiver: zeroAddress,
    callbackData: '0x' as const,
  };
  expect(() => assertCreditPurchaseExecution(expected, { ...expected })).not.toThrow();
  for (const mutation of [
    { tokenId: 2n },
    { duration: 31n },
    { callbackData: '0x1234' },
    { loanId: 1n },
  ]) {
    expect(() => assertCreditPurchaseExecution(expected, { ...expected, ...mutation })).toThrow(
      'confirmed',
    );
  }
});

test('quotes the gross native purchase price while the seller callback records net sale proceeds', async () => {
  const deployments = getContracts(mainnet);
  const callbackData = encodeAbiParameters(
    [PurchaseBundlerV2.EXECUTION_INFO],
    [
      {
        reservoirExecutionInfo: { module: zeroAddress, data: '0x', value: 100n },
        contractMustBeOwner: true,
        purchaseCurrency: PurchaseBundlerV2.ETH_SENTINEL as `0x${string}`,
        amount: 98n,
        swapData: '0x',
        swapValue: 0n,
        maxSlippage: 0n,
      },
    ],
  );
  const client = {
    getBlock: async () => ({ timestamp: 100n }),
    readContract: mock(async ({ functionName, address }) => {
      if (functionName === 'paused') return false;
      if (functionName === 'getMultiSourceLoanAddress')
        return address === deployments.PurchaseBundler['3.1_PB_V2']
          ? deployments.MultiSourceLoan['3.1']
          : deployments.MultiSourceLoan['3.2'];
      if (functionName === 'getTaxes') return { buyTax: 0n, sellTax: 0n };
      if (functionName === 'allowance') return 1000n;
      return true;
    }),
  };
  const sellerMsl = {
    decodeRepaymentCalldata: () => ({
      data: { loanId: 1n, callbackData },
      loan: {
        startTime: 0n,
        duration: 1000n,
        principalAddress: WETH_ADDRESS,
        nftCollateralAddress: zeroAddress,
        nftCollateralTokenId: 7n,
      },
    }),
    contract: { read: { getLoanHash: async () => '0x' + '11'.repeat(32) } },
  };
  const quote = await quoteCreditPurchase({
    input: {
      orderId: 1,
      price: 100n,
      sellerContract: deployments.MultiSourceLoan['3.2'],
      repaymentCalldata: '0x1234',
      repaymentSwapData: '0xab',
      loanCurrency: WETH_ADDRESS,
      netPrincipal: 60n,
      offerExpirations: [500n],
    },
    wallet: { chain: mainnet, account: { address: zeroAddress } },
    client,
    sellerMsl,
  } as never);
  await expect(
    quoteCreditPurchase({
      input: {
        orderId: 1,
        price: 97n,
        sellerContract: deployments.MultiSourceLoan['3.2'],
        repaymentCalldata: '0x1234',
        loanCurrency: WETH_ADDRESS,
        netPrincipal: 60n,
        offerExpirations: [500n],
      },
      wallet: { chain: mainnet, account: { address: zeroAddress } },
      client,
      sellerMsl,
    } as never),
  ).rejects.toThrow('listing price');
  expect(quote.purchaseCurrency).toBe(zeroAddress);
  expect(quote.loanCurrency).toBe(WETH_ADDRESS);
  expect(quote.initialPayment).toBe(40n);
  expect(
    decodeFunctionData({ abi: universalRouterExecuteAbi, data: quote.loanSwapData }).args[0],
  ).toBe('0x020c');
  client.readContract.mockImplementation(async ({ functionName }) =>
    functionName === 'getTaxes' ? { buyTax: 1n, sellTax: 0n } : true,
  );
  await expect(assertCreditPurchaseRoute(client as never, quote)).rejects.toThrow('taxes changed');
  client.readContract.mockImplementation(async ({ functionName }) =>
    functionName === 'getTaxes'
      ? { buyTax: 0n, sellTax: 0n }
      : functionName === 'isWhitelisted'
        ? false
        : 1000n,
  );
  await expect(assertCreditPurchaseRoute(client as never, quote)).rejects.toThrow('not enabled');
  client.readContract.mockImplementation(async ({ functionName }) =>
    functionName === 'getTaxes'
      ? { buyTax: 0n, sellTax: 0n }
      : functionName === 'allowance'
        ? 0n
        : true,
  );
  await expect(assertCreditPurchaseRoute(client as never, quote)).rejects.toThrow(
    'approval initialized',
  );
});

for (const [
  netPrincipal,
  requested,
  quotedInput,
  quotedOutput,
  expectedPayment,
  expectedCommand,
  expectedAmounts,
] of [
  [200n, 0n, 101n, 0n, 0n, '0x01', [100n, 103n]],
  [60n, 20n, 101n, 63n, 38n, '0x00', [60n, 62n]],
] as const) {
  test(`bounds ${expectedCommand === '0x01' ? 'full' : 'partial'} cross-currency credit with explicit rounding`, async () => {
    const deployments = getContracts(mainnet);
    const callbackData = encodeAbiParameters(
      [PurchaseBundlerV2.EXECUTION_INFO],
      [
        {
          reservoirExecutionInfo: { module: zeroAddress, data: '0x', value: 0n },
          contractMustBeOwner: true,
          purchaseCurrency: WETH_ADDRESS,
          amount: 98n,
          swapData: '0x',
          swapValue: 0n,
          maxSlippage: 0n,
        },
      ],
    );
    const readContract = mock(async ({ functionName, address }) => {
      if (functionName === 'paused') return false;
      if (functionName === 'getMultiSourceLoanAddress')
        return address === deployments.PurchaseBundler['3.1_PB_V2']
          ? deployments.MultiSourceLoan['3.1']
          : deployments.MultiSourceLoan['3.2'];
      if (functionName === 'getTaxes') return { buyTax: 0n, sellTax: 0n };
      if (functionName === 'allowance') return 1000n;
      return true;
    });
    const simulateContract = mock(async ({ functionName }) => ({
      result: [functionName === 'quoteExactOutput' ? quotedInput : quotedOutput, [], [], 0n],
    }));
    const result = await quoteCreditPurchase({
      input: {
        orderId: 1,
        price: 100n,
        sellerContract: deployments.MultiSourceLoan['3.2'],
        repaymentCalldata: '0x1234',
        loanCurrency: USDC_ADDRESS,
        netPrincipal,
        minimumInitialPayment: requested,
        offerExpirations: [500n],
        slippageBps: 100n,
      },
      wallet: { chain: mainnet, account: { address: zeroAddress } },
      client: { getBlock: async () => ({ timestamp: 100n }), readContract, simulateContract },
      sellerMsl: {
        decodeRepaymentCalldata: () => ({
          data: { loanId: 1n, callbackData },
          loan: {
            startTime: 0n,
            duration: 1000n,
            principalAddress: WETH_ADDRESS,
            nftCollateralAddress: zeroAddress,
            nftCollateralTokenId: 7n,
          },
        }),
        contract: { read: { getLoanHash: async () => '0x' + '11'.repeat(32) } },
      },
    } as never);
    expect(result.initialPayment).toBe(expectedPayment);
    const decoded = decodeFunctionData({
      abi: universalRouterExecuteAbi,
      data: result.loanSwapData,
    });
    expect(decoded.args[0]).toBe(expectedCommand);
    const amounts = decodeAbiParameters(
      [
        { type: 'address' },
        { type: 'uint256' },
        { type: 'uint256' },
        { type: 'bytes' },
        { type: 'bool' },
      ],
      decoded.args[1][0],
    );
    expect(amounts.slice(1, 3)).toEqual(expectedAmounts);
    expect(simulateContract).toHaveBeenCalledTimes(expectedCommand === '0x01' ? 1 : 2);
    expect(
      readContract.mock.calls.filter(([call]) => call.functionName === 'isWhitelisted'),
    ).toHaveLength(1);
    expect(
      readContract.mock.calls.filter(([call]) => call.functionName === 'getTaxes'),
    ).toHaveLength(1);
  });
}
