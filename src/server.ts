import { ETHService } from "../blockchain/eth.service";

const eth = new ETHService();

(async ()=> {
    await eth.createWallet()
})()