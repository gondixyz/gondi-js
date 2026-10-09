import {
  Address,
  ContractFunctionArgs,
  decodeFunctionData,
  encodeAbiParameters,
  Hex,
  isAddress,
  isHex,
  parseAbi,
  zeroAddress,
} from 'viem';

import type { BuyWithLoanListingQuery } from '@/generated/graphql';
import type { BuyWithLoanInput, BuyWithLoanQuote } from '@/utils/buyWithLoan';
import { BPS } from '@/utils/loan';
import { areSameAddress } from '@/utils/string';

const seaportABI = parseAbi([
  'struct OfferItem { uint8 itemType; address token; uint256 identifierOrCriteria; uint256 startAmount; uint256 endAmount; }',
  'struct ConsiderationItem { uint8 itemType; address token; uint256 identifierOrCriteria; uint256 startAmount; uint256 endAmount; address recipient; }',
  'struct OrderParameters { address offerer; address zone; OfferItem[] offer; ConsiderationItem[] consideration; uint8 orderType; uint256 startTime; uint256 endTime; bytes32 zoneHash; uint256 salt; bytes32 conduitKey; uint256 totalOriginalConsiderationItems; }',
  'struct AdvancedOrder { OrderParameters parameters; uint120 numerator; uint120 denominator; bytes signature; bytes extraData; }',
  'struct CriteriaResolver { uint256 orderIndex; uint8 side; uint256 index; uint256 identifier; bytes32[] criteriaProof; }',
  'struct FulfillmentComponent { uint256 orderIndex; uint256 itemIndex; }',
  'struct Fulfillment { FulfillmentComponent[] offerComponents; FulfillmentComponent[] considerationComponents; }',
  'function matchAdvancedOrders(AdvancedOrder[] orders, CriteriaResolver[] criteriaResolvers, Fulfillment[] fulfillments, address recipient) payable',
]);

type Listing = BuyWithLoanListingQuery['listOrdersV2']['edges'][number]['node'];
type AdvancedOrder = ContractFunctionArgs<
  typeof seaportABI,
  'payable',
  'matchAdvancedOrders'
>[0][number];
type Parameters = AdvancedOrder['parameters'];
const parametersAbi = seaportABI[0].inputs[0].components[0];
const tokenSaleAbi = parseAbi([
  'function buyPunk(uint256 tokenId)',
  'function sellTargetNFT(uint256 tokenId)',
]);

