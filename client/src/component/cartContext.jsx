import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem('userDetails');
    return savedUserDetails ? JSON.parse(savedUserDetails) : {};
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Sync state with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [cartItems, userDetails, orders]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (itemName) => {
    setCartItems((prevItems) => prevItems.filter(item => item.name !== itemName));
  };

  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  const saveOrder = (orderDetails) => {
    setOrders((prevOrders) => [...prevOrders, orderDetails]);
  };

  const removeOrder = (orderIndex) => {
    setOrders((prevOrders) => prevOrders.filter((_, index) => index !== orderIndex));
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      clearCart, 
      removeFromCart, 
      userDetails, 
      updateUserDetails, 
      orders, 
      saveOrder, 
      removeOrder // Expose removeOrder to context consumers
    }}>
      {children}
    </CartContext.Provider>
  );
};
