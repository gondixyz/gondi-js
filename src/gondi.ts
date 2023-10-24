import {
  Address,
  Chain,
  createPublicClient,
  createTransport,
  PublicClient,
  Transport,
} from "viem";

import { Api, Props as ApiProps } from "@/api";
import {
  Contracts,
  filterLogs,
  LoanV4V5,
  Wallet,
  zeroAddress,
  zeroHash,
  zeroHex,
} from "@/blockchain";
import {
  MarketplaceEnum,
  OffersSortField,
  Ordering,
} from "@/generated/graphql";
import * as model from "@/model";

import { millisToSeconds, SECONDS_IN_DAY } from "./utils";

type GondiProps = {
  wallet: Wallet;
  apiClient?: ApiProps["apiClient"];
};

export class Gondi {
  contracts: Contracts;
  wallet: Wallet;
  bcClient: PublicClient<Transport, Chain>;
  api: Api;

  constructor({ wallet, apiClient }: GondiProps) {
    this.wallet = wallet;
    this.bcClient = createPublicClient({
      transport: ({ chain: _chain }: { chain?: Chain }) =>
        createTransport(wallet.transport),
    });
    this.contracts = new Contracts(this.bcClient, wallet);
    this.api = new Api({ wallet, apiClient });
  }

  async makeSingleNftOffer(offer: model.SingleNftOfferInput) {
    return await this._makeSingleNftOffer(offer);
  }

  /** @internal */
  async _makeSingleNftOffer(
    offer: model.SingleNftOfferInput,
    mslContractAddress?: Address
  ) {
    const contract = mslContractAddress
      ? this.contracts.Msl(mslContractAddress)
      : this.contracts.MultiSourceLoanV5;
    const contractAddress = contract.address;

    const offerInput = {
      ...offer,
      lenderAddress: this.wallet.account?.address,
      signerAddress: this.wallet.account?.address,
      borrowerAddress: offer.borrowerAddress ?? zeroAddress,
      requiresLiquidation: !!offer.requiresLiquidation,
      contractAddress,
      offerValidators: [], // This is ignored by the API but it was required in the mutation
    };

    const response = await this.api.generateSingleNftOfferHash({ offerInput });

    const {
      offerHash,
      offerId,
      validators,
      lenderAddress,
      signerAddress,
      borrowerAddress,
    } = response.offer;
    const collateralAddress =
      response.offer.nft.collection?.contractData?.contractAddress;

    if (collateralAddress === undefined) throw new Error("Invalid nft");

    const structToSign = {
      ...offerInput,
      lender: lenderAddress ?? offerInput.lenderAddress,
      signer: signerAddress ?? offerInput.signerAddress,
      borrower: borrowerAddress ?? offerInput.borrowerAddress,
      nftCollateralTokenId: response.offer.nft.tokenId,
      nftCollateralAddress: collateralAddress,
      validators,
      offerId,
    };

    const signature = await contract.signOffer({
      verifyingContract: offerInput.contractAddress,
      structToSign,
    });

    const signedOffer = {
      ...offerInput,
      offerValidators: validators.map((validator) => ({
        arguments: validator.arguments,
        validator: validator.validator,
      })),
      offerHash: offerHash ?? zeroHash,
      offerId,
      signature,
    };

    return await this.api.saveSingleNftOffer(signedOffer);
  }

  async makeCollectionOffer(offer: model.CollectionOfferInput) {
    return await this._makeCollectionOffer(offer);
  }

  /** @internal */
  async _makeCollectionOffer(
    offer: model.CollectionOfferInput,
    mslContractAddress?: Address
  ) {
    const contract = mslContractAddress
      ? this.contracts.Msl(mslContractAddress)
      : this.contracts.MultiSourceLoanV5;
    const contractAddress = contract.address;

    const offerInput = {
      ...offer,
      lenderAddress: this.wallet.account?.address,
      signerAddress: this.wallet.account?.address,
      borrowerAddress: offer.borrowerAddress ?? zeroAddress,
      requiresLiquidation: !!offer.requiresLiquidation,
      contractAddress,
      offerValidators: [
        // This is ignored by the API but it was required in the mutation
        {
          validator: zeroAddress,
          arguments: zeroHex,
        },
      ],
    };
    const response = await this.api.generateCollectionOfferHash({ offerInput });
    const collateralAddress =
      response.offer.collection.contractData?.contractAddress;

    if (collateralAddress === undefined) throw new Error("Invalid collection");

    const {
      offerHash,
      offerId,
      validators,
      lenderAddress,
      signerAddress,
      borrowerAddress,
    } = response.offer;
    const structToSign = {
      ...offerInput,
      lender: lenderAddress ?? offerInput.lenderAddress,
      signer: signerAddress ?? offerInput.signerAddress,
      borrower: borrowerAddress ?? offerInput.borrowerAddress,
      nftCollateralTokenId: 0n,
      nftCollateralAddress: collateralAddress,
      validators,
      offerId,
    };

    const signature = await contract.signOffer({
      verifyingContract: offerInput.contractAddress,
      structToSign,
    });

    const signedOffer = {
      ...offerInput,
      offerValidators: validators.map((validator) => ({
        arguments: validator.arguments,
        validator: validator.validator,
      })),
      offerHash: offerHash ?? zeroHash,
      offerId,
      signature,
    };
    return await this.api.saveCollectionOffer(signedOffer);
  }

