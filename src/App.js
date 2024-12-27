import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FlashSale from './components/FlashSale';
import HotInCategory from './components/HotInCategory';
import Cartlist from './components/CartList';
import './App.css';
import './components/FlashSale.css';
import ClothesSection from './components/ClothesSection';
import WhatsNew from './components/WhatsNew';
import Categories from './components/Categories';
import Books from './components/Books';
import Artwork from './components/Artwork';
import ShoesSection from './ShoesSection';
import ElectronicsSection from './ElectronicsSection';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Payment from './Payment';

function App() {
  const [flashSaleItems, setFlashSaleItems] = useState([]);
  const [hotItems, setHotItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isPaymentVisible, setIsPaymentVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); 

  useEffect(() => {
      fetch("http://127.0.0.1:5555/api/flashsale")
        .then(response => response.json())
        .then((items) => setFlashSaleItems(items));
    }, []);
  
    // Fetch hot items in categories
    useEffect(() => {
      fetch("http://127.0.0.1:5555/api/hot_in_category")
        .then(response => response.json())
        .then((items) => setHotItems(items));
    }, []);

  const handleAddToCart = (item) => {
    if (!cart.includes(item)) {
      setCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  const handleCheckout = () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(total); // Set the total amount for the payment
    setIsPaymentVisible(true); // Show the Payment component
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar cart={cart} />
      </header>
      <Categories />
      <FlashSale flashSaleItems={flashSaleItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <HotInCategory hotItems={hotItems} cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <Cartlist cart={cart} onRemoveFromCart={handleRemoveFromCart} onCheckout={handleCheckout} />
      <ClothesSection cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <WhatsNew cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <div className="containers">
        <Books cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
        <Artwork cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      </div>
      <ShoesSection cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <ElectronicsSection cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />
      <FAQ />
      <Footer />

      {isPaymentVisible && <Payment cartItems={cart} total={totalAmount} />}
    </div>
  );
}

export default App;
