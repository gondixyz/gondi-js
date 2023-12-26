import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { Wallet, zeroAddress } from "@/blockchain";
import {
  CollectionSignedOfferInput,
  ListListingsQueryVariables,
  ListLoansQueryVariables,
  ListOffersQueryVariables,
  SingleNftSignedOfferInput,
} from "@/generated/graphql";
import { apolloClient } from "@/graphql/client";
import { getSdkApollo } from "@/graphql/sdk";

import { RenegotiationOffer } from "./model";

export type Props = {
  apiClient?: ApolloClient<NormalizedCacheObject>;
  wallet: Wallet;
};

type PageInfo = { endCursor?: string | null; hasNextPage: boolean };

const mapPageInfo = ({ endCursor, hasNextPage }: PageInfo) =>
  hasNextPage
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ? { hasNextPage, cursor: endCursor! }
    : { hasNextPage, cursor: null };

export class Api {
  api: ReturnType<typeof getSdkApollo>;
  generateSingleNftOfferHash;
  generateCollectionOfferHash;
  generateRenegotiationOfferHash;
  nftIdBySlugTokenId;
  nftIdByContractAddressAndTokenId;
  collectionIdBySlug;
  collectionsIdByContractAddress;
  listNft;
  unlistNft;
  hideOffer;
  hideRenegotiationOffer;
  unhideOffer;
  unhideRenegotiationOffer;
  saveSignedSaleOffer;
  hideSaleOffer;
  unhideSaleOffer;
  listBestBidsForNft;

  constructor({ apiClient, wallet }: Props) {
    const gqlClient = apiClient ?? apolloClient(wallet);
    this.api = getSdkApollo(gqlClient);

    this.generateSingleNftOfferHash = this.api.generateSingleNftOfferHash;
    this.generateCollectionOfferHash = this.api.generateCollectionOfferHash;
    this.generateRenegotiationOfferHash =
      this.api.generateRenegotiationOfferHash;
    this.nftIdBySlugTokenId = this.api.nftIdBySlugTokenId;
    this.nftIdByContractAddressAndTokenId =
      this.api.nftIdByContractAddressAndTokenId;
    this.collectionIdBySlug = this.api.collectionIdBySlug;
    this.collectionsIdByContractAddress =
      this.api.collectionsIdByContractAddress;
    this.listNft = this.api.listNft;
    this.unlistNft = this.api.unlistNft;
    this.saveSignedSaleOffer = this.api.saveSignedSaleOffer;
    this.hideOffer = this.api.hideOffer;
    this.hideRenegotiationOffer = this.api.hideRenegotiationOffer;
    this.unhideOffer = this.api.unhideOffer;
    this.unhideRenegotiationOffer = this.api.unhideRenegotiationOffer;
    this.hideSaleOffer = this.api.hideSaleOffer;
    this.unhideSaleOffer = this.api.unhideSaleOffer;
    this.listBestBidsForNft = this.api.listBestBidsForNft;
  }

  async saveSingleNftOffer(offerInput: SingleNftSignedOfferInput) {
    const offer = {
      ...offerInput,
      borrowerAddress: offerInput.borrowerAddress || zeroAddress,
    };
    const response = await this.api.saveSingleNftOffer({ offer });
    const nftCollateralAddress =
      response.offer.nft.collection?.contractData?.contractAddress ||
      zeroAddress;
    return {
      id: response.offer.id,
      nftCollateralAddress,
      nftCollateralTokenId: response.offer.nft.tokenId,
      ...offerInput,
    };
  }

  async saveCollectionOffer(offerInput: CollectionSignedOfferInput) {
    const offer = {
      ...offerInput,
      borrowerAddress: offerInput.borrowerAddress || zeroAddress,
    };
    const response = await this.api.saveCollectionOffer({ offer });
    const nftCollateralAddress =
      response.offer.collection?.contractData?.contractAddress || zeroAddress;
    return {
      id: response.offer.id,
      nftCollateralAddress,
      nftCollateralTokenId: 0n,
      ...offerInput,
    };
  }

  async saveRefinanceOffer(offerInput: RenegotiationOffer) {
    const response = await this.api.saveRenegotiationOffer({
      offer: offerInput,
    });
    return {
      id: response.offer.id,
      ...offerInput,
    };
  }
  async listOffers(props: ListOffersQueryVariables) {
    const {
      result: { edges, pageInfo },
    } = await this.api.listOffers(props);
    const offers = edges.map((edge) => {
      const {
        __typename,
        lenderAddress,
        borrowerAddress,
        signerAddress,
        ...node
      } = edge.node;
      return {
        type: __typename,
        lender: lenderAddress,
        borrower: borrowerAddress,
        signer: signerAddress,
        ...node,
      };
    });
    return {
      ...mapPageInfo(pageInfo),
      offers,
    };
  }

  async listLoans(props: ListLoansQueryVariables) {
    const {
      loans: { edges, pageInfo },
    } = await this.api.listLoans(props);
    const loans = edges.map((edge) => {
      const { __typename, ...node } = edge.node;
      return {
        type: __typename,
        ...node,
      };
    });
    return {
      ...mapPageInfo(pageInfo),
      loans,
    };
  }

  async listListings(props: ListListingsQueryVariables) {
    const {
      result: { edges, pageInfo },
    } = await this.api.listListings(props);
    const listings = edges.map((edge) => edge.node);
    return {
      ...mapPageInfo(pageInfo),
      listings,
    };
  }
}
