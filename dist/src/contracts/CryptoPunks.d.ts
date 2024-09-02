import { Wallet } from '../contracts';
import { cryptopunksABI } from '../generated/blockchain/cryptopunks';
import { BaseContract } from './BaseContract';
export declare class CryptoPunks extends BaseContract<typeof cryptopunksABI> {
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    encodeBuyPunk(tokenId: bigint): Promise<`0x${string}`>;
}
