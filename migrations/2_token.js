var Token = artifacts.require("./Token.sol");
module.exports = function(deployer) {

  const name = "AuctionToken";
  const rate = 1;
  const decimals = 18;

  deployer.deploy(Token, name, rate, decimals);

};
