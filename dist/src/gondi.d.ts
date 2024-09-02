import { Address, Chain, Hash, PublicClient, Transport } from 'viem';
import { Api, Props as ApiProps } from './api';
import { Auction, LoanV5, OfferV5 } from './blockchain';
import { Contracts, Wallet } from './contracts';
import { MarketplaceEnum } from './generated/graphql';
import * as model from './model';
import { Reservoir } from './reservoir/Reservoir';
import { SeaportOrder } from './reservoir/utils';
import { loanToMslLoan, LoanToMslLoanType } from './utils/loan';
import { OptionalNullable } from './utils/types';
export declare class Gondi {
    contracts: Contracts;
    wallet: Wallet;
    bcClient: PublicClient<Transport, Chain>;
    api: Api;
    reservoir: Reservoir;
    defaults: {
        Msl: Address;
        UserVault: Address;
    };
    constructor({ wallet, apiClient, reservoirBaseApiUrl }: GondiProps);
    makeSingleNftOffer(offer: model.SingleNftOfferInput): Promise<{
        aprBps: bigint;
        borrowerAddress: `0x${string}`;
        capacity: bigint;
        contractAddress: `0x${string}`;
        duration: bigint;
        expirationTime: bigint;
        fee: bigint;
        lenderAddress: `0x${string}`;
        maxSeniorRepayment?: import("./generated/graphql").InputMaybe<bigint> | undefined;
        maxTrancheFloor?: import("./generated/graphql").InputMaybe<bigint> | undefined;
        nftId: number;
        offerHash: `0x${string}`;
        offerId: bigint;
        offerValidators: import("./generated/graphql").OfferValidatorInput[];
        principalAddress: `0x${string}`;
        principalAmount: bigint;
        requiresLiquidation?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        signature: `0x${string}`;
        signerAddress?: import("./generated/graphql").InputMaybe<`0x${string}`> | undefined;
        id: string;
        nftCollateralAddress: `0x${string}`;
        nftCollateralTokenId: bigint;
    }>;
    /** @internal */
    _makeSingleNftOffer(offer: model.SingleNftOfferInput, mslContractAddress?: Address): Promise<{
        aprBps: bigint;
        borrowerAddress: `0x${string}`;
        capacity: bigint;
        contractAddress: `0x${string}`;
        duration: bigint;
        expirationTime: bigint;
        fee: bigint;
        lenderAddress: `0x${string}`;
        maxSeniorRepayment?: import("./generated/graphql").InputMaybe<bigint> | undefined;
        maxTrancheFloor?: import("./generated/graphql").InputMaybe<bigint> | undefined;
        nftId: number;
        offerHash: `0x${string}`;
        offerId: bigint;
        offerValidators: import("./generated/graphql").OfferValidatorInput[];
        principalAddress: `0x${string}`;
        principalAmount: bigint;
        requiresLiquidation?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        signature: `0x${string}`;
        signerAddress?: import("./generated/graphql").InputMaybe<`0x${string}`> | undefined;
        id: string;
        nftCollateralAddress: `0x${string}`;
        nftCollateralTokenId: bigint;
    }>;
    makeCollectionOffer(offer: model.CollectionOfferInput): Promise<{
        aprBps: bigint;
        borrowerAddress: `0x${string}`;
        capacity: bigint;
        collectionId: number;
        contractAddress: `0x${string}`;
        duration: bigint;
        expirationTime: bigint;
        fee: bigint;
        lenderAddress: `0x${string}`;
        maxSeniorRepayment?: import("./generated/graphql").InputMaybe<bigint> | undefined;
        maxTrancheFloor?: import("./generated/graphql").InputMaybe<bigint> | undefined;
        offerHash: `0x${string}`;
        offerId: bigint;
        offerValidators: import("./generated/graphql").OfferValidatorInput[];
        principalAddress: `0x${string}`;
        principalAmount: bigint;
        requiresLiquidation?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        signature: `0x${string}`;
        signerAddress?: import("./generated/graphql").InputMaybe<`0x${string}`> | undefined;
        id: string;
        nftCollateralAddress: `0x${string}`;
        nftCollateralTokenId: bigint;
    }>;
    /** @internal */
    _makeCollectionOffer(offer: model.CollectionOfferInput, mslContractAddress?: Address): Promise<{
        aprBps: bigint;
        borrowerAddress: `0x${string}`;
        capacity: bigint;
        collectionId: number;
        contractAddress: `0x${string}`;
        duration: bigint;
        expirationTime: bigint;
        fee: bigint;
        lenderAddress: `0x${string}`;
        maxSeniorRepayment?: import("./generated/graphql").InputMaybe<bigint> | undefined;
        maxTrancheFloor?: import("./generated/graphql").InputMaybe<bigint> | undefined;
        offerHash: `0x${string}`;
        offerId: bigint;
        offerValidators: import("./generated/graphql").OfferValidatorInput[];
        principalAddress: `0x${string}`;
        principalAmount: bigint;
        requiresLiquidation?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        signature: `0x${string}`;
        signerAddress?: import("./generated/graphql").InputMaybe<`0x${string}`> | undefined;
        id: string;
        nftCollateralAddress: `0x${string}`;
        nftCollateralTokenId: bigint;
    }>;
    makeSaleOffer({ collectionContractAddress, tokenId, price, expirationTime, }: {
        collectionContractAddress: Address;
        tokenId: bigint;
        price: bigint;
        expirationTime: bigint;
    }): Promise<import("./generated/graphql").SaveSignedSaleOfferMutation>;
    cancelSaleOffer({ saleOffer }: {
        saleOffer: SeaportOrder;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            orderHash: `0x${string}`;
            offerer: `0x${string}`;
            zone: `0x${string}`;
        }>;
    }>;
    cancelOffer({ id, contractAddress }: {
        id: bigint;
        contractAddress: Address;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            offerId: bigint;
        }>;
    }>;
    cancelAllOffers({ minId, contractAddress }: {
        minId: bigint;
        contractAddress: Address;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            minOfferId: bigint;
        }>;
    }>;
    hideOffer({ id, contractAddress }: {
        id: bigint;
        contractAddress: Address;
    }): Promise<import("./generated/graphql").HideOfferMutation>;
    unhideOffer({ id, contractAddress }: {
        id: bigint;
        contractAddress: Address;
    }): Promise<import("./generated/graphql").UnhideOfferMutation>;
    makeRefinanceOffer({ renegotiation, contractAddress, skipSignature, }: {
        renegotiation: model.RenegotiationInput;
        contractAddress: Address;
        skipSignature?: boolean;
    }): Promise<{
        loanId: string;
        principalAmount: bigint;
        duration: bigint;
        aprBps: bigint;
        renegotiationId: bigint;
        trancheIndex?: import("./generated/graphql").InputMaybe<bigint[]> | undefined;
        expirationTime: bigint;
        lenderAddress: `0x${string}`;
        signerAddress?: import("./generated/graphql").InputMaybe<`0x${string}`> | undefined;
        requiresLiquidation?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        targetPrincipal?: import("./generated/graphql").InputMaybe<bigint[]> | undefined;
        strictImprovement?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        offerHash: `0x${string}`;
        feeAmount: bigint;
        isAddNewTranche?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        signature: `0x${string}`;
        id: string;
    } | {
        offerHash: `0x${string}`;
        signature: `0x${string}`;
        renegotiationId: bigint;
        targetPrincipal: bigint[];
        trancheIndex: bigint[];
        lenderAddress: `0x${string}`;
        signerAddress: import("./generated/graphql").InputMaybe<`0x${string}`>;
        loanId: string;
        principalAmount: bigint;
        duration: bigint;
        aprBps: bigint;
        expirationTime: bigint;
        requiresLiquidation?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        strictImprovement?: import("./generated/graphql").InputMaybe<boolean> | undefined;
        feeAmount: bigint;
        isAddNewTranche?: import("./generated/graphql").InputMaybe<boolean> | undefined;
    }>;
    cancelRefinanceOffer({ id, contractAddress }: {
        id: bigint;
        contractAddress: Address;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            renegotiationId: bigint;
        }>;
    }>;
    hideRenegotiationOffer({ id, contractAddress }: {
        id: bigint;
        contractAddress: Address;
    }): Promise<import("./generated/graphql").HideRenegotiationOfferMutation>;
    unhideRenegotiationOffer({ id, contractAddress, }: {
        id: bigint;
        contractAddress: Address;
    }): Promise<import("./generated/graphql").UnhideRenegotiationOfferMutation>;
    hideSaleOffer({ id }: {
        id: string;
    }): Promise<import("./generated/graphql").HideSaleOfferMutation>;
    unhideSaleOffer({ id }: {
        id: string;
    }): Promise<import("./generated/graphql").UnhideSaleOfferMutation>;
    cancelAllRenegotiations({ minId, contractAddress, }: {
        minId: bigint;
        contractAddress: Address;
    }): Promise<void | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            minRenegotiationId: bigint;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            renegotiationId: bigint;
        }>;
    }>;
    offerExecutionFromOffers(offers: OfferFromExecutionOffer[], amounts?: bigint[]): EmitLoanArgs['offerExecution'];
    emitLoan(args: EmitLoanArgs): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                id: string;
            };
            loanId: bigint;
            offerId: string;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
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
                id: string;
            };
            loanId: bigint;
            offerIds: string[];
        }>;
    }>;
    refinanceFromOffers({ loan, loanId, executionData, }: {
        loan: LoanToMslLoanType;
        loanId: bigint;
        executionData: EmitLoanArgs;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
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
                id: string;
            };
            loanId: bigint;
            offerIds: string[];
        }>;
    }>;
    repayLoan({ loan, loanId, nftReceiver, }: {
        loan: LoanToMslLoanType;
        loanId: bigint;
        nftReceiver?: Address;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loanId: bigint;
            totalRepayment: bigint;
            fee: bigint;
        }>;
    }>;
    offers({ limit, cursor, sortBy, filterBy, }: model.ListOffersProps): Promise<{
        offers: ({
            type: "CollectionOffer" | "SingleNFTOffer" | undefined;
            lender: `0x${string}` | null | undefined;
            borrower: `0x${string}` | null | undefined;
            signer: `0x${string}` | null | undefined;
            offerValidators: {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[] | {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[];
            nftCollateralAddress: `0x${string}`;
            nftCollateralTokenId: bigint;
            id: string;
            offerId: bigint;
            lenderAddress?: `0x${string}` | null | undefined;
            borrowerAddress?: `0x${string}` | null | undefined;
            signerAddress?: `0x${string}` | null | undefined;
            contractAddress: `0x${string}`;
            requiresLiquidation?: boolean | null | undefined;
            principalAddress: `0x${string}`;
            principalAmount: bigint;
            aprBps: bigint;
            fee: bigint;
            capacity: bigint;
            expirationTime: bigint;
            duration: bigint;
            status: string;
            offerHash?: `0x${string}` | null | undefined;
            signature?: `0x${string}` | null | undefined;
            createdDate?: Date | null | undefined;
            repayment: bigint;
            hidden?: boolean | null | undefined;
            maxSeniorRepayment: bigint;
            collection: {
                __typename?: "Collection" | undefined;
                id: string;
                slug?: string | null | undefined;
                contractData?: {
                    __typename?: "ContractData" | undefined;
                    contractAddress: `0x${string}`;
                } | null | undefined;
            };
            currency: {
                __typename?: "Currency" | undefined;
                symbol: string;
                decimals: number;
                address: `0x${string}`;
            };
            validators: {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[];
        } | {
            type: "CollectionOffer" | "SingleNFTOffer" | undefined;
            lender: `0x${string}` | null | undefined;
            borrower: `0x${string}` | null | undefined;
            signer: `0x${string}` | null | undefined;
            offerValidators: {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[] | {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[];
            nftCollateralAddress: `0x${string}`;
            nftCollateralTokenId: bigint;
            id: string;
            offerId: bigint;
            lenderAddress?: `0x${string}` | null | undefined;
            borrowerAddress?: `0x${string}` | null | undefined;
            signerAddress?: `0x${string}` | null | undefined;
            contractAddress: `0x${string}`;
            requiresLiquidation?: boolean | null | undefined;
            principalAddress: `0x${string}`;
            principalAmount: bigint;
            aprBps: bigint;
            fee: bigint;
            capacity: bigint;
            expirationTime: bigint;
            duration: bigint;
            status: string;
            offerHash?: `0x${string}` | null | undefined;
            signature?: `0x${string}` | null | undefined;
            createdDate?: Date | null | undefined;
            repayment: bigint;
            hidden?: boolean | null | undefined;
            maxSeniorRepayment: bigint;
            nft: {
                __typename?: "NFT" | undefined;
                id: string;
                tokenId: bigint;
                collection?: {
                    __typename?: "Collection" | undefined;
                    id: string;
                    slug?: string | null | undefined;
                    contractData?: {
                        __typename?: "ContractData" | undefined;
                        contractAddress: `0x${string}`;
                    } | null | undefined;
                } | null | undefined;
            };
            currency: {
                __typename?: "Currency" | undefined;
                symbol: string;
                decimals: number;
                address: `0x${string}`;
            };
            validators: {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[];
        })[];
        hasNextPage: true;
        cursor: string;
    } | {
        offers: ({
            type: "CollectionOffer" | "SingleNFTOffer" | undefined;
            lender: `0x${string}` | null | undefined;
            borrower: `0x${string}` | null | undefined;
            signer: `0x${string}` | null | undefined;
            offerValidators: {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[] | {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[];
            nftCollateralAddress: `0x${string}`;
            nftCollateralTokenId: bigint;
            id: string;
            offerId: bigint;
            lenderAddress?: `0x${string}` | null | undefined;
            borrowerAddress?: `0x${string}` | null | undefined;
            signerAddress?: `0x${string}` | null | undefined;
            contractAddress: `0x${string}`;
            requiresLiquidation?: boolean | null | undefined;
            principalAddress: `0x${string}`;
            principalAmount: bigint;
            aprBps: bigint;
            fee: bigint;
            capacity: bigint;
            expirationTime: bigint;
            duration: bigint;
            status: string;
            offerHash?: `0x${string}` | null | undefined;
            signature?: `0x${string}` | null | undefined;
            createdDate?: Date | null | undefined;
            repayment: bigint;
            hidden?: boolean | null | undefined;
            maxSeniorRepayment: bigint;
            collection: {
                __typename?: "Collection" | undefined;
                id: string;
                slug?: string | null | undefined;
                contractData?: {
                    __typename?: "ContractData" | undefined;
                    contractAddress: `0x${string}`;
                } | null | undefined;
            };
            currency: {
                __typename?: "Currency" | undefined;
                symbol: string;
                decimals: number;
                address: `0x${string}`;
            };
            validators: {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[];
        } | {
            type: "CollectionOffer" | "SingleNFTOffer" | undefined;
            lender: `0x${string}` | null | undefined;
            borrower: `0x${string}` | null | undefined;
            signer: `0x${string}` | null | undefined;
            offerValidators: {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[] | {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[];
            nftCollateralAddress: `0x${string}`;
            nftCollateralTokenId: bigint;
            id: string;
            offerId: bigint;
            lenderAddress?: `0x${string}` | null | undefined;
            borrowerAddress?: `0x${string}` | null | undefined;
            signerAddress?: `0x${string}` | null | undefined;
            contractAddress: `0x${string}`;
            requiresLiquidation?: boolean | null | undefined;
            principalAddress: `0x${string}`;
            principalAmount: bigint;
            aprBps: bigint;
            fee: bigint;
            capacity: bigint;
            expirationTime: bigint;
            duration: bigint;
            status: string;
            offerHash?: `0x${string}` | null | undefined;
            signature?: `0x${string}` | null | undefined;
            createdDate?: Date | null | undefined;
            repayment: bigint;
            hidden?: boolean | null | undefined;
            maxSeniorRepayment: bigint;
            nft: {
                __typename?: "NFT" | undefined;
                id: string;
                tokenId: bigint;
                collection?: {
                    __typename?: "Collection" | undefined;
                    id: string;
                    slug?: string | null | undefined;
                    contractData?: {
                        __typename?: "ContractData" | undefined;
                        contractAddress: `0x${string}`;
                    } | null | undefined;
                } | null | undefined;
            };
            currency: {
                __typename?: "Currency" | undefined;
                symbol: string;
                decimals: number;
                address: `0x${string}`;
            };
            validators: {
                __typename?: "OfferValidator" | undefined;
                arguments: `0x${string}`;
                validator: `0x${string}`;
            }[];
        })[];
        hasNextPage: false;
        cursor: null;
    }>;
    loans({ limit, cursor, ...rest }: model.ListLoansProps): Promise<{
        loans: {
            type: "MultiSourceLoan" | undefined;
            contractAddress: `0x${string}`;
            nftCollateralTokenId: bigint;
            nftCollateralAddress: `0x${string}` | undefined;
            borrower: `0x${string}`;
            startTime: bigint;
            source: {
                lender: `0x${string}`;
                loanId: bigint;
                startTime: bigint;
                __typename?: "Source" | undefined;
                id: string;
                originationFee: bigint;
                principalAmount: bigint;
                lenderAddress: string;
                accruedInterest: bigint;
                aprBps: bigint;
            }[];
            id: string;
            address: `0x${string}`;
            loanId: number;
            timestamp: Date;
            txHash: `0x${string}`;
            indexInBlock: number;
            borrowerAddress: `0x${string}`;
            principalAddress: `0x${string}`;
            duration: bigint;
            status: string;
            principalAmount: bigint;
            blendedAprBps: number;
            totalOriginationFee: bigint;
            protocolFee: bigint;
            offer: {
                __typename?: "CollectionOffer" | undefined;
                offerId: bigint;
                signerAddress?: `0x${string}` | null | undefined;
            } | {
                __typename?: "SingleNFTOffer" | undefined;
                offerId: bigint;
                signerAddress?: `0x${string}` | null | undefined;
            };
            currency: {
                __typename?: "Currency" | undefined;
                symbol: string;
                decimals: number;
                address: `0x${string}`;
            };
            repaidActivity?: {
                __typename?: "LoanRepaid" | undefined;
                totalInterest: bigint;
                timestamp: Date;
            } | null | undefined;
            nft: {
                __typename?: "NFT" | undefined;
                id: string;
                name?: string | null | undefined;
                tokenId: bigint;
                nftId: string;
                owner?: `0x${string}` | null | undefined;
                image?: {
                    __typename?: "Asset" | undefined;
                    data: string;
                    cacheUrl?: string | null | undefined;
                    contentTypeMime: string;
                    accessTypeName: string;
                } | null | undefined;
                collection?: {
                    __typename?: "Collection" | undefined;
                    id: string;
                    slug?: string | null | undefined;
                    name?: string | null | undefined;
                    nftsCount?: number | null | undefined;
                    contractData?: {
                        __typename?: "ContractData" | undefined;
                        contractAddress: `0x${string}`;
                    } | null | undefined;
                } | null | undefined;
            };
            sources: {
                __typename?: "Source" | undefined;
                id: string;
                loanId: string;
                originationFee: bigint;
                principalAmount: bigint;
                lenderAddress: string;
                accruedInterest: bigint;
                aprBps: bigint;
                startTime: Date;
            }[];
        }[];
        hasNextPage: true;
        cursor: string;
    } | {
        loans: {
            type: "MultiSourceLoan" | undefined;
            contractAddress: `0x${string}`;
            nftCollateralTokenId: bigint;
            nftCollateralAddress: `0x${string}` | undefined;
            borrower: `0x${string}`;
            startTime: bigint;
            source: {
                lender: `0x${string}`;
                loanId: bigint;
                startTime: bigint;
                __typename?: "Source" | undefined;
                id: string;
                originationFee: bigint;
                principalAmount: bigint;
                lenderAddress: string;
                accruedInterest: bigint;
                aprBps: bigint;
            }[];
            id: string;
            address: `0x${string}`;
            loanId: number;
            timestamp: Date;
            txHash: `0x${string}`;
            indexInBlock: number;
            borrowerAddress: `0x${string}`;
            principalAddress: `0x${string}`;
            duration: bigint;
            status: string;
            principalAmount: bigint;
            blendedAprBps: number;
            totalOriginationFee: bigint;
            protocolFee: bigint;
            offer: {
                __typename?: "CollectionOffer" | undefined;
                offerId: bigint;
                signerAddress?: `0x${string}` | null | undefined;
            } | {
                __typename?: "SingleNFTOffer" | undefined;
                offerId: bigint;
                signerAddress?: `0x${string}` | null | undefined;
            };
            currency: {
                __typename?: "Currency" | undefined;
                symbol: string;
                decimals: number;
                address: `0x${string}`;
            };
            repaidActivity?: {
                __typename?: "LoanRepaid" | undefined;
                totalInterest: bigint;
                timestamp: Date;
            } | null | undefined;
            nft: {
                __typename?: "NFT" | undefined;
                id: string;
                name?: string | null | undefined;
                tokenId: bigint;
                nftId: string;
                owner?: `0x${string}` | null | undefined;
                image?: {
                    __typename?: "Asset" | undefined;
                    data: string;
                    cacheUrl?: string | null | undefined;
                    contentTypeMime: string;
                    accessTypeName: string;
                } | null | undefined;
                collection?: {
                    __typename?: "Collection" | undefined;
                    id: string;
                    slug?: string | null | undefined;
                    name?: string | null | undefined;
                    nftsCount?: number | null | undefined;
                    contractData?: {
                        __typename?: "ContractData" | undefined;
                        contractAddress: `0x${string}`;
                    } | null | undefined;
                } | null | undefined;
            };
            sources: {
                __typename?: "Source" | undefined;
                id: string;
                loanId: string;
                originationFee: bigint;
                principalAmount: bigint;
                lenderAddress: string;
                accruedInterest: bigint;
                aprBps: bigint;
                startTime: Date;
            }[];
        }[];
        hasNextPage: false;
        cursor: null;
    }>;
    list({ nft }: {
        nft: number;
    }): Promise<import("./generated/graphql").ListNftMutation>;
    unlist({ nft }: {
        nft: number;
    }): Promise<import("./generated/graphql").UnlistNftMutation>;
    listings({ collections, user, marketPlaces, limit, cursor, }: model.ListListingsProps): Promise<{
        listings: {
            __typename?: "Listing" | undefined;
            id: string;
            marketplaceName: MarketplaceEnum;
            createdDate: Date;
            desiredDuration?: number | null | undefined;
            desiredPrincipalAddress?: `0x${string}` | null | undefined;
            user: {
                __typename?: "User" | undefined;
                walletAddress: `0x${string}`;
            };
            nft: {
                __typename?: "NFT" | undefined;
                id: string;
                tokenId: bigint;
                collection?: {
                    __typename?: "Collection" | undefined;
                    id: string;
                    slug?: string | null | undefined;
                    contractData?: {
                        __typename?: "ContractData" | undefined;
                        contractAddress: `0x${string}`;
                    } | null | undefined;
                } | null | undefined;
            };
        }[];
        hasNextPage: true;
        cursor: string;
    } | {
        listings: {
            __typename?: "Listing" | undefined;
            id: string;
            marketplaceName: MarketplaceEnum;
            createdDate: Date;
            desiredDuration?: number | null | undefined;
            desiredPrincipalAddress?: `0x${string}` | null | undefined;
            user: {
                __typename?: "User" | undefined;
                walletAddress: `0x${string}`;
            };
            nft: {
                __typename?: "NFT" | undefined;
                id: string;
                tokenId: bigint;
                collection?: {
                    __typename?: "Collection" | undefined;
                    id: string;
                    slug?: string | null | undefined;
                    contractData?: {
                        __typename?: "ContractData" | undefined;
                        contractAddress: `0x${string}`;
                    } | null | undefined;
                } | null | undefined;
            };
        }[];
        hasNextPage: false;
        cursor: null;
    }>;
    nftId(props: ({
        slug: string;
        contractAddress?: never;
    } | {
        slug?: never;
        contractAddress: Address;
    }) & {
        tokenId: bigint;
    }): Promise<number>;
    collections(props: {
        statsCurrency?: Address;
    }): Promise<{
        collections: {
            __typename?: "Collection" | undefined;
            id: string;
            name?: string | null | undefined;
            slug?: string | null | undefined;
            description?: string | null | undefined;
            discordUrl?: string | null | undefined;
            twitterUsername?: string | null | undefined;
            externalUrl?: string | null | undefined;
            collectionUrl?: string | null | undefined;
            verified: boolean;
            image?: {
                __typename?: "Asset" | undefined;
                cacheUrl?: string | null | undefined;
            } | null | undefined;
            bannerImage?: {
                __typename?: "Asset" | undefined;
                cacheUrl?: string | null | undefined;
            } | null | undefined;
            contractData?: {
                __typename?: "ContractData" | undefined;
                blockchain: string;
                contractAddress: `0x${string}`;
                createdDate: Date;
                creatorAddress?: `0x${string}` | null | undefined;
            } | null | undefined;
            statistics: {
                __typename?: "CollectionStatistics" | undefined;
                floorPrice7d?: number | null | undefined;
                floorPrice30d?: number | null | undefined;
                totalVolume?: number | null | undefined;
                totalVolume1y?: number | null | undefined;
                totalVolume3m?: number | null | undefined;
                totalVolume1m?: number | null | undefined;
                totalVolume1w?: number | null | undefined;
                totalLoanVolume: bigint;
                totalLoanVolume1w: bigint;
                totalLoanVolume1m: bigint;
                totalLoanVolume3m: bigint;
                totalLoanVolume1y: bigint;
                numberOfPricedNfts: number;
                nftsCount?: number | null | undefined;
                percentageInOutstandingLoans: number;
                repaymentRate: number;
                numberOfOffers: number;
                floorPrice?: {
                    __typename?: "CurrencyAmount" | undefined;
                    amount: number;
                    currency: {
                        __typename?: "Currency" | undefined;
                        address: `0x${string}`;
                        decimals: number;
                    };
                } | null | undefined;
                bestOffer?: {
                    __typename?: "CurrencyAmount" | undefined;
                    amount: number;
                    currency: {
                        __typename?: "Currency" | undefined;
                        address: `0x${string}`;
                        decimals: number;
                    };
                } | null | undefined;
            };
        }[];
        pageInfo: {
            __typename?: "PageInfo" | undefined;
            endCursor?: string | null | undefined;
            hasNextPage: boolean;
        };
    }>;
    collectionId(props: {
        slug: string;
        contractAddress?: never;
    }): Promise<number>;
    collectionId(props: {
        slug?: never;
        contractAddress: Address;
    }): Promise<number[]>;
    ownedNfts(): Promise<{
        ownedNfts: {
            __typename?: "NFT" | undefined;
            id: string;
            tokenId: bigint;
            price?: bigint | null | undefined;
            priceCurrencyAddress?: string | null | undefined;
            collection?: {
                __typename?: "Collection" | undefined;
                id: string;
            } | null | undefined;
            activeLoan?: {
                __typename?: "MultiSourceLoan" | undefined;
                id: string;
            } | null | undefined;
            statistics: {
                __typename?: "NftStatistics" | undefined;
                lastSale?: {
                    __typename?: "Sale" | undefined;
                    order: {
                        __typename?: "CollectionOrder" | undefined;
                        price: bigint;
                        currency: {
                            __typename?: "Currency" | undefined;
                            address: `0x${string}`;
                            decimals: number;
                        };
                    } | {
                        __typename?: "SingleNFTOrder" | undefined;
                        price: bigint;
                        currency: {
                            __typename?: "Currency" | undefined;
                            address: `0x${string}`;
                            decimals: number;
                        };
                    };
                } | null | undefined;
                topTraitFloorPrice?: {
                    __typename?: "CurrencyAmount" | undefined;
                    amount: number;
                    currency: {
                        __typename?: "Currency" | undefined;
                        address: `0x${string}`;
                        decimals: number;
                    };
                } | null | undefined;
            };
        }[];
        pageInfo: {
            __typename?: "PageInfo" | undefined;
            endCursor?: string | null | undefined;
            hasNextPage: boolean;
        };
    }>;
    getRemainingLockupSeconds({ loan }: {
        loan: LoanToMslLoanType;
    }): Promise<number>;
    isEndLockedUp({ loan }: {
        loan: LoanToMslLoanType;
    }): Promise<boolean>;
    getBestNativeSaleOffer({ contractAddress, tokenId, }: {
        contractAddress: Address;
        tokenId: bigint;
    }): Promise<{
        __typename?: "CollectionOrder" | undefined;
        id: string;
        netAmount: bigint;
        status: string;
        marketPlace: string;
        fees: bigint;
        maker: `0x${string}`;
        expiration?: Date | null | undefined;
        createdDate: Date;
        hidden: boolean;
        signature: `0x${string}`;
        currencyAddress: `0x${string}`;
        startTime: Date;
        nonce: bigint;
    } | {
        __typename?: "SingleNFTOrder" | undefined;
        id: string;
        netAmount: bigint;
        status: string;
        marketPlace: string;
        fees: bigint;
        maker: `0x${string}`;
        expiration?: Date | null | undefined;
        createdDate: Date;
        hidden: boolean;
        signature: `0x${string}`;
        currencyAddress: `0x${string}`;
        startTime: Date;
        nonce: bigint;
    } | null>;
    private contractToVersion;
    private generateRenegotiationId;
    refinanceBatch({ aprBpsImprovementPercentage, refinancings, }: {
        aprBpsImprovementPercentage: number;
        refinancings: {
            loan: LoanToMslLoanType & {
                loanReferenceId: string;
            };
            source: ReturnType<typeof loanToMslLoan>['source'][number] & {
                loanIndex: number;
            };
            refinancingPrincipal: bigint;
        }[];
    }): Promise<({
        status: "fulfilled";
        value: {
            txHash: `0x${string}`;
            waitTxInBlock: () => Promise<{
                blockHash: `0x${string}`;
                blockNumber: bigint;
                contractAddress: `0x${string}` | null;
                cumulativeGasUsed: bigint;
                effectiveGasPrice: bigint;
                from: `0x${string}`;
                gasUsed: bigint;
                logs: import("viem").Log<bigint, number, false>[];
                logsBloom: `0x${string}`;
                status: "success" | "reverted";
                to: `0x${string}` | null;
                transactionHash: `0x${string}`;
                transactionIndex: number;
                type: import("viem").TransactionType;
                results: {
                    renegotiationId: bigint;
                    oldLoanId: bigint;
                    newLoanId: bigint;
                    loan: {
                        borrower: `0x${string}`;
                        nftCollateralTokenId: bigint;
                        nftCollateralAddress: `0x${string}`;
                        principalAddress: `0x${string}`;
                        principalAmount: bigint;
                        startTime: bigint;
                        duration: bigint;
                        source: readonly {
                            loanId: bigint;
                            lender: `0x${string}`;
                            principalAmount: bigint;
                            accruedInterest: bigint;
                            startTime: bigint;
                            aprBps: bigint;
                        }[];
                    };
                    fee: bigint;
                }[];
            }>;
        } | {
            txHash: `0x${string}`;
            waitTxInBlock: () => Promise<{
                blockHash: `0x${string}`;
                blockNumber: bigint;
                contractAddress: `0x${string}` | null;
                cumulativeGasUsed: bigint;
                effectiveGasPrice: bigint;
                from: `0x${string}`;
                gasUsed: bigint;
                logs: import("viem").Log<bigint, number, false>[];
                logsBloom: `0x${string}`;
                status: "success" | "reverted";
                to: `0x${string}` | null;
                transactionHash: `0x${string}`;
                transactionIndex: number;
                type: import("viem").TransactionType;
                results: {
                    renegotiationId: bigint;
                    oldLoanId: bigint;
                    newLoanId: bigint;
                    loan: {
                        borrower: `0x${string}`;
                        nftCollateralTokenId: bigint;
                        nftCollateralAddress: `0x${string}`;
                        principalAddress: `0x${string}`;
                        principalAmount: bigint;
                        startTime: bigint;
                        duration: bigint;
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
                    };
                    fee: bigint;
                }[];
            }>;
        };
        reason?: undefined;
    } | {
        status: "rejected";
        reason: unknown;
        value: any[];
    })[]>;
    refinanceFullLoan({ offer, loan, loanId, }: {
        offer: model.RenegotiationOffer;
        loan: LoanToMslLoanType;
        loanId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
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
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    }>;
    refinancePartialLoan({ offer, loan, loanId, }: {
        offer: model.RenegotiationOffer;
        loan: LoanToMslLoanType;
        loanId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
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
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    }>;
    addTranche({ offer, loan, loanId, }: {
        offer: model.RenegotiationOffer;
        loan: LoanToMslLoanType;
        loanId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
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
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    }>;
    /**
     * Delegate Multicall should be used when token is used as collateral for an active loan.
     * Multicall will be performed to the contract address of the first delegation.
     */
    delegateMulticall(delegations: Parameters<Gondi['delegate']>[0][]): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            results: {
                loanId: bigint;
                delegate: `0x${string}`;
                value: boolean;
            }[];
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
        }>;
    }>;
    /** Delegate should be used when token is used as collateral for an active loan. */
    delegate({ loan, loanId, to, enable, rights, }: {
        loan: LoanToMslLoanType;
        loanId: bigint;
        to: Address;
        enable: boolean;
        rights?: Hash;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                loanId: bigint;
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint | (bigint & Date);
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
            };
            value: boolean;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                loanId: bigint;
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint | (bigint & Date);
                duration: bigint;
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
                contractStartTime: bigint | Date;
            };
            value: boolean;
        }>;
    }>;
    /** RevokeDelegate should be used when token is not being used as collateral. */
    revokeDelegate({ to, collection, tokenId, contract, }: {
        to: Address;
        collection: Address;
        tokenId: bigint;
        contract?: Address;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            delegate: `0x${string}`;
            collection: `0x${string}`;
            tokenId: bigint;
        }>;
    }>;
    /**
     * RevokeDelegationsAndEmitLoan should be used when token has been delegated without being revoked,
     * and a new loan wants to be emitted, erasing the delegations provided as argument.
     */
    revokeDelegationsAndEmitLoan({ delegations, emit, }: {
        delegations: Address[];
        emit: Parameters<Gondi['emitLoan']>[0];
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            results: ({
                loanId: bigint;
                offerId: bigint;
                loan: {
                    borrower: `0x${string}`;
                    nftCollateralTokenId: bigint;
                    nftCollateralAddress: `0x${string}`;
                    principalAddress: `0x${string}`;
                    principalAmount: bigint;
                    startTime: bigint;
                    duration: bigint;
                    source: readonly {
                        loanId: bigint;
                        lender: `0x${string}`;
                        principalAmount: bigint;
                        accruedInterest: bigint;
                        startTime: bigint;
                        aprBps: bigint;
                    }[];
                };
                lender: `0x${string}`;
                borrower: `0x${string}`;
                fee: bigint;
            } | {
                delegate: `0x${string}`;
                collection: `0x${string}`;
                tokenId: bigint;
            })[];
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                id: string;
            };
            loanId: bigint;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            results: ({
                loanId: bigint;
                offerId: readonly bigint[];
                loan: {
                    borrower: `0x${string}`;
                    nftCollateralTokenId: bigint;
                    nftCollateralAddress: `0x${string}`;
                    principalAddress: `0x${string}`;
                    principalAmount: bigint;
                    startTime: bigint;
                    duration: bigint;
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
                };
                fee: bigint;
            } | {
                delegate: `0x${string}`;
                collection: `0x${string}`;
                tokenId: bigint;
            })[];
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
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
                id: string;
            };
            loanId: bigint;
        }>;
    }>;
    liquidateLoan({ loan, loanId }: {
        loan: LoanToMslLoanType;
        loanId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loanId: bigint;
        }>;
    }>;
    placeBid({ collectionContractAddress, tokenId, bid, auction, }: {
        collectionContractAddress: Address;
        tokenId: bigint;
        bid: bigint;
        auction: Auction;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            auctionContract: `0x${string}`;
            tokenId: bigint;
            newBidder: `0x${string}`;
            bid: bigint;
            loanAddress: `0x${string}`;
            loanId: bigint;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            collection: `0x${string}`;
            tokenId: bigint;
            newBidder: `0x${string}`;
            bid: bigint;
            loanAddress: `0x${string}`;
            loanId: bigint;
        }>;
    }>;
    settleAuction({ loan, auction }: {
        loan: LoanToMslLoanType;
        auction: Auction;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loanContract: `0x${string}`;
            loanId: bigint;
            collection: `0x${string}`;
            tokenId: bigint;
            asset: `0x${string}`;
            proceeds: bigint;
            settler: `0x${string}`;
            triggerFee: bigint;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loanContract: `0x${string}`;
            loanId: bigint;
            auctionContract: `0x${string}`;
            tokenId: bigint;
            asset: `0x${string}`;
            proceeds: bigint;
            settler: `0x${string}`;
            triggerFee: bigint;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loanContract: `0x${string}`;
            loanId: bigint;
            auctionContract: `0x${string}`;
            tokenId: bigint;
            asset: `0x${string}`;
            highestBid: bigint;
            settler: `0x${string}`;
            triggerFee: bigint;
        }>;
    }>;
    settleAuctionWithBuyout({ loan, auction }: {
        loan: LoanToMslLoanType;
        auction: Auction;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loanAddress: `0x${string}`;
            loanId: bigint;
            nftAddress: `0x${string}`;
            tokenId: bigint;
            largestTrancheIdx: bigint;
        }>;
    }>;
    getAuctionRemainingLockupSeconds({ auction }: {
        auction: Auction;
    }): Promise<number>;
    buy(tokensToBuy: {
        collectionContractAddress: Address;
        tokenId: bigint;
        price: bigint;
        orderSource: string;
    }[]): Promise<true | import("@reservoir0x/reservoir-sdk").Execute>;
    leverageBuy({ leverageBuyData, }: {
        leverageBuyData: {
            offer: OfferV5 & {
                signature: Hash;
            };
            expirationTime: bigint;
            amount: bigint;
            nft: {
                collectionContractAddress: Address;
                tokenId: bigint;
                price: bigint;
                orderSource: string;
            };
        }[];
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            _loanIds: readonly bigint[];
        }>;
    }>;
    leverageSell({ loan, loanId, price, orderSource, }: {
        loan: LoanV5;
        loanId: bigint;
        price: bigint;
        orderSource: string;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            _loanIds: readonly bigint[];
        }>;
    }>;
    getOwner({ nftAddress, tokenId }: {
        nftAddress: Address;
        tokenId: bigint;
    }): Promise<`0x${string}`>;
    isApprovedNFTForAll({ nftAddress, to, }: {
        nftAddress: Address;
        to?: Address;
    }): Promise<boolean>;
    isApprovedNFT({ nftAddress, isOldErc721, tokenId, to, }: {
        nftAddress: Address;
        to?: Address;
    } & ({
        isOldErc721: true;
        tokenId: bigint;
    } | {
        isOldErc721?: never;
        tokenId?: never;
    })): Promise<boolean>;
    approveNFTForAll({ nftAddress, to, }: {
        nftAddress: Address;
        to?: Address;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            owner: `0x${string}`;
            operator: `0x${string}`;
            approved: boolean;
        }>;
    }>;
    approveNFT({ nftAddress, isOldErc721, tokenId, to, }: {
        nftAddress: Address;
        to?: Address;
    } & ({
        isOldErc721: true;
        tokenId: bigint;
    } | {
        isOldErc721?: never;
        tokenId?: never;
    })): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            owner: `0x${string}`;
            operator: `0x${string}`;
            approved: boolean;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            _owner: `0x${string}`;
            _approved: `0x${string}`;
            _tokenId: bigint;
        }>;
    }>;
    isApprovedToken({ tokenAddress, amount, to, }: {
        tokenAddress: Address;
        amount: bigint;
        to?: Address;
    }): Promise<boolean>;
    approveToken({ tokenAddress, amount, to, }: {
        tokenAddress: Address;
        amount?: bigint;
        to?: Address;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            owner: `0x${string}`;
            spender: `0x${string}`;
            amount: bigint;
        }>;
    }>;
    createUserVault({ nfts, userVaultAddress, }: {
        nfts: Parameters<Contracts['UserVaultV5']['createVault']>[0];
        userVaultAddress?: Address;
    }): Promise<{
        vaultId: bigint;
        receipts: {
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            vaultId: bigint;
            collection: `0x${string}`;
            tokenId: bigint;
        }[];
    }>;
    depositUserVaultERC721s({ userVaultAddress, ...data }: {
        userVaultAddress?: Address;
    } & Parameters<Contracts['UserVaultV5']['depositERC721s']>[0]): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            vaultId: bigint;
            collection: `0x${string}`;
            tokenId: bigint;
        }>;
    }>;
    depositUserVaultOldERC721s({ userVaultAddress, ...data }: {
        userVaultAddress?: Address;
    } & Parameters<Contracts['UserVaultV6']['depositERC721s']>[0]): Promise<void | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            vaultId: bigint;
            collection: `0x${string}`;
            tokenId: bigint;
        }>;
    }>;
    burnUserVaultAndWithdraw({ userVaultAddress, ...data }: {
        userVaultAddress?: Address;
    } & Parameters<Contracts['UserVaultV5']['burnAndWithdraw']>[0]): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            events: {
                vaultId: bigint;
                collection: `0x${string}`;
                tokenId: bigint;
            }[];
            oldEvents: {
                vaultId: bigint;
                collection: `0x${string}`;
                tokenId: bigint;
            }[];
        }>;
    }>;
}
interface GondiProps {
    wallet: Wallet;
    apiClient?: ApiProps['apiClient'];
    reservoirBaseApiUrl?: string;
}
type MakeOfferType = Omit<Awaited<ReturnType<Gondi['makeSingleNftOffer']>>, 'nftId'> | Omit<Awaited<ReturnType<Gondi['makeCollectionOffer']>>, 'collectionId'>;
type OfferFromExecutionOffer = OptionalNullable<MakeOfferType, 'borrowerAddress' | 'lenderAddress' | 'offerHash' | 'signature'>;
export interface EmitLoanArgs {
    offerExecution: {
        offer: Omit<model.SingleNftOffer | model.CollectionOffer, 'nftId'>;
        amount?: bigint;
        lenderOfferSignature: Hash;
    }[];
    tokenId: bigint;
    duration: bigint;
    principalReceiver?: Address;
    expirationTime?: bigint;
}
export {};
