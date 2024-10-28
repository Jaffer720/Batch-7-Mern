import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  IconButton,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import moment from 'moment';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/order/';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    date: moment(Date.now()).format('YYYY-MM-DD'),
    total: '',
    status: '',
  });

  const getOrders = async () => {
    try {
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (err) {
      console.log('Error fetching orders', err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Customer Name',
        size: 250,
      },
      {
        accessorKey: 'date',
        accessorFn: (row) => moment(row.date).format('YYYY-MM-DD'),
        header: 'Order Date',
        size: 150,
      },
      {
        accessorKey: 'total',
        header: 'Total Amount',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Order Status',
        size: 150,
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <Box display="flex" gap={1}>
            <IconButton
              onClick={() => {
                setFormValues(row.original);
                setIsEditing(true);
                setOpenModal(true);
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={async () => {
                await axios.delete(`${API_URL}/${row.original._id}`);
                setOrders(orders.filter(order => order._id !== row.original._id));
              }}
            >
              <Delete />
            </IconButton>
            <IconButton
              onClick={() => {
                setSelectedOrder(row.original);
                setOpenViewModal(true);
              }}
            >
              <Visibility />
            </IconButton>
          </Box>
        ),
      },
    ],
    [orders]
  );

  const table = useMaterialReactTable({
    columns,
    data: orders,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
  });

  const handleFormSubmit = async () => {
    if (isEditing) {
      await axios.put(`${API_URL}/${formValues._id}`, formValues);
      setOrders(orders.map(order => (order._id === formValues._id ? formValues : order)));
    } else {
      const response = await axios.post(API_URL, formValues);
      const newOrder = { ...formValues, _id: response.data._id };
      setOrders([...orders, newOrder]);
    }
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f2f5' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <MaterialReactTable table={table} />
      </Box>

      {/* Modal for Adding/Editing Orders */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: 'white',
            margin: 'auto',
            marginTop: '1%',
            width: 400,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxHeight: '600px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            {isEditing ? 'Edit Order' : 'Add New Order'}
          </Typography>
          <form>
            <TextField
              label="Customer Name"
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Order Date"
              type="date"
              value={formValues.date}
              onChange={(e) => setFormValues({ ...formValues, date: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="Total Amount"
              value={formValues.total}
              onChange={(e) => setFormValues({ ...formValues, total: e.target.value })}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Order Status"
              select
              value={formValues.status}
              onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
              fullWidth
              margin="normal"
              required
            >
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Shipped">Shipped</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
            <IconButton variant="contained" sx={{ marginTop: 2 }} onClick={handleFormSubmit}>
              {isEditing ? 'Save Changes' : 'Add Order'}
            </IconButton>
          </form>
        </Box>
      </Modal>

      {/* Modal for Viewing Order Details */}
      <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: 'white',
            margin: 'auto',
            marginTop: '1%',
            width: 400,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxHeight: '600px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          {selectedOrder && (
            <>
              <Typography><strong>Customer Name:</strong> {selectedOrder.name}</Typography>
              <Typography><strong>Order Date:</strong> {moment(selectedOrder.date).format('YYYY-MM-DD')}</Typography>
              <Typography><strong>Total Amount:</strong> {selectedOrder.total}</Typography>
              <Typography><strong>Order Status:</strong> {selectedOrder.status}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderTable;
