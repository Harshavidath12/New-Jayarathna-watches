import React from 'react';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onCheckout }) => {
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const priceVal = parseFloat(item.product.newPrice.replace(/[^0-9.]/g, ''));
      return acc + (priceVal * item.quantity);
    }, 0);
  };

  const formatCurrency = (val) => {
    return `Rs ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} LKR`;
  };

  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`cart-drawer-panel`} onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Shopping Cart</h2>
          <button onClick={onClose} className="cart-close-btn" aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Drawer Content */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">🛒</div>
              <p className="empty-cart-text">Your luxury vault is empty.</p>
              <button onClick={onClose} className="btn-continue-shopping">
                Start Exploring
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => {
                const { product, quantity } = item;
                return (
                  <div key={product.id} className="cart-item-row">
                    <div className="cart-item-image-wrapper">
                      <img src={product.image} alt={product.title} />
                    </div>
                    
                    <div className="cart-item-details">
                      <span className="cart-item-brand">{product.brand}</span>
                      <h4 className="cart-item-title">{product.title}</h4>
                      <div className="cart-item-price">{product.newPrice}</div>
                      
                      <div className="cart-item-actions">
                        <div className="cart-qty-selector">
                          <button 
                            onClick={() => onUpdateQty(product.id, quantity - 1)}
                            className="cart-qty-btn"
                          >
                            —
                          </button>
                          <span className="cart-qty-val">{quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(product.id, quantity + 1)}
                            className="cart-qty-btn"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => onRemoveItem(product.id)}
                          className="cart-remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-order-note-wrapper">
              <label htmlFor="order-note" className="cart-note-label">Add order note</label>
              <textarea 
                id="order-note" 
                placeholder="Special instructions for delivery..." 
                className="cart-note-textarea"
              ></textarea>
            </div>
            
            <div className="cart-shipping-notice">
              No extra fees — Shipping & taxes are free
            </div>
            
            <button onClick={onCheckout} className="btn-cart-checkout">
              <span>CHECKOUT</span>
              <span className="checkout-dot">•</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
