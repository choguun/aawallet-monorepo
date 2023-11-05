require("@typechain/hardhat");
// require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */

import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // other networks
    truffledashboard: {
      url: "http://localhost:24012/rpc"
    },
    mumbai: {
      url: process.env.RPC_URL!,
      accounts: [process.env.KEY!]
    }
  },
  etherscan: {
    apiKey: process.env.API_KEY
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  }
};
