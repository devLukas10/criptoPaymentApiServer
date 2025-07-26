import { ethers } from "ethers";
import { ETH_PROVIDERS } from "../src/types/constants";
import { BlockchainWalletType } from "../src/types/BlockchainWalletType";
import { EtherFormatWei } from "../src/utils/etherFormatWei";


const provider = new ethers.JsonRpcProvider(ETH_PROVIDERS.testnet);


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



    async transferETH(privateKey: string, to: string, amount: any): Promise<any> {
        
        try {
            const wallet = new ethers.Wallet(privateKey, provider);
            /*
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
            */
            console.log(wallet.address)

        } catch (err) {
            throw err
        }
    }
}