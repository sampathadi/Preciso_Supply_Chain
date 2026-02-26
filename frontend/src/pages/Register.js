import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", { name, email, password });
      const res = await API.post("/auth/login", { email, password });
      if (res?.data?.token) localStorage.setItem("authToken", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="login-container">
      <div className="login-content center">
        <div className="login-card surface" style={{ maxWidth: 520 }}>
          <div className="login-logo">
            <div className="logo-icon">🚚</div>
            <h1>Create your account</h1>
            <p style={{ color: 'var(--muted)', marginTop: 0 }}>Quick sign up to access your dashboard</p>
          </div>

          <form onSubmit={handleRegister} className="login-form">
            <div className="form-group">
              <label>Name</label>
              <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button className="login-button" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
            </div>

            <div style={{ marginTop: 14 }}>Already have an account? <Link to="/login">Sign in</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
