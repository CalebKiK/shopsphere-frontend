import React, { useState, useEffect } from 'react';
import './ElectronicsSection.css';
import ItemCard from './components/ItemCard';

const ElectronicsSection = ({ cart = [], onAddToCart, onRemoveFromCart }) => {
  const [electronicsData, setElectronicsData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/electronics')
      .then(response => response.json())
      .then(data => setElectronicsData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="electronics-section">
      <h2>Electronics</h2>
      <div className="electronics-grid">
        {electronicsData.map(item => (
          <ItemCard key={item.id} item={item} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(item)} />
        ))}
      </div>
    </div>
  );
};

export default ElectronicsSection;
