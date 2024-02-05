import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // Import the Modal component
import './ProductDisplay.css';

const ProductDisplay = ({ addToCart }) => {
  const [showModal, setShowModal] = useState(false); // State for managing the modal visibility

  const products = [
    { id: 1, name: 'Hoodie', price: 10, imageUrl: '/hoodie.png', description: 'This is a grey colored hoodie.' },
    { id: 2, name: 'Hoodie', price: 15, imageUrl: '/hoodie1.png', description: 'This is a green colored hoodie.' },
    { id: 3, name: 'Hoodie', price: 20, imageUrl: '/hoodie2.png', description: 'This is a pink colored hoodie' },
    { id: 4, name: 'jacket', price: 70, imageUrl: '/jacket1.png', description: 'This is a jacket.' },
    { id: 5, name: 'jacket', price: 50, imageUrl: '/jacket2.png', description: 'This is a fur jacket.' },
    { id: 6, name: 'jeans', price: 30, imageUrl: '/jeans2.png', description: 'These are jeans.' },
    { id: 7, name: 'jeans', price: 36, imageUrl: '/Jeans1.png', description: 'This is another Jeans.' },
    { id: 8, name: 'jeans', price: 45, imageUrl: '/Jeans3.png', description: 'This is an jeans.' },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowModal(true); // Show the modal after adding to cart
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="ProductDisplay">
      {products.map((product) => (
        <div key={product.id} className="ProductItem">
          <img src={product.imageUrl} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <Link to={`/product/${product.id}`}>View</Link>
          {/* Add to Cart button */}
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
      {/* Render Modal if showModal is true */}
      {showModal && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default ProductDisplay;



