import React, { useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "./components/Header";
import BetOption from "./components/BetOption";
// import { switchNetworkMumbai } from "./utils/switchNetworkMumbai";
import { useNetwork, useAddress } from "@thirdweb-dev/react";
import TransactionProvider from "../context/TransactionContext";

export default function Home() {
  const { trading, setTrading } = useContext(TransactionProvider);
  return (
    <>
      <div className="flex flex-col h-screen justify-between gradient-bg-welcome ">
        <header>
          <Header />
        </header>
        <main className="h-[calc(100vh-36px)]">
          <BetOption />
        </main>
        <footer className="h-10 flex text-center justify-center border-t-2 pt-1 text-white cursor-pointer">
          <span onClick={() => setTrading(true)}>Buy Game Tokens</span> | Sell
          Game Tokens
        </footer>
      </div>
    </>
  );
}
