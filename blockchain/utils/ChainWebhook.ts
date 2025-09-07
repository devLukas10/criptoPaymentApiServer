import fetch from "node-fetch";
import { ethers } from "ethers";
import { NetworkTypes } from "../types/NetworkType";
import {
    ATPHookData,
    ATPHookTypes
} from "./hook";
import {
    APT_HOOK_DEVNET, 
    APT_HOOK_MAINNET,
    APT_HOOK_TESTNET
} from "../types/HookUrls"; 
import { ERC_USDT_ABI } from "../abi/ercUsdtABI";






export class ATPWebhook {
    private provider: string;

    constructor({network}:{network: NetworkTypes}){
        this.provider = network === "DEVNET"
            ? APT_HOOK_DEVNET
            : network === 'TESTNET'
            ? APT_HOOK_TESTNET
            : APT_HOOK_MAINNET
    }

    private async fetchGraphQL(addresses: string[], symbol: symbols): Promise<any> {

        const operationsDoc = `
        query MyQuery($_in: [String!]!) {
            account_transactions(
            where: { 
                account_address: { _in: $_in }, 
                fungible_asset_activities: { metadata: { symbol: { _eq: "${symbol}" } } } 
            }
            ) {
            fungible_asset_activities(
                where: { 
                metadata: { symbol: { _eq: "${symbol}" } }, 
                _and: { type: { _eq: "0x1::fungible_asset::Deposit" } } 
                }
            ) {
                amount
                block_height
                is_transaction_success
                metadata {
                decimals
                symbol
                icon_uri
                }
                transaction_timestamp
                type
                owner_address
            }
            account_address
            }
        }
        `;

        const result = await fetch(this.provider,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // não esquece!
            body: JSON.stringify({
                query: operationsDoc,
                variables: { "_in": addresses },
                operationName: "MyQuery"
            })
          }
        );
      
        return await result.json();
    }

    async getTransactionBy(address: string[], symbol: symbols,): Promise<any> {
        try{
            const transctions: ATPHookData[] = [];
            const { errors, data } = await this.fetchGraphQL(address, symbol);
            
            if(errors) throw errors;
            
            const datas = data.account_transactions as ATPHookTypes[];
           
            datas.forEach(ls => {
                let {account_address, fungible_asset_activities} = ls;
                
                fungible_asset_activities.map(res => transctions.push({
                    amount: res?.amount? parseFloat(res?.amount) / 10 ** 6 : res?.amount as string,
                    block_height: res?.block_height as string,
                    is_sucess: res?.is_transaction_success as boolean,
                    decimals: res?.metadata.decimals as string,
                    symbol: res?.metadata.symbol as string,
                    icon_uri: res?.metadata.icon_uri as string,
                    time: new Date(res?.transaction_timestamp).getTime(),
                    type: res?.type as string,
                    fromAddress: res?.owner_address as string,
                    toAddress: account_address as string
                }))                
            });

            return transctions;

        } catch(err){ throw err}
    }
    
}

export class EVMWatcher {
    private provider: ethers.WebSocketProvider;

    constructor({ wssUrl }: { wssUrl: string }) {
        this.provider = new ethers.WebSocketProvider(wssUrl);
    }

    async getTokenBalance(address: string, contract: string): Promise<number> {
        const erc20 = new ethers.Contract(contract, ERC_USDT_ABI, this.provider);
        const balance = await erc20["balanceOf"](address);
        const decimals = await erc20["decimals"]();
        return parseFloat(ethers.formatUnits(balance, decimals));
    }

    watchNativeTx(address: string, callback: (tx: any) => void) {
        this.provider.on("pending", async (txHash) => {
            try {
                const tx = await this.provider.getTransaction(txHash);
                if (!tx) return;

                if (
                    tx.to &&
                    tx.to.toLowerCase() === address.toLowerCase() ||
                    tx.from.toLowerCase() === address.toLowerCase()
                    ) {
                    callback(tx);
                }
            } catch (err) {
                // pode ignorar erros de tx não encontrada
            }
        });
    }

    watchTokenTransfers(
        contractAddress: string,
        addresses: string[],
        callback: (event: {
            from: string;
            to: string;
            value: string;
            tokenBalance: number;
            txHash: string;
        }) => void
    ) {

        const token = new ethers.Contract(contractAddress, ERC_USDT_ABI, this.provider);
        const walletAddresses = new Set(addresses);

        token.on("Transfer", async (from, to, value, event) => {
            if (walletAddresses.has(from.toLowerCase()) || walletAddresses.has(to.toLowerCase())) {
              const addr = walletAddresses.has(to.toLowerCase()) ? to : from;
              const balance = await this.getTokenBalance(addr, contractAddress);
                
              callback({
                from: from,
                to: to,
                value: value,
                tokenBalance: balance,
                txHash: event.transactionHash
              });
            }
        });
    }
}











export type funMethods = "Withdraw" | "Deposit";
export type symbols = "USDC"
| "USDT"
| "JMPT"
| "APT";