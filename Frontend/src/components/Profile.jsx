import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ user, onSignOut, onNavigate, onUpdateUser, initialTab = 'profile' }) => {
  // Tabs management ('profile' or 'orders')
  const [activeTab, setActiveTab] = useState(initialTab);

  // Orders listing states
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  // Sync activeTab when initialTab prop changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Fetch orders dynamically from backend Mongoose Booking collection when orders tab is active
  useEffect(() => {
    if (user?.email && activeTab === 'orders') {
      const fetchOrders = async () => {
        setOrdersLoading(true);
        setOrdersError('');
        try {
          const response = await fetch(`http://localhost:5000/api/bookings/user/${encodeURIComponent(user.email)}`);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch orders');
          }
          setOrders(data.bookings || []);
        } catch (err) {
          console.error(err);
          setOrdersError(err.message || 'Could not load your orders. Please try again.');
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user?.email, activeTab]);

  // Inline edit state for Name
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(user?.name || '');
  const [nameError, setNameError] = useState('');
  const [nameLoading, setNameLoading] = useState(false);

  // Address adding state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);

  // Name save operation
  const handleSaveName = async () => {
    if (!tempName.trim()) {
      setNameError('Name cannot be empty.');
      return;
    }

    setNameLoading(true);
    setNameError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/update-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: tempName.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update name');
      }

      onUpdateUser(data.user);
      setIsEditingName(false);
    } catch (err) {
      setNameError(err.message || 'Error updating name.');
    } finally {
      setNameLoading(false);
    }
  };

  // Address save operation
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!newAddress.trim()) {
      setAddressError('Address cannot be empty.');
      return;
    }

    setAddressLoading(true);
    setAddressError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/add-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          address: newAddress.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add address');
      }

      onUpdateUser(data.user);
      setNewAddress('');
      setIsAddingAddress(false);
    } catch (err) {
      setAddressError(err.message || 'Error adding address.');
    } finally {
      setAddressLoading(false);
    }
  };

  // Address deletion operation
  const handleRemoveAddress = async (index) => {
    if (!window.confirm('Are you sure you want to remove this address?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/remove-address', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          index: index
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to remove address');
      }

      onUpdateUser(data.user);
    } catch (err) {
      alert(err.message || 'Error removing address.');
    }
  };

  return (
    <div className="profile-page-container">
      {/* Premium minimal navigation bar */}
      <header className="profile-nav-header">
        <div className="logo-container profile-nav-logo" onClick={() => onNavigate('HOME')}>
          <img src="/nj_watches_logo.png" alt="N.J. Watches Logo" className="site-logo-circle" style={{ width: '80px', height: '80px' }} />
        </div>
        
        <div className="profile-nav-links">
          <button 
            className={`profile-nav-link ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => onNavigate('ORDERS')}
          >
            Orders
          </button>
          <button 
            className={`profile-nav-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => onNavigate('PROFILE')}
          >
            Profile
          </button>
        </div>

        <div className="profile-nav-right">
          <div className="profile-avatar-circle" aria-label="User Account" onClick={() => setActiveTab('profile')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </header>

      {/* Dashboard container */}
      <main className="profile-dashboard-content">
        <h2 className="profile-dashboard-title">
          {activeTab === 'orders' ? 'Orders' : 'Profile'}
        </h2>

        {activeTab === 'orders' ? (
          /* Orders Tab Content */
          <section className="profile-card orders-card">
            {ordersLoading ? (
              <div className="orders-loading-spinner">
                <span className="spinner-dot"></span>
                <span>Loading your orders...</span>
              </div>
            ) : ordersError ? (
              <p className="orders-error-text">{ordersError}</p>
            ) : orders.length === 0 ? (
              <div className="no-orders-block-large">
                <h3 className="no-orders-title">No orders yet</h3>
                <p className="no-orders-subtext">
                  <span className="store-link" onClick={() => onNavigate('HOME')}>Go to store</span> to place an order.
                </p>
              </div>
            ) : (
              <div className="orders-list-container animate-fade-in">
                {orders.map((order) => (
                  <div key={order._id} className="premium-order-invoice-card">
                    <div className="order-invoice-header">
                      <div className="order-ref-block">
                        <span className="order-ref-label">Order Reference</span>
                        <strong className="order-ref-code">
                          NJW-{order._id.toString().substring(0, 8).toUpperCase()}
                        </strong>
                      </div>
                      <div className={`order-status-badge ${order.status === 'Delivered' ? 'delivered' : ''}`}>
                        <span className={`status-dot-active ${order.status === 'Delivered' ? 'green-dot' : ''}`}></span>
                        {order.status === 'Delivered' ? 'Delivered Successfully' : 'Processing Dispatch'}
                      </div>
                    </div>

                    <div className="order-invoice-body">
                      <div className="order-meta-info-grid">
                        <div>
                          <span className="meta-label">Date Placed</span>
                          <span className="meta-val">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="meta-label">Shipping Method</span>
                          <span className="meta-val">Free Premium Courier</span>
                        </div>
                        <div>
                          <span className="meta-label">Est. Delivery</span>
                          <span className="meta-val highlight-gold">2-3 Business Days</span>
                        </div>
                      </div>

                      <div className="order-items-divider"></div>

                      <div className="order-items-list-block">
                        <h4 className="purchased-items-title">Purchased Timepieces</h4>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="purchased-item-row">
                            <div className="purchased-item-info">
                              <span className="purchased-item-bullet">•</span>
                              <div>
                                <span className="purchased-item-name">{item.title}</span>
                                <span className="purchased-item-qty">Qty: {item.quantity}</span>
                              </div>
                            </div>
                            <span className="purchased-item-price">{item.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="order-items-divider"></div>

                      <div className="order-invoice-footer">
                        <div className="billing-address-summary">
                          <span className="meta-label">Delivered To</span>
                          <span className="meta-val-address">
                            {order.firstName} {order.lastName}, {order.address}, {order.city}
                          </span>
                        </div>
                        <div className="order-total-block">
                          <span className="total-label-small">Total Paid</span>
                          <strong className="total-price-large">{order.totalAmount}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ) : (
          /* Profile Tab Content */
          <>
            {/* 1. Account details card */}
            <section className="profile-card info-card">
              <div className="profile-card-field">
                <span className="field-label">Name</span>
                {isEditingName ? (
                  <div className="inline-edit-container">
                    <input
                      type="text"
                      className="inline-edit-input"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      disabled={nameLoading}
                      autoFocus
                    />
                    <button 
                      className="inline-save-btn" 
                      onClick={handleSaveName}
                      disabled={nameLoading}
                    >
                      {nameLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button 
                      className="inline-cancel-btn" 
                      onClick={() => {
                        setTempName(user?.name || '');
                        setIsEditingName(false);
                        setNameError('');
                      }}
                      disabled={nameLoading}
                    >
                      Cancel
                    </button>
                    {nameError && <p className="inline-edit-error">{nameError}</p>}
                  </div>
                ) : (
                  <div className="field-value-wrapper">
                    <span className="field-value">{user?.name || 'Valued Customer'}</span>
                    <button 
                      className="edit-pencil-btn" 
                      onClick={() => setIsEditingName(true)}
                      aria-label="Edit Name"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-card-field">
                <span className="field-label">Email</span>
                <span className="field-value disabled-value">{user?.email || 'harshithavidath@gmail.com'}</span>
              </div>
            </section>

            {/* 2. Addresses Card */}
            <section className="profile-card addresses-card">
              <div className="addresses-card-header">
                <h3 className="addresses-card-title">Addresses</h3>
                {!isAddingAddress && (
                  <button className="add-address-btn" onClick={() => setIsAddingAddress(true)}>
                    + Add
                  </button>
                )}
              </div>

              {/* Add Address Inline Form */}
              {isAddingAddress && (
                <form onSubmit={handleAddAddress} className="add-address-form">
                  {addressError && <p className="address-form-error">{addressError}</p>}
                  <div className="address-input-group">
                    <input
                      type="text"
                      placeholder="Enter full address details..."
                      className="address-input-field"
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      disabled={addressLoading}
                      required
                      autoFocus
                    />
                    <div className="address-form-actions">
                      <button type="submit" className="address-submit-btn" disabled={addressLoading}>
                        {addressLoading ? 'Adding...' : 'Add'}
                      </button>
                      <button 
                        type="button" 
                        className="address-cancel-btn" 
                        onClick={() => {
                          setNewAddress('');
                          setIsAddingAddress(false);
                          setAddressError('');
                        }}
                        disabled={addressLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Addresses Listing */}
              {user?.addresses && user.addresses.length > 0 ? (
                <ul className="addresses-list">
                  {user.addresses.map((addr, index) => (
                    <li key={index} className="address-list-item">
                      <div className="address-text-wrapper">
                        <span className="address-number-tag">#{index + 1}</span>
                        <p className="address-content">{addr}</p>
                      </div>
                      <button 
                        className="remove-address-btn" 
                        onClick={() => handleRemoveAddress(index)}
                        aria-label="Remove Address"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-addresses-block">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="info-icon">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <span>No addresses added</span>
                </div>
              )}
            </section>

            {/* 3. Action Buttons Section */}
            <section className="profile-actions-wrapper">
              <button className="profile-signout-btn" onClick={onSignOut}>
                Sign out
              </button>
              <button className="profile-signout-all-btn" onClick={onSignOut}>
                Sign out of all devices
              </button>
            </section>
          </>
        )}
      </main>

      {/* Footer Navigation bar links */}
      <footer className="profile-footer-nav">
        <div className="profile-footer-links">
          <span className="profile-footer-link" onClick={() => onNavigate('HOME')}>Refund policy</span>
          <span className="profile-footer-link" onClick={() => onNavigate('HOME')}>Shipping</span>
          <span className="profile-footer-link" onClick={() => onNavigate('HOME')}>Privacy policy</span>
          <span className="profile-footer-link" onClick={() => onNavigate('HOME')}>Terms of service</span>
          <span className="profile-footer-link" onClick={() => onNavigate('HOME')}>Contact information</span>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
