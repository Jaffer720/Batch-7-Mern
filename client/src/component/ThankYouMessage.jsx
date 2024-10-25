import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ThankYouMessage = () => {
  const location = useLocation();
  const { error } = location.state || {};
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Get the current user details from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
      }}
    >
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={3} display="flex" justifyContent="center">
              <CheckCircleIcon sx={{ fontSize: '4rem', color: 'green' }} />
            </Grid>
            <Grid item xs={12} sm={9}>
              {error ? (
                <>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', textAlign: { xs: 'center', sm: 'left' } }}>
                    Oops! Something went wrong.
                  </Typography>
                  <Typography variant="body1" color="error" sx={{ textAlign: { xs: 'center', sm: 'left' }, marginTop: 2 }}>
                    {error}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: { xs: 'center', sm: 'left' }, marginTop: 1 }}>
                    Please try again later or contact support.
                  </Typography>
                </>
              ) : userDetails ? (
                <>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', textAlign: { xs: 'center', sm: 'left' } }}>
                    Thank You for Your Purchase, {userDetails.firstName}!
                  </Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ textAlign: { xs: 'center', sm: 'left' }, marginTop: 2 }}>
                    Your order has been placed successfully.
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: { xs: 'center', sm: 'left' }, marginTop: 1 }}>
                    Happy Shopping! 🛒
                  </Typography>
                </>
              ) : (
                <Typography variant="h5" color="textSecondary" sx={{ textAlign: 'center' }}>
                  Loading user details...
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThankYouMessage;
