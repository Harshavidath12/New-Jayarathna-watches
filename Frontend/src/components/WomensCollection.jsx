import React, { useState } from 'react';
import './WomensCollection.css';

export const womensWatches = [
  {
    id: 201,
    brand: "WIMSONS",
    title: "Wimsons Vintage 2026LGMGG",
    image: "/women_wimsons.webp",
    tag: "SAVE 15%",
    newPrice: "Rs 39,500.00 LKR",
    oldPrice: "Rs 46,500.00 LKR",
    specs: {
      "Warranty": "2 years international warranty",
      "Crystal": "Hardened mineral crystal",
      "Movement": "Japanese Quartz movement",
      "Case shape": "Square",
      "Case colour": "Yellow Gold-tone",
      "Dial colour": "Sunray Gold",
      "Strap material": "Stainless steel mesh bracelet",
      "Strap colour": "Yellow Gold-tone",
      "Strap width": "14 mm",
      "Water resistance": "3 ATM"
    },
    description: "A premium classic timepiece, the Wimsons Vintage 2026LGMGG features an elegant square-cut gold-toned dial paired with a sophisticated gold mesh strap. Perfectly suited for both formal and casual settings."
  },
  {
    id: 202,
    brand: "TISSOT",
    title: "Tissot Flamingo (C5)",
    image: "/women_tissot.webp",
    tag: "SAVE 10%",
    newPrice: "Rs 164,600.00 LKR",
    oldPrice: "Rs 183,000.00 LKR",
    specs: {
      "Warranty": "2 years international warranty",
      "Crystal": "Scratch-resistant sapphire crystal",
      "Movement": "Swiss Quartz movement",
      "Case shape": "Round",
      "Case colour": "Polished Rose Gold-tone",
      "Dial colour": "Mother of Pearl",
      "Strap material": "Interlocking rose gold bracelet links",
      "Strap colour": "Rose Gold-tone",
      "Strap width": "12 mm",
      "Water resistance": "5 ATM"
    },
    description: "The Tissot Flamingo is an elegant piece of jewelry-inspired design, featuring a circular rose gold case with an exquisite mother of pearl dial and minimalist indicators. Designed to grace any women's wrist with classic charm."
  },
  {
    id: 203,
    brand: "DANIEL KLEIN",
    title: "Daniel Klein DK 1-13916-6 (P)",
    image: "/women_danielklein.webp",
    tag: "SAVE 12%",
    newPrice: "Rs 54,500.00 LKR",
    oldPrice: "Rs 62,000.00 LKR",
    specs: {
      "Warranty": "2 years international warranty",
      "Crystal": "Mineral crystal",
      "Movement": "Japanese Quartz movement",
      "Case shape": "Round",
      "Case colour": "Two-tone Silver/Rose Gold",
      "Dial colour": "Sunray Silver",
      "Strap material": "Two-tone link steel bracelet",
      "Strap colour": "Silver & Rose Gold",
      "Strap width": "16 mm",
      "Water resistance": "3 ATM"
    },
    description: "Boasting premium design and micro-crystals for indices, the Daniel Klein DK 1-13916-6 (P) represents modern grace. The silver sunray dial is perfectly housed inside a silver and rose gold two-tone case."
  },
  {
    id: 204,
    brand: "EMPORIO ARMANI",
    title: "Emporio Armani Women's Watch [C]",
    image: "/women_armani.webp",
    tag: "NEW",
    newPrice: "Rs 137,500.00 LKR",
    oldPrice: "",
    specs: {
      "Warranty": "2 years international warranty",
      "Crystal": "Mineral crystal",
      "Movement": "Quartz movement",
      "Case shape": "Rectangular",
      "Case colour": "Rose Gold with Micro-Crystals",
      "Dial colour": "Silver Roman Numeral",
      "Strap material": "Genuine alligator embossed leather",
      "Strap colour": "Midnight Black",
      "Strap width": "14 mm",
      "Water resistance": "3 ATM"
    },
    description: "This elegant Emporio Armani rectangular watch offers pure art-deco luxury. The rose gold bezel is paved with glittering micro-crystals surrounding a clean silver face with classic Roman numerals, completed by a sleek black leather strap."
  },
  {
    id: 205,
    brand: "TISSOT",
    title: "Tissot Lovely Square",
    image: "/watch_3.png",
    tag: "SAVE 15%",
    newPrice: "Rs 93,500.00 LKR",
    oldPrice: "Rs 110,000.00 LKR",
    specs: {
      "Warranty": "2 years international warranty",
      "Crystal": "Scratch-resistant sapphire crystal",
      "Movement": "Swiss Quartz movement",
      "Case shape": "Square",
      "Case colour": "Rose Gold-tone",
      "Dial colour": "Silver-White",
      "Strap material": "Rose gold mesh bracelet",
      "Strap colour": "Rose Gold-tone",
      "Strap width": "12 mm",
      "Water resistance": "3 ATM"
    },
    description: "An exquisite tribute to the small watch faces of the 1960s, the Tissot Lovely Square features a delicate square rose gold case and stunning mesh bracelet. Its classic, jewelry-like feel makes it a perfect accessory for any sophisticated outfit."
  },
  {
    id: 206,
    brand: "TISSOT",
    title: "Tissot Bellissima",
    image: "/watch_3.png",
    tag: "SAVE 5%",
    newPrice: "Rs 133,000.00 LKR",
    oldPrice: "Rs 140,000.00 LKR",
    specs: {
      "Warranty": "2 years international warranty",
      "Crystal": "Scratch-resistant sapphire crystal",
      "Movement": "Swiss Quartz movement",
      "Case shape": "Round",
      "Case colour": "Rose Gold-tone",
      "Dial colour": "Guilloche White",
      "Strap material": "Rose gold mesh bracelet",
      "Strap colour": "Rose Gold-tone",
      "Strap width": "12 mm",
      "Water resistance": "5 ATM"
    },
    description: "Designed for special moments and elegant evenings, the Tissot Bellissima presents a beautiful guilloche pattern on a crisp white dial, housed inside a warm rose gold plated stainless steel case."
  }
];

const WomensCollection = ({ onSelectProduct, onNavigate }) => {
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState('grid-4'); // grid-4, grid-3

  // Sort logic
  const sortedWatches = [...womensWatches].sort((a, b) => {
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
    <div className="womens-collection-page">
      {/* Decorative Breadcrumbs */}
      <div className="collection-header-banner">
        <div className="breadcrumbs">
          <span onClick={() => onNavigate('HOME')} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">Women's Watches</span>
        </div>
        <h2 className="collection-main-title">LADIES' SIGNATURE COLLECTION</h2>
        <p className="collection-tagline">Indulge in unparalleled elegance and jewelry-inspired sophistication.</p>
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
          {sortedWatches.length} timeless watches
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

export default WomensCollection;
