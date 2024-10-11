import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './cartContext';  // Assuming the CartContext is in a folder named context

const ShippingDetails = () => {
  const navigate = useNavigate();
  const { cartItems, userDetails, clearCart, saveOrder } = useCart();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      customerDetails: userDetails,
      cartItems,
      totalPrice: cartItems.reduce((total, item) => total + item.price, 0),
    };

    try {
      const response = await axios.post('http://localhost:8000/api/invoice/', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Save the order in the context
        saveOrder(dataToSend);
        // Clear the cart after processing shipping
        clearCart();
        // Navigate to the Thank You page
        navigate('/thankyou', { state: { cartItems, totalPrice: dataToSend.totalPrice, customerDetails: userDetails } });
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error processing the request. Please try again later.');
    }
  };

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'90vh'}>
      <Paper elevation={3} sx={{ padding: 4, width: '70%' }}>
        <Typography variant="h5" marginBottom={4}>
          Shipping Details
        </Typography>
        {error && (
          <Typography variant="body1" color="error" marginBottom={2}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Customer Name"
                name="name"
                value={userDetails.name}
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userDetails.email}
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                type="tel"
                value={userDetails.phone}
                InputProps={{
                  readOnly: false,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="postalCode"
                value={userDetails.postalCode}
                InputProps={{
                  readOnly: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={userDetails.address}
                InputProps={{
                  readOnly: true,
                }}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
              <Button type="submit" variant="contained" color="primary">
                Process Shipping
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ShippingDetails;
