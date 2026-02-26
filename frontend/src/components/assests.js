import React, { useState, useEffect } from 'react';
import { assetAPI } from '../services/api';
import '../styles/Pages.css';

function Assets() {
  const [assets, setAssets] = useState([
    { id: 'AST-001', name: 'Warehouse A', type: 'Facility', status: 'Active', location: 'New York' },
    { id: 'AST-002', name: 'Truck Fleet 1', type: 'Vehicle', status: 'Active', location: 'Los Angeles' },
    { id: 'AST-003', name: 'Container Stock', type: 'Equipment', status: 'Active', location: 'Chicago' },
    { id: 'AST-004', name: 'Distribution Hub', type: 'Facility', status: 'Maintenance', location: 'Houston' },
    { id: 'AST-005', name: 'Drone Fleet', type: 'Technology', status: 'Active', location: 'Seattle' },
    { id: 'AST-006', name: 'Cargo Ship Fleet', type: 'Vehicle', status: 'Active', location: 'Miami' },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await assetAPI.getAllAssets();
        if (response.data.assets && Array.isArray(response.data.assets)) {
          setAssets(response.data.assets);
        }
      } catch (err) {
        console.error('Error fetching assets:', err);
        setError('Failed to load assets');
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const response = await assetAPI.searchAssets(searchTerm);
      if (response.data.assets) {
        setAssets(response.data.assets);
      }
    } catch (err) {
      console.error('Error searching assets:', err);
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAsset = async (id) => {
    try {
      await assetAPI.deleteAsset(id);
      setAssets(assets.filter(asset => asset.id !== id));
    } catch (err) {
      console.error('Error deleting asset:', err);
      setError('Failed to delete asset');
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = status === 'Active' ? 'success' : 'warning';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Assets Management</h1>
        <p>Track and manage all supply chain assets</p>
      </div>

      <div className="actions-bar">
        <button className="add-btn">➕ Add New Asset</button>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </div>

      {error && <p className="error-text">{error}</p>}
      {loading && <p>Loading assets...</p>}

      <div className="table-container">
        <table className="assets-table">
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="asset-id">{asset.id}</td>
                <td className="asset-name">{asset.name}</td>
                <td>{asset.type}</td>
                <td>{getStatusBadge(asset.status)}</td>
                <td>{asset.location}</td>
                <td>
                  <button className="action-link">✏️ Edit</button>
                  <button
                    className="action-link delete"
                    onClick={() => handleDeleteAsset(asset.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="asset-stats">
        <div className="stat-card">
          <h3>Total Assets</h3>
          <p className="big-number">2,456</p>
        </div>
        <div className="stat-card">
          <h3>Active</h3>
          <p className="big-number">2,329</p>
        </div>
        <div className="stat-card">
          <h3>In Maintenance</h3>
          <p className="big-number">127</p>
        </div>
      </div>
    </div>
  );
}

export default Assets;
