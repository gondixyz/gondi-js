export const isNative = (marketplace: string) => marketplace === 'MarketPlace.Native';
export const isOpensea = (marketplace: string) => marketplace === 'MarketPlace.OpenSea';

/**
 * Listings are not hideable in either direction; the API rejects them, so the
 * caller is told here instead of spending a round trip on a doomed call.
 */
export const assertHideableOrder = (isAsk: boolean) => {
  if (isAsk)
    throw new Error('Listings can no longer be hidden. Cancel the listing on-chain instead.');
};
