import { useState } from 'react';

// Material-UI
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Assets
import { Edit2, Logout, Profile, Profile2User } from 'iconsax-react';
import ProfileSettings from '../../../../../pages/setting/Setting'; // Import the ProfileSettings component
import { useNavigate } from 'react-router';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab({ handleLogout }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
const Navigate =useNavigate()
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (index === 0) {
      setShowProfileSettings(true); // Show ProfileSettings for Edit Profile
    } else {
      setShowProfileSettings(false); // Hide ProfileSettings for other options
    }
  };

  return (
    <div>
      <List component="nav" sx={{ p: 0,overflowY: 'auto', '& .MuiListItemIcon-root': { minWidth: 32 } }}>
        <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
          <ListItemIcon>
            <Edit2 variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" onClick={()=>{Navigate('/settings')}}/>
          {/* {showProfileSettings && <ProfileSettings />} */}
        </ListItemButton>
        <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
          <ListItemIcon>
            <Profile variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="View Profile" onClick={()=>{Navigate('/profile')}}/>
        </ListItemButton>
        {/* <ListItemButton selected={selectedIndex === 3} onClick={() => handleListItemClick(3)}>
          <ListItemIcon>
            <Profile2User variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Social Profile" />
        </ListItemButton> */}
        <ListItemButton selected={selectedIndex === 2}>
          <ListItemIcon>
            <Logout variant="Bulk" size={18} />
          </ListItemIcon>
          <ListItemText primary="Logout" onClick={handleLogout} />
        </ListItemButton>
      </List>

      {/* {showProfileSettings && <ProfileSettings />} Render ProfileSettings conditionally */}
    </div>
  );
}