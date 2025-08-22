import {
  createClient,
  Execute,
  reservoirChains,
  ReservoirClient,
} from '@reservoir0x/reservoir-sdk';
import {
  Account,
  Address,
  createPublicClient,
  createTransport,
  Hash,
  Hex,
  TypedDataDefinition,
} from 'viem';
import { getAddress } from 'viem';

import { Auction, zeroAddress, zeroHash, zeroHex } from '@/blockchain';
import { Api, Props as ApiProps } from '@/clients/api';
import { Contracts, GondiPublicClient, Wallet } from '@/clients/contracts';
import { Opensea } from '@/clients/opensea';
import {
  BnplOrderInput,
  Currency,
  MarketplaceEnum,
  OffersSortField,
  Ordering,
  SingleNftSignedOfferInput,
  TokenStandardType,
} from '@/generated/graphql';
import * as model from '@/model';
import { NftStandard } from '@/model';
import { isEmptyCalldata } from '@/utils/blockchain';
import {
  generateFakeRenegotiationInput,
  isLoanVersion,
  loanToMslLoan,
  LoanToMslLoanType,
  renegotiationToMslRenegotiation,
} from '@/utils/loan';
import { max, min, mulDivUp } from '@/utils/number';
import { isNative, isOpensea } from '@/utils/orders';
import { FULFILLED, REJECTED } from '@/utils/promises';
import { areSameAddress } from '@/utils/string';
import { OptionalNullable } from '@/utils/types';

interface GondiProps {
  wallet: Wallet;
  apiClient?: ApiProps['apiClient'];
  openseaApiKey?: string;
  reservoirApiKey?: string;
}

export class Gondi {
  contracts: Contracts;
  wallet: Wallet;
  account: Account;
  bcClient: GondiPublicClient;
  api: Api;
  opensea: Opensea;
  defaults: { Msl: Address; UserVault: Address };
  reservoirClient: ReservoirClient;

  constructor({ wallet, apiClient, openseaApiKey, reservoirApiKey }: GondiProps) {
    this.wallet = wallet;
    this.account = wallet.account;
    this.bcClient = createPublicClient({
      chain: wallet.chain,
      transport: () => createTransport(wallet.transport),
    });
    this.contracts = new Contracts(this.bcClient, wallet);
    this.defaults = {
      // TODO: uncomment this when we launch the new version
      // Msl: this.contracts.MultiSourceLoanV7.address,
      Msl: this.contracts.MultiSourceLoanV6.address,
      UserVault: this.contracts.UserVaultV6.address,
    };
    this.api = new Api({ wallet, apiClient });
    this.opensea = new Opensea({ apiKey: openseaApiKey ?? process.env.OPENSEA_API_KEY });
    this.reservoirClient = createClient({
      chains: [
        {
          id: wallet.chain.id,
          name: wallet.chain.name,
          baseApiUrl: reservoirChains.mainnet.baseApiUrl,
          active: true,
        },
      ],
      apiKey: reservoirApiKey ?? process.env.RESERVOIR_API_KEY,
    });
  }

  async makeSingleNftOffer(offer: model.SingleNftOfferInput) {
    return await this._makeSingleNftOffer(offer);
  }

  /** @internal */
  _makeSingleNftOffer(
    offer: model.SingleNftOfferInput,
    mslContractAddress: Address,
    skipSave: true,
  ): Promise<SingleNftSignedOfferInput>;

  /** @internal */
  _makeSingleNftOffer(
    offer: model.SingleNftOfferInput,
    mslContractAddress?: Address,
    skipSave?: false,
  ): ReturnType<Api['saveSingleNftOffer']>;

