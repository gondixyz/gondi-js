import {
  Address,
  decodeAbiParameters,
  decodeFunctionData,
  erc20Abi,
  hashTypedData,
  Hex,
  parseAbi,
  TypedDataDefinition,
  zeroAddress,
  zeroHash,
} from 'viem';
import { mainnet } from 'viem/chains';

import { ExecutionDataV7, isNativeCurrency } from '@/blockchain';
import { MslV6 } from '@/clients/contracts/MslV6';
import { PurchaseBundlerV2 } from '@/clients/contracts/PurchaseBundlerV2';
import { getContracts, getCurrencies } from '@/deploys';
import { multiSourceLoanAbi } from '@/generated/blockchain/v7';
import { BnplOrderInput, BuyWithLoanListingQuery } from '@/generated/graphql';
import type { Gondi } from '@/gondi';
import {
  assertCreditPurchaseExecution,
  assertCreditPurchaseRoute,
  CreditPurchaseQuote,
  quotePurchaseFunding,
} from '@/utils/creditPurchase';
import { crossCurrencyDeadline } from '@/utils/crossCurrencyRenegotiation';
import { BPS } from '@/utils/loan';
import { mulDivUp } from '@/utils/number';
import { assertPurchaseMarketplace } from '@/utils/purchaseMarketplace';
import { areSameAddress } from '@/utils/string';

const routeAbi = parseAbi([
  'function paused() view returns (bool)',
  'function getMultiSourceLoanAddress() view returns (address)',
  'function getTaxes(address) view returns ((uint128 buyTax,uint128 sellTax))',
  'function FLASHLOAN_PREMIUM_TOTAL() view returns (uint128)',
]);
const managerAbi = parseAbi(['function isWhitelisted(address,bytes4) view returns (bool)']);
type Context = Pick<
  Gondi,
  'wallet' | 'bcClient' | 'apiClient' | 'contracts' | 'quoteCreditPurchase'
>;
type PurchaseInput = Parameters<Gondi['buyNowPayLater']>[0];
type Listing = BuyWithLoanListingQuery['listOrdersV2']['edges'][number]['node'];

/** Selected buyer financing; quote preparation never requests a wallet signature. */
export type BuyWithLoanInput = Pick<
  PurchaseInput,
  'amounts' | 'contractAddress' | 'loanDuration' | 'offers' | 'tokenId'
> & {
  orderId: number;
  minimumInitialPayment?: bigint;
  sellAndRepaySwapData?: PurchaseInput['sellAndRepaySwapData'];
  slippageBps?: bigint;
};

type QuoteBase = {
  orderId: number;
  price: bigint;
  totalPrice: bigint;
  buyer: Address;
  buyerBundler: Address;
  buyerLoanContract: Address;
  loanCurrency: Address;
  purchaseCurrency: Address;
  netPrincipal: bigint;
  initialPayment: bigint;
  inputAmount: bigint;
  deadline: bigint;
  module: Address;
  execution: ExecutionDataV7;
  approvalCaps: readonly { currency: Address; amount: bigint }[];
  extraSeaportData?: Hex;
  loanSwapData: Hex;
  repaymentSwapData: Hex;
};
type SellerQuote = {
  sellerContract: Address;
  loanId: bigint;
  loanHash: Hex;
  repaymentCalldata: Hex;
};

/** A short-lived, token-bounded authorization for one exact listing and buyer execution. */
export type BuyWithLoanQuote = Readonly<
  QuoteBase &
    (
      | { route: 'ordinary' }
      | (SellerQuote & { route: 'flash'; premiumBps: bigint })
      | (SellerQuote & { route: 'nested'; creditPurchaseQuote: CreditPurchaseQuote })
    )
>;

type UnpreparedQuote = BuyWithLoanQuote extends infer Quote
  ? Quote extends BuyWithLoanQuote
    ? Omit<Quote, 'execution' | 'approvalCaps'>
    : never
  : never;

