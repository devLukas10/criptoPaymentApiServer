import {
    ETH_EURC_CONTRACT_ADDRESS,
    ETH_PROVIDERS,
    ETH_USDC_CONTRACT_ADDRESS,
    ETH_USDT_CONTRACT_ADDRESS
} from "../src/types/constants";
import { EVMChains } from "./EVMChains";


export class ETHChain {
    
    private EVM = new EVMChains({
        rpcUrl: ETH_PROVIDERS,
        usdcContract: ETH_USDC_CONTRACT_ADDRESS,
        eurcContract: ETH_EURC_CONTRACT_ADDRESS,
        usdtContract: ETH_USDT_CONTRACT_ADDRESS,
    });

    
}