import { describe, expect, mock, test } from 'bun:test';
import { decodeFunctionData, Hex, zeroHash } from 'viem';

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

const MSL_ADDRESS = '0x00000000000000000000000000000000000000Aa';
const LENDER = '0x0000000000000000000000000000000000000003';
const COLLECTION = '0x0000000000000000000000000000000000000004';
const TX_HASH = '0x01';

const emitArgsFor = (tokenId: bigint, offerId: bigint): EmitLoanArgs =>
  ({
    offerExecution: [
      {
        offer: {
          offerId,
          lenderAddress: LENDER,
          fee: 0n,
          capacity: 0n,
          nftCollateralAddress: COLLECTION,
          nftCollateralTokenId: 0n,
          principalAddress: borrower,
          principalAmount: 10n,
          aprBps: 100n,
          expirationTime: 1n,
          duration: 30n,
          maxSeniorRepayment: 0n,
          offerValidators: [],
          contractAddress: MSL_ADDRESS,
        },
        lenderOfferSignature: '0x12',
      },
    ],
    nftCollateralAddress: COLLECTION,
    tokenId,
    duration: 30n,
  }) as unknown as EmitLoanArgs;

const loanEmittedEvent = (loanId: bigint, tokenId: bigint) => ({
  args: {
    loanId,
    offerId: [],
    fee: 0n,
    loan: { borrower, nftCollateralAddress: COLLECTION, nftCollateralTokenId: tokenId },
  },
});

const mslEmitting = (
  events: ReturnType<typeof loanEmittedEvent>[],
  revokeEvents: { args: object }[] = [],
) => {
  const multicall = mock(async () => TX_HASH);
  const emitLoan = mock(async () => TX_HASH);
  const msl = Object.assign(Object.create(MslV6.prototype), {
    abi: multiSourceLoanAbi,
    version: '3.1',
    wallet: { account: { address: borrower } },
    contract: { address: MSL_ADDRESS },
    safeContractWrite: { multicall, emitLoan },
    bcClient: { waitForTransactionReceipt: async () => ({ transactionHash: TX_HASH, logs: [] }) },
    parseEventLogs: (eventName: string) =>
      ({ LoanEmitted: events, RevokeDelegate: revokeEvents })[eventName] ?? [],
  }) as MslV6;
  return { msl, multicall, emitLoan };
};

describe('emitLoan', () => {
  test('returns the emitted loan under its SDK ids', async () => {
    const { msl } = mslEmitting([loanEmittedEvent(9n, 1n)]);

    const { waitTxInBlock } = await msl.emitLoan(emitArgsFor(1n, 5n));

    expect(await waitTxInBlock()).toEqual({
      loan: {
        id: `${MSL_ADDRESS.toLowerCase()}.9`,
        borrower,
        nftCollateralAddress: COLLECTION,
        nftCollateralTokenId: 1n,
        contractAddress: MSL_ADDRESS,
      },
      loanId: 9n,
      offerIds: [`${MSL_ADDRESS.toLowerCase()}.${LENDER}.5`],
      transactionHash: TX_HASH,
      logs: [],
    } as unknown as Awaited<ReturnType<typeof waitTxInBlock>>);
  });
});

