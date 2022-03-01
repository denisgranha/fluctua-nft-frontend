import React, { useState, useEffect } from 'react';
import {
    useParams,
} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import {NFTCardWithoutLink} from "./components/NFTCard";
import WalletService from "./services/wallet-service"
import YoutubeEmbed from './components/YoutubeEmbed';

const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL


export default function NFTReveal(){
    let { nftId } = useParams();
    const [nft, setNft] = useState([])
    const [nftContent, setNftContent] = useState([])

    useEffect(() => {
        axios.get(`${backendURL}/nfts/?contract_id=${nftId}`)
        .then(response => {
            console.log(response.data.results)
            setNft(response.data.results[0])
        })
    }, [nftId])

    async function revealContent(){
        const signature = await WalletService.signNftContent({nft: nftId})
        const {userEmail, coinbase} = WalletService.isLoggedIn()
        const payloadData = {
            email: userEmail,
            proof: signature,
            nft: parseInt(nftId),
            ethereumAddress: coinbase
        }
        axios.post(`${backendURL}/nfts/content/`, payloadData)
        .then(response => {
            console.log(response.data)
            setNftContent(response.data)
            
        })
    }
    
    function showNftContent(){
        if (nftContent.length){
            const renderedContent = nftContent.map(nftContentItem => {
                if (nftContentItem.contentType === "youtube"){
                    return (
                        <Grid item xs={12} lg={12} md={12} key={nftContentItem.contentUrl}>
                            <YoutubeEmbed embedURL={nftContentItem.contentUrl} />
                        </Grid>
                    )
                }
                else{
                    return (
                        <Grid item xs={12} lg={12} md={12}>
                            Content Type Unknown
                        </Grid>
                    )
                }

            })
            return (
                <div>
                    <Grid 
                    container
                    justifyContent="center"
                    alignItems="center">
                    {renderedContent}
                    </Grid>
                </div>
            )
        }
        else{
            return (
                <Button variant="contained" onClick={revealContent}>
                    Reveal Exclusive Content
                </Button>
            )
        }
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
                    {showNftContent()}
                    </div>
        </div>
    )

}