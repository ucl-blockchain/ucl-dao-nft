// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

contract NFT is ERC721A, Ownable {
    // TODO: ADD COMMENTS
    uint public immutable maxSupply;
    string public baseURI;
    string public contractURI;

    event ContractURIChanged(
        address sender,
        string newContractURI
    );

    event BaseURIChanged (
        address sender,
        string newBaseURI
    );

    event Airdropped (
        address recipient,
        address sender,
        uint amount
    );

    constructor(uint _maxSupply, string memory _baseURI, string memory _contractURI) ERC721A("NFT_TESTING_1", "NFT1") {
        maxSupply = _maxSupply;
        baseURI = _baseURI;
        contractURI = _contractURI;
    }

    function setBaseURI(string calldata _newBaseURI) public onlyOwner{
        baseURI = _newBaseURI;
        emit BaseURIChanged(msg.sender, _newBaseURI);
    }

    function setContractURI(string calldata _newContractURI) public onlyOwner{
        contractURI = _newContractURI;
        emit ContractURIChanged(msg.sender, _newContractURI);
    }

    function airdrop(address[] calldata _recipients) external payable onlyOwner {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        require(totalSupply() + _recipients.length <= maxSupply, "Max supply reached");
        for (uint i=0; i<_recipients.length; i++) {
            address to = _recipients[i];
            require(to != address(0), "Can't mint to zero address");
            _safeMint(to, 1);
            emit Airdropped(to, msg.sender, 1);
        }
    }
}
