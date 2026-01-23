import { Maybe } from 'graphql/jsutils/Maybe';
import { Address, decodeAbiParameters, Hex } from 'viem';

import { Wallet } from '@/clients/contracts';
import { MslV5 } from '@/clients/contracts/MslV5';
import { MslV6 } from '@/clients/contracts/MslV6';
import { getContracts } from '@/deploys';
import { purchaseBundlerV2ABI } from '@/generated/blockchain/v7';

import { BaseContract } from './BaseContract';

export class PurchaseBundlerV2 extends BaseContract<typeof purchaseBundlerV2ABI> {
  msl: MslV5 | MslV6;

  constructor({
    address,
    walletClient,
    msl,
  }: {
    address: Address;
    msl: MslV5 | MslV6;
    walletClient: Wallet;
  }) {
    super({
      walletClient,
      address,
      abi: purchaseBundlerV2ABI,
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
      { name: 'value', type: 'uint256' },
      { name: 'maxSlippage', type: 'uint256' },
    ],
  } as const;

  static ETH_SENTINEL = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

  async buy({ emitCalldata, value }: { emitCalldata: Hex; value: bigint }) {
    const txHash = await this.safeContractWrite.buy([[emitCalldata]], { value });

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
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
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
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

    const callbackData = decodeAbiParameters(
      [PurchaseBundlerV2.EXECUTION_INFO],
      repaymentArgs.data.callbackData,
    );

    const { nftCollateralAddress, nftCollateralTokenId, principalAddress } = repaymentArgs.loan;

    if (principalAddress !== callbackData[0].purchaseCurrency && swapData === undefined) {
      throw new Error(
        'Swap data is required when paying with different currency than loan currency.',
      );
    }

    const payingWithErc20 = callbackData[0].purchaseCurrency !== PurchaseBundlerV2.ETH_SENTINEL;

    const txHash = await this.safeContractWrite.executeSell(
      [
        payingWithErc20 ? [callbackData[0].purchaseCurrency] : [],
        payingWithErc20 ? [price] : [],
        [nftCollateralAddress],
        [nftCollateralTokenId],
        callbackData[0].reservoirExecutionInfo.module,
        [repaymentCalldata],
        swapData ? [swapData] : [],
      ],
      { value: payingWithErc20 ? 0n : callbackData[0].reservoirExecutionInfo.value },
    );

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('SellAndRepayExecuted', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Sell and Repay not executed');
        }
        return receipt;
      },
    };
  }

  async executeSellWithLoan({
    repaymentCalldata,
    emitCalldata,
    price,
    swapData,
  }: {
    repaymentCalldata: Hex;
    emitCalldata: Hex;
    price: bigint;
    swapData: Maybe<Hex>;
  }) {
    const { Aave } = getContracts(this.wallet.chain);
    const repaymentArgs = this.msl.decodeRepaymentCalldata(repaymentCalldata);

    const callbackData = decodeAbiParameters(
      [PurchaseBundlerV2.EXECUTION_INFO],
      repaymentArgs.data.callbackData,
    );

    const { principalAddress, nftCollateralAddress, nftCollateralTokenId } = repaymentArgs.loan;

    const txHash = await this.safeContractWrite.executeSellWithLoan([
      {
        borrowArgs: {
          pool: Aave,
          assets: [principalAddress],
          amounts: [price],
        },
        executeSellArgs: {
          currencies: [principalAddress],
          currencyAmounts: [price],
          collections: [nftCollateralAddress],
          tokenIds: [nftCollateralTokenId],
          marketPlace: callbackData[0].reservoirExecutionInfo.module,
          executionData: [repaymentCalldata],
          swapData: swapData ? [swapData] : [],
        },
        loanExecutionData: [emitCalldata],
      },
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('SellAndRepayExecuted', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Sell with Loan not executed');
        }
        return receipt;
      },
    };
  }
}
