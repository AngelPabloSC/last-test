// ─── AdminSidebarLayout.jsx ───────────────────────────────────────────────────
// Responsabilidad única: orquestar el layout del área de administración.
// Obtiene el estado global y lo distribuye a los componentes especializados.

import { Outlet } from 'react-router-dom';
import { Box, GlobalStyles, CssBaseline, useTheme } from '@mui/material';
import { useLoginContext } from '@/context/LoginContext';
import { helpPermsion } from '@/helpers/helpPermsion';
import { useSidebarContext } from '@/context/SidebarContext';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminMobileHeader from '@/components/layout/AdminMobileHeader';

export default function AdminSidebarLayout() {
  const theme = useTheme();
  const { user, logout } = useLoginContext();
  const { isOpen, toggleSidebar } = useSidebarContext();
  const { filterRouter } = helpPermsion();

  const { menuItems } = filterRouter(user?.rol);

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { backgroundColor: theme.palette.background.dark || '#0A0A0A', overscrollBehavior: 'none' },
          html: { backgroundColor: theme.palette.background.dark || '#0A0A0A', overscrollBehavior: 'none' },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          height: '100dvh',
          width: '100vw',
          overflow: 'hidden',
          bgcolor: theme.palette.background.dark,
          fontFamily: "'Inter', sans-serif",
          color: '#ffffff',
        }}
      >
        {/* Overlay móvil — cierra el sidebar al hacer clic fuera */}
        <Box
          onClick={toggleSidebar}
          sx={{
            display: { xs: isOpen ? 'block' : 'none', md: 'none' },
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.6)',
            zIndex: 1100,
          }}
        />

        <AdminSidebar
          isOpen={isOpen}
          onToggle={toggleSidebar}
          menuItems={menuItems}
          user={user}
          onLogout={logout}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            overscrollBehaviorY: 'none',
            bgcolor: theme.palette.background.dark,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AdminMobileHeader onMenuOpen={toggleSidebar} />

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100%', p: { xs: 2, md: 0 } }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}
