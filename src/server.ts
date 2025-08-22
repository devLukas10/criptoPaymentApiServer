import { APTOChain } from "../blockchain/APTOChain";

const apt = new APTOChain({network: 'TESTNET'});

async function test(){
    
    const from = {
        address: '0xc2c6b8eb5657ef5edd68a0159cff13e8f0171ee095e16737e0a01e6a495b33f3',
        publicKey: '0x0a0f21756ca2bf01ce5b3a1011558fdc602ee2ceae72200f765bfc9ee2fb6c22',
        privateKey: 'ed25519-priv-0x3fbfb557fc13fd99fa7b592dbc781e865bc668202963601842fdcdf103d4779e'
    };
    const to = {
        address: '0x86abcdda21b44b136285443ee90aa61de62d248754b0d1245ef7173bcf836da6',
        publicKey: '0xb3dad3dd67d07a320983e432b473bcb463e27ac503a6d09ddff5e940909e1992',
        privateKey: 'ed25519-priv-0x656da01a65669401ecc117b8f831b6ea5456cfef03ff19d97af3e1a11bbcc565'
    }
    //await apt.fundAccount(account.privateKey, 100);
    //console.log(await apt.transferAPT(from.privateKey, to.address, 0.005))
    //console.log(await apt.transferUSDC(from.privateKey, to.address, 2))
    console.log(await apt.getUSDCBalance(to.address))
}


test()