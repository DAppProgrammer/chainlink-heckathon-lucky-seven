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

export default switchNetwork;