/** Caps every collection from the buyer, including zeroing unquoted flash fallback allowances. */
export const buyWithLoanApprovals = (
  quote: BuyWithLoanQuote,
): { currency: Address; amount: bigint }[] => {
  if (quote.route !== 'flash')
    return isNativeCurrency(quote.purchaseCurrency)
      ? []
      : [{ currency: quote.purchaseCurrency, amount: quote.initialPayment }];
  const native = isNativeCurrency(quote.purchaseCurrency);
  const currency = native ? getCurrencies(mainnet).WETH_ADDRESS : quote.purchaseCurrency;
  const flashPrincipal = native ? quote.price - quote.initialPayment : quote.price;
  const repayment = flashPrincipal + mulDivUp(flashPrincipal, quote.premiumBps, BPS);
  return areSameAddress(currency, quote.loanCurrency)
    ? [{ currency, amount: repayment }]
    : [
        { currency: quote.loanCurrency, amount: quote.inputAmount },
        { currency, amount: native ? 0n : quote.initialPayment },
      ];
};

/** Resolves the canonical listing and prepares a bounded unsigned execution before confirmation. */
export const quoteBuyWithLoan = async (
  context: Context,
  input: BuyWithLoanInput,
): Promise<BuyWithLoanQuote> => {
  const deployments = getContracts(context.wallet.chain);
  const currencies = getCurrencies(context.wallet.chain);
  if (context.wallet.chain.id !== 1)
    throw new Error('Bounded purchase financing requires Ethereum');
  const loanCurrency = buyWithLoanCurrency(context, input);
  const listing = await buyWithLoanListing(context, input.orderId);
  if (
    !('nft' in listing) ||
    !listing.nft.collection ||
    listing.nft.tokenId !== input.tokenId ||
    !areSameAddress(listing.nft.collection.contractData.contractAddress, input.contractAddress) ||
    listing.nft.collection.contractData.blockchain.toLowerCase() !== 'ethereum'
  )
    throw new Error('Purchase collateral changed; refresh the quote');
  const purchaseCurrency = isNativeCurrency(listing.currencyAddress)
    ? zeroAddress
    : listing.currencyAddress;
  if (
    ![zeroAddress, currencies.USDC_ADDRESS, currencies.WETH_ADDRESS].some((currency) =>
      areSameAddress(currency, purchaseCurrency),
    )
  )
    throw new Error('Unsupported listing currency');
  const netPrincipal = input.amounts.reduce(
    (principal, amount, index) =>
      principal +
      amount -
      mulDivUp(input.offers[index].fee, amount, input.offers[index].principalAmount),
    0n,
  );
  const block = await context.bcClient.getBlock();
  const expiration = BigInt(Math.floor(listing.expiration.getTime() / 1000));
  const seller = listing.__typename === 'SellAndRepayOrder' ? listing : undefined;
  const deadline = crossCurrencyDeadline({
    now: block.timestamp,
    maturity: seller
      ? BigInt(Math.floor(seller.loan.startTime.getTime() / 1000)) + seller.loan.duration
      : expiration,
    expirations: [expiration, ...input.offers.map((offer) => offer.expirationTime)],
  });
  const totalPrice =
    listing.price +
    (seller
      ? 0n
      : listing.platformFees.reduce((fees, fee) => fees + (listing.price * fee.bps) / BPS, 0n));
  const buyerBundler = deployments.PurchaseBundler['3.1_PB_V2'];
  const base = {
    orderId: input.orderId,
    price: listing.price,
    totalPrice,
    buyer: context.wallet.account.address,
    buyerBundler,
    buyerLoanContract: deployments.MultiSourceLoan['3.1'],
    loanCurrency,
    purchaseCurrency,
    netPrincipal,
    deadline,
    repaymentSwapData: input.sellAndRepaySwapData ?? ('0x' as Hex),
  };
  let quote: UnpreparedQuote;
  if (seller && areSameAddress(seller.loan.address, deployments.MultiSourceLoan['3.2'])) {
    const creditPurchaseQuote = await context.quoteCreditPurchase({
      orderId: input.orderId,
      price: listing.price,
      sellerContract: seller.loan.address,
      repaymentCalldata: seller.repaymentCalldata,
      repaymentSwapData: input.sellAndRepaySwapData ?? undefined,
      loanCurrency,
      netPrincipal,
      minimumInitialPayment: input.minimumInitialPayment,
      slippageBps: input.slippageBps,
      offerExpirations: [expiration, ...input.offers.map((offer) => offer.expirationTime)],
    });
    quote = {
      ...base,
      route: 'nested',
      ...sellerQuote(seller),
      loanHash: creditPurchaseQuote.loanHash,
      creditPurchaseQuote,
      deadline: creditPurchaseQuote.deadline,
      initialPayment: creditPurchaseQuote.initialPayment,
      inputAmount: creditPurchaseQuote.inputAmount,
      loanSwapData: creditPurchaseQuote.loanSwapData,
      module: creditPurchaseQuote.sellerBundler,
    };
  } else {
    const route = seller ? 'flash' : 'ordinary';
    if (seller && !areSameAddress(seller.loan.address, deployments.MultiSourceLoan['3.1']))
      throw new Error('Purchase requires a v3.1 or v3.2 seller loan');
    const premiumBps = seller
      ? await context.bcClient.readContract({
          address: deployments.Aave,
          abi: routeAbi,
          functionName: 'FLASHLOAN_PREMIUM_TOTAL',
        })
      : 0n;
    const funding = await quotePurchaseFunding({
      client: context.bcClient,
      loanCurrency,
      purchaseCurrency,
      price: totalPrice,
      netPrincipal,
      deadline,
      slippageBps: input.slippageBps ?? 100n,
      minimumInitialPayment: input.minimumInitialPayment ?? 0n,
      route,
      premiumBps,
    });
    if (seller) {
      const sellerMsl = context.contracts.Msl(seller.loan.address);
      if (!(sellerMsl instanceof MslV6)) throw new Error('Unsupported seller contract');
      const repayment = sellerMsl.decodeRepaymentCalldata(seller.repaymentCalldata);
      if (
        repayment.data.loanId !== BigInt(seller.loan.loanId) ||
        !areSameAddress(repayment.loan.nftCollateralAddress, input.contractAddress) ||
        repayment.loan.nftCollateralTokenId !== input.tokenId
      )
        throw new Error('Seller repayment collateral changed');
      const callback = decodeAbiParameters(
        [PurchaseBundlerV2.EXECUTION_INFO],
        repayment.data.callbackData,
      )[0];
      if (
        !areSameAddress(
          isNativeCurrency(callback.purchaseCurrency) ||
            areSameAddress(callback.purchaseCurrency, PurchaseBundlerV2.ETH_SENTINEL)
            ? zeroAddress
            : callback.purchaseCurrency,
          purchaseCurrency,
        ) ||
        callback.amount <= 0n ||
        callback.amount > listing.price ||
        (!areSameAddress(
          repayment.loan.principalAddress,
          isNativeCurrency(purchaseCurrency) ? currencies.WETH_ADDRESS : purchaseCurrency,
        ) &&
          base.repaymentSwapData === '0x')
      )
        throw new Error('Seller repayment terms or conversion changed');
      const loanHash = await sellerMsl.contract.read.getLoanHash([repayment.data.loanId]);
      if (loanHash === zeroHash) throw new Error('Seller loan is no longer active');
      quote = {
        ...base,
        ...funding,
        route: 'flash',
        ...sellerQuote(seller),
        loanHash,
        premiumBps,
        module: callback.reservoirExecutionInfo.module,
      };
    } else quote = { ...base, ...funding, route: 'ordinary', module: listing.marketPlaceAddress };
  }
  const orderInput = buyWithLoanOrderInput(input, quote);
  const typed = await unsignedBuyWithLoanExecution(context, orderInput);
  const callbackData = (typed.message as ExecutionDataV7).callbackData;
  if (quote.route === 'ordinary') {
    assertOrdinaryPurchaseCallback(quote, callbackData);
    const mustBeOwner = assertPurchaseMarketplace(
      listing,
      quote,
      input,
      decodeAbiParameters([PurchaseBundlerV2.EXECUTION_INFO], callbackData)[0]
        .reservoirExecutionInfo.data,
    );
    if (
      decodeAbiParameters([PurchaseBundlerV2.EXECUTION_INFO], callbackData)[0]
        .contractMustBeOwner !== mustBeOwner
    )
      throw new Error('Marketplace custody authorization changed');
  }
  const execution = buyWithLoanExecution(
    context,
    input,
    quote,
    quote.route === 'nested'
      ? quote.creditPurchaseQuote.callbackData
      : quote.route === 'flash'
        ? '0x'
        : callbackData,
  );
  assertBuyWithLoanTypedData(context, execution, typed);
  const result = Object.freeze({
    ...quote,
    execution,
    approvalCaps: Object.freeze(buyWithLoanApprovals({ ...quote, execution } as BuyWithLoanQuote)),
    extraSeaportData: orderInput.extraSeaportData ?? undefined,
  }) as BuyWithLoanQuote;
  await assertBuyWithLoanRoute(context, result);
  return result;
};

