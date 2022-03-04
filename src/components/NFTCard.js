import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import ProgressiveImage from "./ProgressiveImage";


const CardActionAreaActionArea = styled(CardActionArea)(() => ({
    borderRadius: 0,
  }));
  
  const StyledCard = styled(Card)(() => ({
    minWidth: 256,
    borderRadius: 0,
    boxShadow: "none",
    background: "#F6EEEA",
    "&:hover": {
      boxShadow: `0 6px 12px 0`,
    },
  }));

  const StyledCardNoLink = styled(Card)(() => ({
    minWidth: 256,
    borderRadius: 0,
    boxShadow: "none",
    background: "#F6EEEA",
  }));

  // const Img = styled('img')({
  //   margin: 'auto',
  //   display: 'block',
  //   maxWidth: '100%',
  //   maxHeight: '100%',
  //   background: "#F6EEEA"
  // });
  
  const NFTCard = ({
    image,
    title,
    imageLowRes,
    destinationPath
  }) => {
    const history = useNavigate();    
    return (
    <CardActionAreaActionArea onClick={() => {
      history(destinationPath)
    }}>
      <StyledCard >
        {/* <Img src={image} alt={title} />         */}
        <ProgressiveImage
          preview={imageLowRes}
          src={image}
          render={(src, style) => <img src={src} alt={title} style={Object.assign(style, { 
            margin: 'auto',
            display: 'block',
            width: '100%',
            height: '100%'
          })}/>}
        />
      </StyledCard>
    </CardActionAreaActionArea>
  )};

  const NFTCardWithoutLink = ({
    image,
    title,
    imageLowRes,
    disable
  }) => {
    
    return (
      <StyledCardNoLink >
        {/* <Img src={image} alt={title} sx={disable?{filter: "brightness(50%);"}:{}}/> */}
        <ProgressiveImage
          preview={imageLowRes}
          src={image}
          render={(src, style) => <img src={src} alt={title} style={Object.assign(style, { 
            margin: 'auto',
            display: 'block',
            width: '100%',
            height: '100%'
          })}/>}
        />
      </StyledCardNoLink>
  )};

  export default NFTCard;

  export {
    NFTCardWithoutLink,
    NFTCard
  }