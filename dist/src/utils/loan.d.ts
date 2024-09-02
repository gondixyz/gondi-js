import { Address } from 'viem';
import { LoanV4, LoanV5, LoanV6 } from '../blockchain';
import * as model from '../model';
import { Optional } from '../utils/types';
export declare const renegotiationToMslRenegotiation: (renegotiation: model.RenegotiationOffer, loanId: bigint) => {
    loanId: bigint;
    strictImprovement: boolean;
    lender: `0x${string}`;
    signer: `0x${string}`;
    fee: bigint;
    trancheIndex: bigint[];
    targetPrincipal: bigint[];
    principalAmount: bigint;
    duration: bigint;
    aprBps: bigint;
    renegotiationId: bigint;
    requiresLiquidation?: import("../generated/graphql").InputMaybe<boolean> | undefined;
    expirationTime: bigint;
    lenderAddress: `0x${string}`;
    offerHash: `0x${string}`;
    signerAddress?: import("../generated/graphql").InputMaybe<`0x${string}`> | undefined;
    feeAmount: bigint;
    isAddNewTranche?: import("../generated/graphql").InputMaybe<boolean> | undefined;
    signature: `0x${string}`;
};
export type LoanToMslLoanType = Optional<LoanV4, 'nftCollateralAddress'> | Optional<LoanV5, 'nftCollateralAddress'> | Optional<LoanV6, 'nftCollateralAddress'>;
export declare const loanToMslLoan: (loan: LoanToMslLoanType) => {
    startTime: bigint;
    contractStartTime: bigint;
    duration: bigint;
    nftCollateralAddress: `0x${string}`;
    source: readonly {
        loanId: bigint;
        floor: bigint;
        principalAmount: bigint;
        lender: `0x${string}`;
        accruedInterest: bigint;
        startTime: bigint;
        aprBps: bigint;
    }[];
    tranche: readonly {
        loanId: bigint;
        floor: bigint;
        principalAmount: bigint;
        lender: `0x${string}`;
        accruedInterest: bigint;
        startTime: bigint;
        aprBps: bigint;
    }[];
    protocolFee: bigint;
    principalAmount: bigint;
    borrower: `0x${string}`;
    nftCollateralTokenId: bigint;
    principalAddress: `0x${string}`;
    contractAddress: `0x${string}`;
} | {
    startTime: bigint;
    contractStartTime: bigint;
    duration: bigint;
    nftCollateralAddress: `0x${string}`;
    source: readonly {
        loanId: bigint;
        floor: bigint;
        principalAmount: bigint;
        lender: `0x${string}`;
        accruedInterest: bigint;
        startTime: bigint;
        aprBps: bigint;
    }[];
    tranche: readonly {
        loanId: bigint;
        floor: bigint;
        principalAmount: bigint;
        lender: `0x${string}`;
        accruedInterest: bigint;
        startTime: bigint;
        aprBps: bigint;
    }[];
    protocolFee: bigint;
    principalAmount: bigint;
    borrower: `0x${string}`;
    nftCollateralTokenId: bigint;
    principalAddress: `0x${string}`;
    contractAddress: `0x${string}`;
} | {
    startTime: bigint;
    contractStartTime: bigint;
    duration: bigint;
    nftCollateralAddress: `0x${string}`;
    source: readonly {
        loanId: bigint;
        floor: bigint;
        principalAmount: bigint;
        lender: `0x${string}`;
        accruedInterest: bigint;
        startTime: bigint;
        aprBps: bigint;
    }[];
    tranche: readonly {
        loanId: bigint;
        floor: bigint;
        principalAmount: bigint;
        lender: `0x${string}`;
        accruedInterest: bigint;
        startTime: bigint;
        aprBps: bigint;
    }[];
    protocolFee: bigint;
    principalAmount: bigint;
    borrower: `0x${string}`;
    nftCollateralTokenId: bigint;
    principalAddress: `0x${string}`;
    contractAddress: `0x${string}`;
};
export declare const generateFakeRenegotiationInput: ({ loanId, loan, trancheIndex, address, }: {
    loanId: string;
    loan: LoanToMslLoanType;
    trancheIndex: boolean;
    address: Address;
}) => {
    trancheIndex: bigint[];
    targetPrincipal: never[];
    loanId: string;
    lenderAddress: `0x${string}`;
    signerAddress: `0x${string}`;
    expirationTime: bigint;
    aprBps: bigint;
    feeAmount: bigint;
    duration: bigint;
    principalAmount: bigint;
} | {
    trancheIndex: never[];
    targetPrincipal: bigint[];
    loanId: string;
    lenderAddress: `0x${string}`;
    signerAddress: `0x${string}`;
    expirationTime: bigint;
    aprBps: bigint;
    feeAmount: bigint;
    duration: bigint;
    principalAmount: bigint;
};
export declare const getMslLoanId: (loan: LoanToMslLoanType) => bigint;
export declare const getRemainingSeconds: (loan: Pick<LoanToMslLoanType, 'startTime' | 'duration'>) => number;
