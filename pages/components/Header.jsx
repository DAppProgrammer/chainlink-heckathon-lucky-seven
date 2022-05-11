import React, { useContext, useEffect } from "react";
// import { TransactionContext } from "../context/TransactionContext";

import { shortenAddress } from "../utils/shortenAddress";

import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";

import switchNetwork from "../utils/switchNetwork";
import Avatar from "./Avatar";

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
        <div className="bg-black opacity-60 fixed w-full h-full z-50 grid grid-cols-1 content-center">
          <div className="text-center text-white">
            <div className="p-1">
              You are connected to network {network[0].data.chain.name}
            </div>
            <div className="p-1">
              Please switch to "Polygon Testnet Mumbai" to play this game.
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
        <div className="ml-auto py-2 px-4">
          {!address && (
            <button
              className="bg-slate-600 py-1 px-5 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
              onClick={() => connectWithMetamask()}
            >
              Connect
            </button>
          )}

          {address && (
            <>
              <h1 className="bg-slate-600 text-white pr-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] flex items-center">
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
