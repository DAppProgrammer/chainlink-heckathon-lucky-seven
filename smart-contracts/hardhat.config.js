require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
const {
  PROJECT_ID,
  PRIVATE_KEYS,
  ETHERSCAN_KEY,
  POLYGONSCAN_KEY,
  ALCHEMY_MUMBAI_URL
} = process.env;

module.exports = {
  solidity: "0.8.7",
  networks: {
    hardhat: { chainId: 1337 },
    // ropsten: {
    //   url: `https://ropsten.infura.io/v3/${PROJECT_ID}`,
    //   accounts: PRIVATE_KEYS.split(",")
    // },
    mumbai: {
      // url: `https://polygon-mumbai.infura.io/v3/${PROJECT_ID}`,
      url: ALCHEMY_MUMBAI_URL,
      accounts: PRIVATE_KEYS.split(",")
    }
  },
  paths: {
    artifacts: "../artifacts"
  },
  etherscan: {
    apiKey: POLYGONSCAN_KEY
  }
};
