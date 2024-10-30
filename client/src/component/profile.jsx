import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserDetails = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
      setLoading(false);
    } else {
      setError('No user data found.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserDetails();
    
    // Listen to changes in localStorage to update user details
    const handleStorageChange = () => {
      loadUserDetails();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading Profile...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
      }}
    >
      <Paper 
        elevation={3}
        sx={{
          padding: '20px',
          width: '300px',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <Avatar
          src={userDetails.profilePicture || '/default-avatar.png'}
          alt="Profile Picture"
          sx={{ width: '100px', height: '100px', marginBottom: '20px' }}
        />
        <Typography variant="h5" gutterBottom>
          {userDetails.firstName} {userDetails.lastName}
        </Typography>
        <Typography variant="body1">Email: {userDetails.email}</Typography>
        <Typography variant="body1">Phone: {userDetails.phone}</Typography>
        <Typography variant="body1">
          Address: {userDetails.address.street}, {userDetails.address.city}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Profile;
