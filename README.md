# π Scaffold-ETH - π Fish.IO Project - Paul Kasaija - Ethereum Address: 0xd58CEC75CAF882E3F904215a1c716E4C7d9Aa578

> Build, mint, and send around your own ERC721 (using Scaffold-Eth simple-nft-project as template)

π± Open http://localhost:3000 to see the NFTs in your account, which contains an iframe to play the game, OR the (in-development) app itselfπ³, 
# https://fishio-app.herokuapp.com/  

π³ The NFT display in-app is still in progress, but it is fully visible on rinkeby.etherscan.io/0xd24bF2b41EBa0c5caDe0F02484a33B54432b91FF and on localhost:3000/transfers
# π Scaffold-ETH - π Fish.IO Project - Paul Kasaija - Ethereum Address: 0xd58CEC75CAF882E3F904215a1c716E4C7d9Aa578

> The main game π³, https://fishio-app.herokuapp.com/  ,π³ mints NFTs automatically upon passing the 5th level, no scripts required π°


# πββοΈ Quick Start - ONLY FOR TESTING - Deploys contract to localHost rather than Rinkeby to ensure quick and efficient testing
Required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) and [Git](https://git-scm.com/downloads)

If you get this error: ```00h00m00s 0/0: : ERROR: [Errno 2] No such file or directory: 'install'```
when typing ```yarn install```, follow this guide 
=> https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install
```
git clone this file
```
```
cd fish-io-project
yarn install
yarn start
```

> in a second terminal window, start your π± frontend:

```
cd fish-io-project
yarn chain
```

> in a third terminal window, π° deploy your contract:

```
cd fish-io-project
yarn deploy
```

> in a fourth terminal window, βοΈ test your contract:

```
cd fish-io-project
cd packages
cd hardhat
npx hardhat compile
npx hardhat test

```

# The following IPFS uris indexed by type can be used in minting your NFTs on the scaffold-eth test platform (paste them in the "tokenType" and "tokenURI" parameter within the mintItem() function):

Type: GreyFish      URI: bafybeihjuqzykuyg7ng3z7vjqq7ceuctfhiau56o6dgs6kh2kxsjk2pys4/metadata.json
Type: BlueFish      URI: bafybeieoa6bluhe5jklqmp6ksbc6brsekalhnutgtkdyt57qqj6avxypci/metadata.json 
Type: OrangeFish    URI: bafybeicqqoyaogoojhjyw3ifzvmvfhehzyrvzltqvfna4fufg26l3owdiu/metadata.json

# Scaffold-eth notes:
```
βοΈ Edit the mint script mint.js in packages/hardhat/scripts and update the toAddress to your frontend address (wallet address in the top right or localhost:3000).

π You should see your collectibles show up if you minted to the correct address:


π Open an incognito window and navigate to http://localhost:3000 (You'll notice it has a new wallet address).

β½οΈ Grab some gas for each account using the faucet:

π Send an NFT to the incognito window address:


π΅π»ββοΈ Inspect the `Debug Contracts` tab to figure out what address is the `owner` of `YourCollectible`?

πΌ Edit your deployment script `deploy.js` in `packages/hardhat/scripts`

π Edit your smart contract `YourCollectible.sol` in `packages/hardhat/contracts`

π Edit your frontend `App.jsx` in `packages/react-app/src`

π Create wallet links to your app with `yarn wallet` and `yarn fundedwallet`

β¬οΈ Installing a new package to your frontend? You need to `cd packages/react-app` and then `yarn add PACKAGE`

# π‘ Deploy NFT smart contract!

π° Ready to deploy to a testnet?
> Change the `defaultNetwork` in `packages/hardhat/hardhat.config.js`


π Generate a deploy account with `yarn generate`


π View your deployer address using `yarn account` (You'll need to fund this account. Hint: use an instant wallet to fund your account via QR code)


π¨βπ€ Deploy your NFT smart contract:

Make sure your target network is present in the hardhat networks config, then either update the default network in `hardhat.config.js` to your network of choice or run:

```
yarn deploy --network NETWORK_OF_CHOICE
```
> βοΈ Edit your frontend `App.jsx` in `packages/react-app/src` to change the `targetNetwork` to wherever you deployed your contract:


You should see the correct network in the frontend:





------------


π Please check out Scaffold.Eth's [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!
