import { Contract, xdr, Address, scValToNative, nativeToScVal } from "@stellar/stellar-sdk";
import { server, contractId, getNetwork, networkPassphrase } from "./stellar";

// Expose basic contract interactions using the deployed contract ID
export const getDemuseContract = () => new Contract(contractId);

export async function fetchCreator(creatorAddress: string) {
  const contract = getDemuseContract();
  
  const creatorScVal = nativeToScVal(creatorAddress, { type: "address" });

  const tx = await server.prepareTransaction(
      await server.getAccount((await server.getNetwork()).passphrase),
      // MOCK
      "get_creator"
  );
  // Implementation of integration
}
