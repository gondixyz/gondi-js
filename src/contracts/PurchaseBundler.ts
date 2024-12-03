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

  static SignableRepaymentData = [
    {
      name: 'data',
      type: 'tuple',
      components: [
        { name: 'loanId', type: 'uint256' },
        { name: 'callbackData', type: 'bytes' },
        { name: 'shouldDelegate', type: 'bool' },
      ],
    },
  ];

  static LoanRepaymentData = [
    {
      name: '',
      type: 'tuple',
      components: [
        PurchaseBundler.SignableRepaymentData[0],
        {
          name: 'loan',
          type: 'tuple',
          components: [
            { name: 'borrower', type: 'address' },
            { name: 'nftCollateralTokenId', type: 'uint256' },
            { name: 'nftCollateralAddress', type: 'address' },
            { name: 'principalAddress', type: 'address' },
            { name: 'principalAmount', type: 'uint256' },
            { name: 'startTime', type: 'uint256' },
            { name: 'duration', type: 'uint256' },
            {
              name: 'tranche',
              type: 'tuple[]',
              components: [
                { name: 'loanId', type: 'uint256' },
                { name: 'floor', type: 'uint256' },
                { name: 'principalAmount', type: 'uint256' },
                { name: 'lender', type: 'address' },
                { name: 'accruedInterest', type: 'uint256' },
                { name: 'startTime', type: 'uint256' },
                { name: 'aprBps', type: 'uint256' },
              ],
            },
            { name: 'protocolFee', type: 'uint256' },
          ],
        },
        { name: 'borrowerSignature', type: 'bytes' },
      ],
    },
  ];

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
