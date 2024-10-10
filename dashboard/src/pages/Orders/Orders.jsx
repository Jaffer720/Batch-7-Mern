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
  lighten,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
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
  }

  useEffect(() => {
    getOrders()
  }, [])
  const columns = useMemo(
    () => [

      {
        accessorKey: 'name',
        header: 'Customer Name',
        size: 250,
      },
      {
        accessorKey: 'date',
        accessorFn: (row) => moment(row.date).format('YYYY-MM-DD'), // Correctly accessing the 'date' field
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
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    muiTableBodyCellProps: {
      sx: {
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
      },
    },
    muiTableBodyRowProps: {
      sx: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#ffffff',
        },
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: '#ffffff',
        color: '#000000',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
    },
    muiTableContainerProps: {
      sx: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'auto',
        maxWidth: '100%',
      },
    },
    renderTopToolbar: ({ table }) => (
      <Box
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.05),
          display: 'flex',
          gap: '0.5rem',
          p: '8px',
          justifyContent: 'space-between',
        })}
      >
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
      </Box>
    ),
  });

  const handleAddOrder = () => {
    setIsEditing(false);
    setFormValues({ name: '', date: '', total: '', status: '' });
    setOpenModal(true);
  };

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
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleAddOrder}>
        Add New Order
      </Button>
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
            overflowY: 'auto'
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
