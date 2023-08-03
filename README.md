# Gondi.js

A JavaScript library for crypto-native lending: borrow, lend & refinance NFTs (non-fungible tokens). 



## Installation

You can install it via npm:

```bash
npm install --save gondi
# or
yarn add gondi
```

## Getting Started
To get started, you need to provide a wallet only. 

```javascript
import { Gondi } from 'gondi'
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
const transport = http('https://eth-mainnet.g.alchemy.com/v2/...')


const wallet = createWalletClient({
    account: privateKeyToAccount(privateKey),
    transport,
    chain: mainnet,
});
const gondi = new Gondi(wallet);
```
