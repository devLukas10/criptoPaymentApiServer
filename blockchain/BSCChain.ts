import { EVMChains } from "./EVMChains";
import { BlockchainWalletType } from "./types/BlockchainWalletType";
import { BSC_PROVIDERS } from "./types/constants";


export class BSCChain {
    private evm =  new EVMChains({rpcUrl: BSC_PROVIDERS});

    async createWallet(): Promise<BlockchainWalletType> {
        return await this.evm.createWallet();
    }

    async checkWallet(privateKey: string): Promise<any> {
        return await this.evm.checkWallet(privateKey);
    }

    // Métodos genéricos
    async getBSCBalance(address: string): Promise<number> {
        return await this.evm.getBalance(address);
    }
}