import { Address, Chain } from "viem";
import { goerli } from "viem/chains";

const ANVIL_CHAIN_ID = 31337;

interface Contracts {
  MultiSourceLoanV4Address: Address;
  MultiSourceLoanV5Address: Address;
  AuctionLoanLiquidatorV4Address: Address;
  AuctionLoanLiquidatorV5Address: Address;
  LeverageAddress: Address;
}

export const getContracts = (chain: Pick<Chain, "id">): Contracts => {
  if (chain?.id === ANVIL_CHAIN_ID) {
    return {
      MultiSourceLoanV4Address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      MultiSourceLoanV5Address: "0x68B1D87F95878fE05B998F19b66F4baba5De1aed",
      AuctionLoanLiquidatorV4Address:
        "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      AuctionLoanLiquidatorV5Address:
        "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE",
      LeverageAddress: "0xTODO", // TODO: deploy
    };
  }

  if (chain?.id === goerli.id) {
    return {
      MultiSourceLoanV4Address: "0x60C20627429668F267b5cF55c6605c665C69887D",
      MultiSourceLoanV5Address: "0xTODO", // TODO: deploy
      AuctionLoanLiquidatorV4Address:
        "0x29C73faa2f9180ea5a7B0bEC243ebc63a5B4f280",
      AuctionLoanLiquidatorV5Address: "0xTODO", // TODO: deploy
      LeverageAddress: "0xTODO", // TODO: deploy
    };
  }

  return {
    MultiSourceLoanV4Address: "0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd",
    MultiSourceLoanV5Address: "0xTODO", // TODO: deploy
    AuctionLoanLiquidatorV4Address:
      "0x237e4421C742d843Fdd96D22294D338507e17091",
    AuctionLoanLiquidatorV5Address: "0xTODO", // TODO: deploy
    LeverageAddress: "0xTODO", // TODO: deploy
  };
};
