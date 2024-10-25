import React, { useState } from 'react';
import { List, Link, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// assets
import { I24Support, Lock1, Messages1 } from 'iconsax-react';

export default function SettingTab() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <Link style={{ textDecoration: 'none' }}>
        <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <I24Support variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItemButton>
      </Link>

      <ListItemButton selected={selectedIndex === 2} onClick={() => navigate('/policy')}>
        <ListItemIcon>
          <Lock1 variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>

      <Link style={{ textDecoration: 'none' }}>
        <ListItemButton selected={selectedIndex === 3} onClick={() => navigate('/feedback')}>
          <ListItemIcon>
            <Messages1 variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItemButton>
      </Link>
    </List>
  );
}
