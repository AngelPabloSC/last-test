// ─── SidebarUserProfile.jsx ───────────────────────────────────────────────────
// Responsabilidad única: mostrar el perfil del usuario (avatar, nombre, rol)
// y el botón de cierre de sesión en la parte inferior del sidebar.

import { Box, Typography, Tooltip, Avatar, useTheme } from '@mui/material';
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
  
  const displayName = user?.person?.names || user?.username || user?.name || 'Administrator';
  const initials = getInitials(displayName);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 3 }}>
      <Box sx={{ height: '1px', bgcolor: theme.palette.divider }} />
      <Box
        onClick={() => navigate('/admin/profile')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          justifyContent: isOpen ? 'flex-start' : 'center',
          cursor: 'pointer',
          p: 0.5,
          borderRadius: 2,
          transition: 'background-color 0.2s',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' },
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
              lineHeight: 1
            }}
          >
            {initials}
          </Avatar>
        </Tooltip>

        {isOpen && (
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography noWrap sx={{ fontSize: 13, fontWeight: 600, color: '#ffffff' }}>
              {displayName}
            </Typography>
            <Typography sx={{ fontSize: 11, color: theme.palette.text.secondary }}>
              {user?.rol ?? 'Admin'}
            </Typography>
          </Box>
        )}

        <Tooltip title="Sign Out" placement="right">
          <Box
            component="button"
            onClick={onLogout}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: theme.palette.text.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0.5,
              borderRadius: 1,
              transition: 'color 0.15s',
              '&:hover': { color: '#ffffff' },
              mt: !isOpen ? 1 : 0,
            }}
          >
            <Icon icon="mdi:logout" style={{ fontSize: 20 }} />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
