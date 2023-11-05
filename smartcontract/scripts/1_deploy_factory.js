const { ethers } = require("hardhat");

async function main() {
    const SimpleAccountFactory = await ethers.getContractFactory("SimpleAccountFactory");
    const simpleFactory = await SimpleAccountFactory.deploy('0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'); // Entry point contract
    // https://docs.stackup.sh/docs/entity-addresses
    await simpleFactory.deployed();
  
    console.log("Simple Factory address:", simpleFactory.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });