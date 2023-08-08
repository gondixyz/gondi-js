import {
  CollectionSignedOfferInput,
  ListOffersQueryVariables,
  SingleNftSignedOfferInput,
} from "@/generated/graphql";

import { Wallet, zeroAddress } from "@/blockchain";
import { apolloClient } from "@/graphql/client";
import { getSdkApollo } from "@/graphql/sdk";
import { RenegotiationOffer } from "./model";

export type Props = { apiClient?: never; wallet: Wallet };

export class Api {
  api: ReturnType<typeof getSdkApollo>;
  generateSingleNftOfferHash;
  generateCollectionOfferHash;
  generateRenegotiationOfferHash;
  listListings;
  nftId;
  collectionId;
  listNft;
  unlistNft;
  hideOffer;
  hideRenegotiationOffer;

  constructor({ apiClient, wallet }: Props) {
    const gqlClient = apiClient ?? apolloClient(wallet);
    this.api = getSdkApollo(gqlClient);

    this.generateSingleNftOfferHash = this.api.generateSingleNftOfferHash;
    this.generateCollectionOfferHash = this.api.generateCollectionOfferHash;
    this.generateRenegotiationOfferHash =
      this.api.generateRenegotiationOfferHash;
    this.listListings = this.api.listListings;
    this.nftId = this.api.nftId;
    this.collectionId = this.api.collectionId;
    this.listNft = this.api.listNft;
    this.unlistNft = this.api.unlistNft;
    this.hideOffer = this.api.hideOffer;
    this.hideRenegotiationOffer = this.api.hideRenegotiationOffer;
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
    } = await this.api.listOffers({
      ...props,
    });
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
      cursor: pageInfo.endCursor,
      offers,
    };
  }
}