/** Parses one supported, homogeneous set of signed buyer offers. */
const buyWithLoanCurrency = (context: Context, input: BuyWithLoanInput) => {
  const deployments = getContracts(context.wallet.chain);
  const currencies = getCurrencies(context.wallet.chain);
  if (
    !input.offers.length ||
    input.offers.length > 50 ||
    input.offers.length !== input.amounts.length ||
    new Set(input.offers.map((offer) => offer.id)).size !== input.offers.length ||
    input.loanDuration <= 0n ||
    input.offers.some(
      (offer, index) =>
        !areSameAddress(offer.contractAddress, deployments.MultiSourceLoan['3.1']) ||
        !areSameAddress(offer.principalAddress, input.offers[0].principalAddress) ||
        input.amounts[index] <= 0n ||
        input.amounts[index] > offer.principalAmount ||
        input.loanDuration > offer.duration ||
        !offer.signature ||
        !offer.lenderAddress,
    )
  )
    throw new Error('Purchase requires signed, homogeneous and available v3.1 buyer offers');
  const loanCurrency = input.offers[0].principalAddress;
  if (
    ![currencies.USDC_ADDRESS, currencies.WETH_ADDRESS].some((currency) =>
      areSameAddress(currency, loanCurrency),
    )
  )
    throw new Error('Unsupported buyer loan currency');
  return loanCurrency;
};

