import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Import right arrow icon
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'; // Import left arrow icon

import { useCart } from './cartContext'; // Adjust the import path as needed

const MyOrder = () => {
  const { orders, removeOrder } = useCart();
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null);
  console.log('orders', orders)
  const handleToggleExpand = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index);
  };

  return (
    <Box sx={{ marginTop: '2%' }}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'} marginTop={'14%'}>
        <Paper elevation={3} sx={{ padding: 4, width: '90%', overflowX: 'auto' }}>
          <Typography variant="h4" marginBottom={4}>
            My Orders
          </Typography>

          {orders.length > 0 ? (
            orders.map((order, index) => {
              // Aggregate the cart items by name
              const aggregatedItems = order.cartItems.reduce((acc, item) => {
                const existingItem = acc.find((i) => i.name === item.name);
                if (existingItem) {
                  existingItem.quantity += item.quantity; // Increment quantity
                  existingItem.totalPrice += item.price * item.quantity; // Increment total price
                } else {
                  acc.push({
                    ...item,
                    totalPrice: item.price * item.quantity, // Calculate initial total price
                    quantity: item.quantity, // Initialize quantity
                  });
                }
                return acc;
              }, []);

              return (
                <Box key={index} marginBottom={4}>
                  <Typography variant="h6">Order #{index + 1}</Typography>

                  <TableContainer component={Paper} sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <Table size="small" aria-label="order items">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: '10%' }}>Image</TableCell>
                          <TableCell sx={{ width: '20%' }}>Name</TableCell>
                          <TableCell sx={{ width: '10%' }}>Quantity</TableCell>
                          <TableCell sx={{ width: '10%' }}>Price</TableCell>
                          <TableCell sx={{ width: '10%' }}>Total Price</TableCell>
                          {/* Show extra details in the same row when expanded */}
                          {expandedOrderIndex === index && (
                            <>
                              <TableCell sx={{ width: '10%' }}>Brand</TableCell>
                              <TableCell sx={{ width: '10%' }}>Category</TableCell>
                              <TableCell sx={{ width: '10%' }}>Subcategory</TableCell>
                              <TableCell sx={{ width: '10%' }}>Color</TableCell>
                              <TableCell sx={{ width: '10%' }}>Size</TableCell>
                            </>
                          )}
                          <TableCell sx={{ width: '10%' }}>
                            {/* Action Column for Arrow */}
                            <IconButton onClick={() => handleToggleExpand(index)}>
                              {expandedOrderIndex === index ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {aggregatedItems.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell sx={{ width: '10%' }}>
                              <img src={item.image} alt="product" width="50" />
                            </TableCell>
                            <TableCell sx={{ width: '20%' }}>{item.name}</TableCell>
                            <TableCell sx={{ width: '10%' }}>{item.quantity}</TableCell>
                            <TableCell sx={{ width: '10%' }}>${item.price.toFixed(2)}</TableCell>
                            <TableCell sx={{ width: '10%' }}>${item.totalPrice.toFixed(2)}</TableCell>
                            {/* Show extra details in the same row when expanded */}
                            {expandedOrderIndex === index && (
                              <>
                                <TableCell>{item.brand}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.subCategory}</TableCell>
                                <TableCell>{item.color}</TableCell>
                                <TableCell>{item.size}</TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box display={'flex'} justifyContent={'space-between'} marginTop={2}>
                    <Typography variant="h6">
                      Total Price: $
                      {aggregatedItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={() => removeOrder(index)}>
                      Remove Order
                    </Button>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography variant="h6" color="error">
              No orders available. Please place an order first.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default MyOrder;
