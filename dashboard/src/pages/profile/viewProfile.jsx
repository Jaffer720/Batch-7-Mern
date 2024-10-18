import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import avatar1 from 'assets/images/users/avatar-6.png';
import { useAuth } from 'context/authContext';
import noData from 'assets/images/icons/noData.jpg'
const ViewProfile = () => {
    const { user } = useAuth();
    console.log('user', user)

    const {
        username,
        firstName,
        lastName,
        email,
        Orders,
        address,
        phone,
        roles,
        dateOfBirth
    } = user || {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        Orders: [],
        address: "",
        phone: "",
        roles: [],
        dateOfBirth: ""
    };

    return (
        <>

            <Card>
                {user ? (
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                            <Avatar
                                src={avatar1}
                                alt={`${firstName} ${lastName}`}
                                sx={{ width: 150, height: 150 }}
                            />
                            <Typography variant="h4" mt={2}>
                                {firstName} {lastName}
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                                @{username}
                            </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1">Email:</Typography>
                                <Typography variant="body1">{email}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1">Phone:</Typography>
                                <Typography variant="body1">{phone || 'N/A'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1">Date of Birth:</Typography>
                                <Typography variant="body1">{dateOfBirth || 'N/A'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1">Roles:</Typography>
                                <Typography variant="body1">{roles.join(', ')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">Address:</Typography>
                                <Typography variant="body1">
                                    {address?.street}, {address?.city}, {address?.state}, {address?.postalCode}, {address?.country}
                                </Typography>
                            </Grid>
                            {roles !== [] && roles[0] === 'user' &&
                                (<Grid item xs={12}>
                                    <Typography variant="subtitle1">Orders:</Typography>
                                    <Typography variant="body1">{Orders.length} order(s)</Typography>
                                </Grid>)
                            }
                        </Grid>
                    </CardContent>
                ) :
                    (
                        <CardContent sx={{ height: '70vh', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>

                            <img
                                src={noData}
                                alt={`error icon`}
                                style={{ width: 250, height: 250 }}
                            />
                            <Typography variant='h5'>
                                Could not display User Details
                            </Typography>
                            <Typography variant='subtitle1'>
                                please logout and login again and visit the page...
                            </Typography>

                        </CardContent>)
                }
            </Card>
        </>
    );
};

export default ViewProfile;
