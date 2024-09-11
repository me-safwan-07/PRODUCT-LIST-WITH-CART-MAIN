import React, { createContext, useState, useContext, useEffect } from 'react';
import data from "../../data.json"
// Create context
const CartContext = createContext();

// Cart provider component
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let total = 0;
    Object.keys(cart).forEach(index => {
      const itemIndex = +index;
      total += data[itemIndex].price * cart[itemIndex];
    });
    setTotalAmount(total);
  }, [cart]);

  const handleAddToCart = (index) => {
    setCart(prevCart => ({
      ...prevCart,
      [index]: (prevCart[index] || 0) + 1
    }));
    setCount(prevCount => prevCount + 1);
  };

  const handleremoveCart = (index) => {
    setCart(prevCart => ({
      ...prevCart,
      [index]: Math.max((prevCart[index] || 1) - 1, 0)
    }));
    setCount(prevCount => prevCount - 1);
  };

  return (
    <CartContext.Provider value={{ cart, count, totalAmount, handleAddToCart, handleremoveCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
