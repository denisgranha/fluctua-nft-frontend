import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux'

import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { Divider } from "@mui/material";
import { CircularProgress } from "@mui/material";

import NFTCard from "./components/NFTCard";
import WalletService from "./services/wallet-service"
import BackendService from "./services/backend-service"
import {formatIPFS} from "./utils"
import {ReactComponent as Infographic} from "./svgs/Asset1.svg"
import {ReactComponent as Infographic2} from "./svgs/Asset2.svg"
import {ReactComponent as Infographic3} from "./svgs/Asset3.svg"

export default function Dashboard(){

  const {walletAddress} = useSelector((state) => state.wallet)

  const [nftTypes, setNftTypes] = useState([])
  const [ownedNftIds, setOwnedNftIds] = useState([])
  const [ownedNfts, setOwnedNfts] = useState([])
  const [userClaims, setUserClaims] = useState([])
  let potentialNftsFound, showOwnedNftsView, selectNFTView

  useEffect(() => {
    BackendService.getNftTypes().then(_nftTypes => {
      setNftTypes(_nftTypes)
    })

    async function checkBalance(){
      // Check if user holds any nft, by looking at the contract

      if(walletAddress){  
        // If user has any token claim, it might have the token, so we warn the user to hold on, as it takes a few seconds
        // Blockchain is slow
        BackendService.getUserClaims(walletAddress)
        .then(_claims => {
          setUserClaims(_claims)
        })
      }

      if (walletAddress){        
        const nftIds = await WalletService.getNfts(walletAddress)
        setOwnedNftIds(nftIds)
      }
    }
    
    checkBalance()
  }, [walletAddress])

  useEffect(() => {
    // This might be called when user logouts
    if (!walletAddress && ownedNfts.length){
      setUserClaims([])
      setOwnedNfts([])
      setOwnedNftIds([])
    }
  }, [walletAddress, ownedNfts])

  useEffect(()=> {
    if (ownedNftIds.length){
      // Get NFT metadata for owned nfts
      BackendService.getNftsByContractIds(ownedNftIds)
      .then(_nfts => {
        setOwnedNfts(_nfts)
      })
    }
  }, [ownedNftIds])

  if(!userClaims.length && !ownedNfts.length){
    selectNFTView = (
    <div>
      <Grid container spacing={4} columns={12}>
        <Grid item xs={12} sm={12} xl={12} lg={12}>
          <Typography variant="h4" component="div">
            choose your RUMIA character
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} columns={10}  style={{paddingTop: "5rem"}} justifyContent="center">
        {nftTypes.map(nftType => (
          <Grid item xs={12} sm={6} lg={3} xl={2} key={nftType.id}>
            <NFTCard
              destinationPath={`/nft-by-type/${nftType.id}`}
              color={nftType.backgroundColor}
              title={nftType.name}
              subtitle={nftType.description}
              image={formatIPFS(nftType.representativeImageIpfsUri)}
              imageLowRes={formatIPFS(nftType.representativeImageLowResIpfsUri)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
    )
  }

  if(ownedNfts.length){
    showOwnedNftsView = (
      <div>
              <Grid container spacing={4} columns={12}>
                  <Grid item xs={12} sm={12} xl={12} lg={12}>
                      <Typography variant="h4" component="div">
                      your owned RUMIA NFTs
                      </Typography>
                  </Grid>
              </Grid>
              <Grid container spacing={2} columns={10} style={{paddingTop: "5rem"}} justifyContent="center">
              {ownedNfts.map(nft => (
              <Grid item xs={12} sm={5} lg={3} xl={2} key={nft.contractId}>
                  <NFTCard
                  destinationPath={`/nft/${nft.contractId}/reveal`}
                  image={formatIPFS(nft.imageIpfsUri)}
                  imageLowRes={formatIPFS(nft.imageLowResIpfsUri)}
                  />
              </Grid>
              ))}
          </Grid>
          </div>
    )
  }

  if(userClaims.length && !ownedNfts.length){
    potentialNftsFound = (
      <div>
        <Typography variant="h4" component="div">
        we noticed that you might have a NFT, wait a few seconds while we check it in the Blockchain
        </Typography>
        <CircularProgress style={{marginTop: "5rem"}}></CircularProgress>
        </div>
    )
  }

  return (
    <div style={{paddingTop: "2rem"}}>
      {potentialNftsFound}
      {showOwnedNftsView}
      {selectNFTView}
      <Divider style={{paddingTop: "5rem", borderColor: "#3D57A7"}}></Divider>
      <Typography variant="h4" component="div" style={{paddingTop: "5rem"}}>
        How it works
      </Typography>
      <Grid container spacing={4}   justifyContent="center" style={{paddingTop: "2rem"}}>
        <Grid item xs={12} sm={12} lg={3} xl={3}>
          <Infographic style={{height: "18vh"}}></Infographic>
        </Grid>
        <Grid item xs={12} sm={12} lg={3} xl={3}>
          <Typography variant="h6" component="div">
            Choose your desired character! <br/>
            There are 5 different RUMIA tokens based on her music videos.
          </Typography> <br/>
          <Typography variant="h6" component="div">
            Each one will unlock different custom content
            </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={4}   justifyContent="center" style={{paddingTop: "2rem"}}>
       <Grid item xs={12} sm={12} lg={3} xl={3}>
          <Typography variant="h6" component="div">
            Then, pick your favorite colour. <br/>
            This is what makes your NFT unique, <br/>
            one of a kind
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={3} xl={3}>
          <Infographic2 style={{height: "15vh"}}></Infographic2>
        </Grid>
      </Grid>

      <Grid container spacing={4}   justifyContent="center" style={{paddingTop: "2rem"}}>
        <Grid item xs={12} sm={12} lg={3} xl={3}>
          <Infographic3 style={{height: "15vh"}}></Infographic3>
        </Grid>
        <Grid item xs={12} sm={12} lg={3} xl={3}>
          <Typography variant="h6" component="div">
            Once you made your selection and went through the process of activating your Token, you can unlock your Patreon-like exclusive content.
          </Typography>
        </Grid>
      </Grid>
      
    </div>
  )
}