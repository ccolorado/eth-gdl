pragma solidity ^0.4.25;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";


contract Token is ERC20, ERC20Mintable, ERC20Pausable, Ownable{

  string name;
  string symbol;

  constructor() public {
    name = "tokenName";
    symbol = "TN";
  }

}
