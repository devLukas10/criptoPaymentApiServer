export const TRON_USDT_CONTRACT_ABI = [
    {
      "type": "constructor",
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        { "name": "owner", "type": "address", "indexed": true },
        { "name": "spender", "type": "address", "indexed": true },
        { "name": "value", "type": "uint256", "indexed": false }
      ]
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        { "name": "from", "type": "address", "indexed": true },
        { "name": "to", "type": "address", "indexed": true },
        { "name": "value", "type": "uint256", "indexed": false }
      ]
    },
    {
      "type": "function",
      "name": "allowance",
      "stateMutability": "view",
      "constant": true,
      "inputs": [
        { "name": "owner", "type": "address" },
        { "name": "spender", "type": "address" }
      ],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "approve",
      "stateMutability": "nonpayable",
      "inputs": [
        { "name": "spender", "type": "address" },
        { "name": "value", "type": "uint256" }
      ],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "balanceOf",
      "stateMutability": "view",
      "constant": true,
      "inputs": [{ "name": "account", "type": "address" }],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "decimals",
      "stateMutability": "view",
      "constant": true,
      "inputs": [],
      "outputs": [{ "type": "uint8" }]
    },
    {
      "type": "function",
      "name": "decreaseAllowance",
      "stateMutability": "nonpayable",
      "inputs": [
        { "name": "spender", "type": "address" },
        { "name": "subtractedValue", "type": "uint256" }
      ],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "increaseAllowance",
      "stateMutability": "nonpayable",
      "inputs": [
        { "name": "spender", "type": "address" },
        { "name": "addedValue", "type": "uint256" }
      ],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "name",
      "stateMutability": "view",
      "constant": true,
      "inputs": [],
      "outputs": [{ "type": "string" }]
    },
    {
      "type": "function",
      "name": "symbol",
      "stateMutability": "view",
      "constant": true,
      "inputs": [],
      "outputs": [{ "type": "string" }]
    },
    {
      "type": "function",
      "name": "totalSupply",
      "stateMutability": "view",
      "constant": true,
      "inputs": [],
      "outputs": [{ "type": "uint256" }]
    },
    {
      "type": "function",
      "name": "transfer",
      "stateMutability": "nonpayable",
      "inputs": [
        { "name": "recipient", "type": "address" },
        { "name": "amount", "type": "uint256" }
      ],
      "outputs": [{ "type": "bool" }]
    },
    {
      "type": "function",
      "name": "transferFrom",
      "stateMutability": "nonpayable",
      "inputs": [
        { "name": "sender", "type": "address" },
        { "name": "recipient", "type": "address" },
        { "name": "amount", "type": "uint256" }
      ],
      "outputs": [{ "type": "bool" }]
    }
  ]
  



