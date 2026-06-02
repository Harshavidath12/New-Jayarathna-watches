import React, { useState } from 'react';
import './Blogs.css';

const initialBlogs = [
  {
    id: 1,
    category: "Celebrity Watch",
    title: "Hardik Pandya's Luxury Richard Mille: A Statement of Exclusivity",
    image: "/hardik_richard_mille.jpg",
    excerpt: "On several occasions, Pandya had turned heads not just for his aggressive on-field performance, but for his choice of wrist candy — ranging from the ultra-luxurious Richard Mille...",
    date: "June 2, 2026",
    content: [
      "On several occasions, Pandya had turned heads not just for his aggressive on-field performance, but for his choice of wrist candy — ranging from the ultra-luxurious Richard Mille RM 27-02 watch, valued at a staggering $800,000, i.e. INR 6.93 crores to his Richard Mille RM 27-04 Rafael Nadal Tourbillon worth $2.1–$2.5 million (₹18–21 crore)!",
      "Returning to the Rudra watch, crafted in a 41mm grade 5 titanium case, the accessory is lightweight yet extremely durable and built for high performance. It is powered by the in-house Calibre JCHA01 automatic movement, running at 4Hz and offering a 70-hour power reserve. The signature skeletonised “X” architecture reveals the mechanics in motion, staying true to the Epic X collection’s technical aesthetic.",
      "The design elements pay tribute to Lord Shiva, with motifs reflected through the dial detailing and trishul-inspired hands, while a bold sky-blue honeycomb rubber strap adds a modern, athletic edge. The watch also features 50 meters of water resistance, blending luxury craftsmanship with everyday wearability.",
      "The 41-mm case opens a new chapter in the collection’s history. Its full dial widens its appeal. The diamond pattern on its surface is a powerful hint of its dual nature as a high watchmaking and high jewellery brand. Easy to wear daily, ergonomic, and available in a wide range of liveries, it is an incredibly versatile timepiece.",
      "Produced in an extremely limited run—only 25 pieces are available worldwide— it is reportedly reserved for close brand circles and stands as both a collector’s piece and a statement of exclusivity."
    ]
  },
  {
    id: 2,
    category: "Watch",
    title: "Upgrade Your MoonSwatch: Rubber Straps That Do More",
    image: "/men_seiko2.webp",
    excerpt: "Swap the stock strap for something more wearable, versatile, and built for daily use. The Omega x Swatch MoonSwatch has made waves as one of the most accessible and iconic watches...",
    date: "May 28, 2026",
    content: [
      "Swap the stock strap for something more wearable, versatile, and built for daily use. The Omega x Swatch MoonSwatch has made waves as one of the most accessible and iconic watches in recent memory.",
      "However, the default strap is often criticized for its stiffness and lack of premium feel. By swapping the stock strap with a premium curved-end rubber strap, you can instantly elevate the aesthetics and durability of the timepiece.",
      "Whether you choose an athletic orange strap to match the Mission to Mars or a deep navy to pair with the Mission to Neptune, upgrading your MoonSwatch strap is the easiest way to personalize your daily wearer."
    ]
  }
];

const Blogs = ({ onNavigate }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedBlog) {
    return (
      <div className="blog-detail-container container animate-fade-in">
        <div className="blog-breadcrumbs">
          <span onClick={() => onNavigate('HOME')} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span onClick={handleBackToList} className="breadcrumb-link">Blog</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">{selectedBlog.title}</span>
        </div>

        <button onClick={handleBackToList} className="btn-back-to-blogs">
          ← Back to Blogs
        </button>

        <article className="blog-article">
          <header className="article-header">
            <span className="article-category">{selectedBlog.category}</span>
            <h1 className="article-title">{selectedBlog.title}</h1>
            <div className="article-meta">
              <span className="article-date">Published on {selectedBlog.date}</span>
              <span className="article-author">By N.J. Watches Editorial</span>
            </div>
          </header>

          <div className="article-hero-image-wrapper">
            <img src={selectedBlog.image} alt={selectedBlog.title} className="article-hero-image" />
          </div>

          <div className="article-content">
            {selectedBlog.content.map((paragraph, index) => (
              <p key={index} className="article-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="blogs-page-container container animate-fade-in">
      {/* Header Banner */}
      <div className="collection-header-banner">
        <div className="breadcrumbs">
          <span onClick={() => onNavigate('HOME')} className="breadcrumb-link">Home</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">Blog</span>
        </div>
        <h2 className="collection-main-title">THE TIME KEEPER'S JOURNAL</h2>
        <p className="collection-tagline">Inside watchmaking excellence, collector highlights, and brand stories from N.J. Watches.</p>
      </div>

      {/* Blogs Grid */}
      <div className="blogs-grid">
        {initialBlogs.map((blog) => (
          <article key={blog.id} className="blog-card" onClick={() => handleReadMore(blog)}>
            <div className="blog-card-image-wrapper">
              <img src={blog.image} alt={blog.title} className="blog-card-image" />
              <span className="blog-card-category-badge">{blog.category}</span>
            </div>
            
            <div className="blog-card-body">
              <span className="blog-card-category-label">{blog.category}</span>
              <h3 className="blog-card-title">{blog.title}</h3>
              <p className="blog-card-excerpt">{blog.excerpt}</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleReadMore(blog);
                }} 
                className="blog-card-readmore-btn"
              >
                Read more
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
