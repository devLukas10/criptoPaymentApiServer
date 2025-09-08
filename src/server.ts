import { BSC_CHAINS } from "../blockchain/BSC_CHAINS";
import { EVMWatcher } from "../blockchain/utils/ChainWebhook";

const bsc = new BSC_CHAINS({network:  'MAINNET'});
const bscW = new EVMWatcher({wssUrl: 'wss://bsc-rpc.publicnode.com'});


async function run(){
    const from = {
        address: '0xfD5395BE45121e0A41A77d0be07Aa5bf2e634AbE',
        publicKey: '0x0a0f21756ca2bf01ce5b3a1011558fdc602ee2ceae72200f765bfc9ee2fb6c22',
        privateKey: '9ad6a22a0af26d14481ce75b8f6217334eed0c5671c0300acad27e79fc2288ef'
    };
    const to = {
        address: '0xcCf8B74aC37ebb8F34b972570a01981B9EE37398',
        publicKey: '0xb3dad3dd67d07a320983e432b473bcb463e27ac503a6d09ddff5e940909e1992',
        privateKey: 'ed25519-priv-0x656da01a65669401ecc117b8f831b6ea5456cfef03ff19d97af3e1a11bbcc565'
    }
    
    /*
    let resp = await bsc.transferBNB(from.privateKey, to.address, 0.00028);
    console.log(resp.hash)
    */
   /*
    let resp = await bsc.transferJMPT(from.privateKey, to.address, 0.000001);
    console.log(resp)
    */
}

run()

