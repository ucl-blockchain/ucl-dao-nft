require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    // defaultNetwork: "goerli",
    networks: {
        hardhat: {
        },
        goerli: {
            url: process.env.RPC,
            accounts: [process.env.PRIVKEY]
        }
    },
    solidity: {
        version: "0.8.17",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000
            }
        }
    }
};
