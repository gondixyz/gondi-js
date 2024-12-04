import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getAddress } from 'viem';

import { apolloClient } from '@/api/client';
import { getSdkApollo } from '@/api/sdk';
import { zeroAddress } from '@/blockchain';
import { Wallet } from '@/contracts';
import {
  CollectionSignedOfferInput,
  ListListingsQueryVariables,
  ListLoansQueryVariables,
  ListOffersQueryVariables,
  NftOrderInput,
  SingleNftSignedOfferInput,
} from '@/generated/graphql';
import { RenegotiationOffer } from '@/model';
import { isDefined } from '@/utils/types';

export type Props = {
  apiClient?: ApolloClient<NormalizedCacheObject>;
  wallet: Wallet;
};

type PageInfo = { endCursor?: string | null; hasNextPage: boolean };

const mapPageInfo = ({ endCursor, hasNextPage }: PageInfo) =>
  hasNextPage
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      { hasNextPage, cursor: endCursor! }
    : { hasNextPage, cursor: null };

export const apiDomain = () => process.env.GONDI_URL ?? 'https://api.gondi.xyz';

export class Api {
  api: ReturnType<typeof getSdkApollo>;
  generateSingleNftOfferHash;
  generateCollectionOfferHash;
  generateRenegotiationOfferHash;
  nftIdBySlugTokenId;
  nftIdByContractAddressAndTokenId;
  collections;
  collectionIdBySlug;
  collectionsIdByContractAddress;
  collectionByContractAddress;
  listNft;
  unlistNft;
  ownedNfts;
  hideOffer;
  hideRenegotiationOffer;
  unhideOffer;
  unhideRenegotiationOffer;
  hideOrder;
  unhideOrder;

  constructor({ apiClient, wallet }: Props) {
    const gqlClient = apiClient ?? apolloClient(wallet);
    this.api = getSdkApollo(gqlClient);

    this.generateSingleNftOfferHash = this.api.generateSingleNftOfferHash;
    this.generateCollectionOfferHash = this.api.generateCollectionOfferHash;
    this.generateRenegotiationOfferHash = this.api.generateRenegotiationOfferHash;
    this.nftIdBySlugTokenId = this.api.nftIdBySlugTokenId;
    this.nftIdByContractAddressAndTokenId = this.api.nftIdByContractAddressAndTokenId;
    this.collectionIdBySlug = this.api.collectionIdBySlug;
    this.collectionsIdByContractAddress = this.api.collectionsIdByContractAddress;
    this.collections = this.api.collections;
    this.collectionByContractAddress = this.api.collectionByContractAddress;
    this.listNft = this.api.listNft;
    this.unlistNft = this.api.unlistNft;
    this.ownedNfts = this.api.ownedNfts;
    this.hideOffer = this.api.hideOffer;
    this.hideRenegotiationOffer = this.api.hideRenegotiationOffer;
    this.unhideOffer = this.api.unhideOffer;
    this.unhideRenegotiationOffer = this.api.unhideRenegotiationOffer;
    this.hideOrder = this.api.hideOrder;
    this.unhideOrder = this.api.unhideOrder;
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
      id: response.offer.id,
      nftCollateralAddress,
      nftCollateralTokenId: response.offer.nft.tokenId,
      ...offerInput,
    };
  }

  async publishOrder(orderInput: NftOrderInput) {
    const response = await this.api.publishOrder({ orderInput });
    return response.result;
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
    const offers = edges
      .map((edge) => {
        const { __typename, ...node } = edge.node;
        const nftCollateralAddress =
          'collection' in node
            ? node.collection.contractData?.contractAddress
            : node.nft.collection?.contractData?.contractAddress;
        const nftCollateralTokenId = 'collection' in node ? 0n : node.nft.tokenId;
        if (!isDefined(nftCollateralAddress)) return undefined;
        return {
          ...node,
          type: __typename,
          lender: node.lenderAddress,
          borrower: node.borrowerAddress,
          signer: node.signerAddress,
          offerValidators: node.validators,
          nftCollateralAddress,
          nftCollateralTokenId,
        };
      })
      .filter(isDefined);
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
        ...node,
        type: __typename,
        contractAddress: node.address,
        nftCollateralTokenId: node.nft.tokenId,
        nftCollateralAddress: node.nft.collection?.contractData?.contractAddress,
        borrower: node.borrowerAddress,
        startTime: BigInt(Math.floor(node.startTime.getTime() / 1_000)),
        source: node.sources.map((source) => ({
          ...source,
          lender: getAddress(source.lenderAddress),
          loanId: BigInt(source.loanId),
          startTime: BigInt(Math.floor(source.startTime.getTime() / 1_000)),
        })),
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

  async getWrapperAddress(collection: {
    contractData: { contractAddress: `0x${string}` };
    wrapperCollections?: { contractData: { contractAddress: `0x${string}` } }[];
  }) {
    if (collection.wrapperCollections)
      return collection.wrapperCollections[0]?.contractData?.contractAddress;
    const { collection: collections } = await this.api.collectionByContractAddress({
      contractAddress: collection.contractData.contractAddress,
    });
    const wrapperAddress = collections[0]?.wrapperCollections[0]?.contractData?.contractAddress;
    if (!wrapperAddress) throw Error('Collection has no associated wrappers');
    return wrapperAddress;
  }
}
