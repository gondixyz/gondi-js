import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';
import { Address, Hash, Hex, TransactionReceipt, zeroAddress } from 'viem';

import { Wallet } from '@/clients/contracts';
import { MslV5 } from '@/clients/contracts/MslV5';
import { MslV6 } from '@/clients/contracts/MslV6';
import { aavePositionMigratorAbi } from '@/generated/blockchain/aavePositionMigrator';
import { uniswapv3PositionMigrator } from '@/generated/blockchain/uniswapv3PositionMigrator';

import { BaseContract } from '../BaseContract';

type PositionMigratorAbi = typeof aavePositionMigratorAbi | typeof uniswapv3PositionMigrator;

type SmartMigrateArgs = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<PositionMigratorAbi, 'smartMigrate'>['inputs']
>[0];

export abstract class PositionMigrator<
  TAbi extends PositionMigratorAbi,
> extends BaseContract<TAbi> {
  msl: MslV6;

  constructor({
    address,
    walletClient,
    msl,
    abi,
  }: {
    address: Address;
    msl: MslV6;
    walletClient: Wallet;
    abi: TAbi;
  }) {
    super({
      walletClient,
      address,
      abi,
    });
    this.msl = msl;
  }

  abstract signMigrationArgs(args: {
    structToSign: SmartMigrateArgs['migrationArgs'];
  }): Promise<Hex>;

  abstract smartRenegotiation(args: {
    currentBalance: bigint;
    previousMsl: MslV5 | MslV6;
    repaymentCalldata: Hex;
    emitCalldata: Hex;
  }): Promise<{
    txHash: Hash;
    waitTxInBlock: () => Promise<TransactionReceipt>;
  }>;

  protected async executeSmartRenegotiation({
    previousMsl,
    repaymentCalldata,
    emitCalldata,
    borrowArgs,
  }: {
    previousMsl: MslV5 | MslV6;
    repaymentCalldata: Hex;
    emitCalldata: Hex;
    borrowArgs: SmartMigrateArgs['migrationArgs']['borrowArgs'];
  }) {
    const contract = this.contract as unknown as BaseContract<PositionMigratorAbi>['contract'];
    const safeContractWrite = this
      .safeContractWrite as BaseContract<PositionMigratorAbi>['safeContractWrite'];
    const parseEventLogs = this
      .parseEventLogs as BaseContract<PositionMigratorAbi>['parseEventLogs'];

    const migrationArgs = {
      close: {
        contractAddress: previousMsl.address,
        callData: repaymentCalldata,
        value: 0n,
      },
      open: {
        contractAddress: this.msl.address,
        callData: emitCalldata,
        value: 0n,
      },
      borrowArgs,
      approvalContract: zeroAddress, // unused
      migrator: this.wallet.account.address,
      nonce: await contract.read.getNonce([this.wallet.account.address]),
    };

    const txHash = await safeContractWrite.smartMigrate([
      {
        migrationArgs,
        migratorSignature: '0x',
      },
    ] as Parameters<typeof safeContractWrite.smartMigrate>[0]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = parseEventLogs('SmartMigration', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Smart Renegotiation not executed');
        }
        return receipt;
      },
    };
  }
}