  /** @internal */
  async _makeSingleNftOffer(
    offer: model.SingleNftOfferInput,
    mslContractAddress?: Address,
    skipSave?: boolean,
  ) {
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
    const collateralAddress = response.offer.collateralAddress;

    if (!collateralAddress) throw new Error('Invalid nft');

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

    const signedOffer: SingleNftSignedOfferInput = {
      ...offerInput,
      offerValidators: validators.map((validator) => ({
        arguments: validator.arguments,
        validator: validator.validator,
      })),
      offerHash: offerHash ?? zeroHash,
      offerId,
      signature,
    };

    if (skipSave) return signedOffer;
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
    const collateralAddress = response.offer.collateralAddress;

    if (!collateralAddress) throw new Error('Invalid collection');

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

  async makeOrder(orderInput: Parameters<Api['publishOrder']>[0]) {
    let response = await this.api.publishOrder(orderInput);
    while (response.__typename === 'SignatureRequest') {
      const key = response.key as 'signature';
      orderInput[key] = await this.wallet.signTypedData(response.typedData as TypedDataDefinition);
      response = await this.api.publishOrder(orderInput);
    }

    if (response.__typename !== 'SingleNFTOrder' && response.__typename !== 'CollectionOrder')
      throw new Error('This should never happen');

    return { ...response, ...orderInput };
  }

  async makeSellAndRepayOrder(
    sellAndRepayOrderInput: Parameters<Api['publishSellAndRepayOrder']>[0],
  ) {
    let response = await this.api.publishSellAndRepayOrder(sellAndRepayOrderInput);
    while (response.__typename === 'SignatureRequest') {
      const key = response.key as 'signature' | 'repaymentSignature';
      sellAndRepayOrderInput[key] = await this.wallet.signTypedData(
        response.typedData as TypedDataDefinition,
      );
      response = await this.api.publishSellAndRepayOrder(sellAndRepayOrderInput);
    }

    if (response.__typename !== 'SellAndRepayOrder') throw new Error('This should never happen');

    return { ...response, ...sellAndRepayOrderInput };
  }

  async buyNowPayLater({
    amounts,
    contractAddress,
    loanDuration,
    offers,
    tokenId,
  }: {
    amounts: bigint[];
    contractAddress: Address;
    loanDuration: bigint;
    offers: OfferFromExecutionOffer[];
    tokenId: bigint;
  }) {
    const orderInput: BnplOrderInput = {
      amounts,
      contractAddress,
      loanDuration,
      offerIds: offers.map((offer) => offer.id),
      tokenId,
    };

    const borrowed = amounts.reduce((acc, amount, index) => {
      const fee = mulDivUp(offers[index].fee, amount, offers[index].principalAmount);
      return acc + amount - fee;
    }, 0n);

    let response = await this.api.publishBuyNowPayLaterOrder(orderInput);
    while (response.__typename === 'SignatureRequest') {
      const key = response.key as 'signature' | 'emitSignature';
      orderInput[key] = await this.wallet.signTypedData(response.typedData as TypedDataDefinition);
      response = await this.api.publishBuyNowPayLaterOrder(orderInput);
    }

    if (response.__typename !== 'BuyNowPayLaterOrder') throw new Error('This should never happen');

    return this.contracts.PurchaseBundler(offers[0].contractAddress).buy({
      emitCalldata: response.emitCalldata,
      value: max(0n, response.price - borrowed),
    });
  }

  async cancelOrder(order: { cancelCalldata: Hex; marketPlaceAddress: Address }) {
    return this.contracts
      .GenericContract(order.marketPlaceAddress)
      .sendTransactionData(order.cancelCalldata);
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

  async makeRefinanceOffer({ renegotiation, contractAddress, ...props }: MakeRefinanceOfferProps) {
    const { isV4, isV5 } = isLoanVersion(contractAddress, this.wallet.chain.id);
    if (props.skipSignature && props.withFallbackOffer) {
      throw new Error('skipSignature and withFallbackOffer cannot be true at the same time');
    }
    if (props.withFallbackOffer && (isV4 || isV5)) {
      throw new Error('Unsupported contract address for withFallbackOffer argument');
    }

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

    if (props.skipSignature) {
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

    if (props.withFallbackOffer) {
      const {
        aprBps,
        duration,
        expirationTime,
        principalAmount,
        feeAmount: fee,
      } = renegotiationInput;
      const offerInput: model.SingleNftOfferInput = {
        nftId: props.nftId,
        principalAddress: props.principalAddress,
        principalAmount,
        aprBps,
        duration,
        expirationTime,
        fee,
        maxSeniorRepayment: 0n,
        capacity: 0n,
      };
      const fallbackOffer = await this._makeSingleNftOffer(offerInput, contractAddress, true);
      return await this.api.saveRefinanceOffer(renegotiationOffer, fallbackOffer);
    }

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

  async hideOrder({ id }: { id: number }) {
    return this.api.hideOrder({ id });
  }

  async showOrder({ id }: { id: number }) {
    return this.api.showOrder({ id });
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

  async collections(props: {
    statsCurrency?: Address;
    standards?: TokenStandardType[];
    collections?: number[];
    cursor?: string;
  }) {
    const { statsCurrency: currency = zeroAddress, collections, standards, cursor } = props;
    const {
      collections: { edges, pageInfo },
    } = await this.api.collections({ currency, collections, standards, after: cursor });
    return { collections: edges.map((edge) => edge.node), pageInfo };
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

  async collectionStepsById(props: { collectionId: number }) {
    const result = await this.api.collectionStepsById(props);
    return result.steps;
  }

  async ownedNfts(args: Parameters<Api['ownedNfts']>[0]) {
    const result = await this.api.ownedNfts(args);
    const { edges: ownedNfts, pageInfo } = result.ownedNfts;
    return { ownedNfts: ownedNfts.map((edge) => edge.node), pageInfo };
  }

  async getRemainingLockupSeconds({ loan }: { loan: LoanToMslLoanType }) {
    return this.contracts.Msl(loan.contractAddress).getRemainingLockupSeconds({
      loan: loanToMslLoan(loan),
    });
  }

  async isEndLockedUp({
    loan,
  }: {
    loan: LoanToMslLoanType & { durationFromRenegotiationOrStart: bigint };
  }) {
    return this.contracts.Msl(loan.contractAddress).isEndLockedUp({
      loan,
    });
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

  async getAuctionRemainingLockupSeconds({
    auction,
  }: {
    auction: Pick<Auction, 'startTime' | 'loanAddress'>;
  }) {
    return this.contracts.All(auction.loanAddress).getRemainingLockupSeconds({ auction });
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

  async currencyAllowance({
    tokenAddress,
    to = this.defaults.Msl,
  }: {
    tokenAddress: Address;
    to?: Address;
  }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    return await erc20.contract.read.allowance([this.account.address, to]);
  }

  async currencyBalance({ tokenAddress }: { tokenAddress: Address }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    return await erc20.contract.read.balanceOf([this.account.address]);
  }

  async createUserVault({
    nfts,
    currencies = [],
  }: {
    nfts: CreateVaultNfts;
    currencies?: CreateVaultCurrencies;
  }) {
    return this._createUserVault({ nfts, currencies });
  }
  async _createUserVault({
    nfts,
    currencies = [],
    userVaultAddress = this.defaults.UserVault,
  }: {
    nfts: CreateVaultNfts;
    currencies?: CreateVaultCurrencies;
    userVaultAddress?: Address;
  }) {
    return this.contracts.UserVault(userVaultAddress).createVault(nfts, currencies);
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

  async depositUserVaultERC20({
    userVaultAddress = this.defaults.UserVault,
    ...data
  }: { userVaultAddress?: Address } & DepositERC20Args) {
    return this.contracts.UserVault(userVaultAddress).depositERC20(data);
  }

  async burnUserVaultAndWithdraw({
    userVaultAddress = this.defaults.UserVault,
    ...data
  }: { userVaultAddress?: Address } & BurnAndWithdrawArgs) {
    return this.contracts.UserVault(userVaultAddress).burnAndWithdraw(data);
  }

  async wrapOldERC721({ collection, tokenId }: wrapOldERC721Args) {
    const wrapperAddress = await this.api.getWrapperAddress(collection);
    const wrapper = this.contracts.OldERC721Wrapper(wrapperAddress);
    const naked = this.contracts.OldERC721(collection.contractData.contractAddress);
    const stashAddress = await wrapper.contract.read.stashAddress([this.wallet.account.address]);
    const currentOwner = await naked.contract.read.ownerOf([tokenId]);
    if (currentOwner == this.wallet.account.address) {
      const txTransfer = await naked.safeContractWrite.transfer([stashAddress, tokenId]);
      await this.bcClient.waitForTransactionReceipt({ hash: txTransfer });
    } else if (currentOwner != stashAddress) {
      throw Error('NFT not owned');
    }
    return await wrapper.wrapOldERC721({ tokenId });
  }

  async unwrapOldERC721({ collection, tokenId }: wrapOldERC721Args) {
    const wrapperAddress = await this.api.getWrapperAddress(collection);
    const wrapper = this.contracts.OldERC721Wrapper(wrapperAddress);

    return await wrapper.unwrap(tokenId);
  }

  async buyWithSellAndRepay({
    repaymentCalldata,
    mslContractAddress,
    price,
  }: {
    repaymentCalldata: Hex;
    mslContractAddress: Address;
    price: bigint;
  }) {
    return await this.contracts.PurchaseBundler(mslContractAddress).executeSell({
      repaymentCalldata,
      price,
    });
  }

  async sellAndRepay({
    mslContractAddress,
    repaymentCalldata,
  }: {
    mslContractAddress: Address;
    repaymentCalldata: Hex;
  }) {
    return await this.contracts.PurchaseBundler(mslContractAddress).sell({
      repaymentCalldata,
    });
  }

  async buyNft({
    price,
    currency,
    orderId,
  }: {
    price: bigint;
    currency: Pick<Currency, 'address' | 'decimals'>;
    orderId: string;
  }) {
    const buyResult = await this.reservoirClient.actions.buyToken({
      items: [{ orderId }],
      wallet: this.wallet,
      expectedPrice: {
        [currency.address]: {
          raw: price,
          currencyAddress: currency.address,
          currencyDecimals: currency.decimals,
        },
      },
      onProgress: (_steps: Execute['steps']) => void 0,
      options: {
        currency: currency.address,
      },
    });

    return buyResult;
  }

  async sellNft({
    order,
    nft,
  }: {
    order: {
      id: string;
      currencyAddress: Address;
      originalId: string;
      marketPlace: string;
      marketPlaceAddress: Address;
      price: bigint;
    };
    nft: {
      id: string;
      tokenId: bigint;
      collectionAddress: Address;
    };
  }) {
    if (!isNative(order.marketPlace) && !isOpensea(order.marketPlace)) {
      throw new Error(`Sell not supported for marketplace ${order.marketPlace}`);
    }

    if (isNative(order.marketPlace)) {
      const { saleCalldata } = await this.api.getSaleCalldata({
        orderId: Number(order.id),
        nftId: Number(nft.id),
        taker: this.wallet.account.address,
      });

      if (!saleCalldata || isEmptyCalldata(saleCalldata))
        throw new Error(`No sale calldata available for native order ${order.id}`);

      const price = order.currencyAddress === zeroAddress ? order.price : 0n;
      return this.contracts
        .GenericContract(order.marketPlaceAddress)
        .sendTransactionData(saleCalldata, price);
    }

    const fulfillOrder = await this.opensea.fulfillOrder({
      hash: order.originalId,
      protocolAddress: order.marketPlaceAddress,
      fulfiller: { address: this.wallet.account.address },
      consideration: {
        contract: nft.collectionAddress,
        token_id: nft.tokenId.toString(),
      },
    });

    const contract = this.contracts.GenericContract(getAddress(fulfillOrder.to));
    const txHash = await contract.safeContractWrite[fulfillOrder.functionName](
      fulfillOrder.functionArgs,
      { value: BigInt(fulfillOrder.value) },
    );

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = contract.parseEventLogs(fulfillOrder.eventName, receipt.logs);
        if (events.length === 0) throw new Error(`${fulfillOrder.eventName} not set`);
        return { ...events[0].args, ...receipt };
      },
    };
  }
}

type MakeOfferType =
  | Omit<Awaited<ReturnType<Gondi['makeSingleNftOffer']>>, 'nftId'>
  | Omit<Awaited<ReturnType<Gondi['makeCollectionOffer']>>, 'collectionId'>;

type OfferFromExecutionOffer = OptionalNullable<
  MakeOfferType,
  'borrowerAddress' | 'lenderAddress' | 'offerHash' | 'signature'
>;

type MakeRefinanceOfferProps = {
  renegotiation: model.RenegotiationInput;
  contractAddress: Address;
} & (
  | { skipSignature?: never; withFallbackOffer?: never; principalAddress?: never; nftId?: never }
  | { skipSignature: true; withFallbackOffer?: never; principalAddress?: never; nftId?: never }
  | { skipSignature?: never; withFallbackOffer: true; principalAddress: Address; nftId: number }
);

export type CreateVaultNfts = {
  collection: Address;
  tokenIds: bigint[];
  amounts: bigint[];
  standard: NftStandard;
}[];
export type CreateVaultCurrencies = { address: Address; amount: bigint }[];

export type DepositERC1155sArgs = {
  vaultId: bigint;
  collection: Address;
  tokenIds: bigint[];
  amounts: bigint[];
};
export type DepositERC721sArgs = Omit<DepositERC1155sArgs, 'amounts'>;
export type DepositERC20Args = {
  vaultId: bigint;
  tokenAddress: Address;
  amount: bigint;
};
export type BurnAndWithdrawArgs = {
  vaultId: bigint;
  collections: Address[];
  tokenIds: bigint[];
  tokens?: Address[]; // erc20 tokens
  erc1155Collections?: Address[];
  erc1155TokenIds?: bigint[];
};

type wrapOldERC721Args = {
  collection: {
    contractData: { contractAddress: Address };
    wrapperCollections?: { contractData: { contractAddress: Address } }[];
  };
  tokenId: bigint;
};

export interface EmitLoanArgs {
  offerExecution: {
    offer: Omit<model.SingleNftOffer | model.CollectionOffer, 'nftId'>;
    amount?: bigint;
    lenderOfferSignature: Hash;
  }[];
  nftCollateralAddress: Address;
  tokenId: bigint;
  duration: bigint;
  principalReceiver?: Address;
  expirationTime?: bigint;
}
