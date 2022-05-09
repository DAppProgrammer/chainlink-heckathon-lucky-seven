import React, { useState, useEffect } from "react";
// Installation: https://github.com/alchemyplatform/alchemy-web3

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-ropsten.alchemyapi.io/v2/-T5dg-en08fCxb3PqWITQgKJKlKD6THL"
);

const UserNFTs = () => {
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    return async () => {
      const nfts = await web3.alchemy.getNfts({
        owner: "0xb987fD1382e62Fce2D547a771e336Ac97Aa9F78C",
      });
      setCollection(nfts);
    };
  }, []);

  console.table("COLLECTION:", collection.ownedNfts[0].metadata);
};

export default UserNFTs;
