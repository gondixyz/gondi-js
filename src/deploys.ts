import { Address, Chain, Hash, isAddress, zeroAddress } from 'viem';
import { mainnet } from 'viem/chains';

import { entries } from '@/utils/object';
import { areSameAddress } from '@/utils/string';

const ANVIL_CHAIN_ID = 31337;

interface Contracts {
  MultiSourceLoan: {
    '1': Address;
    '2': Address;
    '3': Address;
    '3.1': Address;
  };
  AuctionLoanLiquidator: {
    '1': Address;
    '2': Address;
    '3': Address;
    '3.1': Address;
  };
  UserVault: {
    '2': Address;
    '3': Address;
  };
  PurchaseBundler: {
    '2': Address;
    '3': Address;
    '3.1': Address;
  };
  Seaport: Address;
  Aave: Address;
  Cryptopunks: Address;
}

interface ApiKeys {
  infuraApiKey: string;
}

interface Currencies {
  WETH_ADDRESS: Address;
  ETH_ADDRESS: Address;
  USDC_ADDRESS: Address;
}

const ensureAddress = (value: string | undefined): Address | null => {
  if (!value || !isAddress(value)) {
    return null;
  }
  return value;
};

export const MSL_V5_TX_HASH =
  '0xb6dfcbc1661d0c0bced9591d06e964f97d41a35984704ffe61f8e062e43919c8' as Hash;

const contractsByChain: Record<number, Contracts> = {
  [ANVIL_CHAIN_ID]: {
    MultiSourceLoan: {
      '1':
        ensureAddress(process.env.GONDI_MULTI_SOURCE_LOAN_V4) ??
        '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
      '2':
        ensureAddress(process.env.GONDI_MULTI_SOURCE_LOAN_V5) ??
        '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
      '3':
        ensureAddress(process.env.GONDI_MULTI_SOURCE_LOAN_V6) ??
        '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1',
      '3.1':
        ensureAddress(process.env.GONDI_MULTI_SOURCE_LOAN_V7) ??
        '0x95401dc811bb5740090279Ba06cfA8fcF6113778',
    },
    AuctionLoanLiquidator: {
      '1':
        ensureAddress(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V4) ??
        '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
      '2':
        ensureAddress(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V5) ??
        '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
      '3':
        ensureAddress(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V6) ??
        '0x59b670e9fA9D0A427751Af201D676719a970857b',
      '3.1':
        ensureAddress(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V7) ??
        '0xf5059a5D33d5853360D16C683c16e67980206f36',
    },
    UserVault: {
      '2':
        ensureAddress(process.env.GONDI_USER_VAULT_V5) ??
        '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
      '3':
        ensureAddress(process.env.GONDI_USER_VAULT_V6) ??
        '0x4A679253410272dd5232B3Ff7cF5dbB88f295319',
    },
    PurchaseBundler: {
      '2':
        ensureAddress(process.env.GONDI_PURCHASE_BUNDLER_V5) ??
        '0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E',
      '3':
        ensureAddress(process.env.GONDI_PURCHASE_BUNDLER_V6) ??
        '0x7a2088a1bFc9d81c55368AE168C2C02570cB814F',
      '3.1':
        ensureAddress(process.env.GONDI_PURCHASE_BUNDLER_V7) ??
        '0x99bbA657f2BbC93c02D617f8bA121cB8Fc104Acf',
    },
    Seaport:
      ensureAddress(process.env.GONDI_SEAPORT) ?? '0x0000000000000068F116a894984e2DB1123eB395',
    Aave: ensureAddress(process.env.GONDI_AAVE) ?? '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
    Cryptopunks:
      ensureAddress(process.env.CRYPTOPUNKS) ?? '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
  },
  [mainnet.id]: {
    MultiSourceLoan: {
      '1': '0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd',
      '2': '0x478f6F994C6fb3cf3e444a489b3AD9edB8cCaE16',
      '3': '0xf65b99ce6dc5f6c556172bcc0ff27d3665a7d9a8',
      '3.1': '0xf41B389E0C1950dc0B16C9498eaE77131CC08A56',
    },
    AuctionLoanLiquidator: {
      '1': '0x237e4421C742d843Fdd96D22294D338507e17091',
      '2': '0x97d34635b605c2f1630d6b4c6c5d222b8a2ca47d',
      '3': '0x2995ae7233fa89b314b5a707465b57a582f440f0',
      '3.1': '0x2995ae7233fa89b314b5a707465b57a582f440f0',
    },
    UserVault: {
      '2': '0x14a6Dcebb2Bb73aae1b199CCAadA75247b81976D',
      '3': '0x823dE2c44369e94CAc3DA789Ad4b6493e27e4Bfe',
    },
    PurchaseBundler: {
      '2': '0x3b59bffe109e0f33f20887343759a98b48ecdf5f',
      '3': '0x53ceda4c47585df08201955820e23bb261489140',
      '3.1': '0xfd31a0cd628f0bab2cc174c3abd6bfc2d01aca61',
    },
    Seaport: '0x0000000000000068F116a894984e2DB1123eB395',
    Aave: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
    Cryptopunks: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
  },
  // HyperEVM
  [999]: {
    MultiSourceLoan: {
      '1': '0xTODO',
      '2': '0xTODO',
      '3': '0xTODO',
      '3.1': '0xTODO',
    },
    AuctionLoanLiquidator: {
      '1': '0xTODO',
      '2': '0xTODO',
      '3': '0xTODO',
      '3.1': '0xTODO',
    },
    UserVault: {
      '2': '0xTODO',
      '3': '0xTODO',
    },
    PurchaseBundler: {
      '2': '0xTODO',
      '3': '0xTODO',
      '3.1': '0xTODO',
    },
    Seaport: '0xTODO',
    Aave: '0xTODO',
    Cryptopunks: '0xTODO',
  },
};

export const getContracts = (chain: Pick<Chain, 'id'>): Contracts => {
  const contracts = contractsByChain[chain.id];
  if (!contracts) {
    throw new Error(`No contracts found for chain ${chain.id}`);
  }
  return contracts;
};

export const getVersionFromMslAddress = (chain: Pick<Chain, 'id'>, address: Address) => {
  const contracts = getContracts(chain);
  const version = entries(contracts.MultiSourceLoan).find(([_, versionAddress]) =>
    areSameAddress(versionAddress, address),
  )?.[0];
  if (!version) {
    throw new Error(`No version found for MSL contract ${address}`);
  }
  return version;
};

export const getVersionFromUserVaultAddress = (chain: Pick<Chain, 'id'>, address: Address) => {
  const contracts = getContracts(chain);
  const version = entries(contracts.UserVault).find(([_, versionAddress]) =>
    areSameAddress(versionAddress, address),
  )?.[0];
  if (!version) {
    throw new Error(`No version found for UserVault contract ${address}`);
  }
  return version;
};

export const getApiKeys = (): ApiKeys => ({
  infuraApiKey: '9b7006cb0b0b42f1813ae9418741fbb5',
});

export const getCurrencies = (): Currencies => ({
  WETH_ADDRESS: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ETH_ADDRESS: zeroAddress,
  USDC_ADDRESS: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
});
