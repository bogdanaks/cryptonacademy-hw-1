import { task } from "hardhat/config";
import { parseEther } from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface IArgs {
  contract: string;
  amount: string;
}

task("approve", "Approve amount token")
  .addParam("contract", "Contract address")
  .addParam("amount", "Amount approve ethers")
  .setAction(async (args: IArgs, hre) => {
    const ERC20 = await hre.ethers.getContractAt("ERC20", args.contract);
    const [owner] = await hre.ethers.getSigners();

    const tx = await ERC20.approve(owner.address, parseEther(args.amount));
    await tx.wait();

    console.log(`Successfully approved ${args.amount}`);
  });

export {};
