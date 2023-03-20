import React, { useState } from 'react';
import api from './api';

const AuctionBlock = ({ title, imageUrl, endTime }) => {
  const [bid, setBid] = useState(0);

  const placeBid = async () => {
    try {
      setBid(bid + 100);
      const response = await api.post(/auctions/$,{id}/bid, { bid: bid + 100 });
      console.log('Bid placed successfully:', response.data);
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  // Rest of the component code
};