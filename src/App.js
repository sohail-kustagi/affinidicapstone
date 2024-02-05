import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import Header from './components/Header';
import ProductDisplay from './components/ProductDisplay';
import Modal from './components/Modal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProductView from './components/ProductView';
import './App.css';

const products = [
  { id: 1, name: 'Hoodie', price: 10, imageUrl: '/hoodie.png', description: 'This is a hoodie.' },
  { id: 2, name: 'Hoodie', price: 15, imageUrl: '/hoodie1.png', description: 'This is a hoodie.' },
  { id: 3, name: 'Hoodie', price: 20, imageUrl: '/hoodie2.png', description: 'This is a hoodie' },
  { id: 4, name: 'jacket', price: 70, imageUrl: '/jacket1.png', description: 'This is a jacket.' },
  { id: 5, name: 'jacket', price: 50, imageUrl: '/jacket2.png', description: 'This is a jacket.' },
  { id: 6, name: 'jeans', price: 30, imageUrl: '/jeans2.png', description: 'These are jeans.' },
  { id: 7, name: 'jeans', price: 36, imageUrl: '/Jeans1.png', description: 'This is another Jeans.' },
  { id: 8, name: 'jeans', price: 45, imageUrl: '/Jeans3.png', description: 'This is an jeans.' },
];

function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showModal, setShowModal] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === product.id);
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity++;
        sessionStorage.setItem('cart', JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const updatedItems = [...prevItems, { ...product, quantity: 1 }];
        sessionStorage.setItem('cart', JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    sessionStorage.removeItem('cart');
    setCartItems([]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <UserContext.Provider value={{ profile: userProfile, setProfile: setUserProfile }}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProductDisplay products={products} addToCart={addToCart} />
                  {showModal && <Modal closeModal={closeModal} />}
                </>
              }
            />
            <Route 
              path="/cart" 
              element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} clearCart={clearCart} />} 
            />
            <Route path="/checkout" element={<Checkout clearCart={clearCart} />} />
            <Route path="/product/:id" element={<ProductView products={products} />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App; 