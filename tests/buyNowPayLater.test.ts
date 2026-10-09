import { beforeEach, expect, mock, test } from 'bun:test';
import { encodeFunctionData, keccak256, zeroAddress } from 'viem';
import { mainnet } from 'viem/chains';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Gondi } = await import('@/gondi');
import { getContracts, getCurrencies } from '@/deploys';
import { MslV6 } from '@/clients/contracts/MslV6';
import { multiSourceLoanAbi } from '@/generated/blockchain/v7';
import { CreditPurchaseQuote } from '@/utils/creditPurchase';

const deployments = getContracts(mainnet);
const { USDC_ADDRESS } = getCurrencies(mainnet);
const buyer = '0x0000000000000000000000000000000000000001';
const defaultPublish = async () => ({
  __typename: 'BuyNowPayLaterOrder',
  price: 100n,
  currencyAddress: USDC_ADDRESS,
  emitCalldata: '0x1234',
});
const publish = mock(defaultPublish);
const buy = mock(async () => ({ txHash: '0xtx' }));
const executeSellWithLoan = mock(async () => ({ txHash: '0xtx' }));
const PurchaseBundler = mock(() => ({ buy, executeSellWithLoan }));
const defaultReadContract =
  ({ allowance = 10n } = {}) =>
  async ({ functionName }: { functionName: string }) =>
    functionName === 'allowance'
      ? allowance
      : functionName === 'getTaxes'
        ? { buyTax: 0n, sellTax: 0n }
        : true;
const readContract = mock(defaultReadContract());
const signExecutionData = mock(async () => '0x12');
const signTypedData = mock(async () => '0x12');
const sellerMsl = Object.assign(Object.create(MslV6.prototype), {
  contract: { read: { getLoanHash: async () => '0x' + '11'.repeat(32) } },
  signExecutionData,
});
const gondi = Object.assign(Object.create(Gondi.prototype) as InstanceType<typeof Gondi>, {
  wallet: { account: { address: buyer }, chain: mainnet, signTypedData },
  bcClient: { getBlock: async () => ({ timestamp: 100n }), readContract },
  apiClient: { publishBuyNowPayLaterOrder: publish },
  contracts: {
    PurchaseBundler,
    Msl: () => sellerMsl,
  },
});
const quote = {
  buyer,
  orderId: 1,
  price: 100n,
  buyerBundler: deployments.PurchaseBundler['3.1_PB_V2'],
  sellerContract: deployments.MultiSourceLoan['3.2'],
  sellerBundler: deployments.PurchaseBundler['3.2'],
  loanCurrency: USDC_ADDRESS,
  purchaseCurrency: USDC_ADDRESS,
  netPrincipal: 90n,
  initialPayment: 10n,
  deadline: 200n,
  loanId: 1n,
  nftCollateralAddress: buyer,
  tokenId: 1n,
  loanHash: '0x' + '11'.repeat(32),
  repaymentHash: keccak256('0x1234'),
  loanSwapData: '0x',
  repaymentSwapData: '0x',
  callbackData: '0x',
} as CreditPurchaseQuote;
const args = {
  amounts: [90n],
  contractAddress: buyer,
  loanDuration: 30n,
  offers: [
    {
      id: 'offer',
      offerId: 1n,
      lenderAddress: buyer,
      capacity: 0n,
      nftCollateralAddress: buyer,
      nftCollateralTokenId: 1n,
      aprBps: 100n,
      expirationTime: 500n,
      duration: 100n,
      offerValidators: [],
      maxSeniorRepayment: 0n,
      signature: '0x12',
      contractAddress: deployments.MultiSourceLoan['3.1'],
      principalAddress: USDC_ADDRESS,
      principalAmount: 90n,
      fee: 0n,
    },
  ],
  tokenId: 1n,
  repaymentCalldata: '0x1234',
  purchaseBundlerAddress: deployments.PurchaseBundler['3.2'],
} as Parameters<InstanceType<typeof Gondi>['buyNowPayLater']>[0];
beforeEach(() => {
  publish.mockReset();
  publish.mockImplementation(defaultPublish);
  signExecutionData.mockClear();
  signTypedData.mockClear();
  readContract.mockImplementation(defaultReadContract());
  buy.mockClear();
  executeSellWithLoan.mockClear();
  PurchaseBundler.mockClear();
});
test('rejects protected buyer credit before publishing or signing', async () => {
  await expect(
    gondi.buyNowPayLater({
      ...args,
      offers: [{ ...args.offers[0], contractAddress: deployments.MultiSourceLoan['3.2'] }],
      creditPurchaseQuote: quote,
    }),
  ).rejects.toThrow('v3.1 buyer');
  expect(publish).not.toHaveBeenCalled();
});
test('rejects changed funding before publishing', async () => {
  await expect(
    gondi.buyNowPayLater({ ...args, creditPurchaseQuote: { ...quote, netPrincipal: 89n } }),
  ).rejects.toThrow('funding');
  expect(publish).not.toHaveBeenCalled();
});
test('keeps the legacy flash route when no opt-in quote is supplied', async () => {
  await gondi.buyNowPayLater(args);
  expect(executeSellWithLoan).toHaveBeenCalled();
  expect(buy).not.toHaveBeenCalled();
});

