import {
  Address,
  encodeFunctionData,
  encodePacked,
  erc20Abi,
  erc721Abi,
  Hex,
  keccak256,
  parseAbi,
  zeroAddress,
  zeroHash,
} from 'viem';

import { GondiPublicClient, Wallet } from '@/clients/contracts';
import { BaseContract } from '@/clients/contracts/BaseContract';
import { MslV6 } from '@/clients/contracts/MslV6';
import { getContracts, getCurrencies } from '@/deploys';
import { positionMigratorAbi } from '@/generated/blockchain/positionMigrator';
import { purchaseBundlerV2ABI } from '@/generated/blockchain/v7';
import { EmitLoanArgs } from '@/gondi';
import {
  buildCrossCurrencySwap,
  calculateCrossCurrencyBudget,
  CROSS_CURRENCY_DEFAULT_SLIPPAGE_BPS,
  crossCurrencyDeadline,
} from '@/utils/crossCurrencyRenegotiation';
import { BPS, getTotalOwedAt, loanToMslLoan, LoanToMslLoanType } from '@/utils/loan';
import { mulDivUp } from '@/utils/number';
import { areSameAddress } from '@/utils/string';

const aaveAbi = parseAbi([
  'function FLASHLOAN_PREMIUM_TOTAL() view returns (uint128)',
  'function getReserveData(address) view returns (((uint256 data) configuration, uint128 liquidityIndex, uint128 currentLiquidityRate, uint128 variableBorrowIndex, uint128 currentVariableBorrowRate, uint128 currentStableBorrowRate, uint40 lastUpdateTimestamp, uint16 id, address aTokenAddress, address stableDebtTokenAddress, address variableDebtTokenAddress, address interestRateStrategyAddress, uint128 accruedToTreasury, uint128 unbacked, uint128 isolationModeTotalDebt))',
]);
const managerAbi = parseAbi(['function isWhitelisted(address) view returns (bool)']);
const bundlerReadAbi = parseAbi([
  'function paused() view returns (bool)',
  'function getMultiSourceLoanAddress() view returns (address)',
]);
const quoterAbi = parseAbi([
  'function quoteExactOutput(bytes path, uint256 amountOut) returns (uint256 amountIn, uint160[] sqrtPriceX96AfterList, uint32[] initializedTicksCrossedList, uint256 gasEstimate)',
]);

/** Borrower-authorized replacement of an Ethereum v3.1/v3.2 USDC or WETH loan. */
export interface CrossCurrencyRenegotiationInput {
  /** Complete current on-chain loan, normalized with loanToMslLoan by the SDK. */
  loan: LoanToMslLoanType;
  /** Current on-chain loan ID, rather than the API's logical string ID. */
  loanId: bigint;
  /** Signed offers for the same collateral, with homogeneous contract and currency. */
  executionData: EmitLoanArgs;
  /** Maximum price movement in basis points; defaults to 100 (1%). */
  slippageBps?: bigint;
}

/** A short-lived quote; repayment and old-currency approval use oldCurrency units. */
export type CrossCurrencyRenegotiationQuote = Readonly<{
  borrower: Address;
  previousContract: Address;
  replacementContract: Address;
  purchaseBundler: Address;
  positionMigrator: Address;
  loanId: bigint;
  loanHash: Hex;
  executionHash: Hex;
  oldCurrency: Address;
  newCurrency: Address;
  repaymentAmount: bigint;
  /** Stable repayment ceiling through maturity; prepare this approval before the final quote. */
  oldCurrencyApprovalAmount: bigint;
  quotedInput: bigint;
  maximumInput: bigint;
  premiumBps: bigint;
  premium: bigint;
  maximumFlashRepayment: bigint;
  newPrincipal: bigint;
  originationFee: bigint;
  /** Live target-contract fee on lender earnings, fixed for this confirmation. */
  replacementProtocolFeeBps: bigint;
  netNewPrincipal: bigint;
  maximumTopUp: bigint;
  minimumSurplus: bigint;
  slippageBps: bigint;
  deadline: bigint;
  blockNumber: bigint;
}>;

/** Builds the fixed swap/repay/originate composition using deployed contracts. */
export class CrossCurrencyRenegotiation extends BaseContract<typeof positionMigratorAbi> {
  readonly previousMsl: MslV6;
  readonly msl: MslV6;

  constructor({
    previousMsl,
    msl,
    walletClient,
    publicClient,
  }: {
    previousMsl: MslV6;
    msl: MslV6;
    walletClient: Wallet;
    publicClient: GondiPublicClient;
  }) {
    super({
      address: getContracts(walletClient.chain).PositionMigrator,
      abi: positionMigratorAbi,
      walletClient,
      publicClient,
    });
    this.previousMsl = previousMsl;
    this.msl = msl;
  }

