import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    useSearchParams,
    useNavigate,
} from "react-router-dom";

import WalletService from './services/wallet-service'
import BackendService from "./services/backend-service"
import { toogleAskWallet } from './redux/walletSlice'
import {NFTCardWithoutLink} from "./components/NFTCard";
import Grid from "@mui/material/Grid";
import LinearProgressWithLabel from "./components/LinearProgressWithLabel"
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';


export default function NFTMinting(){

    const [showAnimation, setShowAnimation] = useState(false)
    const [progress, setProgress] = useState(0)
    const [loadingSigning, setLoadingSigning] = useState(true)
    const [mintTx, setMintTx] = useState()

    const {walletAddress} = useSelector((state) => state.wallet)

    const [searchParams] = useSearchParams();
    const history = useNavigate();
    const spotifyToken = searchParams.get("code")
    const nft = searchParams.get("state")
    const dispatch = useDispatch()

    const blockExplorerURL = process.env.REACT_APP_BLOCK_EXPLORER?process.env.REACT_APP_BLOCK_EXPLORER:"https://polygonscan.com/"

    useEffect(() => {
        // Toogle login
        dispatch(toogleAskWallet())
    }, [dispatch])

    useEffect(() => {

        function claimNFT(proof){
            BackendService.performPreSave({ethereumAddress: walletAddress, proof, spotifyToken, nft})
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
            BackendService.getDeploymentUserClaim(walletAddress, nft)
            .then((nftClaim) => {

                if(nftClaim.txMined){
                    setProgress(100)

                    // Redirect after a 2s delay to the NFT view for unlocked content.
                    setTimeout(redirectAfterMinting, 2000)
                }
                else if(nftClaim.txHash){
                    // @todo depending on how long ago, set progress accordingly
                    setProgress(60)
                    setMintTx(nftClaim.txHash)
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

        if(walletAddress){
            initMinting()
        }
        
    }, [spotifyToken, nft, history, walletAddress])

    const nftCard = (
        <div>
            <Typography variant="h4" component="div">
                NFT Minting in progress, hold on
            </Typography>
            {mintTx?
                <Typography variant="body1" component="div">
                    transaction <a href={`${blockExplorerURL}/tx/${mintTx}`} target="_blank" rel="noreferrer"> {mintTx} </a>
                </Typography>
                :""}
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
