import { Address, encodeFunctionData, Hash } from 'viem';

import { LoanV5, OfferV5 } from '@/blockchain';
import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { leverageABI, multiSourceLoanABI } from '@/generated/blockchain/v5';
import { CONTRACT_DOMAIN_NAME } from '@/utils/string';

import { BaseContract } from './BaseContract';

export class LeverageV5 extends BaseContract<typeof leverageABI> {
  mslAddress: Address;

  constructor({ walletClient, mslAddress }: { walletClient: Wallet; mslAddress: Address }) {
    const { LeverageAddress } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: LeverageAddress,
      abi: leverageABI,
    });

    this.mslAddress = mslAddress;
  }

  private getDomain() {
    // TODO: Get this from MSL v5
    return {
      name: CONTRACT_DOMAIN_NAME,
      version: '2',
      chainId: this.wallet.chain.id,
      verifyingContract: this.mslAddress,
    };
  }

  async signExecutionData(executionData: {
    offer: OfferV5 & { signature: Hash };
    tokenId: bigint;
    amount: bigint;
    expirationTime: bigint;
    callbackData: Hash;
  }) {
    return this.wallet.signTypedData({
      domain: this.getDomain(),
      primaryType: 'ExecutionData',
      types: {
        ExecutionData: [
          { name: 'offer', type: 'LoanOffer' },
          { name: 'tokenId', type: 'uint256' },
          { name: 'amount', type: 'uint256' },
          { name: 'expirationTime', type: 'uint256' },
          { name: 'callbackData', type: 'bytes' },
        ],
        LoanOffer: [
          { name: 'offerId', type: 'uint256' },
          { name: 'lender', type: 'address' },
          { name: 'fee', type: 'uint256' },
          { name: 'borrower', type: 'address' },
          { name: 'capacity', type: 'uint256' },
          { name: 'nftCollateralAddress', type: 'address' },
          { name: 'nftCollateralTokenId', type: 'uint256' },
          { name: 'principalAddress', type: 'address' },
          { name: 'principalAmount', type: 'uint256' },
          { name: 'aprBps', type: 'uint256' },
          { name: 'expirationTime', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
          { name: 'validators', type: 'OfferValidator[]' },
        ],
        OfferValidator: [
          { name: 'validator', type: 'address' },
          { name: 'arguments', type: 'bytes' },
        ],
      } as const,
      message: executionData,
    });
  }

  async signRepaymentData(data: { loanId: bigint; callbackData: Hash; shouldDelegate: boolean }) {
    return this.wallet.signTypedData({
      domain: this.getDomain(),
      primaryType: 'SignableRepaymentData',
      types: {
        SignableRepaymentData: [
          { name: 'loanId', type: 'uint256' },
          { name: 'callbackData', type: 'bytes' },
          { name: 'shouldDelegate', type: 'bool' },
        ],
      } as const,
      message: data,
    });
  }

  async buy({
    leverageBuyData,
    ethToSend,
  }: {
    leverageBuyData: {
      offer: OfferV5 & { signature: Hash };
      expirationTime: bigint;
      amount: bigint;
      nft: {
        tokenId: bigint;
      };
      callbackData: Hash;
    }[];
    ethToSend: bigint;
  }) {
    const txHash = await this.safeContractWrite.buy(
      [
        await Promise.all(
          leverageBuyData.map(async (data) => {
            const executionData = {
              offer: data.offer,
              tokenId: data.nft.tokenId,
              amount: data.amount,
              expirationTime: data.expirationTime,
              callbackData: data.callbackData,
            };

            return encodeFunctionData({
              abi: multiSourceLoanABI,
              functionName: 'emitLoan',
              args: [
                {
                  executionData,
                  lender: data.offer.lender,
                  borrower: this.wallet.account.address,
                  lenderOfferSignature: data.offer.signature,
                  borrowerOfferSignature: await this.signExecutionData(executionData),
                },
              ],
            });
          }),
        ),
      ],
      {
        value: ethToSend,
      },
    );

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('BNPLLoansStarted', receipt.logs);
        if (events.length === 0) throw new Error('BNPL Loans not started');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async sell({
    loan,
    callbackData,
    shouldDelegate,
    loanId,
  }: {
    loan: LoanV5;
    callbackData: Hash;
    shouldDelegate: boolean;
    loanId: bigint;
  }) {
    const repaymentData = {
      loanId,
      callbackData,
      shouldDelegate,
    };

    const txHash = await this.safeContractWrite.sell([
      [
        encodeFunctionData({
          abi: multiSourceLoanABI,
          functionName: 'repayLoan',
          args: [
            {
              data: repaymentData,
              loan,
              borrowerSignature: await this.signRepaymentData(repaymentData),
            },
          ],
        }),
      ],
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('SellAndRepayExecuted', receipt.logs);
        if (events.length === 0) throw new Error('Sell and repay not executed');
        return { ...events[0].args, ...receipt };
      },
    };
  }
}
