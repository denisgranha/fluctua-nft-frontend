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

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const login = async () => {

    let coinbase; // Main account

    // if (typeof window.ethereum !== 'undefined') {
    //   console.log('MetaMask is installed!');
    //   // Ask which wallet to use
    //   try{
    //     coinbase = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //   }
    //   catch(e){
    //     console.log(e)
    //   }
    // }

    // Check it's logged in.
    if (!(await fm.user.isLoggedIn())){
      console.log("user not logged in")
      
    }

    const accounts = await provider.provider.enable();
    coinbase = accounts[0]    

    // Save in localstorage
    localStorage.setItem("coinbase", coinbase)

    return {coinbase};
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

const signPreSave = async () => {
    
    const {coinbase} = await login()
    console.log("user ready to sign")
    await delay(800)

    const domain = {
        name: 'Fluctua Records NFTs',
        version: '1'
    };

    const types = {
        Person: [
            { name: 'wallet', type: 'string' }
        ]
    };

    const values = {
        wallet: coinbase
    }

    const signer = provider.getSigner()
    const signature = await signer._signTypedData(domain, types, values);

    return signature;
}

const signNftContent = async ({nft}) => {

  // Check it's logged in.
  if (!(await fm.user.isLoggedIn())){
      console.log("user not logged in, login for signing")
      await login()
  }

  const {coinbase} = isLoggedIn()
  console.log("user ready to sign")
  await delay(800)

  const domain = {
      name: 'Fluctua Records NFTs',
      version: '1'
  };

  const types = {
      NftContent: [
          { name: 'wallet', type: 'string' },
          { name: 'nft', type: 'int256' }
      ]
  };

  const values = {
      wallet: coinbase,
      nft: parseInt(nft)
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
    signPreSave,
    getNfts,
    signNftContent
}

export default exportedFunctions