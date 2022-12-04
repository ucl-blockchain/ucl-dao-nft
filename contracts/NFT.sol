// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";

contract NFT is ERC721A {
    uint public immutable maxSupply;
    constructor(uint _totalSupply) ERC721A("NFT_TESTING_1", "NFT1") {
        maxSupply = _maxSupply;
    }
    
    function airdrop(address[] memory _recipients) external payable {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        uint length = _recipients.length;
        require(totalSupply() + recipients.length <= maxSupply, "Max supply reached")
        for (uint i=0; i<length; i++) {
            address to = _recipients[i];
            require(to != address(0), "Can't mint to zero address")
            _safeMint(to, 1);
        } // To do: add events
    }
}
