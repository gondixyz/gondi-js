import {
  CollectionSignedOfferInput,
  ListOffersQueryVariables,
  SingleNftSignedOfferInput,
} from '@/graphql-generated/generated';

import { Wallet, zeroAddress } from './blockchain';
import { apolloClient } from './graphql/client';
import { getSdkApollo } from './graphql/sdk';

export type Props = { apiClient?: never; wallet: Wallet };

export class Api {
  api: ReturnType<typeof getSdkApollo>;
  generateSingleNftOfferHash;
  generateCollectionOfferHash;
  generateRenegotiationOfferHash;
  saveRefinanceOffer;
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
    this.generateRenegotiationOfferHash = this.api.generateRenegotiationOfferHash;
    this.saveRefinanceOffer = this.api.saveRenegotiationOffer;
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
      response.offer.nft.collection?.contractData?.contractAddress || zeroAddress;
    return {
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
      nftCollateralAddress,
      nftCollateralTokenId: 0n,
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
      const { __typename, lenderAddress, borrowerAddress, signerAddress, ...node } = edge.node;
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
