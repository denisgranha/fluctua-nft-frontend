import { useNavigate } from "react-router-dom";
import Color from "color"; // v3.2.1
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

const CardActionAreaActionArea = styled(CardActionArea)(() => ({
    borderRadius: 0,
    // transition: "0.2s",
    // "&:hover": {
    //   transform: "scale(1.00)",
    // },
  }));
  
  const StyledCard = styled(Card)(({ color }) => ({
    minWidth: 256,
    borderRadius: 0,
    boxShadow: "none",
    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color(color).rotate(-12).darken(0.2).fade(0.5)}`,
    },
  }));

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    background: "#F6EEEA"
  });
  
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
        <Img src={image} alt={title} />
      </StyledCard>
    </CardActionAreaActionArea>
  )};

  export default NFTCard;