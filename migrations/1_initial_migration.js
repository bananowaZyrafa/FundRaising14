var Migrations = artifacts.require("./FundRaising14.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
