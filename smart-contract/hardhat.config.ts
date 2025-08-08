import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // for testnet
    "basecamp": {
      url: "https://rpc-campnetwork.xyz/",
      accounts: [process.env.PRIVATE_KEY!],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "basecamp":"6H7P3CUDGNB8P9YXK8JBH3IX57R6MZJZDX",
    },
    customChains: [
      {
        network: "basecamp",
        chainId: 123420001114,
        urls: {
          apiURL: "https://basecamp.cloud.blockscout.com/api",
          browserURL: "https://basecamp.cloud.blockscout.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;