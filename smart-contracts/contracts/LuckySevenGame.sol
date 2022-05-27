// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./GameToken.sol";

contract LuckySevenGame {
    GameToken token;

    constructor(address _token) {
        token = GameToken(_token);
    }

    function transfer(uint256 amt) external {
        require(token.balanceOf(address(this)) >= amt);
        token.transfer(msg.sender, amt);
    }

    function transferFrom(uint256 amt) external {
        require(token.balanceOf(msg.sender) >= amt);
        token.transferFrom(msg.sender, address(this), amt);
    }
}
