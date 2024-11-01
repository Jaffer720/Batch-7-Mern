import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useCart } from './cartContext';

const MyOrder = () => {
  const { orders } = useCart(); // Get orders from the CartContext

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="85%">
        <Typography variant="h4" marginBottom="20px">My Orders</Typography>
        {orders.length === 0 ? (
          <Typography variant="body1">No orders found.</Typography>
        ) : (
          orders.map((order, orderIndex) => (
            <Paper key={orderIndex} elevation={3} sx={{ marginBottom: '20px', padding: '10px' }}>
              <Typography variant="h6">Order {orderIndex + 1}</Typography>
              
              {/* Updated total price */}
              <Typography variant="body2" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                Total Price: ${order.total.toFixed(2)}
              </Typography>

              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell>Color</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.color || 'N/A'}</TableCell> {/* Handle optional color */}
                        <TableCell>{item.size || 'N/A'}</TableCell>   {/* Handle optional size */}
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell> {/* Calculate total price for the item */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default MyOrder;
