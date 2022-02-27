import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import WalletService from '../services/wallet-service'

export default function Header(){
  const history = useNavigate();
  const [coinbase, setCoinbase] = useState()

  async function loginFortmatic(){
    const {coinbase, userEmail} = await WalletService.login();
    setCoinbase(coinbase)
    console.log(coinbase, userEmail)
    
  }
  
  async function logout(){
    setCoinbase(null)
    await WalletService.logout();
  }

  useEffect(() => {
    async function initLogin(){
      const {coinbase} = await WalletService.isLoggedIn()
      setCoinbase(coinbase)
    }
    initLogin()
  }, [])

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
