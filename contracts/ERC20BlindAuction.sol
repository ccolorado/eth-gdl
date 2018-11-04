pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";

contract ERC20BlindAuction  is Crowdsale, MintedCrowdsale {

  struct Auction {
    address owner;
    uint256 maxBid;
    uint256 startingBid;
    address[] participants;
    mapping(address => uint256) position; // Bidder participants[] index
    mapping(address => uint256) biddingBalance; // Bidding Balance
    bool isOpen;
  }

  Auction[] auctions;
  mapping (address => uint256) balanceOf;

  constructor(
    uint256 _rate,
    address _wallet,
    ERC20 _token
  )
  Crowdsale(_rate, _wallet, _token)
  public
  {
  }

  modifier auctionIsOpen(uint256 _auctionId) {
    require(auctions[_auctionId].isOpen, "Auction is not open or does not exists");
    _;
  }

  modifier hasBidEnought(uint256 _auctionId, uint256 _amount) {
    uint256 bidded = auctions[_auctionId].biddingBalance[msg.sender];
    uint256 bidding = _amount;
    require( bidded + bidding >= auctions[_auctionId].startingBid, "Bid does not cover the minimum bid" );
    _;
  }

  event logInt(string message, uint256 value);
  event logString(string message, uint256 value);
  event logAddress(string message, address value);

  function _getTokenAmount(uint _weiAmount)
    internal view returns (uint256)
  {
    return _weiAmount.mul(rate).div(1 ether);
  }

  /*
   * @dev Crates a new auction
   * @param _startingBid Minimum amount of tokens to participate on bidding
   * @return uint256 Auction number id
   */
  function createAuction(uint256 _startingBid) public returns (uint256) {
    require(_startingBid > 0, "Starting bid has to be Greater than 0");
    Auction memory newAuction;
    newAuction.owner = msg.sender;
    newAuction.startingBid = _startingBid;
    newAuction.maxBid = 0;
    newAuction.isOpen = true;
    auctions.push(newAuction);
    return auctions.length;
  }

  function getBidMinumiumAuction(uint256 _auctionId) public view returns(uint256) {
    return auctions[_auctionId].startingBid;
  }

  function bidAuction(uint256 _auctionId, uint256 _amount)
    auctionIsOpen(_auctionId)
    hasBidEnought(_auctionId, _amount)
  public returns (bool){

    if( _amount > auctions[_auctionId].maxBid ){
      auctions[_auctionId].maxBid = _amount;
    }
    uint256 temp = auctions[_auctionId].biddingBalance[msg.sender] += _amount;
  }

}
