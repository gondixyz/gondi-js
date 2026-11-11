import { expect, mock, test } from 'bun:test';
import { zeroAddress } from 'viem';

import { stubGondi } from './utils/gondiStub';
import { EmitLoanArgs, type Gondi } from '@/gondi';

const previousContract = '0x0000000000000000000000000000000000000001';
const nextContract = '0x0000000000000000000000000000000000000002';

test('efficientRefinanceFromOffers asks for no repayment signature when the borrower declines the execution one', async () => {
  const encodeRepayLoan = mock(async () => '0x' as const);
  const encodeEmitLoan = mock(async () => {
    throw new Error('User rejected the request');
  });
  const msls = {
    [previousContract]: { version: '3.1', encodeRepayLoan },
    [nextContract]: { version: '3.2', encodeEmitLoan },
  };
  const gondi = stubGondi({
    skipFlaggedNftCheck: true,
    account: { address: zeroAddress },
    wallet: { account: { address: zeroAddress } },
    contracts: {
      Msl: (address: keyof typeof msls) => msls[address],
      ERC20: () => ({ contract: { read: { balanceOf: async () => 0n } } }),
      PositionMigrator: () => ({ contract: { read: { getNonce: async () => 0n } } }),
    },
  });

  await expect(
    gondi.efficientRefinanceFromOffers({
      contractAddress: zeroAddress,
      loanId: 1n,
      loan: { contractAddress: previousContract, principalAddress: zeroAddress },
      executionData: {
        offerExecution: [{ offer: { contractAddress: nextContract } }],
      } as unknown as EmitLoanArgs,
    } as unknown as Parameters<Gondi['efficientRefinanceFromOffers']>[0]),
  ).rejects.toThrow('User rejected');
  expect(encodeRepayLoan).not.toHaveBeenCalled();
});

test('efficientRefinanceFromOffers asks for no signature when reading the migrator nonce fails', async () => {
  const encodeRepayLoan = mock(async () => '0x' as const);
  const encodeEmitLoan = mock(async () => '0x' as const);
  const msls = {
    [previousContract]: { version: '3.1', encodeRepayLoan },
    [nextContract]: { version: '3.2', encodeEmitLoan },
  };
  const gondi = stubGondi({
    skipFlaggedNftCheck: true,
    account: { address: zeroAddress },
    wallet: { account: { address: zeroAddress } },
    contracts: {
      Msl: (address: keyof typeof msls) => msls[address],
      ERC20: () => ({ contract: { read: { balanceOf: async () => 0n } } }),
      PositionMigrator: () => ({
        contract: {
          read: {
            getNonce: async () => {
              throw new Error('RPC timeout');
            },
          },
        },
      }),
    },
  });

  await expect(
    gondi.efficientRefinanceFromOffers({
      contractAddress: zeroAddress,
      loanId: 1n,
      loan: { contractAddress: previousContract, principalAddress: zeroAddress },
      executionData: {
        offerExecution: [{ offer: { contractAddress: nextContract } }],
      } as unknown as EmitLoanArgs,
    } as unknown as Parameters<Gondi['efficientRefinanceFromOffers']>[0]),
  ).rejects.toThrow('RPC timeout');
  expect(encodeEmitLoan).not.toHaveBeenCalled();
  expect(encodeRepayLoan).not.toHaveBeenCalled();
});
