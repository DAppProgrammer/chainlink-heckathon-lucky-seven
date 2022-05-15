import React, { useState, useContext, useEffect } from "react";
import TransactionProvider from "../../context/TransactionContext";
import { useNetwork } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import { useToken } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const Trade = () => {
  const { trading, setTrading } = useContext(TransactionProvider);
  const network = useNetwork();
  const token = useToken("0xF02c1c8e6114b1Dbe8937a39260b5b0a374432bB");
  const [tokenBalance, setTokenBalance] = useState(0);
  const address = useAddress();
  //   const getTokenBalance = async () => {
  //     const balance = await token.balance();
  //     setTokenBalance(balance);
  //   };

  //   const getBalance = async () => {
  //     const provider = window.ethereum.Provider;
  //     balance = await provider.getBalance(address);
  //     console.log("BALANCE:", balance);
  //   };

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let balance = await provider.getBalance(address);
      balance = Math.round(ethers.utils.formatEther(balance) * 1e4) / 1e4;
      setTokenBalance(balance);
    })();
  }, [address]);

  return (
    <div className="content-center justify-center">
      <div className="flex justify-between pb-3">
        <span className="text-xl">Swap</span>
        <span className="cursor-pointer" onClick={() => setTrading(false)}>
          X
        </span>
      </div>
      <div className="rounded flex justify-between bg-slate-50 p-3">
        <input type="text" className="border-0 text-xl" />
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
        <div>Balance: {tokenBalance} </div>
      </div>

      <div className="rounded flex justify-center bg-slate-50 "></div>

      <div className="rounded flex justify-between bg-slate-50 p-3 mt-2">
        <input type="text" className="border-0 text-xl" />
        <div className="bg-slate-200 w-40 p-1 shadow-md rounded">L7 Token</div>
      </div>
      <div className="rounded flex justify-between bg-slate-50 p-3">
        <div></div>
        <div>Balance: 500</div>
      </div>

      <div className="rounded flex justify-start  p-3 mt-2">
        <span>1 Ether = 1000000 L7</span>
      </div>

      <div className="rounded-2xl flex justify-center bg-red-500 hover:bg-red-400 p-3 mt-2 text-2xl text-white cursor-pointer">
        Swap
      </div>

      <div className="rounded-2xl flex justify-center bg-gray-300 p-3 mt-2">
        Insufficient liquidity for this trade
      </div>
    </div>
  );
};

export default Trade;
