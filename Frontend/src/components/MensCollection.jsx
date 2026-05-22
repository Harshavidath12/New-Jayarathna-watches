import React, { useState } from 'react';
import './MensCollection.css';

export const mensWatches = [
  {
    id: 101,
    brand: "FOSSIL",
    title: "Aether Garrett Chrono",
    image: "/watch_1.png",
    tag: "SAVE 8%",
    newPrice: "Rs 84,500.00 LKR",
    oldPrice: "Rs 92,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Mineral crystal",
      "Movement": "Quartz chronograph",
      "Case material": "Stainless steel",
      "Case shape": "Round",
      "Case colour": "Deep Silver",
      "Dial colour": "Emerald Green",
      "Strap material": "Genuine calf leather",
      "Strap colour": "Dark Mahogany Brown",
      "Strap width": "22 mm",
      "Closure": "Single prong strap buckle",
      "Water resistance": "10 ATM"
    },
    description: "The Aether Garrett Chrono combines the classic warmth of textured dark brown leather with an eye-catching deep emerald green dial. Featuring triple sub-dials for chronograph timing and a rugged, scalloped unidirectional bezel, this piece makes a bold statement without sacrificing daily comfort."
  },
  {
    id: 102,
    brand: "FOSSIL",
    title: "Vanguard Dean Two-Tone",
    image: "/watch_2.png",
    tag: "SAVE 8%",
    newPrice: "Rs 96,200.00 LKR",
    oldPrice: "Rs 105,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Mineral crystal",
      "Movement": "Precision quartz chronograph",
      "Case material": "Brushed & Polished Stainless Steel",
      "Case shape": "Round",
      "Case colour": "Two-tone gold/silver",
      "Dial colour": "Sunray Silver-White",
      "Strap material": "Solid stainless steel bracelet",
      "Strap colour": "Two-tone gold/silver",
      "Strap width": "22 mm",
      "Closure": "Single press deployant clasp",
      "Water resistance": "5 ATM"
    },
    description: "Drawing inspiration from clean mid-century architecture, the Vanguard Dean features an exquisite two-tone stainless steel bracelet with warm gold accents. The crisp white dial houses gold-trimmed chronograph rings, gold index markers, and an elegant circular date window."
  },
  {
    id: 103,
    brand: "FOSSIL",
    title: "Sport Tourer Perforated",
    image: "/watch_1.png",
    tag: "SAVE 10%",
    newPrice: "Rs 78,900.00 LKR",
    oldPrice: "Rs 88,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Scratch-resistant mineral",
      "Movement": "Japanese Quartz Chrono",
      "Case material": "Stainless steel",
      "Case shape": "Round",
      "Case colour": "Silver-tone",
      "Dial colour": "Warm Cream",
      "Strap material": "Perforated rally leather",
      "Strap colour": "Tobacco Brown",
      "Strap width": "22 mm",
      "Closure": "Strap buckle",
      "Water resistance": "10 ATM"
    },
    description: "Designed for those with a passion for classic motor-racing, the Sport Tourer features a rich cream-colored dial surrounded by a black tachymeter bezel. The perforated dark-brown leather strap provides breathable utility while emphasizing vintage racetrack aesthetics."
  },
  {
    id: 104,
    brand: "FOSSIL",
    title: "Minimalist Horizon Gold",
    image: "/watch_4.png",
    tag: "SAVE 9%",
    newPrice: "Rs 72,500.00 LKR",
    oldPrice: "Rs 80,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Mineral crystal",
      "Movement": "Two-hand slim quartz",
      "Case material": "Slim profiles stainless steel",
      "Case shape": "Round",
      "Case colour": "Polished Gold-tone",
      "Dial colour": "Eggshell Cream",
      "Strap material": "Genuine calf leather",
      "Strap colour": "Chestnut Brown",
      "Strap width": "20 mm",
      "Closure": "Prong buckle",
      "Water resistance": "3 ATM"
    },
    description: "Stripping away all distractions, the Horizon Gold watch showcases a remarkably thin 7mm gold-plated case housing an uncluttered eggshell-cream dial. Completed with a soft chestnut leather strap, it is the ultimate expression of sophisticated minimalism."
  },
  {
    id: 105,
    brand: "TISSOT",
    title: "Tissot Seastar Chrono-Pro",
    image: "/watch_2.png",
    tag: "SAVE 7%",
    newPrice: "Rs 185,000.00 LKR",
    oldPrice: "Rs 199,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Sapphire crystal with anti-reflective coating",
      "Movement": "Swiss Quartz Chronograph",
      "Case material": "316L Stainless Steel",
      "Case shape": "Round",
      "Case colour": "Silver",
      "Dial colour": "Deep Ocean Navy",
      "Strap material": "Solid oyster link steel",
      "Strap colour": "Silver",
      "Strap width": "22 mm",
      "Closure": "Safety folding clasp with diver extension",
      "Water resistance": "30 ATM / 300m"
    },
    description: "Engineered for deep ocean expeditions, the Tissot Seastar boasts 300 meters of water resistance, a screw-down crown, and a unidirectional ceramic bezel. The deep navy blue sunburst dial provides high-legibility luminescent markings in low-light environments."
  },
  {
    id: 106,
    brand: "SWATCH x OMEGA",
    title: "Mission to Earthphase Special",
    image: "/watch_4.png",
    tag: "SAVE 8%",
    newPrice: "Rs 165,000.00 LKR",
    oldPrice: "Rs 180,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Bio-sourced plexiglass",
      "Movement": "Precision quartz chronograph",
      "Case material": "Bioceramic matte finish",
      "Case shape": "Round",
      "Case colour": "Slate Grey",
      "Dial colour": "Graphite Dark Grey",
      "Strap material": "Velcro® tactical strap",
      "Strap colour": "Charcoal Black",
      "Strap width": "20 mm",
      "Closure": "Velcro closure loop",
      "Water resistance": "3 ATM"
    },
    description: "Part of the legendary planetary series, this edition showcases a matte grey Bioceramic case coupled with a tactical black Velcro strap. Features the iconic Speedmaster asymmetrical case profile along with dual moonphase and innovative earthphase indicators."
  },
  {
    id: 107,
    brand: "NOUVEAU ROYAL",
    title: "Monarch Gold Royal",
    image: "/watch_2.png",
    tag: "SAVE 10%",
    newPrice: "Rs 148,000.00 LKR",
    oldPrice: "Rs 165,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Dome hardened mineral glass",
      "Movement": "Automatic self-winding mechanical",
      "Case material": "18K Gold plated stainless steel",
      "Case shape": "Round",
      "Case colour": "Polished Yellow Gold",
      "Dial colour": "Textured Ivory",
      "Strap material": "Alligator embossed leather",
      "Strap colour": "Dark Espresso Brown",
      "Strap width": "20 mm",
      "Closure": "Butterly deployment buckle",
      "Water resistance": "5 ATM"
    },
    description: "An exceptional luxury timepiece, the Monarch Gold Royal houses a premium self-winding mechanical movement visible through the exhibition caseback. The textured ivory dial is adorned with classic Roman numerals and Breguet-style hands."
  },
  {
    id: 108,
    brand: "N.J. WATCHES",
    title: "Chronos Elite Obsidian",
    image: "/watch_1.png",
    tag: "SAVE 10%",
    newPrice: "Rs 115,000.00 LKR",
    oldPrice: "Rs 128,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Sapphire-coated crystal",
      "Movement": "High-torque quartz chronograph",
      "Case material": "PVD matte black steel",
      "Case shape": "Round",
      "Case colour": "Matte Obsidian Black",
      "Dial colour": "Stealth Black",
      "Strap material": "Stainless steel mesh",
      "Strap colour": "Matte Black",
      "Strap width": "22 mm",
      "Closure": "Sliding safety buckle",
      "Water resistance": "5 ATM"
    },
    description: "Designed for a bold stealth appearance, the Chronos Elite Obsidian features an all-black PVD coated surgical steel case. The dark indices and hands glow softly with premium Swiss Super-LumiNova for night readability."
  },
  {
    id: 109,
    brand: "FOSSIL",
    title: "Navigator Classic Cognac",
    image: "/watch_4.png",
    tag: "SAVE 9%",
    newPrice: "Rs 89,000.00 LKR",
    oldPrice: "Rs 98,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Mineral crystal",
      "Movement": "Quartz chronograph with date",
      "Case material": "Stainless steel",
      "Case shape": "Round",
      "Case colour": "Polished Silver-tone",
      "Dial colour": "Deep Sunburst Navy",
      "Strap material": "Genuine vintage leather",
      "Strap colour": "Cognac Brown",
      "Strap width": "22 mm",
      "Closure": "Prong buckle",
      "Water resistance": "10 ATM"
    },
    description: "The Navigator Classic blends a gorgeous dark navy blue face with a high-end cognac leather strap that develops a stunning natural patina over time. Equipped with functional chronograph dials and a robust, water-sealed case."
  },
  {
    id: 110,
    brand: "TISSOT",
    title: "Aero-Sport Chronograph",
    image: "/watch_1.png",
    tag: "SAVE 10%",
    newPrice: "Rs 135,000.00 LKR",
    oldPrice: "Rs 150,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Anti-reflective sapphire glass",
      "Movement": "High accuracy Swiss quartz",
      "Case material": "Titanium grey PVD steel",
      "Case shape": "Round",
      "Case colour": "Gunmetal Grey",
      "Dial colour": "Aviation Khaki Green",
      "Strap material": "Heavy nylon tactical canvas",
      "Strap colour": "Olive Green",
      "Strap width": "22 mm",
      "Closure": "Buckle",
      "Water resistance": "10 ATM"
    },
    description: "An aviation-inspired high performance timepiece featuring a sandblasted gunmetal PVD case. The high-contrast khaki green dial displays oversized numeric indices, chronograph sub-dials, and an orange accent second hand."
  },
  {
    id: 111,
    brand: "FOSSIL",
    title: "Minimalist Eclipse Black",
    image: "/watch_4.png",
    tag: "SAVE 8%",
    newPrice: "Rs 69,500.00 LKR",
    oldPrice: "Rs 76,000.00 LKR",
    specs: {
      "Warranty": "3 years",
      "Crystal": "Hardened mineral glass",
      "Movement": "Two-hand Japanese quartz",
      "Case material": "Ultra-thin stainless steel",
      "Case shape": "Round",
      "Case colour": "Matte Black PVD",
      "Dial colour": "Deep Velvet Black",
      "Strap material": "Soft calfskin leather",
      "Strap colour": "Matte Jet Black",
      "Strap width": "20 mm",
      "Closure": "Buckle",
      "Water resistance": "3 ATM"
    },
    description: "This model delivers pure understatement. A dark black velvet dial is offset only by gold hours/minutes indicators and elegant hands, giving it an exquisite nocturnal grace perfect for evening wear."
  },
  {
    id: 112,
    brand: "SWATCH x OMEGA",
    title: "Master Calibre Titanium",
    image: "/watch_2.png",
    tag: "SAVE 10%",
    newPrice: "Rs 210,000.00 LKR",
    oldPrice: "Rs 235,000.00 LKR",
    specs: {
      "Warranty": "2 years",
      "Crystal": "Anti-reflective dome sapphire",
      "Movement": "Swiss precision automatic",
      "Case material": "Grade 5 brushed titanium",
      "Case shape": "Round",
      "Case colour": "Brushed Grey Titanium",
      "Dial colour": "Slate Grey Sunburst",
      "Strap material": "Titanium link bracelet",
      "Strap colour": "Brushed Grey",
      "Strap width": "21 mm",
      "Closure": "Deployment buckle with pushers",
      "Water resistance": "20 ATM"
    },
    description: "Crafted from Grade 5 titanium, this luxury chronograph is both incredibly lightweight and scratch-resistant. Inside beats a precision Swiss automatic movement, beautifully visible through a rear sapphire exhibition case."
  }
];

const MensCollection = ({ onSelectProduct, onNavigate }) => {
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
