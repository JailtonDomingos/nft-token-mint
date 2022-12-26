const NftTokenMint = artifacts.require("NftTokenMint");

module.exports = function (deployer) {
  deployer.deploy(NftTokenMint);
};