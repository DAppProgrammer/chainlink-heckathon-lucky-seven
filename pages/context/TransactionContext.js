import React, { useEffect, useState } from "react";
// import { ethers } from "ethers";

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ethereum, setEthereum] = useState();

  useEffect(() => {
    return () => {
      const { ethereum } = window;
      setEthereum(ethereum);
    };
  });

  //   const checkIfWalletIsConnect = async () => {
  //     try {
  //       if (!ethereum) return alert("Please install MetaMask.");

  //       const accounts = await ethereum.request({ method: "eth_accounts" });

  //       if (accounts.length) {
  //         setCurrentAccount(accounts[0]);
  //       } else {
  //         console.log("No accounts found");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        setIsLoading,
        isLoading,
        ethereum,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
