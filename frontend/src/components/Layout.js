import React from 'react';
import Navbar from '../Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '../App.css';

function Layout({ userName, onLogout }) {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-shell">
        <Navbar userName={userName} onLogout={onLogout} />
        <main className="app-content">
          <Outlet />
        </main>
        <footer className="app-footer">© {new Date().getFullYear()} Preciseo supply-chain — All rights reserved.</footer>
      </div>
    </div>
  );
}

export default Layout;
