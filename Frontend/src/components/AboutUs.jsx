import React from 'react';
import './AboutUs.css';

const AboutUs = ({ onNavigate }) => {
  return (
    <div className="aboutus-page animate-fade-in">
      {/* Hero Banner Section */}
      <div className="about-hero-section">
        <div className="about-breadcrumbs">
          <span onClick={() => onNavigate('HOME')} className="about-breadcrumb-link">Home</span>
          <span className="about-breadcrumb-separator">/</span>
          <span className="about-breadcrumb-active">About Us</span>
        </div>
        
        <div className="about-logo-wrapper">
          <img src="/nj_watches_logo.png" alt="N.J. Watches Logo" className="about-site-logo" />
        </div>
        
        <h1 className="about-main-title">WHERE TIME BEGINS</h1>
        <p className="about-tagline">Crafting stories of heritage, luxury, and unmatched precision since inception.</p>
      </div>

      {/* Heritage Story Section */}
      <section className="about-story-section container">
        <div className="story-grid">
          <div className="story-text-block">
            <span className="story-subtitle">Our Heritage</span>
            <h2 className="story-title">A Legacy of Luxury Horology</h2>
            <p className="story-paragraph">
              N.J. Watches represents the pinnacle of luxury watch curation. Established on the values of precision, exclusivity, and master craftsmanship, we source only the most exceptional Swiss and Japanese timepieces for our discerning clientele.
            </p>
            <p className="story-paragraph">
              Every watch in our signature collections is hand-selected and rigorously checked by our master horologists. From rugged field mechanicals and high-speed chronographs to diamond-embellished jewelry watches, we believe a timepiece is not merely an instrument of time, but an heirloom of legacy.
            </p>
          </div>
          
          <div className="story-visual-block">
            <div className="visual-glass-card">
              <h3 className="glass-card-title">Exceptional Craftsmanship</h3>
              <p className="glass-card-body">
                We bridge the gap between historic watchmaking artistry and modern contemporary styles. Our boutique experiences and digital checkout solutions ensure a seamless journey of luxury.
              </p>
              <div className="glass-card-footer">
                <span className="gold-accent-text">Est. 2026</span>
                <span className="divider-dot">•</span>
                <span className="gold-accent-text">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about-values-section">
        <div className="container">
          <h2 className="values-section-title">OUR PILLARS OF EXCELLENCE</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="value-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 className="value-card-title">Horological Precision</h3>
              <p className="value-card-body">
                We calibrate and check every single automatic and quartz movement inside our curation center, assuring absolute reliability.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="value-icon"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 className="value-card-title">Curated Exclusivity</h3>
              <p className="value-card-body">
                We partner directly with elite global watch houses to bring you rare editions, limited series, and pristine classic timepieces.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="value-icon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </div>
              <h3 className="value-card-title">Master Guest Care</h3>
              <p className="value-card-body">
                Our support curators, real-time database bookers, and delivery escorts provide world-class assistance at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="about-cta-section container">
        <div className="cta-box">
          <h2 className="cta-title">FIND YOUR PERFECT TIMEPIECE</h2>
          <p className="cta-description">Browse our signature collections of hand-crafted mechanical chronographs and designer watches.</p>
          <div className="cta-button-group">
            <button onClick={() => onNavigate('MENS_COLLECTION')} className="btn btn-outline-light">
              EXPLORE MEN
            </button>
            <button onClick={() => onNavigate('WOMENS_COLLECTION')} className="btn btn-gold">
              EXPLORE WOMEN
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
