import React from "react";

import Grid from "@mui/material/Grid";

import NFTCard from "./components/NFTCard";

export default function Dashboard() {

  let NFTs = [
    {
      id: 0,
      title: "What A Show",
      description: "Lorem ipsum",
      color: "#203f52",
      image: "https://ipfs.io/ipfs/QmTzGUNs5qu6HDhJXuGgQBf4wMNeFS5yRcuTotoVXyXy2v?preview=1"
    },
    {
      id: 1,
      title: "What A Show",
      description: "Lorem ipsum",
      color: "#4d137f",
      image: "https://ipfs.io/ipfs/QmPxKzaMPsyfq7ZFR7SdZwnSkFq2kzfDHWUWJP3zimRhN9?preview=1"
    },
    {
      id: 2,
      title: "How To Stop Time",
      description: "Lorem ipsum",
      color: "#ff9900",
      image: "https://ipfs.io/ipfs/QmPvwxB7rKQLqo6VXo6a8toxgy1eqb3E185kj3H1VwgnWK?preview=1"
    },
    {
      id: 3,
      title: "Everything I Did",
      description: "Lorem ipsum",
      color: "#34241e",
      image: "https://ipfs.io/ipfs/QmQ7EFQVqTg65Vhr3ACtNEmbwGMuNSfCqueU7GtYj91rxy?preview=1"
    },
    {
      id: 4,
      title: "Everything I Did",
      description: "Lorem ipsum",
      color: "#000000",
      image: "https://ipfs.io/ipfs/QmTv6dhYfF3sZNnua3oEE2A3B1sYm2o8nmKE6ANpjjTpJF?preview=1"
    },

  ]

  return (
    <Grid container spacing={4}>
      {NFTs.map(nft => (
        <Grid item xs={12} sm={6} lg={4}>
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