import { expect, test } from 'bun:test';
import { mainnet } from 'viem/chains';

import { getCurrencies } from '@/deploys';
import { buyWithLoanApprovals } from '@/utils/buyWithLoan';

const { USDC_ADDRESS, WETH_ADDRESS } = getCurrencies(mainnet);
const base = {
  route: 'flash',
  purchaseCurrency: USDC_ADDRESS,
  loanCurrency: WETH_ADDRESS,
  price: 3_000_000_000n,
  initialPayment: 1_500_000_000n,
  inputAmount: 500_000_000_000_000_000n,
  premiumBps: 5n,
};

test('flash conversion caps buyer loan collection and listing-token contribution separately', () => {
  expect(buyWithLoanApprovals(base as never)).toEqual([
    { currency: WETH_ADDRESS, amount: base.inputAmount },
    { currency: USDC_ADDRESS, amount: base.initialPayment },
  ]);
});

test('same-currency flash repayment aggregates principal and wallet payment in one cap', () => {
  expect(buyWithLoanApprovals({ ...base, loanCurrency: USDC_ADDRESS } as never)).toEqual([
    { currency: USDC_ADDRESS, amount: 3_001_500_000n },
  ]);
});

test('native cross-currency flash repayment revokes unquoted WETH fallback spending', () => {
  expect(
    buyWithLoanApprovals({
      ...base,
      purchaseCurrency: '0x0000000000000000000000000000000000000000',
      loanCurrency: USDC_ADDRESS,
    } as never),
  ).toEqual([
    { currency: USDC_ADDRESS, amount: base.inputAmount },
    { currency: WETH_ADDRESS, amount: 0n },
  ]);
});
