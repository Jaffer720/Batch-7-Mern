import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  IconButton,
  Modal,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';

// Backend API URL
const API_URL = 'http://localhost:8000/api/Invoice/';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch invoices from backend
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(API_URL);
        setInvoices(response.data); // Assuming data contains the invoices
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this invoice?');
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}${id}`);
        setInvoices(invoices.filter(invoice => invoice._id !== id));
        setSnackbarMessage('Invoice deleted successfully.');
        setOpenSnackbar(true);
      } catch (error) {
        console.error('Error deleting invoice:', error);
        setSnackbarMessage('Failed to delete invoice.');
        setOpenSnackbar(true);
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'invoiceNumber',
        header: 'Invoice Number',
        size: 100,
      },
      {
        accessorKey: 'customer.email',
        header: 'Customer Email',
        size: 200,
      },
      {
        accessorKey: 'total',
        header: 'Total ($)',
        size: 100,
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        size: 150,
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <Box>
            <IconButton
              onClick={() => {
                setOpenDetailModal(true);
                setSelectedInvoice(row.original);
              }}
              size="medium"
              sx={{ color: 'grey' }} // Set the color for the View icon
              title="View Invoice"
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(row.original._id)} // Call handleDelete on click
              size="medium"
              sx={{ color: 'grey' }} // Set the color for the Delete icon
              title="Delete Invoice"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [invoices],
  );

  const table = useMaterialReactTable({
    columns,
    data: invoices,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
  });

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f2f5' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <MaterialReactTable table={table} />
      </Box>

      {/* Detail Modal */}
      <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: 'white',
            margin: 'auto',
            marginTop: '1%',
            width: 400,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Invoice Details
          </Typography>
          <Typography>Invoice Number: {selectedInvoice?.invoiceNumber}</Typography>
          <Typography>Issue Date: {selectedInvoice?.issueDate}</Typography>
          <Typography>Due Date: {selectedInvoice?.dueDate}</Typography>
          <Typography>
            Customer Email: {selectedInvoice?.customer?.email || 'N/A'}
          </Typography>
          <Typography>
            Customer ID: {selectedInvoice?.customer?._id || 'N/A'}
          </Typography>
          <Typography>Items: {selectedInvoice?.items?.join(', ')}</Typography>
          <Typography>Quantities: {selectedInvoice?.quantities?.join(', ')}</Typography>
          <Typography>Subtotal: {selectedInvoice?.subtotal}</Typography>
          <Typography>Total: {selectedInvoice?.total}</Typography>
          <Typography>Payment Status: {selectedInvoice?.paymentStatus}</Typography>
          <Typography>Notes: {selectedInvoice?.notes}</Typography>
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InvoiceList;
