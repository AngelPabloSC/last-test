// ─── SessionsSuccessState.jsx ─────────────────────────────────────────────────
// Shown in the dialog body after all sessions have been closed successfully.

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CheckCircleOutline as CheckIcon } from '@mui/icons-material';

export default function SessionsSuccessState({ onClose }) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2.5,
        px: 4,
        py: 6,
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: 'rgba(74, 222, 128, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CheckIcon sx={{ fontSize: 28, color: '#4ADE80' }} />
      </Box>

      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>
          Sesiones cerradas
        </Typography>
        <Typography sx={{ color: '#6B7280', fontSize: 13, lineHeight: 1.5 }}>
          Todas las sesiones externas han sido cerradas correctamente.
        </Typography>
      </Box>

      <Button
        onClick={onClose}
        sx={{
          height: 36,
          px: 4,
          bgcolor: '#1F1F1F',
          border: '1px solid #2A2A2A',
          color: 'white',
          fontSize: 13,
          fontWeight: 600,
          textTransform: 'none',
          borderRadius: '8px',
          '&:hover': { bgcolor: '#2A2A2A' },
        }}
      >
        Aceptar
      </Button>
    </Box>
  );
}