/** Decodes an exact-token sale or verifies both Seaport orders before borrowing. */
export const assertPurchaseMarketplace = (
  listing: Listing,
  quote: Pick<BuyWithLoanQuote, 'buyer' | 'buyerBundler' | 'totalPrice' | 'purchaseCurrency'>,
  input: Pick<BuyWithLoanInput, 'contractAddress' | 'tokenId'>,
  data: Hex,
) => {
  const marketplace = listing.marketPlace
    .replace(/^MarketPlace\./, '')
    .toUpperCase()
    .replaceAll('_', '');
  if (marketplace === 'CRYPTOPUNKS' || marketplace === 'NFTSTRATEGY') {
    if (quote.totalPrice !== listing.price)
      throw new Error('Marketplace fee collection is unsupported for this route');
    const decoded = decodeFunctionData({ abi: tokenSaleAbi, data });
    if (
      decoded.functionName !== (marketplace === 'CRYPTOPUNKS' ? 'buyPunk' : 'sellTargetNFT') ||
      decoded.args[0] !== input.tokenId
    )
      throw new Error('Marketplace collateral changed');
    return marketplace === 'NFTSTRATEGY';
  }
  if (
    !['NATIVE', 'OPENSEA'].includes(marketplace) ||
    listing.__typename !== 'SingleNFTOrder' ||
    !listing.evmOrder
  )
    throw new Error('Unsupported purchase marketplace');
  const decoded = decodeFunctionData({ abi: seaportABI, data });
  if (decoded.functionName !== 'matchAdvancedOrders')
    throw new Error('Unexpected marketplace execution');
  const [orders, criteria, , recipient] = decoded.args;
  if (orders.length !== 2 || criteria.length || !areSameAddress(recipient, zeroAddress))
    throw new Error('Unexpected marketplace order count or recipient');
  const [ask, bid] = orders;
  const expectedAsk = parseSeaportParameters(listing.evmOrder);
  if (
    encodeAbiParameters([parametersAbi], [ask.parameters]) !==
      encodeAbiParameters([parametersAbi], [expectedAsk]) ||
    ask.signature !== listing.signature ||
    ask.numerator !== 1n ||
    ask.denominator !== 1n ||
    expectedAsk.offer.length !== 1 ||
    expectedAsk.offer[0].itemType !== 2 ||
    !areSameAddress(expectedAsk.offer[0].token, input.contractAddress) ||
    expectedAsk.offer[0].identifierOrCriteria !== input.tokenId
  )
    throw new Error('Marketplace seller authorization or collateral changed');
  const currencyType = areSameAddress(quote.purchaseCurrency, zeroAddress) ? 0 : 1;
  const isPayment = (item: Parameters['offer'][number]) =>
    item.itemType === currencyType &&
    areSameAddress(item.token, quote.purchaseCurrency) &&
    item.identifierOrCriteria === 0n &&
    item.startAmount === item.endAmount;
  const expectedFees = listing.platformFees.map((fee) => ({
    itemType: currencyType,
    token: quote.purchaseCurrency,
    identifierOrCriteria: 0n,
    startAmount: (listing.price * fee.bps) / BPS,
    endAmount: (listing.price * fee.bps) / BPS,
    recipient: fee.beneficiary,
  }));
  const nft = expectedAsk.offer[0];
  const privateRecipient = expectedAsk.consideration.find((item) => item.itemType === 2);
  if (privateRecipient && !areSameAddress(privateRecipient.recipient, quote.buyer))
    throw new Error('Private listing cannot deliver to this buyer');
  const expectedConsideration = [
    ...(privateRecipient ? [] : [{ ...nft, recipient: quote.buyerBundler }]),
    ...expectedFees,
  ];
  const counter = bid.parameters;
  if (
    bid.numerator !== 1n ||
    bid.denominator !== 1n ||
    bid.signature !== '0x' ||
    !areSameAddress(counter.offerer, quote.buyerBundler) ||
    !areSameAddress(counter.zone, zeroAddress) ||
    counter.orderType !== 0 ||
    counter.offer.length !== 1 ||
    !isPayment(counter.offer[0]) ||
    counter.offer[0].startAmount !== quote.totalPrice ||
    encodeAbiParameters(
      [parametersAbi],
      [
        {
          ...counter,
          consideration: expectedConsideration,
          totalOriginalConsiderationItems: BigInt(expectedConsideration.length),
        },
      ],
    ) !== encodeAbiParameters([parametersAbi], [counter]) ||
    expectedAsk.consideration
      .filter((item) => item.itemType < 2)
      .some((item) => !isPayment(item)) ||
    expectedAsk.consideration
      .filter((item) => item.itemType < 2)
      .reduce((sum, item) => sum + item.startAmount, 0n) !== listing.price
  )
    throw new Error('Marketplace payment, fee recipients or NFT recipient changed');
  return !privateRecipient;
};

/** Parses the API's JSON order once, into the exact Seaport ABI shape. */
const parseSeaportParameters = (value: object): Parameters => {
  const record = value as Record<string, unknown>;
  const offer = parseItems(record.offer);
  const consideration = parseItems(record.consideration).map((item, index) => ({
    ...item,
    recipient: address((record.consideration as Record<string, unknown>[])[index].recipient),
  }));
  return {
    offerer: address(record.offerer),
    zone: address(record.zone),
    offer,
    consideration,
    orderType: Number(integer(record.orderType)),
    startTime: integer(record.startTime),
    endTime: integer(record.endTime),
    zoneHash: hash(record.zoneHash),
    salt: integer(record.salt),
    conduitKey: hash(record.conduitKey),
    totalOriginalConsiderationItems: BigInt(consideration.length),
  };
};
const parseItems = (value: unknown): Parameters['offer'] => {
  if (!Array.isArray(value)) throw new Error('Invalid marketplace items');
  return value.map((value: unknown) => {
    if (!value || typeof value !== 'object') throw new Error('Invalid marketplace item');
    const item = value as Record<string, unknown>;
    return {
      itemType: Number(integer(item.itemType)),
      token: address(item.token),
      identifierOrCriteria: integer(item.identifierOrCriteria),
      startAmount: integer(item.startAmount),
      endAmount: integer(item.endAmount),
    };
  });
};
const integer = (value: unknown): bigint => {
  if (
    (typeof value !== 'string' || !/^(0x[\da-f]+|\d+)$/i.test(value)) &&
    typeof value !== 'bigint' &&
    !(typeof value === 'number' && Number.isSafeInteger(value))
  )
    throw new Error('Invalid marketplace integer');
  const parsed = BigInt(value as string | number | bigint);
  if (parsed < 0n) throw new Error('Invalid marketplace integer');
  return parsed;
};
const address = (value: unknown): Address => {
  if (typeof value !== 'string' || !isAddress(value, { strict: false }))
    throw new Error('Invalid marketplace address');
  return value;
};
const hash = (value: unknown): Hex => {
  if (typeof value !== 'string' || !isHex(value) || value.length !== 66)
    throw new Error('Invalid marketplace hash');
  return value;
};
