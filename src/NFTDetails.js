import {
    useParams,
    useNavigate
} from "react-router-dom";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"

// @TODO load real data from backend
// @TODO, progressive loading
import NFTs from "./NFTs.json"
import { styled } from '@mui/material/styles';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export default function NFTDetails(){
    let { id } = useParams();
    const history = useNavigate();

    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={12} lg={4} md={6}>
                <Img src={NFTs[id].image}></Img>
            </Grid>
            <Grid item>
                <h1>
                    {NFTs[id].title}
                </h1>
                <div>
                    {NFTs[id].description}
                </div>
                <div>
                <Button variant="contained" onClick={() => {history(`/claim/${id}`)}}>
                    CLAIM
                </Button>
                </div>
            </Grid>
        </Grid>
    )

}