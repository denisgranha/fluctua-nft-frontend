import './App.css';

import Dashboard from './Dashboard';

import { Routes, Route } from "react-router-dom";

import Container from '@mui/material/Container'
import { GlobalStyles } from "@mui/material";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import NFTDetails from './NFTDetails';
import ClaimDetails from './ClaimDetails'
import NFTList from './NFTList';

import Header from './components/Header'
import NFTMinting from './NFTMinting';

const customTheme = createTheme({
  typography: {
    fontFamily: [
      'freight-micro-pro,serif',
    ].join(','),
    h1: {
      fontWeight: "600",
      color: "#3D57A7"
    },
    h4: {
      fontWeight: "300",
      fontStyle: "italic",
      color: "#3D57A7"
    }
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#3D57A7',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    }
  },
});

export default function App(){

    return (
    <div className="App">
      <ThemeProvider theme={customTheme} >
        <GlobalStyles
          styles={{
            body: { backgroundColor: "#F6EEEA" },
          }}
        />
        <Container maxWidth="xl" style={{paddingTop: "2rem"}}>
        <Header></Header>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nft/:nftId" element={<NFTDetails />} />
            <Route path="/nft-by-type/:nftTypeId" element={<NFTList />} />
            <Route path="/claim/:nftId" element={<ClaimDetails />} />
            <Route path="/mint/" element={<NFTMinting />}></Route>
          </Routes>
        </Container>
      
      </ThemeProvider>
    </div>
    )
}
