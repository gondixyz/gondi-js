import { expect, mock, test } from 'bun:test';
mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
import {
  decodeAbiParameters,
  decodeFunctionData,
  encodeAbiParameters,
  encodeFunctionData,
  parseAbi,
  zeroAddress,
} from 'viem';
import { mainnet } from 'viem/chains';

import { MslV6 } from '@/clients/contracts/MslV6';
import { PurchaseBundlerV2 } from '@/clients/contracts/PurchaseBundlerV2';
import { getContracts, getCurrencies } from '@/deploys';
import { multiSourceLoanAbi } from '@/generated/blockchain/v7';
const { Gondi } = await import('@/gondi');

const deployments = getContracts(mainnet);
const { USDC_ADDRESS } = getCurrencies(mainnet);
const buyer = '0x0000000000000000000000000000000000000001';
const nft = '0x0000000000000000000000000000000000000002';
const marketplace = '0x0000000000000000000000000000000000000003';
const offer = {
  id: 'offer',
  contractAddress: deployments.MultiSourceLoan['3.1'],
  offerId: 1n,
  lenderAddress: buyer,
  capacity: 2_000_000_000n,
  nftCollateralAddress: nft,
  nftCollateralTokenId: 1n,
  principalAddress: USDC_ADDRESS,
  principalAmount: 2_000_000_000n,
  duration: 1000n,
  expirationTime: 1000n,
  aprBps: 100n,
  fee: 0n,
  maxSeniorRepayment: 0n,
  offerValidators: [],
  signature: '0x12',
};
const args = {
  orderId: 1,
  contractAddress: nft,
  tokenId: 1n,
  loanDuration: 100n,
  amounts: [2_000_000_000n],
  offers: [offer],
};
const sign = mock(async () => {
  throw new Error('Quote must not sign');
});
const listing = {
  __typename: 'SingleNFTOrder',
  id: '1',
  price: 10n ** 18n,
  currencyAddress: zeroAddress,
  status: 'OrderStatus.Active',
  isAsk: true,
  expiration: new Date(1000 * 1000),
  maker: buyer,
  taker: zeroAddress,
  marketPlace: 'NftStrategy',
  marketPlaceAddress: marketplace,
  platformFees: [],
  nft: {
    tokenId: 1n,
    collection: { contractData: { contractAddress: nft, blockchain: 'ethereum' } },
  },
};
const buyerMsl = Object.assign(Object.create(MslV6.prototype) as MslV6, {
  address: deployments.MultiSourceLoan['3.1'],
  version: '3.1',
  wallet: { chain: mainnet, account: { address: buyer } },
});
const prepare = async (input: {
  creditPurchaseExecution: {
    initialPayment: bigint;
    loanSwapData: `0x${string}`;
    expirationTime: bigint;
  };
}) => {
  const consent = input.creditPurchaseExecution;
  const callbackData = encodeAbiParameters(
    [PurchaseBundlerV2.EXECUTION_INFO],
    [
      {
        reservoirExecutionInfo: {
          module: marketplace,
          data: encodeFunctionData({
            abi: parseAbi(['function sellTargetNFT(uint256)']),
            functionName: 'sellTargetNFT',
            args: [1n],
          }),
          value: listing.currencyAddress === zeroAddress ? listing.price : 0n,
        },
        contractMustBeOwner: true,
        purchaseCurrency:
          listing.currencyAddress === zeroAddress
            ? (PurchaseBundlerV2.ETH_SENTINEL as `0x${string}`)
            : listing.currencyAddress,
        amount: consent.initialPayment,
        swapData: consent.loanSwapData,
        swapValue: 0n,
        maxSlippage: 0n,
      },
    ],
  );
  return {
    __typename: 'SignatureRequest',
    key: 'emitSignature',
    typedData: {
      ...buyerMsl.getExecutionTypedData({
        offerExecution: [
          {
            offer: { ...offer, lender: buyer, validators: [] },
            amount: args.amounts[0],
            lenderOfferSignature: offer.signature,
          },
        ],
        loanId: 0n,
        nftCollateralAddress: nft,
        tokenId: 1n,
        duration: 100n,
        expirationTime: consent.expirationTime,
        principalReceiver: deployments.PurchaseBundler['3.1_PB_V2'],
        callbackData,
      } as never),
    },
  };
};
const publish = mock(prepare);
const listingRequest = mock(async () => ({ listOrdersV2: { edges: [{ node: listing }] } }));
const gondi = Object.assign(Object.create(Gondi.prototype) as Gondi, {
  wallet: { chain: mainnet, account: { address: buyer }, signTypedData: sign },
  apiClient: {
    api: { buyWithLoanListing: listingRequest },
    publishBuyNowPayLaterOrder: publish,
  },
  contracts: { Msl: () => buyerMsl },
  bcClient: {
    getBlock: async () => ({ timestamp: 100n }),
    readContract: async ({ functionName }: { functionName: string }) =>
      functionName === 'getMultiSourceLoanAddress'
        ? deployments.MultiSourceLoan['3.1']
        : functionName === 'paused'
          ? false
          : functionName === 'getTaxes'
            ? { buyTax: 0n, sellTax: 0n }
            : functionName === 'allowance'
              ? 10n ** 30n
              : true,
    simulateContract: async ({ functionName }: { functionName: string }) => ({
      result: [functionName === 'quoteExactOutput' ? 3_000_000_000n : 500_000_000_000_000_000n],
    }),
  },
});

