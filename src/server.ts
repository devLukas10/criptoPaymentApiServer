import { BSC_CHAINS } from "../blockchain/BSC_CHAINS";

const bsc = new BSC_CHAINS({network:  'MAINNET'});

async function run(){
    const from = {
        address: '0xfD5395BE45121e0A41A77d0be07Aa5bf2e634AbE',
        publicKey: '0x0a0f21756ca2bf01ce5b3a1011558fdc602ee2ceae72200f765bfc9ee2fb6c22',
        privateKey: '9ad6a22a0af26d14481ce75b8f6217334eed0c5671c0300acad27e79fc2288ef'
    };
    const to = {
        address: '0x86abcdda21b44b136285443ee90aa61de62d248754b0d1245ef7173bcf836da6',
        publicKey: '0xb3dad3dd67d07a320983e432b473bcb463e27ac503a6d09ddff5e940909e1992',
        privateKey: 'ed25519-priv-0x656da01a65669401ecc117b8f831b6ea5456cfef03ff19d97af3e1a11bbcc565'
    }
    
    console.log(await bsc.getUSDTBalance(from.address));
}

run()

