import { describe, expect, mock, test } from 'bun:test';
import {
  Abi,
  createWalletClient,
  custom,
  encodeAbiParameters,
  encodeFunctionData,
  Hex,
  parseAbi,
  zeroAddress,
} from 'viem';
import { mainnet } from 'viem/chains';

import { BaseContract } from '@/clients/contracts/BaseContract';
import { seaportABI } from '@/generated/blockchain/seaport';

import { matchAdvancedOrdersCalldata } from './fixtures/matchAdvancedOrders';

const abi = parseAbi(['function transfer(address to, uint256 amount) returns (bool)']);
const CONTRACT = '0x0000000000000000000000000000000000000005';
const TAG = '0xe8feb17d';
const TX_HASH = '0x' + '1'.repeat(64);

const transferCalldata = encodeFunctionData({
  abi,
  functionName: 'transfer',
  args: [zeroAddress, 1n],
});

/**
 * A contract over stub clients: the simulation echoes its parameters back as the
 * request, the way viem does, so the write receives exactly what was simulated.
 */
const setup = (contractAbi: Abi = abi) => {
  const writeContract = mock(async () => TX_HASH);
  const sendTransaction = mock(async () => TX_HASH);
  const simulateContract = mock(async (parameters: unknown) => ({ request: parameters }));
  const contract = new BaseContract({
    walletClient: {
      chain: { id: 1 },
      account: { address: zeroAddress },
      transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
      writeContract,
      sendTransaction,
    },
    publicClient: { simulateContract },
    address: CONTRACT,
    abi: contractAbi,
  } as unknown as ConstructorParameters<typeof BaseContract<Abi>>[0]);
  return { contract, writeContract, sendTransaction, simulateContract };
};

/**
 * A contract over real viem clients and a stub JSON-RPC transport, so the bytes
 * the wallet is asked to broadcast are viem's, not the stub's.
 */
const setupOverTransport = () => {
  const requests: { method: string; params: unknown }[] = [];
  const transport = custom({
    request: async ({ method, params }: { method: string; params: unknown }) => {
      requests.push({ method, params });
      switch (method) {
        case 'eth_chainId':
          return '0x1';
        case 'eth_call':
          return encodeAbiParameters([{ type: 'bool' }], [true]);
        case 'eth_sendTransaction':
          return TX_HASH;
        default:
          throw new Error(`Unexpected request ${method}`);
      }
    },
  });
  const walletClient = createWalletClient({ account: zeroAddress, chain: mainnet, transport });
  const contract = new BaseContract({
    walletClient,
    address: CONTRACT,
    abi,
  } as unknown as ConstructorParameters<typeof BaseContract<typeof abi>>[0]);
  const dataSentBy = (method: string) =>
    (requests.find((request) => request.method === method)?.params as [{ data: Hex }])[0].data;
  return { contract, dataSentBy };
};

describe('BaseContract.sendTransactionData', () => {
  test('sends tagged calldata as a named write carrying the tag as dataSuffix', async () => {
    const { contract, writeContract } = setup();
    await contract.sendTransactionData(`${transferCalldata}${TAG.slice(2)}` as Hex, 3n);
    expect(writeContract.mock.calls[0][0]).toMatchObject({
      functionName: 'transfer',
      args: [zeroAddress, 1n],
      value: 3n,
      dataSuffix: TAG,
    });
  });

  test('sends exact calldata as a named write without a suffix', async () => {
    const { contract, writeContract } = setup();
    await contract.sendTransactionData(transferCalldata);
    expect(writeContract.mock.calls[0][0]).toMatchObject({
      functionName: 'transfer',
      dataSuffix: undefined,
    });
  });

  test('sends Seaport calldata encoded by eth_abi as a named write carrying the tag', async () => {
    const { contract, writeContract } = setup(seaportABI);
    await contract.sendTransactionData(`${matchAdvancedOrdersCalldata}${TAG.slice(2)}` as Hex);
    expect(writeContract.mock.calls[0][0]).toMatchObject({
      functionName: 'matchAdvancedOrders',
      dataSuffix: TAG,
    });
  });

  test('sends calldata with uppercase hex in its arguments as a named write', async () => {
    const { contract, writeContract } = setup(seaportABI);
    const tagged = `${matchAdvancedOrdersCalldata}${TAG.slice(2)}`;
    await contract.sendTransactionData(`${tagged.slice(0, 10)}${tagged.slice(10).toUpperCase()}`);
    expect(writeContract.mock.calls[0][0]).toMatchObject({ functionName: 'matchAdvancedOrders' });
  });

  test('broadcasts calldata that decodes but is not the canonical encoding unchanged', async () => {
    // Dirty padding above the address: viem decodes the same address, re-encoding zeroes it.
    const { contract, writeContract, sendTransaction } = setup();
    const nonCanonical =
      `${transferCalldata.slice(0, 10)}ff${transferCalldata.slice(12)}${TAG.slice(2)}` as Hex;
    await contract.sendTransactionData(nonCanonical);
    expect(writeContract).not.toHaveBeenCalled();
    expect(sendTransaction.mock.calls[0][0]).toMatchObject({ data: nonCanonical });
  });

  test('simulates and broadcasts the tagged bytes through real viem clients', async () => {
    const { contract, dataSentBy } = setupOverTransport();
    const tagged = `${transferCalldata}${TAG.slice(2)}` as Hex;
    await contract.sendTransactionData(tagged);
    expect({ call: dataSentBy('eth_call'), send: dataSentBy('eth_sendTransaction') }).toEqual({
      call: tagged,
      send: tagged,
    });
  });

  test('broadcasts calldata the ABI cannot decode unchanged', async () => {
    const { contract, writeContract, sendTransaction } = setup();
    await contract.sendTransactionData('0xdeadbeef', 2n);
    expect(writeContract).not.toHaveBeenCalled();
    expect(sendTransaction.mock.calls[0][0]).toEqual({
      data: '0xdeadbeef',
      to: CONTRACT,
      value: 2n,
    });
  });
});
