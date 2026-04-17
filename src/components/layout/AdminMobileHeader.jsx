
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';

export default function AdminMobileHeader({ onMenuOpen }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        p: 2,
        bgcolor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <IconButton onClick={onMenuOpen} sx={{ color: theme.palette.text.secondary, mr: 2 }}>
        <Icon icon="mdi:menu" style={{ fontSize: 28 }} />
      </IconButton>
      <Typography sx={{ color: '#ffffff', fontWeight: 700, fontSize: 18 }}>
        Nova Admin
      </Typography>
    </Box>
  );
}
