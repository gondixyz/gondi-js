import { afterAll, beforeAll, describe, expect, mock, setSystemTime, test } from 'bun:test';
import { gql } from 'graphql-tag';
import { SiweMessage } from 'siwe';

import { buildSiweMessage } from '@/clients/api/siwe';
import { Wallet } from '@/clients/contracts';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { SessionToken } = await import('@/clients/api/auth');

describe('buildSiweMessage', () => {
  beforeAll(() => {
    setSystemTime(new Date('2026-04-30T12:00:00.000Z'));
  });

  afterAll(() => {
    setSystemTime();
  });

  test('matches the message produced by the siwe library', () => {
    const params = {
      domain: 'gondi.xyz',
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      statement: 'Sign in with Ethereum to the app.',
      uri: 'https://api.gondi.xyz/lending/graphql',
      version: '1',
      chainId: 1,
      nonce: 'abcdef1234567890',
    };

    const ours = buildSiweMessage(params);
    const expected = new SiweMessage(params).prepareMessage();

    expect(ours).toBe(expected);
  });

  test('uses a provided issuedAt timestamp', () => {
    const params = {
      domain: 'gondi.xyz',
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      statement: 'Sign in with Ethereum to the app.',
      uri: 'https://api.gondi.xyz/lending/graphql',
      version: '1',
      chainId: 1,
      nonce: 'abcdef1234567890',
      issuedAt: '2026-05-01T09:30:00.000Z',
    };

    const ours = buildSiweMessage(params);
    const expected = new SiweMessage(params).prepareMessage();

    expect(ours).toBe(expected);
  });

  test.each([
    [1, '00000000', '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'],
    [137, 'ffffffff', '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'],
    [8453, 'a1b2c3d4', '0xF977814e90dA44bFA03b6295A0616a897441aceC'],
  ])('matches across a few different chains and nonces', (chainId, nonce, address) => {
    const params = {
      domain: 'gondi.xyz',
      address,
      statement: 'Sign in with Ethereum to the app.',
      uri: 'https://api.gondi.xyz/lending/graphql',
      version: '1',
      chainId,
      nonce,
    };
    expect(buildSiweMessage(params)).toBe(new SiweMessage(params).prepareMessage());
  });

  test.each([
    ['0xAbCdEf0123456789aBcDeF0123456789AbCdEf01'], // mixed-case, wrong EIP-55 checksum
    ['0x71c7656ec7ab88b098defb751b7401b5f6d8976f'], // all-lowercase (not checksummed)
    ['0x71C7656EC7ab88b098defB751B7401B5f6d8976'], // too short
    ['0x71C7656EC7ab88b098defB751B7401B5f6d8976FF'], // too long
    ['71C7656EC7ab88b098defB751B7401B5f6d8976F'], // missing 0x prefix
    ['0xZZZ7656EC7ab88b098defB751B7401B5f6d8976F'], // non-hex characters
  ])('rejects malformed addresses, like siwe does', (address) => {
    const base = {
      domain: 'gondi.xyz',
      statement: 'Sign in with Ethereum to the app.',
      uri: 'https://api.gondi.xyz/lending/graphql',
      version: '1',
      chainId: 1,
      nonce: 'abcdef1234567890',
    };

    expect(() => buildSiweMessage({ ...base, address })).toThrow();
    expect(() => new SiweMessage({ ...base, address })).toThrow();
  });
});

describe('SessionToken', () => {
  const wallet = {} as Wallet;

  test('signs in once for requests that start before the first sign-in finishes', async () => {
    const requestToken = mock(async () => 'token');
    const session = new SessionToken({ wallet, requestToken });

    const requests = await Promise.all(
      [1, 2, 3].map(() =>
        session.authorizeRequest({
          query: gql`
            {
              a
            }
          `,
        }),
      ),
    );

    expect(requestToken).toHaveBeenCalledTimes(1);
    expect(requests.map((request) => request.headers)).toEqual(
      Array(3).fill({ authorization: 'Bearer token' }),
    );
  });

  test('signs in again after a failed sign-in', async () => {
    const requestToken = mock(async () => 'token');
    requestToken.mockRejectedValueOnce(new Error('SIWE_ERROR'));
    const session = new SessionToken({ wallet, requestToken });

    await expect(
      session.authorizeRequest({
        query: gql`
          {
            a
          }
        `,
      }),
    ).rejects.toThrow('SIWE_ERROR');
    await session.authorizeRequest({
      query: gql`
        {
          a
        }
      `,
    });

    expect(requestToken).toHaveBeenCalledTimes(2);
  });
});
