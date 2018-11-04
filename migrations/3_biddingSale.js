var Token = artifacts.require('./Token.sol');
var BlindBidding = artifacts.require('./ERC20BlindAuction.sol');

const ether = (n) => new web3.BigNumber(web3.toWei(n, 'ether'));

module.exports = async function(deployer) {

  const name = "AuctionToken";
  const rate = 1;
  const decimals = 18;

  await deployer.deploy(Token, name, rate, decimals);
  const deployedToken = await Token.deployed();

  const _rate = 200;
  const _wallet = deployer;
  const _token = deployedToken.address;

  await deployer.deploy(
    _rate,
    _wallet,
    _token
  );
}
