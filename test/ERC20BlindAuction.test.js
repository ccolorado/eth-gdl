const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();


var Token = artifacts.require('./Token.sol');
var BlindAuction = artifacts.require('./ERC20BlindAuction.sol');

const TokenBuild = require('../build/contracts/Token.json');
const BlinedAuctionBuild = require('../build/contracts/ERC20BlindAuction.json');

contract('ERC20BlindAuction', function([_, auctionOrganizer, bidderA, bidderB, bidderC]) {

  beforeEach(async function () {

    this.name = "AuctionToken";
    this.symbol = "AT";
    this.decimals = 2;

    this.token = await Token.new(this.name, this.symbol, this.decimals);

    this.rate = 200;
    this.wallet = _;

    this.bAuction = await BlindAuction.new(
      this.rate,
      this.wallet,
      this.token.address
    );

    await this.token.transferOwnership(this.bAuction.address);

    this.tokenContract = await web3.eth.contract(TokenBuild['abi'])
      .at(this.token.address);

    this.bAuctionContract = await web3.eth.contract(BlinedAuctionBuild['abi'])
      .at(this.token.address);

    this.value = new web3.BigNumber(web3.toWei(5, 'ether'));

    await this.bAuction.buyTokens(bidderA, {value: this.value, from: bidderA}).should.be.fulfilled;
    await this.bAuction.buyTokens(bidderB, {value: this.value, from: bidderB}).should.be.fulfilled;

    this.auctionId = await this.bAuction.createAuction(2, {from: auctionOrganizer}).should.be.fulfilled;
  });

  describe('Buy Tokens', function() {
    it("Buyer should get 200 tokens per ether", async function() {
      const value = new web3.BigNumber(web3.toWei(1, 'ether'));
      const oldTokenBalance = await this.tokenContract.balanceOf(bidderA).toNumber();
      await this.bAuction.buyTokens(bidderA, {value: value, from: bidderA}).should.be.fulfilled;
      const newTokenBalance = await this.tokenContract.balanceOf(bidderA).toNumber();

      assert.isTrue(newTokenBalance > oldTokenBalance);
      assert.isTrue( oldTokenBalance + 200 == newTokenBalance);
    });

  });

  describe('Create Auction', function() {

    it("Create an Auction", async function() {
      const auctionId = await this.bAuction.createAuction(10).should.be.fulfilled;
    });

    it.only("Should get the Minumum Bidding amount for an auction", async function() {
      const auctionId = await this.bAuction.createAuction(10).should.be.fulfilled;
      console.log(auctionId);
    });

  });

  describe('Bid Actions', function() {
    it("Should be able to bid in an auction", async function () {
      await this.token.approve(this.bAuction.address, 10).should.be.fulfilled;;
      await this.bAuction.bidAuction(1, 10).should.be.fulfilled;;
    });

    it("Should not be able to bid below an auction starting bid", async function () {
      this.bAuction.bidAuction(this.auctionId, 2);
    });

  });

});



