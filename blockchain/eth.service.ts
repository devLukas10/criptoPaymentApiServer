import { ethers } from "ethers";
import {
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
        const erc20 = new ethers.Contract(ETH_USDT_CONTRACT_ADDRESS, ERC_USDT_ABI, provider);
        try {
            const balance = await erc20["balanceOf"](address);
            const decimals = await erc20["decimals"]();
            const tx = ethers.formatUnits(balance, decimals);

            return parseFloat(tx);
        } catch (err) {
            throw err
        }
    }

    async getUSDCBalance (address: string): Promise<any> {
        const erc20 = new ethers.Contract(ETH_USDC_CONTRACT_ADDRESS, ERC_USDT_ABI, provider);
        try {
            const balance = await erc20["balanceOf"](address);
            const decimals = await erc20["decimals"]();
            const tx = ethers.formatUnits(balance, decimals);

            return parseFloat(tx);
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

    async transferETH(privateKey: string, to: string, amount: string): Promise<any> {
        
        try {
            const wallet = new ethers.Wallet(privateKey, provider);

            const signedTx = await wallet.signTransaction({
                to: to,
                value: ethers.parseEther(amount),
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

    
}