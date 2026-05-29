import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Brands from './components/Brands';
import Footer from './components/Footer';

// New component imports
import MensCollection from './components/MensCollection';
import WomensCollection from './components/WomensCollection';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import SignIn from './components/SignIn';
import Profile from './components/Profile';

// Dummy data for products based on generated images
// Dummy data for products based on generated images
const bestSellers = [
  { 
    id: 1, 
    image: '/men_seiko.jpg', 
    tag: 'SAVE 8%', 
    brand: 'SEIKO', 
    title: 'Seiko Prospex Two-Tone Automatic', 
    oldPrice: 'Rs 92,000.00 LKR', 
    newPrice: 'Rs 84,500.00 LKR', 
    category: 'MEN',
    specs: {
      "Warranty": "3 years",
      "Crystal": "Hardlex crystal",
      "Movement": "Automatic self-winding 24-jewel mechanical",
      "Case material": "Gold-plated and stainless steel",
      "Case shape": "Round",
      "Water resistance": "20 ATM / 200m"
    },
    description: "A premium classic two-tone timepiece, the Seiko Prospex features a robust gold and silver case with a clean white sunray dial decorated with gold hands and dynamic markers."
  },
  { 
    id: 2, 
    image: '/men_seiko2.webp', 
    tag: 'SAVE 8%', 
    brand: 'SEIKO', 
    title: 'Seiko 5 Sports Military Automatic', 
    oldPrice: 'Rs 105,000.00 LKR', 
    newPrice: 'Rs 96,200.00 LKR', 
    category: 'MEN',
    specs: {
      "Warranty": "3 years",
      "Crystal": "Hardened mineral crystal",
      "Movement": "Japanese automatic mechanical",
      "Case material": "Matte stainless steel",
      "Water resistance": "10 ATM / 100m"
    },
    description: "Built for field utilities, this Seiko 5 Sports Military edition features a sandblasted matte case and tactical charcoal canvas strap. Glow-in-the-dark LumiBrite indicators ensure perfect night legibility."
  },
  { 
    id: 3, 
    image: '/men_police.webp', 
    tag: 'SAVE 10%', 
    brand: 'POLICE', 
    title: 'Police Translucent Chrono Red', 
    oldPrice: 'Rs 88,000.00 LKR', 
    newPrice: 'Rs 78,900.00 LKR', 
    category: 'MEN',
    specs: {
      "Warranty": "2 years",
      "Crystal": "Hardened mineral",
      "Movement": "High-accuracy quartz chronograph",
      "Case material": "PVD coated steel",
      "Water resistance": "5 ATM"
    },
    description: "Boasting bold Italian style, the Police Translucent Chrono combines a high-contrast bright red silicone strap with a matte black PVD case and skeletonized dark dial."
  },
  { 
    id: 4, 
    image: '/men_tissot_pr100.webp', 
    tag: 'SAVE 9%', 
    brand: 'TISSOT', 
    title: 'Tissot PR 100 Chrono Classic', 
    oldPrice: 'Rs 80,000.00 LKR', 
    newPrice: 'Rs 72,500.00 LKR', 
    category: 'MEN',
    specs: {
      "Warranty": "2 years",
      "Crystal": "Scratch-resistant sapphire",
      "Movement": "Swiss precision quartz",
      "Case material": "316L Stainless steel",
      "Water resistance": "10 ATM / 100m"
    },
    description: "An outstanding Swiss classic, the Tissot PR 100 features a premium gold-accented bezel and matching two-tone bracelet surrounding a clean silver face with gold indices."
  },
  { 
    id: 5, 
    image: '/women_wimsons.webp', 
    tag: 'SAVE 15%', 
    brand: 'WIMSONS', 
    title: 'Wimsons Vintage 2026LGMGG', 
    oldPrice: 'Rs 110,000.00 LKR', 
    newPrice: 'Rs 93,500.00 LKR', 
    category: 'WOMEN',
    specs: {
      "Warranty": "2 years international warranty",
      "Crystal": "Hardened mineral crystal",
      "Movement": "Japanese Quartz movement",
      "Case shape": "Square",
      "Water resistance": "3 ATM"
    },
    description: "A premium classic timepiece, the Wimsons Vintage 2026LGMGG features an elegant square-cut gold-toned dial paired with a sophisticated gold mesh strap. Perfectly suited for both formal and casual settings."
  },
  { 
    id: 6, 
    image: '/women_tissot.webp', 
    tag: 'SAVE 5%', 
    brand: 'TISSOT', 
    title: 'Tissot Flamingo (C5)', 
    oldPrice: 'Rs 140,000.00 LKR', 
    newPrice: 'Rs 133,000.00 LKR', 
    category: 'WOMEN',
    specs: {
      "Warranty": "2 years international warranty",
      "Crystal": "Scratch-resistant sapphire crystal",
      "Movement": "Swiss Quartz movement",
      "Case shape": "Round",
      "Water resistance": "5 ATM"
    },
    description: "The Tissot Flamingo is an elegant piece of jewelry-inspired design, featuring a circular rose gold case with an exquisite mother of pearl dial and minimalist indicators. Designed to grace any women's wrist with classic charm."
  },
];

