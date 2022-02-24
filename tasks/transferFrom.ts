import { task } from "hardhat/config";
import { parseEther } from "ethers/lib/utils";

import "@nomiclabs/hardhat-ethers";

interface IArgs {
  contract: string;
  from: string;
  to: string;
  amount: string;
}

task("transferFrom", "Transfer amount tokens from sender to recipient")
  .addParam("contract", "Contract address")
  .addParam("from", "Address of the sender")
  .addParam("to", "Address of the recipient")
  .addParam("amount", "Amount ethers")
  .setAction(async (args: IArgs, hre) => {
    const ERC20 = await hre.ethers.getContractAt("ERC20", args.contract);
    const tx = await ERC20.transferFrom(
      args.from,
      args.to,
      parseEther(args.amount)
    );
    await tx.wait();

    console.log(
      `Successfully transferFrom amount: ${args.amount}, from: ${args.from}, to: ${args.to}`
    );
  });

export {};
