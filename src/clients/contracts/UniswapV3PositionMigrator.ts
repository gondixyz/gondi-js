import { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';
import { Address, Hex, zeroAddress } from 'viem';

import { Wallet } from '@/clients/contracts';
import { MslV5 } from '@/clients/contracts/MslV5';
import { MslV6 } from '@/clients/contracts/MslV6';
import { uniswapv3PositionMigrator } from '@/generated/blockchain/uniswapv3PositionMigrator';
import { SECONDS_IN_HOUR } from '@/utils/dates';
import { getTotalOwed } from '@/utils/loan';
import { max } from '@/utils/number';
import { areSameAddress } from '@/utils/string';

import { BaseContract } from './BaseContract';

type SmartMigrateArgs = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof uniswapv3PositionMigrator, 'smartMigrate'>['inputs']
>[0];

type UniswapV3Pool = {
  token0: Address;
  token1: Address;
  fee: number; // In hundreds of basis points
};

const UNISWAP_V3_USDC_WETH_POOL: UniswapV3Pool = {
  token0: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  token1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  fee: 500,
};

/**
 * This contract allows migration from one position to another using Uniswap V3
 * flash loans as the source of liquidity. We will use this to migrate V3.0 loans
 * to V3.1 and also support capital efficient refinance from offers.
 */
export class UniswapV3PositionMigrator extends BaseContract<typeof uniswapv3PositionMigrator> {
  msl: MslV6;

  private getDomain() {
    return {
      name: 'UniswapV3PositionMigrator',
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
          { name: 'borrowArgs', type: 'UniswapV3BorrowArgs' },
          { name: 'approvalContract', type: 'address' },
          { name: 'migrator', type: 'address' },
          { name: 'nonce', type: 'uint256' },
        ],
        UniswapV3BorrowArgs: [
          { name: 'token0', type: 'address' },
          { name: 'token1', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'recipient', type: 'address' },
          { name: 'amount0', type: 'uint256' },
          { name: 'amount1', type: 'uint256' },
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
      abi: uniswapv3PositionMigrator,
    });
    this.msl = msl;
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
    const repaymentArgs = previousMsl.decodeRepaymentCalldata(repaymentCalldata);
    const totalOwed = getTotalOwed(repaymentArgs.loan, BigInt(SECONDS_IN_HOUR));
    const amountToBorrow = max(0n, totalOwed - currentBalance);

    const principalIsToken0 = areSameAddress(
      repaymentArgs.loan.principalAddress,
      UNISWAP_V3_USDC_WETH_POOL.token0,
    );
    const principalIsToken1 = areSameAddress(
      repaymentArgs.loan.principalAddress,
      UNISWAP_V3_USDC_WETH_POOL.token1,
    );
    if (!principalIsToken0 && !principalIsToken1) {
      throw new Error('Loan principal does not match token0 or token1 of the Uniswap V3 pool');
    }

    const borrowArgs = {
      token0: UNISWAP_V3_USDC_WETH_POOL.token0,
      token1: UNISWAP_V3_USDC_WETH_POOL.token1,
      fee: UNISWAP_V3_USDC_WETH_POOL.fee,
      recipient: this.wallet.account.address,
      amount0: principalIsToken0 ? amountToBorrow : 0n,
      amount1: principalIsToken1 ? amountToBorrow : 0n,
    };

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
      nonce: await this.contract.read.getNonce([this.wallet.account.address]),
    };

    const txHash = await this.safeContractWrite.smartMigrate([
      {
        migrationArgs,
        migratorSignature: '0x',
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