const exclusives = [
  { 
    id: 7, 
    image: '/men_wimsons.webp', 
    tag: 'LIMITED EDITION', 
    darkTag: true, 
    brand: 'WIMSONS', 
    title: 'Wimsons Executive Chrono Silver', 
    oldPrice: '', 
    newPrice: 'Rs 185,000.00 LKR', 
    category: 'MEN',
    specs: {
      "Warranty": "2 years",
      "Crystal": "Double-dome mineral",
      "Movement": "Japanese chronograph movement",
      "Case material": "Stainless steel",
      "Water resistance": "5 ATM"
    },
    description: "Sophisticated and clean, the Wimsons Executive features a polished silver stainless steel case and matching bracelet, housing an exquisite sunray ice blue dial with Roman numeral indexes."
  },
  { 
    id: 8, 
    image: '/men_timberland.webp', 
    tag: 'SAVE 8%', 
    darkTag: true, 
    brand: 'TIMBERLAND', 
    title: 'Timberland Outdoor Aviator', 
    oldPrice: 'Rs 180,000.00 LKR', 
    newPrice: 'Rs 165,000.00 LKR', 
    category: 'MEN',
    specs: {
      "Warranty": "2 years",
      "Crystal": "Hardened mineral glass",
      "Movement": "High-torque quartz chrono",
      "Case material": "Tactical gunmetal steel",
      "Water resistance": "10 ATM"
    },
    description: "An adventure-ready utility watch featuring a sandblasted gunmetal case. The high-contrast black dial features bold numerals and a highly functional branded tan leather strap."
  },
  { 
    id: 9, 
    image: '/men_casio.webp', 
    tag: 'SAVE 10%', 
    darkTag: true, 
    brand: 'CASIO', 
    title: 'Casio Edifice Chronograph', 
    oldPrice: 'Rs 165,000.00 LKR', 
    newPrice: 'Rs 148,000.00 LKR', 
    category: 'MEN',
    specs: {
      "Warranty": "2 years",
      "Crystal": "Mineral glass",
      "Movement": "Japanese Quartz chronograph",
      "Case material": "Solid stainless steel",
      "Water resistance": "10 ATM"
    },
    description: "Designed for high-speed sport, the Casio Edifice features a vibrant sunray emerald green dial housed inside a robust silver stainless steel case and link bracelet."
  },
  { 
    id: 10, 
    image: '/men_obaku.webp', 
    tag: 'SAVE 10%', 
    brand: 'OBAKU', 
    title: 'Obaku Denmark Classic', 
    oldPrice: 'Rs 128,000.00 LKR', 
    newPrice: 'Rs 115,000.00 LKR', 
    category: 'MEN',
    specs: {
      "Warranty": "2 years",
      "Crystal": "Hardened titan glass",
      "Movement": "Precision Danish Quartz",
      "Case material": "Ultra-thin stainless steel",
      "Water resistance": "3 ATM"
    },
    description: "Embodying classic Scandinavian design principles, this ultra-slim Obaku timepiece offers pure minimalism. Features a rose gold finished shell and fine black mesh strap."
  },
];

