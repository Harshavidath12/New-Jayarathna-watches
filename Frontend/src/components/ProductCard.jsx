import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, tag, brand, title, oldPrice, newPrice, darkTag, isOutOfStock, onClick }) => {
  return (
    <div className="product-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-image-wrapper">
        {tag && (
          <span className={`card-tag ${darkTag ? 'tag-dark' : 'tag-danger'}`}>
            {tag}
          </span>
        )}
        {isOutOfStock && (
          <span className="card-tag out-of-stock-badge">
            OUT OF STOCK
          </span>
        )}
        <img src={image} alt={title} className="card-image" />
        <div className="card-overlay">
          <button className="quick-view-btn">Quick View</button>
        </div>
      </div>
      
      <div className="card-details">
        <span className="card-brand">{brand}</span>
        <h3 className="card-title">{title}</h3>
        <div className="card-pricing">
          {oldPrice && <span className="old-price">{oldPrice}</span>}
          <span className="new-price">{newPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
