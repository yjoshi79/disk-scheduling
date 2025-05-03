import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header-container">
      <div className="header-left">
        <h2>Disk Scheduling Algorithms</h2>
      </div>
      <div className="header-right">
        <Link to="/" className="header-link">Home</Link>
        <Link to="/about" className="header-link">About Us</Link>
      </div>
    </header>
  );
};

export default Header;
