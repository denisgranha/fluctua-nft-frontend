import React, {useEffect, useState, useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {useNavigate} from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import WalletService from '../services/wallet-service'
import { chooseWallet as chooseWalletAction, toogleAskWallet } from '../redux/walletSlice'


export default function Header(){
  const history = useNavigate();
  const dispatch = useDispatch()
  const {walletAddress, askWallet} = useSelector((state) => state.wallet)
  const [chooseWallet, setChooseWallet] = useState(false)
  const {walletProvider} = useSelector((state) => state.wallet)

  const loginFortmatic = useCallback(async () => {
    setChooseWallet(false)    
    dispatch(chooseWalletAction({
      walletProvider: "fortmatic"
    }))
    await WalletService.login()
    
  }, [dispatch])
  
  async function logout(){
    WalletService.logout()
  }

  const loginMetamask = useCallback(() => {
    setChooseWallet(false)
    dispatch(chooseWalletAction({
      walletProvider: "metamask"
    }))
    WalletService.login()
  }, [dispatch])

  const login = useCallback(() => {    
    if (typeof window.ethereum !== 'undefined' && walletProvider !== "fortmatic") {
      console.log('MetaMask is installed!');
      if (walletProvider === "metamask"){
        loginMetamask()
      }
      else{
        setChooseWallet(true)
      }
    }
    else{
      loginFortmatic()
    }
  }, [loginFortmatic, walletProvider, loginMetamask])

  useEffect(() => {
    if(askWallet){
      dispatch(toogleAskWallet())
      login()
    }
  }, [askWallet, dispatch, login])

  return (
  
    <Toolbar >
      <Dialog
        open={chooseWallet}
        onClose={() => {setChooseWallet(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Choose wallet
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We have detected that you already have Metamask installed. <br/>
            Would you like to use Metamask as your blockchain wallet or a simpler version called Fortmatic?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={loginMetamask}>Metamask</Button>
          <Button onClick={loginFortmatic} autoFocus>
            Fortmatic
          </Button>
        </DialogActions>
      </Dialog>  
      <Grid container spacing={4} justifyContent="flex-end">
      <Grid item xs={12} sm={12} lg={1} xl={1}>
        {walletAddress?
          <Button color="inherit" onClick={logout}>Logout</Button>: 
          <Button color="inherit" onClick={login}>Login</Button>
        }
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12} style={{paddingTop: "0"}}>
          <Button color="inherit" onClick={() => {
              history("/")
            }}>
          <Typography variant="h2" component="div">
              Fluctua NFTs
          </Typography>
        </Button>
        </Grid>
      </Grid>    
    </Toolbar> 
  );
}