  /**
   * Quotes deadline-bounded repayment, conversion, flash fees and borrower spending.
   *
   * IMPLEMENTATION NOTE: QuoterV2's non-view quoteExactOutput is simulated with eth_call;
   * its first result is the new currency required for an exact old-currency output.
   * Aave's fee is read from FLASHLOAN_PREMIUM_TOTAL. Reserve configuration flags and the
   * legacy reserve tuple follow Aave V3's ReserveConfiguration and DataTypes libraries.
   * https://docs.uniswap.org/contracts/v3/reference/periphery/lens/QuoterV2
   * https://aave.com/docs/aave-v3/guides/flash-loans
   */
  async quote(input: CrossCurrencyRenegotiationInput): Promise<CrossCurrencyRenegotiationQuote> {
    const parsed = this._parseInput(input);
    const block = await this.bcClient.getBlock();
    if (block.number === null) throw new Error('Cannot quote a pending block');
    const deadline = crossCurrencyDeadline({
      now: block.timestamp,
      maturity: parsed.loan.startTime + parsed.loan.duration,
      expirations: [
        ...input.executionData.offerExecution.map(({ offer }) => offer.expirationTime),
        ...(input.executionData.expirationTime === undefined
          ? []
          : [input.executionData.expirationTime]),
      ],
    });
    const executionData = this._executionData(input.executionData, deadline);
    const repaymentAmount = getTotalOwedAt(parsed.loan, deadline);
    const { Aave } = getContracts(this.wallet.chain);
    const [loanHash, premiumBps, reserve, quote] = await Promise.all([
      this.previousMsl.contract.read.getLoanHash([input.loanId]),
      this.bcClient.readContract({
        address: Aave,
        abi: aaveAbi,
        functionName: 'FLASHLOAN_PREMIUM_TOTAL',
      }),
      this.bcClient.readContract({
        address: Aave,
        abi: aaveAbi,
        functionName: 'getReserveData',
        args: [parsed.newCurrency],
      }),
      this.bcClient.simulateContract({
        address: getContracts(this.wallet.chain).UniswapQuoterV2,
        abi: quoterAbi,
        functionName: 'quoteExactOutput',
        args: [
          encodePacked(
            ['address', 'uint24', 'address'],
            [parsed.loan.principalAddress, 500, parsed.newCurrency],
          ),
          repaymentAmount,
        ],
      }),
    ]);
    if (loanHash === zeroHash) throw new Error('The old loan is no longer active');
    const configuration = reserve.configuration.data;
    if (
      !(configuration & (1n << 56n)) ||
      configuration & (1n << 60n) ||
      !(configuration & (1n << 63n))
    ) {
      throw new Error('Aave flash loans are unavailable for the replacement currency');
    }
    const budget = calculateCrossCurrencyBudget({
      quotedInput: quote.result[0],
      premiumBps,
      slippageBps: input.slippageBps ?? CROSS_CURRENCY_DEFAULT_SLIPPAGE_BPS,
      netNewPrincipal: parsed.newPrincipal - parsed.originationFee,
    });
    const liquidity = await this.bcClient.readContract({
      address: parsed.newCurrency,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [reserve.aTokenAddress],
    });
    if (liquidity < budget.maximumInput) throw new Error('Insufficient Aave flash liquidity');
    await this._checkRoute(parsed.purchaseBundler, parsed.newCurrency, budget.maximumInput);
    const [currencyManager, collectionManager] = await Promise.all([
      this.msl.contract.read.getCurrencyManager(),
      this.msl.contract.read.getCollectionManager(),
    ]);
    const [currencySupported, collateralSupported] = await Promise.all([
      this.bcClient.readContract({
        address: currencyManager,
        abi: managerAbi,
        functionName: 'isWhitelisted',
        args: [parsed.newCurrency],
      }),
      this.bcClient.readContract({
        address: collectionManager,
        abi: managerAbi,
        functionName: 'isWhitelisted',
        args: [parsed.loan.nftCollateralAddress],
      }),
    ]);
    if (!currencySupported || !collateralSupported)
      throw new Error('Replacement currency or collateral is not whitelisted');
    const replacementProtocolFeeBps = await this._checkLenders(executionData, parsed.newCurrency);
    const executionCalldata = await this.msl.encodeEmitLoan({
      emitArgs: executionData,
      withSignature: false,
    });
    return Object.freeze({
      borrower: this.wallet.account.address,
      previousContract: this.previousMsl.address,
      replacementContract: this.msl.address,
      purchaseBundler: parsed.purchaseBundler,
      positionMigrator: this.address,
      loanId: input.loanId,
      loanHash,
      executionHash: keccak256(executionCalldata),
      oldCurrency: parsed.loan.principalAddress,
      newCurrency: parsed.newCurrency,
      repaymentAmount,
      oldCurrencyApprovalAmount: getTotalOwedAt(
        parsed.loan,
        parsed.loan.startTime + parsed.loan.duration,
      ),
      quotedInput: quote.result[0],
      premiumBps,
      ...budget,
      newPrincipal: parsed.newPrincipal,
      originationFee: parsed.originationFee,
      replacementProtocolFeeBps,
      netNewPrincipal: parsed.newPrincipal - parsed.originationFee,
      slippageBps: input.slippageBps ?? CROSS_CURRENCY_DEFAULT_SLIPPAGE_BPS,
      deadline,
      blockNumber: block.number,
    });
  }

