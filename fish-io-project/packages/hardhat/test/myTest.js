const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("Token contract", function () {


  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;


  beforeEach(async function () {

    Token = await ethers.getContractFactory("YourCollectible");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();


    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {


    it("Should set the right owner", async function () {


      expect(await hardhatToken.owner()).to.equal(owner.address);

    });

    it("Should should initialize the correct token symbol.", async function () {

      expect(await hardhatToken.symbol()).to.equal('FSH');

    });
    it("Should should initialize the correct token name.", async function () {

      expect(await hardhatToken.name()).to.equal("Fish.io NFT");

    });



  });

  describe("Mint", function () {

    it("Should mint a token", async function () {
      expect(await hardhatToken.mintItem(addr1.address, 'bafybeieoa6bluhe5jklqmp6ksbc6brsekalhnutgtkdyt57qqj6avxypci/metadata.json', 'nftName', 'nftType')).to.emit(
        hardhatToken,
        "Transfer")
    });

  });

  describe("Token", function () {
    it("Should revert if the tokenId is not owned.", async function () {


      await expect(
        hardhatToken.ownerOf(5000)).to.be.revertedWith("ERC721: owner query for nonexistent token");
    });



  });

});
