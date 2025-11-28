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

import { addStepCallback } from '@/addStepCallback';
import { Auction, zeroAddress, zeroHash, zeroHex } from '@/blockchain';
import { Api, Props as ApiProps } from '@/clients/api';
import { Contracts, GondiPublicClient, Wallet } from '@/clients/contracts';
import { Opensea } from '@/clients/opensea';
import { getContracts } from '@/deploys';
import {
  BnplOrderInput,
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
  isLoanVersion,
  loanToMslLoan,
  LoanToMslLoanType,
  renegotiationToMslRenegotiation,
} from '@/utils/loan';
import { max, mulDivUp } from '@/utils/number';
import { isNative, isOpensea } from '@/utils/orders';
import { isDefined, OptionalNullable } from '@/utils/types';

import { isFulfillAdvancedOrderFunctionName } from './clients/opensea/types';

interface GondiProps {
  wallet: Wallet;
  apiClient?: ApiProps['apiClient'];
  openseaApiKey?: string;
  reservoirApiKey?: string;
}

type Step = { id: number } & (
  | {
      type: 'signature';
      primaryType: string;
      status: 'waiting' | 'success';
    }
  | {
      type: 'transaction';
      status: 'waiting' | 'broadcasted' | 'success';
      to: Address;
      functionNameOrSelector: string; // can be a function name or a function selector
    }
);

export type OnStepChange = (step: Step) => Promise<void>;

export class Gondi {
  contracts: Contracts;
  wallet: Wallet;
  account: Account;
  bcClient: GondiPublicClient;
  apiClient: Api;
  openseaClient: Opensea;

  constructor({ wallet, apiClient, openseaApiKey }: GondiProps) {
    this.wallet = wallet;
    this.account = wallet.account;
    this.bcClient = createPublicClient({
      chain: wallet.chain,
      transport: () => createTransport(wallet.transport),
    });
    this.contracts = new Contracts(this.bcClient, wallet);
    this.apiClient = new Api({ wallet, apiClient });
    this.openseaClient = new Opensea({ apiKey: openseaApiKey ?? process.env.OPENSEA_API_KEY });
  }

  static create(
    props: GondiProps & {
      onStepChange: OnStepChange;
      executionId?: number | null;
    },
  ) {
    const { wallet, onStepChange, executionId } = props;
    const walletWithSteps = addStepCallback({
      wallet,
      onStepChange,
      executionId,
    });
    return new Gondi({ ...props, wallet: walletWithSteps });
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
    const contract = this.contracts.Msl(mslContractAddress ?? this.getDefaults().Msl);
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

    const response = await this.apiClient.generateSingleNftOfferHash({ offerInput });

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
    return await this.apiClient.saveSingleNftOffer(signedOffer);
  }

  async makeCollectionOffer(offer: model.CollectionOfferInput) {
    return await this._makeCollectionOffer(offer);
  }

  /** @internal */
  async _makeCollectionOffer(offer: model.CollectionOfferInput, mslContractAddress?: Address) {
    const contract = this.contracts.Msl(mslContractAddress ?? this.getDefaults().Msl);
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
    const response = await this.apiClient.generateCollectionOfferHash({ offerInput });
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
    return await this.apiClient.saveCollectionOffer(signedOffer);
  }

  async makeOrder(orderInput: Parameters<Api['publishOrder']>[0]) {
    let response = await this.apiClient.publishOrder(orderInput);
    while (response.__typename === 'SignatureRequest') {
      const key = response.key as 'signature';
      orderInput[key] = await this.wallet.signTypedData(response.typedData as TypedDataDefinition);
      response = await this.apiClient.publishOrder(orderInput);
    }

    if (response.__typename !== 'SingleNFTOrder' && response.__typename !== 'CollectionOrder')
      throw new Error('This should never happen');

    return { ...response, ...orderInput };
  }

