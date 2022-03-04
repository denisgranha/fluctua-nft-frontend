function formatIPFS(uri){
    return  `https://${uri}.${process.env.REACT_APP_IPFS_URL}`
}

export {formatIPFS}