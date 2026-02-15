
# 🚀 CriptoPaymentApiServer API

API robusta para **transferências de USDT, USDC e tokens EUR em redes EVM**, com suporte completo a taxas, estimativas e múltiplas blockchains.

Uma solução backend completa para serviços financeiros / DeFi, exchanges, wallets e aplicativos que precisam de movimentação de ativos via **Web3**.

---

## 📌 Visão Geral

Fastway é uma API Web3 construída para:

- Gerenciar transferências de **USDT, USDC e tokens EUR**
- Estimar e aplicar **taxas de transação**
- Operar com múltiplas **EVM chains**
- Conectar a carteiras e contratos
- Facilitar integrações backend ou microserviços

---

## 🔥 Taxas & Transferências

### 💸 Estimativas de Taxas (USDT / USDC)

| Tipo de Transferência     | Taxa Estimada                   |
|---------------------------|----------------------------------|
| **5 trx**                 | ≈ **1,57 USDT / USDC**          |
| **até 7 trx**             | ≈ **2,19 USDT / USDC**          |

> Os valores acima são estimativas médias em EVM Chains — variam conforme congestionamento da rede e gas price.

---

## 🧠 Suporte às EVM Chains

A Fastway API oferece suporte nativo para os principais ambientes EVM, com compatibilidade para transferências e estimativas de gás.

### 📋 Tabela de Suporte

| Blockchain        | USDT              | USDC              | EUR (EURC / Outros)              | Observações                       |
|------------------|------------------|------------------|----------------------------------|----------------------------------|
| **Ethereum**      | ✅ Oficial        | ✅ Oficial        | ✅ EURC pela Circle              | Taxas altas, rede principal      |
| **BNB Chain**     | ✅ BEP20          | ✅ BEP20          | 🟡 Alguns tokens EUR             | Rápida e barata                  |
| **Polygon (PoS)** | ✅ Oficial        | ✅ Oficial        | ✅ agEUR (Angle)                 | Excelente custo-benefício        |
| **Arbitrum One**  | ✅ Oficial        | ✅ Oficial        | ✅ agEUR / EURA / EURC           | L2 com taxas baixas              |
| **Optimism**      | ✅ Oficial        | ✅ Oficial        | ✅ agEUR / EURC                  | L2 compatível e barata           |
| **Avalanche**     | ✅ Oficial        | ✅ Oficial        | 🟡 Alguns tokens EUR             | Rede forte para DeFi             |

---

## 📡 Endpoints Principais

### 🔹 Transferência de Tokens

```http
POST /api/v1/transfer
Content-Type: application/json

{
  "chain": "ethereum",
  "token": "USDT",
  "to": "0x1234...abcd",
  "amount": "100.00",
  "fromPrivateKey": "PRIVATE_KEY"
}

Resposta:

{
  "status": "success",
  "txHash": "0xabcdef123456...",
  "estimatedGas": "21000",
  "feeEstimate": "1.57"
}


---

🔹 Estimar Taxa

GET /api/v1/estimate-fee?chain=polygon&token=USDC&amount=50

Resposta:

{
  "chain": "polygon",
  "token": "USDC",
  "feeEstimate": "0.32",
  "gasEstimate": 150000
}


---

🔐 Segurança

Suporte a envio via chave privada segura

Validação de parâmetros

Rate-limiting configurável

Logs detalhados de transações

Monitoramento de falhas

Proteção contra replay



---

⚙️ Variáveis de Ambiente

NODE_ENV=production
PORT=4000

# RPC Providers (Infura / Alchemy / QuickNode)
ETH_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
POLY_RPC_URL=https://polygon-rpc.com
ARB_RPC_URL=https://arb1.arbitrum.io/rpc
OPT_RPC_URL=https://mainnet.optimism.io
AVAX_RPC_URL=https://api.avax.network/ext/bc/C/rpc
BNB_RPC_URL=https://bsc-dataseed.binance.org/

# Chaves e Segredos
SERVICE_PRIVATE_KEY=your_service_key
API_RATE_LIMIT=100


---

🧪 Instalação

git clone https://github.com/seu-org/fastway-api.git
cd fastway-api
npm install

Executar local:

npm run dev

Produção:

npm run build
npm start


---

📦 Suporte a Carteiras & Integradores

Fastway foi planejada para ser integrada facilmente com:

Wallets Web3 (Mobile & Desktop)

Exchanges

Plataformas DeFi

Apps de pagamentos

Bots de trading



---

📄 Licença

Proprietary — Fastway Crypto API


---

📌 Observações Finais

✔ Taxas em USDT/USDC são aproximadas
✔ Suporte ativo para múltiplas EVM Chains
✔ Fácil integração para backend/app

Quer versões com:

Swagger (OpenAPI)

SDKs (JS / TS / Python)

Exemplos de integração

Deploy em produção (Docker / Kubernetes)


# Still Building...
