import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

export default function MetricCard({ label, value, Icon, change, changeColor, TrendIcon, prefix }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1, sm: 1.5 },
        borderRadius: { xs: '8px', sm: '10px' },
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: '#0A0A0A',
        p: { xs: 1.5, sm: 3 },
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 500, color: theme.palette.text.disabled }}>{label}</Typography>
        <Icon sx={{ fontSize: { xs: 16, sm: 20 }, color: 'primary.main' }} />
      </Box>
      <Typography sx={{ fontSize: { xs: 24, sm: 36 }, fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1 }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {TrendIcon && <TrendIcon sx={{ fontSize: { xs: 12, sm: 14 }, color: changeColor }} />}
        {prefix && <Typography component="span" sx={{ fontSize: { xs: 10, sm: 12 }, color: changeColor }}>{prefix}</Typography>}
        <Typography sx={{ fontSize: { xs: 10, sm: 12 }, fontWeight: 600, color: changeColor, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{change}</Typography>
      </Box>
    </Box>
  );
}
