import { expect } from "chai";
import { parseEther, formatEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import Big from "bignumber.js";

describe("ERC20", function () {
  it("Owner contract is equals who deployed contract", async function () {
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    await erc20.deployed();
    const [owner] = await ethers.getSigners();
    const contractOwner = await erc20.owner();

    expect(contractOwner).to.equal(owner.address);
  });

  it("Transfer token to another address", async function () {
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    await erc20.deployed();
    const [, addr1] = await ethers.getSigners();

    await erc20.transfer(addr1.address, parseEther("100"));

    const balanceAddr1 = await erc20.balanceOf(addr1.address);

    expect(balanceAddr1).to.equal(parseEther("100"));
  });

  it("Approve amount token", async function () {
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    await erc20.deployed();
    const [owner, addr1] = await ethers.getSigners();

    await erc20.approve(addr1.address, parseEther("100"));

    const allowanceAmount = await erc20.allowance(owner.address, addr1.address);

    expect(allowanceAmount).to.equal(parseEther("100"));
  });

  it("Transfer amount tokens to some address", async function () {
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    await erc20.deployed();
    const [owner, addr1] = await ethers.getSigners();

    await erc20.approve(owner.address, parseEther("100"));
    await erc20.transferFrom(owner.address, addr1.address, parseEther("100"));

    const balanceAnotherAddress = await erc20.balanceOf(addr1.address);

    expect(balanceAnotherAddress).to.equal(parseEther("100"));

    const allowaceAfter = await erc20.allowance(owner.address, owner.address);

    expect(allowaceAfter.toNumber()).to.equal(0);
  });

  it("Increase allowance sender on amount", async function () {
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    await erc20.deployed();
    const [owner] = await ethers.getSigners();

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
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    await erc20.deployed();
    const [owner] = await ethers.getSigners();

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
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    await erc20.deployed();
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
    const ERC20 = await ethers.getContractFactory("ERC20");
    const erc20 = await ERC20.deploy();
    await erc20.deployed();
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