function App() {
  // Navigation & Product Detail states
  const [currentPage, setCurrentPage] = useState('HOME'); // 'HOME', 'MENS_COLLECTION', 'PRODUCT_DETAIL', 'CHECKOUT', 'ORDER_SUCCESS'
  
  const [selectedProduct, setSelectedProduct] = useState(() => {
    try {
      const saved = localStorage.getItem('nj_selected_product');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  // Cart states
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nj_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  
  const [cartOpen, setCartOpen] = useState(false);

  // Order placing context
  const [placedOrderCustomer, setPlacedOrderCustomer] = useState('Valued Customer');

  // User Authentication state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nj_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error(e);
      return null;
    }
  });

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem('nj_selected_product', JSON.stringify(selectedProduct));
    } catch (e) {
      console.error(e);
    }
  }, [selectedProduct]);

  useEffect(() => {
    try {
      localStorage.setItem('nj_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync state with URL path
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      if (path === '/mens') {
        setCurrentPage('MENS_COLLECTION');
      } else if (path === '/women') {
        setCurrentPage('WOMENS_COLLECTION');
      } else if (path === '/product') {
        const savedProduct = localStorage.getItem('nj_selected_product');
        if (!savedProduct || savedProduct === 'null') {
          // Graceful fallback to Mens Collection if direct load with empty state
          setCurrentPage('MENS_COLLECTION');
          window.history.replaceState({ page: 'MENS_COLLECTION' }, '', '/mens');
        } else {
          setCurrentPage('PRODUCT_DETAIL');
        }
      } else if (path === '/checkout') {
        const savedCart = localStorage.getItem('nj_cart');
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        if (parsedCart.length === 0) {
          // Graceful fallback to Mens Collection if direct load with empty cart
          setCurrentPage('MENS_COLLECTION');
          window.history.replaceState({ page: 'MENS_COLLECTION' }, '', '/mens');
        } else {
          setCurrentPage('CHECKOUT');
        }
      } else if (path === '/success') {
        setCurrentPage('ORDER_SUCCESS');
      } else if (path === '/signin') {
        setCurrentPage('SIGN_IN');
      } else if (path === '/profile') {
        const savedUser = localStorage.getItem('nj_user');
        if (!savedUser || savedUser === 'null') {
          // Redirect to signin if not authenticated
          setCurrentPage('SIGN_IN');
          window.history.replaceState({ page: 'SIGN_IN' }, '', '/signin');
        } else {
          setCurrentPage('PROFILE');
        }
      } else {
        setCurrentPage('HOME');
      }
    };

    // Run once on load
    handleUrlRoute();

    // Listen to browser back/forward buttons
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  // Navigation controller with pushState
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update browser URL dynamically without full page refresh
    let newPath = '/';
    if (pageName === 'MENS_COLLECTION') newPath = '/mens';
    else if (pageName === 'WOMENS_COLLECTION') newPath = '/women';
    else if (pageName === 'PRODUCT_DETAIL') newPath = '/product';
    else if (pageName === 'CHECKOUT') newPath = '/checkout';
    else if (pageName === 'ORDER_SUCCESS') newPath = '/success';
    else if (pageName === 'SIGN_IN') newPath = '/signin';
    else if (pageName === 'PROFILE') newPath = '/profile';

    window.history.pushState({ page: pageName }, '', newPath);
  };

  // Select watch to view details
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    navigateTo('PRODUCT_DETAIL');
  };

  // Add item to cart
  const handleAddToCart = (product, qty) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += qty;
        return newCart;
      }
      return [...prevCart, { product, quantity: qty }];
    });
    setCartOpen(true); // open side view cart drawer
  };

  // Buy it Now action (bypasses side drawer cart, goes straight to checkout)
  const handleBuyItNow = (product, qty) => {
    // Clear cart first, then add item to cart, and direct to Checkout
    setCart([{ product, quantity: qty }]);
    navigateTo('CHECKOUT');
  };

  // Update item quantity in cart
  const handleUpdateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Start checkout procedure
  const handleStartCheckout = () => {
    setCartOpen(false);
    navigateTo('CHECKOUT');
  };

  // Submit secure order
  const handleCompleteOrder = (shippingData) => {
    setPlacedOrderCustomer(shippingData.customerName);
    setCart([]); // Clear cart after successful checkout
    navigateTo('ORDER_SUCCESS');
  };

  // Sign In / Register Handler
  const handleSignIn = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('nj_user', JSON.stringify(userData));
    } catch (e) {
      console.error(e);
    }
    navigateTo('PROFILE');
  };

  // Sign Out Handler
  const handleSignOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('nj_user');
    } catch (e) {
      console.error(e);
    }
    navigateTo('HOME');
  };

  // Profile data update handler
  const handleUpdateUser = (updatedUserData) => {
    setUser(updatedUserData);
    try {
      localStorage.setItem('nj_user', JSON.stringify(updatedUserData));
    } catch (e) {
      console.error(e);
    }
  };

  // Count items inside cart
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Render correct content
  const renderContent = () => {
    switch (currentPage) {
      case 'MENS_COLLECTION':
        return (
          <MensCollection 
            onSelectProduct={handleSelectProduct} 
            onNavigate={navigateTo} 
          />
        );
      case 'WOMENS_COLLECTION':
        return (
          <WomensCollection 
            onSelectProduct={handleSelectProduct} 
            onNavigate={navigateTo} 
          />
        );
      case 'PRODUCT_DETAIL':
        return (
          <ProductDetail 
            product={selectedProduct} 
            onAddToCart={handleAddToCart}
            onBuyItNow={handleBuyItNow}
            onNavigate={navigateTo}
          />
        );
      case 'CHECKOUT':
        return (
          <Checkout 
            cartItems={cart} 
            onCompleteOrder={handleCompleteOrder} 
            onNavigate={navigateTo} 
          />
        );
      case 'ORDER_SUCCESS':
        return (
          <OrderSuccess 
            customerName={placedOrderCustomer} 
            onContinueShopping={() => navigateTo('HOME')} 
          />
        );
      case 'SIGN_IN':
        return (
          <SignIn 
            onSignIn={handleSignIn} 
            onNavigate={navigateTo} 
          />
        );
      case 'PROFILE':
        return (
          <Profile 
            user={user} 
            onSignOut={handleSignOut} 
            onNavigate={navigateTo} 
            onUpdateUser={handleUpdateUser}
          />
        );
      case 'HOME':
      default:
        return (
          <>
            <Hero onNavigate={navigateTo} />
            <ProductSection subtitle="Our Best - Sellers" products={bestSellers} onNavigate={navigateTo} onSelectProduct={handleSelectProduct} />
            <ProductSection subtitle="Explore Exclusives" products={exclusives} onNavigate={navigateTo} onSelectProduct={handleSelectProduct} />
            <Brands />
          </>
        );
    }
  };

  // Elegant e-commerce layout: hide main Header/Footer in Checkout, Success, Sign In, and Profile screens
  const showHeaderFooter = 
    currentPage !== 'CHECKOUT' && 
    currentPage !== 'ORDER_SUCCESS' && 
    currentPage !== 'SIGN_IN' && 
    currentPage !== 'PROFILE';

  return (
    <div className="app">
      {showHeaderFooter && (
        <Navbar 
          cartCount={cartCount} 
          onNavigate={navigateTo} 
          onOpenCart={() => setCartOpen(true)} 
          currentPage={currentPage}
          user={user}
        />
      )}

      {renderContent()}

      {showHeaderFooter && <Footer />}

      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleStartCheckout}
      />
    </div>
  );
}

export default App;
