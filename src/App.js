import './App.css';

import Dashboard from './Dashboard';

import { Routes, Route } from "react-router-dom";


function App() {
  return <div className="App">
    <h1>Welcome to React Router!</h1>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </div>;
}

export default App;
