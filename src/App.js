import logo from './coingecko.png';
import './App.css';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import { CoinList } from './components/coinList';



function App() {


  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <br></br>
        {loading &&
          <CircularProgress color="success" style={{ width: "90px", height: "90px" }} />}

        {visible &&
          <div>
            <br></br>
            <CoinList />
            <br></br>
            <br></br>
            <p>Sei arrivato fino in fondo, complimenti!</p>
          </div>

        }
      </header>
    </div>
  );
}

export default App;
