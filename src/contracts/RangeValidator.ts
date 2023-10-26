import { Wallet } from "@/blockchain";
import { rangeValidatorABI } from "@/generated/blockchain/v5";

import { Contract } from "./Contract";

export class RangeValidator extends Contract<typeof rangeValidatorABI> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    super({
      walletClient,
      address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
      abi: rangeValidatorABI,
    });
  }

  async validateOffer() {
    return await this.contract.read.validateOffer([
      {
        "nftCollateralAddress": "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270",
        "nftCollateralTokenId": 0n,
        "principalAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "principalAmount": 1000000000000000000n,
        "capacity": 1000000000000000000n,
        "fee": 0n,
        "aprBps": 100n,
        "expirationTime": 1698356587n,
        "duration": 1294967295n,
        "offerId": 56n,
        "lender": "0xFed61736eF770fA4d0FCb17c995515a9b198b867",
        "borrower": "0x0000000000000000000000000000000000000000",
        "validators": [
          {
            "arguments": "0x0000000000000000000000000000000000000000000000000000000010cefa800000000000000000000000000000000000000000000000000000000010de3cbf",
            "validator": "0x0165878A594ca255338adfa4d48449f69242Eb8F"
          }
        ]
      },
      BigInt(282000004),
      "0x0000000000000000000000000000000000000000000000000000000010cefa800000000000000000000000000000000000000000000000000000000010de3cbf"
    ]);
  }
}
