# blockchain-developer-bootcamp-final-project
## Decentralized Application to Automatically Interact With NFTs from dApp

May (or partially may not) include the 3 functions below:

# Automate viewing, bidding on (in NFT auctions)/buying, and exchanging NFTs with a single dApp
# Initialization
When the contract runs, a log of all previous viewing, bidding and exchanging is saved, which will be retrieved at the initialization of the contract. All future contract functions using the same NFT will pull the basic (unchanged) information from the log. 

# Viewing Function
User can enter the name of the target NFT they want to interact with into the dApp and get a fully detailed list result returned including name, origin, owner, block, NFT marketplace, and either various NFT exchanges' current and previous prices, or the auction details including bid price, current bid, previous bids etc. 

(A web scraper will pull detailed results from NFT exchanges & the API will connect to user's Metamask account and NFT marketplace)


# Bidding/Buying Function
The user can choose to buy an NFT at the set price, or bid on that NFT in the dApp and then either enter the bid price to a certain amount, use an advanced option which uses conditional logic to automatically set the best price, or manually input conditions to set the bid price. 

(The smart contract will use the results of the "view" request to bid using user's Metamask account and NFT marketplace)


# Advanced feature: Exchanging Function
If two users have each listed a valid NFT for exchange at a set price, user can enter into the dApp the Metamask account (or Alias) of the user that they request to exchange NFTs with, then the contract calculates the amount of difference (in ether) between their NFTs, and then user can choose to exchange NFTs if both agree. 

(Once both users have agreed to the request, the exchange function will instantly make each user account purchase the other's NFT at their set price, and pay them the difference amount provided. If the user tries to change set price after the fact, the contract will fail and the infringing party will be charged the entire gas cost of the contract)

Or, it could act as an escrow (hold both NFTs), until releasing the NFT to the other account at a time set by the contract, or by other conditions. In this case, both users will send their token to a contract account's Metamask, and if one party does not enter their token, the transaction will be canceled, the NFT refunded, and the infringing party will be charged the entire gas cost of the contract.

