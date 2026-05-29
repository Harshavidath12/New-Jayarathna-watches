import React, { useState } from 'react';
import './ProductDetail.css';

const ProductDetail = ({ product, onAddToCart, onBuyItNow, onNavigate }) => {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleDecreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncreaseQty = () => {
    setQty(qty + 1);
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="detail-breadcrumbs">
          <span onClick={() => onNavigate('HOME')} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span 
            onClick={() => onNavigate((product.id >= 200 || product.category === 'WOMEN') ? 'WOMENS_COLLECTION' : 'MENS_COLLECTION')} 
            className="breadcrumb-link"
          >
            {(product.id >= 200 || product.category === 'WOMEN') ? "Women's Collection" : "Men's Collection"}
          </span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">{product.title}</span>
        </div>

        {/* Dynamic Split Layout */}
        <div className="product-detail-layout">
          {/* Left Column: Premium Watch Viewport */}
          <div className="product-detail-left">
            <div className="product-detail-image-card">
              <span className="product-detail-tag-badge">EXCLUSIVE</span>
              <img src={product.image} alt={product.title} className="detail-main-image" />
            </div>
            
            {/* Elegant Side Visuals for rich aesthetics */}
            <div className="product-detail-media-gallery">
              <div className="gallery-thumb active"><img src={product.image} alt="Front View" /></div>
            </div>
          </div>

          {/* Right Column: Spec list, Pricing, and Action buttons */}
          <div className="product-detail-right">
            <div className="detail-brand-wrapper">
              <span className="detail-brand-text">{product.brand}</span>
            </div>
            
            <h1 className="detail-product-title">{product.title}</h1>
            
            <div className="detail-pricing-box">
              {product.oldPrice && (
                <span className="detail-old-price">{product.oldPrice}</span>
              )}
              <span className="detail-new-price">{product.newPrice}</span>
            </div>

            {/* Structured Specifications Bulleted List */}
            <div className="detail-specs-section">
              <h3 className="specs-section-title">TIMEPICHE SPECIFICATIONS</h3>
              <ul className="specs-grid-list">
                {Object.entries(product.specs || {}).map(([key, val]) => (
                  <li key={key} className="specs-item">
                    <span className="specs-key">{key}:</span>
                    <span className="specs-val">{val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description Text */}
            <div className="detail-description-section">
              <h3 className="specs-section-title">THE DESIGN STORY</h3>
              <p className="detail-description-text">{product.description}</p>
            </div>

            {/* Interactive Quantity Adjustments and Buy Buttons */}
            <div className="detail-actions-box">
              <div className="quantity-controls-wrapper">
                <span className="qty-label">Quantity</span>
                <div className="quantity-selector">
                  <button 
                    onClick={handleDecreaseQty} 
                    className="qty-btn"
                    aria-label="Decrease quantity"
                  >
                    —
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button 
                    onClick={handleIncreaseQty} 
                    className="qty-btn"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="checkout-buttons-group">
                <button 
                  onClick={() => onAddToCart(product, qty)} 
                  className="btn-detail-action btn-add-cart"
                >
                  ADD TO CART
                </button>
                
                <button 
                  onClick={() => onBuyItNow(product, qty)} 
                  className="btn-detail-action btn-buy-now"
                >
                  BUY IT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
