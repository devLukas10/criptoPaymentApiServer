import { TronServices } from "../blockchain/tron.service";


const address = "THKcm2UBz3W5EfkrydD3RVTM1jHzyN11xj";
const pKey = '5031FEEE5AAD8D5686FC28FF1F02A2D9B2E9A0497AA5530708A0F85A0D6F903F';
const to = 'TVTb8ZgMgnQfgfy6vd4foNUPM2EdNyZhQW';

const tron = new TronServices();

async function test() {
    const res = await tron.transferUSDT({amount: 100, to}, {from: address, privateKey: pKey});
    setTimeout(async ()=> {
        console.log(await tron.getTransactionID(res))
    }, 5000)
}

test()