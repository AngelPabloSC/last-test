
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import SidebarNav from '@/components/layout/SidebarNav';
import SidebarUserProfile from '@/components/layout/SidebarUserProfile';

export default function AdminSidebar({ isOpen, onToggle, menuItems, user, onLogout }) {
  const theme = useTheme();

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: 260, md: isOpen ? 260 : 88 },
        position: { xs: 'fixed', md: 'relative' },
        left: { xs: isOpen ? 0 : -260, md: 0 },
        top: 0,
        bottom: 0,
        zIndex: { xs: 1200, md: 1 },
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        py: 4,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Botón toggle — solo desktop */}
      <IconButton
        onClick={onToggle}
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          right: -20,
          top: 36,
          zIndex: 10,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
          '&:hover': { bgcolor: 'primary.dark' },
          width: 36,
          height: 36,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon icon={isOpen ? 'mdi:chevron-double-left' : 'mdi:chevron-double-right'} />
      </IconButton>

      {/* Logo + Nav */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          overscrollBehaviorY: 'none',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: isOpen ? 3 : 2,
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/driyxelzh/image/upload/v1775663721/icono_nova_rwfnjx.png"
            alt="Nova Solutions Corporation Logo"
            sx={{ 
              width: isOpen ? 120 : 40, 
              height: 'auto',
              transition: 'width 0.3s ease'
            }}
          />
        </Box>

        <SidebarNav menuItems={menuItems} isOpen={isOpen} />
      </Box>

      <SidebarUserProfile user={user} isOpen={isOpen} onLogout={onLogout} />
    </Box>
  );
}
