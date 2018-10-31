const BigNumber = web3.BigNumber;
const Token = artifacts.require('Token');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
    .should();

contract('Token', function(accounts) {
  const _name = "tokenName";
  const _symbol = 'PT';

  beforeEach(async function() {
    this.token = await Token.new();
  });

  describe('token attributes', function() {

    it("has the name 'tokenName'", async function() {
      const name = await this.token.name();
      name.should.equal('tokenName');
    });

    it("has the symbol 'TN'", async function() {
      const symbol = await this.token.symbol();
      symbol.should.equal('TN');
    });

  });

  describe('Token Mutability', function () {

    it("can change its name", async function() {

      const _new_name = "New Name";
      const _new_symbol = "NS";

      const x = await this.token.mutateToken(_new_name, _new_symbol);
      // console.log(x);

      const name = await this.token.name();
      const symbol = await this.token.symbol();

      name.should.equal(_new_name);
      symbol.should.equal(_new_symbol);

    });

  });

});
