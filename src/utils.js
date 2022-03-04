function formatIPFS(uri){
    return process.env.REACT_APP_IPFS_URL + uri
}

export {formatIPFS}