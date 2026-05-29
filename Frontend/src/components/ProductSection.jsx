import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductSection.css';

const ProductSection = ({ title, subtitle, products, onNavigate, onSelectProduct }) => {
  const [activeTab, setActiveTab] = useState('MEN');

  const filteredProducts = products.filter(p => p.category === activeTab);

  return (
    <section className="product-section container">
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <h2 className="section-title">{title}</h2>
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'MEN' ? 'active' : ''}`}
          onClick={() => setActiveTab('MEN')}
        >
          MEN
        </button>
        <button 
          className={`tab-btn ${activeTab === 'WOMEN' ? 'active' : ''}`}
          onClick={() => setActiveTab('WOMEN')}
        >
          WOMEN
        </button>
      </div>
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            {...product} 
            onClick={() => onSelectProduct(product)} 
          />
        ))}
      </div>
      
      <div className="section-footer">
        <button 
          onClick={() => onNavigate(activeTab === 'MEN' ? 'MENS_COLLECTION' : 'WOMENS_COLLECTION')} 
          className="btn btn-outline-dark"
        >
          View Full Collection
        </button>
      </div>
    </section>
  );
};

export default ProductSection;
