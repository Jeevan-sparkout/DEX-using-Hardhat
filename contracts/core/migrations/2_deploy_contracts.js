const Factory = artifacts.require("BX_Factory.sol");

module.exports = async function (deployer, network, addresses) {
  await deployer.deploy(Factory, addresses[0]);
};
