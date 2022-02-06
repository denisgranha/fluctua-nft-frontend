import Button from "@mui/material/Button"
import {
    useParams
} from "react-router-dom";

const baseURL = "https://accounts.spotify.com/es/authorize?"
let paramsObj = {
    scope: 'user-library-modify user-read-email',
    response_type: 'code',
    client_id: '92fec7cd91604f69a1d9a2327d7c515c',
    redirect_uri: 'http://localhost:3000/mint/'
};

export default function ClaimDetails(){
    let { id } = useParams();
    paramsObj.state = id;
    let searchParams = new URLSearchParams(paramsObj);
    return (
        <div>
            <p>
                Explain Spotify Pre-save...
            </p>
            <p>
                Explain Permissions
            </p>
            <p>
                Explain NFT Benefits
            </p>
            <Button variant="contained" onClick={() => {
                window.location.href = `${baseURL}${searchParams}`;
            }}>
                    Go Pre-save
            </Button>
        </div>
    )
}