  async makeSellAndRepayOrder(
    sellAndRepayOrderInput: Parameters<Api['publishSellAndRepayOrder']>[0],
  ) {
    let response = await this.apiClient.publishSellAndRepayOrder(sellAndRepayOrderInput);
    while (response.__typename !== 'SellAndRepayOrder') {
      if (response.__typename === 'ExtraSeaportData') {
        sellAndRepayOrderInput.extraSeaportData = response.extraData;
      } else if (response.__typename === 'SignatureRequest') {
        const key = response.key as 'signature' | 'repaymentSignature';
        sellAndRepayOrderInput[key] = await this.wallet.signTypedData(
          response.typedData as TypedDataDefinition,
        );
      }
      response = await this.apiClient.publishSellAndRepayOrder(sellAndRepayOrderInput);
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
    repaymentCalldata,
  }: {
    amounts: bigint[];
    contractAddress: Address;
    loanDuration: bigint;
    offers: OfferFromExecutionOffer[];
    tokenId: bigint;
    repaymentCalldata?: Hex | null | undefined;
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

    let response = await this.apiClient.publishBuyNowPayLaterOrder(orderInput);
    while (response.__typename !== 'BuyNowPayLaterOrder') {
      if (response.__typename === 'ExtraSeaportData') {
        orderInput.extraSeaportData = response.extraData;
      } else if (response.__typename === 'SignatureRequest') {
        const key = response.key as 'signature' | 'emitSignature';
        orderInput[key] = await this.wallet.signTypedData(
          response.typedData as TypedDataDefinition,
        );
      }
      response = await this.apiClient.publishBuyNowPayLaterOrder(orderInput);
    }

    if (response.__typename !== 'BuyNowPayLaterOrder') throw new Error('This should never happen');

    if (isDefined(repaymentCalldata)) {
      return this.contracts.PurchaseBundler(offers[0].contractAddress).executeSellWithLoan({
        emitCalldata: response.emitCalldata,
        price: response.price,
        repaymentCalldata,
      });
    }

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
    return this.apiClient.hideOffer({ contract: contractAddress, id: id.toString() });
  }

  async unhideOffer({ id, contractAddress }: { id: bigint; contractAddress: Address }) {
    return this.apiClient.unhideOffer({
      contract: contractAddress,
      id: id.toString(),
    });
  }

  async makeRefinanceOffer({ renegotiation, contractAddress, ...props }: MakeRefinanceOfferProps) {
    const { isV1, isV2 } = isLoanVersion(contractAddress, this.wallet.chain.id);
    if (props.skipSignature && props.withFallbackOffer) {
      throw new Error('skipSignature and withFallbackOffer cannot be true at the same time');
    }
    if (props.withFallbackOffer && (isV1 || isV2)) {
      throw new Error('Unsupported contract address for withFallbackOffer argument');
    }

    const renegotiationInput = {
      lenderAddress: this.account.address,
      signerAddress: this.account.address,
      ...renegotiation,
      targetPrincipal: renegotiation.targetPrincipal ?? [],
      trancheIndex: renegotiation.trancheIndex ?? [],
    };
    const response = await this.apiClient.generateRenegotiationOfferHash({
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
      return await this.apiClient.saveRefinanceOffer(renegotiationOffer, fallbackOffer);
    }

    return await this.apiClient.saveRefinanceOffer(renegotiationOffer);
  }

  async cancelRefinanceOffer({ id, contractAddress }: { id: bigint; contractAddress: Address }) {
    return this.contracts.Msl(contractAddress).cancelRefinanceOffer({
      id,
    });
  }

  async hideRenegotiationOffer({ id, contractAddress }: { id: bigint; contractAddress: Address }) {
    return this.apiClient.hideRenegotiationOffer({
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
    return this.apiClient.unhideRenegotiationOffer({
      id: id.toString(),
      contractAddress,
    });
  }

  async hideOrder({ id }: { id: number }) {
    return this.apiClient.hideOrder({ id });
  }

  async showOrder({ id }: { id: number }) {
    return this.apiClient.showOrder({ id });
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

  async efficientRefinanceFromOffers({
    contractAddress,
    loan,
    loanId,
    executionData,
  }: {
    contractAddress: Address;
    loan: LoanToMslLoanType;
    loanId: bigint;
    executionData: EmitLoanArgs;
  }) {
    const previousMsl = this.contracts.Msl(loan.contractAddress);
    const nextMsl = this.contracts.Msl(
      executionData.offerExecution[0]?.offer?.contractAddress ?? zeroAddress,
    );

    if (previousMsl.version === '1') {
      throw new Error('Unsupported contract address for capital efficient refinance');
    }

    if (nextMsl.version === '1' || nextMsl.version === '2' || nextMsl.version === '3') {
      throw new Error('Unsupported contract address for capital efficient refinance');
    }

    const repaymentCalldata = await previousMsl.encodeRepayLoan({
      repayArgs: {
        signableRepaymentData: {
          loanId,
          callbackData: '0x',
          shouldDelegate: false,
        },
        loan: loanToMslLoan(loan),
      },
      withSignature: true,
    });

    const emitCalldata = await nextMsl.encodeEmitLoan({
      emitArgs: executionData,
      withSignature: true,
    });

    const currentBalance = await this.currencyBalance({ tokenAddress: loan.principalAddress });

    return this.contracts.PositionMigrator(contractAddress, nextMsl).smartRenegotiation({
      currentBalance,
      previousMsl,
      repaymentCalldata,
      emitCalldata,
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
    return await this.apiClient.listOffers({
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
    return await this.apiClient.listLoans({
      first: limit,
      after: cursor,
      ...rest,
      loansCurrencyAddresses: rest.loansCurrencyAddress ? [rest.loansCurrencyAddress] : undefined,
    });
  }

  async list({ nft }: { nft: number }) {
    return await this.apiClient.listNft({ nftId: nft });
  }

  async unlist({ nft }: { nft: number }) {
    return await this.apiClient.unlistNft({ nftId: nft });
  }

  async listings({
    collections,
    user,
    marketPlaces = [MarketplaceEnum.Gondi],
    limit = 20,
    cursor,
  }: model.ListListingsProps) {
    return await this.apiClient.listListings({
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
    if (props.slug) result = await this.apiClient.nftIdBySlugTokenId(props);
    if (props.contractAddress)
      result = await this.apiClient.nftIdByContractAddressAndTokenId(props);
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
    } = await this.apiClient.collections({ currency, collections, standards, after: cursor });
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
      result = await this.apiClient.collectionIdBySlug(props);
      if (!result?.collection) {
        throw new Error(`invalid collection ${props}`);
      }
      return Number(result.collection.id);
    }
    if (props.contractAddress) {
      result = await this.apiClient.collectionsIdByContractAddress(props);
      if (!result?.collections) {
        throw new Error(`invalid collection ${props}`);
      }
      return result.collections.map((collection) => Number(collection.id));
    }
  }

  async collectionStepsById(props: { collectionId: number }) {
    const result = await this.apiClient.collectionStepsById(props);
    return result.steps;
  }

  async ownedNfts(args: Parameters<Api['ownedNfts']>[0]) {
    const result = await this.apiClient.ownedNfts(args);
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

  private getDefaults() {
    const contracts = getContracts(this.wallet.chain);
    return {
      Msl: contracts.MultiSourceLoan['3.1'],
      UserVault: contracts.UserVault['3'],
    };
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
    contract: externalContract,
  }: {
    to: Address;
    collection: Address;
    tokenId: bigint;
    contract?: Address;
  }) {
    const contract = externalContract ?? this.getDefaults().Msl;
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
    to: externalTo,
  }: {
    nftAddress: Address;
    standard: Parameters<Contracts['Nft']>[1];
    to?: Address;
  }) {
    const nft = this.contracts.Nft(nftAddress, standard);
    const to = externalTo ?? this.getDefaults().Msl;
    return nft.contract.read.isApprovedForAll([this.account.address, to]);
  }

  async approveNFTForAll({
    nftAddress,
    standard,
    to: externalTo,
  }: {
    nftAddress: Address;
    standard: Parameters<Contracts['Nft']>[1];
    to?: Address;
  }) {
    const nft = this.contracts.Nft(nftAddress, standard);
    const to = externalTo ?? this.getDefaults().Msl;
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
    to: externalTo,
  }: {
    tokenAddress: Address;
    amount: bigint;
    to?: Address;
  }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    const to = externalTo ?? this.getDefaults().Msl;
    return (await erc20.contract.read.allowance([this.account.address, to])) >= amount;
  }

  async approveToken({
    tokenAddress,
    amount = model.MAX_NUMBER,
    to: externalTo,
  }: {
    tokenAddress: Address;
    amount?: bigint;
    to?: Address;
  }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    const to = externalTo ?? this.getDefaults().Msl;
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
    to: externalTo,
  }: {
    tokenAddress: Address;
    to?: Address;
  }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    const to = externalTo ?? this.getDefaults().Msl;
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
    userVaultAddress,
  }: {
    nfts: CreateVaultNfts;
    currencies?: CreateVaultCurrencies;
    userVaultAddress?: Address;
  }) {
    const userVault = userVaultAddress ?? this.getDefaults().UserVault;
    return this.contracts.UserVault(userVault).createVault(nfts, currencies);
  }

  async depositUserVaultERC721s({
    userVaultAddress,
    ...data
  }: { userVaultAddress?: Address } & DepositERC721sArgs) {
    const userVault = userVaultAddress ?? this.getDefaults().UserVault;
    return this.contracts.UserVault(userVault).depositERC721s(data);
  }

  async depositUserVaultERC1155s({
    userVaultAddress,
    ...data
  }: { userVaultAddress?: Address } & DepositERC1155sArgs) {
    const userVault = userVaultAddress ?? this.getDefaults().UserVault;
    return this.contracts.UserVault(userVault).depositERC1155s(data);
  }

  async depositUserVaultERC20({
    userVaultAddress,
    ...data
  }: { userVaultAddress?: Address } & DepositERC20Args) {
    const userVault = userVaultAddress ?? this.getDefaults().UserVault;
    return this.contracts.UserVault(userVault).depositERC20(data);
  }

  async burnUserVaultAndWithdraw({
    userVaultAddress,
    ...data
  }: { userVaultAddress?: Address } & BurnAndWithdrawArgs) {
    const userVault = userVaultAddress ?? this.getDefaults().UserVault;
    return this.contracts.UserVault(userVault).burnAndWithdraw(data);
  }

  async wrapOldERC721({ collection, tokenId }: wrapOldERC721Args) {
    const wrapperAddress = await this.apiClient.getWrapperAddress(collection);
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
    const wrapperAddress = await this.apiClient.getWrapperAddress(collection);
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
      const { saleCalldata } = await this.apiClient.getSaleCalldata({
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

    const fulfillOrder = await this.openseaClient.fulfillOrder({
      hash: order.originalId,
      protocolAddress: order.marketPlaceAddress,
      fulfiller: { address: this.wallet.account.address },
      consideration: {
        contract: nft.collectionAddress,
        token_id: nft.tokenId.toString(),
      },
      chainId: this.wallet.chain.id,
    });

    if (
      isFulfillAdvancedOrderFunctionName(fulfillOrder.functionName) &&
      order.currencyAddress !== zeroAddress &&
      fulfillOrder.fee > 0n
    ) {
      // This approval is needed since fulfillAdvancedOrder
      // first transfers the offers to the fulfiller
      // and then the fulfiller transfers the considerations
      // meaning that the fulfiller needs to be able to transfer the currency
      const props = {
        tokenAddress: order.currencyAddress,
        amount: fulfillOrder.fee,
        to: order.marketPlaceAddress,
      };
      const isApproved = await this.isApprovedToken(props);
      if (!isApproved) {
        const { waitTxInBlock } = await this.approveToken(props);
        await waitTxInBlock();
      }
    }

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

  async getProtocolFee({ mslContractAddress }: { mslContractAddress: Address }) {
    return this.contracts.Msl(mslContractAddress).getProtocolFee();
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
  callbackData?: Hex;
}
