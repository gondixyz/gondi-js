import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';
import { Address, Hex } from 'viem';

import { Wallet } from '@/clients/contracts';
import { MslV5 } from '@/clients/contracts/MslV5';
import { MslV6 } from '@/clients/contracts/MslV6';
import { PositionMigrator } from '@/clients/contracts/PositionMigrator';
import { getContracts } from '@/deploys';
import { aavePositionMigratorAbi } from '@/generated/blockchain/aavePositionMigrator';
import { SECONDS_IN_HOUR } from '@/utils/dates';
import { getTotalOwed } from '@/utils/loan';
import { max } from '@/utils/number';

type SmartMigrateArgs = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof aavePositionMigratorAbi, 'smartMigrate'>['inputs']
>[0];

/**
 * This contract allows migration from one position to another.
 * We will use this to migrate V3.0 loans to V3.1 and also support
 * capital efficient refinance from offers
 */
export class AavePositionMigrator extends PositionMigrator<typeof aavePositionMigratorAbi> {
  protected getDomain() {
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
          { name: 'approvalContract', type: 'address' },
          { name: 'migrator', type: 'address' },
          { name: 'nonce', type: 'uint256' },
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
      abi: aavePositionMigratorAbi,
      msl,
    });
  }
  async smartRenegotiation({
    currentBalance,
    previousMsl,
    repaymentCalldata,
    emitCalldata,
  }: {
    currentBalance: bigint;
    previousMsl: MslV5 | MslV6;
    repaymentCalldata: Hex;
    emitCalldata: Hex;
  }) {
    const { Aave } = getContracts(this.wallet.chain);

    const repaymentArgs = previousMsl.decodeRepaymentCalldata(repaymentCalldata);
    const totalOwed = getTotalOwed(repaymentArgs.loan, BigInt(SECONDS_IN_HOUR));
    const borrowArgs = {
      pool: Aave,
      recipient: this.wallet.account.address,
      assets: [repaymentArgs.loan.principalAddress],
      amounts: [max(0n, totalOwed - currentBalance)],
    };

    return this.executeSmartRenegotiation({
      previousMsl,
      repaymentCalldata,
      emitCalldata,
      borrowArgs,
    });
  }
}
