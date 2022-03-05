import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram, faLinkedin, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { Divider } from '@mui/material'
import { Typography } from '@mui/material'
import { Grid } from "@mui/material";

export default function Footer(){
    return (
        <div>
            <Divider style={{paddingTop: "5rem", borderColor: "#3D57A7"}}></Divider>
            <div style={{padding: "2vh 5vw"}}>
            
                <Typography>
                    Fluctua Records is an independent record label and management company based in Berlin. 
                </Typography>
                <div style={{paddingTop: "2rem"}}>
                    <Grid container spacing={1}   justifyContent="center">
                        <Grid item xs={2} sm={2} lg={1} xl={1}>
                            <a href="https://facebook.com/fluctuarecords" rel="noopener noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                            </a>
                        </Grid>
                        <Grid item xs={2} sm={2} lg={1} xl={1}>
                            <a href="https://twitter.com/FluctuaRecords" rel="noopener noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
                            </a>
                        </Grid>
                        <Grid item xs={2} sm={2} lg={1} xl={1}>
                            <a href="https://www.linkedin.com/company/fluctuarecords" rel="noopener noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
                            </a>
                        </Grid>
                        <Grid item xs={2} sm={2} lg={1} xl={1}>
                            <a href="https://instagram.com/fluctuarecords" rel="noopener noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                            </a>
                        </Grid>
                        <Grid item xs={2} sm={2} lg={1} xl={1}>
                            <a href="https://github.com/denisgranha/fluctua-nft-frontend" rel="noopener noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                            </a>
                        </Grid>
                        <Grid item xs={2} sm={2} lg={1} xl={1}>
                            <a href="https://discord.gg/Uw6rW54qRH" rel="noopener noreferrer" target="_blank">
                                <FontAwesomeIcon icon={faDiscord}></FontAwesomeIcon>
                            </a>
                        </Grid>
                    </Grid>
                </div>
                <div style={{paddingTop: "2rem"}}>
                    <FontAwesomeIcon icon={faEnvelope} /> {' '}
                    <a href="mailto:info@fluctuarecords.com" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                        <Typography>
                            info@fluctuarecords.com
                        </Typography>
                    </a>
                </div>
                <div style={{flexGrow: 1, textAlign: 'right'}}>
                    <Typography>
                        © {new Date().getFullYear()}, Fluctua Records GmbH / {' '}
                    </Typography>
                    <a href="/imprint" style={{textDecoration: 'none'}}>
                        <Typography>
                            Imprint
                        </Typography>
                    </a>
                </div>
            </div>
        </div>
    )
}