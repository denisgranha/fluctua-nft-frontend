import './App.css';

import Dashboard from './Dashboard';

import { Routes, Route } from "react-router-dom";

import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NFTDetails from './NFTDetails';
import ClaimDetails from './ClaimDetails'

import Header from './components/Header'
import NFTMinting from './NFTMinting';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App(){

    return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Header></Header>
        <Container maxWidth="lg" style={{paddingTop: "2rem"}}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nft/:id" element={<NFTDetails />} />
            <Route path="/claim/:id" element={<ClaimDetails />} />
            <Route path="/mint/" element={<NFTMinting />}></Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </div>
    )
}
