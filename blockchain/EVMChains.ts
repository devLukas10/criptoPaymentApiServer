import { ethers } from "ethers";
import { BlockchainWalletType } from "../src/types/BlockchainWalletType";
import { EtherFormatWei } from "../src/utils/etherFormatWei";
import { ERC_USDT_ABI } from "./abi/ercUsdtABI";

interface EVM {
    rpcUrl: string;
    usdtContract: string;
    usdcContract: string;
    eurcContract: string;
}

export class EVMChains {
    private provider: ethers.JsonRpcProvider;
    private usdtContract: string;
    private usdcContract: string;
    private eurcContract: string;

    private gasLimit: number = 21000;
    private maxFeePerGas = ethers.parseUnits("30", "gwei");
    private maxPriorityFeePerGas = ethers.parseUnits("2", "gwei");

    constructor({ rpcUrl, usdtContract, usdcContract, eurcContract }: EVM) {
        this.provider = new ethers.JsonRpcProvider(rpcUrl);
        this.usdtContract = usdtContract;
        this.usdcContract = usdcContract;
        this.eurcContract = eurcContract;
    }

    private async transferToken(
        privateKey: string,
        to: string,
        amount: number,
        contract: string
    ): Promise<any> {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, wallet);
        const decimals = await erc20["decimals"]();
        const tx = await erc20["transfer"](to, ethers.parseUnits(amount.toString(), decimals));
        return tx;
    }

    private async getTokenBalance(address: string, contract: string): Promise<number> {
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, this.provider);
        const balance = await erc20["balanceOf"](address);
        const decimals = await erc20["decimals"]();
        return parseFloat(ethers.formatUnits(balance, decimals));
    }

    private async transferCustomToken(
        privateKey: string,
        to: string,
        amount: number,
        contract: string,
        call?: (txHash: string) => void,
        success?: (tx: any) => void
    ): Promise<any> {
        try {
            const tx = await this.transferToken(privateKey, to, amount, contract);
            call?.(tx.hash);
            await tx.wait();
            success?.(tx);
        } catch (err) {
            throw err;
        }
    }
    
    // Métodos genéricos
    async getCustomTokenBalance(address: string, contract: string): Promise<number> {
        return await this.getTokenBalance(address, contract);
    }

    // Carteira e ETH
    async createWallet(): Promise<BlockchainWalletType> {
        const account = ethers.Wallet.createRandom(this.provider);
        return {
            address: account.address,
            privateKey: account.privateKey,
            phrase: account.mnemonic?.phrase,
            password: account.mnemonic?.password,
        };
    }

    async getETHBalance(address: string): Promise<number> {
        const wei = await this.provider.getBalance(address);
        return EtherFormatWei(wei, ethers);
    }

    async transferETH(privateKey: string, to: string, amount: number): Promise<any> {
        const wallet = new ethers.Wallet(privateKey, this.provider);
        const signedTx = await wallet.signTransaction({
            to,
            value: ethers.parseEther(amount.toString()),
            gasLimit: this.gasLimit,
            maxFeePerGas: this.maxFeePerGas,
            maxPriorityFeePerGas: this.maxPriorityFeePerGas,
            nonce: await this.provider.getTransactionCount(wallet.address),
            chainId: (await this.provider.getNetwork()).chainId,
            type: 2,
        });
        return await this.provider.broadcastTransaction(signedTx);
    }

    async getETHTransactioByHash(hash: string): Promise<any> {
        return await this.provider.getTransactionReceipt(hash);
    }

    // Métodos específicos para contratos conhecidos
    async getUSDTBalance(address: string): Promise<number> {
        return await this.getTokenBalance(address, this.usdtContract);
    }

    async getUSDCBalance(address: string): Promise<number> {
        return await this.getTokenBalance(address, this.usdcContract);
    }

    async getEURCBalance(address: string): Promise<number> {
        return await this.getTokenBalance(address, this.eurcContract);
    }

    async transferUSDT(
        privateKey: string,
        to: string,
        amount: number,
        call: (txHash: string) => void,
        success: (tx: any) => void
    ): Promise<any> {
        return await this.transferCustomToken(privateKey, to, amount, this.usdtContract, call, success);
    }

    async transferUSDC(
        privateKey: string,
        to: string,
        amount: number,
        call: (txHash: string) => void,
        success: (tx: any) => void
    ): Promise<any> {
        return await this.transferCustomToken(privateKey, to, amount, this.usdcContract, call, success);
    }

    async transferEURC(
        privateKey: string,
        to: string,
        amount: number,
        call?: (txHash: string) => void,
        success?: (tx: any) => void
    ): Promise<any> {
        return await this.transferCustomToken(privateKey, to, amount, this.eurcContract, call, success);
    }
}

