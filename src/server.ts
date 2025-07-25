import { TronServices } from "../blockchain/tron.service";


const address = "TZHZwLFpuP1ZMUa36RHYhXNSwtCvduNGoG";
const pKey = '4068CE686B3F2A601FFABEAF17A25F4E7BB62639D79F570826E9BAC6F9F45997';
const to = 'TZHZwLFpuP1ZMUa36RHYhXNSwtCvduNGoG';
const to2 = "TFkrkTqzVGPtf4wM6qDPg9iNAuw6YNSVQk";
const tron = new TronServices();

async function test() {
    //let result = await tron.transferUSDT({amount: 10, to: to2}, {from: address, privateKey: pKey});
    //let result = await tron.getTransactionFee('0f16312cf6113fe5be9b956b9a1caac77edd7ecf1534365379517bf84421f4bc')
    //let result = await tron.getEstimateEnergy(address, 10, "USDT")
    //let result = await tron.getTRXAccount(to)
    //let result = await tron.getTRXBalance(to);
    //console.log(result)
    //let result = await tron.getUSDTBalance(to);
    //console.log("USDT (TRC20)= " + await tron.getUSDTBalance(to))
    //console.log("USDC (TRC20)= " + await tron.getUSDCBalance(to))
    console.log("TRX= "+ await tron.getTRXBalance(to))
}

test()