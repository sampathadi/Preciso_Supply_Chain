import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Reset() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('token');
    if (!t) return navigate('/login');
    setToken(t);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return alert('Passwords do not match');
    setLoading(true);
    try {
      await API.post('/auth/reset', { token, password });
      alert('Password reset successful — please sign in');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Reset failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="login-container">
      <div className="login-content center">
        <div className="login-card surface" style={{ maxWidth: 520 }}>
          <h2>Set a new password</h2>
          <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
            <div className="form-group">
              <label>New password</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Confirm new password</label>
              <input className="input" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Set password'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
