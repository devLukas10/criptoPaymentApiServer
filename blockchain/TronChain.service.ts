import { TronWeb } from 'tronweb';
import { BlockchainWalletType } from '../src/types/BlockchainWalletType';
import {
    API_TRONGRID_URL, ENERGY, BANDWIDTH,
    TRON_USDC_CONTRACT_ADDRESS,
    TRON_USDT_CONTRACT_ADDRESS,
    TRANSFER_SELECTOR,
    USDT,
    USDC
} from '../src/types/constants';
import { SendTransactionFrom } from '../src/types/SendTransactionFrom';
import { SendTransactionTo } from '../src/types/SendTransactionTo';
import { TRON_USDT_ABI } from './abi/tronUsdtABI';
import { TRON_USDC_ABI } from './abi/tronUsdcABI';

const tronWeb = new TronWeb({ fullHost: API_TRONGRID_URL });


export class TronChainServices {

    private feeLimit = 5 * 10 ** 6; // 5 TRX
    
    private converNumToSun(amount: number){
        return parseFloat(tronWeb.toSun(amount) as string);
    }

    private converNumToSunContract(amount: number){
        return  BigInt(amount * 10 ** 6);
    }

    private async convertContractBalance(contract: any, balance: any) {
        const decimals = await contract['decimals']().call();
        const divisor = BigInt(10) ** BigInt(decimals);
        const formattedBalance = balance / divisor;
        const balances = formattedBalance.toString(10)
        return parseFloat(balances);
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

    async convertEnergyToTRX(energy: number): Promise<number> {
        const sun = energy * 1; // opcional
        const trx = sun / 1_000_000;
        return trx;
    }

    async freezeTRXBalance(amount: number, resource: typeof ENERGY | typeof BANDWIDTH, address: string, privateKey: string): Promise<any> {
        tronWeb.setPrivateKey(privateKey);
        try {
            const tx = await tronWeb.transactionBuilder.freezeBalanceV2(
                this.converNumToSun(amount), 
                resource,
                tronWeb.address.toHex(address)
            );
            const signed = await tronWeb.trx.sign(tx)
            const result = await tronWeb.trx.sendRawTransaction(signed);
            return new Promise((resolve, _)=> { resolve(result) });
        } catch (err) {
          return err;
        }
    }
      
    async unFreezeTRXBalance(amount: number, resource: typeof ENERGY | typeof BANDWIDTH, address: string, privateKey:string): Promise<any> {
        tronWeb.setPrivateKey(privateKey);
        try{
            const trx =  await tronWeb.transactionBuilder.unfreezeBalanceV2(this.converNumToSun(amount), resource, address);
            const signed = await tronWeb.trx.sign(trx)
            const result = await tronWeb.trx.sendRawTransaction(signed);
            return new Promise((resolve, _)=> { resolve(result) })
        } catch (err) { return err; }
    }

    async getTRXBalance(address: string): Promise<any> {
        const account =  await tronWeb.trx.getBalance(address);
        const balanceInTrx = tronWeb.fromSun(account);
        return new Promise((resolve, _)=> {
            resolve(parseFloat(balanceInTrx as string))
        })
    }

    async getAccountResource(address: string): Promise<any> {
        try{
            const tx = await tronWeb.trx.getAccountResources(address)
            return new Promise((resolve, _)=> { resolve(tx.EnergyLimit) })
        } catch (err) { return err; }        
    }
    
    async getTRXAccount(address: string): Promise<any> {
        try{
            const tx = await tronWeb.trx.getAccount(address)
            console.log(tx)
            return new Promise((resolve, _)=> { resolve(tx) })
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

    async getTransactionFee(txID: string): Promise<any>{
        let txInfo = await tronWeb.trx.getTransactionInfo(txID);
        let tx = parseFloat(tronWeb.fromSun(txInfo.fee) as string)
        return new Promise((resolve, _)=> { resolve(tx) })
    }
    
    async getUSDTBalance(address: string): Promise<any> {
        tronWeb.setAddress(address);
        try{
            const contract = await tronWeb.contract(TRON_USDT_ABI, TRON_USDT_CONTRACT_ADDRESS);
            const balance = await contract['balanceOf']
                (address)
            .call();
            return new Promise((resolve, _)=> { resolve(this.convertContractBalance(contract, balance)) })
    
        } catch (err) { return err; }
    }

    async getEstimateEnergy(address: string,amount: number,token: typeof USDT | typeof USDC): Promise<any>{

        tronWeb.setAddress(address);

        if (token === USDT){
            try {
                const parameter = [{type:'address',value: address},{type:'uint256',value: this.converNumToSunContract(amount)}];
                const tx = await tronWeb.transactionBuilder.estimateEnergy(TRON_USDT_CONTRACT_ADDRESS, TRANSFER_SELECTOR, {}, parameter);
                return new Promise((resolve, _)=> { resolve(tx) })
            } catch(err) { return err; }
        }

        if (token === USDC){
            try {
                const parameter = [{type:'address',value: address},{type:'uint256',value: this.converNumToSunContract(amount)}];
                const tx = await tronWeb.transactionBuilder.estimateEnergy(TRON_USDC_CONTRACT_ADDRESS, TRANSFER_SELECTOR, {}, parameter);
                return new Promise((resolve, _)=> { resolve(tx) })
            } catch(err) { return err; }
        }
        
    }

    async getUSDCBalance(address: string): Promise<any>{
        tronWeb.setAddress(address);
        try{
            const contract = await tronWeb.contract(TRON_USDC_ABI, TRON_USDC_CONTRACT_ADDRESS);
            const balance = await contract['balanceOf']
                (address)
            .call();
            return new Promise((resolve, _)=> { resolve(this.convertContractBalance(contract, balance)) })
    
        } catch (err) { return err; }
    }

    async transferTRX (
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

    async transferUSDC({amount, to}: SendTransactionTo, {privateKey, from} : SendTransactionFrom): Promise<any> {
        tronWeb.setPrivateKey(privateKey);
        try{
            const contract = await tronWeb.contract(TRON_USDC_ABI, TRON_USDC_CONTRACT_ADDRESS);
            const tx = await contract['transfer'](to, this.converNumToSunContract(amount))
            .send({
                from: from,
                feeLimit: this.feeLimit,
                callValue: 0,
                shouldPollResponse:true
            });
            return new Promise((resolve, _)=> { resolve(tx) })
        } catch(err) { return err; }        
    }

    async transferUSDT({amount, to}: SendTransactionTo, {privateKey, from} : SendTransactionFrom): Promise<any> {
        tronWeb.setPrivateKey(privateKey);
        try{
            const contract = await tronWeb.contract(TRON_USDT_ABI, TRON_USDT_CONTRACT_ADDRESS);
            const tx = await contract['transfer'](to, this.converNumToSunContract(amount))
            .send({ 
                from: from, 
                feeLimit: this.feeLimit,
                callValue: 0,
                shouldPollResponse:true
            });
            return new Promise((resolve, _)=> { resolve(tx) })
        } catch(err) { return err; }        
    }
}


  
  