import { Address } from 'viem';

import { Wallet } from '@/clients/contracts';
import { UserVaultV6 } from '@/clients/contracts/UserVaultV6';
import { getContracts } from '@/deploys';
import { userVaultABI as userVaultABIV5 } from '@/generated/blockchain/v5';
import {
  BurnAndWithdrawArgs,
  CreateVaultCurrencies,
  CreateVaultNfts,
  DepositERC721sArgs,
} from '@/gondi';

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

  async createVault(nfts: CreateVaultNfts, currencies: CreateVaultCurrencies) {
    const { id: vaultId } = await this.#mintVault();
    const receipts = [];
    if (nfts.length !== nfts.length || currencies.length > 0) {
      throw new Error('Unsupported standars for UserVault');
    }

    // Regroup all elements in the same collection in case users send tokenIds as separate elements of the array
    const groupedNfts: Record<Address, (typeof nfts)[number]> = {};
    for (const nft of nfts) {
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

  async depositERC1155s(): ReturnType<UserVaultV6['depositERC1155s']> {
    throw new Error('Not implemented');
  }

  async depositERC20(): ReturnType<UserVaultV6['depositERC20']> {
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
