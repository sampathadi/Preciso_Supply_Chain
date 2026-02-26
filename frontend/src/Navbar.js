import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Navbar.css';

function Navbar({ userName, onLogout }) {
  const loc = useLocation();

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="brand">
          <Link to="/" className="brand-link">📦 <span>Preciseo supply-chain</span></Link>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12,flex:1}}>
          <div className="search-box">
            <input placeholder="Search..." />
          </div>
        </div>

        <div className="nav-actions">
          <div className="user-name">👤 {userName || 'Guest'}</div>
          { (userName || localStorage.getItem('authToken')) ? (
            <button className="btn-logout" onClick={onLogout}>Logout</button>
          ) : (
            <Link to="/login" className="btn-login">Login</Link>
          ) }
        </div>
      </div>
    </header>
  );
}

export default Navbar;
