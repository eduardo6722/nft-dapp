//// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    function mint(
        address recipient,
        string memory tokenURI
    ) public returns (uint) {
        uint tokenId = _tokenIds.current();
        _mint(recipient, tokenId);
        _tokenIds.increment();
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }
}
