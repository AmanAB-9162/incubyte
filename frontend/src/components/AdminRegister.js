import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!adminSecret) {
      setError('Admin secret key is required');
      return;
    }

    setLoading(true);

    try {
      await authAPI.registerAdmin(username, password, adminSecret);
      alert('Admin registration successful! Please login.');
      navigate('/admin/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Admin registration failed. Check your secret key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>🍬 Sweet Shop</h1>
        <h2>Admin Register</h2>
        
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
              placeholder="Choose admin username"
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
              placeholder="Choose password (min 6 characters)"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Confirm your password"
            />
          </div>

          <div className="form-group">
            <label>Admin Secret Key</label>
            <input
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter admin secret key"
            />
            <small style={{ color: '#666', fontSize: '0.85em' }}>
              Contact system administrator for the secret key
            </small>
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Registering...' : 'Register as Admin'}
          </button>
        </form>

        <p className="auth-link">
          Already have admin account? <Link to="/admin/login">Admin Login</Link>
        </p>
        <p className="auth-link">
          Regular user? <Link to="/login">User Login</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;