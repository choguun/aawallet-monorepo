// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.12;

/* solhint-disable avoid-low-level-calls */
/* solhint-disable no-inline-assembly */
/* solhint-disable reason-string */
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockSwap is Ownable {
    constructor() {
    }

    function swap(
        address _from,
        address _to,
        uint256 _amount
    ) external {
        IERC20(_from).transferFrom(msg.sender, address(this), _amount);
        IERC20(_to).transfer(msg.sender, _amount);
    }
}