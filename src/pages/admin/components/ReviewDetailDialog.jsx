// Single responsibility: show review details and expose
// available actions (publish / reject) to the parent.
// Manages its own history loading state internally.

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
import HistoryIcon               from '@mui/icons-material/History';
import { useState, useEffect }   from 'react';
import StatusBadge from '@/pages/admin/components/StatusBadge';
import { Avatar, Divider } from '@mui/material';

/**
 * ReviewDetailDialog
 *
 * Props:
 *  - review       {object|null}  — selected review (null = closed)
 *  - onClose      {function}     — closes the dialog
 *  - onPublish    {function}     — opens publish confirmation
 *  - onReject     {function}     — opens reject confirmation
 *  - getHistory   {function}     — async fn to fetch status history
 *
 * Action visibility based on status:
 *  pending   → Publish + Reject
 *  published → Reject
 *  rejected  → N/A
 */
export default function ReviewDetailDialog({ review, onClose, onPublish, onReject, getHistory }) {
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (review?.id) {
      const fetchHistory = async () => {
        setLoadingHistory(true);
        const data = await getHistory(review.id);
        setHistory(data || []);
        setLoadingHistory(false);
      };
      fetchHistory();
    } else {
      setHistory([]);
    }
  }, [review?.id, getHistory]);
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

            <Divider sx={{ borderColor: '#1F1F1F', my: 1 }} />

            {/* ── Status History ── */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon sx={{ fontSize: 16, color: '#FFD700' }} />
                <Typography sx={{ color: 'white', fontSize: 13, fontWeight: 700 }}>
                  Review History
                </Typography>
              </Box>

              {loadingHistory ? (
                 <Typography sx={{ color: '#666', fontSize: 12 }}>Loading history...</Typography>
              ) : history.length === 0 ? (
                 <Typography sx={{ color: '#444', fontSize: 11, fontStyle: 'italic' }}>No history recorded yet.</Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {history.map((event, idx) => (
                    <Box key={idx} sx={{ display: 'flex', gap: 1.5 }}>
                      <Avatar 
                        src={event.admin?.person?.profilePicture} 
                        sx={{ width: 32, height: 32, border: '1px solid #222' }}
                      >
                        {event.admin?.person?.names?.charAt(0)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ color: 'white', fontSize: 12, fontWeight: 600 }}>
                            {event.admin?.person?.names}
                          </Typography>
                          <Typography sx={{ color: '#666', fontSize: 10 }}>
                            {new Date(event.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </Box>
                        <Typography sx={{ color: '#888', fontSize: 11, mt: 0.25 }}>
                          Changed status to <Box component="span" sx={{ 
                            color: event.newStatus?.toLowerCase() === 'published' ? '#4ADE80' : 
                                   event.newStatus?.toLowerCase() === 'rejected' ? '#F87171' : '#FFD700', 
                            fontWeight: 700 
                          }}>{event.newStatus}</Box>
                        </Typography>
                        {event.message && (
                          <Box sx={{ mt: 0.75, p: 1, bgcolor: '#161616', borderRadius: '6px', border: '1px solid #1F1F1F' }}>
                            <Typography sx={{ color: '#AAA', fontSize: 11, fontStyle: 'italic' }}>
                              "{event.message}"
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, mt: 1 }}>
              {review.status.toLowerCase() === 'new' && (
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
                  Publish
                </Button>
              )}
              {review.status.toLowerCase() !== 'rejected' && (
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
                  Reject
                </Button>
              )}
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'flex-end' }}>
            <Button onClick={onClose} sx={{ color: '#888', '&:hover': { color: 'white' }, textTransform: 'none' }}>
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
