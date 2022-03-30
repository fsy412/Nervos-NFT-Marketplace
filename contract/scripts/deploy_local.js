const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const CollectionFactory = await hre.ethers.getContractFactory("CollectionFactory");
  const collectionFactory = await CollectionFactory.deploy(10);
  await collectionFactory.deployed();
  console.log("collectionFactory deployed to:", collectionFactory.address);

  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
  const marketPlace = await MarketPlace.deploy();
  await marketPlace.deployed();
  console.log("marketPlace deployed to:", marketPlace.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