/** Refuses inactive or substituted listings using one bounded, exact-ID query. */
const buyWithLoanListing = async (context: Context, orderId: number) => {
  const response = await context.apiClient.api.buyWithLoanListing(
    {
      orderId,
      buyer: context.wallet.account.address,
    },
    { fetchPolicy: 'no-cache' },
  );
  const listing = response.listOrdersV2.edges[0]?.node;
  if (
    !listing ||
    Number(listing.id) !== orderId ||
    !listing.isAsk ||
    !['active', 'orderstatus.active'].includes(listing.status.toLowerCase()) ||
    (!areSameAddress(listing.taker, zeroAddress) &&
      !areSameAddress(listing.taker, context.wallet.account.address))
  )
    throw new Error('The selected listing is no longer available');
  return listing;
};

/** Carries the signed seller authorization while its active hash is checked separately. */
const sellerQuote = (seller: Extract<Listing, { __typename?: 'SellAndRepayOrder' }>) => ({
  sellerContract: seller.loan.address,
  loanId: BigInt(seller.loan.loanId),
  repaymentCalldata: seller.repaymentCalldata,
});

/** Builds the opt-in publication request without a wallet authorization. */
const buyWithLoanOrderInput = (
  input: BuyWithLoanInput,
  quote: UnpreparedQuote,
): BnplOrderInput => ({
  amounts: input.amounts,
  contractAddress: input.contractAddress,
  tokenId: input.tokenId,
  loanDuration: input.loanDuration,
  offerIds: input.offers.map((offer) => offer.id),
  creditPurchaseExecution: {
    orderId: quote.orderId,
    price: quote.price,
    totalPrice: quote.totalPrice,
    initialPayment: quote.initialPayment,
    loanSwapData: quote.loanSwapData,
    repaymentSwapData: quote.repaymentSwapData,
    expirationTime: quote.deadline,
  },
});

