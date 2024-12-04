import { Hex } from 'viem';

import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { purchaseBundlerAbi } from '@/generated/blockchain/v6';

import { BaseContract } from './BaseContract';

export class PurchaseBundler extends BaseContract<typeof purchaseBundlerAbi> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { PurchaseBundler } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: PurchaseBundler,
      abi: purchaseBundlerAbi,
    });
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
}
