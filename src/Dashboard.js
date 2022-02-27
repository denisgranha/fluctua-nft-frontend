import React from "react";

import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

import NFTCard from "./components/NFTCard";


const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL

class Dashboard extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      nftTypes: []
    }
  }

  componentDidMount(){
    axios.get(`${backendURL}/nfts/types/`)
    .then(response => {
      console.log(response)
      this.setState({nftTypes: response.data.results})
    })
  }

  
  render(){
    return (
      <div>
        <Typography variant="h4" component="div">
          choose your RUMIA character
        </Typography>
        <Grid container spacing={4} columns={10}>
        {this.state.nftTypes.map(nftType => (
          <Grid item xs={12} sm={6} lg={3} xl={2} key={nftType.id}>
            <NFTCard
              destinationPath={`/nft-by-type/${nftType.id}`}
              color={nftType.backgroundColor}
              title={nftType.name}
              subtitle={nftType.description}
              image={`https://${nftType.representativeImageIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
              imageLowRes={`https://${nftType.representativeImageLowResIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
            />
          </Grid>
        ))}
      </Grid>
      </div>
    )
  }
}

export default Dashboard