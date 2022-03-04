import React, { useState, useEffect } from 'react';
import {
    useParams,
    useNavigate
} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography';
import {NFTCardWithoutLink} from "./components/NFTCard";
import {formatIPFS} from "./utils"
import BackendService from "./services/backend-service"


export default function NFTDetails(){
    let { nftId } = useParams();
    const history = useNavigate();
    const [nft, setNft] = useState([])

    useEffect(() => {
        BackendService.getNftsByContractIds([nftId])
        .then(_nfts => {
            setNft(_nfts[0])
        })
    }, [nftId])

    return (
        <div style={{paddingTop: "2rem"}}>
            <Typography variant="h4" component="div">
            {nft.name}
            </Typography>
            <Grid
            style={{paddingTop: "2rem"}} 
            container
            justifyContent="center"
            alignItems="center">
                <Grid item xs={12} lg={4} md={6}>
                    {nft?<NFTCardWithoutLink
                    image={formatIPFS(nft.imageIpfsUri)}
                    imageLowRes={formatIPFS(nft.imageLowResIpfsUri)}
                    />:nft.toString()}
                </Grid>
            </Grid>
            <div style={{paddingTop: "2rem"}}>
                {nft.description}
            </div>
            <div style={{paddingTop: "2rem"}}>
            <Button variant="contained" onClick={() => {history(`/claim/${nft.contractId}`)}} >
                CLAIM
            </Button>
            </div>
        </div>
    )

}