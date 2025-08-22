import { EVMChains } from "./EVMChains";
import { BlockchainWalletType } from "./types/BlockchainWalletType";
import {
    OPTIMISM_PROVIDERS,
    OPTIMISM_USDC_CONTRACT_ADDRESS,
    ARB_USDT_CONTRACT_ADDRESS
} from "./types/constants";


export class OPTChains {

    private evm = new EVMChains({rpcUrl: OPTIMISM_PROVIDERS});

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
        return await this.evm.getTokenBalance(address, OPTIMISM_USDC_CONTRACT_ADDRESS);
    }

    // Métodos específicos chain conhecido
    async transferETH(privateKey: string, to: string, amount: number): Promise<any> {
        return await this.evm.signTransfer(privateKey, to, amount);
    }

    // Métodos específicos para contratos conhecidos
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
            OPTIMISM_USDC_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }
}