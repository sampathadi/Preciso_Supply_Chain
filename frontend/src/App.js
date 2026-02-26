import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Home from './components/home';
import About from './components/about';
import Assets from './components/assests';
import WarehouseSettings from './pages/WarehouseSettings';
import WarehouseDashboard from './pages/WarehouseDashboard';
import Warehouse3D from './pages/Warehouse3D';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuthSuccess from './pages/OAuthSuccess';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState('');

  const handleLoginSuccess = (user) => {
    const name = user?.name || user?.email || (typeof user === 'string' ? user : '');
    setUserName(name);
  };

  const handleLogout = () => {
    setUserName('');
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        <Route element={<Layout userName={userName} onLogout={handleLogout} />}>
          <Route path="/" element={<Landing onLoginClick={() => window.location.href = '/login'} />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/warehouses" element={<ProtectedRoute roles={["admin","warehouse_manager"]}><WarehouseSettings /></ProtectedRoute>} />
          <Route path="/warehouses/dashboard" element={<ProtectedRoute roles={["admin","warehouse_manager"]}><WarehouseDashboard /></ProtectedRoute>} />
          <Route path="/warehouse3d" element={<Warehouse3D />} />
          <Route path="/about" element={<About />} />
          <Route path="/assets" element={<Assets />} />
        </Route>

        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
