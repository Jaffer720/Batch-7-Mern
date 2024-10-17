import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProductDetail } from './component/ProductDetail';
import ViewCart from './component/ViewCart';
import About from './component/AboutUs';
import { CartProvider } from './component/CartContext'; 
import LandingPage from './component/LandingPage';
import Login from './component/Login';
import Register from './component/Register';
import NavBar from './component/NavBar';
import ThankYouMessage from './component/ThankYouMessage';
import ShippingDetails from './component/ShippingDetails';
import ProductList from './component/ProductList';
import Dashboard from './component/Dashboard'; 
import Footer from './component/Footer';
import Orders from './component/Orders'; // Import the Orders component
import Address from './component/Address'; // Import the Address component

const App = () => {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping" element={<ShippingDetails />} />
          <Route path="/thankyou" element={<ThankYouMessage />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} /> {/* Linked to the Address component */}
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