test('prepares unsigned opposite-currency ordinary execution with a listing-unit contribution', async () => {
  const quote = await gondi.quoteBuyWithLoan(args as never);
  expect([quote.route, quote.initialPayment, quote.loanCurrency]).toEqual([
    'ordinary',
    505_000_000_000_000_000n,
    USDC_ADDRESS,
  ]);
  expect(sign).not.toHaveBeenCalled();
  expect(listingRequest).toHaveBeenLastCalledWith(
    { orderId: 1, buyer },
    { fetchPolicy: 'no-cache' },
  );
});

test('does not publish buyer authorization when quote preparation returns an active order', async () => {
  publish.mockImplementationOnce(async () => ({ __typename: 'BuyNowPayLaterOrder' }) as never);
  await expect(gondi.quoteBuyWithLoan(args as never)).rejects.toThrow('unsigned');
  expect(sign).not.toHaveBeenCalled();
});

for (const field of ['duration', 'principalReceiver', 'nftCollateralAddress', 'domain']) {
  test(`refuses substituted ${field} before asking the borrower to sign`, async () => {
    publish.mockImplementationOnce(async (input) => {
      const response = await prepare(input);
      if (field === 'domain')
        response.typedData.domain = { ...response.typedData.domain, chainId: 31337 };
      else
        response.typedData.message = {
          ...response.typedData.message,
          [field]: field === 'duration' ? 99n : marketplace,
        };
      return response;
    });
    await expect(gondi.quoteBuyWithLoan(args as never)).rejects.toThrow();
    expect(sign).not.toHaveBeenCalled();
  });
}

test('rejects marketplace calldata for a different NFT before any signature', async () => {
  publish.mockImplementationOnce(async (input) => {
    const response = await prepare(input);
    const callback = decodeAbiParameters(
      [PurchaseBundlerV2.EXECUTION_INFO],
      response.typedData.message.callbackData,
    )[0];
    response.typedData.message.callbackData = encodeAbiParameters(
      [PurchaseBundlerV2.EXECUTION_INFO],
      [
        {
          ...callback,
          reservoirExecutionInfo: {
            ...callback.reservoirExecutionInfo,
            data: encodeFunctionData({
              abi: parseAbi(['function sellTargetNFT(uint256)']),
              functionName: 'sellTargetNFT',
              args: [2n],
            }),
          },
        },
      ],
    );
    return response;
  });
  await expect(gondi.quoteBuyWithLoan(args as never)).rejects.toThrow('collateral');
  expect(sign).not.toHaveBeenCalled();
});

test('refuses protected v3.2 buyer offers', async () => {
  await expect(
    gondi.quoteBuyWithLoan({
      ...args,
      offers: [{ ...offer, contractAddress: deployments.MultiSourceLoan['3.2'] }],
    } as never),
  ).rejects.toThrow('v3.1');
});

const buyerExecutionResponse = (
  quote: Awaited<ReturnType<Gondi['quoteBuyWithLoan']>>,
  tokenId = quote.execution.tokenId,
) => ({
  __typename: 'BuyNowPayLaterOrder',
  price: quote.totalPrice,
  currencyAddress: quote.purchaseCurrency,
  emitCalldata: encodeFunctionData({
    abi: multiSourceLoanAbi,
    functionName: 'emitLoan',
    args: [
      {
        executionData: { ...quote.execution, tokenId },
        borrower: buyer,
        borrowerOfferSignature: '0x12',
      },
    ],
  }),
});

