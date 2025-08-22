import { BlockchainWalletType } from "./types/BlockchainWalletType";
import {
  Aptos,
  AptosConfig,
  Network,
  Account,
  Ed25519PrivateKey,
  AccountAddress,
  AccountAddressInput
} from "@aptos-labs/ts-sdk";


type network = "DEVNET" | "TESTNET" | "MAINNET"



export class APTOChain {
    private aptos: Aptos;
    private decimal: number;
    private network: network;
    private USDCFugibleTestNet: string = "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832";
    private USDCFugibleMainnt: string = "0x69091fbab5f7d635ee7ac5098cf0c1efbe31d68fec0f2cd565e8d168daf52832";

    constructor({ network }: { network: network }) {
        const config: AptosConfig = new AptosConfig({
        network:
            network === "DEVNET"
            ? Network.DEVNET
            : network === "TESTNET"
            ? Network.TESTNET
            : Network.TESTNET,
        });
        this.aptos = new Aptos(config);
        this.decimal = network === "MAINNET" ? 6 : 8;
        this.network = network;
    }

    private converToSun(amount: number): number { return amount * 10 ** this.decimal; }
    private converFromSun(amount: number): number { return amount / 10 ** this.decimal; }

    private async getAccountAPTAmount (address:  AccountAddress): Promise<number> {
        return await this.aptos.getAccountAPTAmount({
            accountAddress: address,
        })
    };
    private async getAccountCoinAmounts (address:  AccountAddress): Promise<number> {
        return await this.aptos.getAccountCoinAmount({
            accountAddress: address,
            faMetadataAddress: this.network !== 'MAINNET'
                ? this.USDCFugibleTestNet
                : this.USDCFugibleMainnt
        })
    };
    

    getAccount(privateKeys: string): Account {
        const privateKey = new Ed25519PrivateKey(privateKeys);
        const account = Account.fromPrivateKey({ privateKey});
        return account;
    }

    async createWallet(): Promise<BlockchainWalletType> {
        const account = Account.generate();
        const walletData: BlockchainWalletType = {
            address: account.accountAddress.toString(),
            publicKey: account.publicKey.toString(),
            privateKey: account.privateKey.toString(),
        };
        return walletData;
    }

    async fundAccount(privateKey: string, amount: number): Promise<any> {
        const aptos = new Aptos(new AptosConfig({network: Network.TESTNET}));

        const tx = await aptos.fundAccount({
            accountAddress: this.getAccount(privateKey).accountAddress,
            amount: this.converToSun(amount)
        });

        return tx.hash;
    }

    async getAPTBalance(address: string): Promise<number> {
        const balance = await this.getAccountAPTAmount(AccountAddress.fromString(address));
        return this.converFromSun(balance);
    }
    async getUSDCBalance(address: string): Promise<number> {
        const amount = await this.getAccountCoinAmounts(AccountAddress.fromString(address));
        return amount / 10 ** 6;
    }

    async transferAPT(privateKey: string, toAddress: string, amount: number): Promise<string> {
        const sender = this.getAccount(privateKey);

        const transaction = await this.aptos.transferCoinTransaction({
            sender: sender.accountAddress,
            recipient: toAddress,
            amount: this.converToSun(amount),
        });

        const pendingTxn = await this.aptos.signAndSubmitTransaction({ signer: sender, transaction });
        const response = await this.aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
        return response.hash;
    }
    async transferUSDC(privateKeys: string, to: string, amount: number): Promise<string> {
        const sender = this.getAccount(privateKeys);
        const amounts = amount * 10 ** 6;

        const faMetadataAddress = this.network !== 'MAINNET'
        ? this.USDCFugibleTestNet
        : this.USDCFugibleMainnt as AccountAddressInput;
        
        const transaction = await this.aptos.fungibleAsset.transferFungibleAsset({
            sender: sender,
            recipient: to,
            amount: amounts,
            fungibleAssetMetadataAddress: faMetadataAddress
        });
          
        const pendingTxn = await this.aptos.signAndSubmitTransaction({ signer: sender, transaction });
        const response = await this.aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
        return response.hash;
    }

  
}