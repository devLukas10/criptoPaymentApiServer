import { ETHService } from "../blockchain/eth.service";

const eth = new ETHService();
const address = '0xe9BD31e0a569098Ffcd3608a35a36cAC399ddCF1';

(async ()=> {
    let result = await eth.getETHBalance(address);

    console.log(result)
})()