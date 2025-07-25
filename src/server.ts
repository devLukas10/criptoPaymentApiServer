import { TronServices } from "../blockchain/tron.service";


//const address = "THKcm2UBz3W5EfkrydD3RVTM1jHzyN11xj";
//const pKey = '5031FEEE5AAD8D5686FC28FF1F02A2D9B2E9A0497AA5530708A0F85A0D6F903F';
const to = 'TVTb8ZgMgnQfgfy6vd4foNUPM2EdNyZhQW';

const tron = new TronServices();

async function test() {
    //let result = await tron.transferUSDT({amount: 100, to}, {from: address, privateKey: pKey});
    //let result = await tron.getTransactionFee('0f16312cf6113fe5be9b956b9a1caac77edd7ecf1534365379517bf84421f4bc')
    let result = await tron.getBalance(to)
    console.log(result)
}

test()