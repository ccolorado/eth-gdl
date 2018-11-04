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
      const _new_symbol = "Nn";

      await this.token.mutateToken(_new_name, _new_symbol);

      const name = await this.token.name();
      const symbol = await this.token.symbol();
      name.should.equal(_new_name);
      symbol.should.equal(_new_symbol);

    });

    it("can change its name only once", async function() {

      var _new_name = "New Name";
      var _new_symbol = "Nn";

      await this.token.mutateToken(_new_name, _new_symbol);
      const first_name = await this.token.name();
      const first_symbol = await this.token.symbol();
      first_name.should.equal(_new_name);
      first_symbol.should.equal(_new_symbol);

      _new_name = "Second Name";
      _new_symbol = "SN";
      await this.token.mutateToken(_new_name, _new_symbol)
        .should.be.rejectedWith(EVMRevert);
    });

  });

});
