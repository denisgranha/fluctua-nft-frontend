import './App.css';
import React from 'react';

import Dashboard from './Dashboard';

import { Routes, Route } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Fortmatic from 'fortmatic';
import { ethers } from "ethers";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const customNodeOptions = {
  rpcUrl: process.env.REACT_APP_NODE_URL, // your own node url
  chainId: process.env.REACT_APP_CHAIN_ID
}

const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC_API_KEY, customNodeOptions);
const provider = new ethers.providers.Web3Provider(fm.getProvider())

// Request user login if needed, returns current user account address
// provider.provider.enable();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      coinbase: null
    }
  }

  async loginFortmatic(){
    const accounts = await provider.provider.enable();
    this.setState({coinbase: accounts[0]});
    console.log(accounts[0])
    
  }

  logout(){
    this.setState({coinbase: null})
  }

  render(){
    return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
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
        <Container maxWidth="lg" style={{paddingTop: "2rem"}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </div>
    );
  }
}

export default App;