test('refuses substituted emitted collateral after publication without broadcasting', async () => {
  const quote = await gondi.quoteBuyWithLoan(args as never);
  const broadcast = mock(async () => {
    throw new Error('Must not broadcast');
  });
  Object.assign(buyerMsl, { signExecutionData: async () => '0x12' });
  Object.assign(gondi.contracts, { PurchaseBundler: () => ({ buy: broadcast }) });
  publish
    .mockImplementationOnce(prepare)
    .mockImplementationOnce(async () => buyerExecutionResponse(quote, 2n) as never);
  try {
    await expect(
      gondi.buyNowPayLater({ ...args, buyWithLoanQuote: quote } as never),
    ).rejects.toThrow('execution');
    expect(broadcast).not.toHaveBeenCalled();
  } finally {
    delete (buyerMsl as unknown as { signExecutionData?: unknown }).signExecutionData;
  }
});

test('checks exact allowances again after the wallet signature', async () => {
  const originalCurrency = listing.currencyAddress;
  const originalPrice = listing.price;
  const originalRead = gondi.bcClient.readContract;
  const broadcast = mock(async () => {
    throw new Error('Must not broadcast');
  });
  let signed = false;
  listing.currencyAddress = USDC_ADDRESS;
  listing.price = 1_000_000_000n;
  Object.assign(gondi.bcClient, {
    readContract: async (input: { functionName: string }) =>
      input.functionName === 'allowance' ? (signed ? 1n : 0n) : originalRead(input as never),
  });
  Object.assign(buyerMsl, {
    signExecutionData: async () => {
      signed = true;
      return '0x12';
    },
  });
  Object.assign(gondi.contracts, { PurchaseBundler: () => ({ buy: broadcast }) });
  try {
    const quote = await gondi.quoteBuyWithLoan(args as never);
    publish
      .mockImplementationOnce(prepare)
      .mockImplementationOnce(async () => buyerExecutionResponse(quote) as never);
    await expect(
      gondi.buyNowPayLater({ ...args, buyWithLoanQuote: quote } as never),
    ).rejects.toThrow('exactly');
    expect(signed).toBe(true);
    expect(broadcast).not.toHaveBeenCalled();
  } finally {
    listing.currencyAddress = originalCurrency;
    listing.price = originalPrice;
    Object.assign(gondi.bcClient, { readContract: originalRead });
    delete (buyerMsl as unknown as { signExecutionData?: unknown }).signExecutionData;
  }
});

test('reports the nested buyer swap budget instead of zero', async () => {
  const originalListing = { ...listing };
  const loanHash = ('0x' + '11'.repeat(32)) as `0x${string}`;
  const prepared = await prepare({
    creditPurchaseExecution: { initialPayment: 0n, loanSwapData: '0xab', expirationTime: 500n },
  });
  const creditQuote = {
    orderId: 1,
    price: listing.price,
    buyer,
    sellerContract: deployments.MultiSourceLoan['3.2'],
    sellerBundler: deployments.PurchaseBundler['3.2'],
    buyerBundler: deployments.PurchaseBundler['3.1_PB_V2'],
    loanCurrency: USDC_ADDRESS,
    purchaseCurrency: zeroAddress,
    netPrincipal: 2_000_000_000n,
    inputAmount: 1_617_000_000n,
    initialPayment: 0n,
    deadline: 500n,
    loanId: 1n,
    nftCollateralAddress: nft,
    tokenId: 1n,
    loanHash,
    repaymentHash: loanHash,
    repaymentSwapData: '0x',
    loanSwapData: '0xab',
    callbackData: prepared.typedData.message.callbackData,
  };
  Object.assign(listing, {
    __typename: 'SellAndRepayOrder',
    loan: {
      address: deployments.MultiSourceLoan['3.2'],
      loanId: '1',
      startTime: new Date(0),
      duration: 1000n,
    },
    repaymentCalldata: '0xab',
  });
  Object.assign(buyerMsl, { contract: { read: { getLoanHash: async () => loanHash } } });
  Object.assign(gondi, { quoteCreditPurchase: async () => creditQuote });
  try {
    const quote = await gondi.quoteBuyWithLoan(args as never);
    expect([quote.route, quote.inputAmount]).toEqual(['nested', 1_617_000_000n]);
    expect(sign).not.toHaveBeenCalled();
  } finally {
    Object.assign(listing, originalListing);
    delete (listing as unknown as { loan?: unknown; repaymentCalldata?: unknown }).loan;
    delete (listing as unknown as { repaymentCalldata?: unknown }).repaymentCalldata;
    delete (gondi as unknown as { quoteCreditPurchase?: unknown }).quoteCreditPurchase;
    delete (buyerMsl as unknown as { contract?: unknown }).contract;
  }
});

