import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("authToken", res.data.token);
      if (remember) localStorage.setItem("rememberEmail", email);

      try { onLoginSuccess && onLoginSuccess(res.data.user); } catch (e) {}

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background" />

      <div className="decorative-circles">
        <span className="circle circle-1" />
        <span className="circle circle-2" />
        <span className="circle circle-3" />
      </div>

      <div className="login-content center">
        <div className="login-card surface">
          <div className="login-logo">
            <div className="logo-icon" aria-hidden>
              🚚
            </div>
            <h1>Preciseo supply-chain</h1>
            <p>Sign in to continue to your dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  id="email"
                  className="input"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                /> Remember me
              </label>

              <Link to="/forgot" className="forgot-password">Forgot?</Link>
            </div>

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? <span className="loading-spinner" /> : 'Sign in'}
            </button>

            <div className="divider">Or continue with</div>

            <div className="social-login">
              <button
                type="button"
                className="social-btn google-btn"
                onClick={() => { const api = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; window.location.href = `${api}/api/auth/google`; }}
              >Google</button>

              <button
                type="button"
                className="social-btn microsoft-btn"
                onClick={() => { const api = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; window.location.href = `${api}/api/auth/microsoft`; }}
              >Microsoft</button>
            </div>

            <div className="signup-link">Don't have an account? <Link to="/register">Register</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
