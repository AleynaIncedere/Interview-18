import React, { useEffect, useState } from "react";
import axios from "axios";
import './styles.css';

const useBitcoin = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        
        const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
        
        setBitcoinPrice(response.data.bpi.USD.rate_float); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
        setLoading(false);
      }
    };

    fetchBitcoinPrice(); 

    
    const intervalId = setInterval(() => {
      fetchBitcoinPrice();
    }, 60000);

    
    return () => clearInterval(intervalId);
  }, []); 

  return { bitcoinPrice, loading }; 
};

function App() {
  const { bitcoinPrice, loading } = useBitcoin(); 

  return (
    <div className="App">
      <h1>Bitcoin Fiyatı (USD)</h1>
      {loading ? (
        <p className="loading">Loading...</p> 
      ) : (
        <p className="price">
         
          ${bitcoinPrice ? bitcoinPrice.toFixed(2) : "Loading..."}
        </p>
      )}
    </div>
  );
}

export default App;
