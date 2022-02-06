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
    let userEmail;
    const accounts = await provider.provider.enable();
    coinbase = accounts[0]

    let userData = await fm.user.getUser();
    userEmail = userData.email;

    // Save in localstorage
    localStorage.setItem("coinbase", coinbase)
    localStorage.setItem("userEmail", userData.email)

    return {coinbase, userEmail};
}

const logout = async () => {
    localStorage.removeItem("coinbase")
    localStorage.removeItem("userEmail")
    await fm.user.logout();
}

// This is a light check, for a proper login check, you must check through formatic
const isLoggedIn = () => {
    return {
        coinbase: localStorage.getItem("coinbase"),
        userEmail: localStorage.getItem("userEmail")
    }
}

const signEmail = async ({email}) => {

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
            { name: 'email', type: 'string' }
        ]
    };

    const values = {
        email
    }

    const signer = provider.getSigner()
    const signature = await signer._signTypedData(domain, types, values);

    return signature;
}

const exportedFunctions = {
    login,
    logout,
    isLoggedIn,
    signEmail
}

export default exportedFunctions