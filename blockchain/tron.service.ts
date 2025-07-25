import { TronWeb } from 'tronweb';
import { BlockchainWalletType } from '../src/types/BlockchainWalletType';
import { API_TRONGRID_URL, ENERGY, TRON_USDT_CONTRACT_ADDRESS } from '../src/types/constants';
import { SendTransactionFrom } from '../src/types/SendTransactionFrom';
import { SendTransactionTo } from '../src/types/SendTransactionTo';
import { TRON_USDT_ABI } from './abi/tronUsdtABI';

const tronWeb = new TronWeb({ fullHost: API_TRONGRID_URL });


export class TronServices {
    
    converNumToSun(amount: number){
        return parseFloat(`${tronWeb.toSun(amount)}`);
    }
    
    async createWallet(): Promise<BlockchainWalletType> {
        const account = await tronWeb.createAccount();
        const wallet: BlockchainWalletType = {
            privateKey: account.privateKey,
            publicKey: account.publicKey,
            address: account.address.base58
        };
        return new Promise((resolve, _)=> {
            resolve(wallet)
        });
    }
    
    async getBalance({address}: {address: string}): Promise<any> {
        const account =  await tronWeb.trx.getBalance(address);
        const balanceInTrx = tronWeb.fromSun(account);
        return new Promise((resolve, _)=> {
            resolve(balanceInTrx)
        })
    }
    
    async sendTransaction (
        {amount, to}: SendTransactionTo, 
        {privateKey, from} : SendTransactionFrom
    ): Promise<any>{
        try {
            const tx = await tronWeb.trx.sendTransaction(to, this.converNumToSun(amount), {
                privateKey: privateKey,
                address: from,
            });
            return new Promise((resolve, _)=> { resolve(tx) });
        } catch (error) {
            return error;
        }
    }
    
    async freezeBalanceTypeEnergy(amount: number,  address: string): Promise<any> {
        try {
            const trx = await tronWeb.transactionBuilder.freezeBalanceV2(this.converNumToSun(amount), ENERGY, address);
            return new Promise((resolve, _)=> { resolve(trx) })
        } catch (err) { return err; }
    }
    
    async unFreezeBalanceTypeEnergy(amount: number,  address: string): Promise<any>{
        try{
            const trx =  await tronWeb.transactionBuilder.unfreezeBalanceV2(amount, ENERGY, address);
            return new Promise((resolve, _)=> { resolve(trx) })
        } catch (err) { return err; }
    }
    
    async getAccountResources(address: string) {
        try{
            const trx = await tronWeb.trx.getAccountResources(address);
            return new Promise((resolve, _)=> { resolve(trx) })
        } catch (err) { return err; }
    }
    
    async getEventsByTransactionID(txID: string): Promise<any>{
        try{
            const trx = await tronWeb.event.getEventsByTransactionID(txID, { only_confirmed: true });
            return new Promise((resolve, _)=> { resolve(trx) })
        } catch (err) { return err; }
    }
    
    async getTransactionID(txID: string): Promise<any>{
        try{
            const trx = await tronWeb.trx.getTransaction(txID);
            return new Promise((resolve, _)=> { resolve(trx) })
        } catch (err) { return err; }
    }
    
    async getUsdtBalance(address: string): Promise<any> {
        tronWeb.setAddress(address);
        try{
            const contract = await tronWeb.contract(TRON_USDT_ABI, TRON_USDT_CONTRACT_ADDRESS);
      
            const balance = await contract['balanceOf']
                (address)
            .call();
        
            const decimals = await contract['decimals']().call();
            const divisor = BigInt(10) ** BigInt(decimals);
            const formattedBalance = balance / divisor;
            const form = parseFloat(`${formattedBalance}`).toFixed(2).replace('n', '')
            return new Promise((resolve, _)=> { resolve(Number(form)) })
    
        } catch (err) { return err; }
    }
}


  
  