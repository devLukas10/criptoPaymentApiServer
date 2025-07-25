import { BSCService } from "../blockchain/chains/ether.bsc.service";


const bsc = new BSCService();

const address = "0x5f29f8aF908E6BDAD5EDcC52bBCD33a064230754";

(async ()=> {
    let tx = await bsc.createWallet();
    console.log(tx)
})()