import React, { useState, useEffect } from 'react';
import './WhatsNew.css';
import ItemCard from './ItemCard';


const WhatsNew = ({ cart, onAddToCart, onRemoveFromCart }) => {
  const [newProducts, setNewProducts] = useState([]);

  // Modify
  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/whats_new')
      .then(response => response.json())
      .then(data => setNewProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Modify
  return (
    <div className="whats-new">
      <h2>What's New</h2>
      <div className="product-list">
        {newProducts.map(product => (
          <ItemCard key={product.id} item={product} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(product)} />
        ))}
      </div>
    </div>
  );
};

export default WhatsNew;