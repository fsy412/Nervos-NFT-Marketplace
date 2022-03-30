import Web3 from 'web3';
import { CONFIG } from "./config"
import CollectionFactory from "../../contract/artifacts/contracts/CollectionFactory.sol/CollectionFactory.json"
import NFT from "../../contract/artifacts/contracts/ReefRoyalty.sol/ReefRoyalty.json"
import Market from "../../contract/artifacts/contracts/MarketPlace.sol/MarketPlace.json"

const web3 = new Web3(window.web3.currentProvider);

async function mint(account, metadata, royaltyPercentage, contractAddress) {
    let nftContract = new web3.eth.Contract(NFT.abi, contractAddress)
    await nftContract.methods.mint(metadata, royaltyPercentage).send({
        from: account,
    })
}

async function tokenURI(tokenID, contractAddress) {
    let nftContract = new web3.eth.Contract(NFT.abi, contractAddress)
    const result = await nftContract.methods.tokenURI(tokenID).call()
    return result;
}

async function totalSupply(contractAddress) {
    const nftContract = new web3.eth.Contract(NFT.abi, contractAddress);
    const result = await nftContract.methods.totalSupply().call();
    return result;
}

async function tokenOfOwnerByIndex(ownerAddress, index, contractAddress) {
    const nftContract = new web3.eth.Contract(NFT.abi, contractAddress);
    const result = await nftContract.methods.tokenOfOwnerByIndex(ownerAddress, index).call();
    console.log("tokenOfOwnerByIndex", result);
    return result;
}

async function tokenByIndex(index, contractAddress) {
    const nftContract = new web3.eth.Contract(NFT.abi, contractAddress);
    const result = await nftContract.methods.tokenByIndex(index).call();
    console.log("tokenByIndex", result);
    return result;
}

async function setApprovalForAll(account, bool, contractAddress) {
    let nftContract = new web3.eth.Contract(NFT.abi, contractAddress)
    await nftContract.methods.setApprovalForAll(CONFIG.MarketPlace, bool).send({
        from: account,
    })
}

async function isApprovedForAll(userAddress, contractAddress) {
    let nftContract = new web3.eth.Contract(NFT.abi, contractAddress)
    const result = await nftContract.methods.isApprovedForAll(userAddress, CONFIG.MarketPlace).call()
    return result;
}

async function getCollection(startIndex, endIndex) {
    let contact = new web3.eth.Contract(CollectionFactory.abi, CONFIG.CollectionFactory)
    let result = await contact.methods.getCollectionsPaginated(startIndex, endIndex).call()
    console.log(result);
    return result;
}

async function totalCollections() {
    const factoryContract = new web3.eth.Contract(CollectionFactory.abi, CONFIG.CollectionFactory);
    const result = await factoryContract.methods.totalCollections().call()
    return result;
}

async function createCollection(account, name, symbol, metadata, creationValue) {
    const factoryContract = new web3.eth.Contract(CollectionFactory.abi, CONFIG.CollectionFactory);
    let tx = await factoryContract.methods.createCollection(name, symbol, metadata).send({
        from: account,
        value: creationValue
    })
    return tx
}

async function getCollections(startIndex, endIndex) {
    let factoryContract = new web3.eth.Contract(CollectionFactory.abi, CONFIG.CollectionFactory)
    const result = await factoryContract.methods.getCollectionsPaginated(startIndex, endIndex).call()
    return result;
}

async function getUserCollections(account) {
    let factoryContract = new web3.eth.Contract(CollectionFactory.abi, CONFIG.CollectionFactory)
    const result = await factoryContract.methods.getUserCollections().call({ from: account })
    return result;
}

async function createMarketItem(account, NFTContractAddress, tokenID, price) {
    const etherPrice = web3.utils.toWei(price, 'ether');
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    return await marketPlaceContract.methods.createMarketItem(NFTContractAddress, tokenID, etherPrice).send({
        from: account,
    });
}

async function createMarketAuction(account, NFTContractAddress, tokenId, floorPrice, auctionDays) {
    const etherPrice = web3.utils.toWei(floorPrice, 'ether');
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    return await marketPlaceContract.methods.createMarketAuction(NFTContractAddress, tokenId, etherPrice, auctionDays).send({ from: account })
}

async function fetchMarketItems() {
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    const result = await marketPlaceContract.methods.fetchMarketItems().call();
    return result;
}

async function fetchItemsCreated(account) {
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    const result = await marketPlaceContract.methods.fetchItemsCreated().call({
        from: account
    })
    return result;
}

async function buyNFT(account, NFTContractAddress, itemId, nftPrice) {
    const etherPrice = web3.utils.toWei(nftPrice, 'ether');
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    return await marketPlaceContract.methods.createMarketSale(NFTContractAddress, itemId).send({
        from: account,
        value: etherPrice
    })
}

async function createAuctionBid(account, itemId, bidAmount) {
    const etherPrice = web3.utils.toWei(bidAmount, 'ether');
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    return await marketPlaceContract.methods.createAuctionBid(itemId).send({
        from: account,
        value: etherPrice
    })
}

async function fetchMyNFT(account) {
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    const result = await marketPlaceContract.methods.fetchMyNFTs().call({
        from: account
    });
    return result;
}

async function fetchUserBids(account) {
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    const result = await marketPlaceContract.fetchUserBids().call({ from: account });
    console.log(result);
    return result
}

async function getCollectionByContract(nftContract) {
    console.log('getCollectionByContract', nftContract)
    const factoryContract = new web3.eth.Contract(CollectionFactory.abi, CONFIG.CollectionFactory);
    const result = await factoryContract.methods.getCollectionByContract(nftContract).call({
        // from: account
    });
    return result;
}

async function unlistItem(account,itemId) {
    const marketPlaceContract = new web3.eth.Contract(Market.abi, CONFIG.MarketPlace);
    return await marketPlaceContract.methods.unlistItem(itemId).send({
        from: account,
    })
}

export {
    createCollection,
    totalCollections,
    mint,
    getCollection,
    getCollections,
    getUserCollections,
    totalSupply,
    tokenURI,
    tokenOfOwnerByIndex,
    setApprovalForAll,
    isApprovedForAll,
    createMarketItem,
    fetchMarketItems,
    tokenByIndex,
    createAuctionBid,
    buyNFT,
    fetchMyNFT,
    fetchItemsCreated,
    createMarketAuction,
    getCollectionByContract,
    unlistItem,
};  