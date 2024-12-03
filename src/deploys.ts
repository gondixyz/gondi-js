import { Address, Chain, Hash, isAddress, zeroAddress } from 'viem';
import { goerli } from 'viem/chains';

const ANVIL_CHAIN_ID = 31337;

interface Contracts {
  MultiSourceLoan: {
    v4: Address;
    v5: Address;
    v6: Address;
  };
  AuctionLoanLiquidator: {
    v4: Address;
    v5: Address;
    v6: Address;
  };
  UserVault: {
    v5: Address;
    v6: Address;
  };
  PurchaseBundler: Address;
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

export const getContracts = (chain: Pick<Chain, 'id'>): Contracts => {
  if (chain?.id === ANVIL_CHAIN_ID) {
    return {
      MultiSourceLoan: {
        v4:
          ensureAddress(process.env.GONDI_MULTI_SOURCE_LOAN_V4) ??
          '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
        v5:
          ensureAddress(process.env.GONDI_MULTI_SOURCE_LOAN_V5) ??
          '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
        v6:
          ensureAddress(process.env.GONDI_MULTI_SOURCE_LOAN_V6) ??
          '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1',
      },
      AuctionLoanLiquidator: {
        v4:
          ensureAddress(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V4) ??
          '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
        v5:
          ensureAddress(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V5) ??
          '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
        v6:
          ensureAddress(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V6) ??
          '0x59b670e9fA9D0A427751Af201D676719a970857b',
      },
      UserVault: {
        v5:
          ensureAddress(process.env.GONDI_USER_VAULT_V5) ??
          '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
        v6:
          ensureAddress(process.env.GONDI_USER_VAULT_V6) ??
          '0x4A679253410272dd5232B3Ff7cF5dbB88f295319',
      },
      PurchaseBundler: '0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f',
    };
  }

  if (chain?.id === goerli.id) {
    return {
      MultiSourceLoan: {
        v4: '0x60C20627429668F267b5cF55c6605c665C69887D',
        v5: '0xTODO',
        v6: '0xTODO',
      },
      AuctionLoanLiquidator: {
        v4: '0x29C73faa2f9180ea5a7B0bEC243ebc63a5B4f280',
        v5: '0xTODO',
        v6: '0xTODO',
      },
      UserVault: {
        v5: '0xTODO',
        v6: '0xTODO',
      },
      PurchaseBundler: '0xTODO',
    };
  }

  return {
    MultiSourceLoan: {
      v4: '0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd',
      v5: '0x478f6F994C6fb3cf3e444a489b3AD9edB8cCaE16',
      v6: '0xf65b99ce6dc5f6c556172bcc0ff27d3665a7d9a8',
    },
    AuctionLoanLiquidator: {
      v4: '0x237e4421C742d843Fdd96D22294D338507e17091',
      v5: '0x97d34635b605c2f1630d6b4c6c5d222b8a2ca47d',
      v6: '0x2995ae7233fa89b314b5a707465b57a582f440f0',
    },
    UserVault: {
      v5: '0x14a6Dcebb2Bb73aae1b199CCAadA75247b81976D',
      v6: '0x823dE2c44369e94CAc3DA789Ad4b6493e27e4Bfe',
    },
    PurchaseBundler: '0xTODO',
  };
};

export const getApiKeys = (): ApiKeys => ({
  infuraApiKey: '9b7006cb0b0b42f1813ae9418741fbb5',
});

export const getCurrencies = (): Currencies => ({
  WETH_ADDRESS: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ETH_ADDRESS: zeroAddress,
  USDC_ADDRESS: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
});