const confirmedExecution = {
  offerExecution: args.offers.map((offer, index) => ({
    offer: {
      ...offer,
      lender: offer.lenderAddress,
      validators: offer.offerValidators,
      maxSeniorRepayment: offer.maxSeniorRepayment ?? 0n,
    },
    amount: args.amounts[index],
    lenderOfferSignature: offer.signature,
  })),
  loanId: 0n,
  nftCollateralAddress: args.contractAddress,
  tokenId: args.tokenId,
  duration: args.loanDuration,
  expirationTime: quote.deadline,
  principalReceiver: quote.buyerBundler,
  callbackData: quote.callbackData,
};
const published = (
  executionData = confirmedExecution,
  borrower = buyer,
  currencyAddress = USDC_ADDRESS,
) => ({
  __typename: 'BuyNowPayLaterOrder',
  price: quote.price,
  currencyAddress,
  emitCalldata: encodeFunctionData({
    abi: multiSourceLoanAbi,
    functionName: 'emitLoan',
    args: [{ executionData, borrower, borrowerOfferSignature: '0x12' }],
  } as never),
});
for (const mutation of [{ callbackData: '0xab' }, { principalReceiver: buyer }]) {
  test(`rejects changed ${Object.keys(mutation)[0]} before signing API terms`, async () => {
    publish.mockResolvedValueOnce({
      __typename: 'SignatureRequest',
      key: 'emitSignature',
      typedData: { message: { ...confirmedExecution, ...mutation } },
    } as never);
    await expect(gondi.buyNowPayLater({ ...args, creditPurchaseQuote: quote })).rejects.toThrow(
      'confirmed',
    );
    expect(signExecutionData).not.toHaveBeenCalled();
    expect(signTypedData).not.toHaveBeenCalled();
    expect(buy).not.toHaveBeenCalled();
  });
}
test('rejects a non-loan signature request before signing', async () => {
  publish.mockResolvedValueOnce({
    __typename: 'SignatureRequest',
    key: 'signature',
    typedData: { message: confirmedExecution },
  } as never);
  await expect(gondi.buyNowPayLater({ ...args, creditPurchaseQuote: quote })).rejects.toThrow(
    'confirmed',
  );
  expect(signExecutionData).not.toHaveBeenCalled();
  expect(signTypedData).not.toHaveBeenCalled();
});
for (const [name, execution, borrower] of [
  ['duration', { ...confirmedExecution, duration: 31n }, buyer],
  ['borrower', confirmedExecution, zeroAddress],
] as const) {
  test(`rejects published calldata with changed ${name} before buying`, async () => {
    publish.mockResolvedValueOnce(published(execution as never, borrower) as never);
    await expect(gondi.buyNowPayLater({ ...args, creditPurchaseQuote: quote })).rejects.toThrow(
      'confirmed',
    );
    expect(buy).not.toHaveBeenCalled();
  });
}
for (const currencyAddress of [USDC_ADDRESS, zeroAddress]) {
  test(`executes confirmed ${currencyAddress === zeroAddress ? 'native' : 'ERC20'} payment with the exact transaction value`, async () => {
    publish.mockResolvedValueOnce({
      __typename: 'SignatureRequest',
      key: 'emitSignature',
      typedData: { message: confirmedExecution },
    } as never);
    const order = published(confirmedExecution, buyer, currencyAddress);
    publish.mockResolvedValueOnce(order as never);
    await gondi.buyNowPayLater({
      ...args,
      creditPurchaseQuote: { ...quote, purchaseCurrency: currencyAddress },
    });
    expect(signExecutionData).toHaveBeenCalledWith({ structToSign: confirmedExecution });
    expect(signTypedData).not.toHaveBeenCalled();
    expect(buy).toHaveBeenCalledWith({
      emitCalldata: order.emitCalldata,
      value: currencyAddress === zeroAddress ? quote.initialPayment : 0n,
    });
  });
}
test('rejects an allowance larger than the confirmed spending cap', async () => {
  readContract.mockImplementation(defaultReadContract({ allowance: 11n }));
  await expect(gondi.buyNowPayLater({ ...args, creditPurchaseQuote: quote })).rejects.toThrow(
    'exactly',
  );
  expect(publish).not.toHaveBeenCalled();
});
