import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address } from 'viem';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Gondi } = await import('@/gondi');

const MAKER = '0x0000000000000000000000000000000000000001' as Address;
const SEAPORT = '0x0000000000000000000000000000000000000002' as Address;
const OTHER_MARKETPLACE = '0x0000000000000000000000000000000000000003' as Address;

const cancelTradeOrders = mock();
const getCancelOrdersCalldata = mock();
const sendTransactionData = mock();
const GenericContract = mock(() => ({ sendTransactionData }));

const gondi = Object.assign(Object.create(Gondi.prototype) as Gondi, {
  wallet: { account: { address: MAKER } },
  apiClient: { cancelTradeOrders, getCancelOrdersCalldata },
  contracts: { GenericContract },
});

const SEAPORT_CANCEL = { calldata: '0xcancel', marketPlaceAddress: SEAPORT };

const cancelledOffChain = (
  cancelledIds: number[],
  cancelOrdersCalldata: { calldata: string; marketPlaceAddress: Address }[],
) => ({
  cancelTradeOrders: {
    cancelledOrders: cancelledIds.map((id) => ({ id: String(id) })),
    cancelOrdersCalldata,
  },
});

beforeEach(() => {
  for (const fn of [cancelTradeOrders, getCancelOrdersCalldata, sendTransactionData]) {
    fn.mockReset();
  }
  GenericContract.mockClear();
  sendTransactionData.mockResolvedValue({ txHash: '0xtx', waitTxInBlock: mock() });
  getCancelOrdersCalldata.mockResolvedValue({ cancelOrdersCalldata: [SEAPORT_CANCEL] });
});

describe('cancelOrders', () => {
  test('cancels orders that cancel off-chain with one API call and no transaction', async () => {
    cancelTradeOrders.mockResolvedValue(cancelledOffChain([1, 2], []));

    const result = await gondi.cancelOrders({ orderIds: [1, 2] });

    expect(cancelTradeOrders).toHaveBeenCalledWith({ orderIds: [1, 2] });
    expect(sendTransactionData).not.toHaveBeenCalled();
    expect(result).toEqual({ offChainOrderIds: [1, 2], transactions: [] });
  });

  test('sends the cancel calldata the API returns, with no second API call', async () => {
    cancelTradeOrders.mockResolvedValue(cancelledOffChain([1], [SEAPORT_CANCEL]));

    const result = await gondi.cancelOrders({ orderIds: [1, 2] });

    expect(cancelTradeOrders).toHaveBeenCalledWith({ orderIds: [1, 2] });
    expect(getCancelOrdersCalldata).not.toHaveBeenCalled();
    expect(GenericContract).toHaveBeenCalledWith(SEAPORT);
    expect(sendTransactionData).toHaveBeenCalledWith('0xcancel');
    expect(result.offChainOrderIds).toEqual([1]);
    expect(result.transactions).toHaveLength(1);
  });

  test('sends one transaction per marketplace', async () => {
    cancelTradeOrders.mockResolvedValue(
      cancelledOffChain(
        [],
        [
          { calldata: '0xseaport', marketPlaceAddress: SEAPORT },
          { calldata: '0xother', marketPlaceAddress: OTHER_MARKETPLACE },
        ],
      ),
    );

    const result = await gondi.cancelOrders({ orderIds: [1, 2] });

    expect(sendTransactionData.mock.calls).toEqual([['0xseaport'], ['0xother']]);
    expect(result.transactions).toHaveLength(2);
  });

  test('cancels every order on-chain when forced, without the off-chain cancel', async () => {
    const result = await gondi.cancelOrders({ orderIds: [1, 2], onChain: true });

    expect(cancelTradeOrders).not.toHaveBeenCalled();
    expect(getCancelOrdersCalldata).toHaveBeenCalledWith({ maker: MAKER, orderIds: [1, 2] });
    expect(sendTransactionData).toHaveBeenCalledWith('0xcancel');
    expect(result.offChainOrderIds).toEqual([]);
  });

  test('sends no transaction when the off-chain cancel fails', async () => {
    cancelTradeOrders.mockRejectedValue(new Error('Not found'));

    await expect(gondi.cancelOrders({ orderIds: [1, 2] })).rejects.toThrow('Not found');
    expect(sendTransactionData).not.toHaveBeenCalled();
  });

  test.each([[[]], [Array.from({ length: 51 }, (_, index) => index + 1)]])(
    'rejects an empty or oversized selection',
    async (orderIds) => {
      await expect(gondi.cancelOrders({ orderIds })).rejects.toThrow('Between 1 and 50 orders');
    },
  );
});
