import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ onNavigate, onSignOut }) => {
  const [activeSection, setActiveSection] = useState('orders'); // 'users' or 'orders'
  
  // Data lists
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Loading & Error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Filter for orders
  const [orderFilter, setOrderFilter] = useState('All'); // 'All', 'Processing', 'Delivered'

  // Fetch users & orders from backend APIs
  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Fetch Users
      const usersRes = await fetch('http://localhost:5000/api/admin/users');
      const usersData = await usersRes.json();
      if (!usersRes.ok) throw new Error(usersData.message || 'Failed to fetch users');
      setUsers(usersData.users || []);

      // 2. Fetch Orders
      const ordersRes = await fetch('http://localhost:5000/api/admin/bookings');
      const ordersData = await ordersRes.json();
      if (!ordersRes.ok) throw new Error(ordersData.message || 'Failed to fetch orders');
      setOrders(ordersData.bookings || []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error loading dashboard data. Please make sure the backend is active.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Update order status in backend MongoDB booking collection
  const handleUpdateStatus = async (orderId, currentStatus) => {
    const nextStatus = currentStatus === 'Processing' ? 'Delivered' : 'Processing';
    if (!window.confirm(`Are you sure you want to change order status to "${nextStatus}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/bookings/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: nextStatus })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update order status');
      }

      // Sync state instantly in UI
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: nextStatus } : order
        )
      );
    } catch (err) {
      alert(err.message || 'Error updating order status.');
    }
  };

  // Filtered orders selector
  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'All') return true;
    return order.status === orderFilter;
  });

  const processingCount = orders.filter(o => o.status === 'Processing' || !o.status).length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="admin-dashboard-container animate-fade-in">
      {/* Premium Minimal Header */}
      <header className="admin-nav-header">
        <div className="logo-container admin-nav-logo" onClick={() => onNavigate('HOME')}>
          <img src="/nj_watches_logo.png" alt="N.J. Watches Logo" className="site-logo-circle" style={{ width: '80px', height: '80px' }} />
        </div>
        
        <h2 className="admin-board-tag">ADMIN CONTROL BOARD</h2>

        <div className="admin-nav-right">
          <button className="admin-logout-btn" onClick={onSignOut}>
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard Content Container */}
      <main className="admin-dashboard-content">
        
        {/* KPI Stats Row */}
        <div className="admin-stats-row">
          <div className="admin-stat-card">
            <span className="stat-label">Total Collectors</span>
            <strong className="stat-val">{users.length}</strong>
          </div>
          <div className="admin-stat-card">
            <span className="stat-label">Total Timepiece Bookings</span>
            <strong className="stat-val">{orders.length}</strong>
          </div>
          <div className="admin-stat-card">
            <span className="stat-label">Processing Dispatch</span>
            <strong className="stat-val highlight-gold">{processingCount}</strong>
          </div>
          <div className="admin-stat-card">
            <span className="stat-label">Delivered Successfully</span>
            <strong className="stat-val text-green">{deliveredCount}</strong>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="admin-section-tabs">
          <button 
            className={`admin-tab-btn ${activeSection === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            Manage Timepiece Orders ({orders.length})
          </button>
          <button 
            className={`admin-tab-btn ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            Registered Collectors ({users.length})
          </button>
        </div>

        {error && <p className="admin-error-banner">{error}</p>}

        {loading ? (
          <div className="admin-loading-spinner">
            <span className="spinner-dot"></span>
            <span>Refreshing horological registry...</span>
          </div>
        ) : (
          <>
            {activeSection === 'users' && (
              /* Users Listing Card */
              <section className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Registered User Directory</h3>
                  <button className="btn-refresh" onClick={fetchAdminData}>Refresh List</button>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="admin-directory-table">
                    <thead>
                      <tr>
                        <th>Collector ID</th>
                        <th>Username</th>
                        <th>Email Address</th>
                        <th>Date Registered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, idx) => (
                        <tr key={item._id || idx}>
                          <td className="font-mono text-muted">USR-{item._id?.toString().substring(18).toUpperCase()}</td>
                          <td><strong>{item.name}</strong></td>
                          <td>{item.email}</td>
                          <td>
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeSection === 'orders' && (
              /* Orders Listing & Status Controller Section */
              <section className="admin-card">
                <div className="admin-card-header split-header">
                  <h3 className="admin-card-title">Timepiece Bookings Registry</h3>
                  
                  {/* Status filter toggles */}
                  <div className="status-filter-group">
                    <button 
                      className={`filter-badge-btn ${orderFilter === 'All' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('All')}
                    >
                      All
                    </button>
                    <button 
                      className={`filter-badge-btn ${orderFilter === 'Processing' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('Processing')}
                    >
                      Processing ({processingCount})
                    </button>
                    <button 
                      className={`filter-badge-btn ${orderFilter === 'Delivered' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('Delivered')}
                    >
                      Delivered ({deliveredCount})
                    </button>
                  </div>
                </div>

                {filteredOrders.length === 0 ? (
                  <div className="admin-empty-block">
                    <span>No orders match this status criteria.</span>
                  </div>
                ) : (
                  <div className="admin-orders-list-grid">
                    {filteredOrders.map((order) => (
                      <div key={order._id} className="admin-order-detail-invoice">
                        {/* Header Details */}
                        <div className="admin-invoice-top">
                          <div>
                            <span className="invoice-ref-tag">Order Reference</span>
                            <strong className="invoice-ref-val">NJW-{order._id.toString().substring(0, 8).toUpperCase()}</strong>
                          </div>

                          {/* Toggle Action Status Button */}
                          <div className="status-toggle-wrapper">
                            <span className={`status-badge-val ${order.status === 'Delivered' ? 'delivered' : 'processing'}`}>
                              <span className="status-dot"></span>
                              {order.status || 'Processing'}
                            </span>
                            
                            <button 
                              onClick={() => handleUpdateStatus(order._id, order.status || 'Processing')}
                              className="btn-change-status-action"
                            >
                              Mark as {order.status === 'Delivered' ? 'Processing' : 'Delivered'}
                            </button>
                          </div>
                        </div>

                        {/* Body Details */}
                        <div className="admin-invoice-details-grid">
                          <div className="meta-details-col">
                            <span className="meta-sec-label">Date Placed</span>
                            <span className="meta-sec-val">
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>

                            <span className="meta-sec-label margin-top">Delivered To (Recipient)</span>
                            <span className="meta-sec-val">
                              <strong>{order.firstName} {order.lastName}</strong><br />
                              {order.address}{order.apartment ? ', ' + order.apartment : ''}<br />
                              {order.city}, {order.postalCode}<br />
                              Contact: {order.phone || order.emailOrPhone}
                            </span>
                          </div>

                          <div className="meta-details-col">
                            <span className="meta-sec-label">Billing Address</span>
                            <span className="meta-sec-val">
                              {order.billingAddressType === 'Same' ? (
                                <span className="text-muted italic">Same as shipping address</span>
                              ) : (
                                <span>
                                  {order.billingAddress}{order.billingApartment ? ', ' + order.billingApartment : ''}<br />
                                  {order.billingCity}, {order.billingPostalCode}
                                </span>
                              )}
                            </span>

                            <span className="meta-sec-label margin-top">Payment Details</span>
                            <span className="meta-sec-val">
                              Secure Card Booking ({order.cardType || 'Visa/Mastercard'})
                            </span>
                          </div>

                          <div className="meta-details-items-col">
                            <span className="meta-sec-label">Purchased Timepieces</span>
                            <div className="admin-items-receipt-box">
                              {order.items.map((item, index) => (
                                <div key={index} className="admin-item-receipt-row">
                                  <span>{item.title} <strong>x{item.quantity}</strong></span>
                                  <strong>{item.price}</strong>
                                </div>
                              ))}
                              <div className="admin-receipt-total-row">
                                <span>Total Paid</span>
                                <strong className="gold-text">{order.totalAmount}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
