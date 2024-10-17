import React, { useState } from 'react';

const productsData = [
  { id: 1, name: "Men's T-Shirt", category: 'Men', price: 20, img: 'https://via.placeholder.com/150' },
  { id: 2, name: "Women's Dress", category: 'Women', price: 45, img: 'https://via.placeholder.com/150' },
  { id: 3, name: "Kids' Jacket", category: 'Kids', price: 30, img: 'https://via.placeholder.com/150' },
  { id: 4, name: "Men's Jeans", category: 'Men', price: 50, img: 'https://via.placeholder.com/150' },
  { id: 5, name: "Women's Skirt", category: 'Women', price: 35, img: 'https://via.placeholder.com/150' },
  { id: 6, name: "Kids' Shoes", category: 'Kids', price: 25, img: 'https://via.placeholder.com/150' },
];

const Order = () => {
  const [filter, setFilter] = useState('All');
  const [cart, setCart] = useState([]);

  // Filter products by category
  const filteredProducts = filter === 'All' ? productsData : productsData.filter(product => product.category === filter);

  // Add to cart handler
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Shop Clothing</h1>

      {/* Category Filter Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Men')}>Men's</button>
        <button onClick={() => setFilter('Women')}>Women's</button>
        <button onClick={() => setFilter('Kids')}>Kids'</button>
      </div>

      {/* Product List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
            <h2>{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div style={{ marginTop: '40px' }}>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Order;
