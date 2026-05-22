import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Brands from './components/Brands';
import Footer from './components/Footer';

// New component imports
import MensCollection from './components/MensCollection';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import SignIn from './components/SignIn';
import Profile from './components/Profile';

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
            <ProductSection subtitle="Our Best - Sellers" products={bestSellers} />
            <ProductSection subtitle="Explore Exclusives" products={exclusives} />
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
