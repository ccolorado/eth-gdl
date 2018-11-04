pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";


contract Token is ERC20, ERC20Mintable, ERC20Pausable, Ownable{

  string public name;
  string public symbol;
  bool private canChange;

  constructor() public {
    name = "tokenName";
    symbol = "TN";
    canChange = true;
  }

  modifier changable() {
    require( canChange , "Token is not changable");
    _;
  }

  function mutateToken(string _name, string _symbol) onlyOwner changable public {
    name = _name;
    symbol = _symbol;
    canChange = false;
  }

}
