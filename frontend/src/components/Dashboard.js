import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sweetsAPI, auth } from '../services/api';
import SweetCard from './SweetCard';
import AddSweetModal from './AddSweetModal';
import SearchBar from './SearchBar';
import './Dashboard.css';

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate('/login');
      return;
    }

    const currentUser = auth.getUser();
    setUser(currentUser);
    fetchSweets();
  }, [navigate]);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await sweetsAPI.getAll();
      setSweets(response.data);
      setFilteredSweets(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load sweets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchParams) => {
    try {
      setLoading(true);
      const response = await sweetsAPI.search(searchParams);
      setFilteredSweets(response.data);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setFilteredSweets(sweets);
  };

  const handlePurchase = async (id) => {
    try {
      await sweetsAPI.purchase(id);
      fetchSweets();
      alert('Purchase successful!');
    } catch (err) {
      alert(err.response?.data?.error || 'Purchase failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await sweetsAPI.delete(id);
      fetchSweets();
      alert('Sweet deleted successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Delete failed');
    }
  };

  const handleRestock = async (id) => {
    const amount = prompt('Enter restock amount:');
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      await sweetsAPI.restock(id, parseInt(amount));
      fetchSweets();
      alert('Restock successful!');
    } catch (err) {
      alert(err.response?.data?.error || 'Restock failed');
    }
  };

  const handleAddSweet = () => {
    fetchSweets();
    setShowAddModal(false);
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  if (loading && sweets.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🍬 Sweet Shop Dashboard</h1>
          <div className="header-actions">
            <span className="user-info">
              Welcome, <strong>{user?.username}</strong>
              {user?.isAdmin && <span className="admin-badge">Admin</span>}
            </span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="controls">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            + Add Sweet
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {filteredSweets.length === 0 ? (
          <div className="no-sweets">
            <p>No sweets found. Add some sweets to get started!</p>
          </div>
        ) : (
          <div className="sweets-grid">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handlePurchase}
                onDelete={handleDelete}
                onRestock={handleRestock}
                onUpdate={fetchSweets}
                isAdmin={user?.isAdmin}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddSweet}
        />
      )}
    </div>
  );
}

export default Dashboard;