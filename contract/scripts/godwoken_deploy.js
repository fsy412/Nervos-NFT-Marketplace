const Web3 = require('web3');
const web3 = new Web3('https://godwoken-testnet-v1.ckbapp.dev');
const DEPLOYER_PRIVATE_KEY = '43cde662689acde2dfb0519fdbe3892168b58e0a273176b0e5483d994c16bcff'; // Replace this with your Ethereum private key with funds on Layer 2.
const deployerAccount = web3.eth.accounts.wallet.add(DEPLOYER_PRIVATE_KEY);
var MarketPlace = require('../artifacts/contracts/MarketPlace.sol/MarketPlace.json')
var CollectionFactory = require('../artifacts/contracts/CollectionFactory.sol/CollectionFactory.json')

async function deployMarket(){
    const deployTx = new web3.eth.Contract(MarketPlace.abi).deploy({
        data: MarketPlace.bytecode,
        arguments: []
    }).send({
        from: deployerAccount.address,
        gas: 6000000,
    });

    deployTx.on('transactionHash', hash => console.log(`Transaction hash: ${hash}`));
    const contract = await deployTx;
    console.log(`Deployed MarketPlace address: ${contract.options.address}`);
}

async function deployCollectionFactory(){
    const deployTx = new web3.eth.Contract(CollectionFactory.abi).deploy({
        data: CollectionFactory.bytecode,
        arguments: [10]
    }).send({
        from: deployerAccount.address,
        gas: 6000000,
    });

    deployTx.on('transactionHash', hash => console.log(`Transaction hash: ${hash}`));
    const contract = await deployTx;
    console.log(`Deployed CollectionFactory address: ${contract.options.address}`);
}

(async () => {
    console.log('1111')
    const balance = BigInt(await web3.eth.getBalance(deployerAccount.address));

    if (balance === 0n) {
        console.log(`Insufficient balance. Can't deploy contract. Please deposit funds to your Ethereum address: ${deployerAccount.address}`);
        return;
    }

    console.log(`Deploying contract...`);
    await deployMarket();


    await deployCollectionFactory();
})();
