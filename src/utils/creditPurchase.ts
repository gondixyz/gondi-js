import {
  Address,
  decodeAbiParameters,
  encodeAbiParameters,
  encodeFunctionData,
  encodePacked,
  erc20Abi,
  getAbiItem,
  Hex,
  keccak256,
  parseAbi,
  toFunctionSelector,
  zeroAddress,
  zeroHash,
} from 'viem';
import { mainnet } from 'viem/chains';

import { ExecutionDataV7, isNativeCurrency } from '@/blockchain';
import { GondiPublicClient, Wallet } from '@/clients/contracts';
import { MslV6 } from '@/clients/contracts/MslV6';
import { PurchaseBundlerV2 } from '@/clients/contracts/PurchaseBundlerV2';
import { getContracts, getCurrencies } from '@/deploys';
import { multiSourceLoanAbi, purchaseBundlerV2ABI } from '@/generated/blockchain/v7';
import {
  crossCurrencyDeadline,
  universalRouterExecuteAbi,
} from '@/utils/crossCurrencyRenegotiation';
import { BPS } from '@/utils/loan';
import { max, min } from '@/utils/number';
import { areSameAddress } from '@/utils/string';

const executeSellSelector = toFunctionSelector(
  getAbiItem({ abi: purchaseBundlerV2ABI, name: 'executeSell' }),
);
const managerAbi = parseAbi(['function isWhitelisted(address,bytes4) view returns (bool)']);
const quoterAbi = parseAbi([
  'function quoteExactOutput(bytes,uint256) returns (uint256,uint160[],uint32[],uint256)',
  'function quoteExactInput(bytes,uint256) returns (uint256,uint160[],uint32[],uint256)',
]);
const readAbi = parseAbi([
  'function paused() view returns (bool)',
  'function getMultiSourceLoanAddress() view returns (address)',
  'function getTaxes(address) view returns ((uint128 buyTax,uint128 sellTax))',
]);

/** Fixed listing-currency contribution and signed settlement for v3.1 credit against a v3.2 seller. */
export type CreditPurchaseQuote = Readonly<{
  orderId: number;
  price: bigint;
  buyer: Address;
  sellerContract: Address;
  sellerBundler: Address;
  buyerBundler: Address;
  loanCurrency: Address;
  purchaseCurrency: Address;
  netPrincipal: bigint;
  initialPayment: bigint;
  deadline: bigint;
  loanId: bigint;
  nftCollateralAddress: Address;
  tokenId: bigint;
  loanHash: Hex;
  repaymentHash: Hex;
  repaymentSwapData: Hex;
  loanSwapData: Hex;
  callbackData: Hex;
}>;

/** Compares every ABI field against the confirmed terms before signing or submitting an API execution. */
export const assertCreditPurchaseExecution = (expected: ExecutionDataV7, received: unknown) => {
  const parameter = getAbiItem({ abi: multiSourceLoanAbi, name: 'emitLoan' }).inputs[0]
    .components[0];
  try {
    if (
      encodeAbiParameters([parameter], [expected]) ===
      encodeAbiParameters([parameter], [received as ExecutionDataV7])
    )
      return;
  } catch {
    throw new Error('API execution differs from the confirmed purchase quote');
  }
  throw new Error('API execution differs from the confirmed purchase quote');
};

/** Rechecks activation, zero additional taxes and router funding before buyer signing. */
export const assertCreditPurchaseRoute = async (
  client: GondiPublicClient,
  quote: Pick<
    CreditPurchaseQuote,
    'buyerBundler' | 'sellerBundler' | 'loanCurrency' | 'loanSwapData' | 'netPrincipal'
  >,
) => {
  const [whitelisted, taxes, allowance] = await Promise.all([
    client.readContract({
      address: getContracts(mainnet).MethodManager,
      abi: managerAbi,
      functionName: 'isWhitelisted',
      args: [quote.sellerBundler, executeSellSelector],
    }),
    client.readContract({
      address: quote.buyerBundler,
      abi: readAbi,
      functionName: 'getTaxes',
      args: [quote.sellerBundler],
    }),
    quote.loanSwapData === '0x'
      ? Promise.resolve(quote.netPrincipal)
      : client.readContract({
          address: quote.loanCurrency,
          abi: erc20Abi,
          functionName: 'allowance',
          args: [quote.buyerBundler, getContracts(mainnet).Permit2],
        }),
  ]);
  if (!whitelisted) throw new Error('The nested credit purchase route is not enabled');
  if (taxes.buyTax !== 0n || taxes.sellTax !== 0n)
    throw new Error('Nested purchase taxes changed; a new fee quote is required');
  if (allowance < quote.netPrincipal)
    throw new Error('The buyer bundler needs its currency approval initialized before swapping');
};

export type CreditPurchaseInput = {
  orderId: number;
  price: bigint;
  sellerContract: Address;
  repaymentCalldata: Hex;
  repaymentSwapData?: Hex;
  loanCurrency: Address;
  netPrincipal: bigint;
  minimumInitialPayment?: bigint;
  offerExpirations: bigint[];
  slippageBps?: bigint;
};

