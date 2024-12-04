import { Address, Hex } from 'viem';

import { Wallet } from '@/contracts';
import { MslV5 } from '@/contracts/MslV5';
import { MslV6 } from '@/contracts/MslV6';
import { purchaseBundlerAbi } from '@/generated/blockchain/v6';

import { BaseContract } from './BaseContract';

export class PurchaseBundler extends BaseContract<typeof purchaseBundlerAbi> {
  msl: MslV5 | MslV6;

  constructor({
    contractAddress,
    walletClient,
    msl,
  }: {
    contractAddress: Address;
    msl: MslV5 | MslV6;
    walletClient: Wallet;
  }) {
    super({
      walletClient,
      address: contractAddress,
      abi: purchaseBundlerAbi,
    });
    this.msl = msl;
  }

  async sell({ repaymentCalldata, price }: { repaymentCalldata: Hex; price: bigint }) {
    const repaymentArgs = this.msl.decodeRepaymentCalldata(repaymentCalldata);

    const { principalAddress, nftCollateralAddress, nftCollateralTokenId } = repaymentArgs.loan;

    const txHash = await this.safeContractWrite.sell(
      [
        [repaymentCalldata],
        [principalAddress],
        [price],
        [nftCollateralAddress],
        [nftCollateralTokenId],
      ],
      [principalAddress],
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
}