  async cancelOffer({
    id,
    contractAddress,
  }: {
    id: bigint;
    contractAddress: Address;
  }) {
    return this.contracts.Msl(contractAddress).cancelOffer({
      id,
    });
  }

  async cancelAllOffers({
    minId,
    contractAddress,
  }: {
    minId: bigint;
    contractAddress: Address;
  }) {
    return this.contracts.Msl(contractAddress).cancelAllOffers({
      minId,
    });
  }

  async hideOffer({
    id,
    contractAddress,
  }: {
    id: bigint;
    contractAddress: Address;
  }) {
    return this.api.hideOffer({ contract: contractAddress, id: id.toString() });
  }

  async unhideOffer({
    id,
    contractAddress,
  }: {
    id: bigint;
    contractAddress: Address;
  }) {
    return this.api.unhideOffer({
      contract: contractAddress,
      id: id.toString(),
    });
  }

  async makeRefinanceOffer({
    renegotiation,
    contractAddress,
    skipSignature,
  }: {
    renegotiation: model.RenegotiationInput;
    contractAddress: Address;
    skipSignature?: boolean;
  }) {
    const renegotiationInput = {
      lenderAddress: this.wallet.account?.address,
      signerAddress: this.wallet.account?.address,
      ...renegotiation,
    };
    const response = await this.api.generateRenegotiationOfferHash({
      renegotiationInput,
    });

    const { renegotiationId, offerHash, loanId, lenderAddress, signerAddress } =
      response.offer;
    const structToSign = {
      ...renegotiationInput,
      fee: renegotiationInput.feeAmount,
      lender: lenderAddress ?? renegotiationInput.lenderAddress,
      signer: signerAddress ?? renegotiationInput.signerAddress,
      strictImprovement: false,
      loanId,
      renegotiationId,
    };

    if (skipSignature) {
      return {
        ...renegotiationInput,
        offerHash: offerHash ?? zeroHash,
        signature: zeroHash,
        renegotiationId,
      };
    }

    const contract = this.contracts.Msl(contractAddress);
    const signature = await contract.signRenegotiationOffer({
      verifyingContract: contractAddress,
      structToSign,
    });

    const renegotiationOffer = {
      ...renegotiationInput,
      signature,
      offerHash: offerHash ?? zeroHash,
      renegotiationId,
    };
    return await this.api.saveRefinanceOffer(renegotiationOffer);
  }

  async cancelRefinanceOffer({
    id,
    contractAddress,
  }: {
    id: bigint;
    contractAddress: Address;
  }) {
    return this.contracts.Msl(contractAddress).cancelRefinanceOffer({
      id,
    });
  }

  async hideRenegotiationOffer({
    id,
    contractAddress,
  }: {
    id: bigint;
    contractAddress: Address;
  }) {
    return this.api.hideRenegotiationOffer({
      id: id.toString(),
      contractAddress,
    });
  }

  async unhideRenegotiationOffer({
    id,
    contractAddress,
  }: {
    id: bigint;
    contractAddress: Address;
  }) {
    return this.api.unhideRenegotiationOffer({
      id: id.toString(),
      contractAddress,
    });
  }

  async cancelAllRenegotiations({
    minId,
    contractAddress,
  }: {
    minId: bigint;
    contractAddress: Address;
  }) {
    return this.contracts.Msl(contractAddress).cancelAllRenegotiations({
      minId,
    });
  }

  async emitLoan({
    offer,
    tokenId,
    amount,
    expirationTime,
  }: {
    offer: model.SingleNftOffer | model.CollectionOffer;
    tokenId: bigint;
    amount?: bigint;
    expirationTime?: bigint;
  }) {
    const contractOffer = {
      ...offer,
      lender: offer.lenderAddress,
      borrower: offer.borrowerAddress,
      signer: offer.signerAddress ?? zeroAddress,
      validators: offer.offerValidators,
      requiresLiquidation: !!offer.requiresLiquidation,
    };

    return this.contracts.Msl(offer.contractAddress).emitLoan({
      offer: contractOffer,
      signature: contractOffer.signature,
      tokenId,
      amount: amount ?? contractOffer.principalAmount,
      expirationTime:
        expirationTime ?? BigInt(millisToSeconds(Date.now()) + SECONDS_IN_DAY),
    });
  }

  async repayLoan({
    loan,
    nftReceiver,
  }: {
    loan: LoanV4V5;
    nftReceiver?: Address;
  }) {
    return this.contracts.Msl(loan.contractAddress).repayLoan({
      loan,
      nftReceiver,
    });
  }

  async offers({
    limit = 20,
    cursor,
    sortBy = { field: OffersSortField.CreatedDate, order: Ordering.Desc },
    filterBy = {},
  }: model.ListOffersProps) {
    const { status: statuses, ...fields } = filterBy;
    return await this.api.listOffers({
      first: limit,
      after: cursor,
      sortBy,
      statuses,
      ...fields,
    });
  }

