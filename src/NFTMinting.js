import React, {useEffect, useState} from 'react';
import {
    useSearchParams,
    useNavigate,
} from "react-router-dom";

import WalletService from './services/wallet-service'
import {NFTCardWithoutLink} from "./components/NFTCard";
import Grid from "@mui/material/Grid";
import LinearProgressWithLabel from "./components/LinearProgressWithLabel"
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL


export default function NFTMinting(){

    const [showAnimation, setShowAnimation] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loadingSigning, setLoadingSigning] = useState(true)

    const [searchParams] = useSearchParams();
    const history = useNavigate();
    const spotifyToken = searchParams.get("code")
    const nft = searchParams.get("state")

    useEffect(() => {

        function claimNFT(proof){
            const {coinbase} = WalletService.isLoggedIn()
            axios.post(`${backendURL}/nfts/spotify-pre-saves/`, {ethereumAddress: coinbase, proof, spotifyToken, nft})
            .then(() => {
                setProgress(20)
                // from now on, monitor claim tx, and adapt progress accordingly
                checkClaimStatus()
            }, (error) => {
                alert("Server Error: " + JSON.stringify(error.response.data))
            })
        }

        function redirectAfterMinting(){
            history(`/nft/${nft}/reveal`)
        }
    
        function checkClaimStatus(){
            const {coinbase} = WalletService.isLoggedIn()
            axios.get(`${backendURL}/nfts/claims/?user__ethereum_address=${coinbase}`)
            .then((response) => {
                const nftClaim = response.data.results[0]
                console.log(nftClaim)
    
                if(nftClaim.txMined){
                    setProgress(100)

                    // Redirect after a 2s delay to the NFT view for unlocked content.
                    setTimeout(redirectAfterMinting, 2000)
                }
                else if(nftClaim.txHash){
                    // @todo depending on how long ago, set progress accordingly
                    setProgress(60)
                    setTimeout(checkClaimStatus, 2000)
                }
                else {
                    setProgress(30)
                    setTimeout(checkClaimStatus, 1000)
                }
            }, () => {
                setTimeout(checkClaimStatus, 1000)
            })
        }
        async function initMinting(){
            // Get NFT id through query param state            

            // Set some sleep between functions, formatic is a bit buggy
            setTimeout(async () => {
                // Sign message
                const _signature = await WalletService.signPreSave()

                setProgress(10)
                setLoadingSigning(false)
                // Toggle Show minting animation
                setShowAnimation(true)

                // Send request to backend for minting.
                claimNFT(_signature)
            }, 1000)
        }

        initMinting()
        
    }, [spotifyToken, nft, history])

    const nftCard = (
        <div>
            <Typography variant="h4" component="div">
                NFT Minting in progress, hold on
            </Typography>
            <LinearProgressWithLabel value={progress} />            
        </div>
    )

    const loadingSigningInfoHeader = (
        <div>
            <Typography variant="h4" component="div">
            Blockchain Wallet being Initiated. Please wait a few seconds and follow login indications.
            </Typography>
        </div>
    )

    const loadingSigningInfoFooter = (
        <CircularProgress style={{textAlign: "center"}} />
    )

    return (
        <div>
            {loadingSigning?loadingSigningInfoHeader:''}
            {showAnimation?nftCard:''}
            <Grid 
            container
            justifyContent="center"
            alignItems="center">
                <Grid item xs={12} lg={6} md={6} xl={6}>
                    <NFTCardWithoutLink image="/img/NFT_animation.gif"/>
                </Grid>
            </Grid>
            {loadingSigning?loadingSigningInfoFooter:''}
        </div>
    )

}
