import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  gameTokenAbi,
  gameTokenAddress,
  luckySevenGameAbi,
  luckySevenGameAddress,
  providerUrl
} from "../utils/constants";

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ethereum, setEthereum] = useState();
  const [gameToken, setGameToken] = useState(0);
  const [trading, setTrading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [selectedOption, setSelectedOption] = useState(7);
  const [betAmount, setBetAmount] = useState(500);

  // const [approved, setApproved] = useState(false);
  useEffect(() => {
    return () => {
      const { ethereum } = window;
      setEthereum(ethereum);
    };
  });

  const updateGameToken = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gameTokenContract = new ethers.Contract(
      gameTokenAddress,
      gameTokenAbi,
      provider
    );
    let gameTokenBal = await gameTokenContract.balanceOf(address);
    gameTokenBal = ethers.utils.formatEther(gameTokenBal);
    gameTokenBal = Math.round(gameTokenBal * 1e2) / 1e2;
    setGameToken(gameTokenBal);
  };

  const approveBet = async (amt) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameTokenContract = new ethers.Contract(
      gameTokenAddress,
      gameTokenAbi,
      signer
    );

    let approved = await gameTokenContract.approve(
      luckySevenGameAddress,
      ethers.utils.parseEther(amt.toString())
    );
    console.log(approved);
  };

  const transfer = async (amt) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const luckySevenGame = new ethers.Contract(
      luckySevenGameAddress,
      luckySevenGameAbi,
      signer
    );

    let transferred = await luckySevenGame.transfer(amt);
    console.log(transferred);
  };

  const transferFrom = async (amt) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const luckySevenGame = new ethers.Contract(
      luckySevenGameAddress,
      luckySevenGameAbi,
      signer
    );

    let transferred = await luckySevenGame.transferFrom(amt);
    console.log(transferred);
  };
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

  // const connectWallet = async () => {
  //   try {
  //     if (!ethereum) return alert("Please install MetaMask.");

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });

  //     setCurrentAccount(accounts[0]);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("No ethereum object");
  //   }
  // };

  return (
    <TransactionContext.Provider
      value={{
        setCurrentAccount,
        currentAccount,
        setIsLoading,
        isLoading,
        ethereum,
        updateGameToken,
        gameToken,
        trading,
        setTrading,
        approveBet,
        approved,
        setApproved,
        transfer,
        transferFrom,
        selectedOption,
        setSelectedOption,
        betAmount,
        setBetAmount
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;