type Quote = Awaited<ReturnType<Gondi['quoteBuyWithLoan']>>;
type Callback = ReturnType<
  typeof decodeAbiParameters<[typeof PurchaseBundlerV2.EXECUTION_INFO]>
>[0];
type Prepared = Awaited<ReturnType<typeof prepare>>;

/** Prepares the canonical buyer execution with `change` applied to its marketplace callback. */
const prepareWithCallback =
  (change: (callback: Callback) => Partial<Callback>) =>
  async (input: Parameters<typeof prepare>[0]) => {
    const response = await prepare(input);
    const callback = decodeAbiParameters(
      [PurchaseBundlerV2.EXECUTION_INFO],
      response.typedData.message.callbackData,
    )[0];
    response.typedData.message.callbackData = encodeAbiParameters(
      [PurchaseBundlerV2.EXECUTION_INFO],
      [{ ...callback, ...change(callback) }],
    );
    return response;
  };

/** Serves every contract read from the shared mock except `paused`, which reads `isPaused`. */
const readPausedFrom = (isPaused: () => boolean) => {
  const originalRead = gondi.bcClient.readContract;
  Object.assign(gondi.bcClient, {
    readContract: async (input: { functionName: string }) =>
      input.functionName === 'paused' ? isPaused() : originalRead(input as never),
  });
  return () => Object.assign(gondi.bcClient, { readContract: originalRead });
};

for (const [guard, message, change] of [
  [
    'a listing for another token',
    'Purchase collateral changed',
    () => Object.assign(listing.nft, { tokenId: 2n }),
  ],
  [
    'a listing that is no longer active',
    'The selected listing is no longer available',
    () => Object.assign(listing, { status: 'OrderStatus.Cancelled' }),
  ],
] as const) {
  test(`refuses ${guard} before asking the borrower to sign`, async () => {
    const originalListing = { ...listing, nft: { ...listing.nft } };
    change();
    try {
      await expect(gondi.quoteBuyWithLoan(args as never)).rejects.toThrow(message);
      expect(sign).not.toHaveBeenCalled();
    } finally {
      Object.assign(listing, originalListing);
    }
  });
}

for (const [guard, message, change] of [
  [
    'a marketplace callback that spends more than the quoted contribution',
    'Marketplace execution differs from the quoted spending limits',
    (callback: Callback) => ({ amount: callback.amount + 1n }),
  ],
  [
    'a marketplace callback that drops the bundler custody requirement',
    'Marketplace custody authorization changed',
    () => ({ contractMustBeOwner: false }),
  ],
] as const) {
  test(`refuses ${guard} before asking the borrower to sign`, async () => {
    publish.mockImplementationOnce(prepareWithCallback(change));
    await expect(gondi.quoteBuyWithLoan(args as never)).rejects.toThrow(message);
    expect(sign).not.toHaveBeenCalled();
  });
}

test('refuses a paused buyer bundler before asking the borrower to sign', async () => {
  const restoreRead = readPausedFrom(() => true);
  try {
    await expect(gondi.quoteBuyWithLoan(args as never)).rejects.toThrow(
      'Purchase route changed or expired',
    );
    expect(sign).not.toHaveBeenCalled();
  } finally {
    restoreRead();
  }
});

const signExecution = mock(async () => '0x12');
const broadcast = mock(async () => {
  throw new Error('Must not broadcast');
});

/**
 * Confirms `quote` through `buyNowPayLater`, serving the pre-signature preparation from `prepared`
 * and the post-signature publication from `published`, with signing and broadcasting stubbed.
 */
