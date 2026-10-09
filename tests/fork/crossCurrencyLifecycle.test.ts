import { expect, test } from 'bun:test';
import {
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
  encodeFunctionData,
  decodeEventLog,
  parseEther,
  maxUint256,
  zeroAddress,
  zeroHash,
  toHex,
  keccak256,
  encodeAbiParameters,
  encodePacked,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';
import { CrossCurrencyRenegotiation } from '@/clients/contracts/CrossCurrencyRenegotiation';
import { buildCreditPurchaseSwap } from '@/utils/creditPurchase';
import { universalRouterExecuteAbi } from '@/utils/crossCurrencyRenegotiation';
import { getContracts } from '@/deploys';
import { getTotalOwedAt } from '@/utils/loan';
import { MslV6 } from '@/clients/contracts/MslV6';
import { PurchaseBundlerV2 } from '@/clients/contracts/PurchaseBundlerV2';
import { multiSourceLoanAbi as v31Abi, purchaseBundlerV2ABI } from '@/generated/blockchain/v7';
import { multiSourceLoanAbi as v32Abi } from '@/generated/blockchain/v8';
import { seaportABI } from '@/generated/blockchain/seaport';

/**
 * Proves all replacement pairs and subsequent cash/credit settlement on deployed contracts.
 *
 * IMPLEMENTATION NOTE: Run only against a disposable Anvil Ethereum fork with
 * `GONDI_FORK_URL=http://127.0.0.1:18547 bun test --loader .graphql:text tests/fork/`.
 * Anvil impersonation funds synthetic fixtures and enables local whitelist entries.
 * Snapshots restore the fork, including all admin changes, even after a failure.
 * Receipt polling tolerates Anvil snapshots reusing block heights without a new-block watcher.
 * https://getfoundry.sh/anvil/reference/
 */
test.skipIf(!process.env.GONDI_FORK_URL)(
  'all eight replacements remain saleable',
  async () => {
    const forkUrl = new URL(process.env.GONDI_FORK_URL!);
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(forkUrl.hostname))
      throw new Error('Disposable localhost fork required');
    const transport = http(process.env.GONDI_FORK_URL);
    const client = createPublicClient({
      chain: mainnet,
      transport,
      pollingInterval: 25,
      cacheTime: 0,
    });
    if (!(await client.request({ method: 'web3_clientVersion' })).toLowerCase().includes('anvil'))
      throw new Error('Local fork required');
    if ((await client.getChainId()) !== 1) throw new Error('Ethereum fork required');
    const readMinedReceipt = client.getTransactionReceipt.bind(client);
    client.waitForTransactionReceipt = async ({ hash }) => {
      const deadline = Date.now() + 60000;
      for (;;) {
        try {
          return await readMinedReceipt({ hash });
        } catch (error) {
          if (error.name !== 'TransactionReceiptNotFoundError' || Date.now() >= deadline)
            throw error;
          await new Promise((resolve) => setTimeout(resolve, 25));
        }
      }
    };
    const { Gondi } = await import('@/gondi');
    let replacements = 0;
    let sales = 0;
    const roles = Object.fromEntries(
      ['borrower', 'lender', 'replacementLender', 'buyer', 'buyerLender'].map((role) => {
        const account = privateKeyToAccount(keccak256(toHex(`currency-lifecycle-fixture-${role}`)));
        return [role, createWalletClient({ account, chain: mainnet, transport })];
      }),
    );
    const nft = '0x059edd72cd353df5106d2b9cc5ab83a52287ac3a';
    const usdc = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
    const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    const contracts = {
      '3.1': {
        address: '0xf41b389e0c1950dc0b16c9498eae77131cc08a56',
        abi: v31Abi,
        bundler: '0xf46a58cada29ff34cf62f72357d2b37815506feb',
      },
      '3.2': {
        address: '0xe365ff3cad44d19cb7aba81df8ffd6818a66ac0a',
        abi: v32Abi,
        bundler: '0x2b5e66c44b223b9d3b192e697f58795febcd6c10',
      },
    };
    const migrator = '0xdcd85fee491de4b1fc11cbc0ba0e78537732f5b8';
    const migratorManager = '0x8fb98cc4999de00f6ace797a195381c0b90c1487';
    const methodManager = '0x4ecc15ded6e2eb38cce6b0bd0bb0e417813f8f09';
    const seaport = '0x0000000000000068f116a894984e2db1123eb395';
    const router = '0x66a9893cc07d91d95644aedd05d03f95e1dba8af';
    const erc20 = parseAbi([
      'function approve(address,uint256) returns (bool)',
      'function transfer(address,uint256) returns (bool)',
      'function balanceOf(address) view returns (uint256)',
      'function deposit() payable',
    ]);
    const nftAbi = parseAbi([
      'function ownerOf(uint256) view returns (address)',
      'function transferFrom(address,address,uint256)',
      'function approve(address,uint256)',
      'function setApprovalForAll(address,bool)',
    ]);
    const balance = (token, address) =>
      client.readContract({
        address: token,
        abi: erc20,
        functionName: 'balanceOf',
        args: [address],
      });
    function show(call, depth = 0) {
      if (call.error || depth < 2)
        console.log(
          'TRACE',
          depth,
          call.type,
          call.to,
          call.input?.slice(0, 10),
          call.error,
          call.revertReason,
          call.output?.slice(0, 200),
        );
      for (const child of call.calls ?? []) show(child, depth + 1);
    }
    async function send(wallet, args) {
      try {
        await client.simulateContract({ ...args, account: wallet.account });
      } catch (error) {
        show(
          await client.request({
            method: 'debug_traceCall',
            params: [
              {
                from: wallet.account.address,
                to: args.address,
                data: encodeFunctionData(args),
                value: toHex(args.value ?? 0n),
              },
              'latest',
              { tracer: 'callTracer' },
            ],
          }),
        );
        throw error;
      }
      const hash = await wallet.writeContract({ ...args, gas: 5000000n });
      const receipt = await client.waitForTransactionReceipt({ hash });
      if (receipt.status !== 'success') throw new Error(`${args.functionName} reverted`);
      return receipt;
    }
    async function impersonate(account, address, abi, functionName, args) {
      await client.request({ method: 'anvil_impersonateAccount', params: [account] });
      await client.request({
        method: 'anvil_setBalance',
        params: [account, toHex(parseEther('100'))],
      });
      const hash = await client.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: account,
            to: address,
            data: encodeFunctionData({ abi, functionName, args }),
            gas: '0x4c4b40',
          },
        ],
      });
      const receipt = await client.waitForTransactionReceipt({ hash });
      if (receipt.status !== 'success') throw new Error(`${functionName} fixture reverted`);
    }
    async function fund(wallet, token, amount) {
      if (token === weth)
        await send(wallet, { address: weth, abi: erc20, functionName: 'deposit', value: amount });
      else
        await impersonate('0x28c6c06298d514db089934071355e5743bf21d60', token, erc20, 'transfer', [
          wallet.account.address,
          amount,
        ]);
    }
    async function signedOffer(version, wallet, borrower, token, principal, offerId) {
      const deployment = contracts[version];
      const timestamp = (await client.getBlock()).timestamp;
      const offer = {
        offerId,
        lender: wallet.account.address,
        fee: principal / 100n,
        capacity: 0n,
        nftCollateralAddress: nft,
        nftCollateralTokenId: 1n,
        principalAddress: token,
        principalAmount: principal,
        aprBps: 1000n,
        expirationTime: timestamp + 7200n,
        duration: 2592000n,
        maxSeniorRepayment: 0n,
        validators: [],
        lenderRefinanceDisabled: version === '3.2',
        borrower,
      };
      const fields = deployment.abi
        .find((item) => item.type === 'function' && item.name === 'emitLoan')
        .inputs[0].components[0].components[0].components[0].components.map((field) => ({
          name: field.name,
          type: field.name === 'validators' ? 'OfferValidator[]' : field.type,
        }));
      const signature = await wallet.account.signTypedData({
        domain: {
          name: 'GONDI_MULTI_SOURCE_LOAN',
          version,
          chainId: 1,
          verifyingContract: deployment.address,
        },
        types: {
          LoanOffer: fields,
          OfferValidator: [
            { name: 'validator', type: 'address' },
            { name: 'arguments', type: 'bytes' },
          ],
        },
        primaryType: 'LoanOffer',
        message: offer,
      });
      return { offer, amount: principal, lenderOfferSignature: signature };
    }
    function emitted(receipt, version) {
      const deployment = contracts[version];
      for (const log of receipt.logs) {
        if (log.address.toLowerCase() !== deployment.address) continue;
        try {
          const event = decodeEventLog({ abi: deployment.abi, data: log.data, topics: log.topics });
          if (event.eventName === 'LoanEmitted') return event.args;
        } catch {}
      }
      throw new Error('Missing loan emission');
    }
    async function replace(oldVersion, newVersion, oldToken) {
      for (const wallet of Object.values(roles))
        await client.request({
          method: 'anvil_setBalance',
          params: [wallet.account.address, toHex(parseEther('100'))],
        });
      const originalOwner = await client.readContract({
        address: nft,
        abi: nftAbi,
        functionName: 'ownerOf',
        args: [1n],
      });
      await impersonate(originalOwner, nft, nftAbi, 'transferFrom', [
        originalOwner,
        roles.borrower.account.address,
        1n,
      ]);
      const oldDeployment = contracts[oldVersion],
        newDeployment = contracts[newVersion];
      const newToken = oldToken === usdc ? weth : usdc;
      const oldPrincipal = oldToken === usdc ? 1000000000n : parseEther('0.25');
      const newPrincipal = newToken === usdc ? 3000000000n : parseEther('1');
      await fund(roles.lender, oldToken, oldPrincipal * 2n);
      await fund(roles.replacementLender, newToken, newPrincipal * 2n);
      await send(roles.lender, {
        address: oldToken,
        abi: erc20,
        functionName: 'approve',
        args: [oldDeployment.address, maxUint256],
      });
      await send(roles.replacementLender, {
        address: newToken,
        abi: erc20,
        functionName: 'approve',
        args: [newDeployment.address, maxUint256],
      });
      await send(roles.borrower, {
        address: nft,
        abi: nftAbi,
        functionName: 'setApprovalForAll',
        args: [oldDeployment.address, true],
      });
      await send(roles.borrower, {
        address: nft,
        abi: nftAbi,
        functionName: 'setApprovalForAll',
        args: [newDeployment.address, true],
      });
      const oldOffer = await signedOffer(
        oldVersion,
        roles.lender,
        roles.borrower.account.address,
        oldToken,
        oldPrincipal,
        910001n,
      );
      const oldExecution = {
        offerExecution: [oldOffer],
        loanId: 0n,
        nftCollateralAddress: nft,
        tokenId: 1n,
        duration: oldOffer.offer.duration,
        expirationTime: oldOffer.offer.expirationTime,
        principalReceiver: roles.borrower.account.address,
        callbackData: '0x',
      };
      const initial = emitted(
        await send(roles.borrower, {
          address: oldDeployment.address,
          abi: oldDeployment.abi,
          functionName: 'emitLoan',
          args: [
            {
              executionData: oldExecution,
              borrower: roles.borrower.account.address,
              borrowerOfferSignature: '0x',
            },
          ],
        }),
        oldVersion,
      );
      await send(roles.borrower, {
        address: oldToken,
        abi: erc20,
        functionName: 'transfer',
        args: [
          roles.lender.account.address,
          await balance(oldToken, roles.borrower.account.address),
        ],
      });
      await send(roles.borrower, {
        address: oldToken,
        abi: erc20,
        functionName: 'approve',
        args: [oldDeployment.address, maxUint256],
      });
      const managerAbi = parseAbi([
        'function owner() view returns (address)',
        'function add(address) returns (uint16)',
        'function isWhitelisted(address) view returns (bool)',
      ]);
      const admin = await client.readContract({
        address: migratorManager,
        abi: managerAbi,
        functionName: 'owner',
      });
      if (
        !(await client.readContract({
          address: migratorManager,
          abi: managerAbi,
          functionName: 'isWhitelisted',
          args: [oldDeployment.bundler],
        }))
      )
        await impersonate(admin, migratorManager, managerAbi, 'add', [oldDeployment.bundler]);
      await send(roles.borrower, {
        address: oldDeployment.bundler,
        abi: purchaseBundlerV2ABI,
        functionName: 'approveForSwap',
        args: [newToken],
      });
      const incoming = await signedOffer(
        newVersion,
        roles.replacementLender,
        roles.borrower.account.address,
        newToken,
        newPrincipal,
        910002n,
      );
      const wrapper = (version) =>
        new MslV6({
          address: contracts[version].address,
          version,
          walletClient: roles.borrower,
          publicClient: client,
        });
      const sdk = new CrossCurrencyRenegotiation({
        previousMsl: wrapper(oldVersion),
        msl: wrapper(newVersion),
        walletClient: roles.borrower,
        publicClient: client,
      });
      const input = {
        loan: {
          ...initial.loan,
          contractAddress: oldDeployment.address,
          contractStartTime: initial.loan.startTime,
        },
        loanId: initial.loanId,
        executionData: {
          nftCollateralAddress: nft,
          tokenId: 1n,
          duration: incoming.offer.duration,
          expirationTime: incoming.offer.expirationTime,
          offerExecution: [
            {
              ...incoming,
              offer: {
                ...incoming.offer,
                contractAddress: newDeployment.address,
                lenderAddress: incoming.offer.lender,
                signerAddress: incoming.offer.lender,
                borrowerAddress: roles.borrower.account.address,
                offerValidators: [],
              },
            },
          ],
        },
      };
      const before = await Promise.all(
        [migrator, oldDeployment.bundler, router].map((address) => balance(newToken, address)),
      );
      const quote = await sdk.quote(input);
      await send(roles.borrower, {
        address: newToken,
        abi: erc20,
        functionName: 'approve',
        args: [migrator, quote.maximumFlashRepayment],
      });
      const result = await (await sdk.execute({ ...input, quote })).waitTxInBlock();
      const replacement = emitted(result, newVersion);
      const dust = await Promise.all(
        [migrator, oldDeployment.bundler, router].map(
          async (address, index) => (await balance(newToken, address)) - before[index],
        ),
      );
      if (dust.some((amount) => amount !== 0n)) throw new Error('Stranded replacement funding');
      if (
        (await client.readContract({
          address: oldDeployment.address,
          abi: oldDeployment.abi,
          functionName: 'getLoanHash',
          args: [initial.loanId],
        })) !== zeroHash
      )
        throw new Error('Old loan remains live');
      if (
        (
          await client.readContract({
            address: nft,
            abi: nftAbi,
            functionName: 'ownerOf',
            args: [1n],
          })
        ).toLowerCase() !== newDeployment.address
      )
        throw new Error('Wrong replacement custody');
      replacements++;
      console.log(
        'REPLACEMENT_PASS',
        oldVersion,
        newVersion,
        oldToken === usdc ? 'USDC_WETH' : 'WETH_USDC',
        String(result.gasUsed),
      );
      return { ...replacement, version: newVersion, currency: newToken };
    }
    const quoteAbi = parseAbi([
      'function quoteExactOutput(bytes,uint256) returns (uint256,uint160[],uint32[],uint256)',
    ]);
    async function conversion(input, output, amount) {
      if (input === output) return amount;
      return (
        await client.simulateContract({
          address: getContracts(mainnet).UniswapQuoterV2,
          abi: quoteAbi,
          functionName: 'quoteExactOutput',
          args: [encodePacked(['address', 'uint24', 'address'], [output, 500, input]), amount],
        })
      ).result[0];
    }
    async function sale(
      replacement,
      listingCurrency,
      buyerCurrency,
      credit = true,
      partial = false,
    ) {
      const oldDeployment = contracts[replacement.version],
        buyerDeployment = contracts['3.1'];
      const native = listingCurrency === zeroAddress;
      const listingToken = native ? weth : listingCurrency;
      const price =
        ((await conversion(listingToken, replacement.currency, replacement.loan.principalAmount)) *
          3n) /
        2n;
      const sellerFee = (price * 2n) / 100n;
      const sellerOwed = getTotalOwedAt(
        { ...replacement.loan, contractStartTime: replacement.loan.startTime },
        (await client.getBlock()).timestamp + 180n,
      );
      const parameters = {
        offerer: oldDeployment.bundler,
        zone: roles.borrower.account.address,
        offer: [
          { itemType: 2, token: nft, identifierOrCriteria: 1n, startAmount: 1n, endAmount: 1n },
        ],
        consideration: [
          {
            itemType: native ? 0 : 1,
            token: native ? zeroAddress : listingCurrency,
            identifierOrCriteria: 0n,
            startAmount: price - sellerFee,
            endAmount: price - sellerFee,
            recipient: oldDeployment.bundler,
          },
          {
            itemType: native ? 0 : 1,
            token: native ? zeroAddress : listingCurrency,
            identifierOrCriteria: 0n,
            startAmount: sellerFee,
            endAmount: sellerFee,
            recipient: '0x4169447a424ec645f8a24dccfd8328f714dd5562',
          },
        ],
        orderType: 0,
        startTime: 0n,
        endTime: (await client.getBlock()).timestamp + 3600n,
        zoneHash: zeroHash,
        salt: 123n,
        conduitKey: zeroHash,
        totalOriginalConsiderationItems: 2n,
      };
      const marketCalldata = encodeFunctionData({
        abi: seaportABI,
        functionName: 'fulfillAdvancedOrder',
        args: [
          { parameters, numerator: 1n, denominator: 1n, signature: '0x', extraData: '0x' },
          [],
          zeroHash,
          zeroAddress,
        ],
      });
      const different = listingCurrency !== replacement.currency;
      let sellerSwap = '0x';
      let swapValue = 0n;
      if (different) {
        if (native) {
          swapValue = price - sellerFee;
          sellerSwap = encodeFunctionData({
            abi: universalRouterExecuteAbi,
            functionName: 'execute',
            args: [
              '0x0b010c',
              [
                encodeAbiParameters(
                  [{ type: 'address' }, { type: 'uint256' }],
                  ['0x0000000000000000000000000000000000000002', swapValue],
                ),
                encodeAbiParameters(
                  [
                    { type: 'address' },
                    { type: 'uint256' },
                    { type: 'uint256' },
                    { type: 'bytes' },
                    { type: 'bool' },
                  ],
                  [
                    oldDeployment.bundler,
                    sellerOwed,
                    swapValue,
                    encodePacked(
                      ['address', 'uint24', 'address'],
                      [replacement.currency, 500, weth],
                    ),
                    false,
                  ],
                ),
                encodeAbiParameters(
                  [{ type: 'address' }, { type: 'uint256' }],
                  [oldDeployment.bundler, 0n],
                ),
              ],
              (await client.getBlock()).timestamp + 3600n,
            ],
          });
          if (replacement.currency === weth) {
            swapValue = sellerOwed;
            sellerSwap = encodeFunctionData({
              abi: universalRouterExecuteAbi,
              functionName: 'execute',
              args: [
                '0x0b',
                [
                  encodeAbiParameters(
                    [{ type: 'address' }, { type: 'uint256' }],
                    [oldDeployment.bundler, sellerOwed],
                  ),
                ],
                (await client.getBlock()).timestamp + 3600n,
              ],
            });
          }
        } else
          sellerSwap = buildCreditPurchaseSwap({
            loanCurrency: listingCurrency,
            purchaseCurrency: replacement.currency,
            amount: sellerOwed,
            limit: price - sellerFee,
            exactInput: false,
            deadline: (await client.getBlock()).timestamp + 3600n,
          });
        await send(roles.borrower, {
          address: oldDeployment.bundler,
          abi: purchaseBundlerV2ABI,
          functionName: 'approveForSwap',
          args: [listingToken],
        });
      }
      const quoteData = different
        ? encodeAbiParameters(
            [{ type: 'address' }, { type: 'bytes' }],
            [
              '0xcad3b037b56cbd2b4cae2b35b878894e541af68a',
              encodeAbiParameters([{ type: 'uint24' }, { type: 'uint32' }], [500, 300]),
            ],
          )
        : '0x';
      const callbackData = encodeAbiParameters(
        [PurchaseBundlerV2.EXECUTION_INFO],
        [
          {
            reservoirExecutionInfo: {
              module: seaport,
              data: marketCalldata,
              value: native ? price : 0n,
            },
            contractMustBeOwner: true,
            purchaseCurrency: native ? PurchaseBundlerV2.ETH_SENTINEL : listingCurrency,
            amount: price - sellerFee,
            swapData: quoteData,
            swapValue,
            maxSlippage: 1000n,
          },
        ],
      );
      const sellerMsl = new MslV6({
        address: oldDeployment.address,
        version: replacement.version,
        walletClient: roles.borrower,
        publicClient: client,
      });
      const repaymentData = { loanId: replacement.loanId, callbackData, shouldDelegate: false };
      const signature = await sellerMsl.signRepaymentData({ structToSign: repaymentData });
      const repaymentCalldata = encodeFunctionData({
        abi: oldDeployment.abi,
        functionName: 'repayLoan',
        args: [{ data: repaymentData, loan: replacement.loan, borrowerSignature: signature }],
      });
      await send(roles.borrower, {
        address: replacement.currency,
        abi: erc20,
        functionName: 'approve',
        args: [oldDeployment.address, maxUint256],
      });
      await send(roles.borrower, {
        address: nft,
        abi: nftAbi,
        functionName: 'setApprovalForAll',
        args: [oldDeployment.bundler, true],
      });
      let result;
      const holders = [oldDeployment.bundler, buyerDeployment.bundler, router, migrator];
      const nativeBefore = await Promise.all(
        holders.map((address) => client.getBalance({ address })),
      );
      const before = await Promise.all(
        holders.flatMap((address) => [usdc, weth].map((currency) => balance(currency, address))),
      );
      const sellerBefore = await balance(replacement.currency, roles.borrower.account.address);
      const listingBalance = (address) =>
        native ? client.getBalance({ address }) : balance(listingCurrency, address);
      const sellerListingBefore = await listingBalance(roles.borrower.account.address);
      const feeCollector = '0x4169447a424ec645f8a24dccfd8328f714dd5562';
      const feeBefore = await listingBalance(feeCollector);
      const lenderBefore = await balance(
        replacement.currency,
        roles.replacementLender.account.address,
      );
      if (!credit) {
        if (!native) {
          await fund(roles.buyer, listingCurrency, price);
          await send(roles.buyer, {
            address: listingCurrency,
            abi: erc20,
            functionName: 'approve',
            args: [oldDeployment.bundler, price],
          });
        }
        const pb = new PurchaseBundlerV2({
          address: oldDeployment.bundler,
          msl: sellerMsl,
          walletClient: roles.buyer,
          publicClient: client,
        });
        result = await (
          await pb.executeSell({
            repaymentCalldata,
            price,
            swapData: sellerSwap === '0x' ? undefined : sellerSwap,
          })
        ).waitTxInBlock();
        if (
          (
            await client.readContract({
              address: nft,
              abi: nftAbi,
              functionName: 'ownerOf',
              args: [1n],
            })
          ).toLowerCase() !== roles.buyer.account.address.toLowerCase()
        )
          throw new Error('Wrong cash buyer custody');
      } else {
        const principal =
          ((await conversion(buyerCurrency, listingToken, price)) * (partial ? 1n : 2n)) /
          (partial ? 2n : 1n);
        await fund(roles.buyerLender, buyerCurrency, principal * 2n);
        await send(roles.buyerLender, {
          address: buyerCurrency,
          abi: erc20,
          functionName: 'approve',
          args: [buyerDeployment.address, maxUint256],
        });
        await send(roles.buyer, {
          address: nft,
          abi: nftAbi,
          functionName: 'setApprovalForAll',
          args: [buyerDeployment.address, true],
        });
        const incoming = await signedOffer(
          '3.1',
          roles.buyerLender,
          roles.buyer.account.address,
          buyerCurrency,
          principal,
          910003n,
        );
        const buyerMsl = new MslV6({
          address: buyerDeployment.address,
          version: '3.1',
          walletClient: roles.buyer,
          publicClient: client,
        });
        const methodAbi = parseAbi([
          'function owner() view returns (address)',
          'function addAddress(address,bytes4[])',
        ]);
        if (replacement.version === '3.2') {
          const admin = await client.readContract({
            address: methodManager,
            abi: methodAbi,
            functionName: 'owner',
          });
          await impersonate(admin, methodManager, methodAbi, 'addAddress', [
            oldDeployment.bundler,
            ['0x7239e3e9'],
          ]);
        }
        await send(roles.buyer, {
          address: buyerDeployment.bundler,
          abi: purchaseBundlerV2ABI,
          functionName: 'approveForSwap',
          args: [buyerCurrency],
        });
        const sdk = new Gondi({ wallet: roles.buyer, publicClient: client });
        const offers = [
          {
            ...incoming.offer,
            id: 'buyer-offer',
            contractAddress: buyerDeployment.address,
            lenderAddress: incoming.offer.lender,
            signature: incoming.lenderOfferSignature,
            offerValidators: [],
          },
        ];
        const expiration = (await client.getBlock()).timestamp + 3600n;
        sdk.apiClient.api.buyWithLoanListing = async () => ({
          listOrdersV2: {
            edges: [
              {
                node: {
                  __typename: 'SellAndRepayOrder',
                  id: '1',
                  price,
                  currencyAddress: listingCurrency,
                  isAsk: true,
                  status: 'Active',
                  maker: roles.borrower.account.address,
                  taker: zeroAddress,
                  marketPlace: 'NATIVE',
                  marketPlaceAddress: seaport,
                  platformFees: [],
                  expiration: new Date(Number(expiration) * 1000),
                  nft: {
                    tokenId: 1n,
                    collection: { contractData: { contractAddress: nft, blockchain: 'ETHEREUM' } },
                  },
                  repaymentCalldata,
                  loan: {
                    address: oldDeployment.address,
                    loanId: String(replacement.loanId),
                    status: 'loan_initiated',
                    principalAddress: replacement.currency,
                    startTime: new Date(Number(replacement.loan.startTime) * 1000),
                    duration: replacement.loan.duration,
                  },
                },
              },
            ],
          },
        });
        sdk.apiClient.publishBuyNowPayLaterOrder = async (input) => {
          const consent = input.creditPurchaseExecution;
          if (!consent) throw new Error('Missing bounded execution');
          const callbackData =
            replacement.version === '3.2'
              ? encodeAbiParameters(
                  [PurchaseBundlerV2.EXECUTION_INFO],
                  [
                    {
                      reservoirExecutionInfo: {
                        module: oldDeployment.bundler,
                        value: native ? price : 0n,
                        data: encodeFunctionData({
                          abi: purchaseBundlerV2ABI,
                          functionName: 'executeSell',
                          args: [
                            [native ? PurchaseBundlerV2.ETH_SENTINEL : listingCurrency],
                            [price],
                            [nft],
                            [1n],
                            seaport,
                            [repaymentCalldata],
                            consent.repaymentSwapData === '0x' ? [] : [consent.repaymentSwapData],
                          ],
                        }),
                      },
                      contractMustBeOwner: true,
                      purchaseCurrency: native ? PurchaseBundlerV2.ETH_SENTINEL : listingCurrency,
                      amount: consent.initialPayment,
                      swapValue: 0n,
                      swapData: consent.loanSwapData,
                      maxSlippage: 0n,
                    },
                  ],
                )
              : '0x';
          const execution = {
            offerExecution: [incoming],
            loanId: 0n,
            nftCollateralAddress: nft,
            tokenId: 1n,
            duration: incoming.offer.duration,
            expirationTime: consent.expirationTime,
            principalReceiver:
              replacement.version === '3.2' ? buyerDeployment.bundler : roles.buyer.account.address,
            callbackData,
          };
          return input.emitSignature
            ? {
                __typename: 'BuyNowPayLaterOrder',
                price,
                currencyAddress: listingCurrency,
                emitCalldata: encodeFunctionData({
                  abi: buyerDeployment.abi,
                  functionName: 'emitLoan',
                  args: [
                    {
                      executionData: execution,
                      borrower: roles.buyer.account.address,
                      borrowerOfferSignature: input.emitSignature,
                    },
                  ],
                }),
              }
            : {
                __typename: 'SignatureRequest',
                key: 'emitSignature',
                typedData: buyerMsl.getExecutionTypedData(execution),
              };
        };
        const quote = await sdk.quoteBuyWithLoan({
          orderId: 1,
          amounts: [principal],
          contractAddress: nft,
          tokenId: 1n,
          loanDuration: incoming.offer.duration,
          offers,
          sellAndRepaySwapData: sellerSwap,
        });
        if (partial && quote.initialPayment === 0n)
          throw new Error('Partial funding did not require a contribution');
        for (const approval of quote.approvalCaps) {
          if (approval.amount > 0n) await fund(roles.buyer, approval.currency, approval.amount);
          await send(roles.buyer, {
            address: approval.currency,
            abi: erc20,
            functionName: 'approve',
            args: [quote.buyerBundler, approval.amount],
          });
        }
        const buyerBefore = await listingBalance(roles.buyer.account.address);
        result = await (
          await sdk.buyNowPayLater({
            amounts: [principal],
            purchaseBundlerAddress: buyerDeployment.bundler,
            contractAddress: nft,
            tokenId: 1n,
            loanDuration: incoming.offer.duration,
            offers,
            buyWithLoanQuote: quote,
          })
        ).waitTxInBlock();
        const maximumDebit =
          quote.initialPayment + (native ? result.gasUsed * result.effectiveGasPrice : 0n);
        if (
          buyerCurrency !== listingCurrency &&
          (await listingBalance(roles.buyer.account.address)) < buyerBefore - maximumDebit
        )
          throw new Error('Buyer spent more than the confirmed contribution');
        if (
          (
            await client.readContract({
              address: nft,
              abi: nftAbi,
              functionName: 'ownerOf',
              args: [1n],
            })
          ).toLowerCase() !== buyerDeployment.address
        )
          throw new Error('Wrong buyer loan custody');
        if (
          emitted(result, '3.1').loan.borrower.toLowerCase() !==
          roles.buyer.account.address.toLowerCase()
        )
          throw new Error('Wrong new borrower');
      }
      if (
        (await client.readContract({
          address: oldDeployment.address,
          abi: oldDeployment.abi,
          functionName: 'getLoanHash',
          args: [replacement.loanId],
        })) !== zeroHash
      )
        throw new Error('Seller loan remains live');
      if (
        (await balance(replacement.currency, roles.replacementLender.account.address)) -
          lenderBefore <
        replacement.loan.principalAmount
      )
        throw new Error('Seller lender not repaid');
      if ((await balance(replacement.currency, roles.borrower.account.address)) <= sellerBefore)
        throw new Error('Seller did not receive proceeds');
      if ((await listingBalance(roles.borrower.account.address)) <= sellerListingBefore)
        throw new Error('Seller did not receive listing-currency proceeds');
      if ((await listingBalance(feeCollector)) - feeBefore < sellerFee)
        throw new Error('Listing fee was not paid');
      const after = await Promise.all(
        holders.flatMap((address) => [usdc, weth].map((currency) => balance(currency, address))),
      );
      if (after.some((amount, index) => amount > before[index]))
        throw new Error('Stranded sale currency');
      const nativeAfter = await Promise.all(
        holders.map((address) => client.getBalance({ address })),
      );
      if (nativeAfter.some((amount, index) => amount > nativeBefore[index]))
        throw new Error('Stranded native sale proceeds');
      sales++;
      console.log(
        'SALE_PASS',
        replacement.version,
        replacement.currency === usdc ? 'USDC' : 'WETH',
        native ? 'ETH' : listingCurrency === usdc ? 'USDC' : 'WETH',
        credit ? (buyerCurrency === usdc ? 'USDC_CREDIT' : 'WETH_CREDIT') : 'CASH',
        partial ? 'PARTIAL' : 'FULL',
        String(result.gasUsed),
      );
    }

    let baseline = await client.request({ method: 'evm_snapshot', params: [] });
    try {
      for (const oldVersion of ['3.1', '3.2'])
        for (const newVersion of ['3.1', '3.2'])
          for (const currency of [usdc, weth]) {
            const replacement = await replace(oldVersion, newVersion, currency);
            let checkpoint = await client.request({ method: 'evm_snapshot', params: [] });
            for (const listing of [usdc, weth, zeroAddress]) {
              await sale(replacement, listing, weth, false);
              await client.request({ method: 'evm_revert', params: [checkpoint] });
              checkpoint = await client.request({ method: 'evm_snapshot', params: [] });
              for (const buyerCurrency of [usdc, weth]) {
                await sale(replacement, listing, buyerCurrency, true);
                await client.request({ method: 'evm_revert', params: [checkpoint] });
                checkpoint = await client.request({ method: 'evm_snapshot', params: [] });
              }
            }
            {
              for (const listing of [usdc, weth, zeroAddress])
                for (const buyerCurrency of [usdc, weth]) {
                  await sale(replacement, listing, buyerCurrency, true, true);
                  await client.request({ method: 'evm_revert', params: [checkpoint] });
                  checkpoint = await client.request({ method: 'evm_snapshot', params: [] });
                }
            }
            await client.request({ method: 'evm_revert', params: [baseline] });
            baseline = await client.request({ method: 'evm_snapshot', params: [] });
          }
      expect(replacements).toBe(8);
      expect(sales).toBe(120);
    } finally {
      await client.request({ method: 'evm_revert', params: [baseline] });
      console.log('FORK_RESTORED');
    }
  },
  1200000,
);
