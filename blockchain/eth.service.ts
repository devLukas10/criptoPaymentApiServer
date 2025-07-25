import { ethers } from "ethers";
import { ETH_PROVIDERS } from "../src/types/constants";
import { BlockchainWalletType } from "../src/types/BlockchainWalletType";
import { EtherFormatWei } from "../src/utils/etherFormatWei";


const provider = new ethers.JsonRpcProvider(ETH_PROVIDERS.testnet);


export class ETHService{

    async createWallet(): Promise<BlockchainWalletType> {
        try{
            const account = ethers.Wallet.createRandom(provider);
            
            const wallet: BlockchainWalletType = {
                address: account.address,
                privateKey: account.privateKey,
                phrase: account.mnemonic?.phrase,
                password: account.mnemonic?.password,
            };

            return wallet;
        } catch (err) {
            throw err
        }
    }

    async getETHBalance(address: string): Promise<number> {
        try{
            const wei = await provider.getBalance(address);
            return EtherFormatWei(wei, ethers);
        } catch (err) {
            throw err
        }
    }
}