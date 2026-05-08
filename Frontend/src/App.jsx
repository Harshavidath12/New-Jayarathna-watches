import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Brands from './components/Brands';
import Footer from './components/Footer';

// Dummy data for products based on generated images
const bestSellers = [
  { id: 1, image: '/watch_1.png', tag: 'SAVE 10%', brand: 'TISSOT', title: 'Tissot Seastar 1000 Quartz Chronograph', oldPrice: 'Rs 105,000.00 LKR', newPrice: 'Rs 94,500.00 LKR', category: 'MEN' },
  { id: 2, image: '/watch_2.png', tag: 'SAVE 8%', brand: 'TISSOT', title: 'Tissot Pr 100 Chronograph', oldPrice: 'Rs 150,000.00 LKR', newPrice: 'Rs 138,000.00 LKR', category: 'MEN' },
  { id: 3, image: '/watch_1.png', tag: 'SAVE 5%', brand: 'TISSOT', title: 'Tissot Seastar 1000 Chronograph', oldPrice: 'Rs 220,000.00 LKR', newPrice: 'Rs 209,000.00 LKR', category: 'MEN' },
  { id: 4, image: '/watch_2.png', tag: 'SAVE 10%', brand: 'TISSOT', title: 'Tissot Seastar 1000 38mm', oldPrice: 'Rs 220,000.00 LKR', newPrice: 'Rs 198,000.00 LKR', category: 'MEN' },
  { id: 5, image: '/watch_3.png', tag: 'SAVE 15%', brand: 'TISSOT', title: 'Tissot Lovely Square', oldPrice: 'Rs 110,000.00 LKR', newPrice: 'Rs 93,500.00 LKR', category: 'WOMEN' },
  { id: 6, image: '/watch_3.png', tag: 'SAVE 5%', brand: 'TISSOT', title: 'Tissot Bellissima', oldPrice: 'Rs 140,000.00 LKR', newPrice: 'Rs 133,000.00 LKR', category: 'WOMEN' },
];

const exclusives = [
  { id: 7, image: '/watch_4.png', tag: 'LIMITED EDITION', darkTag: true, brand: 'SWATCH x OMEGA', title: 'Mission to Earthphase - Moonshine Gold', oldPrice: '', newPrice: 'Rs 155,000.00 LKR', category: 'MEN' },
  { id: 8, image: '/watch_4.png', tag: 'SOLD OUT', darkTag: true, brand: 'SWATCH x OMEGA', title: 'Mission On Earth - Lava', oldPrice: 'Rs 155,000.00 LKR', newPrice: 'Rs 130,000.00 LKR', category: 'MEN' },
  { id: 9, image: '/watch_4.png', tag: 'SOLD OUT', darkTag: true, brand: 'SWATCH x OMEGA', title: 'Mission On Earth - Polar Lights', oldPrice: 'Rs 155,000.00 LKR', newPrice: 'Rs 130,000.00 LKR', category: 'MEN' },
  { id: 10, image: '/watch_4.png', tag: 'SAVE 24%', brand: 'SWATCH x OMEGA', title: 'Mission To Earthphase', oldPrice: 'Rs 189,000.00 LKR', newPrice: 'Rs 143,000.00 LKR', category: 'MEN' },
];

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <ProductSection subtitle="Our Best - Sellers" products={bestSellers} />
      <ProductSection subtitle="Explore Exclusives" products={exclusives} />
      <Brands />
      <Footer />
    </div>
  );
}

export default App;
