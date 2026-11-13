import { beforeEach, describe, expect, mock, test } from 'bun:test';

import { RelistOnOpenSeaError } from '@/errors';

import { stubGondi } from './utils/gondiStub';

const relistOpenSeaListings = mock();
const listOpenSeaListingResults = mock();
const signTypedData = mock();

const gondi = stubGondi({
  wallet: { signTypedData },
  apiClient: { relistOpenSeaListings, listOpenSeaListingResults },
});

const ORDER_IDS = [7, 9];
const SIGNATURE = '0xsigned';
const TYPED_DATA = { primaryType: 'BulkOrder' };
const SIGNATURE_REQUEST = { __typename: 'SignatureRequest', typedData: TYPED_DATA };
const PENDING = { tokenId: 1n, orderHash: '0xhash', error: null, status: 'PENDING' };
const ENDED = { tokenId: 2n, orderHash: null, error: 'The listing ended', status: 'FAILED' };
const RELISTED = { __typename: 'RelistOpenSeaListingsResult', openSeaListings: [ENDED, PENDING] };

const caught = (promise: Promise<unknown>) =>
  promise.then(
    () => undefined,
    (error) => error,
  );

beforeEach(() => {
  relistOpenSeaListings.mockReset();
  listOpenSeaListingResults.mockReset();
  signTypedData.mockReset();
  signTypedData.mockResolvedValue(SIGNATURE);
});

describe('relistOrdersOnOpenSea', () => {
  test('signs the typed data of the first call once and sends the same ids with the signature', async () => {
    relistOpenSeaListings.mockResolvedValueOnce(SIGNATURE_REQUEST).mockResolvedValueOnce(RELISTED);

    await gondi.relistOrdersOnOpenSea(ORDER_IDS);

    expect(signTypedData.mock.calls).toEqual([[TYPED_DATA]]);
    expect(relistOpenSeaListings.mock.calls).toEqual([
      [{ orderIds: ORDER_IDS }],
      [{ orderIds: ORDER_IDS, signature: SIGNATURE }],
    ]);
  });

  test('returns what became of each OpenSea listing', async () => {
    relistOpenSeaListings.mockResolvedValueOnce(SIGNATURE_REQUEST).mockResolvedValueOnce(RELISTED);

    expect(await gondi.relistOrdersOnOpenSea(ORDER_IDS)).toEqual([ENDED, PENDING] as never);
  });

  test('asks for no signature when no listing can be signed again', async () => {
    relistOpenSeaListings.mockResolvedValueOnce({ ...RELISTED, openSeaListings: [ENDED] });

    expect(await gondi.relistOrdersOnOpenSea(ORDER_IDS)).toEqual([ENDED] as never);
    expect(signTypedData).not.toHaveBeenCalled();
  });

  test('names the orders the API refused for having no failed OpenSea listing', async () => {
    const refusal = new Error('Orders without a failed OpenSea listing: 7, 9');
    relistOpenSeaListings.mockRejectedValueOnce(refusal);

    const error = await caught(gondi.relistOrdersOnOpenSea(ORDER_IDS));

    expect(error).toBeInstanceOf(RelistOnOpenSeaError);
    expect(error).toMatchObject({ reason: 'NOT_FAILED', orderIds: [7, 9], cause: refusal });
  });

  test('reports a signature the terms outdated between the calls as stale', async () => {
    const refusal = new Error('[{"message":"Invalid bulk signature"}]');
    relistOpenSeaListings.mockResolvedValueOnce(SIGNATURE_REQUEST).mockRejectedValueOnce(refusal);

    const error = await caught(gondi.relistOrdersOnOpenSea(ORDER_IDS));

    expect(error).toBeInstanceOf(RelistOnOpenSeaError);
    expect(error).toMatchObject({ reason: 'STALE_SIGNATURE', orderIds: [], cause: refusal });
  });

  test('rethrows any other failure as it is', async () => {
    const failure = new Error('Network down');
    relistOpenSeaListings.mockRejectedValueOnce(failure);

    expect(await caught(gondi.relistOrdersOnOpenSea(ORDER_IDS))).toBe(failure);
  });
});

describe('openSeaListingResults', () => {
  test('returns the listings the API answers for the order ids', async () => {
    listOpenSeaListingResults.mockResolvedValueOnce([PENDING]);

    expect(await gondi.openSeaListingResults(ORDER_IDS)).toEqual([PENDING] as never);
    expect(listOpenSeaListingResults.mock.calls).toEqual([[{ orderIds: ORDER_IDS }]]);
  });
});
