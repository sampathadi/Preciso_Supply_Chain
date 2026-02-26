import React, { useEffect, useState } from 'react';
import { warehouseAPI } from '../services/api';

export default function WarehouseSettings() {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState({ code: '', name: '', address: '', meta: '{}' });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    try {
      const res = await warehouseAPI.getAll();
      setWarehouses(res.data || []);
    } catch (err) {
      console.error('Failed to load warehouses', err);
    }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, meta: JSON.parse(form.meta || '{}') };
      if (editingId) {
        await warehouseAPI.update(editingId, payload);
      } else {
        await warehouseAPI.create(payload);
      }
      setForm({ code: '', name: '', address: '', meta: '{}' });
      setEditingId(null);
      load();
    } catch (err) {
      console.error('Save error', err);
      alert('Failed to save warehouse. Check console for details.');
    }
  };

  const handleEdit = (w) => {
    setEditingId(w._id);
    setForm({ code: w.code || '', name: w.name || '', address: w.address || '', meta: JSON.stringify(w.meta || {}, null, 2) });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this warehouse?')) return;
    try {
      await warehouseAPI.remove(id);
      load();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Warehouse Settings</h2>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Existing Warehouses</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Code</th>
                <th style={{ textAlign: 'left' }}>Name</th>
                <th style={{ textAlign: 'left' }}>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map(w => (
                <tr key={w._id}>
                  <td>{w.code}</td>
                  <td>{w.name}</td>
                  <td>{w.address}</td>
                  <td>
                    <button onClick={() => handleEdit(w)}>Edit</button>
                    <button onClick={() => handleDelete(w._id)} style={{ marginLeft: 8 }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ width: 420 }}>
          <h3>{editingId ? 'Edit' : 'Create'} Warehouse</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 8 }}>
              <label>Code</label><br />
              <input name="code" value={form.code} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Name</label><br />
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Address</label><br />
              <input name="address" value={form.address} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <label>Settings (JSON)</label><br />
              <textarea name="meta" rows={6} value={form.meta} onChange={handleChange} style={{ width: '100%' }} />
            </div>
            <div>
              <button type="submit">Save</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ code: '', name: '', address: '', meta: '{}' }); }} style={{ marginLeft: 8 }}>Cancel</button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
