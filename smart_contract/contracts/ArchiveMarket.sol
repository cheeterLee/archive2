// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct NFTListing {
    uint price;
    address seller;
}

contract ArchiveMarket is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    Counters.Counter private _tokenIds;
    mapping(uint256 => NFTListing) private _listings;

    event NFTTransfer(
        uint256 tokenId,
        address from,
        address to,
        string tokenURI,
        uint256 price
    );
    
    constructor() ERC721("Archive's NFTs", "ANFT") {}

    // create nft
    function createNFT(string calldata tokenURI) public {
        _tokenIds.increment();
        uint256 currentId = _tokenIds.current();
        _safeMint(msg.sender, currentId);
        _setTokenURI(currentId, tokenURI);
        emit NFTTransfer(currentId, address(0), msg.sender, tokenURI, 0);
    }

    // list nft for sale
    function listNFT(uint256 tokenId, uint256 price) public {
        require(price > 0, "ArchiveMarket: Price must be greater than 0");
        approve(address(this), tokenId);
        transferFrom(msg.sender, address(this), tokenId);
        _listings[tokenId] = NFTListing(price, msg.sender);
        emit NFTTransfer(tokenId, msg.sender, address(this), '', price);
    }

    // cancel listing the nft
    function cancelListing(uint256 tokenId) public {
        NFTListing memory listing = _listings[tokenId];
        require(listing.price > 0, "ArvhiveMarket: NFT is not listed for sale");
        require(listing.seller == msg.sender, "ArchiveMarket: You are not the seller");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenId);
        clearListing(tokenId);
        emit NFTTransfer(tokenId, address(this), msg.sender, "", 0);
    }

    // purchase nft
    function purchaseNFT(uint256 tokenId) public payable {
        NFTListing memory listing = _listings[tokenId];
        require(listing.price > 0, 'ArchiveMarket: NFT is not listed for sale');
        require(msg.value == listing.price, 'ArchiveMarket: Incorrect Price');
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenId);
        clearListing(tokenId);
        payable(listing.seller).transfer(listing.price.mul(98).div(100));
        emit NFTTransfer(tokenId, address(this), msg.sender, "", 0);
    }

    // withdraw funds
    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "ArchiveMarket: balance is zero");
        payable(msg.sender).transfer(balance);
    }

    // clear listing helper function
    function clearListing(uint256 tokenId) private {
        _listings[tokenId].price = 0;
        _listings[tokenId].seller = address(0);
    }
}
