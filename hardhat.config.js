/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const { RPC_URL, PRIVATE_KEY, API_KEY } = process.env;

module.exports = {
  solidity: {
    compilers: [
      { version: "0.5.16" },
      { version: "0.6.6" },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 100
      },
    },
  },
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    }
    // sourcify: {
    //   enabled: true,
    // },
  },
  etherscan: {
    apiKey: {
      sepolia: API_KEY,
    },
  },
};