import { ethers } from "ethers";
import { API_BNB_RPC_URL } from "../../src/types/constants";
import { BlockchainWalletType } from "../../src/types/BlockchainWalletType";

const provider = new ethers.JsonRpcProvider(API_BNB_RPC_URL.testnet);

console.log()

export class BSCService {

    private formatEther(wei: any): number {
        let value = ethers.formatEther(wei);
        return parseFloat(value);
    }

    async createWallet(): Promise<BlockchainWalletType> {
        let net = await provider.getNetwork()
        console.log(net.name)
        try {
            const account = ethers.Wallet.createRandom();
            //const account = randomWallet.connect(provider);

            const wallet: BlockchainWalletType = {
                address: account.address,
                privateKey: account.privateKey,
                phrase: account.mnemonic?.phrase,
                password: account.mnemonic?.password,
            };

            return wallet;
        } catch (err) {
            throw err;
        }
    }

    async getBNBBalance(address: string): Promise<number> {
        try {
            const network = await provider.getNetwork();
            console.log("Chain ID:", network.chainId);

            const balanceWei = await provider.getBalance(address);
            return this.formatEther(balanceWei);
        } catch (err) {
            throw err;
        }
    }
}
