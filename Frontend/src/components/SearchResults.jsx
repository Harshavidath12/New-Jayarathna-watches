import React from 'react';
import { mensWatches } from './MensCollection';
import { womensWatches } from './WomensCollection';
import './MensCollection.css'; // Reuses the beautiful watch card layout
import './SearchResults.css';

const SearchResults = ({ searchQuery, onSelectProduct, onNavigate }) => {
  const allWatches = [...mensWatches, ...womensWatches];
  
  // Exclude duplicate products that may share similar IDs or titles if any
  const uniqueWatches = [];
  const titles = new Set();
  for (const watch of allWatches) {
    if (!titles.has(watch.title)) {
      titles.add(watch.title);
      uniqueWatches.push(watch);
    }
  }

  // Filter based on search query
  const filteredWatches = uniqueWatches.filter(watch => 
    watch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    watch.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-results-page animate-fade-in">
      {/* Search Header Banner */}
      <div className="collection-header-banner">
        <div className="breadcrumbs">
          <span onClick={() => onNavigate('HOME')} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">Search Results</span>
        </div>
        <h2 className="collection-main-title">SEARCH THE VAULT</h2>
        <p className="collection-tagline">Showing results for: <strong className="gold-highlight">"{searchQuery}"</strong></p>
      </div>

      {/* Control Badge */}
      <div className="collection-controlscontainer container">
        <div className="products-count-badge">
          {filteredWatches.length} exceptional {filteredWatches.length === 1 ? 'timepiece' : 'timepieces'} found
        </div>
      </div>

      {/* Grid or Empty Block */}
      <div className="container">
        {filteredWatches.length === 0 ? (
          <div className="no-search-results-block">
            <div className="empty-magnifier-icon">🔍</div>
            <h3 className="no-results-heading">No Timepieces Found</h3>
            <p className="no-results-subtext">
              We couldn't find any watches matching your search. Please check your spelling or search for popular brands like <strong>Seiko</strong>, <strong>Tissot</strong>, <strong>Casio</strong>, or <strong>Wimsons</strong>.
            </p>
            <button onClick={() => onNavigate('HOME')} className="btn-return-gallery">
              Return to Gallery
            </button>
          </div>
        ) : (
          <div className="collection-product-grid grid-4">
            {filteredWatches.map((watch) => (
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
        )}
      </div>
    </div>
  );
};

export default SearchResults;
