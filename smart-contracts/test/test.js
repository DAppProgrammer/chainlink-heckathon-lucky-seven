const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PriceConsumerV3", function () {
  it("Should deploy PriceConsumerV3", async function () {
    const PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3");
    const priceConsumerV3 = await PriceConsumerV3.deploy();
    await priceConsumerV3.deployed();
  });
});

describe("LuckySevenGame", function () {
  it("Should deploy LuckySevenGame", async function () {
    const LuckySevenGame = await ethers.getContractFactory("LuckySevenGame");
    const l7Game = await LuckySevenGame.deploy(240);
    await l7Game.deployed();
  });
});
