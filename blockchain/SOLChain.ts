import fs from 'fs';
import { 
    Keypair,
    Connection,
    clusterApiUrl,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
    getAssociatedTokenAddress,
    getAccount,
    getOrCreateAssociatedTokenAccount,
    transfer
} from '@solana/spl-token';
import {
    SOL_PROVIDERS,
    SOL_USDC_CONTRACT_ADDRESS,
    SOL_USDT_CONTRACT_ADDRESS
} from './types/constants';
import { BlockchainWalletType } from './types/BlockchainWalletType';

export class SOLChain {

    private provider = new Connection(clusterApiUrl(SOL_PROVIDERS), "confirmed");

    private async getTokenBalance(address: string, mint: string): Promise<number> {
        try {

            const ata = await getAssociatedTokenAddress(
                new PublicKey(mint),
                new PublicKey(address)
            );
        
            const accountInfo = await getAccount(this.provider, ata);
            const amount = Number(accountInfo.amount);
            const format = amount / 1e6;
            
            return parseFloat(format.toString());
          } catch (err: any) {
            return parseFloat('0.0');
          }
    }

    private async transferToken(privateKey: any[], to: string, amount: number, mint: string): Promise<any> {

        const sender = Keypair.fromSecretKey(Uint8Array.from(privateKey));

        const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            this.provider,
            sender,
            new PublicKey(mint),
            sender.publicKey
        );
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            this.provider,
            sender,
            new PublicKey(mint),
            new PublicKey(to)
        );
        
        const amounts = amount * 10 ** 6;
        
        const signature = await transfer(
            this.provider,
            sender, // Signer
            senderTokenAccount.address,
            recipientTokenAccount.address,
            sender.publicKey,
            amounts
        );
        
        return signature;
    }

    async checkAddress(address: string): Promise<boolean> {
        if (!PublicKey.isOnCurve(address)) { return false;}
        return true;
    }

    async createWallet(): Promise<BlockchainWalletType> {
        const wallet = Keypair.generate();
        const account: BlockchainWalletType = {
            privateKey: Array.from(wallet.secretKey),
            address: wallet.publicKey.toBase58()
        };
        // Salva como JSON no disco
        fs.writeFileSync('wallet.json', JSON.stringify(account,null, 2));

        // Opcional: mostrar public key
        console.log('✅ Carteira gerada');
        return account;
    }

    async getSOLBalance(address: string): Promise<number> {
        let publicKey = new PublicKey(address);
        let balance = await this.provider.getBalance(publicKey);
        let format = balance / LAMPORTS_PER_SOL;
        return parseFloat(format.toString())
    }

    async getUSDTBalance(address: string): Promise<any> {
        return await this.getTokenBalance(address, SOL_USDT_CONTRACT_ADDRESS)
    }

    async getUSDCBalance(address: string): Promise<any> {
        return await this.getTokenBalance(address, SOL_USDC_CONTRACT_ADDRESS)
    }


    // Métodos específicos chain conhecido
    async transferSOL(privateKey: any[], to: string, amount: number): Promise<string> {
        const toPubkey = new PublicKey(to);
        const from = Keypair.fromSecretKey(Uint8Array.from(privateKey));

        const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: from.publicKey,
              toPubkey: toPubkey,
              lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        const signature = await sendAndConfirmTransaction(
            this.provider,
            transaction,
            [from]
        );

        return signature;
    }

    async transferUSDC(privateKey: any[], to: string, amount: number): Promise<any> {
        return this.transferToken(privateKey, to, amount, SOL_USDC_CONTRACT_ADDRESS)
    }

    async transferUSDT(privateKey: any[], to: string, amount: number): Promise<any> {
        return this.transferToken(privateKey, to, amount, SOL_USDT_CONTRACT_ADDRESS)
    }
}

