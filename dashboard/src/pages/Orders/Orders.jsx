import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  lighten,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Api, MoreVert as MoreVertIcon } from '@mui/icons-material';
import moment from 'moment/moment';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/order/';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [viewOrderModal, setViewOrderModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    date: moment(Date.now()).format('YYYY-MM-DD'),
    total: '',
    status: '',
  });

  const getOrders = async () => {
    try {
      await axios.get(API_URL)
        .then((res) => setOrders(res.data))
    }
    catch (err) {
      console.log('error in fething Orders', err)
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
      { accessorKey: 'total', header: 'Total Amount', size: 150 },
      { accessorKey: 'status', header: 'Order Status', size: 150 },
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
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedOrder?._id === row.original._id}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setFormValues(selectedOrder);
                  setIsEditing(true);
                  setOpenModal(true);
                  setAnchorEl(null);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await axios.delete(`${API_URL}/${row.original._id}`)
                  setOrders(orders.filter(order => order._id !== row.original._id));
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
    [anchorEl, selectedOrder, orders],
  );

  const table = useMaterialReactTable({
    columns,
    data: orders,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableRowSelection: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
  });

  const handleFormSubmit = async () => {
    if (isEditing) {
      await axios.put(`${API_URL}/${formValues._id}`, formValues)
      setOrders(orders.map(order => (order._id === formValues._id ? formValues : order)));
    } else {
      await axios.post(API_URL, formValues)
      const newOrder = { ...formValues };
      setOrders([...orders, newOrder]);
    }
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f2f5' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => setOpenModal(true)}
      >
        Add New Order
      </Button>
      <Box sx={{ overflowX: 'auto' }}>
        <MaterialReactTable table={table} />
      </Box>

      {/* Modal for Viewing Order Details */}
      <Modal open={viewOrderModal} onClose={() => setViewOrderModal(false)}>
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
              <Typography variant="body1">
                Customer Name: {selectedOrder.name}
              </Typography>
              <Typography variant="body1">Email: {selectedOrder.email}</Typography>
              <Typography variant="body1">
                Address: {selectedOrder.address}
              </Typography>
              <Typography variant="body1">
                Phone Number: {selectedOrder.phoneNo}
              </Typography>
              <Typography variant="body1">
                Postal Code: {selectedOrder.postalCode}
              </Typography>
              <Typography variant="body1">
                Order Date: {moment(selectedOrder.date).format('YYYY-MM-DD')}
              </Typography>
              <Typography variant="body1">
                Total Amount: {selectedOrder.total}
              </Typography>
              <Typography variant="body1">
                Order Status: {selectedOrder.status}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

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
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              value={formValues.address}
              onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              value={formValues.phoneNo}
              onChange={(e) => setFormValues({ ...formValues, phoneNo: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Postal Code"
              value={formValues.postalCode}
              onChange={(e) => setFormValues({ ...formValues, postalCode: e.target.value })}
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
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleFormSubmit}>
              {isEditing ? 'Save Changes' : 'Add Order'}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderTable;
