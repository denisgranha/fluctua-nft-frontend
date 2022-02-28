import React, {useEffect, useState} from "react";

import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

import NFTCard from "./components/NFTCard";
import WalletService from "./services/wallet-service"


const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL

export default function Dashboard(){

 
  const [nftTypes, setNftTypes] = useState([])
  const [ownedNftIds, setOwnedNftIds] = useState([])
  const [ownedNfts, setOwnedNfts] = useState([])

  useEffect(() => {
    axios.get(`${backendURL}/nfts/types/`)
    .then(response => {
      setNftTypes(response.data.results)
    })

    async function checkBalance(){
      // Check if user holds any nft, by looking at the contract
      const {coinbase} = WalletService.isLoggedIn()
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

  console.log(ownedNfts)

  const selectNFTView = (<div>
    <Grid container spacing={4} columns={12}>
      <Grid item xs={12} sm={12} xl={11} lg={11}>
        <Typography variant="h4" component="div">
          choose your RUMIA character
        </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={4} columns={10}>
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

  const showOwnedNftsView = (
    <div>
            <Grid container spacing={4} columns={12}>
                <Grid item xs={12} sm={12} xl={11} lg={11}>
                    <Typography variant="h4" component="div">
                    your owned RUMIA NFTs
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} columns={10} style={{paddingTop: "2rem"}}>
            {ownedNfts.map(nft => (
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

  return (
    <div>
      {ownedNfts.length? showOwnedNftsView :selectNFTView}
    </div>
  )
}