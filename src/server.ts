import { ARBChain } from "../blockchain/ARBChain";
import { ETHChain } from "../blockchain/ETHChain";
import { POLChain } from "../blockchain/POLChain";



const pol = new POLChain();
const eth =  new ETHChain();
const arb = new ARBChain();


const address = '0xC80309CDFa714D5B4B5e217759aeF5da0D3799D7';
const privateKey = "0xcf4b1eda1ce28fc9d566ff7f9284aa2458eebba50da597e1e873c049a072745d";

const to = "0x11e6495eA2209e1D2B9d34Af71B1160C4acFE9C2";

(async ()=> {
    
    /*
    await arb.transferUSDC(
        privateKey, 
        to, 
        20, 
        async (hash: any) => console.log("pedding: " +hash),
        async ()=>  console.log("sucess: ")
    );
    */
    
    //let result = await arb.transferETH(privateKey, to, 0.01);
    //console.log(result)

    console.log("ETH: " + await arb.getETHBalance(address))
    console.log("USDC: " + await arb.getUSDCBalance(address))
    console.log("USDT: " + await arb.getUSDTBalance(address))
})()