/**
 * Funds the purchase bundler in listing currency, with capped spend or minimum output.
 *
 * IMPLEMENTATION NOTE: Universal Router's address 0x1 is its caller, the buyer bundler.
 * Exact-output paths are reversed; native output unwraps WETH to that caller.
 * https://developers.uniswap.org/docs/protocols/universal-router/technical-reference
 */
export const buildCreditPurchaseSwap = ({
  loanCurrency,
  purchaseCurrency,
  amount,
  limit,
  exactInput,
  deadline,
}: {
  loanCurrency: Address;
  purchaseCurrency: Address;
  amount: bigint;
  limit: bigint;
  exactInput: boolean;
  deadline: bigint;
}): Hex => {
  const caller = '0x0000000000000000000000000000000000000001';
  const router = '0x0000000000000000000000000000000000000002';
  const weth = getCurrencies(mainnet).WETH_ADDRESS;
  const native = isNativeCurrency(purchaseCurrency);
  const outputCurrency = native ? weth : purchaseCurrency;
  if (areSameAddress(loanCurrency, outputCurrency)) {
    return native
      ? encodeFunctionData({
          abi: universalRouterExecuteAbi,
          functionName: 'execute',
          args: [
            '0x020c',
            [
              encodeAbiParameters(
                [{ type: 'address' }, { type: 'address' }, { type: 'uint160' }],
                [weth, router, amount],
              ),
              encodeAbiParameters([{ type: 'address' }, { type: 'uint256' }], [caller, amount]),
            ],
            deadline,
          ],
        })
      : '0x';
  }
  const path = encodePacked(
    ['address', 'uint24', 'address'],
    exactInput ? [loanCurrency, 500, outputCurrency] : [outputCurrency, 500, loanCurrency],
  );
  const inputs = [
    encodeAbiParameters(
      [
        { type: 'address' },
        { type: 'uint256' },
        { type: 'uint256' },
        { type: 'bytes' },
        { type: 'bool' },
      ],
      [
        native ? router : caller,
        exactInput ? limit : amount,
        exactInput ? amount : limit,
        path,
        true,
      ],
    ),
  ];
  if (native)
    inputs.push(encodeAbiParameters([{ type: 'address' }, { type: 'uint256' }], [caller, amount]));
  return encodeFunctionData({
    abi: universalRouterExecuteAbi,
    functionName: 'execute',
    args: [`${exactInput ? '0x00' : '0x01'}${native ? '0c' : ''}` as Hex, inputs, deadline],
  });
};

