import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import {NFTCardWithoutLink, NFTCard} from "./components/NFTCard";
import BackendService from "./services/backend-service"

export default function NFTList(){

    let { nftTypeId } = useParams();
    const [nfts, setNfts] = useState([])

    useEffect(() => {
        BackendService.getNftsByType(nftTypeId)
        .then(_nfts => {
            setNfts(_nfts)
        })
    }, [nftTypeId])

    function claimedCard(nft){
        return (
            <NFTCardWithoutLink
            image={`https://${nft.imageIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
            disable={true}
            imageLowRes={`https://${nft.imageLowResIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
        />
        )
    }

    function regularCard(nft){
        return (<NFTCard
            destinationPath={`/nft/${nft.contractId}`}
            image={`https://${nft.imageIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
            imageLowRes={`https://${nft.imageLowResIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
        />)
    }
    
    return (
        <div style={{paddingTop: "2rem"}}>
            <Grid container spacing={4} columns={12}>
                <Grid item xs={12} sm={12} xl={11} lg={11}>
                    <Typography variant="h4" component="div">
                    choose your NFT color
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} columns={10} style={{paddingTop: "2rem"}} justifyContent="center">
            {nfts.map(nft => (
            <Grid item xs={12} sm={5} lg={3} xl={2} key={nft.contractId}>
                {nft.isClaimed?claimedCard(nft):regularCard(nft)}
            </Grid>
            ))}
        </Grid>
        </div>
        )
}