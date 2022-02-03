import Button from "@mui/material/Button"
import {
    useParams
} from "react-router-dom";

export default function ClaimDetails(){
    let { id } = useParams();
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
                window.location.href = `https://accounts.spotify.com/es/authorize?scope=user-library-modify%20user-read-email&response_type=code&client_id=92fec7cd91604f69a1d9a2327d7c515c&redirect_uri=http:%2F%2Flocalhost:8000%2F`;
            }}>
                    Go Pre-save
            </Button>
        </div>
    )
}