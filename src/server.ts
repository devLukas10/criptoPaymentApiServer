import { ERC_USDT_ABI } from "../blockchain/abi/ercUsdtABI";
import { OPTChain } from "../blockchain/OPTChain";
import { OPT_PROVIDERS, OPT_USDC_CONTRACT_ADDRESS } from "../blockchain/types/constants";

const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(OPT_PROVIDERS);
const usdcAddress = OPT_USDC_CONTRACT_ADDRESS;
const address = "0x2B0dDbD414f350Dc4D43B2B92325582457aa0F59";

const opt = new OPTChain();

const usdc = new ethers.Contract(usdcAddress, ERC_USDT_ABI, provider);

async function showBalance() {
  
    console.log(await opt.getOPTBalance(address))

}

showBalance();
