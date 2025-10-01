import { Address, encodeAbiParameters } from 'viem';

import { LoanV4 } from '@/blockchain';
import { Wallet } from '@/clients/contracts';
import { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV4 } from '@/generated/blockchain/v4';

import { AllV6 } from './AllV6';
import { BaseContract } from './BaseContract';

export class AllV4 extends BaseContract<typeof auctionLoanLiquidatorABIV4> {
  static LOAN_SETTLEMENT_ENCODE_TYPES = [
    {
      name: '',
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
          name: 'source',
          type: 'tuple[]',
          components: [
            { name: 'loanId', internalType: 'uint256', type: 'uint256' },
            { name: 'lender', internalType: 'address', type: 'address' },
            {
              name: 'principalAmount',
              internalType: 'uint256',
              type: 'uint256',
            },
            {
              name: 'accruedInterest',
              internalType: 'uint256',
              type: 'uint256',
            },
            { name: 'startTime', internalType: 'uint256', type: 'uint256' },
            { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          ],
        },
      ],
    },
  ];

  constructor({ walletClient, address }: { walletClient: Wallet; address: Address }) {
    super({
      walletClient,
      address,
      abi: auctionLoanLiquidatorABIV4,
    });
  }

  async placeBid({
    collectionContractAddress,
    tokenId,
    bid,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    bid: bigint;
  }) {
    const txHash = await this.safeContractWrite.placeBid([collectionContractAddress, tokenId, bid]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('BidPlaced', receipt.logs);
        if (events.length === 0) throw new Error('Bid not placed');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  getRemainingLockupSeconds() {
    return 0;
  }

  async settleAuctionWithBuyout(): ReturnType<AllV6['settleAuctionWithBuyout']> {
    throw new Error('Not implemented for V1');
  }

  async settleAuction({ loan }: { loan: LoanV4 }) {
    const loanStruct = {
      ...loan,
      source: loan.source.map((source) => [
        Number(source.loanId),
        source.lender,
        source.principalAmount,
        source.accruedInterest,
        source.startTime,
        source.aprBps,
      ]),
    };

    const txHash = await this.safeContractWrite.settleAuction([
      loan.nftCollateralAddress,
      loan.nftCollateralTokenId,
      encodeAbiParameters(AllV4.LOAN_SETTLEMENT_ENCODE_TYPES, [loanStruct]),
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('AuctionSettled', receipt.logs);
        if (events.length === 0) throw new Error('Auction not settled');
        return { ...events[0].args, ...receipt };
      },
    };
  }
}
