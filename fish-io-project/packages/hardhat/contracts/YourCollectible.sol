pragma solidity >=0.6.0 <0.7.0;
//SPDX-License-Identifier: MIT

//import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//learn more: https://docs.openzeppelin.com/contracts/3.x/erc721

/// @title A backend NFT platform & user database for the Fish.io DApp
/// @author Paul J. Kasaija
/// @notice You can use this contract to mint NFTs, and set/get user data in the Fish.io DApp
/// @dev All function calls are currently implemented without side effects & cost effectively avoids structs to save gas




contract YourCollectible is ERC721, Ownable {


    //@dev: A counter for the number of tokens currently minted
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  
    //@dev: event TokenMinted logs the details of each NFT created
    event TokenMinted(address indexed _user, uint256 _tokenId, string _tokenName, string _tokenType);
    //@dev: max tokens to be minted
    uint256 private maxTokens;
    //@dev: max tokens allowed per user
    uint256 public allowedTokens = 5;



    //@dev: Arrays storing each NFT name & type
    string[] public tokenTypeArray;
    string[] public tokenNameArray;


//@dev: determines whether the number of tokens is below the value of maxTokens
    modifier tokenAvailable {
    require(totalSupply() < maxTokens);
    _;
    }


  //@dev: determines whether the number of tokens owned by user is allowed
    modifier userTokenLimit {
      
        require(balanceOf(msg.sender) < allowedTokens);
        _;
    }
  //@dev: constructor initializes the values of the token supply, name, and symbol

  constructor() public ERC721("Fish.io NFT", "FSH") {
  
    maxTokens = 5000;
    _setBaseURI("https://ipfs.io/ipfs/");
  }
  /// @dev This function creates an NFT, records its details in arrays & mappings, and returns the number of the tokenId.
  function mintItem(address to, string memory tokenURI, string memory _tokenName,
  string memory _tokenType)
      public tokenAvailable userTokenLimit
      returns (uint256)
  {
  
      _tokenIds.increment();

      uint256 id = _tokenIds.current();
      _mint(to, id);
      _setTokenURI(id, tokenURI);
      
      
    tokenNameArray.push(_tokenName);
    tokenTypeArray.push(_tokenType);

      return id;
  }
  
  
    /// @dev This function returns all the details of the NFT of the specified tokenId.
  function getNFTDetails(uint256 tokenId) external view returns (string memory, string memory){
    return(tokenNameArray[tokenId - 1], tokenTypeArray[tokenId - 1]);
  }
}



