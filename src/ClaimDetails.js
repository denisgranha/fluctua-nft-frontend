import Button from "@mui/material/Button"
import { Divider } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

import {ReactComponent as Infographic4} from "./svgs/Asset4.svg"
import {ReactComponent as Infographic5} from "./svgs/Asset5.svg"
import {ReactComponent as Infographic6} from "./svgs/Asset6.svg"

import {
    useParams
} from "react-router-dom";

const baseURL = "https://accounts.spotify.com/en/authorize?"
let paramsObj = {
    scope: 'user-library-modify user-read-email',
    response_type: 'code',
    client_id: '92fec7cd91604f69a1d9a2327d7c515c',
    redirect_uri: `${window.location.origin}/mint/`
};

export default function ClaimDetails(){
    let { nftId } = useParams();
    paramsObj.state = nftId;
    let searchParams = new URLSearchParams(paramsObj);
    return (
        <div style={{paddingTop: "3rem", width: "60vw"}}>
            <Button variant="contained" onClick={() => {
                window.location.href = `${baseURL}${searchParams}`;
            }}>
                claim your NFT
            </Button>
            <Divider style={{paddingTop: "5rem", borderColor: "#3D57A7"}}></Divider>
            <Typography variant="h4" component="div" style={{paddingTop: "3rem"}}>
                The next steps explained:
            </Typography>
            <Grid container spacing={4}   justifyContent="center" style={{paddingTop: "2rem"}}>
                <Grid item xs={12} sm={12} lg={3} xl={3}>
                    <Infographic4 style={{height: "30vh"}}></Infographic4>
                    <Typography variant="h6" component="div">
                        first, you would need to log into your Spotify account and allow us access to pre-save RUMIAs new single
                    </Typography>
                </Grid>   
                <Grid item xs={12} sm={12} lg={3} xl={3}>
                    <Infographic5 style={{height: "30vh"}}></Infographic5>
                    <Typography variant="h6" component="div">
                        then, you can sign up to Fortmatic to set up your digital wallet.
                    </Typography>
                </Grid>   
                <Grid item xs={12} sm={12} lg={3} xl={3}>
                    <Infographic6 style={{height: "30vh"}}></Infographic6>
                    <Typography variant="h6" component="div">
                        after these steps are completed, we will generate your NFT! <br/>
                        you can now unlock your exclusive content!
                    </Typography>
                </Grid>                                
            </Grid>
            
        </div>
    )
}