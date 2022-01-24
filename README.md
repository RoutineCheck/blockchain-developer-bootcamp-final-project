# 🏗 Scaffold-ETH - 🎟 Fish.IO Project - Paul Kasaija - Ethereum Address: 0xd58CEC75CAF882E3F904215a1c716E4C7d9Aa578

> Build, mint, and send around your own ERC721 (using Scaffold-Eth simple-nft-project as template)

📱 Open http://localhost:3000 to see the NFTs in your account, which contains an iframe to play the game, OR the (in-development) app itself🛳, https://fishio-app.herokuapp.com/  .🛳 The NFT display in-app is still in progress, but it is fully visible on rinkeby.etherscan.io/0xd24bF2b41EBa0c5caDe0F02484a33B54432b91FF and on localhost:3000/transfers


> The main game 🛳, https://fishio-app.herokuapp.com/  ,🛳 mints NFTs automatically upon passing the 5th level, no scripts required 🛰

# 🏃‍♀️ Quick Start
Required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) and [Git](https://git-scm.com/downloads)

If you get this error:``` 00h00m00s 0/0: : ERROR: [Errno 2] No such file or directory: 'install'```
when typing yarn install, follow this guide 
=> https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install
```
git clone this file
```
```
cd fish-io-project
yarn install
yarn start
```

> in a second terminal window, start your 📱 frontend:

```
cd fish-io-project
yarn chain
```

> in a third terminal window, 🛰 deploy your contract:

```
cd fish-io-project
yarn deploy --network rinkeby
```

> in a fourth terminal window, ✏️ test your contract:

```
cd fish-io-project
cd packages
cd hardhat
npx hardhat compile
npx hardhat test

```


``` Scaffold-eth notes:
✏️ Edit the mint script mint.js in packages/hardhat/scripts and update the toAddress to your frontend address (wallet address in the top right or localhost:3000).

👀 You should see your collectibles show up if you minted to the correct address:


👛 Open an incognito window and navigate to http://localhost:3000 (You'll notice it has a new wallet address).

⛽️ Grab some gas for each account using the faucet:

🎟 Send an NFT to the incognito window address:


🕵🏻‍♂️ Inspect the `Debug Contracts` tab to figure out what address is the `owner` of `YourCollectible`?

💼 Edit your deployment script `deploy.js` in `packages/hardhat/scripts`

🔏 Edit your smart contract `YourCollectible.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

🔑 Create wallet links to your app with `yarn wallet` and `yarn fundedwallet`

⬇️ Installing a new package to your frontend? You need to `cd packages/react-app` and then `yarn add PACKAGE`

# 📡 Deploy NFT smart contract!

🛰 Ready to deploy to a testnet?
> Change the `defaultNetwork` in `packages/hardhat/hardhat.config.js`


🔐 Generate a deploy account with `yarn generate`


👛 View your deployer address using `yarn account` (You'll need to fund this account. Hint: use an instant wallet to fund your account via QR code)


👨‍🎤 Deploy your NFT smart contract:

Make sure your target network is present in the hardhat networks config, then either update the default network in `hardhat.config.js` to your network of choice or run:

```
yarn deploy --network NETWORK_OF_CHOICE
```
> ✏️ Edit your frontend `App.jsx` in `packages/react-app/src` to change the `targetNetwork` to wherever you deployed your contract:


You should see the correct network in the frontend:





------------


🙏 Please check out Scaffold.Eth's [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!
