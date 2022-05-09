import React, { useState, useEffect, useLayoutEffect } from "react";
import Image from "next/image";

// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { useNetwork, useAddress } from "@thirdweb-dev/react";

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

  return (
    <>
      {collection.totalCount > 0 ? (
        <div className="w-16 px-3 text-1xl sm:text-2xl p-1">
          <img
            src={collection.ownedNfts[collection.totalCount - 1].metadata.image}
            alt={""}
            className="w-fit rounded-full"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Avatar;
