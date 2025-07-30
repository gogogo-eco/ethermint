require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ethermint: {
      url: "http://127.0.0.1:8545", // Ethermint JSON-RPC endpoint
      chainId: 9000, // Chain ID từ init.sh
      accounts: [
        // ethermintd keys unsafe-export-eth-key mykey --keyring-backend test
        "EA4F6A9FD1BF21A46ED577A56235F59C03AC7209FC050E039CF9A529DFCC3A78"
      ],
      gas: 20000000,
      gasPrice: 1000000000
    },
    localhost: {
      url: "http://127.0.0.1:9545",
      chainId: 31337
    }
  }
};
