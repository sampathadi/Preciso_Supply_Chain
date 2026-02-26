import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/forgot', { email });
      setSent(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally { setLoading(false); }
  };

  return (
    <div className="login-container">
      <div className="login-content center">
        <div className="login-card surface" style={{ maxWidth: 520 }}>
          <h2 style={{ marginBottom: 8 }}>Reset your password</h2>
          <p style={{ color: 'var(--muted)', marginTop: 0 }}>Enter your account email and we'll send a reset link.</p>

          {sent ? (
            <div className="error-message" style={{ background:'#f0fdf4', color:'#065f46', borderLeft:'4px solid #86efac' }}>
              Reset link sent (check console in dev).
            </div>
          ) : null}

          <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
            <div className="form-group">
              <label>Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send reset link'}</button>
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/login')}>Back to login</button>
            </div>
          </form>

          <div style={{ marginTop: 16 }}>Don't have an account? <Link to="/register">Register</Link></div>
        </div>
      </div>
    </div>
  );
}
