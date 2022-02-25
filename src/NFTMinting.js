import React from 'react';

import WalletService from './services/wallet-service'

import { styled } from '@mui/material/styles';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });



class NFTMinting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          coinbase: null,
          email: null,
        }
    }

    async componentDidMount(){
        // Get NFT type through query param state

        // Get email and login
        const {coinbase, userEmail} = await WalletService.login()
        this.setState({coinbase, userEmail})

        // Sign message
        const signature = await WalletService.signEmail({email: userEmail})
        this.setState({signature})

        // Toggle Show minting animation
        this.setState({showAnimation: true})

        // Send request to backend for minting.
    }

    render(){
        return (
            <div>
                <span>{this.state.signature}</span>
                {this.state.showAnimation?<Img src="/img/NFT_animation.gif"></Img>:''}
            </div>
        )
    }
}

export default NFTMinting