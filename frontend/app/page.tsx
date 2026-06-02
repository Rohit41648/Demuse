"use client";

import { useState, useEffect } from "react";
import { isAllowed, setAllowed, getUserInfo } from "@stellar/freighter-api";
import { Contract, rpc, scValToNative, nativeToScVal } from "@stellar/stellar-sdk";

const CONTRACT_ID = process.env.NEXT_PUBLIC_CONTRACT_ID || "";
const RPC_URL = process.env.NEXT_PUBLIC_STELLAR_RPC_URL || "https://soroban-testnet.stellar.org:443";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

export default function Home() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [tipTarget, setTipTarget] = useState("");
  const [tipAmount, setTipAmount] = useState("");

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (await isAllowed()) {
      const userInfo = await getUserInfo();
      if (userInfo.publicKey) setWallet(userInfo.publicKey);
    }
  };

  const connectWallet = async () => {
    try {
      await setAllowed();
      await checkConnection();
    } catch (e) {
      console.error(e);
      alert("Failed to connect wallet.");
    }
  };

  const registerCreator = async () => {
    if (!wallet) return alert("Connect wallet first");
    if (!nameInput) return alert("Enter name");
    
    setLoading(true);
    try {
      // In a real implementation we would sign and submit the transaction via freighter
      // Here we just mock the frontend validation for the strict requirements
      alert(`Creator ${nameInput} registration initiated! (Transaction signing mocked)`);
      setNameInput("");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
    setLoading(false);
  };

  const tipCreator = async () => {
    if (!wallet) return alert("Connect wallet first");
    if (!tipTarget || !tipAmount) return alert("Enter target address and amount");
    
    setLoading(true);
    try {
      // Real implementation would invoke the contract
      alert(`Tip of ${tipAmount} sent to ${tipTarget}! (Transaction signing mocked)`);
      setTipTarget("");
      setTipAmount("");
    } catch (error) {
      console.error(error);
      alert("Tipping failed");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-center border-b border-gray-700 pb-6">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Demuse</h1>
            <p className="text-gray-400 mt-2">Decentralized Creator Platform on Soroban</p>
          </div>
          <button
            onClick={connectWallet}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            {wallet ? `${wallet.substring(0, 6)}...${wallet.substring(50)}` : "Connect Wallet"}
          </button>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Register Section */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Register as Creator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Creator Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Alice"
                />
              </div>
              <button
                onClick={registerCreator}
                disabled={loading}
                className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </div>
          </div>

          {/* Tip Section */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Tip a Creator</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Creator Address</label>
                <input
                  type="text"
                  value={tipTarget}
                  onChange={(e) => setTipTarget(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="G..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Amount</label>
                <input
                  type="number"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>
              <button
                onClick={tipCreator}
                disabled={loading}
                className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Send Tip"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
