import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';
import { Address, Hex } from 'viem';

import { Wallet } from '@/clients/contracts';
import { MslV6 } from '@/clients/contracts/MslV6';
import { getContracts } from '@/deploys';
import { positionMigratorAbi } from '@/generated/blockchain/positionMigrator';
import { SECONDS_IN_HOUR } from '@/utils/dates';
import { getTotalOwed } from '@/utils/loan';
import { max } from '@/utils/number';

import { BaseContract } from './BaseContract';

type SmartMigrateArgs = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof positionMigratorAbi, 'smartMigrate'>['inputs']
>[0];

/**
 * This contract allows migration from one position to another.
 * We will use this to migrate V3.0 loans to V3.1 and also support
 * capital efficient refinance from offers
 */
export class PositionMigrator extends BaseContract<typeof positionMigratorAbi> {
  msl: MslV6;

  private getDomain() {
    return {
      name: 'PositionMigrator',
      version: '1',
      chainId: this.wallet.chain.id,
      verifyingContract: this.address,
    };
  }

  async signMigrationArgs({ structToSign }: { structToSign: SmartMigrateArgs['migrationArgs'] }) {
    return this.wallet.signTypedData({
      domain: this.getDomain(),
      primaryType: 'PositionMigrationArgs',
      types: {
        PositionMigrationArgs: [
          { name: 'close', type: 'Position' },
          { name: 'open', type: 'Position' },
          { name: 'borrowArgs', type: 'AaveBorrowArgs' },
          { name: 'migrator', type: 'address' },
        ],
        AaveBorrowArgs: [
          { name: 'pool', type: 'address' },
          { name: 'recipient', type: 'address' },
          { name: 'assets', type: 'address[]' },
          { name: 'amounts', type: 'uint256[]' },
        ],
        Position: [
          { name: 'contractAddress', type: 'address' },
          { name: 'callData', type: 'bytes' },
          { name: 'value', type: 'uint256' },
        ],
      },
      message: structToSign,
    });
  }

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
      abi: positionMigratorAbi,
    });
    this.msl = msl;
  }
  async smartRenegotiation({
    currentBalance,
    targetContract,
    repaymentCalldata,
    emitCalldata,
  }: {
    currentBalance: bigint;
    targetContract: Address;
    repaymentCalldata: Hex;
    emitCalldata: Hex;
  }) {
    const { Aave } = getContracts(this.wallet.chain);

    const repaymentArgs = this.msl.decodeRepaymentCalldata(repaymentCalldata);
    const totalOwed = getTotalOwed(repaymentArgs.loan, BigInt(SECONDS_IN_HOUR));
    const borrowArgs = {
      pool: Aave,
      recipient: this.wallet.account.address,
      assets: [repaymentArgs.loan.principalAddress],
      amounts: [max(0n, totalOwed - currentBalance)],
    };

    const migrationArgs = {
      close: {
        contractAddress: targetContract,
        callData: repaymentCalldata,
        value: 0n,
      },
      open: {
        contractAddress: this.msl.address,
        callData: emitCalldata,
        value: 0n,
      },
      borrowArgs,
      migrator: this.wallet.account.address,
    };

    const txHash = await this.safeContractWrite.smartMigrate([
      {
        migrationArgs,
        migratorSignature: await this.signMigrationArgs({ structToSign: migrationArgs }),
      },
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('SmartMigration', receipt.logs);
        if (events.length !== 1) {
          throw new Error('Smart Renegotiation not executed');
        }
        return receipt;
      },
    };
  }
}
