import { Address } from 'viem';

import { Wallet } from '@/contracts';
import { UserVaultV6 } from '@/contracts/UserVaultV6';
import { getContracts } from '@/deploys';
import { userVaultABI as userVaultABIV5 } from '@/generated/blockchain/v5';
import { BurnAndWithdrawArgs, CreateVaultArgs, DepositERC721sArgs } from '@/gondi';

import { BaseContract } from './BaseContract';

export class UserVaultV5 extends BaseContract<typeof userVaultABIV5> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { UserVault } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: UserVault.v5,
      abi: userVaultABIV5,
    });
  }

  async burnAndWithdraw({
    vaultId,
    collections,
    tokenIds,
    tokens = [],
  }: BurnAndWithdrawArgs): ReturnType<UserVaultV6['burnAndWithdraw']> {
    if (collections.length != tokenIds.length) {
      throw new Error('collections and tokenIds must have the same length');
    }
    const txHash = await this.safeContractWrite.burnAndWithdraw([
      vaultId,
      collections,
      tokenIds,
      tokens,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('ERC721Withdrawn', receipt.logs);
        if (events.length !== tokenIds.length) throw new Error('Withdrawn count mismatch');
        return {
          events: events.map((event) => event.args),
          oldEvents: [],
          ...receipt,
        };
      },
    };
  }

  async createVault(nfts: CreateVaultArgs) {
    const { id: vaultId } = await this.#mintVault();
    const receipts = [];
    const erc721Nfts = nfts.filter((nft) => nft.standard === 'ERC721');

    // Regroup all elements in the same collection in case users send tokenIds as separate elements of the array
    const groupedNfts: Record<Address, (typeof erc721Nfts)[number]> = {};
    for (const nft of erc721Nfts) {
      const { collection, tokenIds } = nft;
      if (groupedNfts[collection]) {
        groupedNfts[collection].tokenIds.push(...tokenIds);
      } else {
        groupedNfts[collection] = { ...nft, tokenIds: [...tokenIds] };
      }
    }

    for (const nft of Object.values(groupedNfts)) {
      const deposit = await this.depositERC721s({ vaultId, ...nft });
      const receipt = await deposit.waitTxInBlock();
      receipts.push(receipt);
    }

    return { vaultId, receipts };
  }

  async depositERC721s({ vaultId, collection, tokenIds }: DepositERC721sArgs) {
    const txHash = await this.safeContractWrite.depositERC721s([vaultId, collection, tokenIds]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('ERC721Deposited', receipt.logs);
        if (events.length === 0) throw new Error('Deposit not created');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async depositERC1155s() {
    throw new Error('Not implemented');
  }

  async #mintVault() {
    const txHash = await this.safeContractWrite.mint(undefined);
    const receipt = await this.bcClient.waitForTransactionReceipt({
      hash: txHash,
    });

    const events = this.parseEventLogs('Transfer', receipt.logs);
    if (events.length === 0) throw new Error('Vault not created');
    return { ...events[0].args, ...receipt };
  }
}
