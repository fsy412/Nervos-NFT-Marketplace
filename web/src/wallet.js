import Web3 from 'web3';
import store from './store';
const web3 = new Web3(window.web3.currentProvider);

let walletGlobal = {
    account: "",
}

const networks = {
    GodwokenTest: {
        chainId: `0x${Number(868455272153094).toString(16)}`,
        chainName: "Godwoken Testnet",
        nativeCurrency: {
            name: "ckETH",
            symbol: "ckETH",
            decimals: 18
        },
        rpcUrls: ["https://godwoken-testnet-web3-v1-rpc.ckbapp.dev/"],
        blockExplorerUrls: ["https://v1.aggron.gwscan.com/"]
    },
}

async function connect() {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
    // check network    
    let chainId = await web3.eth.getChainId();
    if (chainId != networks['GodwokenTest'].chainId) {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    ...networks['GodwokenTest']
                }
            ]
        });
        location.reload()
    }
    // get account
    const accounts = await web3.eth.getAccounts()
    walletGlobal.account = accounts[0]
    window.ethereum.on("accountsChanged", async ([selectedAccount]) => {
        const accounts = await web3.eth.getAccounts();
        console.log("accountsChanged", accounts)
        walletGlobal.account = accounts[0]
        store.dispatch('updateLoginAccount', { account: walletGlobal.account })
    });
}

export default function UseWallet() {
    return {
        connect,
        web3,
        walletGlobal,
    }
}