import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ cartCount = 0, onNavigate, onOpenCart, currentPage = 'HOME', user = null }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolledOrLightPage = scrolled || currentPage !== 'HOME';

  return (
    <nav className={`navbar ${isScrolledOrLightPage ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <ul className="nav-links">
          <li>
            <button 
              onClick={() => onNavigate('MENS_COLLECTION')} 
              className="nav-link-btn"
            >
              Men
            </button>
          </li>
          <li>
            <button 
              onClick={() => onNavigate('WOMENS_COLLECTION')} 
              className="nav-link-btn"
            >
              Women
            </button>
          </li>
          <li>
            <button 
              onClick={() => onNavigate('HOME')} 
              className="nav-link-btn"
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => onNavigate('HOME')} 
              className="nav-link-btn"
            >
              Blog
            </button>
          </li>
        </ul>
      </div>
      
      <div className="navbar-center">
        <div 
          className="logo-container clickable-logo" 
          onClick={() => onNavigate('HOME')}
        >
          <img src="/nj_watches_logo.png" alt="N.J. Watches Logo" className="site-logo-circle" />
        </div>
      </div>

      <div className="navbar-right">
        <div className="nav-icons">
          <button className="icon-btn" aria-label="Account" onClick={() => onNavigate(user ? 'PROFILE' : 'SIGN_IN')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>
          <button className="icon-btn" aria-label="Search" onClick={() => onNavigate('HOME')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className="icon-btn cart-icon-btn" aria-label="Cart" onClick={onOpenCart}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
