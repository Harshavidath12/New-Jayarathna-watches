import React from 'react';
import './Hero.css';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero">
      <div className="hero-bg">
        {/* We use the generated image as a poster, and optionally a video source. */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/hero_bg.png"
          className="hero-video"
        >
          {/* <source src="/path/to/your/video.mp4" type="video/mp4" /> */}
        </video>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <span className="hero-subtitle">Where Time Begins</span>
        <h2 className="hero-title">Explore Full Collection</h2>
        
        <div className="hero-actions">
          <button onClick={() => onNavigate('MENS_COLLECTION')} className="btn btn-outline">Men</button>
          <button onClick={() => onNavigate('WOMENS_COLLECTION')} className="btn btn-outline">Women</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
