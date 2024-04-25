import { LoanStatusType } from 'gondi';
import { Address } from 'viem';

import { approveToken, users } from '../common';

const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as const;
const USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' as const;

const CURRENCIES = [WETH, USDC];
const CONTRACTS = [
  process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? '',
  process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '',
  process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '',
].filter(Boolean) as Address[];

const loans = [];

let hasNextPage = true;
let cursor = null;
while (hasNextPage) {
  const data = await users[0].loans({
    limit: 20,
    cursor,
    borrowerAddress: users[0].wallet.account.address,
    statuses: [LoanStatusType.LoanInitiated],
  });
  hasNextPage = data.hasNextPage;
  cursor = data.cursor;
  loans.push(...data.loans);
}

// Approve NFTs and Currencies
for (const contract of CONTRACTS) {
  for (const currency of CURRENCIES) {
    await approveToken(users[0], contract, currency);
  }
}

console.log('About to repay ' + loans.length + ' loans');

for (const loan of loans) {
  const repayLoan = await users[0].repayLoan({ loan, loanId: BigInt(loan.loanId) });
  await repayLoan.waitTxInBlock();
}
