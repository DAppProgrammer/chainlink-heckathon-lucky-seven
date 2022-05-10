import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";

// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { useNetwork, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-ropsten.alchemyapi.io/v2/-T5dg-en08fCxb3PqWITQgKJKlKD6THL"
);

const Avatar = () => {
  const [collection, setCollection] = useState([]);
  const address = useAddress();

  useEffect(() => {
    (async () => {
      const nfts = await web3.alchemy.getNfts({
        owner: `${address}`,
      });
      setCollection(nfts);
    })();
  }, [address]);
  console.log(collection);
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
