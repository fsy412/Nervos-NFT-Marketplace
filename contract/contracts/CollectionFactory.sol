// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './ReefRoyalty.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract CollectionFactory is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private collectionId_;

    uint256 price;

    struct collectionInfo {
        address contractAddress;
        string metaDataHash;
        address creator;
    }

    mapping(address => uint256[]) userToContracts;
    mapping(address => uint256) contractToIndex;
    mapping(uint256 => collectionInfo) collectionByIndex;

    event CollectionCreated(address indexed creator, address indexed contractAddress, string indexed metaData);

    constructor(uint256 price_) {
        price = price_;
    }

    function setPrice(uint256 newPrice_) external onlyOwner {
        price = newPrice_;
    }

    function getPrice() external view returns (uint256) {
        return price;
    }

    function retrieveBalance() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function createCollection(
        string calldata name_,
        string calldata symbol_,
        string calldata metaData
    ) external payable {
        require(msg.value >= price, 'ReefRoyalty: Pay the required amount');

        collectionId_.increment();
        ReefRoyalty NFTContract = new ReefRoyalty(name_, symbol_, msg.sender);
        collectionInfo memory Info = collectionInfo(address(NFTContract), metaData, msg.sender);
        userToContracts[msg.sender].push(collectionId_.current());
        collectionByIndex[collectionId_.current()] = Info;
        contractToIndex[address(NFTContract)] = collectionId_.current();
        emit CollectionCreated(msg.sender, address(NFTContract), metaData);
    }

    function editMetaData(address contractAddress, string calldata newHash) external {
        require(contractToIndex[contractAddress] != 0, "Contract doesn't exist in scope of Factory");
        collectionInfo storage Info = collectionByIndex[contractToIndex[contractAddress]];
        require(Info.creator == msg.sender, 'Only creator can edit metaData');
        Info.metaDataHash = newHash;
    }

    function getUserCollections() external view returns (collectionInfo[] memory) {
        uint256 length = userToContracts[msg.sender].length;
        collectionInfo[] memory Info = new collectionInfo[](length);
        for (uint256 i = 0; i < length; i++) {
            Info[i] = collectionByIndex[userToContracts[msg.sender][i]];
        }
        return Info;
    }

    function totalCollections() external view returns (uint256) {
        return collectionId_.current();
    }

    function getCollectionsPaginated(uint256 startIndex, uint256 endIndex) external view returns (collectionInfo[] memory, bool) {
        require(endIndex >= startIndex, 'End Index needs to be greater than or equal to start Index');
        uint256 length = endIndex - startIndex + 1;
        collectionInfo[] memory Info = new collectionInfo[](length);
        uint256 j = 0;
        for (uint256 i = startIndex; i <= endIndex; i++) {
            Info[j] = collectionByIndex[i];
            j++;
        }
        if (endIndex < collectionId_.current()) {
            return (Info, false);
        } else {
            return (Info, true);
        }
    }

    function getCollectionByContract(address contractAddress) external view returns (collectionInfo memory) {
        collectionInfo storage Info = collectionByIndex[contractToIndex[contractAddress]];
        return Info;
    }
}