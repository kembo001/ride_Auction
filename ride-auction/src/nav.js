import React from 'react';
// import logo from './logo.png';
import './nav.css';

function NavigationBar() {
  return (
    <nav id="navbar">
      {/* <img src={logo} alt="Logo" className="navbar-logo" /> */}
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <a href="/" className="navbar-link">Auctions</a>
        </li>
        <li className="navbar-list-item">
          <a href="/" className="navbar-link">Sell a Car</a>
        </li>
        <li className="navbar-list-item">
          <a href="/" className="navbar-link">What's Cars &amp; Bids?</a>
        </li>
        <li className="navbar-list-item">
          <button type="button" className="navbar-link navbar-daily-email">Daily Email</button>
        </li>
      </ul>
      <form className="navbar-search">
        <input type="text" placeholder="Search" className="navbar-search-input" />
      </form>
      <a href="/" className="navbar-signup">Sign Up</a>
    </nav>
  );
}

export default NavigationBar;