  /** Checks the bound quote and capped approvals, then simulates and broadcasts atomically. */
  async execute({
    quote,
    ...input
  }: CrossCurrencyRenegotiationInput & {
    quote: CrossCurrencyRenegotiationQuote;
  }) {
    const parsed = this._parseInput(input);
    const executionData = this._executionData(input.executionData, quote.deadline);
    const [
      block,
      loanHash,
      allowance,
      oldAllowance,
      borrowerBalance,
      nftApproval,
      unsignedEmit,
      protocolFee,
    ] = await Promise.all([
      this.bcClient.getBlock(),
      this.previousMsl.contract.read.getLoanHash([input.loanId]),
      this.bcClient.readContract({
        address: parsed.newCurrency,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [this.wallet.account.address, this.address],
      }),
      this.bcClient.readContract({
        address: parsed.loan.principalAddress,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [this.wallet.account.address, this.previousMsl.address],
      }),
      this.bcClient.readContract({
        address: parsed.newCurrency,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [this.wallet.account.address],
      }),
      this.bcClient.readContract({
        address: parsed.loan.nftCollateralAddress,
        abi: erc721Abi,
        functionName: 'isApprovedForAll',
        args: [this.wallet.account.address, this.msl.address],
      }),
      this.msl.encodeEmitLoan({ emitArgs: executionData, withSignature: false }),
      this.msl.getProtocolFee(),
    ]);
    if (protocolFee.fraction !== quote.replacementProtocolFeeBps)
      throw new Error('The replacement protocol fee changed; refresh and confirm a new quote');
    if (
      block.timestamp >= quote.deadline ||
      loanHash !== quote.loanHash ||
      !areSameAddress(quote.borrower, this.wallet.account.address) ||
      !areSameAddress(quote.previousContract, this.previousMsl.address) ||
      !areSameAddress(quote.replacementContract, this.msl.address) ||
      input.loanId !== quote.loanId ||
      keccak256(unsignedEmit) !== quote.executionHash
    ) {
      throw new Error('The replacement quote is stale or does not match this execution');
    }
    const budget = calculateCrossCurrencyBudget({
      quotedInput: quote.quotedInput,
      slippageBps: quote.slippageBps,
      premiumBps: quote.premiumBps,
      netNewPrincipal: parsed.newPrincipal - parsed.originationFee,
    });
    if (
      quote.repaymentAmount !== getTotalOwedAt(parsed.loan, quote.deadline) ||
      budget.maximumInput !== quote.maximumInput ||
      budget.maximumFlashRepayment !== quote.maximumFlashRepayment
    ) {
      throw new Error('The replacement quote has an invalid spending budget');
    }
    if (allowance !== budget.maximumFlashRepayment) {
      throw new Error('Set the migrator allowance to the exact quoted maximum flash repayment');
    }
    if (oldAllowance < quote.repaymentAmount || !nftApproval) {
      throw new Error('Approve old-loan repayment and collateral transfer before execution');
    }
    if (borrowerBalance < budget.maximumTopUp)
      throw new Error('Insufficient borrower top-up balance');
    const repaymentCalldata = await this.previousMsl.encodeRepayLoan({
      repayArgs: {
        loan: parsed.loan,
        signableRepaymentData: {
          loanId: input.loanId,
          callbackData: '0x',
          shouldDelegate: false,
        },
      },
      withSignature: true,
    });
    const emitCalldata = await this.msl.encodeEmitLoan({
      emitArgs: executionData,
      withSignature: true,
    });
    const swapData = buildCrossCurrencySwap({
      borrower: this.wallet.account.address,
      oldCurrency: parsed.loan.principalAddress,
      newCurrency: parsed.newCurrency,
      router: getContracts(this.wallet.chain).UniversalRouter,
      repaymentAmount: quote.repaymentAmount,
      maximumInput: quote.maximumInput,
      deadline: quote.deadline,
    });
    const closeCalldata = encodeFunctionData({
      abi: purchaseBundlerV2ABI,
      functionName: 'swapAndExecute',
      args: [
        {
          inputCurrencies: [parsed.newCurrency],
          outputCurrencies: [],
          amountsToSwap: [quote.maximumInput],
          swapData,
          target: this.previousMsl.address,
          executionCalldata: repaymentCalldata,
          executionValue: 0n,
        },
      ],
    });
    const txHash = await this.safeContractWrite.smartMigrate([
      {
        migrationArgs: {
          close: { contractAddress: parsed.purchaseBundler, callData: closeCalldata, value: 0n },
          open: { contractAddress: this.msl.address, callData: emitCalldata, value: 0n },
          borrowArgs: {
            pool: getContracts(this.wallet.chain).Aave,
            recipient: this.address,
            assets: [parsed.newCurrency],
            amounts: [quote.maximumInput],
          },
          approvalContract: parsed.purchaseBundler,
          migrator: this.wallet.account.address,
          nonce: await this.contract.read.getNonce([this.wallet.account.address]),
        },
        migratorSignature: '0x',
      },
    ]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({ hash: txHash });
        const initiated = this.msl
          .parseEventLogs('LoanEmitted', receipt.logs)
          .filter((event) => areSameAddress(event.address, this.msl.address));
        const repaid = this.previousMsl
          .parseEventLogs('LoanRepaid', receipt.logs)
          .filter(
            (event) =>
              areSameAddress(event.address, this.previousMsl.address) &&
              event.args.loanId === input.loanId,
          );
        if (receipt.status !== 'success' || initiated.length !== 1 || repaid.length !== 1) {
          throw new Error('Cross-currency loan replacement was not completed');
        }
        const args = initiated[0].args;
        return {
          ...receipt,
          previousLoanId: input.loanId,
          loanId: args.loanId,
          loan: {
            ...args.loan,
            id: `${this.msl.address.toLowerCase()}.${args.loanId}`,
            contractAddress: this.msl.address,
          },
        };
      },
    };
  }

  private _parseInput(input: CrossCurrencyRenegotiationInput) {
    const contracts = getContracts(this.wallet.chain);
    if (
      [
        contracts.PositionMigrator,
        contracts.MigratorManager,
        contracts.UniversalRouter,
        contracts.Permit2,
        contracts.UniswapQuoterV2,
        contracts.Aave,
      ].some((address) => areSameAddress(address, zeroAddress)) ||
      this.previousMsl.version === '3' ||
      this.msl.version === '3'
    ) {
      throw new Error('Cross-currency replacement supports Ethereum v3.1/v3.2 loans only');
    }
    const loan = loanToMslLoan(input.loan);
    if (!areSameAddress(loan.borrower, this.wallet.account.address))
      throw new Error('Only the borrower can replace this loan');
    if (!areSameAddress(input.loan.contractAddress, this.previousMsl.address))
      throw new Error('Invalid previous loan contract');
    const { executionData } = input;
    if (
      !areSameAddress(loan.nftCollateralAddress, executionData.nftCollateralAddress) ||
      loan.nftCollateralTokenId !== executionData.tokenId
    )
      throw new Error('Replacement collateral must match the old loan');
    if (
      !executionData.offerExecution.length ||
      executionData.duration <= 0n ||
      (executionData.callbackData && executionData.callbackData !== '0x') ||
      (executionData.principalReceiver &&
        !areSameAddress(executionData.principalReceiver, loan.borrower))
    ) {
      throw new Error('Invalid replacement loan execution');
    }
    const newCurrency = executionData.offerExecution[0].offer.principalAddress;
    const currencies = getCurrencies(this.wallet.chain);
    const supported = [currencies.USDC_ADDRESS, currencies.WETH_ADDRESS];
    if (areSameAddress(loan.principalAddress, newCurrency))
      throw new Error('Choose a different replacement currency');
    if (
      ![loan.principalAddress, newCurrency].every((currency) =>
        supported.some((supportedCurrency) => areSameAddress(currency, supportedCurrency)),
      )
    ) {
      throw new Error('Only USDC and WETH are supported for cross-currency replacement');
    }
    let newPrincipal = 0n;
    let originationFee = 0n;
    const offerIdentities = new Set<string>();
    for (const { offer, amount = offer.principalAmount } of executionData.offerExecution) {
      const identity = `${offer.lenderAddress.toLowerCase()}.${offer.offerId}`;
      if (offerIdentities.has(identity)) throw new Error('Replacement contains a duplicate offer');
      offerIdentities.add(identity);
      if (
        !areSameAddress(offer.contractAddress, this.msl.address) ||
        !areSameAddress(offer.principalAddress, newCurrency) ||
        amount <= 0n ||
        amount > offer.principalAmount ||
        offer.principalAmount <= 0n ||
        offer.fee < 0n ||
        offer.fee >= offer.principalAmount ||
        executionData.duration > offer.duration
      )
        throw new Error('Replacement offers must share a supported contract and currency');
      newPrincipal += amount;
      originationFee += this._originationFee(offer, amount);
    }
    const purchaseBundler =
      contracts.PurchaseBundler[this.previousMsl.version === '3.1' ? '3.1_PB_V2' : '3.2'];
    return { loan, newCurrency, newPrincipal, originationFee, purchaseBundler };
  }

  private _executionData(executionData: EmitLoanArgs, deadline: bigint): EmitLoanArgs {
    return {
      ...executionData,
      principalReceiver: this.wallet.account.address,
      callbackData: '0x',
      expirationTime: deadline,
    };
  }

  private async _checkRoute(purchaseBundler: Address, newCurrency: Address, maximumInput: bigint) {
    const [bundlerWhitelisted, mslWhitelisted, paused, pairedMsl, permitAllowance] =
      await Promise.all([
        this.bcClient.readContract({
          address: getContracts(this.wallet.chain).MigratorManager,
          abi: managerAbi,
          functionName: 'isWhitelisted',
          args: [purchaseBundler],
        }),
        this.bcClient.readContract({
          address: getContracts(this.wallet.chain).MigratorManager,
          abi: managerAbi,
          functionName: 'isWhitelisted',
          args: [this.msl.address],
        }),
        this.bcClient.readContract({
          address: purchaseBundler,
          abi: bundlerReadAbi,
          functionName: 'paused',
        }),
        this.bcClient.readContract({
          address: purchaseBundler,
          abi: bundlerReadAbi,
          functionName: 'getMultiSourceLoanAddress',
        }),
        this.bcClient.readContract({
          address: newCurrency,
          abi: erc20Abi,
          functionName: 'allowance',
          args: [purchaseBundler, getContracts(this.wallet.chain).Permit2],
        }),
      ]);
    if (!bundlerWhitelisted || !mslWhitelisted)
      throw new Error('Cross-currency route is not activated in the migrator whitelist');
    if (
      paused ||
      !areSameAddress(pairedMsl, this.previousMsl.address) ||
      permitAllowance < maximumInput
    ) {
      throw new Error('Cross-currency Purchase Bundler is unavailable or uninitialized');
    }
  }

  private async _checkLenders(executionData: EmitLoanArgs, currency: Address) {
    const protocolFee = await this.msl.getProtocolFee();
    const fundsByLender = new Map<Address, bigint>();
    for (const { offer, amount = offer.principalAmount } of executionData.offerExecution) {
      const lender = offer.lenderAddress.toLowerCase() as Address;
      const fee = this._originationFee(offer, amount);
      const required = amount - fee + mulDivUp(fee, protocolFee.fraction, BPS);
      fundsByLender.set(lender, (fundsByLender.get(lender) ?? 0n) + required);
      const [cancelled, used] = await Promise.all([
        this.msl.contract.read.isOfferCancelled([lender, offer.offerId]),
        this.msl.contract.read.getUsedCapacity([lender, offer.offerId]),
      ]);
      if (cancelled || (offer.capacity > 0n && used + amount > offer.capacity))
        throw new Error('Replacement offer is cancelled or lacks capacity');
    }
    await Promise.all(
      [...fundsByLender].map(async ([lender, required]) => {
        const [balance, allowance] = await Promise.all([
          this.bcClient.readContract({
            address: currency,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [lender],
          }),
          this.bcClient.readContract({
            address: currency,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [lender, this.msl.address],
          }),
        ]);
        if (balance < required || allowance < required)
          throw new Error('Lender lacks replacement-currency funds or allowance');
      }),
    );
    return protocolFee.fraction;
  }

  private _originationFee(offer: EmitLoanArgs['offerExecution'][number]['offer'], amount: bigint) {
    return mulDivUp(offer.fee, amount, offer.principalAmount);
  }
}
