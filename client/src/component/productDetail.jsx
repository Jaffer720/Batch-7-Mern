import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Typography, Button, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import the heart icon for the wishlist
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Import the empty heart icon for the wishlist
import { useCart } from './cartContext.jsx';

export const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, price, category, subCategory } = location.state?.formData || {};
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } = useCart(); // Get wishlist functions from context
  const [productDetails, setProductDetails] = useState(location.state?.formData || null);
  const [cartOpen, setCartOpen] = useState(false);
  const [color, setColor] = useState('Blue');
  const [size, setSize] = useState('Medium');
  const [successMessage, setSuccessMessage] = useState(false);
  const [inWishlist, setInWishlist] = useState(false); // State to track wishlist status

  // Fetch product details from API if 'id' exists and details are not in state
  useEffect(() => {
    if (id && !productDetails) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/product/${id}`);
          setProductDetails(response.data);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

      fetchProductDetails();
    }
  }, [id, productDetails]);

  // Check if product is in wishlist
  useEffect(() => {
    if (productDetails && wishlist) { // Ensure wishlist is defined
      const isInWishlist = wishlist.some(item => item._id === productDetails._id);
      setInWishlist(isInWishlist);
    }
  }, [wishlist, productDetails]);

  // Handle Add to Cart logic
  const handleAddToCart = () => {
    if (productDetails) {
      const imageUrl = productDetails.images && productDetails.images.length > 0
        ? productDetails.images[0]  // Select the first image
        : productDetails.imageUrl;

      addToCart({
        image: imageUrl,
        category,
        subCategory,
        color,
        size,
        price: parseFloat(price),
        name,
        brand: productDetails.brand,
        _id: id,
        quantity: 1
      });

      setCartOpen(true);
      setSuccessMessage(true);
    }
  };

  // Handle Add to Wishlist logic
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(productDetails._id);
    } else {
      addToWishlist({
        _id: productDetails._id,
        name,
        price,
        category,
        subCategory,
        brand: productDetails.brand,
        image: productDetails.images?.[0] || productDetails.imageUrl // Use the first image or fallback
      });
    }
    setInWishlist(!inWishlist); // Toggle wishlist state
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(false);
  };

  const sizeOptions = ['Small', 'Medium', 'Large'];
  const colorOptions = ['Blue', 'Green', 'Pink', 'Yellow'];

  if (!productDetails) {
    return <Typography variant="h6">Loading product details...</Typography>;
  }

  return (
    <>
      <Box width="100%" display="flex" justifyContent="center">
        <Box height="150vh" width="85%">
          <Grid container spacing={2} display="flex" justifyContent="space-between">
            <Grid item xs={12} md={5.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <img
                src={productDetails.image}
                alt={productDetails.name}
                style={{ maxWidth: '100%', maxHeight: '70%', borderRadius: '10%', marginTop: '5%' }}
              />
            </Grid>

            <Grid item xs={12} md={6.5}>
              <Typography variant="h5" color="black">{name || productDetails.name}</Typography>
              <Typography fontSize="15px" color="black" marginTop="8px" marginBottom="5px">
                <strike>$900.00</strike> / {price || productDetails.price}
              </Typography>
              <Typography sx={{ color: 'black', fontWeight: '500', marginBottom: '5px', marginTop: '4px' }}>
                Brand: {productDetails.brand}
              </Typography>
              <Typography sx={{ color: 'black', fontWeight: '500', marginBottom: '5px' }}>
                Category: {category || productDetails.category}
              </Typography>
              <Typography sx={{ color: 'black', fontWeight: '500', marginBottom: '5px' }}>
                Subcategory: {subCategory || productDetails.subCategory}
              </Typography>

              {/* Color and Size Options */}
              <Typography marginTop="13px" sx={{ color: 'black', fontWeight: '500' }}>Color: {color}</Typography>
              <Typography marginTop="25px">
                {sizeOptions.map((sizeOption) => (
                  <Button
                    key={sizeOption}
                    sx={{
                      border: 'solid 1px lightgray',
                      marginRight: '6px',
                      backgroundColor: size === sizeOption ? 'gray' : 'inherit',
                      color: size === sizeOption ? 'white' : 'black',
                    }}
                    onClick={() => setSize(sizeOption)}
                  >
                    {sizeOption}
                  </Button>
                ))}
              </Typography>

              <Typography marginTop="15px">
                {colorOptions.map((colorOption) => (
                  <Button
                    key={colorOption}
                    sx={{
                      border: 'solid 1px lightgray',
                      marginRight: '3px',
                      backgroundColor: color === colorOption ? colorOption.toLowerCase() : 'inherit',
                      color: color === colorOption ? 'white' : 'black',
                      fontSize: '11px',
                    }}
                    onClick={() => setColor(colorOption)}
                  >
                    {colorOption}
                  </Button>
                ))}
              </Typography>

              {/* Add to Cart Button */}
              <Typography marginTop="10px">
                <Button variant="contained" sx={{ width: '63%', border: '1px solid gray', color: 'white' }} onClick={handleAddToCart}>
                  Add To Cart
                </Button>
              </Typography>

              {/* Wishlist Button */}
              <Typography marginTop="10px">
                <IconButton 
                  onClick={handleWishlistToggle}
                  sx={{ color: inWishlist ? 'red' : 'gray' }} // Change color based on wishlist status
                >
                  {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />} {/* Render filled or empty heart */}
                </IconButton>
              </Typography>

              {/* Product Description */}
              <Typography marginTop="30px" sx={{ fontFamily: 'Calibri Light' }}>
                <Typography paragraph>{productDetails.description}</Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Cart Modal */}
        {cartOpen && (
          <Box
            position="fixed"
            top={115}
            right={15}
            height="72vh"
            width="300px"
            bgcolor="white"
            boxShadow={3}
            zIndex={10}
            p={2}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item container justifyContent="space-between" alignItems="center">
                <Typography variant="h6" textAlign="center">Just added to your Cart</Typography>
                <IconButton onClick={handleCloseCart}>
                  <CloseIcon />
                </IconButton>
              </Grid>

              {/* Display Image */}
              <Grid item container justifyContent="center">
                <img
                  src={productDetails.images?.[0] || productDetails.imageUrl} // Use the first image or fallback
                  alt="product"
                  width="80"
                  style={{ borderRadius: '5%' }}
                />
              </Grid>

              {/* Product Details */}
              <Grid item>
                <Typography>{name}</Typography>
                <Typography>Brand: {productDetails.brand}</Typography>
                <Typography>Category: {category}</Typography>
                <Typography>Subcategory: {subCategory}</Typography>
                <Typography>Color: {color}</Typography>
                <Typography>Size: {size}</Typography>
                <Typography>Price: {price}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: 'darkblue', fontWeight: 'bolder' }}
                  onClick={() => navigate('/viewCart')}
                >
                  View Cart
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Success Snackbar */}
        <Snackbar
          open={successMessage}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="Item added to cart"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Box>
    </>
  );
};
