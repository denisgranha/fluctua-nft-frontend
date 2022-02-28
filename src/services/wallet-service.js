import Fortmatic from 'fortmatic';
import { ethers } from "ethers";
  

// Request user login if needed, returns current user account address
// provider.provider.enable();

const customNodeOptions = {
    rpcUrl: process.env.REACT_APP_NODE_URL, // your own node url
    chainId: process.env.REACT_APP_CHAIN_ID
}

const nftAbi = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
];
  
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
        console.log("user not logged in, login for signing")
        await login()
    }
    console.log("user ready to sign")

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

async function getNfts(owner){
    const nftContract = await (new ethers.Contract(process.env.REACT_APP_NFT_CONTRACT, nftAbi, provider));
    
    const nftsCount = await nftContract.balanceOf(owner)

    let nftIds = []
    for(let index=0; index <nftsCount.toNumber(); index++){
        const nft = await nftContract.tokenOfOwnerByIndex(owner, index)
        nftIds.push(nft.toNumber())
    }

    return nftIds
}

const exportedFunctions = {
    login,
    logout,
    isLoggedIn,
    signEmail,
    getNfts
}

export default exportedFunctions