/** Preparation may refresh server-side marketplace extra data, but never saves a signed buyer order. */
const unsignedBuyWithLoanExecution = async (
  context: Context,
  orderInput: BnplOrderInput,
): Promise<TypedDataDefinition> => {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await context.apiClient.publishBuyNowPayLaterOrder(orderInput);
    if (response.__typename === 'ExtraSeaportData')
      orderInput.extraSeaportData = response.extraData;
    else if (response.__typename === 'SignatureRequest' && response.key === 'emitSignature')
      return response.typedData as TypedDataDefinition;
    else throw new Error('Expected an unsigned buyer execution during quote preparation');
  }
  throw new Error('Marketplace preparation did not stabilize; refresh the quote');
};

/** Reconstructs all buyer-loan fields independently from API typed data. */
const buyWithLoanExecution = (
  context: Context,
  input: BuyWithLoanInput,
  quote: UnpreparedQuote,
  callbackData: Hex,
): ExecutionDataV7 => ({
  offerExecution: input.offers.map((offer, index) => {
    if (!offer.signature || !offer.lenderAddress) throw new Error('Signed buyer offer required');
    return {
      offer: {
        ...offer,
        lender: offer.lenderAddress,
        nftCollateralAddress: buyWithLoanCollateral(context, offer.nftCollateralAddress),
        validators: offer.offerValidators,
        maxSeniorRepayment: offer.maxSeniorRepayment ?? 0n,
      },
      amount: input.amounts[index],
      lenderOfferSignature: offer.signature,
    };
  }),
  loanId: 0n,
  nftCollateralAddress: buyWithLoanCollateral(context, input.contractAddress),
  tokenId: input.tokenId,
  duration: input.loanDuration,
  expirationTime: quote.deadline,
  principalReceiver: quote.route === 'flash' ? quote.buyer : quote.buyerBundler,
  callbackData,
});

/** Verifies the complete EIP-712 domain, types and message against the SDK's canonical authorization. */
const assertBuyWithLoanTypedData = (
  context: Context,
  execution: ExecutionDataV7,
  received: TypedDataDefinition,
) => {
  const buyerMsl = context.contracts.Msl(getContracts(context.wallet.chain).MultiSourceLoan['3.1']);
  if (!(buyerMsl instanceof MslV6)) throw new Error('Unsupported buyer contract');
  assertCreditPurchaseExecution(execution, received.message);
  if (hashTypedData(buyerMsl.getExecutionTypedData(execution)) !== hashTypedData(received))
    throw new Error('API authorization differs from the confirmed purchase quote');
};

