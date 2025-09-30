import { Address, decodeAbiParameters, Hex } from 'viem';

import { Wallet } from '@/clients/contracts';
import { MslV5 } from '@/clients/contracts/MslV5';
import { MslV6 } from '@/clients/contracts/MslV6';
import { getContracts } from '@/deploys';
import { purchaseBundlerAbi } from '@/generated/blockchain/v6';

import { BaseContract } from './BaseContract';

export class PurchaseBundler extends BaseContract<typeof purchaseBundlerAbi> {
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
      abi: purchaseBundlerAbi,
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
    ],
  } as const;

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

  async sell({ repaymentCalldata }: { repaymentCalldata: Hex }) {
    const txHash = await this.safeContractWrite.sell([[repaymentCalldata]]);

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

  async executeSell({ repaymentCalldata, price }: { repaymentCalldata: Hex; price: bigint }) {
    const repaymentArgs = this.msl.decodeRepaymentCalldata(repaymentCalldata);

    const callbackData = decodeAbiParameters(
      [PurchaseBundler.EXECUTION_INFO],
      repaymentArgs.data.callbackData,
    );

    const { principalAddress, nftCollateralAddress, nftCollateralTokenId } = repaymentArgs.loan;

    const txHash = await this.safeContractWrite.executeSell([
      [principalAddress],
      [price],
      [nftCollateralAddress],
      [nftCollateralTokenId],
      callbackData[0].reservoirExecutionInfo.module,
      [repaymentCalldata],
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

  async executeSellWithLoan({
    repaymentCalldata,
    emitCalldata,
    price,
  }: {
    repaymentCalldata: Hex;
    emitCalldata: Hex;
    price: bigint;
  }) {
    const { Aave } = getContracts(this.wallet.chain);
    const repaymentArgs = this.msl.decodeRepaymentCalldata(repaymentCalldata);

    const callbackData = decodeAbiParameters(
      [PurchaseBundler.EXECUTION_INFO],
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
