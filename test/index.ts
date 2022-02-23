import { expect } from "chai";
import { parseEther, formatEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import Big from "bignumber.js";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ERC20, ERC20__factory } from "../typechain";

describe("ERC20", function () {
  let ERC20: ERC20__factory;
  let erc20: ERC20;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    ERC20 = await ethers.getContractFactory("ERC20");
    [owner, addr1] = await ethers.getSigners();

    erc20 = await ERC20.deploy();
  });

  describe("Test functions", function () {
    it("Owner contract is equals who deployed contract", async function () {
      const contractOwner = await erc20.owner();
      expect(contractOwner).to.equal(owner.address);
    });

    it("Amount must be greater than zero test", async function () {
      const errorMessage = "Amount must be greater than 0";

      await expect(erc20.transfer(addr1.address, 0)).to.be.revertedWith(
        errorMessage
      );

      await expect(
        erc20.transferFrom(owner.address, addr1.address, 0)
      ).to.be.revertedWith(errorMessage);

      await expect(erc20.approve(addr1.address, 0)).to.be.revertedWith(
        errorMessage
      );

      await expect(
        erc20.increaseAllowance(owner.address, 0)
      ).to.be.revertedWith(errorMessage);

      await expect(
        erc20.decreaseAllowance(owner.address, 0)
      ).to.be.revertedWith(errorMessage);

      await expect(erc20.mint(0)).to.be.revertedWith(errorMessage);
      await expect(erc20.burn(0)).to.be.revertedWith(errorMessage);
    });

    it("Transfer amount exceeds allowance error", async function () {
      const errorMessage = "Transfer amount exceeds allowance";

      await expect(
        erc20.transferFrom(owner.address, addr1.address, 1)
      ).to.be.revertedWith(errorMessage);
    });

    it("Total allowance must be greater than 0 error", async function () {
      const errorMessage = "Total allowance must be greater than 0";

      await erc20.approve(owner.address, parseEther("10"));

      await expect(
        erc20.decreaseAllowance(owner.address, parseEther("20"))
      ).to.be.revertedWith(errorMessage);
    });

    it("Burn amount exceeds balance error", async function () {
      const errorMessage = "Burn amount exceeds balance";

      await expect(erc20.burn(parseEther("1000001"))).to.be.revertedWith(
        errorMessage
      );
    });

    it("Total allowance must be greater than 0 error", async function () {
      const errorMessage = "Total allowance must be greater than 0";

      await erc20.approve(owner.address, parseEther("10"));

      await expect(
        erc20.decreaseAllowance(owner.address, parseEther("20"))
      ).to.be.revertedWith(errorMessage);
    });

    it("Caller is not the owner error", async function () {
      const errorMessage = "Caller is not the owner";

      const anotherAddressConnect = await erc20.connect(addr1);

      await expect(
        anotherAddressConnect.burn(parseEther("10"))
      ).to.be.revertedWith(errorMessage);
    });

    it("Transfer token to another address", async function () {
      await erc20.transfer(addr1.address, parseEther("100"));

      const balanceAddr1 = await erc20.balanceOf(addr1.address);

      expect(balanceAddr1).to.equal(parseEther("100"));
    });

    it("Approve amount token", async function () {
      await erc20.approve(addr1.address, parseEther("100"));

      const allowanceAmount = await erc20.allowance(
        owner.address,
        addr1.address
      );

      expect(allowanceAmount).to.equal(parseEther("100"));
    });

    it("Transfer amount tokens to some address", async function () {
      await erc20.approve(owner.address, parseEther("100"));
      await erc20.transferFrom(owner.address, addr1.address, parseEther("100"));

      const balanceAnotherAddress = await erc20.balanceOf(addr1.address);

      expect(balanceAnotherAddress).to.equal(parseEther("100"));

      const allowaceAfter = await erc20.allowance(owner.address, owner.address);

      expect(allowaceAfter.toNumber()).to.equal(0);
    });

    it("Increase allowance sender on amount", async function () {
      expect(await erc20.allowance(owner.address, owner.address)).to.equal(
        parseEther("0")
      );

      await erc20.approve(owner.address, parseEther("100"));

      expect(await erc20.allowance(owner.address, owner.address)).to.equal(
        parseEther("100.0")
      );

      await erc20.increaseAllowance(owner.address, parseEther("100"));

      expect(await erc20.allowance(owner.address, owner.address)).to.equal(
        parseEther("200.0")
      );
    });

    it("Decrease allowance sender on amount", async function () {
      expect(await erc20.allowance(owner.address, owner.address)).to.equal(
        parseEther("0")
      );

      await erc20.approve(owner.address, parseEther("100"));

      expect(await erc20.allowance(owner.address, owner.address)).to.equal(
        parseEther("100.0")
      );

      await erc20.decreaseAllowance(owner.address, parseEther("50"));

      expect(await erc20.allowance(owner.address, owner.address)).to.equal(
        parseEther("50")
      );
    });

    it("Mint token on amount", async function () {
      const totalAmountSupply = await erc20.totalSupply();
      const mintAmount = "100";

      await erc20.mint(parseEther("100"));

      expect(await erc20.totalSupply()).to.equal(
        parseEther(
          new Big(formatEther(totalAmountSupply)).plus(mintAmount).toString()
        )
      );
    });

    it("Burn token on amount", async function () {
      const totalAmountSupply = await erc20.totalSupply();
      const burnAmount = "100";

      await erc20.burn(parseEther("100"));

      expect(await erc20.totalSupply()).to.equal(
        parseEther(
          new Big(formatEther(totalAmountSupply)).minus(burnAmount).toString()
        )
      );
    });
  });
});
