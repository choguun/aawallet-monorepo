const { ethers } = require("hardhat");

async function main() {
    const SimpleAccount = await ethers.getContractFactory("SimpleAccount");
    const simpleAccount = await SimpleAccount.deploy('0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'); // Entry point contract
    // https://docs.stackup.sh/docs/entity-addresses
    await simpleAccount.deployed();
  
    console.log("Simple Account address:", simpleAccount.address);

    const [owner] = await ethers.getSigners();

    // console.log('send Ether to contract');

    // const transactionHash = await owner.sendTransaction({
    //     to: simpleAccount.address,
    //     value: ethers.utils.parseEther("0.01"), // Sends exactly 1.0 ether
    // });

    // console.log("Transaction hash:", transactionHash);

    // const result = await simpleAccount.supply();
    // console.log("Simple Account supply:", result);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });