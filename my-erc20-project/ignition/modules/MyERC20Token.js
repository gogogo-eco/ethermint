const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MyERC20TokenModule", (m) => {
  const tokenName = m.getParameter("tokenName", "DataCoinERC");
  const tokenSymbol = m.getParameter("tokenSymbol", "ERC");
  const initialSupply = m.getParameter("initialSupply", 1000000);
  const initialOwner = m.getParameter("initialOwner", "0xF84BD550Fdd90A2C8e5e7091952EEAe708a1f6DA");
  // 0x0EB68F01bc43Fa05e687E6b310191d0b6E912Fc1 is the wallet that receives the first token when initialized
  // 0xF84BD550Fdd90A2C8e5e7091952EEAe708a1f6DA -> ethermintd debug addr $(ethermintd keys show mykey -a --keyring-backend test)-> Address (EIP-55)
  const token = m.contract("MyERC20Token", [
    tokenName,
    tokenSymbol,
    initialSupply,
    initialOwner
  ]);

  return { token };
});