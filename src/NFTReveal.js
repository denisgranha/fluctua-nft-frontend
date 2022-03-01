import React, { useState, useEffect } from 'react';
import {
    useParams,
} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import {NFTCardWithoutLink} from "./components/NFTCard";
import WalletService from "./services/wallet-service"

const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL


export default function NFTReveal(){
    let { nftId } = useParams();
    const [nft, setNft] = useState([])

    useEffect(() => {
        axios.get(`${backendURL}/nfts/?contract_id=${nftId}`)
        .then(response => {
            console.log(response.data.results)
            setNft(response.data.results[0])
        })
    }, [nftId])

    async function revealContent(){
        const signature = await WalletService.signNftContent({nft: nftId})
        console.log(signature)
    }

    return (
        <div>
            <Typography variant="h4" component="div">
            {nft.name}
            </Typography>
            <Grid 
            container
            justifyContent="center"
            alignItems="center">
                <Grid item xs={12} lg={4} md={6}>
                    <NFTCardWithoutLink
                    image={`https://${nft.imageIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
                    imageLowRes={`https://${nft.imageLowResIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
                    />
                </Grid>
            </Grid>
            <div>
                        {nft.description}
                    </div>
                    <div>
                    <Button variant="contained" onClick={revealContent}>
                        Reveal Exclusive Content
                    </Button>
                    </div>
        </div>
    )

}