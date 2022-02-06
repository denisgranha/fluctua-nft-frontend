import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import WalletService from '../services/wallet-service'


class Header extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        coinbase: null,
        email: null,
      }
    }

    async componentDidMount(){
      const {coinbase, userEmail} = await WalletService.isLoggedIn()
      this.setState({coinbase, userEmail})
      console.log(coinbase, userEmail)
    }
  
    async loginFortmatic(){
      const {coinbase, email} = await WalletService.login();
      this.setState({coinbase, email});
      console.log(coinbase, email)
      
    }
  
    async logout(){
      this.setState({coinbase: null, email: null})
      await WalletService.logout();
    }

    render(){
        return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Fluctua NFT's
                </Typography>
                {this.state.coinbase?
                  <div><span>{this.state.userEmail}</span><Button color="inherit" onClick={this.logout.bind(this)}>Logout</Button></div>: 
                  <Button color="inherit" onClick={this.loginFortmatic.bind(this)}>Login</Button>
                }            
              </Toolbar>
            </AppBar>
        </Box>
        );
    }
}

export default Header;