describe('emitLoans', () => {
  test('sends every loan as an emitLoan call of one multicall, in input order', async () => {
    const { msl, multicall } = mslEmitting([]);

    await msl.emitLoans([emitArgsFor(1n, 5n), emitArgsFor(2n, 6n)]);

    expect(multicall).toHaveBeenCalledTimes(1);
    const [[calls]] = multicall.mock.calls[0] as unknown as [[Hex[]]];
    const decodedCalls = calls.map(
      (call) =>
        decodeFunctionData({ abi: multiSourceLoanAbi, data: call }) as unknown as {
          functionName: string;
          args: [{ borrower: string; executionData: { tokenId: bigint } }];
        },
    );
    expect(decodedCalls.map(({ functionName }) => functionName)).toEqual(['emitLoan', 'emitLoan']);
    expect(decodedCalls.map(({ args }) => args[0].executionData.tokenId)).toEqual([1n, 2n]);
    expect(decodedCalls.map(({ args }) => args[0].borrower)).toEqual([borrower, borrower]);
  });

  test('pairs each loan with the LoanEmitted event of its collateral', async () => {
    const { msl } = mslEmitting([loanEmittedEvent(12n, 2n), loanEmittedEvent(11n, 1n)]);

    const { waitTxInBlock } = await msl.emitLoans([emitArgsFor(1n, 5n), emitArgsFor(2n, 6n)]);
    const { loans, transactionHash } = await waitTxInBlock();

    expect(transactionHash).toBe(TX_HASH);
    expect(loans.map(({ loanId }) => loanId)).toEqual([11n, 12n]);
    expect(loans.map(({ loan }) => loan.id)).toEqual([
      `${MSL_ADDRESS.toLowerCase()}.11`,
      `${MSL_ADDRESS.toLowerCase()}.12`,
    ]);
    expect(loans.map(({ loan }) => loan.contractAddress)).toEqual([MSL_ADDRESS, MSL_ADDRESS]);
    expect(loans.map(({ offerIds }) => offerIds)).toEqual([
      [`${MSL_ADDRESS.toLowerCase()}.${LENDER}.5`],
      [`${MSL_ADDRESS.toLowerCase()}.${LENDER}.6`],
    ]);
  });

  test('throws when fewer loans are emitted than were sent', async () => {
    const { msl } = mslEmitting([loanEmittedEvent(11n, 1n)]);

    const { waitTxInBlock } = await msl.emitLoans([emitArgsFor(1n, 5n), emitArgsFor(2n, 6n)]);

    await expect(waitTxInBlock()).rejects.toThrow('Loans not emitted');
  });

  test('throws when a loan has no LoanEmitted event for its collateral', async () => {
    const { msl } = mslEmitting([loanEmittedEvent(11n, 1n), loanEmittedEvent(13n, 3n)]);

    const { waitTxInBlock } = await msl.emitLoans([emitArgsFor(1n, 5n), emitArgsFor(2n, 6n)]);

    await expect(waitTxInBlock()).rejects.toThrow(`No LoanEmitted event for ${COLLECTION} #2`);
  });
});

describe('revokeDelegationsAndEmitLoan', () => {
  const SHADOW_RIGHTS = '0x000000000000000000000000000000000000000000000000000000ffffffffff';
  const EXPIRING_SHADOW_RIGHTS =
    '0x000000000000000000000000000000000000000000000000000000006ad8ff0d';
  const PREVIOUS_BORROWER = '0x0000000000000000000000000000000000000005';
  const PREVIOUS_DELEGATE = '0x0000000000000000000000000000000000000006';

  const decodedCalls = (multicall: ReturnType<typeof mslEmitting>['multicall']) => {
    const [[calls]] = multicall.mock.calls[0] as unknown as [[Hex[]]];
    return calls
      .map((call) => decodeFunctionData({ abi: multiSourceLoanAbi, data: call }))
      .map(({ functionName, args }) =>
        functionName === 'revokeDelegate' ? [functionName, ...args] : [functionName],
      );
  };

  test('revokes each delegation with every rights value it lists', async () => {
    const { msl, multicall } = mslEmitting([]);

    await msl.revokeDelegationsAndEmitLoan({
      delegations: [
        { to: PREVIOUS_BORROWER, rights: [zeroHash, SHADOW_RIGHTS] },
        { to: PREVIOUS_DELEGATE, rights: [EXPIRING_SHADOW_RIGHTS] },
      ],
      emit: emitArgsFor(1n, 5n),
    });

    expect(decodedCalls(multicall)).toEqual([
      ['revokeDelegate', PREVIOUS_BORROWER, COLLECTION, 1n, zeroHash],
      ['revokeDelegate', PREVIOUS_BORROWER, COLLECTION, 1n, SHADOW_RIGHTS],
      ['revokeDelegate', PREVIOUS_DELEGATE, COLLECTION, 1n, EXPIRING_SHADOW_RIGHTS],
      ['emitLoan'],
    ]);
  });

  test('revokes a bare address with the full rights', async () => {
    const { msl, multicall } = mslEmitting([]);

    await msl.revokeDelegationsAndEmitLoan({
      delegations: [PREVIOUS_BORROWER],
      emit: emitArgsFor(1n, 5n),
    });

    expect(decodedCalls(multicall)).toEqual([
      ['revokeDelegate', PREVIOUS_BORROWER, COLLECTION, 1n, zeroHash],
      ['emitLoan'],
    ]);
  });

  test('throws when fewer revocations than were sent are confirmed', async () => {
    const { msl } = mslEmitting([loanEmittedEvent(11n, 1n)], [{ args: {} }]);

    const { waitTxInBlock } = await msl.revokeDelegationsAndEmitLoan({
      delegations: [{ to: PREVIOUS_BORROWER, rights: [zeroHash, SHADOW_RIGHTS] }],
      emit: emitArgsFor(1n, 5n),
    });

    await expect(waitTxInBlock()).rejects.toThrow('Revoke delegations failed');
  });
});
