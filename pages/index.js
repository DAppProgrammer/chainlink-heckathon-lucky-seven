import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "./components/Header";
import BetOption from "./components/BetOption";
// import { switchNetworkMumbai } from "./utils/switchNetworkMumbai";
import { useNetwork, useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();
  return (
    <div className="gradient-bg-welcome min-h-screen">
      <Header />
      <BetOption />
    </div>
  );
}