const confirmPurchase = async (
  quote: Quote,
  {
    prepared = prepare,
    published = () => buyerExecutionResponse(quote),
  }: {
    prepared?: (input: Parameters<typeof prepare>[0]) => Promise<Prepared>;
    published?: () => object;
  } = {},
) => {
  signExecution.mockClear();
  broadcast.mockClear();
  let publications = 0;
  publish.mockImplementation(async (input) =>
    ++publications === 1 ? prepared(input) : (published() as never),
  );
  Object.assign(buyerMsl, { signExecutionData: signExecution });
  Object.assign(gondi.contracts, { PurchaseBundler: () => ({ buy: broadcast }) });
  try {
    return await gondi.buyNowPayLater({ ...args, buyWithLoanQuote: quote } as never);
  } finally {
    publish.mockImplementation(prepare);
    delete (buyerMsl as unknown as { signExecutionData?: unknown }).signExecutionData;
  }
};

test('refuses a confirmed quote whose execution was altered before signing', async () => {
  const quote = await gondi.quoteBuyWithLoan(args as never);
  await expect(
    confirmPurchase(
      { ...quote, execution: { ...quote.execution, duration: 99n } },
      {
        published: () => buyerExecutionResponse(quote),
      },
    ),
  ).rejects.toThrow('API execution differs from the confirmed purchase quote');
  expect(signExecution).not.toHaveBeenCalled();
  expect(broadcast).not.toHaveBeenCalled();
});

test('refuses a substituted authorization prepared at confirmation before signing', async () => {
  const quote = await gondi.quoteBuyWithLoan(args as never);
  await expect(
    confirmPurchase(quote, {
      prepared: async (input) => {
        const response = await prepare(input);
        response.typedData.message = { ...response.typedData.message, duration: 99n };
        return response;
      },
    }),
  ).rejects.toThrow('API execution differs from the confirmed purchase quote');
  expect(signExecution).not.toHaveBeenCalled();
  expect(broadcast).not.toHaveBeenCalled();
});

test('rechecks the route after confirmation preparation and before signing', async () => {
  const quote = await gondi.quoteBuyWithLoan(args as never);
  let paused = false;
  const restoreRead = readPausedFrom(() => paused);
  try {
    await expect(
      confirmPurchase(quote, {
        prepared: async (input) => {
          paused = true;
          return prepare(input);
        },
      }),
    ).rejects.toThrow('Purchase route changed or expired');
    expect(signExecution).not.toHaveBeenCalled();
    expect(broadcast).not.toHaveBeenCalled();
  } finally {
    restoreRead();
  }
});

test('rechecks the route after publication and before broadcasting', async () => {
  const quote = await gondi.quoteBuyWithLoan(args as never);
  let paused = false;
  const restoreRead = readPausedFrom(() => paused);
  try {
    await expect(
      confirmPurchase(quote, {
        published: () => {
          paused = true;
          return buyerExecutionResponse(quote);
        },
      }),
    ).rejects.toThrow('Purchase route changed or expired');
    expect(signExecution).toHaveBeenCalled();
    expect(broadcast).not.toHaveBeenCalled();
  } finally {
    restoreRead();
  }
});

for (const [guard, message, change] of [
  [
    'a published price other than the quoted total',
    'Published purchase terms changed',
    (response: ReturnType<typeof buyerExecutionResponse>) => ({
      ...response,
      price: response.price + 1n,
    }),
  ],
  [
    'a published loan for another borrower',
    'Unexpected buyer execution',
    (response: ReturnType<typeof buyerExecutionResponse>) => {
      const { args: emitted } = decodeFunctionData({
        abi: multiSourceLoanAbi,
        data: response.emitCalldata,
      }) as { args: readonly [{ borrower: `0x${string}` }] };
      return {
        ...response,
        emitCalldata: encodeFunctionData({
          abi: multiSourceLoanAbi,
          functionName: 'emitLoan',
          args: [{ ...emitted[0], borrower: nft } as never],
        }),
      };
    },
  ],
] as const) {
  test(`refuses ${guard} without broadcasting`, async () => {
    const quote = await gondi.quoteBuyWithLoan(args as never);
    await expect(
      confirmPurchase(quote, { published: () => change(buyerExecutionResponse(quote)) }),
    ).rejects.toThrow(message);
    expect(broadcast).not.toHaveBeenCalled();
  });
}
