import React, { useState } from 'react';
import './MensCollection.css';

export const mensWatches = [
  {
    id: 101,
    brand: "SEIKO",
    title: "Seiko Prospex Two-Tone Automatic",
    image: "/men_seiko.jpg",
    tag: "SAVE 8%",
    newPrice: "Rs 84,500.00 LKR",
    oldPrice: "Rs 92,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Hardlex crystal",
      "Movement": "Automatic self-winding 24-jewel mechanical",
      "Case material": "Gold-plated and stainless steel",
      "Case shape": "Round",
      "Case colour": "Two-tone gold/silver",
      "Dial colour": "Sunray White & Gold",
      "Strap material": "Stainless steel two-tone link bracelet",
      "Strap colour": "Two-tone gold/silver",
      "Strap width": "22 mm",
      "Closure": "Three-fold clasp with secure lock",
      "Water resistance": "20 ATM / 200m"
    },
    description: "A premium classic two-tone timepiece, the Seiko Prospex features a robust gold and silver case with a clean white sunray dial decorated with gold hands and dynamic markers."
  },
  {
    id: 102,
    brand: "SEIKO",
    title: "Seiko 5 Sports Military Automatic",
    image: "/men_seiko2.webp",
    tag: "SAVE 8%",
    newPrice: "Rs 96,200.00 LKR",
    oldPrice: "Rs 105,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Hardened mineral crystal",
      "Movement": "Japanese automatic mechanical",
      "Case material": "Matte-finished stainless steel",
      "Case shape": "Round",
      "Case colour": "Silver-tone",
      "Dial colour": "Stealth Black",
      "Strap material": "Heavy nylon tactical strap",
      "Strap colour": "Charcoal Black",
      "Strap width": "20 mm",
      "Closure": "Buckle",
      "Water resistance": "10 ATM / 100m"
    },
    description: "Built for field utilities, this Seiko 5 Sports Military edition features a sandblasted matte case and tactical charcoal canvas strap. Glow-in-the-dark LumiBrite indicators ensure perfect night legibility."
  },
  {
    id: 103,
    brand: "POLICE",
    title: "Police Translucent Chrono Red",
    image: "/men_police.webp",
    tag: "SAVE 10%",
    newPrice: "Rs 78,900.00 LKR",
    oldPrice: "Rs 88,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Hardened mineral",
      "Movement": "High-accuracy quartz chronograph",
      "Case material": "PVD coated stainless steel",
      "Case shape": "Round",
      "Case colour": "Matte Black PVD",
      "Dial colour": "Skeletonized Black",
      "Strap material": "Soft silicone tactical strap",
      "Strap colour": "Bright Red",
      "Strap width": "22 mm",
      "Closure": "Prong buckle",
      "Water resistance": "5 ATM"
    },
    description: "Boasting bold Italian style, the Police Translucent Chrono combines a high-contrast bright red silicone strap with a matte black PVD case and skeletonized dark dial."
  },
  {
    id: 104,
    brand: "TISSOT",
    title: "Tissot PR 100 Chrono Classic",
    image: "/men_tissot_pr100.webp",
    tag: "SAVE 9%",
    newPrice: "Rs 72,500.00 LKR",
    oldPrice: "Rs 80,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Scratch-resistant sapphire",
      "Movement": "Swiss high-precision quartz",
      "Case material": "316L Surgical stainless steel",
      "Case shape": "Round",
      "Case colour": "Two-tone gold/silver",
      "Dial colour": "Sunray Silver",
      "Strap material": "Stainless steel two-tone link bracelet",
      "Strap colour": "Two-tone gold/silver",
      "Strap width": "20 mm",
      "Closure": "Safety folding clasp",
      "Water resistance": "10 ATM / 100m"
    },
    description: "An outstanding Swiss classic, the Tissot PR 100 features a premium gold-accented bezel and matching two-tone bracelet surrounding a clean silver face with gold indices."
  },
  {
    id: 105,
    brand: "WIMSONS",
    title: "Wimsons Executive Chrono Silver",
    image: "/men_wimsons.webp",
    tag: "SAVE 7%",
    newPrice: "Rs 185,000.00 LKR",
    oldPrice: "Rs 199,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Double-dome mineral crystal",
      "Movement": "Japanese chronograph movement",
      "Case material": "Stainless steel",
      "Case shape": "Round",
      "Case colour": "Polished Silver",
      "Dial colour": "Sunray Ice Blue",
      "Strap material": "Stainless steel link bracelet",
      "Strap colour": "Silver",
      "Strap width": "22 mm",
      "Closure": "Butterfly deployant clasp",
      "Water resistance": "5 ATM"
    },
    description: "Sophisticated and clean, the Wimsons Executive features a polished silver stainless steel case and matching bracelet, housing an exquisite sunray ice blue dial with Roman numeral indexes."
  },
  {
    id: 106,
    brand: "TIMBERLAND",
    title: "Timberland Outdoor Aviator",
    image: "/men_timberland.webp",
    tag: "SAVE 8%",
    newPrice: "Rs 165,000.00 LKR",
    oldPrice: "Rs 180,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Hardened mineral glass",
      "Movement": "High-torque quartz chrono",
      "Case material": "Tactical gunmetal steel",
      "Case shape": "Round",
      "Case colour": "Gunmetal Grey",
      "Dial colour": "Stealth Black",
      "Strap material": "Branded leather strap",
      "Strap colour": "Light Tan",
      "Strap width": "22 mm",
      "Closure": "Prong buckle",
      "Water resistance": "10 ATM"
    },
    description: "An adventure-ready utility watch featuring a sandblasted gunmetal case. The high-contrast black dial features bold numerals and a highly functional branded tan leather strap."
  },
  {
    id: 107,
    brand: "CASIO",
    title: "Casio Edifice Chronograph",
    image: "/men_casio.webp",
    tag: "SAVE 10%",
    newPrice: "Rs 148,000.00 LKR",
    oldPrice: "Rs 165,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Mineral glass",
      "Movement": "Japanese Quartz chronograph",
      "Case material": "Solid stainless steel",
      "Case shape": "Round",
      "Case colour": "Silver-tone",
      "Dial colour": "Sunray Emerald Green",
      "Strap material": "Stainless steel link bracelet",
      "Strap colour": "Silver-tone",
      "Strap width": "22 mm",
      "Closure": "Safety deployment clasp",
      "Water resistance": "10 ATM"
    },
    description: "Designed for high-speed sport, the Casio Edifice features a vibrant sunray emerald green dial housed inside a robust silver stainless steel case and link bracelet."
  },
  {
    id: 108,
    brand: "OBAKU",
    title: "Obaku Denmark Classic",
    image: "/men_obaku.webp",
    tag: "SAVE 10%",
    newPrice: "Rs 115,000.00 LKR",
    oldPrice: "Rs 128,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Hardened titan glass",
      "Movement": "Precision Danish Quartz",
      "Case material": "Ultra-thin stainless steel",
      "Case shape": "Round",
      "Case colour": "Polished Rose Gold-tone",
      "Dial colour": "Midnight Black",
      "Strap material": "Black stainless steel mesh",
      "Strap colour": "Polished Black",
      "Strap width": "20 mm",
      "Closure": "Sliding safety buckle",
      "Water resistance": "3 ATM"
    },
    description: "Embodying classic Scandinavian design principles, this ultra-slim Obaku timepiece offers pure minimalism. Features a rose gold finished shell and fine black mesh strap."
  },
  {
    id: 109,
    brand: "ROYAL LONDON",
    title: "Royal London Gold Heritage",
    image: "/men_royallondon.webp",
    tag: "SAVE 9%",
    newPrice: "Rs 89,000.00 LKR",
    oldPrice: "Rs 98,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Hardened mineral crystal",
      "Movement": "High-torque quartz movement",
      "Case material": "18K Gold plated steel",
      "Case shape": "Round",
      "Case colour": "Yellow Gold-tone",
      "Dial colour": "Ivory White",
      "Strap material": "Stainless steel gold-plated link bracelet",
      "Strap colour": "Yellow Gold-tone",
      "Strap width": "20 mm",
      "Closure": "Folding clasp",
      "Water resistance": "5 ATM"
    },
    description: "This elegant Royal London Heritage watch captures British vintage luxury, featuring an 18K yellow gold-plated case paired with a matching gold-plated steel link bracelet and pristine white dial."
  },
  {
    id: 110,
    brand: "STRAND",
    title: "Strand Denmark Classic",
    image: "/men_strand.webp",
    tag: "SAVE 10%",
    newPrice: "Rs 135,000.00 LKR",
    oldPrice: "Rs 150,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Mineral crystal",
      "Movement": "Eco-friendly solar powered quartz",
      "Case material": "Recycled stainless steel",
      "Case shape": "Round",
      "Case colour": "Silver-tone",
      "Dial colour": "Sunray Blue",
      "Strap material": "Genuine calf leather",
      "Strap colour": "Chestnut Brown",
      "Strap width": "20 mm",
      "Closure": "Buckle clasp",
      "Water resistance": "5 ATM"
    },
    description: "Powered by light, this Strand Denmark watch represents sustainable elegance. The blue sunburst dial is surrounded by a sleek silver case and classic chestnut brown leather strap."
  },
  {
    id: 111,
    brand: "TIMEX",
    title: "Timex Heritage Chrono",
    image: "/men_timex.webp",
    tag: "SAVE 8%",
    newPrice: "Rs 69,500.00 LKR",
    oldPrice: "Rs 76,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Mineral crystal",
      "Movement": "High-accuracy quartz chronograph",
      "Case material": "Polished stainless steel",
      "Case shape": "Round",
      "Case colour": "Silver & White",
      "Dial colour": "Deep Blue",
      "Strap material": "Two-tone silver & white steel bracelet",
      "Strap colour": "Silver & White",
      "Strap width": "20 mm",
      "Closure": "Prong buckle",
      "Water resistance": "3 ATM"
    },
    description: "The Timex Heritage combines vintage style with robust chronograph dials. Features a deep blue dial and a stylish two-tone silver and white steel bracelet."
  },
  {
    id: 112,
    brand: "WIMSONS",
    title: "Wimsons Vintage Rectangular",
    image: "/men_vintage.webp",
    tag: "SAVE 10%",
    newPrice: "Rs 210,000.00 LKR",
    oldPrice: "Rs 235,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Mineral glass",
      "Movement": "Precision Japanese Quartz",
      "Case material": "Stainless steel",
      "Case shape": "Rectangular",
      "Case colour": "Silver-tone",
      "Dial colour": "Deep Charcoal Black",
      "Strap material": "Stainless steel link bracelet",
      "Strap colour": "Silver-tone",
      "Strap width": "22 mm",
      "Closure": "Folding clasp",
      "Water resistance": "5 ATM"
    },
    description: "This retro Wimsons timepiece pays homage to early watch design, presenting an elegant silver rectangular case and matching steel link bracelet surrounding a deep charcoal black face."
  }
];

