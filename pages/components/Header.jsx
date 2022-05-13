import React, { useContext, useEffect } from "react";
// import { TransactionContext } from "../context/TransactionContext";

import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";

import Avatar from "./Avatar";
import Image from "next/image";
import ImgCoins from "../assets/coins4.jpg";

const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

const networks = {
  PolygonTestnetMumbai: {
    chainId: "0x13881",
    chainName: "Polygon Testnet Mumbai",
    nativeCurrency: {
      name: "Matic",
      symbol: "Matic",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.matic.today"],
  },
};

const switchNetwork = async (networkName, chainId) => {
  if (!window.ethereum) return;
  const { ethereum } = window;

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName],
            },
          ],
        });
      } catch (error) {
        alert(error.message);
      }
    }
  }
};

const Header = () => {
  // const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  // const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

  if (address && network[0].data.chain.id != 80001) {
    return (
      <>
        <div className="bg-black opacity-85 fixed w-full h-full z-50 grid grid-cols-1 content-center">
          <div className="text-center text-white">
            <div className="p-1">
              You are connected to network {network[0].data.chain.name}
            </div>
            <div className="p-1">
              Please switch to Polygon Testnet Mumbai to play this game.
            </div>

            <div className="p-2">
              <button
                className="text-black cursor-pointer rounded-full px-3 py-1 space-x-2 bg-lime-200"
                onClick={() => switchNetwork("PolygonTestnetMumbai", "0x13881")}
              >
                Switch to Mumbai Testnet
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="pt-3 flex flex-row">
        <div className="text-slate-300 px-3 flex items-center">
          <Image src={ImgCoins} alt="" />
          Token balance: 500
        </div>
        <div className="ml-auto py-2 px-4">
          {!address && (
            <button
              className="py-1 px-5 mx-4 rounded-full cursor-pointer hover:bg-slate-600 border-2 border-text-gradient text-white"
              onClick={() => connectWithMetamask()}
            >
              Connect
            </button>
          )}

          {address && (
            <>
              <h1 className="pr-7 mx-4 rounded-full cursor-pointer hover:bg-black flex items-center border-2 border-text-gradient text-white">
                <div>
                  <Avatar />
                </div>
                <div className="pl-3" onClick={disconnectWallet}>
                  {network[0].data.chain && network[0].data.chain.id}
                  {shortenAddress(address)}
                </div>
              </h1>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
