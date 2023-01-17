// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

struct NFTListing {
    uint price;
    address seller;
}

contract ArchiveMarket is ERC721URIStorage {
    using Counters for Counters.Counter;
    // using SafeMath for uint256;
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

    function createNFT(string calldata tokenURI) public {
        _tokenIds.increment();
        uint256 currentId = _tokenIds.current();
        _safeMint(msg.sender, currentId);
        _setTokenURI(currentId, tokenURI);
        emit NFTTransfer(currentId, address(0), msg.sender, tokenURI, 0);
    }
}
