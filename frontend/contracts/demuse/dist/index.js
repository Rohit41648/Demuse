import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAAB0NyZWF0b3IAAAAAAgAAAAAAAAAEbmFtZQAAABAAAAAAAAAACnRvdGFsX3RpcHMAAAAAAAs=",
            "AAAAAAAAACdSZWdpc3RlciBhIG5ldyBjcmVhdG9yIG9uIHRoZSBwbGF0Zm9ybS4AAAAAEHJlZ2lzdGVyX2NyZWF0b3IAAAACAAAAAAAAAAdjcmVhdG9yAAAAABMAAAAAAAAABG5hbWUAAAAQAAAAAA==",
            "AAAAAAAAAH1UaXAgYSBjcmVhdG9yLiBOb3RlOiBSZWFsIGltcGxlbWVudGF0aW9ucyB3b3VsZCBpbnZvbHZlIHRyYW5zZmVycmluZyB0b2tlbiBiYWxhbmNlcy4KVGhpcyBpcyBzaW1wbGlmaWVkIGZvciBsb2dpYyB2YWxpZGF0aW9uLgAAAAAAAAt0aXBfY3JlYXRvcgAAAAADAAAAAAAAAAZ0aXBwZXIAAAAAABMAAAAAAAAAB2NyZWF0b3IAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAALAAAAAA==",
            "AAAAAAAAACRHZXQgZGV0YWlscyBvZiBhIHJlZ2lzdGVyZWQgY3JlYXRvci4AAAALZ2V0X2NyZWF0b3IAAAAAAQAAAAAAAAAHY3JlYXRvcgAAAAATAAAAAQAAB9AAAAAHQ3JlYXRvcgA="]), options);
        this.options = options;
    }
    fromJSON = {
        register_creator: (this.txFromJSON),
        tip_creator: (this.txFromJSON),
        get_creator: (this.txFromJSON)
    };
}
