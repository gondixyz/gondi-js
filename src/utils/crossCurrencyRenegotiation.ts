import { Address, encodeAbiParameters, encodeFunctionData, encodePacked, parseAbi } from 'viem';

import { BPS } from '@/utils/loan';
import { max, mulDivUp } from '@/utils/number';

/** Quote and calldata boundaries use actual basis points, with a denominator of 10,000. */
export const CROSS_CURRENCY_DEFAULT_SLIPPAGE_BPS = 100n;
export const CROSS_CURRENCY_QUOTE_SECONDS = 120n;

export const universalRouterExecuteAbi = parseAbi([
  'function execute(bytes commands, bytes[] inputs, uint256 deadline) payable',
]);

/** Bounds the transaction by the old loan's maturity and every incoming offer's expiry. */
export const crossCurrencyDeadline = ({
  now,
  maturity,
  expirations,
}: {
  now: bigint;
  maturity: bigint;
  expirations: bigint[];
}) => {
  const deadline = [now + CROSS_CURRENCY_QUOTE_SECONDS, maturity - 1n, ...expirations].reduce(
    (earliest, expiration) => (expiration < earliest ? expiration : earliest),
  );
  if (deadline <= now) throw new Error('The loan or replacement offer has expired');
  return deadline;
};

/** All arguments and returned budget amounts are denominated in the NEW loan currency. */
export const calculateCrossCurrencyBudget = ({
  quotedInput,
  slippageBps,
  premiumBps,
  netNewPrincipal,
}: {
  quotedInput: bigint;
  slippageBps: bigint;
  premiumBps: bigint;
  netNewPrincipal: bigint;
}) => {
  if (
    quotedInput <= 0n ||
    netNewPrincipal <= 0n ||
    slippageBps < 0n ||
    slippageBps > BPS ||
    premiumBps < 0n ||
    premiumBps > BPS
  ) {
    throw new Error('Invalid cross-currency settlement budget');
  }
  const maximumInput = mulDivUp(quotedInput, BPS + slippageBps, BPS);
  const premium = mulDivUp(maximumInput, premiumBps, BPS);
  const maximumFlashRepayment = maximumInput + premium;
  return {
    maximumInput,
    premium,
    maximumFlashRepayment,
    maximumTopUp: max(0n, maximumFlashRepayment - netNewPrincipal),
    minimumSurplus: max(0n, netNewPrincipal - maximumFlashRepayment),
  };
};

/**
 * Pays old debt and refunds unused NEW currency directly to the borrower.
 *
 * IMPLEMENTATION NOTE: Universal Router exact-output paths are reversed. Commands 0x02,
 * 0x01 and 0x04 move the full budget to the router, pay the old currency to the borrower,
 * and sweep remaining input to the borrower. The swap uses the router's balance, so the
 * PurchaseBundler cannot refund user input to its caller (the migrator).
 * https://developers.uniswap.org/docs/protocols/universal-router/concepts/commands
 */
export const buildCrossCurrencySwap = ({
  borrower,
  oldCurrency,
  newCurrency,
  router,
  repaymentAmount,
  maximumInput,
  deadline,
}: {
  borrower: Address;
  oldCurrency: Address;
  newCurrency: Address;
  router: Address;
  repaymentAmount: bigint;
  maximumInput: bigint;
  deadline: bigint;
}) => {
  if (maximumInput <= 0n || maximumInput >= 2n ** 160n || repaymentAmount <= 0n) {
    throw new Error('Invalid swap amount');
  }
  const path = encodePacked(['address', 'uint24', 'address'], [oldCurrency, 500, newCurrency]);
  return encodeFunctionData({
    abi: universalRouterExecuteAbi,
    functionName: 'execute',
    args: [
      '0x020104',
      [
        encodeAbiParameters(
          [{ type: 'address' }, { type: 'address' }, { type: 'uint160' }],
          [newCurrency, router, maximumInput],
        ),
        encodeAbiParameters(
          [
            { type: 'address' },
            { type: 'uint256' },
            { type: 'uint256' },
            { type: 'bytes' },
            { type: 'bool' },
          ],
          [borrower, repaymentAmount, maximumInput, path, false],
        ),
        encodeAbiParameters(
          [{ type: 'address' }, { type: 'address' }, { type: 'uint256' }],
          [newCurrency, borrower, 0n],
        ),
      ],
      deadline,
    ],
  });
};