const MensCollection = ({ onSelectProduct, onNavigate, outOfStockTitles = [] }) => {
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState('grid-4'); // grid-4, grid-3, list

  // Sort logic
  const sortedWatches = [...mensWatches].sort((a, b) => {
    const parsePrice = (priceStr) => parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    if (sortBy === 'Price: Low to High') {
      return parsePrice(a.newPrice) - parsePrice(b.newPrice);
    } else if (sortBy === 'Price: High to Low') {
      return parsePrice(b.newPrice) - parsePrice(a.newPrice);
    } else if (sortBy === 'Alphabetically: A-Z') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'Alphabetically: Z-A') {
      return b.title.localeCompare(a.title);
    }
    return 0; // Featured
  });

  return (
    <div className="mens-collection-page">
      {/* Decorative Breadcrumbs */}
      <div className="collection-header-banner">
        <div className="breadcrumbs">
          <span onClick={() => onNavigate('HOME')} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">Men's Watches</span>
        </div>
        <h2 className="collection-main-title">GENTLEMEN'S SIGNATURE COLLECTION</h2>
        <p className="collection-tagline">Experience timeless sophistication with our meticulously curated luxury timepieces.</p>
      </div>

      {/* Filter and Control Bar */}
      <div className="collection-controlscontainer container">
        <div className="view-mode-selectors">
          <button 
            className={`view-btn ${viewMode === 'grid-4' ? 'active' : ''}`}
            onClick={() => setViewMode('grid-4')}
            title="4 Columns Grid"
          >
            <span className="icon-grid-4"></span>
          </button>
          <button 
            className={`view-btn ${viewMode === 'grid-3' ? 'active' : ''}`}
            onClick={() => setViewMode('grid-3')}
            title="3 Columns Grid"
          >
            <span className="icon-grid-3"></span>
          </button>
        </div>

        <div className="products-count-badge">
          {sortedWatches.length} exceptional timepieces
        </div>

        <div className="sort-dropdown-wrapper">
          <span className="sort-label">Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className="sort-select"
          >
            <option>Featured</option>
            <option>Alphabetically: A-Z</option>
            <option>Alphabetically: Z-A</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        <div className={`collection-product-grid ${viewMode}`}>
          {sortedWatches.map((watch) => (
            <div 
              key={watch.id} 
              className="luxury-product-card"
              onClick={() => onSelectProduct(watch)}
            >
              <div className="luxury-card-media">
                {watch.tag && (
                  <span className="luxury-tag-badge">{watch.tag}</span>
                )}
                {outOfStockTitles?.includes(watch.title) && (
                  <span className="luxury-tag-badge out-of-stock-badge">OUT OF STOCK</span>
                )}
                <div className="luxury-image-viewport">
                  <img src={watch.image} alt={watch.title} className="luxury-watch-image" />
                </div>
                <div className="luxury-hover-overlay">
                  <button className="luxury-view-detail-btn">
                    EXPLORE TIMEPIECE
                  </button>
                </div>
              </div>

              <div className="luxury-card-info">
                <span className="luxury-watch-brand">{watch.brand}</span>
                <h3 className="luxury-watch-title">{watch.title}</h3>
                <div className="luxury-watch-pricing">
                  {watch.oldPrice && (
                    <span className="luxury-old-price">{watch.oldPrice}</span>
                  )}
                  <span className="luxury-new-price">{watch.newPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MensCollection;
