// InvoiceList.js
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

import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import EditInvoice from './EditInvoice'; // Import the new EditInvoice component
// import { BASEURL } from '../URL';


// Backend API URL
<<<<<<< HEAD
const API_URL = 'http://localhost:8000/api/Invoice/';
=======
const API_URL = "http://localhost:8000/api/Invoice/";
>>>>>>> shahid

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
<<<<<<< HEAD
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
=======
  const [openEditModal, setOpenEditModal] = useState(false);
>>>>>>> shahid

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

<<<<<<< HEAD
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
=======
  const handleUpdateInvoice = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((invoice) => (invoice.invoiceNumber === updatedInvoice.invoiceNumber ? updatedInvoice : invoice))
    );
>>>>>>> shahid
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'invoiceNumber',
        header: 'Invoice Number',
        size: 100,
      },
      {
<<<<<<< HEAD
        accessorKey: 'customer.email',
=======
        accessorKey: 'customer.email', // Use a specific field of customer
>>>>>>> shahid
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
<<<<<<< HEAD
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [invoices],
=======
              <MenuItem
                onClick={() => {
                  setOpenEditModal(true);
                  setAnchorEl(null);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpenDetailModal(true);
                  setAnchorEl(null);
                }}
              >
                View
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  try {
                    await axios.delete(`${API_URL}${row.original.invoiceNumber}`);
                    setInvoices(invoices.filter(invoice => invoice.invoiceNumber !== row.original.invoiceNumber));
                  } catch (error) {
                    console.error('Error deleting invoice:', error);
                  }
                  setAnchorEl(null);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </>
        ),
      },
    ],
    [anchorEl, selectedInvoice, invoices]
>>>>>>> shahid
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

        <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '1%', width: 400, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h6" gutterBottom>Invoice Details</Typography>

          <Typography>Invoice Number: {selectedInvoice?.invoiceNumber}</Typography>
          <Typography>Issue Date: {selectedInvoice?.issueDate}</Typography>
          {/* <Typography>Due Date: {selectedInvoice?.dueDate}</Typography> */}
          <Typography>
            Customer Email: {selectedInvoice?.customer?.email || 'N/A'}
          </Typography>
          <Typography>
            Customer ID: {selectedInvoice?.customer?._id || 'N/A'}
          </Typography>
          <Typography>Items: {selectedInvoice?.items?.product}</Typography>
          <Typography>Quantities: {selectedInvoice?.quantities?.join(', ')}</Typography>
          <Typography>Total: {selectedInvoice?.total}</Typography>
          <Typography>Payment Status: {selectedInvoice?.paymentStatus}</Typography>
         
        </Box>
      </Modal>

<<<<<<< HEAD
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
=======
      {/* Edit Modal */}
      {selectedInvoice && (
        <EditInvoice
          invoice={selectedInvoice}
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          onUpdate={handleUpdateInvoice}
        />
      )}
>>>>>>> shahid
    </Box>
  );
};

export default InvoiceList;
