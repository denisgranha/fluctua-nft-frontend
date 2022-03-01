import React, {useEffect, useState} from "react";

import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { Divider } from "@mui/material";
import { CircularProgress } from "@mui/material";

import NFTCard from "./components/NFTCard";
import WalletService from "./services/wallet-service"
import {ReactComponent as Infographic} from "./svgs/Asset1.svg"
import {ReactComponent as Infographic2} from "./svgs/Asset2.svg"
import {ReactComponent as Infographic3} from "./svgs/Asset3.svg"


const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL

export default function Dashboard(){

 
  const [nftTypes, setNftTypes] = useState([])
  const [ownedNftIds, setOwnedNftIds] = useState([])
  const [ownedNfts, setOwnedNfts] = useState([])
  const [userClaims, setUserClaims] = useState([])
  let potentialNftsFound, showOwnedNftsView, selectNFTView

  useEffect(() => {
    axios.get(`${backendURL}/nfts/types/`)
    .then(response => {
      setNftTypes(response.data.results)
    })

    async function checkBalance(){
      // Check if user holds any nft, by looking at the contract
      const {coinbase, userEmail} = WalletService.isLoggedIn()

      if(userEmail){
        // If user has any token claim, it might have the token, so we warn the user to hold on, as it takes a few seconds
        // Blockchain is slow
        axios.get(`${backendURL}/nfts/claims/?user__email=${userEmail}`)
        .then(response => {
          setUserClaims(response.data.results)
        })
      }

      if (coinbase){
        const nftIds = await WalletService.getNfts(coinbase)
        setOwnedNftIds(nftIds)
      }
    }
    
    checkBalance()
  }, [])

  useEffect(()=> {
    if (ownedNftIds.length){
      // Get NFT metadata for owned nfts
      axios.get(`${backendURL}/nfts/?contract_id__in=${ownedNftIds.join(",")}`)
      .then(response => {
        setOwnedNfts(response.data.results)
      })
    }
  }, [ownedNftIds])

  if(!userClaims.length && !ownedNfts.length){
    selectNFTView = (
    <div>
      <Grid container spacing={4} columns={12}>
        <Grid item xs={12} sm={12} xl={11} lg={11}>
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
              image={`https://${nftType.representativeImageIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
              imageLowRes={`https://${nftType.representativeImageLowResIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
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
                  <Grid item xs={12} sm={12} xl={11} lg={11}>
                      <Typography variant="h4" component="div">
                      your owned RUMIA NFTs
                      </Typography>
                  </Grid>
              </Grid>
              <Grid container spacing={2} columns={10} style={{paddingTop: "5rem"}}>
              {ownedNfts.map(nft => (
              <Grid item xs={12} sm={5} lg={3} xl={2} key={nft.contractId}>
                  <NFTCard
                  destinationPath={`/nft/${nft.contractId}/reveal`}
                  image={`https://${nft.imageIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
                  imageLowRes={`https://${nft.imageLowResIpfsUri}.${process.env.REACT_APP_IPFS_URL}`}
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