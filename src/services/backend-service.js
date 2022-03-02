const axios = require('axios').default;
const backendURL = process.env.REACT_APP_BACKEND_URL

async function getNftTypes(){
    return axios.get(`${backendURL}/nfts/types/`)
        .then(response => {
            return response.data.results
        }, error => {
            // Alert logic?
    })
}

async function getUserClaims(ethereumAddress){
    return axios.get(`${backendURL}/nfts/claims/?user__ethereum_address=${ethereumAddress}`)
        .then(response => {
          return response.data.results
        }, error => {
            // Alert logic?
    })
}

async function getNftsByContractIds(contractIds){
    return axios.get(`${backendURL}/nfts/?contract_id__in=${contractIds.join(",")}`)
      .then(response => {
        return response.data.results
      }, error => {
        // Alert logic?
    })
}

async function revealContent(payloadData){
    return axios.post(`${backendURL}/nfts/content/`, payloadData)
        .then(response => {
            return response.data
        }, error => {
            // Alert logic?
    })
}

async function getNftsByType(typeId){
    return axios.get(`${backendURL}/nfts/?nft_type=${typeId}`)
        .then(response => {
            return response.data.results
        }, error => {
            // Alert logic?
    })
}

async function getDeploymentUserClaim(ethereumAddress, nftId){
    return axios.get(`${backendURL}/nfts/claims/?user__ethereum_address=${ethereumAddress}&nft__contract_id=${nftId}`)
        .then(response => {
            return response.data.results[0]
        }, error => {
            // Alert logic?
    })
}

async function performPreSave(payload){
    return axios.post(`${backendURL}/nfts/spotify-pre-saves/`, payload)
        .then(response => {
            return response.status
        }, error => {
            // Alert logic?
    })
}

const exportedFunctions = {
    getNftTypes,
    getUserClaims,
    getNftsByContractIds,
    revealContent,
    getNftsByType,
    getDeploymentUserClaim,
    performPreSave
}

export default exportedFunctions