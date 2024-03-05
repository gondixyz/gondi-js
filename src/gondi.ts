import {
  Address,
  Chain,
  createPublicClient,
  createTransport,
  Hash,
  Hex,
  PublicClient,
  Transport,
} from 'viem';

import { Api, Props as ApiProps } from '@/api';
import {
  Contracts,
  filterLogs,
  LoanV4V5,
  LoanV5,
  OfferV5,
  Wallet,
  zeroAddress,
  zeroHash,
  zeroHex,
} from '@/blockchain';
import { getCurrencies } from '@/deploys';
import { MarketplaceEnum, OffersSortField, Ordering } from '@/generated/graphql';
import * as model from '@/model';
import { Reservoir } from '@/reservoir/Reservoir';
import { isNative, SeaportOrder } from '@/reservoir/utils';
import { emitLoanArgsToMslArgs, NATIVE_MARKETPLACE } from '@/utils';
import { loanToMslLoan, renegotiationToMslRenegotiation } from '@/utils/loan';

type GondiProps = {
  wallet: Wallet;
  apiClient?: ApiProps['apiClient'];
  reservoirBaseApiUrl?: string;
};

export class Gondi {
  contracts: Contracts;
  wallet: Wallet;
  bcClient: PublicClient<Transport, Chain>;
  api: Api;
  reservoir: Reservoir;

