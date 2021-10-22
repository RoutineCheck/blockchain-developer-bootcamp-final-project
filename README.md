# blockchain-developer-bootcamp-final-project
# Decentralized Application to Automatically Interact With NFTs from a Contract

May (or partially may not) include the 3 functions below:

## Automate viewing, bidding on (in NFT auctions)/buying, and exchanging NFTs in a smart contract

# Initialization
When the contract runs, a log of all previous viewing, bidding and exchanging is recorded, which will be retrieved at the initialization of the contract. All future contract functions using the same NFT will pull the basic (unchanged) information from the log. 

constructor(struct initInfo) public {}

Public Variables:

address public owner;
uint256 public userCount;
struct initInformation;
mapping(uint => User) userId;
mapping(uint => User) bidId;
mapping(uint => address) exchangeId;


# Registration
User will "login": enter their preferences, their Metamask account name, and other basic information into the contract.

function registration(string uname, string pword, string email, struct metaLogin, uint256 userCount, address userId) {}

# Viewing Function
User can enter the name of the target NFT they want to interact with into the contract and get a fully detailed list result returned including name, origin, owner, block, NFT marketplace, and the NFT exchanges' current and previous prices OR the auction details including bid price, current bid, previous bids etc. 

(A web scraper will pull detailed results from NFT exchanges, and the contract will connect to user's Metamask account and NFT marketplace)



function viewNFT(string name, string origin, address nftOwner, uint nftBlock, string nftMarket, uint currentPrice, uint previousPrice, uint bidCost, uint currentBid, uint previousBid, struct initInfo, uint userId) public view {}


# Bidding/Buying Function
The user can choose to buy the NFT at the set price, or bid on that NFT in the contract and then either enter the bid price to a certain amount, let the contract automatically set the best price, or manually input conditions to set the bid price. 

(The smart contract will use the results of the "view" request to bid using user's Metamask account and NFT marketplace)


function bidNFT(bool toBuy, state bidState, uint userId) 
public 
payable 
returns (uint bidId) {}




# Advanced feature: Exchanging Function
If two contract users have each listed a valid NFT for exchange at a set price, user can enter the Metamask account (or Alias) of the user that they request to exchange NFTs with into the contract, then the contract calculates the amount of difference (in ether) between their NFTs, and then user can choose to exchange NFTs if both agree. 

(Once both users have agreed to the request, the exchange function will instantly make each user account purchase the other's NFT at their set price, and pay them the difference amount provided. If the user tries to change set price after the fact, the contract will fail and the infringing party will be charged the entire gas cost of the contract)

function exchangeNFT(bool toExchange, state exchangeState, uint userId, address nftOwners, struct nftsToTrade) public returns (bool exchangeConfirmation) {}

Additional function: the smart contract could act as an escrow (hold both NFTs), until releasing the NFT to the other account at a time set by the contract, or by other conditions. In this case, both users will send their token to a contract account's Metamask. If one party does not enter their token before the contract is initialized, the transaction will be canceled, the NFT refunded, and the infringing party will be charged the entire gas cost of the contract.

