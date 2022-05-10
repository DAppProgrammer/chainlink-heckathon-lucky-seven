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

const Header = () => {
  // const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  // const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

  const changeNetwork = async (networkName) => {
    try {
      if (!ethereum) return alert("Please install metamask");

      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (address && network[0].data.chain.id != 80001) {
    return (
      <>
        <div className="bg-yellow-50">
          You are connected to {network[0].data.chain.name} network. You need to
          change to Polygon Testnet Mumbai{" "}
          <span
            className="text-gray-300 cursor-pointer"
            onClick={() => changeNetwork("PolygonTestnetMumbai")}
          >
            Change
          </span>
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
          {/* {address && (
            <div>
              Address: {address}
              <br />
              Chain ID: {network[0].data.chain && network[0].data.chain.id}
              <br />
              <button onClick={disconnectWallet}>Disconnect</button>
            </div>
          )}
          {!address && (
            <div>
              <button onClick={() => connectWithCoinbaseWallet()}>
                Connect Coinbase Wallet
              </button>
              <button onClick={() => connectWithMetamask()}>
                Connect MetaMask
              </button>
              <button onClick={() => connectWithWalletConnect()}>
                Connect WalletConnect
              </button>
            </div>
          )} */}

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
              {/* <br />
              Chain ID: {network[0].data.chain && network[0].data.chain.id}
              <br /> */}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
