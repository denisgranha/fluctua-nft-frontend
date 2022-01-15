import Fortmatic from 'fortmatic';
import { ethers } from "ethers";

import Button from '@mui/material/Button';



const customNodeOptions = {
  rpcUrl: process.env.REACT_APP_NODE_URL, // your own node url
  chainId: process.env.REACT_APP_CHAIN_ID
}

const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC_API_KEY, customNodeOptions);
const provider = new ethers.providers.Web3Provider(fm.getProvider())

// Request user login if needed, returns current user account address
// provider.provider.enable();

const loginFortmatic = () =>{
  provider.provider.enable().then(console.log)
}


function Dashboard(){
    return <Button variant="contained" onClick={loginFortmatic}>Log in</Button>
}

export default Dashboard;