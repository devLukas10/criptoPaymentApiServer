import { SOLChain } from "../blockchain/SOLChain";

const sol = new SOLChain();

const address = "D1AtWNP5xxgZtjie74HWuBreRrS6de7peKEHgDC44y7H";
const privateKey = [
    72,
    24,
    244,
    233,
    76,
    142,
    252,
    146,
    160,
    25,
    0,
    37,
    251,
    66,
    79,
    250,
    136,
    121,
    95,
    81,
    128,
    95,
    0,
    176,
    65,
    231,
    119,
    193,
    243,
    81,
    219,
    139,
    178,
    87,
    108,
    110,
    99,
    128,
    86,
    188,
    31,
    90,
    138,
    196,
    170,
    152,
    6,
    65,
    145,
    236,
    178,
    177,
    236,
    149,
    116,
    210,
    222,
    158,
    200,
    206,
    187,
    105,
    107,
    84
];
const to = "Avg8TkkL2Zj96gndoWT8xhskxw2oZzE8kUon4yfUKDbz";

(async ()=> {

    //await sol.createWallet()

    console.log("SOL= "+ await sol.getSOLBalance(to))
    console.log("USDC= "+ await sol.getUSDCBalance(to))
    console.log("USDT= "+ await sol.getUSDTBalance(to))

})()