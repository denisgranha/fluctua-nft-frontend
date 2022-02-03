import Fortmatic from 'fortmatic';
import { ethers } from "ethers";
  

// Request user login if needed, returns current user account address
// provider.provider.enable();

const customNodeOptions = {
    rpcUrl: process.env.REACT_APP_NODE_URL, // your own node url
    chainId: process.env.REACT_APP_CHAIN_ID
}
  
const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC_API_KEY, customNodeOptions);
const provider = new ethers.providers.Web3Provider(fm.getProvider())

const login = async () => {

    let coinbase; // Main account
    // If account already in localstorage, don't request it.
    coinbase = localStorage.getItem("coinbase")

    if(!coinbase){
        const accounts = await provider.provider.enable();
        coinbase = accounts[0]
        // Save in localstorage
        localStorage.setItem("coinbase", coinbase)
    }

    return coinbase;
}

const logout = () => {
    localStorage.removeItem("coinbase")
}

const signEmailAndSpotify = async ({email, wallet, spotifyId}) => {

    // Check it's logged in.
    if (!(await fm.user.isLoggedIn())){
        await login()
    }

    const domain = {
        name: 'Fluctua Records NFTs',
        version: '1'
    };

    const types = {
        Person: [
            { name: 'email', type: 'string' },
            { name: 'wallet', type: 'address' },
            { name: 'spotifyId', type: 'string'}
        ]
    };

    const values = {
        email,
        wallet,
        spotifyId,
    }

    const signer = provider.getSigner()
    const signature = await signer._signTypedData(domain, types, values);

    return signature;
}

const exportedFunctions = {
    login,
    signEmailAndSpotify
}

export default exportedFunctions