import { Address, BaseError, ContractFunctionRevertedError, PublicClient } from 'viem';

import { Auction } from '@/blockchain';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorAbiV6 } from '@/generated/blockchain/v6';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorAbiV8 } from '@/generated/blockchain/v8';
import { getBlockNumberAtOrBefore } from '@/utils/blockchain';
import { areSameAddress } from '@/utils/string';

/** The fields that name an auction: they are set when it starts and no bid changes them. */
export type AuctionIdentity = Pick<Auction, 'loanAddress' | 'loanId' | 'startTime'>;

type AuctionReader = Pick<PublicClient, 'chain' | 'getBlock' | 'getChainId' | 'getContractEvents'>;

/**
 * Reads an auction's current struct from its liquidator, with the NFT it auctions.
 *
 * The liquidator stores only the hash of the struct and expects every call to pass the struct
 * back, so a struct held by the caller goes stale with the next bid anyone places. This rebuilds
 * it from the auction's `LoanLiquidationStarted` event, which carries the whole struct as it
 * started, and its latest `BidPlaced` event, which sets `highestBid`, `highestBidder` and,
 * through its block's timestamp, `lastBidTime`; no other call changes a live auction. On v3.2
 * the struct also carries `loanHash` and `buyoutWindow`, which only the event has.
 *
 * IMPLEMENTATION NOTE: neither event has an indexed argument, so viem's `getContractEvents`
 * (https://viem.sh/docs/contract/getContractEvents) reads every event the liquidator emitted
 * from the auction's start block onwards, and the auction's own are picked by loan contract and
 * loan id; events before `startTime` are skipped, so starting the scan early is harmless. Some RPC
 * providers cap the block range of `eth_getLogs`
 * (https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs), so an auction that
 * started long ago needs a provider without that cap: callers use this only when the struct they
 * hold is missing or stale (`writeWithCurrentAuction`).
 */
export const readAuction = async ({
  client,
  address,
  abi,
  auction,
}: {
  client: AuctionReader;
  address: Address;
  abi: typeof auctionWithBuyoutLoanLiquidatorAbiV6 | typeof auctionWithBuyoutLoanLiquidatorAbiV8;
  auction: AuctionIdentity;
}) => {
  const fromBlock = await getBlockNumberAtOrBefore(client, auction.startTime);
  const events = await client.getContractEvents({
    address,
    abi,
    fromBlock,
    strict: true,
  });
  const isThisAuction = (args: { loanAddress: Address; loanId: bigint }) =>
    areSameAddress(args.loanAddress, auction.loanAddress) && args.loanId === auction.loanId;
  const started = events.find(
    (event) =>
      event.eventName === 'LoanLiquidationStarted' &&
      isThisAuction(event.args.auction) &&
      event.args.auction.startTime === auction.startTime,
  );
  if (started?.eventName !== 'LoanLiquidationStarted') {
    throw new Error(`Auction for loan ${auction.loanId} not found`);
  }
  const lastBid = events.findLast(
    (event) => event.eventName === 'BidPlaced' && isThisAuction(event.args),
  );
  const { collection, tokenId } = started.args;
  if (lastBid?.eventName !== 'BidPlaced') {
    return { auction: started.args.auction, collectionContractAddress: collection, tokenId };
  }
  const lastBidBlock = await client.getBlock({ blockNumber: lastBid.blockNumber });
  return {
    auction: {
      ...started.args.auction,
      highestBid: lastBid.args.bid,
      highestBidder: lastBid.args.newBidder,
      lastBidTime: lastBidBlock.timestamp,
    },
    collectionContractAddress: collection,
    tokenId,
  };
};

/**
 * Whether `error` is the liquidator's revert for an auction struct that no longer hashes to the
 * one it stores, the revert a struct read before someone else's bid gets.
 *
 * IMPLEMENTATION NOTE: viem wraps a simulation's revert in a `ContractFunctionRevertedError`
 * whose `data.errorName` is the custom error decoded with the contract's ABI, and `walk` finds it
 * in the error's cause chain (https://viem.sh/docs/contract/simulateContract#handling-custom-errors).
 */
export const isInvalidHashAuctionError = (error: unknown) =>
  error instanceof BaseError &&
  error.walk(
    (cause) =>
      cause instanceof ContractFunctionRevertedError &&
      cause.data?.errorName === 'InvalidHashAuctionError',
  ) !== null;

/**
 * Sends `write` with the auction the caller holds, and again with the one on chain
 * (`readCurrent`) when the liquidator rejects it as stale, or straight away when the caller holds
 * none (`held` is undefined). A fresh struct, the usual case, costs no read.
 */
export const writeWithCurrentAuction = async <TAuction, TResult>({
  held,
  readCurrent,
  write,
}: {
  held: TAuction | undefined;
  readCurrent: () => Promise<TAuction>;
  write: (auction: TAuction) => Promise<TResult>;
}) => {
  if (held === undefined) return write(await readCurrent());
  try {
    return await write(held);
  } catch (error) {
    if (!isInvalidHashAuctionError(error)) throw error;
    return write(await readCurrent());
  }
};
