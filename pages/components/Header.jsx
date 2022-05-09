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

const Header = () => {
  // const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  // const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

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
