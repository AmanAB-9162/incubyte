import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI, auth } from '../services/api';
import './Auth.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.loginAdmin(username, password);
      
      auth.setToken(response.data.token);
      auth.setUser(response.data.user);
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Admin login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🍬 Sweet Shop</h1>
        <h2>Admin Login</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Admin Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter admin username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter admin password"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Logging in...' : 'Admin Login'}
          </button>
        </form>

        <p className="auth-link">
          Not an admin? <Link to="/login">User Login</Link>
        </p>
        <p className="auth-link">
          Register as admin? <Link to="/admin/register">Admin Register</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;