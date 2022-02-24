import { task } from "hardhat/config";
import { parseEther } from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface IArgs {
  contract: string;
  to: string;
  amount: string;
}

task("transfer", "Transfer amount tokens to recipient")
  .addParam("contract", "Contract address")
  .addParam("to", "Address of the recipient")
  .addParam("amount", "Amount ethers")
  .setAction(async (args: IArgs, hre) => {
    const ERC20 = await hre.ethers.getContractAt("ERC20", args.contract);
    const tx = await ERC20.transfer(args.to, parseEther(args.amount));
    await tx.wait();

    console.log(`Successfully transfer amount: ${args.amount}, to: ${args.to}`);
  });

export {};
