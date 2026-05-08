import React from 'react';
import './Brands.css';

const brands = [
  "ARMANI EXCHANGE", "FOSSIL", "HUGO BOSS", "SWATCH x OMEGA",
  "TAG HEUER", "TISSOT", "TOMMY HILFIGER", "ROLEX"
];

const Brands = () => {
  return (
    <section className="brands-section container">
      <h2 className="section-title">Our Brands</h2>
      
      <div className="brands-grid">
        {brands.map((brand, idx) => (
          <div key={idx} className="brand-pill">
            <span className="brand-name">{brand}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
