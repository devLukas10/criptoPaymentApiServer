import { BlockchainWalletType } from "./types/BlockchainWalletType";
import {
    ETH_EURC_CONTRACT_ADDRESS,
    ETH_PROVIDERS,
    ETH_USDC_CONTRACT_ADDRESS,
    ETH_USDT_CONTRACT_ADDRESS
} from "./types/constants";
import { EVMChains } from "./EVMChains";


export class ETHChain {
    
    private evm = new EVMChains({ rpcUrl: ETH_PROVIDERS });

    async createWallet(): Promise<BlockchainWalletType> {
        return await this.evm.createWallet();
    }

    // Métodos genéricos
    async getETHBalance(address: string): Promise<number> {
        return await this.evm.getBalance(address);
    }

    async getUSDTBalance(address: string): Promise<number> {
        return await this.evm.getTokenBalance(address, ETH_USDT_CONTRACT_ADDRESS);
    }

    async getUSDCBalance(address: string): Promise<number> {
        return await this.evm.getTokenBalance(address, ETH_USDC_CONTRACT_ADDRESS);
    }

    async getEURCBalance(address: string): Promise<number> {
        return await this.evm.getTokenBalance(address, ETH_EURC_CONTRACT_ADDRESS);
    }

    async getTransactionbByHash(hash: string): Promise<any> {
        return await this.evm.getTransactionByHash(hash);
    }

    // Métodos específicos chain conhecido
    async transferETH(privateKey: string, to: string, amount: number): Promise<any> {
        return await this.evm.signTransfer(privateKey, to, amount);
    }

    // Métodos específicos para contratos conhecidos
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
            ETH_USDT_CONTRACT_ADDRESS, 
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
            ETH_USDC_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }

    async transferEURC(
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
            ETH_EURC_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }

}