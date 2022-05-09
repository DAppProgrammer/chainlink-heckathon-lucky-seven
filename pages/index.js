import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "./components/Header";
import UserNFTs from "./components/UserNFTs";

// import { switchNetworkMumbai } from "./utils/switchNetworkMumbai";

export default function Home() {
  return (
    <div className="gradient-bg-welcome min-h-screen">
      <Header />
      <UserNFTs />
    </div>
  );
}
