import { Address, Hex } from 'viem';

import { Wallet } from '@/clients/contracts';
import { MslV6 } from '@/clients/contracts/MslV6';
import { getContracts } from '@/deploys';
import { flashLoanRenegotiationAbi } from '@/generated/blockchain/flashLoanRenegotiation';
import { EmitLoanArgs } from '@/gondi';
import { SECONDS_IN_HOUR } from '@/utils/dates';
import { getTotalOwed } from '@/utils/loan';

import { BaseContract } from './BaseContract';

export class FlashLoanRenegotiation extends BaseContract<typeof flashLoanRenegotiationAbi> {
  msl: MslV6;

  constructor({
    address,
    walletClient,
    msl,
  }: {
    address: Address;
    msl: MslV6;
    walletClient: Wallet;
  }) {
    super({
      walletClient,
      address,
      abi: flashLoanRenegotiationAbi,
    });
    this.msl = msl;
  }
  async smartRenegotiation({
    targetContract,
    repaymentCalldata,
    executionData,
  }: {
    targetContract: Address;
    repaymentCalldata: Hex;
    executionData: EmitLoanArgs;
  }) {
    const { Aave } = getContracts(this.wallet.chain);

    const emitLoanArgs = this.msl.mapEmitLoanToMslEmitLoanArgs(executionData);
    emitLoanArgs.borrowerOfferSignature = await this.msl.signExecutionData({
      structToSign: emitLoanArgs.executionData,
    });
    const repaymentArgs = this.msl.decodeRepaymentCalldata(repaymentCalldata);

    const totalOwed = getTotalOwed(repaymentArgs.loan, BigInt(SECONDS_IN_HOUR));

    const borrowArgs = {
      pool: Aave,
      assets: [repaymentArgs.loan.principalAddress],
      amounts: [totalOwed],
    };

    const txHash = await this.safeContractWrite.smartRenegotiation([
      {
        targetContract,
        callData: repaymentCalldata,
        emitLoanArgs: {
          loanAddress: this.msl.address,
          loanExecutionData: emitLoanArgs,
        },
        borrowArgs,
      },
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('SmartRenegotiation', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Smart Renegotiation not executed');
        }
        return receipt;
      },
    };
  }
}
