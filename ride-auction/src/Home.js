import React, { useState } from 'react';
import Countdown from 'react-countdown';
import './App.css';

const AuctionItem = ({ imageUrl, title, endTime }) => {
  const [currentBid, setCurrentBid] = useState(0);

  const handleBid = () => {
    setCurrentBid(currentBid + 100);
  };

  return (
    <div className="auction-item">
      <a href="#">
        <img src={imageUrl} alt={title} className="auction-image" />
      </a>
      <h3 className="auction-title">{title}</h3>
      <p>Current bid: ${currentBid}</p>
      <button onClick={handleBid} className="bid-button">Bid +$100</button>
      <div className="auction-timer">
        <Countdown date={endTime} />
      </div>
    </div>
  );
};

const App = () => {
  const auctionItems = [
    // Add your auction items here, with imageUrl, title, and endTime
    { imageUrl: 'https://via.placeholder.com/150', title: 'Item 1', endTime: Date.now() + 3600000 },
    { imageUrl: 'https://via.placeholder.com/150', title: 'Item 2', endTime: Date.now() + 7200000 },
    { imageUrl: 'https://via.placeholder.com/150', title: 'Item 3', endTime: Date.now() + 10800000 },
    // ...
  ];

  return (
    <div className="App">
      <div className="auction-grid">
        {auctionItems.map((item, index) => (
          <AuctionItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default App;
