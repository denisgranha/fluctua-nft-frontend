import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import WalletService from '../services/wallet-service'

export default function Header(){
  const history = useNavigate();
  const [coinbase, setCoinbase] = useState()

  async function loginFortmatic(){
    const {coinbase} = await WalletService.login();
    setCoinbase(coinbase)
    console.log(coinbase)
    
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
  
    <Toolbar >
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} lg={11} xl={11}>
        <Button color="inherit" onClick={() => {
            history("/")
          }}>
        <Typography variant="h2" component="div">
            Fluctua NFTs
        </Typography>
      </Button>
      </Grid>
      <Grid item xs={12} sm={12} lg={1} xl={1}>
      {coinbase?
        <Button color="inherit" onClick={logout}>Logout</Button>: 
        <Button color="inherit" onClick={loginFortmatic}>Login</Button>
      }
      </Grid>
    </Grid>    
  </Toolbar> 
  );
}
