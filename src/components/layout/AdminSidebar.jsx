
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
            gap: 1.25,
            px: isOpen ? 3 : 0,
            justifyContent: isOpen ? 'flex-start' : 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '6px',
              bgcolor: 'primary.main',
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: 800, color: 'primary.contrastText', lineHeight: 1 }}>
              N
            </Typography>
          </Box>
          {isOpen && (
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#ffffff' }}>
              Nova Admin
            </Typography>
          )}
        </Box>

        <SidebarNav menuItems={menuItems} isOpen={isOpen} />
      </Box>

      <SidebarUserProfile user={user} isOpen={isOpen} onLogout={onLogout} />
    </Box>
  );
}
