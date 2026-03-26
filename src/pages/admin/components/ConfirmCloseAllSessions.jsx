// ─── ConfirmCloseAllSessions.jsx ──────────────────────────────────────────────
// Warning panel shown before closing all sessions except the current one.

import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { WarningAmberOutlined as WarningIcon } from '@mui/icons-material';

export default function ConfirmCloseAllSessions({ onConfirm, onCancel, loading }) {
  return (
    <Box
      sx={{
        mx: 3,
        mb: 2,
        p: 2,
        bgcolor: 'rgba(239,68,68,0.08)',
        border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25 }}>
        <WarningIcon sx={{ color: '#F87171', fontSize: 16, flexShrink: 0, mt: 0.2 }} />
        <Typography sx={{ color: '#FCA5A5', fontSize: 13, lineHeight: 1.5 }}>
          Esto cerrará <strong>todas las sesiones excepto la actual</strong>.
          Los dispositivos deberán iniciar sesión de nuevo.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Button
          onClick={onCancel}
          disabled={loading}
          fullWidth
          sx={{
            height: 34,
            border: '1px solid #2A2A2A',
            color: '#9CA3AF',
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': { borderColor: '#4B5563' },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          fullWidth
          sx={{
            height: 34,
            bgcolor: '#EF4444',
            color: 'white',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': { bgcolor: '#DC2626' },
            '&:disabled': { opacity: 0.6 },
          }}
          startIcon={loading ? <CircularProgress size={12} sx={{ color: 'white' }} /> : undefined}
        >
          {loading ? 'Cerrando...' : 'Sí, cerrar todas'}
        </Button>
      </Box>
    </Box>
  );
}