/** Requires the marketplace callback to honor the separately quoted listing and loan units. */
const assertOrdinaryPurchaseCallback = (quote: UnpreparedQuote, data: Hex) => {
  const callback = decodeAbiParameters([PurchaseBundlerV2.EXECUTION_INFO], data)[0];
  if (
    !areSameAddress(callback.reservoirExecutionInfo.module, quote.module) ||
    !areSameAddress(
      isNativeCurrency(callback.purchaseCurrency) ||
        areSameAddress(callback.purchaseCurrency, PurchaseBundlerV2.ETH_SENTINEL)
        ? zeroAddress
        : callback.purchaseCurrency,
      quote.purchaseCurrency,
    ) ||
    callback.amount !== quote.initialPayment ||
    callback.swapData !== quote.loanSwapData ||
    callback.swapValue !== 0n ||
    callback.maxSlippage !== 0n ||
    callback.reservoirExecutionInfo.value > quote.totalPrice ||
    (!isNativeCurrency(quote.purchaseCurrency) && callback.reservoirExecutionInfo.value !== 0n)
  )
    throw new Error('Marketplace execution differs from the quoted spending limits');
};

/** Checks activation, currency permissions, seller state and the live flash premium again. */
export const assertBuyWithLoanRoute = async (context: Context, quote: BuyWithLoanQuote) => {
  const deployments = getContracts(context.wallet.chain);
  const [block, paused, pair, taxes] = await Promise.all([
    context.bcClient.getBlock(),
    context.bcClient.readContract({
      address: quote.buyerBundler,
      abi: routeAbi,
      functionName: 'paused',
    }),
    context.bcClient.readContract({
      address: quote.buyerBundler,
      abi: routeAbi,
      functionName: 'getMultiSourceLoanAddress',
    }),
    context.bcClient.readContract({
      address: quote.buyerBundler,
      abi: routeAbi,
      functionName: 'getTaxes',
      args: [quote.module],
    }),
  ]);
  if (
    context.wallet.chain.id !== 1 ||
    block.timestamp >= quote.deadline ||
    paused ||
    !areSameAddress(quote.buyer, context.wallet.account.address) ||
    !areSameAddress(quote.buyerBundler, deployments.PurchaseBundler['3.1_PB_V2']) ||
    !areSameAddress(pair, deployments.MultiSourceLoan['3.1']) ||
    taxes.buyTax !== 0n ||
    taxes.sellTax !== 0n
  )
    throw new Error('Purchase route changed or expired; confirm a fresh quote');
  if (quote.route === 'nested')
    await assertCreditPurchaseRoute(context.bcClient, quote.creditPurchaseQuote);
  else {
    const callback =
      quote.route === 'ordinary'
        ? decodeAbiParameters([PurchaseBundlerV2.EXECUTION_INFO], quote.execution.callbackData)[0]
        : decodeAbiParameters(
            [PurchaseBundlerV2.EXECUTION_INFO],
            (context.contracts.Msl(quote.sellerContract) as MslV6).decodeRepaymentCalldata(
              quote.repaymentCalldata,
            ).data.callbackData,
          )[0];
    const whitelisted = await context.bcClient.readContract({
      address: deployments.MethodManager,
      abi: managerAbi,
      functionName: 'isWhitelisted',
      args: [quote.module, callback.reservoirExecutionInfo.data.slice(0, 10) as Hex],
    });
    if (!whitelisted) throw new Error('Purchase marketplace method is not enabled');
    if (quote.loanSwapData !== '0x') {
      const allowance = await context.bcClient.readContract({
        address: quote.loanCurrency,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [quote.buyerBundler, deployments.Permit2],
      });
      if (allowance < quote.inputAmount)
        throw new Error('Buyer bundler currency approval is not initialized');
    }
  }
  if (quote.route !== 'ordinary') {
    const seller = context.contracts.Msl(quote.sellerContract);
    if (
      !(seller instanceof MslV6) ||
      (await seller.contract.read.getLoanHash([quote.loanId])) !== quote.loanHash
    )
      throw new Error('Seller loan changed; confirm a fresh quote');
    if (
      quote.route === 'flash' &&
      (await context.bcClient.readContract({
        address: deployments.Aave,
        abi: routeAbi,
        functionName: 'FLASHLOAN_PREMIUM_TOTAL',
      })) !== quote.premiumBps
    )
      throw new Error('Flash-loan premium changed; confirm a fresh quote');
  }
};

