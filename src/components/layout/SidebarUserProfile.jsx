// ─── SidebarUserProfile.jsx ───────────────────────────────────────────────────
// Responsabilidad única: mostrar el perfil del usuario (avatar, nombre, rol)
// y el botón de cierre de sesión en la parte inferior del sidebar.

import { Box, Typography, Tooltip, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

function getInitials(name) {
  if (!name) return 'NS';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

export default function SidebarUserProfile({ user, isOpen, onLogout }) {
  const theme = useTheme();
  const initials = getInitials(user?.name);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 3 }}>
      <Box sx={{ height: '1px', bgcolor: theme.palette.divider }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          justifyContent: isOpen ? 'flex-start' : 'center',
        }}
      >
        <Tooltip title={!isOpen ? (user?.name || 'Administrator') : ''} placement="right">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'primary.contrastText', lineHeight: 1 }}>
              {initials}
            </Typography>
          </Box>
        </Tooltip>

        {isOpen && (
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography noWrap sx={{ fontSize: 13, fontWeight: 600, color: '#ffffff' }}>
              {user?.name || 'Administrator'}
            </Typography>
            <Typography sx={{ fontSize: 12, color: theme.palette.text.secondary }}>
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
