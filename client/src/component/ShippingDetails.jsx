import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShippingDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails(user);
      setShippingDetails(user.address || {});
      setLoading(false);
    } else {
      setError('User data not found.');
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/order/${userDetails._id}`, {
        shippingDetails,
        userId: userDetails._id,
      });

      if (response.status === 201) {
        navigate('/thankyou', { state: { shippingDetails, userDetails } });
      } else {
        const errorMessage = 'Error submitting shipping details.';
        setError(errorMessage);
        navigate('/thankyou', { state: { shippingDetails, userDetails, error: errorMessage } });
      }
    } catch (error) {
      console.error('Error:', error);
      
      let errorMessage;
      if (error.response) {
        // Server responded with a status code outside of the range of 2xx
        errorMessage = `Error: ${error.response.status} - ${error.response.data.message || 'Request failed.'}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response received from server. Please check if the backend is running.';
      } else {
        // Something else triggered the error
        errorMessage = `Error: ${error.message}`;
      }

      setError(errorMessage);
      navigate('/thankyou', { state: { shippingDetails, userDetails, error: errorMessage } });
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading Shipping Details...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
      <Paper elevation={3} sx={{ padding: '20px', width: '400px' }}>
        <Typography variant="h5" gutterBottom>
          Confirm Shipping Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Street"
            name="street"
            value={shippingDetails.street || ''}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={shippingDetails.city || ''}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="State"
            name="state"
            value={shippingDetails.state || ''}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={shippingDetails.postalCode || ''}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={shippingDetails.country || ''}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <Box display="flex" justifyContent="flex-end" marginTop="20px">
            <Button type="submit" variant="contained" color="primary">
              Submit Shipping
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ShippingDetails;
