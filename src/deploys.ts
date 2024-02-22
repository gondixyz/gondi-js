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
  UserVault: Address;
  LeverageAddress: Address;
  SeaportAddress: Address;
  CryptoPunksAddress: Address;
}

interface ApiKeys {
  reservoirApiKey: string;
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
      UserVault:
        ensureAddress(process.env.GONDI_USER_VAULT_V5) ??
        '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
      LeverageAddress:
        ensureAddress(process.env.GONDI_LEVERAGE) ?? '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
      SeaportAddress:
        ensureAddress(process.env.SEAPORT) ?? '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC',
      CryptoPunksAddress:
        ensureAddress(process.env.CRYPTO_PUNKS) ?? '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    };
  }

  if (chain?.id === goerli.id) {
    return {
      MultiSourceLoan: {
        v4: '0x60C20627429668F267b5cF55c6605c665C69887D',
        v5: '0xTODO', // TODO: deploy
        v6: '0xTODO', // TODO: deploy
      },
      AuctionLoanLiquidator: {
        v4: '0x29C73faa2f9180ea5a7B0bEC243ebc63a5B4f280',
        v5: '0xTODO', // TODO: deploy
        v6: '0xTODO', // TODO: deploy
      },
      UserVault: '0xTODO', // TODO: deploy
      LeverageAddress: '0xTODO', // TODO: deploy
      SeaportAddress: '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC',
      CryptoPunksAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    };
  }

  return {
    MultiSourceLoan: {
      v4: '0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd',
      v5: '0x478f6F994C6fb3cf3e444a489b3AD9edB8cCaE16',
      v6: '0xTODO', // TODO: deploy
    },
    AuctionLoanLiquidator: {
      v4: '0x237e4421C742d843Fdd96D22294D338507e17091',
      v5: '0x97d34635b605c2f1630d6b4c6c5d222b8a2ca47d',
      v6: '0xTODO', // TODO: deploy
    },
    UserVault: '0x14a6Dcebb2Bb73aae1b199CCAadA75247b81976D',
    LeverageAddress: '0x87Ce6e8124fFd68fa721FcC7f35fdA14A11E233e',
    SeaportAddress: '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC',
    CryptoPunksAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
  };
};

export const getApiKeys = (): ApiKeys => ({
  reservoirApiKey: '5b472f8c-b471-531a-a450-56e428e5a00a',
  infuraApiKey: '9b7006cb0b0b42f1813ae9418741fbb5',
});

export const getCurrencies = (): Currencies => ({
  WETH_ADDRESS: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  ETH_ADDRESS: zeroAddress,
  USDC_ADDRESS: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
});
