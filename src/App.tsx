import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './CartContext';
import Header from './components/Header';
import Notification from './components/Notification';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const Notifications: React.FC = () => {
  const { notifications } = useCart();
  return (
    <div className="fixed top-16 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <Notification key={notification.id} message={notification.message} />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <div className="min-h-screen bg-bgLight">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Notifications />
      </Router>
    </CartProvider>
  );
};

export default App;