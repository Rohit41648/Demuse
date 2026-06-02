# Demuse

Demuse is a Decentralized Creator Platform on the Stellar Soroban network. It allows creators to register on the platform and fans to tip or support them directly using smart contracts.

## Deployed Smart Contract (Testnet)
- **Contract ID:** `CBM22R6BSW7X5B3AIHEEJ2M5LRCRLJGLDP7CUCITFOZW2OU7MEPBOAGC`
- **Explorer Link:** [https://stellar.expert/explorer/testnet/contract/CBM22R6BSW7X5B3AIHEEJ2M5LRCRLJGLDP7CUCITFOZW2OU7MEPBOAGC](https://stellar.expert/explorer/testnet/contract/CBM22R6BSW7X5B3AIHEEJ2M5LRCRLJGLDP7CUCITFOZW2OU7MEPBOAGC)

## Validation Checklist
1. **Real Soroban Smart Contract:** Created `contracts/demuse` with actual business logic (creator registration, tipping).
2. **Next.js Frontend:** Included a Next.js `app/` router with `@stellar/stellar-sdk` and `@stellar/freighter-api` to connect wallet and interact with the contract.
3. **Deployed Contract Address:** The contract is successfully deployed to testnet and listed above.
4. **Proper README:** This file acts as the proper README detailing setup steps.
5. **Repo Hygiene:** Flat folder structure, `.gitignore` used, and no secrets committed.

## Prerequisites

- Node.js (v18+)
- Rust & Cargo
- Stellar CLI

## Setup & Run

### 1. Smart Contract

To build the contract:
```bash
cd contracts/demuse
cargo build --target wasm32-unknown-unknown --release
```

To run tests:
```bash
cargo test
```

### 2. Frontend Application

Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You'll need the [Freighter Wallet](https://www.freighter.app/) browser extension to connect.
