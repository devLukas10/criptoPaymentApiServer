import { ethers } from "ethers";
import {
    ETH_EUR_CONTRACT_ADDRESS,
    ETH_PROVIDERS,
    ETH_USDC_CONTRACT_ADDRESS, 
    ETH_USDT_CONTRACT_ADDRESS
} from "../src/types/constants";
import { BlockchainWalletType } from "../src/types/BlockchainWalletType";
import { EtherFormatWei } from "../src/utils/etherFormatWei";
import { ERC_USDT_ABI } from "./abi/ercUsdtABI";


const provider = new ethers.JsonRpcProvider(ETH_PROVIDERS);


export class ETHService{

    private gasLimit: number = 21000;
    private maxFeePerGas = ethers.parseUnits("30", "gwei");
    private maxPriorityFeePerGas = ethers.parseUnits("2", "gwei");


    private async transferToken(privateKey:string, to: string, amount: number, contract: string): Promise<any>{
        const wallet = new ethers.Wallet(privateKey, provider);
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, wallet);
        const decimals = await erc20["decimals"]();
        const tx = await erc20["transfer"](to, ethers.parseUnits(amount.toString(), decimals));

        return tx;
    }

    private async getTokenBalance (address: string, contract: string): Promise<number> {
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, provider);
        const balance = await erc20["balanceOf"](address);
        const decimals = await erc20["decimals"]();
        const tx = ethers.formatUnits(balance, decimals);

        return parseFloat(tx);
    }

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

    async getUSDTBalance (address: string): Promise<number> {
        try {
            return await this.getTokenBalance(address, ETH_USDT_CONTRACT_ADDRESS);

        } catch (err) {
            throw err
        }
    }

    async getUSDCBalance (address: string): Promise<number> {
        try {
            return await this.getTokenBalance(address, ETH_USDC_CONTRACT_ADDRESS);

        } catch (err) {
            throw err
        }
    }

    async getEURCBalance (address: string): Promise<number> {
        try {
            return await this.getTokenBalance(address, ETH_EUR_CONTRACT_ADDRESS);

        } catch (err) {
            throw err
        }
    }

    async getETHTransactioByHash(hash: string): Promise<any> {
        try{
            const tx = await provider.getTransactionReceipt(hash);

            return tx;
        } catch (err) {
            throw err
        }
    }

    async transferETH(privateKey: string, to: string, amount: number): Promise<any> {
        
        try {
            const wallet = new ethers.Wallet(privateKey, provider);

            const signedTx = await wallet.signTransaction({
                to: to,
                value: ethers.parseEther(amount.toString()),
                gasLimit: this.gasLimit,
                maxFeePerGas: this.maxFeePerGas,
                maxPriorityFeePerGas: this.maxPriorityFeePerGas,
                nonce: await provider.getTransactionCount(wallet.address),
                chainId: (await provider.getNetwork()).chainId,
                type: 2, // EIP-1559
            })

            const tx = await provider.broadcastTransaction(signedTx);
            return tx
        } catch (err) {
            throw err
        }
    }

    async transferUSDC(privateKey:string, to: string, amount: number, call: (tx: any)=>{}, sucess: (tx: any)=>{}): Promise<any> {        
        try{
            const tx = await this.transferToken(privateKey, to, amount, ETH_USDC_CONTRACT_ADDRESS);
            call(tx.hash);

            await tx.wait();
            sucess(tx);
        } catch (err) {
            throw err
        }
    }

    async transferEURC(privateKey:string, to: string, amount: number, call: (tx: any)=>{}, sucess: (tx: any)=>{}): Promise<any> {        
        try{
            const tx = await this.transferToken(privateKey, to, amount, ETH_EUR_CONTRACT_ADDRESS);
            call(tx.hash);

            await tx.wait();
            sucess(tx);
        } catch (err) {
            throw err
        }
    }

    async transferUSDT(privateKey:string, to: string, amount: number, call: (tx: any)=>{}, sucess: (tx: any)=>{}): Promise<any> {        
        try{
            const tx = await this.transferToken(privateKey, to, amount, ETH_USDT_CONTRACT_ADDRESS);
            call(tx.hash);

            await tx.wait();
            sucess(tx);
        } catch (err) {
            throw err
        }
    }


    
}