// ─── ReviewDetailDialog.jsx ───────────────────────────────────────────────────
// Responsabilidad única: mostrar el detalle de una reseña y exponer
// las acciones disponibles (publicar / eliminar) hacia el padre.
// No maneja estado propio — es completamente controlado por props.

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from '@mui/material';
import ThumbUpOutlinedIcon       from '@mui/icons-material/ThumbUpOutlined';
import BlockOutlinedIcon         from '@mui/icons-material/BlockOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StatusBadge from '@/pages/admin/components/StatusBadge';

/**
 * ReviewDetailDialog
 *
 * Props:
 *  - review       {object|null}  — reseña seleccionada (null = cerrado)
 *  - onClose      {function}     — cierra el dialog
 *  - onPublish    {function}     — abre confirmación de publicar
 *  - onReject     {function}     — abre confirmación de rechazar
 *  - onDelete     {function}     — abre confirmación de eliminar
 *
 * Visibilidad de acciones según estado:
 *  pendiente  → Publicar + Rechazar + Eliminar
 *  publicada  → Rechazar + Eliminar
 *  rechazada  → Eliminar
 */
export default function ReviewDetailDialog({ review, onClose, onPublish, onReject, onDelete }) {
  return (
    <Dialog
      open={Boolean(review)}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            bgcolor: '#111',
            borderRadius: '16px',
            border: '1px solid #1F1F1F',
            width: '100%',
            maxWidth: 500,
          },
        },
      }}
    >
      {review && (
        <>
          <DialogTitle sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  bgcolor: 'rgba(255,215,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: '#FFD700', fontWeight: 700 }}>{review.avatar}</Typography>
              </Box>
              <Box>
                <Typography sx={{ color: 'white', fontWeight: 600 }}>{review.client}</Typography>
                <Typography sx={{ color: '#888', fontSize: 12 }}>{review.email}</Typography>
              </Box>
            </Box>
            <StatusBadge status={review.status} />
          </DialogTitle>

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Rating value={review.rating} readOnly size="small" sx={{ color: '#FFD700' }} />
              <Typography sx={{ color: '#888', fontSize: 12 }}>{review.service} · {review.date}</Typography>
            </Box>

            <Box sx={{ bgcolor: '#0A0A0A', border: '1px solid #1F1F1F', borderRadius: '12px', p: 2 }}>
              <Typography sx={{ color: '#D1D5DB', fontSize: 14, lineHeight: 1.6 }}>
                "{review.review}"
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1 }}>
              {review.status === 'pendiente' && (
                <Button
                  onClick={() => onPublish(review)}
                  startIcon={<ThumbUpOutlinedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: 'rgba(34,197,94,0.08)',
                    color: '#4ADE80',
                    border: '1px solid rgba(34,197,94,0.25)',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: 13,
                    '&:hover': { bgcolor: 'rgba(34,197,94,0.15)' },
                  }}
                >
                  Publicar
                </Button>
              )}
              {review.status !== 'rechazada' && (
                <Button
                  onClick={() => onReject(review)}
                  startIcon={<BlockOutlinedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: 'rgba(251,191,36,0.08)',
                    color: '#FBBF24',
                    border: '1px solid rgba(251,191,36,0.25)',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: 13,
                    '&:hover': { bgcolor: 'rgba(251,191,36,0.15)' },
                  }}
                >
                  Rechazar
                </Button>
              )}
              <Button
                onClick={() => onDelete(review)}
                startIcon={<DeleteOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  bgcolor: 'rgba(239,68,68,0.08)',
                  color: '#F87171',
                  border: '1px solid rgba(239,68,68,0.25)',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: 13,
                  '&:hover': { bgcolor: 'rgba(239,68,68,0.15)' },
                }}
              >
                Eliminar
              </Button>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'flex-end' }}>
            <Button onClick={onClose} sx={{ color: '#888', '&:hover': { color: 'white' }, textTransform: 'none' }}>
              Cerrar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
