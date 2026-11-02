import { describe, expect, mock, test } from 'bun:test';
import { Address, createWalletClient, custom, encodeAbiParameters, Hex, zeroAddress } from 'viem';
import { mainnet } from 'viem/chains';

import { MslV6 } from '@/clients/contracts/MslV6';
import { PurchaseBundlerV2 } from '@/clients/contracts/PurchaseBundlerV2';
import { getContracts, getCurrencies } from '@/deploys';

const { USDC_ADDRESS, WETH_ADDRESS } = getCurrencies(mainnet);
const { Aave } = getContracts(mainnet);
const collateral = '0x0000000000000000000000000000000000009999';
const marketplace = '0x0000000000000000000000000000000000008888';
const repaymentCalldata = '0x1234';
const emitCalldata = '0x5678';
const listingValue = 7n;
const price = 100n;
const initialPayment = 30n;

/** Encodes a seller callback for a listing paid in `purchaseCurrency`. */
const sellerCallback = (purchaseCurrency: Address) =>
  encodeAbiParameters(
    [PurchaseBundlerV2.EXECUTION_INFO],
    [
      {
        reservoirExecutionInfo: { module: marketplace, data: '0x', value: listingValue },
        contractMustBeOwner: false,
        purchaseCurrency,
        amount: price,
        swapData: '0x',
        swapValue: 0n,
        maxSlippage: 0n,
      },
    ],
  );

/** A bundler whose `msl` decodes to the given callback and whose writes are recorded. */
const bundlerFor = (purchaseCurrency: Address, principalAddress: Address = USDC_ADDRESS) => {
  const msl = {
    decodeRepaymentCalldata: () => ({
      data: { callbackData: sellerCallback(purchaseCurrency) },
      loan: { nftCollateralAddress: collateral, nftCollateralTokenId: 1n, principalAddress },
    }),
  } as unknown as MslV6;
  const bundler = new PurchaseBundlerV2({
    address: '0x000000000000000000000000000000000000cccc',
    msl,
    walletClient: createWalletClient({
      account: zeroAddress,
      chain: mainnet,
      transport: custom({ request: async () => null }),
    }),
  });
  const executeSell = mock(async (_args: unknown, _options: unknown) => '0xtx' as Hex);
  const executeSellWithLoan = mock(async (_args: unknown, _options: unknown) => '0xtx' as Hex);
  bundler.safeContractWrite = {
    executeSell,
    executeSellWithLoan,
  } as unknown as typeof bundler.safeContractWrite;
  return { bundler, executeSell, executeSellWithLoan };
};

describe('PurchaseBundlerV2.executeSell', () => {
  test('sends the listing value and no currency for an ETH listing', async () => {
    const { bundler, executeSell } = bundlerFor(
      PurchaseBundlerV2.ETH_SENTINEL as Address,
      WETH_ADDRESS,
    );
    await bundler.executeSell({ repaymentCalldata, price, swapData: '0xabcd' });
    expect(executeSell).toHaveBeenCalledWith(
      [[], [], [collateral], [1n], marketplace, [repaymentCalldata], ['0xabcd']],
      { value: listingValue },
    );
  });

  test('sends the currency and price, with no value, for an ERC20 listing', async () => {
    const { bundler, executeSell } = bundlerFor(USDC_ADDRESS);
    await bundler.executeSell({ repaymentCalldata, price, swapData: null });
    expect(executeSell).toHaveBeenCalledWith(
      [[USDC_ADDRESS], [price], [collateral], [1n], marketplace, [repaymentCalldata], []],
      { value: undefined },
    );
  });

  test('requires swap data when the listing is not in the loan currency', async () => {
    const { bundler } = bundlerFor(USDC_ADDRESS, WETH_ADDRESS);
    await expect(
      bundler.executeSell({ repaymentCalldata, price, swapData: undefined }),
    ).rejects.toThrow('Swap data is required');
  });
});

describe('PurchaseBundlerV2.executeSellWithLoan', () => {
  const sellWithLoan = { repaymentCalldata, emitCalldata, price, initialPayment };

  test('borrows WETH net of the initial payment and unwraps it for an ETH listing', async () => {
    const { bundler, executeSellWithLoan } = bundlerFor(PurchaseBundlerV2.ETH_SENTINEL as Address);
    await bundler.executeSellWithLoan({
      ...sellWithLoan,
      executeSellSwapData: null,
      repayFlashLoanSwapParams: null,
    });
    const [[args], options] = executeSellWithLoan.mock.calls[0] as [[unknown], unknown];
    expect(args).toMatchObject({
      borrowArgs: { pool: Aave, assets: [WETH_ADDRESS], amounts: [price - initialPayment] },
      executeSellArgs: { currencies: [], currencyAmounts: [], marketPlace: marketplace },
      unwrap: true,
    });
    expect(options).toEqual({ value: initialPayment });
  });

  test('borrows the listing currency at full price for an ERC20 listing', async () => {
    const { bundler, executeSellWithLoan } = bundlerFor(USDC_ADDRESS);
    await bundler.executeSellWithLoan({
      ...sellWithLoan,
      executeSellSwapData: null,
      repayFlashLoanSwapParams: null,
    });
    const [[args], options] = executeSellWithLoan.mock.calls[0] as [[unknown], unknown];
    expect(args).toMatchObject({
      borrowArgs: { pool: Aave, assets: [USDC_ADDRESS], amounts: [price] },
      executeSellArgs: {
        currencies: [USDC_ADDRESS],
        currencyAmounts: [price],
        marketPlace: marketplace,
      },
      unwrap: false,
    });
    expect(options).toEqual({ value: undefined });
  });
});
