import React, {useEffect, useState} from "react";

import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

import NFTCard from "./components/NFTCard";


const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL

export default function Dashboard(){

 
  const [nftTypes, setNftTypes] = useState([])

  useEffect(() => {
    axios.get(`${backendURL}/nfts/types/`)
    .then(response => {
      console.log(response)
      setNftTypes(response.data.results)
    })
  }, [])

  return (
    <div>
      <Grid container spacing={4} columns={12}>
        <Grid item xs={12} sm={12} xl={11} lg={11}>
          <Typography variant="h4" component="div">
            choose your RUMIA character
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} columns={10}>
      {nftTypes.map(nftType => (
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