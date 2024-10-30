import { Account, Address, createPublicClient, createTransport, Hash, Hex } from 'viem';

import { Api, Props as ApiProps } from '@/api';
import { Auction, LoanV5, OfferV5, zeroAddress, zeroHash, zeroHex } from '@/blockchain';
import { Contracts, GondiPublicClient, Wallet } from '@/contracts';
import { getCurrencies } from '@/deploys';
import { MarketplaceEnum, OffersSortField, Ordering } from '@/generated/graphql';
import * as model from '@/model';
import { NftStandard } from '@/model';
import { Reservoir } from '@/reservoir/Reservoir';
import { isNative, SeaportOrder } from '@/reservoir/utils';
import {
  generateFakeRenegotiationInput,
  loanToMslLoan,
  LoanToMslLoanType,
  renegotiationToMslRenegotiation,
} from '@/utils/loan';
import { min } from '@/utils/number';
import { FULFILLED, REJECTED } from '@/utils/promises';
import { areSameAddress, NATIVE_MARKETPLACE } from '@/utils/string';
import { OptionalNullable } from '@/utils/types';

export class Gondi {
  contracts: Contracts;
  wallet: Wallet;
  account: Account;
  bcClient: GondiPublicClient;
  api: Api;
  reservoir: Reservoir;
  defaults: { Msl: Address; UserVault: Address };

  constructor({ wallet, apiClient, reservoirBaseApiUrl }: GondiProps) {
    this.wallet = wallet;
    this.account = wallet.account;
    this.bcClient = createPublicClient({
      chain: wallet.chain,
      transport: () => createTransport(wallet.transport),
    });
    this.contracts = new Contracts(this.bcClient, wallet);
    this.defaults = {
      Msl: this.contracts.MultiSourceLoanV6.address,
      UserVault: this.contracts.UserVaultV6.address,
    };
    this.api = new Api({ wallet, apiClient });
    this.reservoir = new Reservoir({
      baseApiUrl: reservoirBaseApiUrl,
      wallet,
      Seaport: this.contracts.Seaport,
      CryptoPunks: this.contracts.CryptoPunks,
    });
  }

  async makeSingleNftOffer(offer: model.SingleNftOfferInput) {
    return await this._makeSingleNftOffer(offer);
  }

