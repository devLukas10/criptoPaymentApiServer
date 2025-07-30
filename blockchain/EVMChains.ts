import { ethers } from "ethers";
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
            password: account.mnemonic?.password,
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

    async signTransfer(privateKey: string, to: string, amount: number): Promise<any> {
        const wallet = new ethers.Wallet(privateKey, this.provider);

        const gasLimit = await this.provider.estimateGas({
            to,
            from: wallet.address,
            value: ethers.parseEther(amount.toString()),
        });
          
        const feeData = await this.provider.getFeeData();
        const signedTx = await wallet.signTransaction({
            to,
            value: ethers.parseEther(amount.toString()),
            gasLimit: gasLimit,
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
            nonce: await this.provider.getTransactionCount(wallet.address),
            chainId: (await this.provider.getNetwork()).chainId,
            type: 2,
        });
        return await this.provider.broadcastTransaction(signedTx);
    }

    async getTransactionByHash(hash: string): Promise<any> {
        return await this.provider.getTransactionReceipt(hash);
    }

    async transferToken(
        privateKey: string,
        to: string,
        amount: number,
        contract: string,
        call?: (hash: string)=> {},
        sucess?: (tx: any)=> {}
    ): Promise<any> {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, wallet);
        const decimals = await erc20["decimals"]();
        const tx = await erc20["transfer"](to, ethers.parseUnits(amount.toString(), decimals));

        call?.(tx.hash);
        tx.wait();
        sucess?.(tx);

        return tx;
    }
}

