import React, { useState, useEffect } from 'react';
import './InventoryDashboard.css';

const InventoryDashboard = ({ onNavigate, onSignOut, onInventoryChange }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Inventory from backend Mongoose collection
  const fetchInventoryData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/inventory');
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch inventory');
      setInventory(data.inventory || []);
    } catch (err) {
      console.error(err);
      setError('Could not load inventory directory. Make sure the backend server is active.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // Update specific timepiece stock quantity in Mongoose
  const handleUpdateStock = async (itemId, newStock, newSold) => {
    if (newStock < 0) return;

    try {
      const res = await fetch(`http://localhost:5000/api/inventory/${itemId}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock: newStock, sold: newSold })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update stock');

      // Sync state locally
      setInventory(prev => prev.map(item => item._id === itemId ? data.item : item));
      
      // Notify parent App.jsx to update out-of-stock listings instantly
      if (onInventoryChange) {
        onInventoryChange();
      }
    } catch (err) {
      alert(err.message || 'Error updating timepiece stock.');
    }
  };

  // Lock stock to 0 ("Mark as Out of Stock") or restore it back to 10
  const handleToggleLockStock = (item) => {
    const isCurrentlyEmpty = item.stock <= 0;
    const nextStock = isCurrentlyEmpty ? 10 : 0;
    const actionWord = isCurrentlyEmpty ? 'RESTORE stock to 10' : 'LOCK this watch as OUT OF STOCK';

    if (window.confirm(`Are you sure you want to ${actionWord} for "${item.title}"?`)) {
      handleUpdateStock(item._id, nextStock, item.sold);
    }
  };

  // Filter lists based on query
  const filteredInventory = inventory.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.watchId && item.watchId.toString().includes(searchQuery))
  );

  // Computed metrics
  const totalAvailableStock = inventory.reduce((acc, item) => acc + item.stock, 0);
  const totalSold = inventory.reduce((acc, item) => acc + item.sold, 0);
  const outOfStockCount = inventory.filter(item => item.stock <= 0).length;

  return (
    <div className="inventory-dashboard-container animate-fade-in">
      {/* Brand Header Bar */}
      <header className="inventory-nav-header">
        <div className="logo-container inventory-nav-logo" onClick={() => onNavigate('HOME')}>
          <img src="/nj_watches_logo.png" alt="N.J. Watches Logo" className="site-logo-circle" style={{ width: '80px', height: '80px' }} />
        </div>
        
        <h2 className="inventory-board-tag">INVENTORY CONTROL BOARD</h2>

        <div className="inventory-nav-right">
          <button className="inventory-logout-btn" onClick={onSignOut}>
            Logout
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="inventory-dashboard-content">
        
        {/* KPI Metrics row */}
        <div className="inventory-stats-row">
          <div className="inventory-stat-card">
            <span className="inv-stat-label">Total Stocks</span>
            <strong className="inv-stat-val">{totalAvailableStock}</strong>
          </div>
          <div className="inventory-stat-card">
            <span className="inv-stat-label">Total Collectors Sold</span>
            <strong className="inv-stat-val gold-highlight">{totalSold}</strong>
          </div>
          <div className="inventory-stat-card">
            <span className="inv-stat-label">Depleted Timepieces (0 Stock)</span>
            <strong className={`inv-stat-val ${outOfStockCount > 0 ? 'text-red' : 'text-green'}`}>{outOfStockCount}</strong>
          </div>
          <div className="inventory-stat-card">
            <span className="inv-stat-label">Registered Timepieces</span>
            <strong className="inv-stat-val">{inventory.length}</strong>
          </div>
        </div>

        {/* Inventory Directory Table Card */}
        <section className="inventory-card">
          <div className="inventory-card-header split-header">
            <h3 className="inventory-card-title">Timepiece Stocks Directory</h3>
            
            {/* Search Input filter */}
            <div className="search-filter-box-wrapper">
              <input 
                type="text" 
                placeholder="Search timepiece or ID..."
                className="inv-search-filter-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-filter-btn" onClick={() => setSearchQuery('')}>✕</button>
              )}
            </div>
          </div>

          {error && <p className="inventory-error-banner">{error}</p>}

          {loading ? (
            <div className="inventory-loading-spinner">
              <span className="inv-spinner-dot"></span>
              <span>Syncing Mongoose inventory collection...</span>
            </div>
          ) : filteredInventory.length === 0 ? (
            <div className="inventory-empty-block">
              <span>No timepieces match your query.</span>
            </div>
          ) : (
            <div className="table-responsive-wrapper">
              <table className="inventory-directory-table">
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Timepiece Description</th>
                    <th>Stock Count</th>
                    <th>Sold Count</th>
                    <th>Fulfillment Status</th>
                    <th>Actions Override</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => {
                    const isOutOfStock = item.stock <= 0;
                    return (
                      <tr key={item._id} className={isOutOfStock ? 'row-out-of-stock' : ''}>
                        {/* Reference ID column */}
                        <td className="font-mono text-muted">
                          NJW-INV-{item.watchId?.toString().padStart(3, '0')}
                        </td>

                        {/* Title column */}
                        <td className="timepiece-desc-cell">
                          <strong>{item.title}</strong>
                        </td>

                        {/* Stock count column with quick editor */}
                        <td>
                          <div className="inline-stock-editor">
                            <button 
                              onClick={() => handleUpdateStock(item._id, item.stock - 1, item.sold)}
                              className="stock-adjust-btn"
                              disabled={item.stock <= 0}
                            >
                              —
                            </button>
                            <input 
                              type="number" 
                              className="stock-qty-input-field" 
                              value={item.stock}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val) && val >= 0) {
                                  handleUpdateStock(item._id, val, item.sold);
                                }
                              }}
                            />
                            <button 
                              onClick={() => handleUpdateStock(item._id, item.stock + 1, item.sold)}
                              className="stock-adjust-btn"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Sold count column */}
                        <td>
                          <div className="inline-sold-editor">
                            <button 
                              onClick={() => handleUpdateStock(item._id, item.stock, Math.max(0, item.sold - 1))}
                              className="stock-adjust-btn"
                              disabled={item.sold <= 0}
                            >
                              —
                            </button>
                            <span className="sold-value-text">{item.sold}</span>
                            <button 
                              onClick={() => handleUpdateStock(item._id, item.stock, item.sold + 1)}
                              className="stock-adjust-btn"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Status Column */}
                        <td>
                          <span className={`inv-status-badge ${isOutOfStock ? 'depleted' : 'healthy'}`}>
                            <span className="status-dot"></span>
                            {isOutOfStock ? 'OUT OF STOCK' : 'IN STOCK'}
                          </span>
                        </td>

                        {/* Action column */}
                        <td>
                          <button 
                            className={`btn-action-override ${isOutOfStock ? 'btn-restore' : 'btn-lock'}`}
                            onClick={() => handleToggleLockStock(item)}
                          >
                            {isOutOfStock ? 'Restore Stock' : 'Lock Out of Stock'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default InventoryDashboard;
