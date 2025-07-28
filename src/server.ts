import { ETHChain } from "../blockchain/ETHChain";
import { POLChain } from "../blockchain/POLChain";



const pol = new POLChain();
const eth =  new ETHChain();


const address = '0x158aEa9af0745d6DFED63104B3633098d29dD33f';
const privateKey = "0xc9b6d01a5edf2bb2164b2b83736bfd15d5891937bbd52ebbe43021c2ec4861e1";

const to = "0x0E06e2CcEDb5Ef2D20985A5b49B62B5bC2d204Fe";

(async ()=> {
    /*
    await pol.transferEURC(
        privateKey, 
        to, 
        2.5, 
        async (hash: any) => console.log("pedding: " +hash),
        async ()=>  console.log("sucess: ")
    );
    */
    let result = await pol.getPOLBalance(address);

    console.log(result)
})()