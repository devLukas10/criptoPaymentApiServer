import { ethers } from "ethers";
import { ETH_PROVIDERS } from "../src/types/constants";


const provider = new ethers.JsonRpcProvider(ETH_PROVIDERS.testnet);


export class ETHService{

    async createWallet(): Promise<any> {
        try{
            const account = ethers.Wallet.createRandom(provider);
            console.log(account)
        } catch (err) {
            console.log(err)
        }
        
    }
}