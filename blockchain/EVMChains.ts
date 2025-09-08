import { ethers, TransactionReceipt, TransactionResponseParams } from "ethers";
import { BlockchainWalletType } from "./types/BlockchainWalletType";
import { ERC_USDT_ABI } from "./abi/ercUsdtABI";


export class EVMChains {
    private provider: ethers.JsonRpcProvider;
    
    constructor({rpcUrl}:{rpcUrl: string}){
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
    }

    private formatWei = (wei: any, ethers: any): number => {
        let value = ethers.formatEther(wei);
        return parseFloat(value);
    }

    async getTokenBalance(address: string, contract: string): Promise<number> {
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, this.provider);
        const balance = await erc20["balanceOf"](address);
        const decimals = await erc20["decimals"]();
        return parseFloat(ethers.formatUnits(balance, decimals));
    }
  
    
    // Carteira e ETH
    async createWallet(): Promise<BlockchainWalletType> {
        const account = ethers.Wallet.createRandom(this.provider);
        console.log('✅ Carteira gerada');
        return {
            address: account.address,
            privateKey: account.privateKey,
            phrase: account.mnemonic?.phrase,
            password: account.mnemonic?.password
        };
    }

    async checkWallet(privateKey: string): Promise<any> {
        return new ethers.Wallet(privateKey, this.provider);
    }

    // Métodos genéricos
    async getBalance(address: string): Promise<number> {
        const wei = await this.provider.getBalance(address);
        return this.formatWei(wei, ethers);
    }

    async signTransfer(privateKey: string, to: string, amount: number): Promise<TransactionResponseParams> {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const network = await this.provider.getNetwork();
    
        const gasLimit = await this.provider.estimateGas({
            to,
            from: wallet.address,
            value: ethers.parseEther(amount.toString()),
        });
    
        const feeData = await this.provider.getFeeData();
        const nonce = await this.provider.getTransactionCount(wallet.address);
    
        let tx: any;
    
        if (network.chainId === 56n || network.chainId === 97n) {
            tx = {
                to,
                value: ethers.parseEther(amount.toString()),
                gasLimit,
                gasPrice: feeData.gasPrice ?? 5_000_000_000n,
                nonce,
                chainId: Number(network.chainId),
                type: 0, 
            };
        } else {
            tx = {
                to,
                value: ethers.parseEther(amount.toString()),
                gasLimit,
                maxFeePerGas: feeData.maxFeePerGas ?? (feeData.gasPrice ?? 30_000_000_000n),
                maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ?? 1_500_000_000n,
                nonce,
                chainId: Number(network.chainId),
                type: 2, // EIP-1559
            };
        }
    
        // Assinar e enviar
        const signedTx = await wallet.signTransaction(tx);
        return await this.provider.broadcastTransaction(signedTx);
    }
    
    

    async getTransactionByHash(hash: string): Promise<TransactionReceipt> {
        return await this.provider.getTransactionReceipt(hash) as TransactionReceipt;
    }

    async transferToken(
        privateKey: string,
        to: string,
        amount: number,
        contract: string,
    ): Promise<TransactionResponseParams> {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, wallet);
        const decimals = await erc20["decimals"]();
        const tx = await erc20["transfer"](to, ethers.parseUnits(amount.toString(), decimals));
        tx.wait();
        return tx;
    }
}