/** Quotes gross buyer funding; signed seller callbacks record net proceeds after marketplace fees. */
export const quoteCreditPurchase = async ({
  input,
  wallet,
  client,
  sellerMsl,
}: {
  input: CreditPurchaseInput;
  wallet: Wallet;
  client: GondiPublicClient;
  sellerMsl: MslV6;
}): Promise<CreditPurchaseQuote> => {
  const deployments = getContracts(mainnet);
  const currencies = getCurrencies(mainnet);
  if (
    wallet.chain.id !== 1 ||
    !areSameAddress(input.sellerContract, deployments.MultiSourceLoan['3.2'])
  )
    throw new Error('Nested credit purchase requires an Ethereum v3.2 seller loan');
  if (
    ![currencies.USDC_ADDRESS, currencies.WETH_ADDRESS].some((currency) =>
      areSameAddress(currency, input.loanCurrency),
    ) ||
    input.netPrincipal <= 0n ||
    input.price <= 0n
  )
    throw new Error('Invalid buyer credit currency or funding');
  const repayment = sellerMsl.decodeRepaymentCalldata(input.repaymentCalldata);
  const sellerCallback = decodeAbiParameters(
    [PurchaseBundlerV2.EXECUTION_INFO],
    repayment.data.callbackData,
  )[0];
  const native =
    isNativeCurrency(sellerCallback.purchaseCurrency) ||
    areSameAddress(sellerCallback.purchaseCurrency, PurchaseBundlerV2.ETH_SENTINEL);
  const purchaseCurrency = native ? zeroAddress : sellerCallback.purchaseCurrency;
  if (
    !native &&
    ![currencies.USDC_ADDRESS, currencies.WETH_ADDRESS].some((currency) =>
      areSameAddress(currency, purchaseCurrency),
    )
  )
    throw new Error('Unsupported listing currency');
  if (
    sellerCallback.amount <= 0n ||
    sellerCallback.amount > input.price ||
    !sellerCallback.contractMustBeOwner
  )
    throw new Error('The listing price or collateral route changed');
  const buyerBundler = deployments.PurchaseBundler['3.1_PB_V2'];
  const sellerBundler = deployments.PurchaseBundler['3.2'];
  const block = await client.getBlock();
  const deadline = crossCurrencyDeadline({
    now: block.timestamp,
    maturity: repayment.loan.startTime + repayment.loan.duration,
    expirations: input.offerExpirations,
  });
  const slippage = input.slippageBps ?? 100n;
  const requested = input.minimumInitialPayment ?? 0n;
  if (
    slippage < 0n ||
    slippage > BPS ||
    requested < 0n ||
    requested > input.price ||
    input.netPrincipal >= 2n ** 160n
  )
    throw new Error('Invalid purchase spending limits');
  const [buyerPaused, sellerPaused, buyerPair, sellerPair, loanHash] = await Promise.all([
    client.readContract({ address: buyerBundler, abi: readAbi, functionName: 'paused' }),
    client.readContract({ address: sellerBundler, abi: readAbi, functionName: 'paused' }),
    client.readContract({
      address: buyerBundler,
      abi: readAbi,
      functionName: 'getMultiSourceLoanAddress',
    }),
    client.readContract({
      address: sellerBundler,
      abi: readAbi,
      functionName: 'getMultiSourceLoanAddress',
    }),
    sellerMsl.contract.read.getLoanHash([repayment.data.loanId]),
  ]);
  if (
    buyerPaused ||
    sellerPaused ||
    !areSameAddress(buyerPair, deployments.MultiSourceLoan['3.1']) ||
    !areSameAddress(sellerPair, input.sellerContract)
  )
    throw new Error('The nested credit purchase route is not enabled');
  if (loanHash === zeroHash) throw new Error('The seller loan is no longer active');
  const outputCurrency = native ? currencies.WETH_ADDRESS : purchaseCurrency;
  let funded = min(input.price - requested, input.netPrincipal);
  let limit = funded;
  let exactInput = false;
  if (!areSameAddress(input.loanCurrency, outputCurrency)) {
    const path = encodePacked(
      ['address', 'uint24', 'address'],
      [outputCurrency, 500, input.loanCurrency],
    );
    const needed = input.price - requested;
    if (needed > 0n) {
      const quoted = await client.simulateContract({
        address: deployments.UniswapQuoterV2,
        abi: quoterAbi,
        functionName: 'quoteExactOutput',
        args: [path, needed],
      });
      limit = (quoted.result[0] * (BPS + slippage) + BPS - 1n) / BPS;
      funded = needed;
      if (limit > input.netPrincipal) {
        const partial = await client.simulateContract({
          address: deployments.UniswapQuoterV2,
          abi: quoterAbi,
          functionName: 'quoteExactInput',
          args: [
            encodePacked(
              ['address', 'uint24', 'address'],
              [input.loanCurrency, 500, outputCurrency],
            ),
            input.netPrincipal,
          ],
        });
        funded = min(needed, (partial.result[0] * (BPS - slippage)) / BPS);
        limit = input.netPrincipal;
        exactInput = true;
      }
    } else funded = 0n;
  }
  const initialPayment = max(requested, input.price - funded);
  const loanSwapData =
    funded === 0n
      ? '0x'
      : buildCreditPurchaseSwap({
          loanCurrency: input.loanCurrency,
          purchaseCurrency,
          amount: funded,
          limit,
          exactInput,
          deadline,
        });
  const repaymentSwapData = input.repaymentSwapData ?? '0x';
  if (
    !areSameAddress(repayment.loan.principalAddress, sellerCallback.purchaseCurrency) &&
    repaymentSwapData === '0x'
  )
    throw new Error('Seller currency conversion data is required');
  const sellCalldata = encodeFunctionData({
    abi: purchaseBundlerV2ABI,
    functionName: 'executeSell',
    args: [
      [native ? (PurchaseBundlerV2.ETH_SENTINEL as Address) : purchaseCurrency],
      [input.price],
      [repayment.loan.nftCollateralAddress],
      [repayment.loan.nftCollateralTokenId],
      sellerCallback.reservoirExecutionInfo.module,
      [input.repaymentCalldata],
      repaymentSwapData === '0x' ? [] : [repaymentSwapData],
    ],
  });
  const callbackData = encodeAbiParameters(
    [PurchaseBundlerV2.EXECUTION_INFO],
    [
      {
        reservoirExecutionInfo: {
          module: sellerBundler,
          data: sellCalldata,
          value: native ? input.price : 0n,
        },
        contractMustBeOwner: true,
        purchaseCurrency: native ? (PurchaseBundlerV2.ETH_SENTINEL as Address) : purchaseCurrency,
        amount: initialPayment,
        swapData: loanSwapData,
        swapValue: 0n,
        maxSlippage: 0n,
      },
    ],
  );
  const quote = Object.freeze({
    orderId: input.orderId,
    price: input.price,
    buyer: wallet.account.address,
    sellerContract: input.sellerContract,
    sellerBundler,
    buyerBundler,
    loanCurrency: input.loanCurrency,
    purchaseCurrency,
    netPrincipal: input.netPrincipal,
    initialPayment,
    deadline,
    loanId: repayment.data.loanId,
    nftCollateralAddress: repayment.loan.nftCollateralAddress,
    tokenId: repayment.loan.nftCollateralTokenId,
    loanHash,
    repaymentHash: keccak256(input.repaymentCalldata),
    repaymentSwapData,
    loanSwapData,
    callbackData,
  });
  await assertCreditPurchaseRoute(client, quote);
  return quote;
};
