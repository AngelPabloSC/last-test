// ─── SidebarNav.jsx ───────────────────────────────────────────────────────────
// Responsabilidad única: renderizar la lista de ítems de navegación del sidebar.

import { NavLink } from 'react-router-dom';
import { Box, Typography, Tooltip, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

export default function SidebarNav({ menuItems, isOpen }) {
  const theme = useTheme();

  return (
    <Box component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
      {isOpen && (
        <Typography
          sx={{
            mb: 1,
            px: 3,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: theme.palette.text.secondary,
          }}
        >
          Menu
        </Typography>
      )}

      {menuItems.map(({ id, name, route, icon, badge }) => (
        <Tooltip title={!isOpen ? name : ''} placement="right" key={id}>
          <NavLink to={route} style={{ textDecoration: 'none' }}>
            {({ isActive }) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isOpen ? 'flex-start' : 'center',
                  gap: 1.5,
                  px: isOpen ? 3 : 0,
                  py: 1.5,
                  borderLeft: '3px solid',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  bgcolor: isActive ? `${theme.palette.primary.main}14` : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  '&:hover': { bgcolor: theme.palette.action.hover },
                }}
              >
                <Icon
                  icon={icon}
                  style={{
                    fontSize: 24,
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    flexShrink: 0,
                    transition: 'color 0.15s',
                  }}
                />
                {isOpen && (
                  <>
                    <Typography
                      sx={{
                        flex: 1,
                        fontSize: 14,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? 'primary.main' : theme.palette.text.secondary,
                        transition: 'color 0.15s',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {name}
                    </Typography>
                    {badge != null && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: 22,
                          height: 20,
                          borderRadius: 9999,
                          bgcolor: 'error.main',
                          px: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'white', lineHeight: 1 }}>
                          {badge}
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            )}
          </NavLink>
        </Tooltip>
      ))}
    </Box>
  );
}
