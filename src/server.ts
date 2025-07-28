import { ETHChain } from "../blockchain/ETHChain";


const eth = new ETHChain();
const address = '0xD7e9A4061451297A431aF1ABd17aF077b99E4eE2';
const privateKey = "0x292435042c5f78b91901e7a56a1300a1f015201d2c07dbc6275a1f27d676039d";

const to = "0x8c62261B33Ec0813a85E6b5bAe2848B675a10FbA";

(async ()=> {
    /*
    await eth.transferEURC(
        privateKey, 
        to, 
        2.5, 
        async (hash: any) => console.log("pedding: " +hash),
        async ()=>  console.log("sucess: ")
    );
    */
    let result = await eth.getETHBalance(to);

    console.log(result)
})()