import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
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
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (err) {
      console.log('Error in fetching Orders', err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'name', header: 'Customer Name', size: 250 },
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
          <>
            <IconButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setSelectedOrder(row.original);
              }}
            >
              <MoreVertIcon />
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
                  await axios.delete(`${API_URL}/${row.original._id}`);
                  setOrders(orders.filter((order) => order._id !== row.original._id));
                  setAnchorEl(null);
                }}
              >
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedOrder(row.original);
                  setViewOrderModal(true);
                  setAnchorEl(null);
                }}
              >
                View
              </MenuItem>
            </Menu>
          </>
        ),
      },
    ],
    [anchorEl, selectedOrder, orders]
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
      await axios.put(`${API_URL}/${formValues._id}`, formValues);
      setOrders(
        orders.map((order) =>
          order._id === formValues._id ? formValues : order
        )
      );
    } else {
      const newOrder = await axios.post(API_URL, formValues);
      setOrders([...orders, newOrder.data]);
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
            {/* Other form fields here */}
            {/* Confirm Order Button */}
            {isEditing && formValues.status === 'pending' && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2 }}
                onClick={() =>
                  setFormValues({ ...formValues, status: 'confirm' })
                }
              >
                Confirm Order
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={handleFormSubmit}
            >
              {isEditing ? 'Save Changes' : 'Add Order'}
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderTable;
