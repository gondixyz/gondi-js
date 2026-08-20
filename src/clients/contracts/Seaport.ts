import { Address, Hash, Hex, PublicClient } from 'viem';

import { zeroAddress, zeroHash } from '@/blockchain';
import { Wallet } from '@/clients/contracts';
import { getContracts } from '@/deploys';
import { seaportABI } from '@/generated/blockchain/seaport';

import { BaseContract } from './BaseContract';

interface OfferItem {
  itemType: number;
  token: Address;
  identifierOrCriteria: bigint;
  startAmount: bigint;
  endAmount: bigint;
}

interface ConsiderationItem extends OfferItem {
  recipient: Address;
}

interface OrderParameters {
  offerer: Address;
  zone: Address;
  offer: OfferItem[];
  consideration: ConsiderationItem[];
  orderType: number;
  startTime: bigint;
  endTime: bigint;
  zoneHash: Hash;
  salt: bigint;
  conduitKey: Hash;
  counter: bigint;
  totalOriginalConsiderationItems: bigint;
}

interface AdvancedOrder {
  parameters: OrderParameters;
  numerator: bigint;
  denominator: bigint;
  signature: Hex;
  extraData: Hex;
}

export class Seaport extends BaseContract<typeof seaportABI> {
  constructor({
    walletClient,
    publicClient,
  }: {
    walletClient: Wallet;
    publicClient?: PublicClient;
  }) {
    const { Seaport } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: Seaport,
      abi: seaportABI,
      publicClient,
    });
  }

  fulfillAdvancedOrder({ advancedOrder, value }: { advancedOrder: AdvancedOrder; value: bigint }) {
    return this.safeContractWrite.fulfillAdvancedOrder([advancedOrder, [], zeroHash, zeroAddress], {
      value,
    });
  }
}
