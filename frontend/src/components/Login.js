import React, { useState } from 'react';
import { authAPI } from '../services/api';
import '../styles/Login.css';

const GOOGLE_AUTH_URL = "http://localhost:5000/api/auth/google/login";
const MICROSOFT_AUTH_URL = "http://localhost:5000/api/auth/microsoft/login";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleMicrosoftLogin = () => {
    window.location.href = MICROSOFT_AUTH_URL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(email, password);

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      // Pass only the user object to the parent handler to avoid
      // rendering the whole response object as a React child elsewhere.
      onLoginSuccess && onLoginSuccess(response.data.user);
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background" />
      <div className="decorative-circles">
        <div className="circle circle-1" />
        <div className="circle circle-2" />
        <div className="circle circle-3" />
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-logo">
            <div className="logo-icon">📦</div>
            <h1>Preciseo supply-chain</h1>
            <p>Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a className="forgot-password" href="#">Forgot?</a>
            </div>

            <button type="submit" disabled={loading} className="login-button">
              {loading ? <span className="loading-spinner" /> : 'Sign In'}
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="social-login">
            <button onClick={handleGoogleLogin} className="social-btn google-btn">
              <span>🔎</span> Continue with Google
            </button>

            <button onClick={handleMicrosoftLogin} className="social-btn microsoft-btn">
              <span>🪟</span> Continue with Microsoft
            </button>
          </div>

          <div className="signup-link">
            <p>Don't have an account? <a href="#" onClick={() => window.location.href = '/register'}>Sign up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
