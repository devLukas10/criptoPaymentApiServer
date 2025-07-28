import { EVMChains } from "./EVMChains";
import { BlockchainWalletType } from "./types/BlockchainWalletType";
import {
    POL_PROVIDERS,
    POL_USDC_CONTRACT_ADDRESS,
    POL_USDT_CONTRACT_ADDRESS
} from "./types/constants";

export class POLChain {
    private evm =  new EVMChains({rpcUrl: POL_PROVIDERS});

    async createWallet(): Promise<BlockchainWalletType> {
        return await this.evm.createWallet();
    }

    async testWallet(privateKey: string): Promise<any> {
        return await this.evm.testWallet(privateKey);
    }

    // Métodos genéricos
    async getPOLBalance(address: string): Promise<number> {
        return await this.evm.getBalance(address);
    }

    /*

    async getUSDTBalance(address: string): Promise<number> {
        return await this.evm.getTokenBalance(address, POL_USDT_CONTRACT_ADDRESS);
    }

    async getUSDCBalance(address: string): Promise<number> {
        return await this.evm.getTokenBalance(address, POL_USDC_CONTRACT_ADDRESS);
    }
    */

    async getTransactionbByHash(hash: string): Promise<any> {
        return await this.evm.getTransactionByHash(hash);
    }

    // Métodos específicos chain conhecido
    async transferPOL(privateKey: string, to: string, amount: number): Promise<any> {
        return await this.evm.signTransfer(privateKey, to, amount);
    }

    // Métodos específicos para contratos conhecidos
    /*
    async transferUSDT(
        privateKey: string,
        to: string,
        amount: number,
        call: (hash: string) => void,
        sucess: (tx: any) => void
    ): Promise<any> {
        return await this.evm.transferToken(
            privateKey,
            to,
            amount, 
            POL_USDT_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }

    async transferUSDC(
        privateKey: string,
        to: string,
        amount: number,
        call: (hash: string) => void,
        sucess: (tx: any) => void
    ): Promise<any> {
        return await this.evm.transferToken(
            privateKey,
            to,
            amount, 
            POL_USDC_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }
    */

}