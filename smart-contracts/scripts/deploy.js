const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  // const PriceConsumerV3 = await hre.ethers.getContractFactory("PriceConsumerV3");
  // const priceConsumerV3 = await PriceConsumerV3.deploy();
  // await priceConsumerV3.deployed();
  // console.log("PriceConsumerV3 deployed to:", priceConsumerV3.address);

  // const GameToken = await hre.ethers.getContractFactory("GameToken");
  // const gameToken = await GameToken.deploy("LuckySeven", "L7");
  // await gameToken.deployed();
  // console.log("GameToken deployed to:", gameToken.address);

  const LuckySevenGame = await hre.ethers.getContractFactory("LuckySevenGame");
  const l7Game = await LuckySevenGame.deploy(
    "0x33b803a9b97cd91ca45fa8572599dc3ec03a6195"
  );
  await l7Game.deployed();
  console.log("LuckySevenGame deployed to:", l7Game.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
