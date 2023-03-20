class Auction {
    constructor(id, title, imageUrl, endTime, highestBid, highestBidder) {
      this.id = id;
      this.title = title;
      this.imageUrl = imageUrl;
      this.endTime = endTime;
      this.highestBid = highestBid;
      this.highestBidder = highestBidder;
    }
  }
  
  const auctions = [
    // Add mock auction objects here
  ];
  
  module.exports = { Auction, auctions };
  ﻿
  