import { describe, expect, mock, test } from 'bun:test';
import { decodeFunctionData, zeroAddress } from 'viem';
import { mainnet } from 'viem/chains';

import { getCurrencies } from '@/deploys';
import { quotePurchaseFunding } from '@/utils/creditPurchase';
import { universalRouterExecuteAbi } from '@/utils/crossCurrencyRenegotiation';

const { USDC_ADDRESS, WETH_ADDRESS } = getCurrencies(mainnet);
const ether = 10n ** 18n;
const usdc = 10n ** 6n;
const client = {
  simulateContract: mock(async ({ functionName }: { functionName: string }) => ({
    result: [functionName === 'quoteExactOutput' ? 3_000n * usdc : ether / 2n],
  })),
};
const input = {
  loanCurrency: USDC_ADDRESS,
  purchaseCurrency: zeroAddress,
  price: ether,
  netPrincipal: 2_000n * usdc,
  deadline: 200n,
  slippageBps: 100n,
  minimumInitialPayment: 0n,
  client: client as never,
};

describe('bounded buyer funding', () => {
  test('quotes partial USDC credit in ETH payment units', async () => {
    const quote = await quotePurchaseFunding({ ...input, route: 'ordinary' });
    expect(quote.initialPayment).toBe(505_000_000_000_000_000n);
    expect(quote.inputAmount).toBe(2_000n * usdc);
  });

  test('caps exact-output USDC spend for a fully financed ETH listing', async () => {
    const quote = await quotePurchaseFunding({
      ...input,
      netPrincipal: 4_000n * usdc,
      route: 'ordinary',
    });
    expect([quote.initialPayment, quote.inputAmount]).toEqual([0n, 3_030n * usdc]);
  });

  test('native v3.1 partial financing includes premium on price minus ETH payment', async () => {
    const quote = await quotePurchaseFunding({ ...input, route: 'flash', premiumBps: 5n });
    const flashPrincipal = ether - quote.initialPayment;
    const premium = (flashPrincipal * 5n + 9_999n) / 10_000n;
    expect(flashPrincipal + premium).toBeLessThanOrEqual(495_000_000_000_000_000n);
    const swap = decodeFunctionData({ abi: universalRouterExecuteAbi, data: quote.loanSwapData });
    expect(swap.args[0]).toBe('0x00');
  });

  test('ERC20 v3.1 includes premium on the whole price with a partial WETH loan', async () => {
    const quote = await quotePurchaseFunding({
      ...input,
      loanCurrency: WETH_ADDRESS,
      purchaseCurrency: USDC_ADDRESS,
      price: 3_000n * usdc,
      netPrincipal: ether / 2n,
      route: 'flash',
      premiumBps: 5n,
      client: {
        simulateContract: async ({ functionName }: { functionName: string }) => ({
          result: [functionName === 'quoteExactOutput' ? ether : 1_500n * usdc],
        }),
      } as never,
    });
    expect(quote.initialPayment).toBe(1_516_500_000n);
  });

  test('same-currency native partial financing rounds premium up', async () => {
    const quote = await quotePurchaseFunding({
      ...input,
      route: 'flash',
      premiumBps: 5n,
      loanCurrency: WETH_ADDRESS,
      price: 10_001n,
      netPrincipal: 10_000n,
    });
    expect(quote.initialPayment).toBe(6n);
  });
});
