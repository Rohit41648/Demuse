import { rpc, TransactionBuilder, Networks, Network } from "@stellar/stellar-sdk";

export const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://soroban-testnet.stellar.org";
export const networkPassphrase = process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || Networks.TESTNET;
export const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID || "";

export const server = new rpc.Server(rpcUrl);

export async function getNetwork() {
  return new Network(networkPassphrase);
}
