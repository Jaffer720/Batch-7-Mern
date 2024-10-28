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

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save wishlist to localStorage
    // localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [cartItems, wishlist, user, orders]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (itemName) => {
    setCartItems((prevItems) => prevItems.filter(item => item.name !== itemName));
  };

  const addToWishlist = (item) => {
    setWishlist((prevItems) => {
      const existingItem = prevItems.find((i) => i._id === item._id);
      if (!existingItem) {
        return [...prevItems, item]; // Add the item to the wishlist if it doesn't exist
      }
      return prevItems; // Return the previous state if the item already exists
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== id)); // Remove item from wishlist
  };

  const clearWishlist = () => {
    setWishlist([]); // Clear all items in the wishlist
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
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      clearWishlist,
      user, 
      updateUser,  
      orders, 
      saveOrder, 
      removeOrder 
    }}>
      {children}
    </CartContext.Provider>
  );
};
