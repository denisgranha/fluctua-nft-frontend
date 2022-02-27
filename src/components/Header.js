import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import WalletService from '../services/wallet-service'

const loginFortmatic = async () => {
  const {coinbase, email} = await WalletService.login();
  this.setState({coinbase, email});
  console.log(coinbase, email)
  
}

const logout = async () => {
  this.setState({coinbase: null, email: null})
  await WalletService.logout();
}

export default function Header(){
  const history = useNavigate();
  const [coinbase, setCoinbase] = useState()
  const [email, setEmail] = useState()

  useEffect(() => {
    async function initLogin(){
      const {_coinbase, _email} = await WalletService.isLoggedIn()
      setCoinbase(_coinbase)
      setEmail(_email)
    }
    initLogin()
  })

  return (
  <Box sx={{ flexGrow: 1 }}>
      <Toolbar >
      <Button sx={{ flexGrow: 1 }} color="inherit" onClick={() => {
            history("/")
          }}>
        <Typography variant="h1" component="div">
            Fluctua NFT's
        </Typography>
        </Button>
        {coinbase?
          <Button color="inherit" onClick={logout}>Logout</Button>: 
          <Button color="inherit" onClick={loginFortmatic}>Login</Button>
        }            
      </Toolbar>
  </Box>
  );
}
