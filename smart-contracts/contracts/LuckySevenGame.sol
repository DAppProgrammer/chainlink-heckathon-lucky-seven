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

    function buyToken(uint256 _tokenGet) public payable {
        require(
            token.balanceOf(address(this)) >= _tokenGet,
            "insufficient token balance"
        );
        token.transfer(msg.sender, _tokenGet);
    }

    function sellToken(uint256 _token, uint256 _matic) public {
        require(address(this).balance >= _matic, "insufficient matic balance");
        token.approve(address(this), _token);
        require(
            token.transferFrom(msg.sender, address(this), _token),
            "error in transfer from"
        );
        payable(msg.sender).transfer(_matic);
    }
}
