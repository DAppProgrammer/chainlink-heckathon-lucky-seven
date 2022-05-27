# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat run scripts/deploy.js --network mumbai
npx hardhat help
```

PriceConsumerV3 deployed to: 0x8203a50665aa6F04f894933aeFE9BdD3793A8c0e
VRFv2Consumer deployed to: 0xC6Bd653b99a370fCD357E3d6C4Aca4281d443Bf7
GameToken deployed to: 0x33B803A9b97cd91cA45FA8572599dC3EC03A6195

LuckySevenGame deployed to: 0x2456133E7152dD29A11eDa8810fB1c3ceaAe4745
LuckySevenGame deployed to: 0xD773d292aC10195C9979b57E52BEc736adcc7b6B
LuckySevenGame deployed to: 0x9ECbC2250BA1dA1F8aA5B10214db3982A970F1Ee
LuckySevenGame deployed to: 0x81f6746A89129aa800654DEeE60E0419F3EE8B4e
LuckySevenGame deployed to: 0xF30bef80529783D6D3B664FA83888689b5C6c4B0

Verify your contract using hardhat:

npx hardhat verify 0x8203a50665aa6F04f894933aeFE9BdD3793A8c0e --network mumbai

npx hardhat verify 0xC6Bd653b99a370fCD357E3d6C4Aca4281d443Bf7 240 --network mumbai

npx hardhat verify 0x33B803A9b97cd91cA45FA8572599dC3EC03A6195 Lucky7 L7 --network mumbai --contract contracts/GameToken.sol:GameToken

npx hardhat verify 0xF2a914DcAd185866d451C87C3268855f1590B8E1 0x33B803A9b97cd91cA45FA8572599dC3EC03A6195 --network mumbai --contract contracts/LuckySevenGame.sol:LuckySevenGame

Successfully verified contract PriceConsumerV3 on Etherscan.

https://mumbai.polygonscan.com/address/0x8203a50665aa6F04f894933aeFE9BdD3793A8c0e#code

https://mumbai.polygonscan.com/address/0xC6Bd653b99a370fCD357E3d6C4Aca4281d443Bf7#code


Successfully verified contract GameToken on Etherscan.
https://mumbai.polygonscan.com/address/0x33B803A9b97cd91cA45FA8572599dC3EC03A6195#code

Successfully verified contract LuckySevenGame on Etherscan.
https://mumbai.polygonscan.com/address/0xF2a914DcAd185866d451C87C3268855f1590B8E1#code
