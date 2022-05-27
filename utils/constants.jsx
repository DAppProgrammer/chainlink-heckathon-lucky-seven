// export const providerUrl =
//   "https://polygon-mumbai.g.alchemy.com/v2/5HrNssAeU63CgNZ-8Dle6BX0a7PbrcrJ";

export const providerUrl =
  "https://polygon-mumbai.infura.io/v3/3d90d3d4b59845da80d1e51e30205521";

import priceConsumerV3Artifacts from "../artifacts/contracts/PriceConsumerV3.sol/PriceConsumerV3.json";
export const priceConsumerV3Abi = priceConsumerV3Artifacts.abi;
export const priceConsumerV3Address =
  "0x28880B24D45bf663D344b899f4ac66B210BBaF51";

import gameTokenArtifacts from "../artifacts/contracts/GameToken.sol/GameToken.json";
export const gameTokenAbi = gameTokenArtifacts.abi;
export const gameTokenAddress = "0x33B803A9b97cd91cA45FA8572599dC3EC03A6195";

import luckySevenGameArtifacts from "../artifacts/contracts/LuckySevenGame.sol/LuckySevenGame.json";
export const luckySevenGameAbi = luckySevenGameArtifacts.abi;
export const luckySevenGameAddress =
  "0xF2a914DcAd185866d451C87C3268855f1590B8E1";
