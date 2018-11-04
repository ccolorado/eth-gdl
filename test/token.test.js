const BigNumber = web3.BigNumber;
const Token = artifacts.require('Token');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
    .should();

contract('Token', function(accounts) {
  const _name = "AuctionToken";
  const _symbol = 'AT';
  const _decimals= 18;

  beforeEach(async function() {
    this.token = await Token.new(_name , _symbol , _decimals);
  });

  describe('token attributes', function() {

    it("has the name 'AuctionToken'", async function() {
      const name = await this.token.name();
      name.should.equal('AuctionToken');
    });

    it("has the symbol 'AT'", async function() {
      const symbol = await this.token.symbol();
      symbol.should.equal('AT');
    });

  });

});
