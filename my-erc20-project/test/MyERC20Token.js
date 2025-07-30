const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyERC20Token", function () {
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MyERC20Token");
    token = await Token.deploy("DataCoin", "DTC", 1000000, owner.address);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      await token.mint(addr1.address, 1000);
      expect(await token.balanceOf(addr1.address)).to.equal(1000);
    });

    it("Should not allow non-owner to mint tokens", async function () {
      await expect(
        token.connect(addr1).mint(addr2.address, 1000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Burning", function () {
    it("Should allow owner to burn any account's tokens", async function () {
      await token.transfer(addr1.address, 1000);
      await token.burnFrom(addr1.address, 500);
      expect(await token.balanceOf(addr1.address)).to.equal(500);
    });
  });

  describe("Reverse Transfer", function () {
    it("Should allow owner to reverse transactions", async function () {
      await token.transfer(addr1.address, 1000);

      const txHash = ethers.keccak256(ethers.toUtf8Bytes("test-tx"));
      await token.reverseTransfer(txHash, owner.address, addr1.address, 500);

      expect(await token.balanceOf(addr1.address)).to.equal(500);
      expect(await token.isTransactionReversed(txHash)).to.be.true;
    });
  });
});
