// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20Token is ERC20 {
  
    constructor(
        string memory _name,
        string memory _symbol,
        address _swap
    ) ERC20(_name, _symbol) {
       _mint(_swap, 1000000 * 10 ** 6);
    }
  
    function decimals() public pure override returns (uint8) {
        return 6;
    }
}
