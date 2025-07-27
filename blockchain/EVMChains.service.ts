import { ethers } from "ethers";
import { BlockchainWalletType } from "../src/types/BlockchainWalletType";
import { EtherFormatWei } from "../src/utils/etherFormatWei";
import { ERC_USDT_ABI } from "./abi/ercUsdtABI";

interface EVM {
    rpcUrl: string,
    usdtContract: string,
    usdcContract: string,
    eurcContract: string
}

export class EVMChains{
    
    private provider: ethers.JsonRpcProvider;
    private usdtContract: string;
    private usdcContract: string;
    private eurcContract: string;
    
    private gasLimit: number = 21000;
    private maxFeePerGas = ethers.parseUnits("30", "gwei");
    private maxPriorityFeePerGas = ethers.parseUnits("2", "gwei");

    constructor({rpcUrl, usdtContract, usdcContract, eurcContract}: EVM){
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        this.usdtContract = usdtContract;
        this.usdcContract = usdcContract;
        this.eurcContract = eurcContract;
    }

    private async transferToken(privateKey:string, to: string, amount: number, contract: string): Promise<any>{
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, wallet);
        const decimals = await erc20["decimals"]();
        const tx = await erc20["transfer"](to, ethers.parseUnits(amount.toString(), decimals));

        return tx;
    }

    private async getTokenBalance (address: string, contract: string): Promise<number> {
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, this.provider);
        const balance = await erc20["balanceOf"](address);
        const decimals = await erc20["decimals"]();
        const tx = ethers.formatUnits(balance, decimals);

        return parseFloat(tx);
    }

    async createWallet(): Promise<BlockchainWalletType> {
        try{
            const account = ethers.Wallet.createRandom(this.provider);
            
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
            const wei = await this.provider.getBalance(address);

            return EtherFormatWei(wei, ethers);
        } catch (err) {
            throw err
        }
    }

    async getUSDTBalance (address: string): Promise<number> {
        try {
            return await this.getTokenBalance(address, this.usdtContract);

        } catch (err) {
            throw err
        }
    }

    async getUSDCBalance (address: string): Promise<number> {
        try {
            return await this.getTokenBalance(address, this.usdcContract);

        } catch (err) {
            throw err
        }
    }

    async getEURCBalance (address: string): Promise<number> {
        try {
            return await this.getTokenBalance(address, this.eurcContract);

        } catch (err) {
            throw err
        }
    }

    async getETHTransactioByHash(hash: string): Promise<any> {
        try{
            const tx = await this.provider.getTransactionReceipt(hash);

            return tx;
        } catch (err) {
            throw err
        }
    }

    async transferETH(privateKey: string, to: string, amount: number): Promise<any> {
        
        try {
            const wallet = new ethers.Wallet(privateKey, this.provider);

            const signedTx = await wallet.signTransaction({
                to: to,
                value: ethers.parseEther(amount.toString()),
                gasLimit: this.gasLimit,
                maxFeePerGas: this.maxFeePerGas,
                maxPriorityFeePerGas: this.maxPriorityFeePerGas,
                nonce: await this.provider.getTransactionCount(wallet.address),
                chainId: (await this.provider.getNetwork()).chainId,
                type: 2, // EIP-1559
            })

            const tx = await this.provider.broadcastTransaction(signedTx);
            return tx
        } catch (err) {
            throw err
        }
    }

    async transferUSDC(privateKey:string, to: string, amount: number, call: (tx: any)=>{}, sucess: (tx: any)=>{}): Promise<any> {        
        try{
            const tx = await this.transferToken(privateKey, to, amount, this.usdcContract);
            call(tx.hash);

            await tx.wait();
            sucess(tx);
        } catch (err) {
            throw err
        }
    }

    async transferEURC(privateKey:string, to: string, amount: number, call?: (tx: any)=>{}, sucess?: (tx: any)=>{}): Promise<any> {        
        try{
            const tx = await this.transferToken(privateKey, to, amount, this.eurcContract);
            call?.(tx.hash);

            await tx.wait();
            sucess?.(tx);
        } catch (err) {
            throw err
        }
    }

    async transferUSDT(privateKey:string, to: string, amount: number, call: (tx: any)=>{}, sucess: (tx: any)=>{}): Promise<any> {        
        try{
            const tx = await this.transferToken(privateKey, to, amount, this.usdtContract);
            call(tx.hash);

            await tx.wait();
            sucess(tx);
        } catch (err) {
            throw err
        }
    }

}