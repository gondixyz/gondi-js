import { beforeEach, describe, expect, mock, test } from 'bun:test';
import {
  AbiEvent,
  encodeAbiParameters,
  encodeEventTopics,
  getAbiItem,
  Hash,
  Log,
  zeroAddress,
} from 'viem';

import { UserVaultV6 } from '@/clients/contracts/UserVaultV6';
import { CreateVaultError } from '@/errors';
import { userVaultAbi } from '@/generated/blockchain/v6';

const CONTRACT = '0x0000000000000000000000000000000000000006';
const WALLET = `0x${'aa'.repeat(20)}` as const;
const COLLECTION = '0x52908400098527886e0f7030069857d2e4169ee7';
const COLLECTION_CHECKSUMMED = '0x52908400098527886E0F7030069857D2E4169EE7';
const CURRENCY = '0x0000000000000000000000000000000000000c02';
const VAULT_ID = 42n;
const MINT_HASH = `0x${'01'.repeat(32)}` as Hash;
const DEPOSIT_HASH = `0x${'02'.repeat(32)}` as Hash;
const CURRENCY_HASH = `0x${'03'.repeat(32)}` as Hash;

type UserVaultEventName = Extract<(typeof userVaultAbi)[number], { type: 'event' }>['name'];

/** A log the vault contract would emit for `eventName` with `args`, indexed fields as topics. */
const logOf = (eventName: UserVaultEventName, args: Record<string, unknown>) => {
  const event = getAbiItem({ abi: userVaultAbi, name: eventName }) as AbiEvent;
  const data = event.inputs.filter((input) => !input.indexed);
  return {
    address: CONTRACT,
    topics: encodeEventTopics({ abi: [event], eventName, args } as never),
    data: encodeAbiParameters(
      data,
      data.map((input) => args[input.name as string]),
    ),
  } as unknown as Log;
};

const receipts: Record<Hash, { status: 'success' | 'reverted'; logs: Log[] }> = {
  [MINT_HASH]: {
    status: 'success',
    logs: [logOf('Transfer', { from: zeroAddress, to: WALLET, id: VAULT_ID })],
  },
  [DEPOSIT_HASH]: {
    status: 'success',
    logs: [logOf('ERC721Deposited', { vaultId: VAULT_ID, collection: COLLECTION, tokenId: 1n })],
  },
  [CURRENCY_HASH]: { status: 'reverted', logs: [] },
};

const writeContract = mock(
  async ({ functionName }: { functionName: string }) =>
    ({ mint: MINT_HASH, depositERC721s: DEPOSIT_HASH, depositERC20: CURRENCY_HASH })[
      functionName
    ] as Hash,
);

const vault = new UserVaultV6({
  walletClient: {
    chain: { id: 1 },
    account: { address: WALLET },
    transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
    writeContract,
  } as unknown as ConstructorParameters<typeof UserVaultV6>[0]['walletClient'],
  publicClient: {
    simulateContract: async (parameters: unknown) => ({ request: parameters }),
    waitForTransactionReceipt: async ({ hash }: { hash: Hash }) => ({
      ...receipts[hash],
      transactionHash: hash,
    }),
  } as unknown as ConstructorParameters<typeof UserVaultV6>[0]['publicClient'],
  address: CONTRACT,
});

const erc721 = (collection: `0x${string}`, tokenId: bigint) => ({
  collection,
  tokenIds: [tokenId],
  amounts: [1n],
  standard: 'ERC721' as const,
});

const depositCalls = () =>
  writeContract.mock.calls
    .map(([call]) => call as { functionName: string; args: unknown[] })
    .filter(({ functionName }) => functionName === 'depositERC721s');

beforeEach(() => writeContract.mockClear());

describe('UserVaultV6.createVault', () => {
  test('deposits one collection written in two cases with a single call', async () => {
    const { vaultId, receipts: deposits } = await vault.createVault(
      [erc721(COLLECTION, 1n), erc721(COLLECTION_CHECKSUMMED, 2n)],
      [],
    );

    expect(vaultId).toBe(VAULT_ID);
    expect(deposits).toHaveLength(1);
    expect(depositCalls().map(({ args }) => args)).toEqual([[VAULT_ID, COLLECTION, [1n, 2n]]]);
  });

  test('throws the minted vault id and the mined deposits when a later deposit fails', async () => {
    const error = await vault
      .createVault([erc721(COLLECTION, 1n)], [{ address: CURRENCY, amount: 5n }])
      .catch((thrown: unknown) => thrown);

    expect(error).toBeInstanceOf(CreateVaultError);
    const { vaultId, receipts: deposits, cause } = error as CreateVaultError;
    expect(vaultId).toBe(VAULT_ID);
    expect(deposits).toHaveLength(1);
    expect((cause as Error).message).toBe(`Transaction reverted: ${CURRENCY_HASH}`);
  });
});