  constructor({ wallet, apiClient, reservoirBaseApiUrl }: GondiProps) {
    this.wallet = wallet;
    this.bcClient = createPublicClient({
      chain: wallet.chain,
      transport: () => createTransport(wallet.transport),
    });
    this.contracts = new Contracts(this.bcClient, wallet);
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
    const contract = mslContractAddress
      ? this.contracts.Msl(mslContractAddress)
      : this.contracts.MultiSourceLoanV5;
    const contractAddress = contract.address;

    const offerInput = {
      ...offer,
      lenderAddress: offer.lenderAddress ? offer.lenderAddress : this.wallet.account?.address,
      signerAddress: this.wallet.account?.address,
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
  async _makeCollectionOffer(offer: model.CollectionOfferInput, mslContractAddress?: Address) {
    const contract = mslContractAddress
      ? this.contracts.Msl(mslContractAddress)
      : this.contracts.MultiSourceLoanV5;
    const contractAddress = contract.address;

    const offerInput = {
      ...offer,
      lenderAddress: offer.lenderAddress ? offer.lenderAddress : this.wallet.account?.address,
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
      lenderAddress: this.wallet.account?.address,
      signerAddress: this.wallet.account?.address,
      ...renegotiation,
      targetPrincipal: renegotiation.targetPrincipal ?? [],
      trancheIndex: renegotiation.trancheIndex ?? [],
    };
    const response = await this.api.generateRenegotiationOfferHash({
      renegotiationInput,
    });

    const { renegotiationId, offerHash, loanId, lenderAddress, signerAddress } = response.offer;
    const structToSign = {
      ...renegotiationInput,
      fee: renegotiationInput.feeAmount,
      lender: lenderAddress ?? renegotiationInput.lenderAddress,
      signer: signerAddress ?? renegotiationInput.signerAddress ?? zeroAddress,
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

  async emitLoan({
    offer,
    ...rest
  }: {
    offer: model.SingleNftOffer | model.CollectionOffer;
    tokenId: bigint;
    amount?: bigint;
    expirationTime?: bigint;
  }) {
    const emitLoanMslArgs = emitLoanArgsToMslArgs({ offer, ...rest });
    return this.contracts.Msl(offer.contractAddress).emitLoan(emitLoanMslArgs);
  }

  async repayLoan({
    loan,
    loanId,
    nftReceiver,
  }: {
    loan: LoanV4V5;
    loanId: bigint;
    nftReceiver?: Address;
  }) {
    const startTime = loan.startTime as Date | bigint;
    const loanInContractFormat = {
      ...loan,
      startTime: BigInt(startTime instanceof Date ? startTime.getTime() / 1_000 : startTime),
    };
    return this.contracts.Msl(loan.contractAddress).repayLoan({
      loan: loanInContractFormat,
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

  async getRemainingLockupSeconds({ loan }: { loan: LoanV4V5 }) {
    return this.contracts.Msl(loan.contractAddress).getRemainingLockupSeconds({
      loan,
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

  async refinanceFullLoan({
    offer,
    loan,
    loanId,
  }: {
    offer: model.RenegotiationOffer;
    loan: LoanV4V5;
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
    loan: LoanV4V5;
    loanId: bigint;
  }) {
    return this.contracts.Msl(loan.contractAddress).refinancePartialLoan({
      offer: renegotiationToMslRenegotiation(offer, loanId),
      loan: loanToMslLoan(loan),
    });
  }

  async extendLoan({
    loan,
    newDuration,
    loanId,
  }: {
    loan: LoanV5;
    newDuration: bigint;
    loanId: bigint;
  }) {
    return this.contracts.Msl(loan.contractAddress).extendLoan({ loan, newDuration, loanId });
  }

  /**
   * Delegate Multicall should be used when token is used as collateral for an active loan.
   * Multicall will be performed to the contract address of the first delegation.
   */
  async delegateMulticall(delegations: Parameters<Gondi['delegate']>[0][]) {
    const contractAddress = delegations[0].loan.contractAddress;
    return this.contracts.Msl(contractAddress).delegateMulticall(delegations);
  }

  /** Delegate should be used when token is used as collateral for an active loan. */
  async delegate({
    loan,
    loanId,
    to,
    enable,
    rights,
  }: {
    loan: LoanV5;
    loanId: bigint;
    to: Address;
    enable: boolean;
    rights?: Hash;
  }) {
    return this.contracts.Msl(loan.contractAddress).delegate({ loan, loanId, to, rights, enable });
  }

  /** RevokeDelegate should be used when token is not being used as collateral. */
  async revokeDelegate({
    to,
    collection,
    tokenId,
    contract = this.contracts.MultiSourceLoanV5.address,
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
    const emitLoanMslArgs = emitLoanArgsToMslArgs(emit);

    return this.contracts
      .Msl(emit.offer.contractAddress)
      .revokeDelegationsAndEmitLoan({ delegations, emit: emitLoanMslArgs });
  }

  async liquidateLoan({ loan, loanId }: { loan: LoanV4V5; loanId: bigint }) {
    return this.contracts.Msl(loan.contractAddress).liquidateLoan({
      loan,
      loanId,
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

  async settleAuction({ loan, auction }: { loan: LoanV4V5; auction: model.Auction }) {
    return this.contracts.All(auction.loanAddress).settleAuction({ loan, auction });
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

  async getOwner({ nftAddress, tokenId }: { nftAddress: Address; tokenId: bigint }) {
    const erc721 = this.contracts.ERC721(nftAddress);
    return erc721.read.ownerOf([tokenId]);
  }

  async isApprovedNFTForAll({
    nftAddress,
    to = this.contracts.MultiSourceLoanV5.address,
  }: {
    nftAddress: Address;
    to?: Address;
  }) {
    const erc721 = this.contracts.ERC721(nftAddress);
    return erc721.read.isApprovedForAll([this.wallet.account?.address, to]);
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
        if (events.length === 0) throw new Error('ERC721 approval for all not set');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async isApprovedToken({
    tokenAddress,
    amount,
    to = this.contracts.MultiSourceLoanV5.address,
  }: {
    tokenAddress: Address;
    amount: bigint;
    to?: Address;
  }) {
    const erc20 = this.contracts.ERC20(tokenAddress);
    return (await erc20.read.allowance([this.wallet.account?.address, to])) >= amount;
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
        if (events.length === 0) throw new Error('ERC20 approval not set');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async createUserVault({
    nfts,
    userVaultAddress = this.contracts.UserVaultV5.address,
  }: {
    nfts: Parameters<Contracts['UserVaultV5']['createVault']>[0];
    userVaultAddress?: Address;
  }) {
    return this.contracts.UserVault(userVaultAddress).createVault(nfts);
  }

  async depositUserVaultERC721s({
    userVaultAddress = this.contracts.UserVaultV5.address,
    ...data
  }: {
    userVaultAddress?: Address;
  } & Parameters<Contracts['UserVaultV5']['depositERC721s']>[0]) {
    return this.contracts.UserVault(userVaultAddress).depositERC721s(data);
  }

  async burnUserVaultAndWithdraw({
    userVaultAddress = this.contracts.UserVaultV5.address,
    ...data
  }: {
    userVaultAddress?: Address;
  } & Parameters<Contracts['UserVaultV5']['burnAndWithdraw']>[0]) {
    return this.contracts.UserVault(userVaultAddress).burnAndWithdraw(data);
  }
}
