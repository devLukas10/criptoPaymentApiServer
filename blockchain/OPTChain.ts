import { EVMChains } from "./EVMChains";
import { BlockchainWalletType } from "./types/BlockchainWalletType";
import { OPT_PROVIDERS, OPT_USDC_CONTRACT_ADDRESS } from "./types/constants";


export class OPTChain {
    private evm = new EVMChains({rpcUrl: OPT_PROVIDERS});

    async createWallet(): Promise<BlockchainWalletType> {
        return await this.evm.createWallet();
    }

    async testWallet(privateKey: string): Promise<any> {
        return await this.evm.testWallet(privateKey);
    }

    async getOPTBalance(address: string): Promise<number> {
        return await this.evm.getBalance(address);
    }

    async getUSDCBalance(address: string): Promise<number> {
        return await this.evm.getTokenBalance(address, OPT_USDC_CONTRACT_ADDRESS);
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
            OPT_USDC_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }
}