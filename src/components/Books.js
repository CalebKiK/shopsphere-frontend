import React, { useEffect, useState } from 'react';
import ItemCard from './ItemCard';

const Books = ({ cart=[], onAddToCart, onRemoveFromCart }) => {
  const [books, setBooks] = useState([]);

  // Modify
  useEffect(() => {
    fetch('https://shopshere-backend.onrender.com/api/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  // Modify
  return (
    <div className="book-container">
      <h2>Books</h2>
      <div className="items-grid">
        {books.map(book => (
          <ItemCard key={book.id} item={book} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} inCart={cart.includes(book)} />
        ))}
      </div>
    </div>
  );
};

export default Books;