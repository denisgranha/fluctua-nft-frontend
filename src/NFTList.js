import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import NFTCard from "./components/NFTCard";

const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL

export default function NFTList(){

    let { id } = useParams();
    const [nfts, setNfts] = useState([])

    useEffect(() => {
        axios.get(`${backendURL}/nfts/?nft_type=${id}`)
        .then(response => {
            console.log(response.data.results)
            setNfts(response.data.results)
        })
    }, [])
    
    return (
        <div>
            <Typography variant="h4" component="div">
            choose your NFT color
            </Typography>
            <Grid container spacing={2} columns={10} style={{paddingTop: "2rem"}}>
            {nfts.map(nft => (
            <Grid item xs={12} sm={5} lg={3} xl={2} key={nft.contractId}>
                <NFTCard
                destinationPath={`/nft/${nft.contractId}`}
                image={`https://${nft.imageIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
                imageLowRes={`https://${nft.imageLowResIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
                />
            </Grid>
            ))}
        </Grid>
        </div>
        )
}