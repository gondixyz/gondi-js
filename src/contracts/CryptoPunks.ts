import {
  Account,
  Chain,
  encodeFunctionData,
  Transport,
  WalletClient,
} from "viem";

import { getContracts } from "@/deploys";
import { cryptopunksABI } from "@/generated/blockchain/cryptopunks";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class CryptoPunks extends Contract<typeof cryptopunksABI> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { CryptoPunksAddress } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: CryptoPunksAddress,
      abi: cryptopunksABI,
    });
  }

  async encodeBuyPunk(tokenId: bigint) {
    return encodeFunctionData({
      abi: this.abi,
      functionName: "buyPunk",
      args: [tokenId],
    });
  }
}
