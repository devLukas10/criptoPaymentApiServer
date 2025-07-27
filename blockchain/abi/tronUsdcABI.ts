export const TRON_USDC_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{ "type": "string" }],
    "stateMutability": "View",
    "type": "Function"
  },
  {
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "value", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "type": "bool" }],
    "stateMutability": "Nonpayable",
    "type": "Function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "type": "uint256" }],
    "stateMutability": "View",
    "type": "Function"
  },
  {
    "inputs": [
      { "name": "sender", "type": "address" },
      { "name": "recipient", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "type": "bool" }],
    "stateMutability": "Nonpayable",
    "type": "Function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "type": "uint8" }],
    "stateMutability": "View",
    "type": "Function"
  },
  {
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "addedValue", "type": "uint256" }
    ],
    "name": "increaseAllowance",
    "outputs": [{ "type": "bool" }],
    "stateMutability": "Nonpayable",
    "type": "Function"
  },
  {
    "constant": true,
    "inputs": [{ "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "type": "uint256" }],
    "stateMutability": "View",
    "type": "Function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "type": "string" }],
    "stateMutability": "View",
    "type": "Function"
  },
  {
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "subtractedValue", "type": "uint256" }
    ],
    "name": "decreaseAllowance",
    "outputs": [{ "type": "bool" }],
    "stateMutability": "Nonpayable",
    "type": "Function"
  },
  {
    "inputs": [
      { "name": "recipient", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "type": "bool" }],
    "stateMutability": "Nonpayable",
    "type": "Function"
  },
  {
    "constant": true,
    "inputs": [
      { "name": "owner", "type": "address" },
      { "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "type": "uint256" }],
    "stateMutability": "View",
    "type": "Function"
  },
  {
    "type": "Constructor",
    "stateMutability": "Nonpayable"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "from", "type": "address" },
      { "indexed": true, "name": "to", "type": "address" },
      { "name": "value", "type": "uint256" }
    ],
    "name": "Transfer",
    "type": "Event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "owner", "type": "address" },
      { "indexed": true, "name": "spender", "type": "address" },
      { "name": "value", "type": "uint256" }
    ],
    "name": "Approval",
    "type": "Event"
  }
];
