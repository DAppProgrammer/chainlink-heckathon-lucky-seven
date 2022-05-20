import React, { useState, useContext, useEffect } from "react";
import TransactionProvider from "../../context/TransactionContext";
import { useNetwork } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
// import { useToken } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const Trade = () => {
  const { trading, setTrading } = useContext(TransactionProvider);
  const network = useNetwork();
  const [l7TokenPrice, setL7TokenPrice] = useState(0);
  const [maticToken, setMaticToken] = useState(0);
  const [l7Token, setL7Token] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const address = useAddress();

  useEffect(() => {
    (async () => {
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.infura.io/v3/3d90d3d4b59845da80d1e51e30205521"
      );
      let balance = await provider.getBalance(address);
      balance = Math.round(ethers.utils.formatEther(balance) * 1e4) / 1e4;
      setTokenBalance(balance);
      updateMaticToken(5);
    })();
  }, [address]);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.infura.io/v3/3d90d3d4b59845da80d1e51e30205521"
      );
      const aggregatorV3InterfaceABI = [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor"
        },
        {
          inputs: [],
          name: "getLatestPrice",
          outputs: [
            {
              internalType: "int256",
              name: "",
              type: "int256"
            }
          ],
          stateMutability: "view",
          type: "function"
        }
      ];
      const addr = "0x28880B24D45bf663D344b899f4ac66B210BBaF51";
      const priceConsumerV3 = new ethers.Contract(
        addr,
        aggregatorV3InterfaceABI,
        provider
      );
      let roundData = await priceConsumerV3.getLatestPrice();
      roundData = Math.round((roundData / 1000000) * 1e2) / 1e2;
      setL7TokenPrice(roundData);
      setL7Token((Math.round(roundData * maticToken) * 1e4) / 1e4);
    })();
  }, [tokenBalance]);

  const updateL7Token = (val) => {
    setL7Token(val);
    setMaticToken(Math.round((val / l7TokenPrice) * 10000) / 10000);
  };

  const updateMaticToken = (val) => {
    setMaticToken(val);
    setL7Token(Math.round(l7TokenPrice * val * 10000) / 10000);
  };

  return (
    <div className="content-center justify-center">
      <div className="flex justify-between pb-3">
        <span className="text-xl">Swap</span>
        <span className="cursor-pointer" onClick={() => setTrading(false)}>
          X
        </span>
      </div>
      <div className="rounded flex justify-between bg-slate-50 p-3">
        <input
          type="text"
          className="border-0 text-xl"
          value={maticToken}
          onChange={(e) => updateMaticToken(e.target.value)}
        />
        <div className="bg-slate-200 w-40 p-1 shadow-md rounded">
          <select className="bg-slate-200 w-full">
            <option value="Matic" defaultValue={true}>
              Matic
            </option>
          </select>
        </div>
      </div>
      <div className="rounded flex justify-between bg-slate-50 p-3">
        <div></div>
        <div
          className="cursor-pointer"
          onClick={() => updateMaticToken(tokenBalance)}
        >
          Balance: {tokenBalance}
          {tokenBalance != maticToken && (
            <span className="ml-2 text-xs px-2 bg-red-300 rounded-lg">Max</span>
          )}
        </div>
      </div>

      <div className="rounded flex justify-center bg-slate-50 "></div>

      <div className="rounded flex justify-between bg-slate-50 p-3 mt-2">
        <input
          type="text"
          className="border-0 text-xl"
          value={l7Token}
          onChange={(e) => updateL7Token(e.target.value)}
        />
        <div className="bg-slate-200 w-40 p-1 shadow-md rounded">L7 Token</div>
      </div>
      <div className="rounded flex justify-between bg-slate-50 p-3">
        <div></div>
        <div>Balance: 500</div>
      </div>

      <div className="rounded flex justify-start  p-3 mt-2">
        <span>1 Matic = {l7TokenPrice} L7</span>
      </div>

      {tokenBalance >= maticToken ? (
        <div className="rounded-2xl flex justify-center bg-red-500 hover:bg-red-400 p-3 mt-2 text-2xl text-white cursor-pointer">
          Swap
        </div>
      ) : (
        <div className="rounded-2xl flex justify-center bg-gray-300 p-3 mt-2">
          Insufficient liquidity for this trade
        </div>
      )}
    </div>
  );
};

export default Trade;
