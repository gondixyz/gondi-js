import { describe, expect, test } from 'bun:test';
import { zeroAddress } from 'viem';
import { hyperliquid, mainnet, robinhood } from 'viem/chains';

import { __RETH_ADDRESS, isNativeCurrency } from '@/blockchain';
import {
  getContracts,
  getCurrencies,
  getVersionFromMslAddress,
  getVersionFromPurchaseBundlerAddress,
  getVersionFromUserVaultAddress,
} from '@/deploys';

describe('version lookup by address', () => {
  test('resolves a deployed MSL address to its version', () => {
    const address = getContracts(mainnet).MultiSourceLoan['3.1'];

    expect(getVersionFromMslAddress(mainnet, address)).toBe('3.1');
  });

  test('the zero address never matches an undeployed msl slot', () => {
    // Mainnet's MultiSourceLoan '3.2' is a zeroAddress placeholder.
    expect(() => getVersionFromMslAddress(mainnet, zeroAddress)).toThrow('No version found');
  });

  test('the zero address never matches an undeployed slot', () => {
    // Mainnet keeps PurchaseBundler '3.1' as a zeroAddress placeholder; a
    // zeroAddress lookup used to silently resolve to that version.
    expect(() => getVersionFromPurchaseBundlerAddress(mainnet, zeroAddress)).toThrow(
      'No version found',
    );
  });

  test('the zero address never matches an undeployed user vault slot', () => {
    expect(() => getVersionFromUserVaultAddress(hyperliquid, zeroAddress)).toThrow(
      'No version found',
    );
  });

  test('deployed hyperliquid purchase bundler still resolves', () => {
    const address = getContracts(hyperliquid).PurchaseBundler['3.1'];

    expect(getVersionFromPurchaseBundlerAddress(hyperliquid, address)).toBe('3.1');
  });
});

describe('robinhood chain support', () => {
  test('getContracts knows the chain', () => {
    expect(getContracts(robinhood).Seaport).toBe('0x0000000000000068F116a894984e2DB1123eB395');
  });

  test('native sentinel is recognized', () => {
    expect(isNativeCurrency(__RETH_ADDRESS)).toBe(true);
  });

  test('currencies resolve per chain', () => {
    expect(getCurrencies(robinhood).WETH_ADDRESS).toBe(
      '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    );
  });

  test('currencies default to mainnet for backwards compatibility', () => {
    expect(getCurrencies().USDC_ADDRESS).toBe('0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
  });

  test('an unknown chain has no currencies', () => {
    expect(() => getCurrencies({ id: 424242 })).toThrow('No currencies found');
  });
});
