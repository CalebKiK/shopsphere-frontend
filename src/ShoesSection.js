
import React, { useState, useEffect } from 'react';
import './ShoesSection.css';
import ItemCard from './components/ItemCard';

// Modify
const ShoesSection = ({ cart=[], onAddToCart, onRemoveFromCart }) => {
  const [shoesData, setShoesData] = useState([]);
  // const [cart, setCart] = useState([]);

  // Modify
  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/shoes')
      .then(response => response.json())
      .then(data => setShoesData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Modify
  return (
    <div className="shoes-section">
      <h2>Shoes</h2>
      <div className="shoes-grid">
        {shoesData.map((shoe) => (
          <ItemCard key={shoe.id} item={shoe} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(shoe)} />
        ))}
      </div>
      
    </div>
  );
};

export default ShoesSection;

