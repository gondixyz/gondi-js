import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getSdkApollo } from '../api/sdk';
import { Wallet } from '../contracts';
import { CollectionSignedOfferInput, ListListingsQueryVariables, ListLoansQueryVariables, ListOffersQueryVariables, SingleNftSignedOfferInput } from '../generated/graphql';
import { RenegotiationOffer } from '../model';
export type Props = {
    apiClient?: ApolloClient<NormalizedCacheObject>;
    wallet: Wallet;
};
export declare const apiDomain: () => string;
export declare class Api {
    api: ReturnType<typeof getSdkApollo>;
    generateSingleNftOfferHash: (variables: import("../generated/graphql").Exact<{
        offerInput: import("../generated/graphql").SingleNftOfferInput;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").GenerateSingleNftOfferHashMutation>;
    generateCollectionOfferHash: (variables: import("../generated/graphql").Exact<{
        offerInput: import("../generated/graphql").CollectionOfferInput;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").GenerateCollectionOfferHashMutation>;
    generateRenegotiationOfferHash: (variables: import("../generated/graphql").Exact<{
        renegotiationInput: import("../generated/graphql").RenegotiationOfferInput;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").GenerateRenegotiationOfferHashMutation>;
    nftIdBySlugTokenId: (variables: import("../generated/graphql").Exact<{
        slug: string;
        tokenId: bigint;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").NftIdBySlugTokenIdQuery>;
    nftIdByContractAddressAndTokenId: (variables: import("../generated/graphql").Exact<{
        contractAddress: `0x${string}`;
        tokenId: bigint;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").NftIdByContractAddressAndTokenIdQuery>;
    collections: (variables: import("../generated/graphql").Exact<{
        currency: `0x${string}`;
        after?: import("../generated/graphql").InputMaybe<string> | undefined;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").CollectionsQuery>;
    collectionIdBySlug: (variables: import("../generated/graphql").Exact<{
        slug: string;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").CollectionIdBySlugQuery>;
    collectionsIdByContractAddress: (variables: import("../generated/graphql").Exact<{
        contractAddress: `0x${string}`;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").CollectionsIdByContractAddressQuery>;
    listNft: (variables: import("../generated/graphql").Exact<{
        nftId: number;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").ListNftMutation>;
    unlistNft: (variables: import("../generated/graphql").Exact<{
        nftId: number;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").UnlistNftMutation>;
    ownedNfts: (variables?: import("../generated/graphql").Exact<{
        after?: import("../generated/graphql").InputMaybe<string> | undefined;
    }> | undefined, options?: {} | undefined) => Promise<import("../generated/graphql").OwnedNftsQuery>;
    hideOffer: (variables: import("../generated/graphql").Exact<{
        contract: `0x${string}`;
        id: string;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").HideOfferMutation>;
    hideRenegotiationOffer: (variables: import("../generated/graphql").Exact<{
        id: string;
        contractAddress: `0x${string}`;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").HideRenegotiationOfferMutation>;
    unhideOffer: (variables: import("../generated/graphql").Exact<{
        contract: `0x${string}`;
        id: string;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").UnhideOfferMutation>;
    unhideRenegotiationOffer: (variables: import("../generated/graphql").Exact<{
        id: string;
        contractAddress: `0x${string}`;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").UnhideRenegotiationOfferMutation>;
    saveSignedSaleOffer: (variables: import("../generated/graphql").Exact<{
        offer: import("../generated/graphql").SignedOrderInput;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").SaveSignedSaleOfferMutation>;
    hideSaleOffer: (variables: import("../generated/graphql").Exact<{
        id: string;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").HideSaleOfferMutation>;
    unhideSaleOffer: (variables: import("../generated/graphql").Exact<{
        id: string;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").UnhideSaleOfferMutation>;
    listBestBidsForNft: (variables: import("../generated/graphql").Exact<{
        nftId: number;
        currencyAddress: string;
    }>, options?: {} | undefined) => Promise<import("../generated/graphql").ListBestBidsForNftQuery>;
    constructor({ apiClient, wallet }: Props);
    saveSingleNftOffer(offerInput: SingleNftSignedOfferInput): Promise<{
        aprBps: bigint;
        borrowerAddress: `0x${string}`;
        capacity: bigint;
        contractAddress: `0x${string}`;
        duration: bigint;
        expirationTime: bigint;
        fee: bigint;
        lenderAddress: `0x${string}`;
        maxSeniorRepayment?: import("../generated/graphql").InputMaybe<bigint> | undefined;
        maxTrancheFloor?: import("../generated/graphql").InputMaybe<bigint> | undefined;
        nftId: number;
        offerHash: `0x${string}`;
        offerId: bigint;
        offerValidators: import("../generated/graphql").OfferValidatorInput[];
        principalAddress: `0x${string}`;
        principalAmount: bigint;
        requiresLiquidation?: import("../generated/graphql").InputMaybe<boolean> | undefined;
        signature: `0x${string}`;
        signerAddress?: import("../generated/graphql").InputMaybe<`0x${string}`> | undefined;
        id: string;
        nftCollateralAddress: `0x${string}`;
        nftCollateralTokenId: bigint;
    }>;
    saveCollectionOffer(offerInput: CollectionSignedOfferInput): Promise<{
        aprBps: bigint;
        borrowerAddress: `0x${string}`;
        capacity: bigint;
        collectionId: number;
        contractAddress: `0x${string}`;
        duration: bigint;
        expirationTime: bigint;
        fee: bigint;
        lenderAddress: `0x${string}`;
        maxSeniorRepayment?: import("../generated/graphql").InputMaybe<bigint> | undefined;
        maxTrancheFloor?: import("../generated/graphql").InputMaybe<bigint> | undefined;
        offerHash: `0x${string}`;
        offerId: bigint;
        offerValidators: import("../generated/graphql").OfferValidatorInput[];
        principalAddress: `0x${string}`;
        principalAmount: bigint;
        requiresLiquidation?: import("../generated/graphql").InputMaybe<boolean> | undefined;
        signature: `0x${string}`;
        signerAddress?: import("../generated/graphql").InputMaybe<`0x${string}`> | undefined;
        id: string;
        nftCollateralAddress: `0x${string}`;
        nftCollateralTokenId: bigint;
    }>;
    saveRefinanceOffer(offerInput: RenegotiationOffer): Promise<{
        loanId: string;
        principalAmount: bigint;
        duration: bigint;
        aprBps: bigint;
        renegotiationId: bigint;
        trancheIndex?: import("../generated/graphql").InputMaybe<bigint[]> | undefined;
        expirationTime: bigint;
        lenderAddress: `0x${string}`;
        signerAddress?: import("../generated/graphql").InputMaybe<`0x${string}`> | undefined;
        requiresLiquidation?: import("../generated/graphql").InputMaybe<boolean> | undefined;
        targetPrincipal?: import("../generated/graphql").InputMaybe<bigint[]> | undefined;
        strictImprovement?: import("../generated/graphql").InputMaybe<boolean> | undefined;
        offerHash: `0x${string}`;
        feeAmount: bigint;
        isAddNewTranche?: import("../generated/graphql").InputMaybe<boolean> | undefined;
        signature: `0x${string}`;
        id: string;
    }>;
    listOffers(props: ListOffersQueryVariables): Promise<{
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
    listLoans(props: ListLoansQueryVariables): Promise<{
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
    listListings(props: ListListingsQueryVariables): Promise<{
        listings: {
            __typename?: "Listing" | undefined;
            id: string;
            marketplaceName: import("../generated/graphql").MarketplaceEnum;
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
            marketplaceName: import("../generated/graphql").MarketplaceEnum;
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
}
