// ─── SidebarUserProfile.jsx ───────────────────────────────────────────────────
// Responsabilidad única: mostrar el perfil del usuario (avatar, nombre, rol)
// y el botón de cierre de sesión en la parte inferior del sidebar.

import { useState } from 'react';
import { Box, Typography, Tooltip, Avatar, useTheme, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

function getInitials(name) {
  if (!name) return 'NS';
  const parts = name.split(' ').filter(p => !p.toLowerCase().includes('.'));
  const initials = parts.map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return initials || 'NS';
}

export default function SidebarUserProfile({ user, isOpen, onLogout }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const displayName = user?.person?.names || user?.username || user?.name || 'Administrator';
  const initials = getInitials(displayName);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleProfileClick = () => {
    handleClose();
    navigate('/admin/profile');
  };

  const handleLogoutClick = () => {
    handleClose();
    onLogout();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pb: 2, px: isOpen ? 3 : 1 }}>
      <Box sx={{ height: '1px', bgcolor: theme.palette.divider, mb: 2, mx: isOpen ? 0 : 2 }} />
      
      <Box
        onClick={handleOpen}
        sx={{
          display: 'flex',
          flexDirection: isOpen ? 'row' : 'column',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          p: 0.5,
          borderRadius: 2,
          transition: 'background-color 0.2s',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
          justifyContent: isOpen ? 'flex-start' : 'center',
          overflow: 'hidden'
        }}
      >
        <Tooltip title={!isOpen ? displayName : ''} placement="right">
          <Avatar 
            src={user?.profilePicture}
            sx={{ 
              width: 36, 
              height: 36, 
              bgcolor: 'primary.main', 
              color: 'primary.contrastText',
              fontSize: 13,
              fontWeight: 700,
              lineHeight: 1,
              flexShrink: 0
            }}
          >
            {initials}
          </Avatar>
        </Tooltip>

        {isOpen && (
          <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography noWrap sx={{ fontSize: 13, fontWeight: 600, color: '#ffffff' }}>
                {displayName}
              </Typography>
              <Typography sx={{ fontSize: 11, color: theme.palette.text.secondary }}>
                {user?.rol ?? 'Admin'}
              </Typography>
            </Box>
            <Icon icon="ic:baseline-more-vert" style={{ color: theme.palette.text.secondary, fontSize: 20 }} />
          </Box>
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            mb: 1,
            minWidth: 160,
          }
        }}
      >
        <MenuItem onClick={handleProfileClick} sx={{ color: '#fff', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
          <ListItemIcon>
            <Icon icon="mdi:account" style={{ color: '#fff', fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText primary="My Profile" primaryTypographyProps={{ fontSize: 13 }} />
        </MenuItem>
        
        <MenuItem onClick={handleLogoutClick} sx={{ color: '#ef4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}>
          <ListItemIcon>
            <Icon icon="mdi:logout" style={{ color: '#ef4444', fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }} />
        </MenuItem>
      </Menu>
    </Box>
  );
}
