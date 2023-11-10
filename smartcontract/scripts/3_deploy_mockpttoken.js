const { ethers } = require("hardhat");

async function main() {
    const MockSwap = await ethers.getContractFactory("MockSwap");
    const mockSwap = await MockSwap.deploy();
    await mockSwap.deployed();

    console.log("Mock Swap address:", mockSwap.address);

    const MockERC20Token = await ethers.getContractFactory("MockERC20Token");
    const mockERC20Token = await MockERC20Token.deploy('PT Stargate USDT 27JUN2024', 'PT Stargate USDT 27JUN2024', mockSwap.address); // Entry point contract
    await mockERC20Token.deployed();

    console.log("Mock ERC20 Token address:", mockERC20Token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });