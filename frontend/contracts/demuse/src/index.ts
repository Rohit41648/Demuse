import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CBNGL6LHA7CYBVBWGK7TFFFBXLMWIFR4NZQVP2JBM6N7WQ2LP3TI3OIE",
  }
} as const


export interface Creator {
  name: string;
  total_tips: i128;
}

export interface Client {
  /**
   * Construct and simulate a register_creator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Register a new creator on the platform.
   */
  register_creator: ({creator, name}: {creator: string, name: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a tip_creator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Tip a creator. Note: Real implementations would involve transferring token balances.
   * This is simplified for logic validation.
   */
  tip_creator: ({tipper, creator, amount}: {tipper: string, creator: string, amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_creator transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get details of a registered creator.
   */
  get_creator: ({creator}: {creator: string}, options?: MethodOptions) => Promise<AssembledTransaction<Creator>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAAB0NyZWF0b3IAAAAAAgAAAAAAAAAEbmFtZQAAABAAAAAAAAAACnRvdGFsX3RpcHMAAAAAAAs=",
        "AAAAAAAAACdSZWdpc3RlciBhIG5ldyBjcmVhdG9yIG9uIHRoZSBwbGF0Zm9ybS4AAAAAEHJlZ2lzdGVyX2NyZWF0b3IAAAACAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAABG5hbWUAAAAQAAAAAA==",
        "AAAAAAAAAH1UaXAgYSBjcmVhdG9yLiBOb3RlOiBSZWFsIGltcGxlbWVudGF0aW9ucyB3b3VsZCBpbnZvbHZlIHRyYW5zZmVycmluZyB0b2tlbiBiYWxhbmNlcy4KVGhpcyBpcyBzaW1wbGlmaWVkIGZvciBsb2dpYyB2YWxpZGF0aW9uLgAAAAAAAAt0aXBfY3JlYXRvcgAAAAADAAAAAAAAAAZ0aXBwZXIAAAAAABMAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
        "AAAAAAAAACRHZXQgZGV0YWlscyBvZiBhIHJlZ2lzdGVyZWQgY3JlYXRvci4AAAALZ2V0X2NyZWF0b3IAAAAAAQAAAAAAAAAHY3JlYXRvcgAAAAATAAAAAQAAB9AAAAAHQ3JlYXRvcgA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    register_creator: this.txFromJSON<null>,
        tip_creator: this.txFromJSON<null>,
        get_creator: this.txFromJSON<Creator>
  }
}