// EditInvoice.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

// Backend API URL
const API_URL = 'http://localhost:8000/api/invoice/';

const EditInvoice = ({ invoice, open, onClose, onUpdate }) => {
  const [formValues, setFormValues] = useState(invoice || {});

  useEffect(() => {
    setFormValues(invoice || {});
  }, [invoice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}${invoice.invoiceNumber}`, formValues);
      onUpdate(formValues);
      onClose();
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '1%', width: 400, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h6" gutterBottom>Edit Invoice</Typography>
        <TextField label="Invoice Number" name="invoiceNumber" value={formValues.invoiceNumber || ''} disabled fullWidth margin="normal" />
        <TextField label="Issue Date" name="issueDate" value={formValues.issueDate || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Due Date" name="dueDate" value={formValues.dueDate || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Customer" name="customer" value={formValues.customer || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Items" name="items" value={formValues.items || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Quantities" name="quantities" value={formValues.quantities || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Subtotal" name="subtotal" value={formValues.subtotal || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Total" name="total" value={formValues.total || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Payment Status" name="paymentStatus" value={formValues.paymentStatus || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <TextField label="Notes" name="notes" value={formValues.notes || ''} onChange={handleInputChange} fullWidth margin="normal" />
        <Box mt={2}>
          <Button onClick={onClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained" sx={{ ml: 2 }}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditInvoice;
