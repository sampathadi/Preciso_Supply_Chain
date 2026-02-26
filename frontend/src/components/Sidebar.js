import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">Preciseo supply-chain&nbsp;&nbsp;<span className="muted">Private Ltd</span></div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? 'side-link active' : 'side-link'}>Home</NavLink>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? 'side-link active' : 'side-link'}>Analytics</NavLink>
        <NavLink to="/projects" className={({isActive}) => isActive ? 'side-link active' : 'side-link'}>Projects</NavLink>
        <NavLink to="/services" className={({isActive}) => isActive ? 'side-link active' : 'side-link'}>Services</NavLink>
        <NavLink to="/warehouse3d" className={({isActive}) => isActive ? 'side-link active' : 'side-link'}>Warehouse 3D</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'side-link active' : 'side-link'}>About us</NavLink>
      </nav>
    </aside>
  );
}
