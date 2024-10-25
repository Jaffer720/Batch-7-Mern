import React from 'react';
import { useCart } from './cartContext.jsx';
import { Box, Grid, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useCart(); // Get wishlist from context
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (id) => {
    removeFromWishlist(id); // Call the function to remove item from wishlist
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product._id}`, { state: { formData: product } }); // Navigate to the product detail page
  };

  return (
    <Box width="100%" padding={2}>
      <Typography variant="h5" gutterBottom>Your Wishlist</Typography>
      {wishlist.length === 0 ? (
        <Typography>No items in your wishlist.</Typography>
      ) : (
        <Grid container spacing={2}>
          {wishlist.map((item) => (
            <Grid item xs={12} md={4} key={item._id}>
              <Box border={1} borderRadius={2} padding={2}>
                <img src={item.image} alt={item.name} style={{ width: '100%', borderRadius: '10%' }} />
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ${item.price.toFixed(2)}</Typography>
                <Typography>Brand: {item.brand}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewProduct(item)}
                >
                  View Product
                </Button>
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveFromWishlist(item._id)}
                  style={{ marginLeft: '10px' }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Wishlist;
