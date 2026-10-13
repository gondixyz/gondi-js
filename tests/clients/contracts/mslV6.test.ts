import { expect, mock, test } from 'bun:test';
import { decodeFunctionData } from 'viem';

import { MslV6 } from '@/clients/contracts/MslV6';
import { multiSourceLoanAbi } from '@/generated/blockchain/v7';
import { EmitLoanArgs } from '@/gondi';

const borrower = '0x0000000000000000000000000000000000000001';
const emitArgs: EmitLoanArgs = {
  offerExecution: [],
  nftCollateralAddress: borrower,
  tokenId: 1n,
  duration: 30n,
};

const mslSigningWith = (signExecutionData = mock(async () => '0x12')) =>
  Object.assign(Object.create(MslV6.prototype), {
    abi: multiSourceLoanAbi,
    version: '3.1',
    wallet: { account: { address: borrower } },
    signExecutionData,
  }) as MslV6;

const nowInSeconds = () => BigInt(Math.floor(Date.now() / 1000));

const signedExpiration = async (args: EmitLoanArgs) => {
  const signExecutionData = mock(async () => '0x12');
  await mslSigningWith(signExecutionData).encodeEmitLoan({ emitArgs: args, withSignature: true });
  const [{ structToSign }] = signExecutionData.mock.calls[0] as unknown as [
    { structToSign: { expirationTime: bigint } },
  ];
  return structToSign.expirationTime;
};

test('signs a borrower emit with an execution deadline minutes away', async () => {
  const now = nowInSeconds();
  expect(Number((await signedExpiration(emitArgs)) - now)).toBeWithin(300, 302);
});

test('signs the explicit deadline a caller passes', async () => {
  const expirationTime = nowInSeconds() + 90n;
  expect(await signedExpiration({ ...emitArgs, expirationTime })).toBe(expirationTime);
});

test('keeps a day for an emit the borrower sends unsigned', async () => {
  const now = nowInSeconds();
  const calldata = await mslSigningWith().encodeEmitLoan({ emitArgs, withSignature: false });
  const { args } = decodeFunctionData({ abi: multiSourceLoanAbi, data: calldata }) as unknown as {
    args: [{ executionData: { expirationTime: bigint } }];
  };
  expect(Number(args[0].executionData.expirationTime - now)).toBeWithin(86400, 86402);
});
