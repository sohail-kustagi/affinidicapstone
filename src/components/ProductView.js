import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductView.css';


const ProductView = ({ products }) => {
  const { id } = useParams(); // Access the route parameters

  // Check if products array is defined and not empty
  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available</div>;
  }

  // Find the product with the matching id
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="ProductView">
      <div className="ProductViewContent">
        {/* Render the product details */}
        <img src={product.imageUrl} alt={product.name} />
        <h2>{product.name}</h2>
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductView;




