
import { Box } from '@mui/material';

const STATUS_MAP = {
  pendiente: { label: 'Pendiente', bg: 'rgba(255, 215, 0, 0.12)', text: '#FFD700', border: 'rgba(255, 215, 0, 0.3)' },
  publicada: { label: 'Publicada', bg: 'rgba(34, 197, 94, 0.12)',  text: '#4ADE80', border: 'rgba(34, 197, 94, 0.3)'  },
  rechazada: { label: 'Rechazada', bg: 'rgba(239, 68, 68, 0.12)',  text: '#F87171', border: 'rgba(239, 68, 68, 0.3)'  },
};

export default function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || STATUS_MAP.pendiente;
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.25,
        py: 0.5,
        borderRadius: 9999,
        fontSize: 11,
        fontWeight: 700,
        bgcolor: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
      }}
    >
      {s.label}
    </Box>
  );
}
