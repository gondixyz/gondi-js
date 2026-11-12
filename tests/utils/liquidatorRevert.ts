import {
  ContractFunctionExecutionError,
  ContractFunctionRevertedError,
  encodeErrorResult,
} from 'viem';

import { auctionWithBuyoutLoanLiquidatorAbi } from '@/generated/blockchain/v6';

type LiquidatorErrorName = 'InvalidHashAuctionError' | 'AuctionOverError';

/**
 * The error viem's `simulateContract` throws when a liquidator call reverts with `errorName`: a
 * `ContractFunctionRevertedError` with the decoded error, wrapped in the execution error.
 */
export const liquidatorRevert = (errorName: LiquidatorErrorName) =>
  new ContractFunctionExecutionError(
    new ContractFunctionRevertedError({
      abi: auctionWithBuyoutLoanLiquidatorAbi,
      functionName: 'placeBid',
      data: encodeErrorResult({ abi: auctionWithBuyoutLoanLiquidatorAbi, errorName }),
    }),
    { abi: auctionWithBuyoutLoanLiquidatorAbi, functionName: 'placeBid', args: [] },
  );
