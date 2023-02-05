// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

/// @title UCL Blockchain Labs NFT
/// @author UCL Blockchain Labs Division
/// @notice ERC721 NFT with additional airdrop functionality
/// @inheritdoc ERC721A
contract NFT is ERC721A, Ownable {
    uint256 public immutable maxSupply;
    string public baseURI;
    string public contractURI;

    event ContractURIChanged(address sender, string newContractURI);

    event BaseURIChanged(address sender, string newBaseURI);

    event Airdropped(address recipient, address sender, uint256 amount);

    constructor(
        uint256 _maxSupply,
        string memory _baseURI,
        string memory _contractURI
    ) ERC721A("NFT_TESTING_1", "NFT1") {
        maxSupply = _maxSupply;
        baseURI = _baseURI;
        contractURI = _contractURI;
    }

    /// @notice Update baseURI of NFT
    /// @param _newBaseURI New baseURI
    function setBaseURI(string calldata _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
        emit BaseURIChanged(msg.sender, _newBaseURI);
    }

    /// @notice Update contractURI/NFT metadata
    /// @param _newContractURI New metadata
    function setContractURI(string calldata _newContractURI) public onlyOwner {
        contractURI = _newContractURI;
        emit ContractURIChanged(msg.sender, _newContractURI);
    }

    /// @notice Airdrop nft to given addresses
    /// @param _recipients Array of addresses to airdrop nft to
    function airdrop(address[] calldata _recipients)
        external
        payable
        onlyOwner
    {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        require(
            totalSupply() + _recipients.length <= maxSupply,
            "Max supply reached"
        );
        for (uint256 i = 0; i < _recipients.length; i++) {
            address to = _recipients[i];
            require(to != address(0), "Can't mint to zero address");
            _safeMint(to, 1);
            emit Airdropped(to, msg.sender, 1);
        }
    }

    /// @notice Return baseURI
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        string memory uri = super.tokenURI(tokenId);
        return
            bytes(uri).length > 0 ? string(abi.encodePacked(uri, ".json")) : "";
    }

    /// @return _ownershipOf Return address of owner of NFT with given tokenID
    /// @param tokenId The token id to check ownership of.
    function getOwnershipData(uint256 tokenId)
        external
        view
        returns (TokenOwnership memory)
    {
        return _ownershipOf(tokenId);
    }
}
