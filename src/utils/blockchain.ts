import { HexString } from '@/blockchain';

export const isEmptyCalldata = (calldata: HexString) => calldata === '0x';
