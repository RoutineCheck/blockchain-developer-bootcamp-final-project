pragma solidity 0.4.22;

/// @title A LMS game with in-game NFTs
/// @author Paul Kasaija
/// @notice You can use this contract to get 
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.

import "./ownable.sol";
import "./safemath.sol";  

contract FishPool is Ownable {

  using SafeMath for uint256;
  using SafeMath32 for uint32;
  using SafeMath16 for uint16;

  event setFish(uint newValue);
  event getFish(uint newValue);


  
  address[5] private fishAddresses;
  string returnedFishName;
  string returnedFishType;

  uint256 fishID;
  string  fishType;

  string [] public typeofFish;
  uint8 numFishOwned;
  
  

  Fish[] public fish;

  mapping (uint => address) public fishToOwner;


      function addFishNFT(address _fish) external {
          require(numFishOwned < 5, "The number of fish owned is limited to 5.");
          fishAddresses[numFishOwned] = _fish;
          numFishOwned++;
      }
        function getFishDetails(string setName, string setType) public {
          require()
    emit setEvent(x);
  }



}
}
