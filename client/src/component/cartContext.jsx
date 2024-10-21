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

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Sync state with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [cartItems, user, orders]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (itemName) => {
    setCartItems((prevItems) => prevItems.filter(item => item.name !== itemName));
  };

  const updateUser = (details) => {
    setUser(details);
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
      user, 
      updateUser,  // Updated function name
      orders, 
      saveOrder, 
      removeOrder 
    }}>
      {children}
    </CartContext.Provider>
  );
};
