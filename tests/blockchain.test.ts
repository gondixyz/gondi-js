import { describe, expect, test } from 'bun:test';

import { __ETH_ADDRESS, __HYPE_ADDRESS, __RETH_ADDRESS, isNativeCurrency } from '@/blockchain';

const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

describe('isNativeCurrency', () => {
  test('accepts every native sentinel', () => {
    expect(isNativeCurrency(__ETH_ADDRESS)).toBe(true);
    expect(isNativeCurrency(__HYPE_ADDRESS)).toBe(true);
    expect(isNativeCurrency(__RETH_ADDRESS)).toBe(true);
  });

  test('rejects ERC-20 addresses', () => {
    expect(isNativeCurrency(WETH_ADDRESS)).toBe(false);
    expect(isNativeCurrency(WETH_ADDRESS.toLowerCase() as typeof WETH_ADDRESS)).toBe(false);
  });
});
