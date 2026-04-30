import { afterAll, beforeAll, describe, expect, setSystemTime, test } from 'bun:test';
import { SiweMessage } from 'siwe';

import { buildSiweMessage } from '@/clients/api/siwe';

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

  test('matches across a few different chains and nonces', () => {
    const cases = [
      { chainId: 1, nonce: '00000000', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' },
      { chainId: 137, nonce: 'ffffffff', address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
      { chainId: 8453, nonce: 'a1b2c3d4', address: '0xF977814e90dA44bFA03b6295A0616a897441aceC' },
    ];

    for (const c of cases) {
      const params = {
        domain: 'gondi.xyz',
        address: c.address,
        statement: 'Sign in with Ethereum to the app.',
        uri: 'https://api.gondi.xyz/lending/graphql',
        version: '1',
        chainId: c.chainId,
        nonce: c.nonce,
      };
      expect(buildSiweMessage(params)).toBe(new SiweMessage(params).prepareMessage());
    }
  });

  test('rejects malformed addresses, like siwe does', () => {
    const base = {
      domain: 'gondi.xyz',
      statement: 'Sign in with Ethereum to the app.',
      uri: 'https://api.gondi.xyz/lending/graphql',
      version: '1',
      chainId: 1,
      nonce: 'abcdef1234567890',
    };

    const malformed = [
      '0xAbCdEf0123456789aBcDeF0123456789AbCdEf01', // mixed-case, wrong EIP-55 checksum
      '0x71c7656ec7ab88b098defb751b7401b5f6d8976f', // all-lowercase (not checksummed)
      '0x71C7656EC7ab88b098defB751B7401B5f6d8976', // too short
      '0x71C7656EC7ab88b098defB751B7401B5f6d8976FF', // too long
      '71C7656EC7ab88b098defB751B7401B5f6d8976F', // missing 0x prefix
      '0xZZZ7656EC7ab88b098defB751B7401B5f6d8976F', // non-hex characters
    ];

    for (const address of malformed) {
      expect(() => buildSiweMessage({ ...base, address })).toThrow();
      expect(() => new SiweMessage({ ...base, address })).toThrow();
    }
  });
});
