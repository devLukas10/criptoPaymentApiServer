import { EVMChains } from "./EVMChains";
import { BlockchainWalletType } from "./types/BlockchainWalletType";
import {
    ARB_PROVIDERS,
    ARB_USDC_CONTRACT_ADDRESS,
    ARB_USDT_CONTRACT_ADDRESS
} from "./types/constants";


export class ARBChain {

    private evm = new EVMChains({rpcUrl: ARB_PROVIDERS});

    async createWallet(): Promise<BlockchainWalletType> {
        return await this.evm.createWallet();
    }

    async checkWallet(privateKey: string): Promise<any> {
        return await this.evm.checkWallet(privateKey);
    }

    // Métodos genéricos
    async getETHBalance(address: string): Promise<number> {
        return await this.evm.getBalance(address);
    }

    async getUSDTBalance(address: string): Promise<number> {
        return await this.evm.getTokenBalance(address, ARB_USDT_CONTRACT_ADDRESS);
    }

    async getUSDCBalance(address: string): Promise<number> {
        return await this.evm.getTokenBalance(address, ARB_USDC_CONTRACT_ADDRESS);
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
            ARB_USDT_CONTRACT_ADDRESS, 
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
            ARB_USDC_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }
}