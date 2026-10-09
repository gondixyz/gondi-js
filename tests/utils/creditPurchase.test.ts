import { describe, expect, mock, test } from 'bun:test';
import {
  type Address,
  decodeAbiParameters,
  decodeFunctionData,
  encodeAbiParameters,
  encodePacked,
  type Hex,
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
const swapInputTypes = [
  { type: 'address' },
  { type: 'uint256' },
  { type: 'uint256' },
  { type: 'bytes' },
  { type: 'bool' },
] as const;

/** Encodes the seller's `PurchaseBundlerV2` callback for a listing paid in `purchaseCurrency`. */
const sellerCallback = ({
  value,
  purchaseCurrency,
}: {
  value: bigint;
  purchaseCurrency: Address;
}) =>
  encodeAbiParameters(
    [PurchaseBundlerV2.EXECUTION_INFO],
    [
      {
        reservoirExecutionInfo: { module: zeroAddress, data: '0x', value },
        contractMustBeOwner: true,
        purchaseCurrency,
        amount: 98n,
        swapData: '0x',
        swapValue: 0n,
        maxSlippage: 0n,
      },
    ],
  );

/** Fakes the seller's v3.2 loan whose repayment calldata carries `callbackData`. */
const sellerMslFake = (callbackData: Hex) => ({
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
});

/** Fakes the on-chain reads of an open, untaxed and approved credit purchase route. */
const routeReadContract = () => {
  const deployments = getContracts(mainnet);
  return mock(async ({ functionName, address }) => {
    if (functionName === 'paused') return false;
    if (functionName === 'getMultiSourceLoanAddress')
      return address === deployments.PurchaseBundler['3.1_PB_V2']
        ? deployments.MultiSourceLoan['3.1']
        : deployments.MultiSourceLoan['3.2'];
    if (functionName === 'getTaxes') return { buyTax: 0n, sellTax: 0n };
    if (functionName === 'allowance') return 1000n;
    return true;
  });
};

/** Quotes buying a native-ETH listing with WETH credit, overriding the default input. */
const quoteNativeListing = (input: { price: bigint; repaymentSwapData?: Hex }) =>
  quoteCreditPurchase({
    input: {
      orderId: 1,
      sellerContract: getContracts(mainnet).MultiSourceLoan['3.2'],
      repaymentCalldata: '0x1234',
      loanCurrency: WETH_ADDRESS,
      netPrincipal: 60n,
      offerExpirations: [500n],
      ...input,
    },
    wallet: { chain: mainnet, account: { address: zeroAddress } },
    client: { getBlock: async () => ({ timestamp: 100n }), readContract: routeReadContract() },
    sellerMsl: sellerMslFake(
      sellerCallback({
        value: 100n,
        purchaseCurrency: PurchaseBundlerV2.ETH_SENTINEL as Address,
      }),
    ),
  } as never);

describe('credit purchase swaps', () => {
  test('keeps exact-output spending bounded in buyer loan currency', () => {
    const encoded = buildCreditPurchaseSwap(base);
    const decoded = decodeFunctionData({ abi: universalRouterExecuteAbi, data: encoded });
    expect(decoded.args[0]).toBe('0x01');
    expect(decoded.args[2]).toBe(100n);
    expect(decodeAbiParameters(swapInputTypes, decoded.args[1][0])).toEqual([
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
    const input = decodeAbiParameters(swapInputTypes, decoded.args[1][0]);
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
  const quote = await quoteNativeListing({ price: 100n, repaymentSwapData: '0xab' });
  expect(quote.purchaseCurrency).toBe(zeroAddress);
  expect(quote.loanCurrency).toBe(WETH_ADDRESS);
  expect(quote.initialPayment).toBe(40n);
  expect(
    decodeFunctionData({ abi: universalRouterExecuteAbi, data: quote.loanSwapData }).args[0],
  ).toBe('0x020c');
});

test('rejects a changed listing price', async () => {
  await expect(quoteNativeListing({ price: 97n })).rejects.toThrow('listing price');
});

test.each([
  [
    'taxes changed',
    async ({ functionName }: { functionName: string }) =>
      functionName === 'getTaxes' ? { buyTax: 1n, sellTax: 0n } : true,
  ],
  [
    'not enabled',
    async ({ functionName }: { functionName: string }) =>
      functionName === 'getTaxes'
        ? { buyTax: 0n, sellTax: 0n }
        : functionName === 'isWhitelisted'
          ? false
          : 1000n,
  ],
  [
    'approval initialized',
    async ({ functionName }: { functionName: string }) =>
      functionName === 'getTaxes'
        ? { buyTax: 0n, sellTax: 0n }
        : functionName === 'allowance'
          ? 0n
          : true,
  ],
] as const)('rejects a credit purchase route failing with "%s"', async (message, readContract) => {
  const quote = await quoteNativeListing({ price: 100n, repaymentSwapData: '0xab' });
  await expect(assertCreditPurchaseRoute({ readContract } as never, quote)).rejects.toThrow(
    message,
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
    const readContract = routeReadContract();
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
      sellerMsl: sellerMslFake(sellerCallback({ value: 0n, purchaseCurrency: WETH_ADDRESS })),
    } as never);
    expect(result.initialPayment).toBe(expectedPayment);
    expect(result.inputAmount).toBe(expectedCommand === '0x01' ? 103n : netPrincipal);
    const decoded = decodeFunctionData({
      abi: universalRouterExecuteAbi,
      data: result.loanSwapData,
    });
    expect(decoded.args[0]).toBe(expectedCommand);
    const amounts = decodeAbiParameters(swapInputTypes, decoded.args[1][0]);
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
