import { ARBChain } from "../blockchain/ARBChain";
import { ETHChain } from "../blockchain/ETHChain";
import { POLChain } from "../blockchain/POLChain";



const pol = new POLChain();
const eth =  new ETHChain();
const arb = new ARBChain();


const address = '0x158aEa9af0745d6DFED63104B3633098d29dD33f';
const privateKey = "0xc9b6d01a5edf2bb2164b2b83736bfd15d5891937bbd52ebbe43021c2ec4861e1";

const to = "0x0E06e2CcEDb5Ef2D20985A5b49B62B5bC2d204Fe";

(async ()=> {
    
    /*
    await pol.transferUSDC(
        privateKey, 
        to, 
        10, 
        async (hash: any) => console.log("pedding: " +hash),
        async ()=>  console.log("sucess: ")
    );
    */
    
    //let result = await arb.transferETH(privateKey, to, 0.01);
    //console.log(result)

    console.log("POL: " + await pol.getPOLBalance(to))
    console.log("USDC: " + await pol.getUSDCBalance(to))
    //console.log("USDT: " + await arb.getUSDTBalance(address))
})()