import React, { useState, useEffect } from 'react';
import {
    useParams,
} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import {NFTCardWithoutLink} from "./components/NFTCard";
import WalletService from "./services/wallet-service"
import BackendService from "./services/backend-service"
import YoutubeEmbed from './components/YoutubeEmbed';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


export default function NFTReveal(){
    let { nftId } = useParams();
    const [nft, setNft] = useState([])
    const [nftContent, setNftContent] = useState([])

    useEffect(() => {
        BackendService.getNftsByContractIds([nftId])
        .then(_nfts => {
            setNft(_nfts[0])
        })
    }, [nftId])

    async function revealContent(){
        const signature = await WalletService.signNftContent({nft: nftId})
        const {coinbase} = WalletService.isLoggedIn()
        const payloadData = {
            proof: signature,
            nft: parseInt(nftId),
            ethereumAddress: coinbase
        }
        BackendService.revealContent(payloadData)
        .then(_content => {
            setNftContent(_content)
            
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
                    Reveal Your Content
                </Button>
            )
        }
    }

    return (
        <div>
            <Typography variant="h4" component="div" style={{paddingTop: "2rem"}}>
            {nft.name}
            </Typography>
            <Grid 
            style={{paddingTop: "2rem"}}
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
            <ArrowDownwardIcon sx={{ fontSize: 80 }} style={{paddingTop: "2rem"}}></ArrowDownwardIcon>
            <div style={{paddingTop: "2rem"}}>
                {showNftContent()}
            </div>
        </div>
    )

}