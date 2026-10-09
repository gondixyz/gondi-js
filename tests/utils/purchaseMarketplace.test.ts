import { expect, test } from 'bun:test';
import { encodeFunctionData, parseAbi } from 'viem';
import { assertPurchaseMarketplace } from '@/utils/purchaseMarketplace';
const address = '0x0000000000000000000000000000000000000001';
const listing = {
  marketPlace: 'CryptoPunks',
  marketPlaceAddress: address,
  price: 100n,
  currencyAddress: address,
};
const quote = {
  buyer: address,
  buyerBundler: address,
  totalPrice: 100n,
  purchaseCurrency: address,
};
const input = { contractAddress: address, tokenId: 7n };
const abi = parseAbi(['function buyPunk(uint256)']);
test('accepts only the selected CryptoPunk marketplace token', () => {
  expect(() =>
    assertPurchaseMarketplace(
      listing as never,
      quote as never,
      input,
      encodeFunctionData({ abi, functionName: 'buyPunk', args: [7n] }),
    ),
  ).not.toThrow();
  expect(() =>
    assertPurchaseMarketplace(
      listing as never,
      quote as never,
      input,
      encodeFunctionData({ abi, functionName: 'buyPunk', args: [8n] }),
    ),
  ).toThrow('collateral');
});
test('rejects unrelated marketplace functions before borrower authorization', () => {
  expect(() =>
    assertPurchaseMarketplace(listing as never, quote as never, input, '0x12345678'),
  ).toThrow();
});

import { seaportABI } from '@/generated/blockchain/seaport';
import { zeroAddress, zeroHash } from 'viem';
const currency = '0x0000000000000000000000000000000000000002';
const nft = {
  itemType: 2,
  token: address,
  identifierOrCriteria: 7n,
  startAmount: 1n,
  endAmount: 1n,
};
const payment = {
  itemType: 1,
  token: currency,
  identifierOrCriteria: 0n,
  startAmount: 100n,
  endAmount: 100n,
};
const sellerParameters = {
  offerer: address,
  zone: zeroAddress,
  offer: [nft],
  consideration: [{ ...payment, recipient: address }],
  orderType: 0,
  startTime: 0n,
  endTime: 1000n,
  zoneHash: zeroHash,
  salt: 1n,
  conduitKey: zeroHash,
  totalOriginalConsiderationItems: 1n,
};
const buyerParameters = {
  ...sellerParameters,
  offer: [payment],
  consideration: [{ ...nft, recipient: address }],
};
const seaportListing = {
  ...listing,
  __typename: 'SingleNFTOrder',
  marketPlace: 'MarketPlace.Native',
  evmOrder: sellerParameters,
  signature: '0x12',
  currencyAddress: currency,
  platformFees: [],
};
const seaportQuote = { ...quote, purchaseCurrency: currency };
const seaportData = (buyer = buyerParameters, seller = sellerParameters) =>
  encodeFunctionData({
    abi: seaportABI,
    functionName: 'matchAdvancedOrders',
    args: [
      [
        { parameters: seller, numerator: 1n, denominator: 1n, signature: '0x12', extraData: '0x' },
        { parameters: buyer, numerator: 1n, denominator: 1n, signature: '0x', extraData: '0x' },
      ],
      [],
      [],
      zeroAddress,
    ],
  });
test('checks the signed Seaport listing and buyer payment independently', () => {
  expect(() =>
    assertPurchaseMarketplace(seaportListing as never, seaportQuote as never, input, seaportData()),
  ).not.toThrow();
  expect(() =>
    assertPurchaseMarketplace(
      seaportListing as never,
      seaportQuote as never,
      input,
      seaportData({ ...buyerParameters, consideration: [{ ...nft, recipient: currency }] }),
    ),
  ).toThrow('recipient');
  expect(() =>
    assertPurchaseMarketplace(
      seaportListing as never,
      seaportQuote as never,
      input,
      seaportData({
        ...buyerParameters,
        offer: [{ ...payment, startAmount: 101n, endAmount: 101n }],
      }),
    ),
  ).toThrow('payment');
  expect(() =>
    assertPurchaseMarketplace(
      seaportListing as never,
      seaportQuote as never,
      input,
      seaportData(buyerParameters, {
        ...sellerParameters,
        consideration: [{ ...payment, recipient: currency }],
      }),
    ),
  ).toThrow('authorization');
});