  async list({ nft }: { nft: number }) {
    return await this.api.listNft({ nftId: nft });
  }

  async unlist({ nft }: { nft: number }) {
    return await this.api.unlistNft({ nftId: nft });
  }

  async listings({
    collections,
    user,
    marketPlaces = [MarketplaceEnum.Gondi],
    limit = 20,
    cursor,
  }: model.ListListingsProps) {
    const {
      result: { edges, pageInfo },
    } = await this.api.listListings({
      collections,
      userFilter: user,
      marketplaceNames: marketPlaces,
      after: cursor,
      first: limit,
    });
    return {
      cursor: pageInfo.endCursor,
      listings: edges.map((edge) => edge.node),
    };
  }

  async nftId(
    props: (
      | { slug: string; contractAddress?: never }
      | { slug?: never; contractAddress: Address }
    ) & { tokenId: bigint }
  ) {
    let result;
    if (props.slug) result = await this.api.nftIdBySlugTokenId(props);
    if (props.contractAddress)
      result = await this.api.nftIdByContractAddressAndTokenId(props);
    if (!result?.nft) {
      throw new Error(`invalid nft ${props}`);
    }
    return Number(result.nft.id);
  }

  async collectionId(props: {
    slug: string;
    contractAddress?: never;
  }): Promise<number>;
  async collectionId(props: {
    slug?: never;
    contractAddress: Address;
  }): Promise<number[]>;
  async collectionId(
    props:
      | {
        slug: string;
        contractAddress?: never;
      }
      | {
        slug?: never;
        contractAddress: Address;
      }
  ) {
    let result;
    if (props.slug) {
      result = await this.api.collectionIdBySlug(props);
      if (!result?.collection) {
        throw new Error(`invalid collection ${props}`);
      }
      return Number(result.collection.id);
    }
    if (props.contractAddress) {
      result = await this.api.collectionsIdByContractAddress(props);
      if (!result?.collections) {
        throw new Error(`invalid collection ${props}`);
      }
      return result.collections.map((collection) => Number(collection.id));
    }
  }

  async getRemainingLockupSeconds({ loan }: { loan: LoanV4V5 }) {
    return this.contracts.Msl(loan.contractAddress).getRemainingLockupSeconds({
      loan
    });
  }

  async refinanceFullLoan({
    offer,
    loan,
  }: {
    offer: model.RenegotiationOffer;
    loan: LoanV4V5;
  }) {
    const offerInput = {
      ...offer,
      loanId: loan.source[0].loanId,
      strictImprovement: offer.strictImprovement ?? false,
      lender: offer.lenderAddress,
      signer: offer.signerAddress,
      fee: offer.feeAmount,
    };

    return this.contracts.Msl(loan.contractAddress).refinanceFullLoan({
      offer: offerInput,
      loan,
      signature: offer.signature,
    });
  }

  async refinancePartialLoan({
    offer,
    loan,
  }: {
    offer: model.RenegotiationOffer;
    loan: LoanV4V5;
  }) {
    const offerInput = {
      ...offer,
      loanId: loan.source[0].loanId,
      strictImprovement: offer.strictImprovement ?? false,
      lender: offer.lenderAddress,
      signer: offer.signerAddress,
      fee: offer.feeAmount,
    };

    return this.contracts.Msl(loan.contractAddress).refinancePartialLoan({
      offer: offerInput,
      loan,
    });
  }

  async liquidateLoan(loan: LoanV4V5) {
    return this.contracts.Msl(loan.contractAddress).liquidateLoan({
      loan,
    });
  }

  async placeBid({
    collectionContractAddress,
    tokenId,
    bid,
    auction,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    bid: bigint;
    auction: model.Auction;
  }) {
    return this.contracts
      .All(auction.loanAddress)
      .placeBid({ collectionContractAddress, tokenId, bid, auction });
  }

  async settleAuction({
    loan,
    auction,
  }: {
    loan: LoanV4V5;
    auction: model.Auction;
  }) {
    return this.contracts
      .All(auction.loanAddress)
      .settleAuction({ loan, auction });
  }

  async approveNFTForAll({
    nftAddress,
    to = this.contracts.MultiSourceLoanV5.address,
  }: {
    nftAddress: Address;
    to?: Address;
  }) {
    const erc721 = this.contracts.ERC721(nftAddress);
    const txHash = await erc721.write.setApprovalForAll([to, true]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await erc721.createEventFilter.ApprovalForAll({});
        const events = filterLogs(receipt, filter);
        if (events.length == 0)
          throw new Error("ERC721 approval for all not set");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async approveToken({
    tokenAddress,
    amount = model.MAX_NUMBER,
    to = this.contracts.MultiSourceLoanV5.address,
  }: {
    tokenAddress: Address;
    amount?: bigint;
    to?: Address;
  }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    const txHash = await erc20.write.approve([to, amount]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await erc20.createEventFilter.Approval({});
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("ERC20 approval not set");
        return { ...events[0].args, ...receipt };
      },
    };
  }
}
