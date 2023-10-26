import { Account, Chain, Transport, WalletClient } from "viem";

import { filterLogs } from "@/blockchain";
import { getContracts } from "@/deploys";
import { seaportABI } from "@/generated/blockchain/seaport";
import { SeaportOrder } from "@/reservoir/utils";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class Seaport extends Contract<typeof seaportABI> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { SeaportAddress } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: SeaportAddress,
      abi: seaportABI,
    });
  }

  async cancel({ orderComponents }: { orderComponents: SeaportOrder }) {
    const txHash = await this.safeContractWrite.cancel([[orderComponents]]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.OrderCancelled({});
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Order not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }
}
