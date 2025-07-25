import { TronServices } from "../blockchain/tron.service";


const address = "THKcm2UBz3W5EfkrydD3RVTM1jHzyN11xj"

const tron = new TronServices();

async function test() {
    const balance = await tron.getUsdtBalance(address);
    console.log(balance)
}

test()