  /** @internal */
  async _makeSingleNftOffer(offer: model.SingleNftOfferInput, mslContractAddress?: Address) {
    const contract = this.contracts.Msl(mslContractAddress ?? this.defaults.Msl);
    const contractAddress = contract.address;

    const offerInput = {
      ...offer,
      lenderAddress: offer.lenderAddress ? offer.lenderAddress : this.account.address,
      signerAddress: this.account.address,
      borrowerAddress: offer.borrowerAddress ?? zeroAddress,
      requiresLiquidation: !!offer.requiresLiquidation,
      contractAddress,
      offerValidators: [], // This is ignored by the API but it was required in the mutation
    };

    const response = await this.api.generateSingleNftOfferHash({ offerInput });

    const { offerHash, offerId, validators, lenderAddress, signerAddress, borrowerAddress } =
      response.offer;
    const collateralAddress = response.offer.nft.collection?.contractData?.contractAddress;

    if (collateralAddress === undefined) throw new Error('Invalid nft');

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

    const signature = await contract.signOffer({ structToSign });

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
  async _makeCollectionOffer(offer: model.CollectionOfferInput, mslContractAddress?: Address) {
    const contract = this.contracts.Msl(mslContractAddress ?? this.defaults.Msl);
    const contractAddress = contract.address;

    const offerInput = {
      ...offer,
      lenderAddress: offer.lenderAddress ? offer.lenderAddress : this.account.address,
      signerAddress: this.account.address,
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
    const collateralAddress = response.offer.collection.contractData?.contractAddress;

    if (collateralAddress === undefined) throw new Error('Invalid collection');

    const { offerHash, offerId, validators, lenderAddress, signerAddress, borrowerAddress } =
      response.offer;
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

    const signature = await contract.signOffer({ structToSign });

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

  async makeSaleOffer({
    collectionContractAddress,
    tokenId,
    price,
    expirationTime,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    price: bigint;
    expirationTime: bigint;
  }) {
    const {
      parameters: {
        totalOriginalConsiderationItems: _totalOriginalConsiderationItems,
        ...saleOffer
      },
      signature,
    } = await this.contracts.Seaport.generateOrderFromSaleOffer({
      collectionContractAddress,
      tokenId,
      price,
      expirationTime,
    });
    return this.api.saveSignedSaleOffer({
      offer: { ...saleOffer, signature },
    });
  }

  async cancelSaleOffer({ saleOffer }: { saleOffer: SeaportOrder }) {
    return this.contracts.Seaport.cancel({ orderComponents: saleOffer });
  }

  async cancelOffer({ id, contractAddress }: { id: bigint; contractAddress: Address }) {
    return this.contracts.Msl(contractAddress).cancelOffer({
      id,
    });
  }

  async cancelAllOffers({ minId, contractAddress }: { minId: bigint; contractAddress: Address }) {
    return this.contracts.Msl(contractAddress).cancelAllOffers({
      minId,
    });
  }

  async hideOffer({ id, contractAddress }: { id: bigint; contractAddress: Address }) {
    return this.api.hideOffer({ contract: contractAddress, id: id.toString() });
  }

  async unhideOffer({ id, contractAddress }: { id: bigint; contractAddress: Address }) {
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
      lenderAddress: this.account.address,
      signerAddress: this.account.address,
      ...renegotiation,
      targetPrincipal: renegotiation.targetPrincipal ?? [],
      trancheIndex: renegotiation.trancheIndex ?? [],
    };
    const response = await this.api.generateRenegotiationOfferHash({
      renegotiationInput,
    });

    const { renegotiationId, offerHash, loanId, lenderAddress, signerAddress } = response.offer;

    if (skipSignature) {
      return {
        ...renegotiationInput,
        offerHash: offerHash ?? zeroHash,
        signature: zeroHash,
        renegotiationId,
      };
    }

    const structToSign = {
      ...renegotiationInput,
      fee: renegotiationInput.feeAmount,
      lender: lenderAddress ?? renegotiationInput.lenderAddress,
      signer: signerAddress ?? renegotiationInput.signerAddress ?? zeroAddress,
      strictImprovement: false,
      loanId,
      renegotiationId,
    };

    const contract = this.contracts.Msl(contractAddress);
    const signature = await contract.signRenegotiationOffer({ structToSign });

    const renegotiationOffer = {
      ...renegotiationInput,
      signature,
      offerHash: offerHash ?? zeroHash,
      renegotiationId,
    };
    return await this.api.saveRefinanceOffer(renegotiationOffer);
  }

  async cancelRefinanceOffer({ id, contractAddress }: { id: bigint; contractAddress: Address }) {
    return this.contracts.Msl(contractAddress).cancelRefinanceOffer({
      id,
    });
  }

  async hideRenegotiationOffer({ id, contractAddress }: { id: bigint; contractAddress: Address }) {
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

  async hideSaleOffer({ id }: { id: string }) {
    return this.api.hideSaleOffer({ id });
  }

  async unhideSaleOffer({ id }: { id: string }) {
    return this.api.unhideSaleOffer({ id });
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

  offerExecutionFromOffers(
    offers: OfferFromExecutionOffer[],
    amounts?: bigint[],
  ): EmitLoanArgs['offerExecution'] {
    return offers.map((offer, idx) => {
      const { signature, lenderAddress, borrowerAddress, offerHash } = offer;
      if (!(signature && lenderAddress && borrowerAddress && offerHash))
        throw new Error('Misisng required field for offer');
      return {
        offer: {
          ...offer,
          offerHash,
          lenderAddress,
          lender: lenderAddress,
          borrowerAddress,
          borrower: borrowerAddress,
          signature,
          maxSeniorRepayment: offer.maxSeniorRepayment ?? 0n,
        },
        amount: amounts?.[idx] ?? offer.principalAmount,
        lenderOfferSignature: signature,
      };
    });
  }

  async emitLoan(args: EmitLoanArgs) {
    const contractAddress = args.offerExecution[0].offer.contractAddress;
    return this.contracts.Msl(contractAddress).emitLoan(args);
  }

  async refinanceFromOffers({
    loan,
    loanId,
    executionData,
  }: {
    loan: LoanToMslLoanType;
    loanId: bigint;
    executionData: EmitLoanArgs;
  }) {
    return this.contracts.Msl(loan.contractAddress).refinanceFromOffers({
      loan: loanToMslLoan(loan),
      loanId,
      executionData,
    });
  }

  async repayLoan({
    loan,
    loanId,
    nftReceiver,
  }: {
    loan: LoanToMslLoanType;
    loanId: bigint;
    nftReceiver?: Address;
  }) {
    return this.contracts.Msl(loan.contractAddress).repayLoan({
      loan: loanToMslLoan(loan),
      nftReceiver,
      loanId,
    });
  }

  async offers({
    limit = 20,
    cursor,
    sortBy = { field: OffersSortField.CreatedDate, order: Ordering.Desc },
    filterBy = {},
  }: model.ListOffersProps) {
    const { status, nft, collection, borrower, ...fields } = filterBy;
    return await this.api.listOffers({
      first: limit,
      after: cursor,
      sortBy,
      statuses: status,
      nfts: nft ? [nft] : [],
      collections: collection ? [collection] : [],
      borrowerAddress: borrower,
      ...fields,
    });
  }

  async loans({ limit = 20, cursor, ...rest }: model.ListLoansProps) {
    return await this.api.listLoans({
      first: limit,
      after: cursor,
      ...rest,
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
    return await this.api.listListings({
      collections,
      userFilter: user,
      marketplaceNames: marketPlaces,
      after: cursor,
      first: limit,
    });
  }

  async nftId(
    props: (
      | { slug: string; contractAddress?: never }
      | { slug?: never; contractAddress: Address }
    ) & { tokenId: bigint },
  ) {
    let result;
    if (props.slug) result = await this.api.nftIdBySlugTokenId(props);
    if (props.contractAddress) result = await this.api.nftIdByContractAddressAndTokenId(props);
    if (!result?.nft) {
      throw new Error(`invalid nft ${props}`);
    }
    return Number(result.nft.id);
  }

  async collections(props: { statsCurrency?: Address }) {
    const result = await this.api.collections({ currency: props.statsCurrency ?? zeroAddress });
    const { edges: collections, pageInfo } = result.collections;
    return { collections: collections.map((edge) => edge.node), pageInfo };
  }

  async collectionId(props: { slug: string; contractAddress?: never }): Promise<number>;
  async collectionId(props: { slug?: never; contractAddress: Address }): Promise<number[]>;
  async collectionId(
    props:
      | {
          slug: string;
          contractAddress?: never;
        }
      | {
          slug?: never;
          contractAddress: Address;
        },
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

  async ownedNfts() {
    const result = await this.api.ownedNfts();
    const { edges: ownedNfts, pageInfo } = result.ownedNfts;
    return { ownedNfts: ownedNfts.map((edge) => edge.node), pageInfo };
  }

  async getRemainingLockupSeconds({ loan }: { loan: LoanToMslLoanType }) {
    return this.contracts.Msl(loan.contractAddress).getRemainingLockupSeconds({
      loan: loanToMslLoan(loan),
    });
  }

  async isEndLockedUp({ loan }: { loan: LoanToMslLoanType }) {
    return this.contracts.Msl(loan.contractAddress).isEndLockedUp({
      loan: loanToMslLoan(loan),
    });
  }

  async getBestNativeSaleOffer({
    contractAddress,
    tokenId,
  }: {
    contractAddress: Address;
    tokenId: bigint;
  }) {
    const { WETH_ADDRESS } = getCurrencies();
    const nftId = await this.nftId({ contractAddress, tokenId });
    const { bids } = await this.api.listBestBidsForNft({
      nftId,
      currencyAddress: WETH_ADDRESS,
    });
    const nativeBid = bids.find((bid) => bid.marketPlace === NATIVE_MARKETPLACE);

    return nativeBid ?? null;
  }

  private contractToVersion(contract: Address) {
    if (areSameAddress(contract, this.contracts.MultiSourceLoanV4.address)) return 'v4';
    if (areSameAddress(contract, this.contracts.MultiSourceLoanV5.address)) return 'v5';
    return 'v6';
  }

  private async generateRenegotiationId({
    loanId,
    loan,
  }: {
    loanId: string;
    loan: LoanToMslLoanType;
  }) {
    const renegotiationInput = generateFakeRenegotiationInput({
      loanId,
      loan,
      trancheIndex: areSameAddress(loan.contractAddress, this.contracts.MultiSourceLoanV6.address),
      address: this.account.address,
    });
    const { offer } = await this.api.generateRenegotiationOfferHash({ renegotiationInput });
    return offer.renegotiationId;
  }

  async refinanceBatch({
    aprBpsImprovementPercentage,
    refinancings,
  }: {
    aprBpsImprovementPercentage: number; // e.g. 0.05
    refinancings: {
      loan: LoanToMslLoanType & { loanReferenceId: string };
      source: ReturnType<typeof loanToMslLoan>['source'][number] & { loanIndex: number };
      refinancingPrincipal: bigint;
    }[];
  }) {
    const refisByContract: {
      v4: {
        [tokenLoanId: string]: Parameters<
          Contracts['MultiSourceLoanV4']['refinanceBatch']
        >[0]['refinancings'][number] & { loanReferenceId: string };
      };
      v5: {
        [tokenLoanId: string]: Parameters<
          Contracts['MultiSourceLoanV5']['refinanceBatch']
        >[0]['refinancings'][number] & { loanReferenceId: string };
      };
      v6: {
        [tokenLoanId: string]: Parameters<
          Contracts['MultiSourceLoanV6']['refinanceBatch']
        >[0]['refinancings'][number] & { loanReferenceId: string };
      };
    } = { v4: {}, v5: {}, v6: {} };

    // Group sources by contract and loanId, so that we only have one refinance per loan.
    refinancings.forEach(({ loan, source, refinancingPrincipal }) => {
      const tokenLoanId = `${loan.nftCollateralAddress}-${loan.nftCollateralTokenId}`;
      const version = this.contractToVersion(loan.contractAddress);
      const currentLoanRefinancings = refisByContract[version][tokenLoanId];

      const currentSourceNewAprBps = BigInt(
        Math.floor(Number(source.aprBps) * (1 - aprBpsImprovementPercentage)),
      );
      const newAprBps = min(currentLoanRefinancings?.newAprBps, currentSourceNewAprBps);

      refisByContract[version][tokenLoanId] = {
        loan: loanToMslLoan(loan),
        loanReferenceId: loan.loanReferenceId,
        newAprBps,
        sources: [...(currentLoanRefinancings?.sources ?? []), { source, refinancingPrincipal }],
      };
    });

    // Generate renegotiationId for each contract version and call the refinanceBatch implementations.
    const versions = ['v4', 'v5', 'v6'] as const;
    const results = [];
    for (const version of versions) {
      const refinancings = Object.values(refisByContract[version]);

      if (refinancings.length > 0) {
        const renegotiationId = await this.generateRenegotiationId({
          loan: refinancings[0].loan,
          loanId: refinancings[0].loanReferenceId,
        });

        try {
          // TODO: improve this
          const refinanceBatch =
            version === 'v4'
              ? await this.contracts.MultiSourceLoanV4.refinanceBatch({
                  refinancings: Object.values(refisByContract.v4),
                  renegotiationId,
                })
              : version === 'v5'
                ? await this.contracts.MultiSourceLoanV5.refinanceBatch({
                    refinancings: Object.values(refisByContract.v5),
                    renegotiationId,
                  })
                : await this.contracts.MultiSourceLoanV6.refinanceBatch({
                    refinancings: Object.values(refisByContract.v6),
                    renegotiationId,
                  });
          results.push({ status: FULFILLED, value: refinanceBatch });
        } catch (reason) {
          results.push({ status: REJECTED, reason, value: refinancings });
        }
      }
    }
    return results;
  }

  async refinanceFullLoan({
    offer,
    loan,
    loanId,
  }: {
    offer: model.RenegotiationOffer;
    loan: LoanToMslLoanType;
    loanId: bigint;
  }) {
    return this.contracts.Msl(loan.contractAddress).refinanceFullLoan({
      offer: renegotiationToMslRenegotiation(offer, loanId),
      loan: loanToMslLoan(loan),
      signature: offer.signature,
    });
  }

  async refinancePartialLoan({
    offer,
    loan,
    loanId,
  }: {
    offer: model.RenegotiationOffer;
    loan: LoanToMslLoanType;
    loanId: bigint;
  }) {
    return this.contracts.Msl(loan.contractAddress).refinancePartialLoan({
      offer: renegotiationToMslRenegotiation(offer, loanId),
      loan: loanToMslLoan(loan),
    });
  }

  async addTranche({
    offer,
    loan,
    loanId,
  }: {
    offer: model.RenegotiationOffer;
    loan: LoanToMslLoanType;
    loanId: bigint;
  }) {
    return this.contracts.Msl(loan.contractAddress).addTranche({
      offer: renegotiationToMslRenegotiation(offer, loanId),
      loan: loanToMslLoan(loan),
      signature: offer.signature,
    });
  }

  /**
   * Delegate Multicall should be used when token is used as collateral for an active loan.
   * Multicall will be performed to the contract address of the first delegation.
   */
  async delegateMulticall(delegations: Parameters<Gondi['delegate']>[0][]) {
    const contractAddress = delegations[0].loan.contractAddress;
    return this.contracts.Msl(contractAddress).delegateMulticall(
      delegations.map((delegation) => ({
        ...delegation,
        loan: loanToMslLoan(delegation.loan),
      })),
    );
  }

  /** Delegate should be used when token is used as collateral for an active loan. */
  async delegate({
    loan,
    loanId,
    to,
    enable,
    rights,
  }: {
    loan: LoanToMslLoanType;
    loanId: bigint;
    to: Address;
    enable: boolean;
    rights?: Hash;
  }) {
    return this.contracts.Msl(loan.contractAddress).delegate({
      loan: loanToMslLoan(loan),
      loanId,
      to,
      rights,
      enable,
    });
  }

  /** RevokeDelegate should be used when token is not being used as collateral. */
  async revokeDelegate({
    to,
    collection,
    tokenId,
    contract = this.defaults.Msl,
  }: {
    to: Address;
    collection: Address;
    tokenId: bigint;
    contract?: Address;
  }) {
    return this.contracts.Msl(contract).revokeDelegate({ to, collection, tokenId });
  }

  /**
   * RevokeDelegationsAndEmitLoan should be used when token has been delegated without being revoked,
   * and a new loan wants to be emitted, erasing the delegations provided as argument.
   */
  async revokeDelegationsAndEmitLoan({
    delegations,
    emit,
  }: {
    delegations: Address[];
    emit: Parameters<Gondi['emitLoan']>[0];
  }) {
    const contractAddress = emit.offerExecution[0].offer.contractAddress;
    return this.contracts.Msl(contractAddress).revokeDelegationsAndEmitLoan({ delegations, emit });
  }

  async liquidateLoan({ loan, loanId }: { loan: LoanToMslLoanType; loanId: bigint }) {
    return this.contracts
      .Msl(loan.contractAddress)
      .liquidateLoan({ loanId, loan: loanToMslLoan(loan) });
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
    auction: Auction;
  }) {
    return this.contracts
      .All(auction.loanAddress)
      .placeBid({ collectionContractAddress, tokenId, bid, auction });
  }

  async settleAuction({ loan, auction }: { loan: LoanToMslLoanType; auction: Auction }) {
    return this.contracts
      .All(auction.loanAddress)
      .settleAuction({ auction, loan: loanToMslLoan(loan) });
  }

  async settleAuctionWithBuyout({ loan, auction }: { loan: LoanToMslLoanType; auction: Auction }) {
    return this.contracts
      .All(auction.loanAddress)
      .settleAuctionWithBuyout({ auction, loan: loanToMslLoan(loan) });
  }

  async getAuctionRemainingLockupSeconds({ auction }: { auction: Auction }) {
    return this.contracts.All(auction.loanAddress).getRemainingLockupSeconds({ auction });
  }

  async buy(
    tokensToBuy: {
      collectionContractAddress: Address;
      tokenId: bigint;
      price: bigint;
      orderSource: string;
    }[],
  ) {
    return this.reservoir.buyTokens(tokensToBuy);
  }

  async leverageBuy({
    leverageBuyData,
  }: {
    leverageBuyData: {
      offer: OfferV5 & { signature: Hash };
      expirationTime: bigint;
      amount: bigint;
      nft: {
        collectionContractAddress: Address;
        tokenId: bigint;
        price: bigint;
        orderSource: string;
      };
    }[];
  }) {
    const executionData = await Promise.all(
      leverageBuyData.map((data) =>
        this.reservoir.getExecutionDataForBuyToken({
          collectionContractAddress: data.nft.collectionContractAddress,
          tokenId: data.nft.tokenId,
          price: data.nft.price,
          exactOrderSource: data.nft.orderSource,
        }),
      ),
    );

    // We calculate the amount of eth to send to the contract
    // This is the sum of the eth to send for each nft minus the amount of weth that is being borrowed
    const ethToSend = executionData.reduce(
      (acc, { value }, index) =>
        acc + value - leverageBuyData[index].amount + leverageBuyData[index].offer.fee,
      0n,
    );

    const dataForLeverageContract = leverageBuyData.map((data, index) => ({
      ...data,
      callbackData: executionData[index].callbackData,
    }));

    return this.contracts.Leverage.buy({
      leverageBuyData: dataForLeverageContract,
      ethToSend: ethToSend < 0n ? 0n : ethToSend,
    });
  }

  async leverageSell({
    loan,
    loanId,
    price,
    orderSource,
  }: {
    loan: LoanV5;
    loanId: bigint;
    price: bigint;
    orderSource: string;
  }) {
    let executionData: {
      callbackData: Hex;
      isSeaportCall: boolean;
    } | null = null;

    if (isNative(orderSource)) {
      const bestNativeBid = await this.getBestNativeSaleOffer({
        contractAddress: loan.nftCollateralAddress,
        tokenId: loan.nftCollateralTokenId,
      });
      if (!bestNativeBid || bestNativeBid.netAmount < price) {
        throw new Error(`No native bid for price ${price}`);
      }

      executionData = await this.reservoir.generateFulfillOrderExecutionData({
        askOrBid: {
          rawData: await this.contracts.Seaport.recoverOrderFromNativeBid({
            nativeBid: bestNativeBid,
            collectionContractAddress: loan.nftCollateralAddress,
            tokenId: loan.nftCollateralTokenId,
          }),
          price: {
            netAmount: {
              raw: String(price),
            },
          },
        },
        signature: bestNativeBid.signature,
        tokenId: loan.nftCollateralTokenId,
      });
    } else {
      executionData = await this.reservoir.getCallbackDataForSellToken({
        collectionContractAddress: loan.nftCollateralAddress,
        tokenId: loan.nftCollateralTokenId,
        price,
        exactOrderSource: orderSource,
      });
    }

    const shouldDelegate = executionData.isSeaportCall;

    return this.contracts.Leverage.sell({
      loan,
      callbackData: executionData.callbackData,
      shouldDelegate,
      loanId,
    });
  }

  /**
   * Get the owner of an ERC 721 token.
   */
  async getOwner({ nftAddress, tokenId }: { nftAddress: Address; tokenId: bigint }) {
    const erc721 = this.contracts.ERC721(nftAddress);
    return erc721.contract.read.ownerOf([tokenId]);
  }

  /**
   * Get the balance of an ERC 1155 token id.
   */
  async balanceOf({ nftAddress, tokenId }: { nftAddress: Address; tokenId: bigint }) {
    const erc1155 = this.contracts.ERC1155(nftAddress);
    return erc1155.contract.read.balanceOf([this.wallet.account.address, tokenId]);
  }

  async isApprovedNFTForAll({
    nftAddress,
    standard,
    to = this.defaults.Msl,
  }: {
    nftAddress: Address;
    standard: Parameters<Contracts['Nft']>[1];
    to?: Address;
  }) {
    const nft = this.contracts.Nft(nftAddress, standard);
    return nft.contract.read.isApprovedForAll([this.account.address, to]);
  }

  async approveNFTForAll({
    nftAddress,
    standard,
    to = this.defaults.Msl,
  }: {
    nftAddress: Address;
    standard: Parameters<Contracts['Nft']>[1];
    to?: Address;
  }) {
    const nft = this.contracts.Nft(nftAddress, standard);
    const txHash = await nft.safeContractWrite.setApprovalForAll([to, true]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = nft.parseEventLogs('ApprovalForAll', receipt.logs);
        if (events.length === 0) throw new Error(`${standard} approval for all not set`);
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async isApprovedToken({
    tokenAddress,
    amount,
    to = this.defaults.Msl,
  }: {
    tokenAddress: Address;
    amount: bigint;
    to?: Address;
  }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    return (await erc20.contract.read.allowance([this.account.address, to])) >= amount;
  }

  async approveToken({
    tokenAddress,
    amount = model.MAX_NUMBER,
    to = this.defaults.Msl,
  }: {
    tokenAddress: Address;
    amount?: bigint;
    to?: Address;
  }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    const txHash = await erc20.safeContractWrite.approve([to, amount]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = erc20.parseEventLogs('Approval', receipt.logs);
        if (events.length === 0) throw new Error('ERC20 approval not set');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async createUserVault({ nfts }: { nfts: CreateVaultArgs }) {
    return this._createUserVault({ nfts });
  }
  async _createUserVault({
    nfts,
    userVaultAddress = this.defaults.UserVault,
  }: {
    nfts: CreateVaultArgs;
    userVaultAddress?: Address;
  }) {
    return this.contracts.UserVault(userVaultAddress).createVault(nfts);
  }

  async depositUserVaultERC721s({
    userVaultAddress = this.defaults.UserVault,
    ...data
  }: { userVaultAddress?: Address } & DepositERC721sArgs) {
    return this.contracts.UserVault(userVaultAddress).depositERC721s(data);
  }

  async depositUserVaultERC1155s({
    userVaultAddress = this.defaults.UserVault,
    ...data
  }: { userVaultAddress?: Address } & DepositERC1155sArgs) {
    return this.contracts.UserVault(userVaultAddress).depositERC1155s(data);
  }

  async burnUserVaultAndWithdraw({
    userVaultAddress = this.defaults.UserVault,
    ...data
  }: { userVaultAddress?: Address } & BurnAndWithdrawArgs) {
    return this.contracts.UserVault(userVaultAddress).burnAndWithdraw(data);
  }
}

interface GondiProps {
  wallet: Wallet;
  apiClient?: ApiProps['apiClient'];
  reservoirBaseApiUrl?: string;
}

type MakeOfferType =
  | Omit<Awaited<ReturnType<Gondi['makeSingleNftOffer']>>, 'nftId'>
  | Omit<Awaited<ReturnType<Gondi['makeCollectionOffer']>>, 'collectionId'>;

type OfferFromExecutionOffer = OptionalNullable<
  MakeOfferType,
  'borrowerAddress' | 'lenderAddress' | 'offerHash' | 'signature'
>;

export type CreateVaultArgs = {
  collection: Address;
  tokenIds: bigint[];
  amounts: bigint[];
  standard: NftStandard;
}[];
export type DepositERC1155sArgs = {
  vaultId: bigint;
  collection: Address;
  tokenIds: bigint[];
  amounts: bigint[];
};
export type DepositERC721sArgs = Omit<DepositERC1155sArgs, 'amounts'>;
export type BurnAndWithdrawArgs = {
  vaultId: bigint;
  collections: Address[];
  tokenIds: bigint[];
  tokens?: Address[]; // erc20 tokens
  erc1155Collections?: Address[];
  erc1155TokenIds?: bigint[];
};

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
