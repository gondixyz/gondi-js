import { Maybe } from 'graphql/jsutils/Maybe';
import { Address, decodeAbiParameters, Hex, PublicClient, zeroAddress } from 'viem';

import { isNativeCurrency } from '@/blockchain';
import { Wallet } from '@/clients/contracts';
import { MslV5 } from '@/clients/contracts/MslV5';
import { MslV6 } from '@/clients/contracts/MslV6';
import { getContracts, getCurrencies } from '@/deploys';
import { purchaseBundlerV2ABI } from '@/generated/blockchain/v7';
import { waitForSucceededReceipt } from '@/utils/blockchain';
import { areSameAddress } from '@/utils/string';

import { BaseContract } from './BaseContract';

export class PurchaseBundlerV2 extends BaseContract<typeof purchaseBundlerV2ABI> {
  msl: MslV5 | MslV6;
  static AAVE_PREMIUM_BPS = 5n;

  constructor({
    address,
    walletClient,
    msl,
    publicClient,
  }: {
    address: Address;
    msl: MslV5 | MslV6;
    walletClient: Wallet;
    publicClient?: PublicClient;
  }) {
    super({
      walletClient,
      address,
      abi: purchaseBundlerV2ABI,
      publicClient,
    });
    this.msl = msl;
  }

  static EXECUTION_INFO = {
    name: 'executionInfo',
    type: 'tuple',
    components: [
      {
        name: 'reservoirExecutionInfo',
        type: 'tuple',
        components: [
          { name: 'module', type: 'address' },
          { name: 'data', type: 'bytes' },
          { name: 'value', type: 'uint256' },
        ],
      },
      { name: 'contractMustBeOwner', type: 'bool' },
      // Added fields in V2
      { name: 'purchaseCurrency', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'swapData', type: 'bytes' },
      { name: 'swapValue', type: 'uint256' },
      { name: 'maxSlippage', type: 'uint256' },
    ],
  } as const;

  static ETH_SENTINEL = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

  /** Decodes the `executionInfo` callback carried by an execution or a seller repayment. */
  static decodePurchaseCallback(data: Hex) {
    return decodeAbiParameters([PurchaseBundlerV2.EXECUTION_INFO], data)[0];
  }

  /** The callback's purchase currency, with every native spelling (including the ETH sentinel) as `zeroAddress`. */
  static callbackPurchaseCurrency(
    callback: ReturnType<typeof PurchaseBundlerV2.decodePurchaseCallback>,
  ): Address {
    return isNativeCurrency(callback.purchaseCurrency) ||
      areSameAddress(callback.purchaseCurrency, PurchaseBundlerV2.ETH_SENTINEL)
      ? zeroAddress
      : callback.purchaseCurrency;
  }

  async buy({ emitCalldata, value }: { emitCalldata: Hex; value: bigint }) {
    const txHash = await this.safeContractWrite.buy([[emitCalldata]], { value });

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('BNPLLoansStarted', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Buy not executed');
        }
        return receipt;
      },
    };
  }

  async sell({ repaymentCalldata, swapData }: { repaymentCalldata: Hex; swapData?: Hex }) {
    const txHash = await this.safeContractWrite.sell([
      [repaymentCalldata],
      swapData ? [swapData] : [],
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('SellAndRepayExecuted', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Sell and Repay not executed');
        }
        return receipt;
      },
    };
  }

  async executeSell({
    repaymentCalldata,
    price,
    swapData,
  }: {
    repaymentCalldata: Hex;
    price: bigint;
    swapData: Maybe<Hex>;
  }) {
    const repaymentArgs = this.msl.decodeRepaymentCalldata(repaymentCalldata);

    const callback = PurchaseBundlerV2.decodePurchaseCallback(repaymentArgs.data.callbackData);

    const { nftCollateralAddress, nftCollateralTokenId, principalAddress } = repaymentArgs.loan;

    if (!areSameAddress(principalAddress, callback.purchaseCurrency) && swapData === undefined) {
      throw new Error(
        'Swap data is required when paying with different currency than loan currency.',
      );
    }

    const purchaseCurrency = PurchaseBundlerV2.callbackPurchaseCurrency(callback);
    const native = isNativeCurrency(purchaseCurrency);

    const txHash = await this.safeContractWrite.executeSell(
      [
        native ? [] : [purchaseCurrency],
        native ? [] : [price],
        [nftCollateralAddress],
        [nftCollateralTokenId],
        callback.reservoirExecutionInfo.module,
        [repaymentCalldata],
        swapData ? [swapData] : [],
      ],
      { value: native ? callback.reservoirExecutionInfo.value : undefined },
    );

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('SellAndRepayExecuted', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Sell and Repay not executed');
        }
        return receipt;
      },
    };
  }

  /**
   * Buys a listed loan's NFT with a new loan through an Aave flash loan of `price - initialPayment`
   * in the purchase currency (WETH for ETH). The buyer funds `initialPayment` as `value` for ETH; for
   * an ERC20 the bundler collects it from the buyer when the sale runs. The flash repayment and its
   * premium are pulled from the buyer, who has just received the new loan's principal.
   */
  async executeSellWithLoan({
    repaymentCalldata,
    emitCalldata,
    price,
    initialPayment,
    executeSellSwapData,
    repayFlashLoanSwapParams,
  }: {
    repaymentCalldata: Hex;
    emitCalldata: Hex;
    price: bigint;
    initialPayment: bigint;
    executeSellSwapData: Maybe<Hex>;
    repayFlashLoanSwapParams: Maybe<{
      inputCurrency: Address;
      inputAmount: bigint;
      swapData: Hex;
    }>;
  }) {
    const { Aave } = getContracts(this.wallet.chain);
    const repaymentArgs = this.msl.decodeRepaymentCalldata(repaymentCalldata);

    const callback = PurchaseBundlerV2.decodePurchaseCallback(repaymentArgs.data.callbackData);

    const { nftCollateralAddress, nftCollateralTokenId } = repaymentArgs.loan;
    const purchaseCurrency = PurchaseBundlerV2.callbackPurchaseCurrency(callback);
    const native = isNativeCurrency(purchaseCurrency);

    const txHash = await this.safeContractWrite.executeSellWithLoan(
      [
        {
          borrowArgs: {
            pool: Aave,
            assets: native ? [getCurrencies(this.wallet.chain).WETH_ADDRESS] : [purchaseCurrency],
            amounts: [price - initialPayment],
          },
          executeSellArgs: {
            currencies: native ? [] : [purchaseCurrency],
            currencyAmounts: native ? [] : [price],
            collections: [nftCollateralAddress],
            tokenIds: [nftCollateralTokenId],
            marketPlace: callback.reservoirExecutionInfo.module,
            executionData: [repaymentCalldata],
            swapData: executeSellSwapData ? [executeSellSwapData] : [],
          },
          loanExecutionData: [emitCalldata],
          swapCurrencies: repayFlashLoanSwapParams ? [repayFlashLoanSwapParams.inputCurrency] : [],
          swapAmounts: repayFlashLoanSwapParams ? [repayFlashLoanSwapParams.inputAmount] : [],
          swapData: repayFlashLoanSwapParams ? [repayFlashLoanSwapParams.swapData] : [],
          unwrap: native,
        },
      ],
      { value: native ? initialPayment : undefined },
    );

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('SellAndRepayExecuted', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Sell with Loan not executed');
        }
        return receipt;
      },
    };
  }
}
