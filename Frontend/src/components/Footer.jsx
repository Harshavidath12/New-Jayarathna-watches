import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-highlights">
        <div className="container highlights-container">
          <div className="highlight-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <span>Island-Wide Delivery</span>
          </div>
          <div className="highlight-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>50,000+ Reviews Rated 4.9/5</span>
          </div>
          <div className="highlight-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            <span>Authentic Guarantee</span>
          </div>
          <div className="highlight-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Expert Support</span>
          </div>
        </div>
      </div>

      <div className="footer-main container">
        <div className="footer-column newsletter">
          <h4 className="footer-title">Newsletter</h4>
          <p className="footer-text">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="E-mail" className="newsletter-input" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">About</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">The Studio</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Help</h4>
          <ul className="footer-links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-column get-in-touch">
          <h4 className="footer-title">Get in touch</h4>
          <p className="footer-text">Visit our premium store to explore timeless watches, designer handbags, and exclusive accessories in an elegant shopping experience.</p>
          <address className="footer-address">
            No.30 DR. Lester James Peries Mawatha, Colombo 05, Sri Lanka<br/><br/>
            +94 76 09211 21<br/><br/>
            timevault@gmail.com
          </address>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
