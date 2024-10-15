import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartContext';

const ViewCart = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Group products by name, color, and size
  const groupedCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.name === item.name && i.color === item.color && i.size === item.size);
    
    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice += parseFloat(item.price);
    } else {
      acc.push({ ...item, quantity: 1, totalPrice: parseFloat(item.price) });
    }
    return acc;
  }, []);

  // Calculate the total price for all grouped items in the cart
  const totalPrice = groupedCartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleProceedToShipping = () => {
    navigate('/shipping', { state: { cartItems: groupedCartItems, totalPrice } });
  };

  return (
    <>
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Box width={'85%'}>
          <Typography variant="h4" marginBottom={'20px'}>Shopping Cart</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedCartItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">Your cart is empty!</TableCell>
                  </TableRow>
                ) : (
                  groupedCartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell><img src={item.image} alt={item.name} width="50" /></TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.color}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${item.totalPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button onClick={() => removeFromCart(item.name)} variant="contained" color="secondary">
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {groupedCartItems.length > 0 && (
            <Box display={'flex'} justifyContent={'space-between'} marginTop={2}>
              <Typography variant="h6">Total Price: ${totalPrice.toFixed(2)}</Typography>
              <Button variant="contained" color="primary" onClick={handleProceedToShipping}>
                Proceed to Shipping
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ViewCart;
