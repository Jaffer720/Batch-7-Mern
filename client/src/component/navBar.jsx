import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Box, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import logo from '../../public/logo.jpeg';

const officeInfo = [
  { label: 'Our Office', detail: 'Main Office Jamia Masjid Road Skardu\nBranch Office Bar-Building Hameed Ghar, Skardu' },
  { label: 'Email Us', detail: 'netbotstech@gmail.com' },
  { label: 'Call Us', detail: '+92 3433757372' },
];

const navLinks = [
  { title: 'Home', path: '/home' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Order', path: '/order' }, // Added Order link
];

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'darkblue' }}>
      <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', padding: '0 10%', backgroundColor: 'darkblue' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
          <Box>
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'white', backgroundColor: 'darkblue', padding: '4px 16px', borderRadius: '30px', fontFamily: 'sans-serif', fontWeight: 'bolder',
                  '&:hover': {
                    color: 'yellow',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                NETBOTS
              </Typography>
            </Link>
          </Box>
          <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-around', gap: 4 }}>
            {officeInfo.map((info, index) => (
              <Box key={index}>
                <Typography variant="body1" color="white">{info.label}</Typography>
                <Typography variant="body2" color="white">{info.detail}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'whitesmoke', py: 1, px: 3, mt: 1, borderRadius: '5px',
          }}
        >
          <Box sx={{ margin: '0% 12% 0% 4%' }}>
            <img src={logo} alt="Logo" width={40} height={30} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box component="ul" sx={{ width: '80%', display: 'flex', gap: 10, listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link, index) => (
                <Box component="li" key={index}>
                  <Link to={link.path} style={{ textDecoration: 'none', color: 'darkblue' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: 'sans-serif',
                        '&:hover': {
                          color: 'red',
                          fontWeight: 'bold',
                        },
                      }}
                    >
                      {link.title}
                    </Typography>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                backgroundColor: 'darkblue', color: 'white', borderRadius: '5px', '&:hover': {
                  backgroundColor: 'lightblue', color: 'red',
                },
              }}
            >
              Signup
            </Button>
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              sx={{ mt: '45px' }}
            >
              <MenuItem onClick={handleMenuClose} component={Link} to="/dashboard">
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/orders">
                Orders
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/address">
                Address
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/logout">
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
