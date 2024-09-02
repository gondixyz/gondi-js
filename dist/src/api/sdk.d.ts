import { ApolloClient, MutationOptions, QueryOptions } from '@apollo/client/core/index.js';
export type ApolloRequesterOptions<V, R> = Omit<QueryOptions<V>, 'variables' | 'query'> | Omit<MutationOptions<R, V>, 'variables' | 'mutation'>;
export declare function getSdkApollo<C>(client: ApolloClient<C>): {
    listNft(variables: import("../generated/graphql").Exact<{
        nftId: number;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").ListNftMutation>;
    unlistNft(variables: import("../generated/graphql").Exact<{
        nftId: number;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").UnlistNftMutation>;
    generateCollectionOfferHash(variables: import("../generated/graphql").Exact<{
        offerInput: import("../generated/graphql").CollectionOfferInput;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").GenerateCollectionOfferHashMutation>;
    saveCollectionOffer(variables: import("../generated/graphql").Exact<{
        offer: import("../generated/graphql").CollectionSignedOfferInput;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").SaveCollectionOfferMutation>;
    hideOffer(variables: import("../generated/graphql").Exact<{
        contract: `0x${string}`;
        id: string;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").HideOfferMutation>;
    generateSingleNftOfferHash(variables: import("../generated/graphql").Exact<{
        offerInput: import("../generated/graphql").SingleNftOfferInput;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").GenerateSingleNftOfferHashMutation>;
    saveSingleNftOffer(variables: import("../generated/graphql").Exact<{
        offer: import("../generated/graphql").SingleNftSignedOfferInput;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").SaveSingleNftOfferMutation>;
    unhideOffer(variables: import("../generated/graphql").Exact<{
        contract: `0x${string}`;
        id: string;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").UnhideOfferMutation>;
    generateRenegotiationOfferHash(variables: import("../generated/graphql").Exact<{
        renegotiationInput: import("../generated/graphql").RenegotiationOfferInput;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").GenerateRenegotiationOfferHashMutation>;
    hideRenegotiationOffer(variables: import("../generated/graphql").Exact<{
        id: string;
        contractAddress: `0x${string}`;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").HideRenegotiationOfferMutation>;
    saveRenegotiationOffer(variables: import("../generated/graphql").Exact<{
        offer: import("../generated/graphql").SignedRenegotiationOfferInput;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").SaveRenegotiationOfferMutation>;
    unhideRenegotiationOffer(variables: import("../generated/graphql").Exact<{
        id: string;
        contractAddress: `0x${string}`;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").UnhideRenegotiationOfferMutation>;
    hideSaleOffer(variables: import("../generated/graphql").Exact<{
        id: string;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").HideSaleOfferMutation>;
    listBestBidsForNft(variables: import("../generated/graphql").Exact<{
        nftId: number;
        currencyAddress: string;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").ListBestBidsForNftQuery>;
    saveSignedSaleOffer(variables: import("../generated/graphql").Exact<{
        offer: import("../generated/graphql").SignedOrderInput;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").SaveSignedSaleOfferMutation>;
    unhideSaleOffer(variables: import("../generated/graphql").Exact<{
        id: string;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").UnhideSaleOfferMutation>;
    collections(variables: import("../generated/graphql").Exact<{
        currency: `0x${string}`;
        after?: import("../generated/graphql").InputMaybe<string> | undefined;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").CollectionsQuery>;
    collectionsIdByContractAddress(variables: import("../generated/graphql").Exact<{
        contractAddress: `0x${string}`;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").CollectionsIdByContractAddressQuery>;
    collectionIdBySlug(variables: import("../generated/graphql").Exact<{
        slug: string;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").CollectionIdBySlugQuery>;
    listListings(variables?: import("../generated/graphql").Exact<{
        collections?: import("../generated/graphql").InputMaybe<number | number[]> | undefined;
        userFilter?: import("../generated/graphql").InputMaybe<import("../generated/graphql").UserFilter> | undefined;
        marketplaceNames?: import("../generated/graphql").InputMaybe<import("../generated/graphql").MarketplaceEnum | import("../generated/graphql").MarketplaceEnum[]> | undefined;
        first?: import("../generated/graphql").InputMaybe<number> | undefined;
        after?: import("../generated/graphql").InputMaybe<string> | undefined;
    }> | undefined, options?: {} | undefined): Promise<import("../generated/graphql").ListListingsQuery>;
    listLoans(variables?: import("../generated/graphql").Exact<{
        borrowers?: import("../generated/graphql").InputMaybe<string | string[]> | undefined;
        collections?: import("../generated/graphql").InputMaybe<number | number[]> | undefined;
        nfts?: import("../generated/graphql").InputMaybe<number | number[]> | undefined;
        statuses?: import("../generated/graphql").InputMaybe<import("../generated/graphql").LoanStatusType | import("../generated/graphql").LoanStatusType[]> | undefined;
        sortBy?: import("../generated/graphql").InputMaybe<import("../generated/graphql").LoanSortInput | import("../generated/graphql").LoanSortInput[]> | undefined;
        terms?: import("../generated/graphql").InputMaybe<import("../generated/graphql").TermsFilter> | undefined;
        orderByStatuses?: import("../generated/graphql").InputMaybe<boolean> | undefined;
        loansCurrencyAddress?: import("../generated/graphql").InputMaybe<`0x${string}`> | undefined;
        first?: import("../generated/graphql").InputMaybe<number> | undefined;
        after?: import("../generated/graphql").InputMaybe<string> | undefined;
    }> | undefined, options?: {} | undefined): Promise<import("../generated/graphql").ListLoansQuery>;
    nftIdByContractAddressAndTokenId(variables: import("../generated/graphql").Exact<{
        contractAddress: `0x${string}`;
        tokenId: bigint;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").NftIdByContractAddressAndTokenIdQuery>;
    nftIdBySlugTokenId(variables: import("../generated/graphql").Exact<{
        slug: string;
        tokenId: bigint;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").NftIdBySlugTokenIdQuery>;
    ownedNfts(variables?: import("../generated/graphql").Exact<{
        after?: import("../generated/graphql").InputMaybe<string> | undefined;
    }> | undefined, options?: {} | undefined): Promise<import("../generated/graphql").OwnedNftsQuery>;
    listOffers(variables: import("../generated/graphql").Exact<{
        borrowerAddress?: import("../generated/graphql").InputMaybe<string> | undefined;
        lenders?: import("../generated/graphql").InputMaybe<string | string[]> | undefined;
        sortBy: import("../generated/graphql").OffersSortInput;
        terms?: import("../generated/graphql").InputMaybe<import("../generated/graphql").TermsFilter> | undefined;
        statuses?: import("../generated/graphql").InputMaybe<import("../generated/graphql").OfferStatus | import("../generated/graphql").OfferStatus[]> | undefined;
        nfts?: import("../generated/graphql").InputMaybe<number | number[]> | undefined;
        collections?: import("../generated/graphql").InputMaybe<number | number[]> | undefined;
        onlySingleNftOffers?: import("../generated/graphql").InputMaybe<boolean> | undefined;
        onlyCollectionOffers?: import("../generated/graphql").InputMaybe<boolean> | undefined;
        first?: import("../generated/graphql").InputMaybe<number> | undefined;
        after?: import("../generated/graphql").InputMaybe<string> | undefined;
    }>, options?: {} | undefined): Promise<import("../generated/graphql").ListOffersQuery>;
};
export type Sdk = ReturnType<typeof getSdkApollo>;
