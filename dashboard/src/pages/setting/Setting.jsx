import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Typography, MenuItem, Avatar } from '@mui/material';
import { useFormik } from 'formik';
import avatar1 from 'assets/images/users/avatar-6.png'; // Replace with your image path
import { useAuth } from 'context/authContext';
import moment from 'moment';

const ProfileSettings = () => {
  const { user } = useAuth(); // Assuming AuthContext provides user info
  const [activeTab, setActiveTab] = useState('profile');

  const formik = useFormik({
    initialValues: {
      name: `${user?.firstName} ${user?.lastName}` || '',
      username: user?.username || '',
      email: user?.email || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || '',
      role: user?.roles[0] || '',
      phone: user?.phone || '',
      address: user?.address.street || '',
      postalCode: user?.address.postalCode || '',
      city: user?.address.city || '',
      country: user?.address.country || '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: (values) => {
      // Handle form submission, e.g., update profile or change password
      console.log('Form values:', values);
    },
  });

  const commonBoxStyle = {
    mb: 3,
    p: 3,
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const renderProfileForms = () => (
    <form onSubmit={formik.handleSubmit}>
      {/* Avatar Image at the top */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Avatar
          src={avatar1}
          alt={`${formik.values.name} ${formik.values.username}`}
          sx={{ width: 150, height: 150 }}
        />
      </Box>

      <Box sx={commonBoxStyle}>
        <Typography variant="h6" sx={{ pb: 2 }}>Personal Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={moment(formik.values.dateOfBirth).format("YYYY-MM-DD")}
              onChange={formik.handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={commonBoxStyle}>
        <Typography variant="h6" sx={{ pb: 2 }}>Contact Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Post Code"
              name="postCode"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Update Profile Button at the bottom */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" type="submit">
          Update Profile
        </Button>
      </Box>
    </form>
  );

  const renderPasswordForm = () => (
    <Box sx={commonBoxStyle}>
      <Typography variant="h6" sx={{ paddingBottom: '15px' }}>Change Password</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              name="confirmNewPassword"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
            />
          </Grid>
        </Grid>

        {/* Update Password Button */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" color="primary" type="submit">
            Update Password
          </Button>
        </Box>
      </form>
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'flex-end', // Align buttons to the right
        }}
      >
        <Button
          variant="contained"
          onClick={() => setActiveTab('profile')}
          sx={{ mr: 2 }}
        >
          Profile
        </Button>
        <Button variant="contained" onClick={() => setActiveTab('password')}>
          Password
        </Button>
      </Box>

      {activeTab === 'profile' && renderProfileForms()}
      {activeTab === 'password' && renderPasswordForm()}
    </Box>
  );
};

export default ProfileSettings;
