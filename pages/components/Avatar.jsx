import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";

// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { useNetwork, useAddress } from "@thirdweb-dev/react";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-ropsten.alchemyapi.io/v2/-T5dg-en08fCxb3PqWITQgKJKlKD6THL"
);

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

const Avatar = () => {
  const [collection, setCollection] = useState([]);
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

  useEffect(() => {
    (async () => {
      const nfts = await web3.alchemy.getNfts({
        owner: `${address}`,
      });
      // const tokenBalance = await web3.alchemy.getTokenBalances(address, [
      //   "0xf2a914dcad185866d451c87c3268855f1590b8e1"
      // ]);
      setCollection(nfts);
      // console.log(tokenBalance);
    })();
  }, [address]);

  if (network[0].data.chain.id != 80001) {
    return (
      <>
        <span className="text-white">
          You are connected to {network[0].data.chain.name}.
        </span>
        <span
          className="text-gray-300 cursor-pointer"
          onClick={() => changeNetwork("PolygonTestnetMumbai")}
        >
          Change to Polygon Testnet Mumbai
        </span>
      </>
    );
  }

  return (
    <>
      {collection.totalCount > 0 ? (
        <div className="w-16 px-3 text-1xl sm:text-2xl p-1">
          {collection.ownedNfts[collection.totalCount - 1] && (
            <img
              src={
                collection.ownedNfts[collection.totalCount - 1].metadata.image
              }
              alt={""}
              className="w-fit rounded-full"
              onClick={() =>
                window.open(
                  collection.ownedNfts[collection.totalCount - 1].metadata
                    .image,
                  "mozillaWindow",
                  "left=100,top=100,width=350,height=350,location=0,titlebar=0,toolbar=0,popup"
                )
              }
            />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Avatar;
