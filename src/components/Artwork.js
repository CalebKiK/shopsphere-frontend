import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

// Modify
const Artwork = ({ cart=[], onAddToCart, onRemoveFromCart }) => {
  const [artworks, setArtworks] = useState([]);

  // Modify
  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/artwork')
      .then(response => response.json())
      .then(data => setArtworks(data));
  }, []);

  // Modify
  return (
    <div className="artwork-container">
      <h2>Artwork</h2>
      <div className="items-grid">
        {artworks.map(artwork => (
          <ItemCard key={artwork.id} item={artwork} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(artwork)} />
        ))}
      </div>
    </div>
  );
};

export default Artwork;