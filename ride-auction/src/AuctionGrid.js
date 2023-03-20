import React, { useState, useEffect } from 'react';
import AuctionBlock from './AuctionBlock';
import api from './api';

const AuctionGrid = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get('/auctions');
        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="auction-grid">
      {auctions.map((auction) => (
        <AuctionBlock
          key={auction.id}
          title={auction.title}
          imageUrl={auction.imageUrl}
          endTime={auction.endTime}
        />
      ))}
    </div>
  );
};

export default AuctionGrid;