import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getAddress } from 'viem';

import { zeroAddress } from '@/blockchain';
import { apolloClient } from '@/clients/api/client';
import { getSdkApollo } from '@/clients/api/sdk';
import { Wallet } from '@/clients/contracts';
import {
  BnplOrderInput,
  CollectionOrderInput,
  CollectionSignedOfferInput,
  ListListingsQueryVariables,
  ListLoansQueryVariables,
  ListOffersQueryVariables,
  NftOrderInput,
  SingleNftOrderInput,
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
  getSaleCalldata;
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
  showOrder;

  constructor({ apiClient, wallet }: Props) {
    const gqlClient = apiClient ?? apolloClient(wallet);
    this.api = getSdkApollo(gqlClient);

    this.getSaleCalldata = this.api.getSaleCalldata;
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
    this.showOrder = this.api.showOrder;
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

  async publishOrder(orderInput: SingleNftOrderInput | CollectionOrderInput) {
    if ('tokenId' in orderInput) {
      const response = await this.api.publishOrderForNft({ orderInput });
      return response.result;
    }
    if ('collectionId' in orderInput) {
      const response = await this.api.publishOrderForCollection({ orderInput });
      return response.result;
    }
    throw new Error('Invalid order input');
  }

  async publishSellAndRepayOrder(orderInput: NftOrderInput) {
    const response = await this.api.publishSellAndRepayOrder({ orderInput });
    return response.result;
  }

  async publishBuyNowPayLaterOrder(orderInput: BnplOrderInput) {
    const response = await this.api.publishBuyNowPayLaterOrder({ orderInput });
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

  async saveRefinanceOffer(
    renegotiation: RenegotiationOffer,
    fallbackOffer?: SingleNftSignedOfferInput,
  ) {
    const response = await this.api.saveRenegotiationOffer({ renegotiation, fallbackOffer });
    return { ...renegotiation, id: response.renegotiation.id };
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
