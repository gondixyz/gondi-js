import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address } from 'viem';

import { TokenStandardType } from '../src/generated/graphql';
import { stubGondi } from './utils/gondiStub';

const OWNER = '0x0000000000000000000000000000000000000001' as Address;

const ownedNfts = mock();

const gondi = stubGondi({ account: { address: OWNER }, apiClient: { ownedNfts } });

beforeEach(() => {
  ownedNfts.mockReset();
  ownedNfts.mockResolvedValue({
    ownedNfts: {
      pageInfo: { endCursor: 'MQ==', hasNextPage: true },
      edges: [{ node: { id: '7' } }, { node: { id: '9' } }],
    },
  });
});

describe('ownedNfts', () => {
  test('lists the ERC721s in the wallet unless told otherwise', async () => {
    await gondi.ownedNfts({});

    expect(ownedNfts).toHaveBeenCalledWith({
      owner: OWNER,
      after: undefined,
      includeInLoans: false,
      includeInStash: false,
      standards: [TokenStandardType.Erc721],
    });
  });

  test('passes the cursor and every filter through', async () => {
    await gondi.ownedNfts({
      after: 'MQ==',
      includeInLoans: true,
      includeInStash: true,
      standards: [TokenStandardType.Erc1155],
    });

    expect(ownedNfts).toHaveBeenCalledWith({
      owner: OWNER,
      after: 'MQ==',
      includeInLoans: true,
      includeInStash: true,
      standards: [TokenStandardType.Erc1155],
    });
  });

  test('returns the nodes and the page info', async () => {
    const result = await gondi.ownedNfts({});

    expect(result).toEqual({
      ownedNfts: [{ id: '7' }, { id: '9' }],
      pageInfo: { endCursor: 'MQ==', hasNextPage: true },
    } as unknown as typeof result);
  });
});
