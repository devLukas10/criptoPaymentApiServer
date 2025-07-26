import { ETHService } from "../blockchain/eth.service";

const eth = new ETHService();
const address = '0xD7e9A4061451297A431aF1ABd17aF077b99E4eE2';
const privateKey = "0x292435042c5f78b91901e7a56a1300a1f015201d2c07dbc6275a1f27d676039d";

const to = "0xD7e9A4061451297A431aF1ABd17aF077b99E4eE2";

(async ()=> {
    let result = await eth.transferETH(privateKey, to, 0.001);

    //console.log(result)
})()