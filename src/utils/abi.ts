import { Address, Chain } from 'viem';

import { getContracts } from '@/deploys';
import { seaportABI } from '@/generated/blockchain/seaport';
import { areSameAddress } from '@/utils/string';

export const getAbi = (contractAddress: Address, chain: Chain) => {
  const contracts = getContracts(chain);
  if (areSameAddress(contractAddress, contracts.Seaport)) {
    return seaportABI;
  }

  return [];
};
