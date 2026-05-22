import React from 'react';
import './OrderSuccess.css';

const OrderSuccess = ({ customerName, onContinueShopping }) => {
  // Generate random order ID
  const orderId = `NJW-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="order-success-page">
      <div className="success-glass-card">
        
        {/* Animated Checkmark Badge */}
        <div className="success-checkmark-wrapper">
          <svg className="success-svg" viewBox="0 0 52 52">
            <circle className="success-svg-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="success-svg-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>

        <h1 className="success-title">Timepiece Secured</h1>
        
        <p className="success-message">
          Thank you, <span className="highlight-customer-name">{customerName}</span>! Your order has been placed successfully. A confirmation email and tracking link will be sent shortly.
        </p>

        {/* Order Details Details Panel */}
        <div className="success-details-panel">
          <div className="details-row">
            <span className="details-label">Order Reference:</span>
            <span className="details-value font-mono font-bold">{orderId}</span>
          </div>
          <div className="details-row">
            <span className="details-label">Est. Delivery:</span>
            <span className="details-value">2 - 3 Business Days (Sri Lanka)</span>
          </div>
          <div className="details-row">
            <span className="details-label">Shipping Method:</span>
            <span className="details-value">Free Premium Courier Delivery</span>
          </div>
        </div>

        <button onClick={onContinueShopping} className="btn-success-shopping">
          Continue Shopping
        </button>

      </div>
    </div>
  );
};

export default OrderSuccess;
