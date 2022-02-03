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
        coinbase: null
      }
    }
  
    async loginFortmatic(){
      const coinbase = await WalletService.login();
      this.setState({coinbase});
      console.log(coinbase)
      
    }
  
    logout(){
      this.setState({coinbase: null})
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
                  <Button color="inherit" onClick={this.logout.bind(this)}>Logout</Button>: 
                  <Button color="inherit" onClick={this.loginFortmatic.bind(this)}>Login</Button>
                }            
              </Toolbar>
            </AppBar>
        </Box>
        );
    }
}

export default Header;