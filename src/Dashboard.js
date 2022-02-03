import React from "react";

import Grid from "@mui/material/Grid";

import NFTCard from "./components/NFTCard";

// @TODO load real data from backend
// @TODO, progressive loading
import NFTs from "./NFTs.json"

export default function Dashboard() {

  return (
    <Grid container spacing={4}>
      {NFTs.map(nft => (
        <Grid item xs={12} sm={6} lg={4} key={nft.id}>
          <NFTCard
            destinationPath={`/nft/${nft.id}`}
            color={nft.color}
            title={nft.title}
            subtitle={nft.description}
            image={nft.image}
          />
        </Grid>
      ))}
    </Grid>
  );
}