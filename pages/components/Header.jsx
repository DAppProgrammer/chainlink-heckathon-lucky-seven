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
        <div className="bg-white opacity-70 flex flex-col h-screen w-screen fixed z-50">
          <div className="m-auto text-center text-black">
            <h1>You are connected to network {network[0].data.chain.name}</h1>
            <h3>
              Please switch your network to Polygon Testnet Mumbai to play this
              game.
            </h3>

            <br />
            <button
              className="text-black cursor-pointer rounded-full px-3 py-1 space-x-2 bg-lime-200"
              onClick={() => switchNetwork("PolygonTestnetMumbai", "0x13881")}
            >
              Switch to Mumbai Testnet
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="pt-3 flex flex-row">
        <h1 className="px-3 text-1xl sm:text-2xl text-white text-gradient py-1">
          Lucky Seven
        </h1>
        <div className="ml-auto py-2 px-4">
          {!address && (
            <button
              className="bg-[#dddfe6] py-1 px-5 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
              onClick={() => connectWithMetamask()}
            >
              Connect
            </button>
          )}

          {address && (
            <>
              <h1
                className="bg-[#dddfe6] py-1 px-5 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                onClick={disconnectWallet}
              >
                {network[0].data.chain && network[0].data.chain.id}
                {shortenAddress(address)}
              </h1>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
