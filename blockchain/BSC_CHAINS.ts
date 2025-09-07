import { EVMChains } from "./EVMChains";
import { BlockchainWalletType } from "./types/BlockchainWalletType";
import { BSC_CHAINS_PROVIDERS } from "./types/constants";
import { NetworkTypes } from "./types/NetworkType";



export class BSC_CHAINS {
    private network: NetworkTypes;
    private evm: EVMChains;

    constructor({network}: {network: NetworkTypes}){
        this.network = network;
        const provider = network === 'TESTNET'
        ? BSC_CHAINS_PROVIDERS.BSC_TESTNET_PROVIDERS
        : network === 'DEVNET'
        ? BSC_CHAINS_PROVIDERS.BSC_TESTNET_PROVIDERS
        : BSC_CHAINS_PROVIDERS.BSC_MAINNET_PROVIDERS;

        this.evm = new EVMChains({rpcUrl: provider});
        this.network = network;
    }

    async createWallet(): Promise<BlockchainWalletType> {
        return await this.evm.createWallet();
    }

    async getWalletByPrivateKey(privateKey: string): Promise<string> {
        return await this.evm.checkWallet(privateKey);
    }

    // Métodos genéricos
    async getBNBBalance(address: string): Promise<number> {
        return await this.evm.getBalance(address);
    }

    async getJMPTBalance(address: string): Promise<number> {
        let contract = this.network === 'MAINNET'
        ? BSC_CHAINS_PROVIDERS.BSC_MAINNET_JMPT_CONTRACT_ADDRESS
        : BSC_CHAINS_PROVIDERS.BSC_TESTNET_JMPT_CONTRACT_ADDRESS;
        return await this.evm.getTokenBalance(address, contract);
    }

    async getUSDTBalance(address: string): Promise<number> {
        let contract = this.network === 'MAINNET'
        ? BSC_CHAINS_PROVIDERS.BSC_MAINNET_USDT_CONTRACT_ADDRESS
        : BSC_CHAINS_PROVIDERS.BSC_TESTNET_USDT_CONTRACT_ADDRESS;
        return await this.evm.getTokenBalance(address, contract);
    }

    // Métodos específicos chain conhecido
    async transferBNB(privateKey: string, to: string, amount: number): Promise<any> {
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
            BSC_CHAINS_PROVIDERS.BSC_MAINNET_USDT_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }
    
    async transferJMPT(
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
            BSC_CHAINS_PROVIDERS.BSC_MAINNET_JMPT_CONTRACT_ADDRESS, 
            async (hash: string)=> call(hash), 
            async (tx: any)=> sucess(tx)
        );
    }

    
}