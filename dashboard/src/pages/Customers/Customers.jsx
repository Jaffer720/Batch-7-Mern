import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';
import { Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user/';

const UserList = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        const customers = response.data.users.filter((data) => data.roles[0] === "user");
        setData(customers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'name',
        header: 'Name',
        size: 250,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'phone',
        header: 'Contact',
        size: 150,
      },
      {
        accessorFn: (row) => `${row.address.street} ${row.address.city} ${row.address.state}`,
        id: 'address',
        header: 'Address',
        size: 250,
      },
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <Box display="flex" gap={1}>
            <IconButton
              onClick={() => {
                setSelectedUser(row.original);
                setOpenDetailModal(true);
              }}
            >
              <Visibility />
            </IconButton>
            <IconButton
              onClick={() => {
                setData(data.filter((user) => user.id !== row.original.id));
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        ),
      },
    ],
    [data]
  );

  const table = useMaterialReactTable({
    columns,
    data,
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
    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={(theme) => ({
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
      );
    },
  });

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f0f2f5', maxWidth: '100%' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <MaterialReactTable table={table} />
      </Box>

      <Modal open={openDetailModal} onClose={() => setOpenDetailModal(false)}>
        <Box
          sx={{
            padding: 4,
            backgroundColor: 'white',
            margin: 'auto',
            marginTop: '10%',
            width: 400,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            User Details
          </Typography>
          <Typography><strong>ID:</strong> {selectedUser?.customer?.id}</Typography>
          <Typography><strong>Fullname:</strong> {selectedUser?.name}</Typography>
          <Typography><strong>Email:</strong> {selectedUser?.email}</Typography>
          <Typography><strong>Contact:</strong> {selectedUser?.phone}</Typography>
          <Typography><strong>Country:</strong> {selectedUser?.country}</Typography>
          <Typography><strong>Address:</strong> {selectedUser?.address ? `${selectedUser.address.street}, ${selectedUser.address.city}, ${selectedUser.address.state}` : 'N/A'}</Typography>
          <Typography><strong>Date:</strong> {selectedUser?.date}</Typography>
          <Typography><strong>Status:</strong> {selectedUser?.status}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserList;
  