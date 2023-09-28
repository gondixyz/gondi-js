import { Address, Chain } from "viem";
import { goerli } from "viem/chains";

const ANVIL_CHAIN_ID = 31337;

interface Contracts {
  MultiSourceLoanV4Address: Address;
  MultiSourceLoanV5Address: Address;
}

export const getContracts = (chain: Chain): Contracts => {
  if (chain?.id === ANVIL_CHAIN_ID) {
    return {
      MultiSourceLoanV4Address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      MultiSourceLoanV5Address: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    };
  }

  if (chain?.id === goerli.id) {
    return {
      MultiSourceLoanV4Address: "0x60C20627429668F267b5cF55c6605c665C69887D",
      MultiSourceLoanV5Address: "0xTODO", // TODO: deploy
    };
  }

  return {
    MultiSourceLoanV4Address: "0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd",
    MultiSourceLoanV5Address: "0xTODO", // TODO: deploy
  };
};
