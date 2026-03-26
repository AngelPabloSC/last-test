// ─── ConfirmActionDialog.jsx ──────────────────────────────────────────────────
// Dialog de confirmación antes de ejecutar una acción sobre una review.
// Muestra un preview de la reseña seleccionada para evitar acciones accidentales.
// Estilo: dark (basado en el modelo PublicarReviewDialog del equipo).

import { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Rating,
  CircularProgress,
  TextField,
  Divider,
} from '@mui/material';
import CloseIcon         from '@mui/icons-material/Close';
import CheckCircleIcon   from '@mui/icons-material/CheckCircle';
import WarningAmberIcon  from '@mui/icons-material/WarningAmber';
import BlockIcon         from '@mui/icons-material/Block';

// ─────────────────────────────────────────────────────────────────────────────

const VARIANT_CONFIG = {
  publish: {
    label:       'Publish Review',
    confirmText: 'Publish Review',
    loadingText: 'Publishing...',
    noteText:    'This review will be published in the website\'s Reviews section.',
    noteColor:   '#4ADE80',
    noteBg:      'rgba(34,197,94,0.08)',
    noteBorder:  'rgba(34,197,94,0.25)',
    NoteIcon:    CheckCircleIcon,
    btnBg:       '#22C55E',
    btnHover:    '#16A34A',
  },
  reject: {
    label:       'Reject Review',
    confirmText: 'Reject Review',
    loadingText: 'Rejecting...',
    noteText:    'This review will be marked as rejected and will not be visible on the website.',
    noteColor:   '#FBBF24',
    noteBg:      'rgba(251,191,36,0.08)',
    noteBorder:  'rgba(251,191,36,0.25)',
    NoteIcon:    BlockIcon,
    btnBg:       '#D97706',
    btnHover:    '#B45309',
  },
};

// ─────────────────────────────────────────────────────────────────────────────

/**
 * ConfirmActionDialog
 *
 * Props:
 *  - isOpen    {boolean}            — controla la visibilidad
 *  - variant   {'publish'|'delete'} — tipo de acción a confirmar
 *  - review    {object}             — review seleccionada { id, client, avatar, source, service, rating, review, date }
 *  - onConfirm {function}           — async fn llamada al confirmar (recibe review)
 *  - onCancel  {function}           — llamada al cancelar / cerrar
 */
export default function ConfirmActionDialog({ isOpen, variant = 'publish', review, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState('');

  if (!isOpen || !review) return null;

  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.publish;
  const { NoteIcon } = config;

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm(review, adminMessage);
    setLoading(false);
    setAdminMessage('');
  };

  const handleCancel = () => {
    setAdminMessage('');
    onCancel();
  };

  return (
    /* Overlay */
    <Box
      onClick={onCancel}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Card */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: 'relative',
          width: 440,
          maxWidth: 'calc(100vw - 32px)',
          bgcolor: '#111111',
          border: '1px solid #2A2A2A',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          overflow: 'hidden',
        }}
      >
        {/* ── Header ── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: '22px',
            borderBottom: '1px solid #1F1F1F',
          }}
        >
          <Typography sx={{ color: 'white', fontWeight: 700, fontSize: 17 }}>
            {config.label}
          </Typography>
          <IconButton
            onClick={handleCancel}
            size="small"
            sx={{
              bgcolor: '#1A1A1A',
              color: '#6B7280',
              '&:hover': { bgcolor: '#2A2A2A', color: 'white' },
              width: 32,
              height: 32,
              borderRadius: '8px',
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        {/* ── Body ── */}
        <Box sx={{ px: 3, py: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>

          {/* Review seleccionada */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ color: '#6B7280', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Selected Review
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                bgcolor: '#0A0A0A',
                border: '1px solid #1F1F1F',
                borderRadius: '12px',
              }}
            >
              {/* Avatar */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,215,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography sx={{ color: '#FFD700', fontWeight: 700, fontSize: 14 }}>
                  {(review.fullName || review.client || review.name || 'U').charAt(0).toUpperCase()}
                </Typography>
              </Box>
              {/* Info */}
               <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: 1 }}>
                  {review.fullName || review.client || row.name || 'Unnamed'}
                </Typography>
                <Typography sx={{ color: '#6B7280', fontSize: 12, mt: 0.5 }}>
                  {review.source} · {review.service}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Preview de la review */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Typography sx={{ color: '#6B7280', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Review Preview
            </Typography>

            <Box
              sx={{
                p: 2,
                bgcolor: '#0A0A0A',
                border: '1px solid #1F1F1F',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Rating value={review.rating} readOnly size="small" sx={{ color: '#FFD700' }} />
              <Typography sx={{ color: '#D1D5DB', fontSize: 13, lineHeight: 1.6 }}>
                "{review.review}"
              </Typography>
              <Typography sx={{ color: '#4B5563', fontSize: 12 }}>
                {review.date} · {review.source}
              </Typography>
            </Box>

            {/* Nota informativa */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.25,
                p: 1.5,
                bgcolor: config.noteBg,
                border: `1px solid ${config.noteBorder}`,
                borderRadius: '8px',
                mb: 1,
              }}
            >
              <NoteIcon sx={{ fontSize: 15, color: config.noteColor, flexShrink: 0, mt: '1px' }} />
              <Typography sx={{ color: config.noteColor, fontSize: 12, lineHeight: 1.6 }}>
                {config.noteText}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: '#1F1F1F' }} />

            {/* Comentario del Admin */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 600 }}>
                  Reviewer Comment (Optional)
                </Typography>
                <Typography sx={{ color: adminMessage.length > 25 ? 'error.main' : '#4B5563', fontSize: 11, fontWeight: 700 }}>
                  {adminMessage.length} / 25
                </Typography>
              </Box>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="e.g. Validated and approved."
                value={adminMessage}
                onChange={(e) => setAdminMessage(e.target.value)}
                error={adminMessage.length > 25}
                slotProps={{
                  input: {
                    sx: {
                      color: 'white',
                      fontSize: 13,
                      bgcolor: '#0A0A0A',
                      borderColor: '#1F1F1F',
                      '& fieldset': { borderColor: '#1F1F1F' },
                      '&:hover fieldset': { borderColor: '#333' },
                    }
                  }
                }}
              />
            </Box>
          </Box>

          {/* ── Actions ── */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
            <Button
              onClick={handleCancel}
              disabled={loading}
              sx={{
                height: 36,
                px: 2.5,
                bgcolor: 'transparent',
                border: '1px solid #2A2A2A',
                color: '#9CA3AF',
                fontSize: 14,
                fontWeight: 500,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': { borderColor: '#4B5563', color: 'white' },
                '&.Mui-disabled': { opacity: 0.4 },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading || adminMessage.length > 25}
              sx={{
                height: 36,
                px: 2.5,
                bgcolor: config.btnBg,
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': { bgcolor: config.btnHover },
                '&.Mui-disabled': { opacity: 0.6, cursor: 'not-allowed' },
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={14} color="inherit" />
                  {config.loadingText}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NoteIcon sx={{ fontSize: 14 }} />
                  {config.confirmText}
                </Box>
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