/** Publishes only the confirmed authorization and broadcasts through the existing simulated route. */
export const buyWithLoan = async (
  context: Context,
  input: PurchaseInput & { buyWithLoanQuote: BuyWithLoanQuote },
) => {
  const quote = input.buyWithLoanQuote;
  const expected = buyWithLoanExecution(
    context,
    { ...input, orderId: quote.orderId },
    quote,
    quote.execution.callbackData,
  );
  assertCreditPurchaseExecution(quote.execution, expected);
  await assertBuyWithLoanRoute(context, quote);
  await assertBuyWithLoanApprovals(context, quote);
  const orderInput = buyWithLoanOrderInput({ ...input, orderId: quote.orderId }, quote);
  orderInput.extraSeaportData = quote.extraSeaportData;
  const typed = await unsignedBuyWithLoanExecution(context, orderInput);
  assertBuyWithLoanTypedData(context, expected, typed);
  await assertBuyWithLoanRoute(context, quote);
  const buyerMsl = context.contracts.Msl(quote.buyerLoanContract);
  if (!(buyerMsl instanceof MslV6)) throw new Error('Unsupported buyer contract');
  orderInput.emitSignature = await buyerMsl.signExecutionData({ structToSign: expected });
  const response = await context.apiClient.publishBuyNowPayLaterOrder(orderInput);
  if (
    response.__typename !== 'BuyNowPayLaterOrder' ||
    response.price !== quote.totalPrice ||
    !areSameAddress(response.currencyAddress, quote.purchaseCurrency)
  )
    throw new Error('Published purchase terms changed');
  const decoded = decodeFunctionData({ abi: multiSourceLoanAbi, data: response.emitCalldata });
  if (decoded.functionName !== 'emitLoan' || !areSameAddress(decoded.args[0].borrower, quote.buyer))
    throw new Error('Unexpected buyer execution');
  assertCreditPurchaseExecution(expected, decoded.args[0].executionData);
  await assertBuyWithLoanRoute(context, quote);
  await assertBuyWithLoanApprovals(context, quote);
  const bundler = context.contracts.PurchaseBundler(quote.buyerBundler, quote.buyerLoanContract);
  if (quote.route === 'flash')
    return bundler.executeSellWithLoan({
      repaymentCalldata: quote.repaymentCalldata,
      emitCalldata: response.emitCalldata,
      price: quote.price,
      initialPayment: quote.initialPayment,
      executeSellSwapData: quote.repaymentSwapData === '0x' ? undefined : quote.repaymentSwapData,
      repayFlashLoanSwapParams:
        quote.loanSwapData === '0x'
          ? undefined
          : {
              inputCurrency: quote.loanCurrency,
              inputAmount: quote.inputAmount,
              swapData: quote.loanSwapData,
            },
    });
  return bundler.buy({
    emitCalldata: response.emitCalldata,
    value: isNativeCurrency(quote.purchaseCurrency) ? quote.initialPayment : 0n,
  });
};

/** Refuses allowances that exceed or no longer cover the quoted spending caps. */
const assertBuyWithLoanApprovals = async (context: Context, quote: BuyWithLoanQuote) => {
  for (const approval of buyWithLoanApprovals(quote)) {
    const allowance = await context.bcClient.readContract({
      address: approval.currency,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [quote.buyer, quote.buyerBundler],
    });
    if (allowance !== approval.amount)
      throw new Error('Approve exactly the quoted token spending caps to the buyer bundler');
  }
};

/** The deployed Ethereum bundler escrows CryptoPunks in the ERC721 wrapper. */
const buyWithLoanCollateral = (context: Context, address: Address) =>
  areSameAddress(address, getContracts(context.wallet.chain).Cryptopunks)
    ? ('0x000000000000003607fce1ac9e043a86675c5c2f' as Address)
    : address;
