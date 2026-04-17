import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, 
  Divider, Avatar, Skeleton, useTheme, Rating, RadioGroup, 
  FormControlLabel, Radio, TextField, Button, CircularProgress 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import HistoryIcon from '@mui/icons-material/History';

const STATUS_COLORS = {
  'New':       '#FFD700',
  'Pending':   '#FFD700',
  'Published': '#4ADE80',
  'Rejected':  '#F87171',
};

export default function AdminReviewDetailDialog({ open, onClose, data, getHistory, onUpdateStatus }) {
  const theme = useTheme();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  
  // Status editing state
  const [newStatus, setNewStatus] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (open && data?.id) {
      if (getHistory) loadHistory();
      // Normalize status labels for the radio group
      const currentStatus = data.status === 'New' ? 'Pending' : data.status;
      setNewStatus(currentStatus || 'Pending');
      setUpdateMessage('');
    }
  }, [open, data?.id]);

  const loadHistory = async () => {
    setLoadingHistory(true);
    const res = await getHistory(data.id);
    setHistory(res);
    setLoadingHistory(false);
  };

  const handleApplyStatus = async () => {
    if (!onUpdateStatus) return;
    setIsUpdating(true);
    const success = await onUpdateStatus(data.id, newStatus, updateMessage);
    if (success) {
      setUpdateMessage('');
      if (getHistory) loadHistory();
    }
    setIsUpdating(false);
  };

  if (!data) return null;

  const hasStatusChanged = newStatus !== (data.status === 'New' ? 'Pending' : data.status) || updateMessage.length > 0;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#0f0f0f',
          backgroundImage: 'none',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 3
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
          Review Details
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: 'text.disabled' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pb: 4, borderColor: 'rgba(255,255,255,0.05)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
          
          {/* Header Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: 'rgba(255,215,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,215,0,0.2)'
              }}
            >
              <Typography sx={{ color: '#FFD700', fontWeight: 800, fontSize: 18 }}>
                {(data.client || data.fullName || 'U').charAt(0)}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
                {data.client || data.fullName || 'Unnamed Customer'}
              </Typography>
              <Typography sx={{ color: 'text.disabled', fontSize: 12 }}>
                {data.email} · {data.service || 'General Service'}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Rating value={Number(data.rating)} readOnly size="small" sx={{ color: '#FFD700', mb: 0.5 }} />
              <Typography sx={{ fontSize: 10, color: 'text.disabled', fontWeight: 600 }}>
                {data.date || (data.createdAt && new Date(data.createdAt).toLocaleDateString())}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, p: 2 }}>
            <Typography sx={{ color: '#D1D5DB', fontSize: 14, fontStyle: 'italic', lineHeight: 1.6 }}>
              "{data.review}"
            </Typography>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

          {/* Status Editing Section */}
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.01)', p: 2, borderRadius: 2, border: '1px solid rgba(255,255,255,0.03)' }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main', mb: 2, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Moderation Actions
            </Typography>
            
            <RadioGroup 
              row 
              value={newStatus} 
              onChange={(e) => setNewStatus(e.target.value)}
              sx={{ mb: 2.5, gap: 2 }}
            >
              {[
                { val: 'Published', color: '#4ADE80', icon: <ThumbUpOutlinedIcon fontSize="inherit" /> },
                { val: 'Pending',   color: '#FFD700', icon: <HistoryIcon fontSize="inherit" /> },
                { val: 'Rejected',  color: '#F87171', icon: <BlockOutlinedIcon fontSize="inherit" /> },
              ].map(s => (
                <FormControlLabel 
                  key={s.val}
                  value={s.val} 
                  control={<Radio size="small" sx={{ color: 'rgba(255,255,255,0.2)', '&.Mui-checked': { color: s.color } }} />} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{s.val}</Typography>
                    </Box>
                  } 
                />
              ))}
            </RadioGroup>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={1}
                placeholder="Internal moderation note (optional)..."
                value={updateMessage}
                onChange={(e) => setUpdateMessage(e.target.value.substring(0, 70))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontSize: 12,
                    bgcolor: 'rgba(0,0,0,0.2)',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' }
                  }
                }}
              />
              <Button
                variant="contained"
                disableElevation
                disabled={!hasStatusChanged || isUpdating}
                onClick={handleApplyStatus}
                startIcon={isUpdating ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                sx={{ 
                  height: 40, 
                  px: 3, 
                  fontSize: 12, 
                  fontWeight: 700,
                  textTransform: 'none'
                }}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

          {/* History Section */}
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: theme.palette.text.disabled, mb: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Moderation History
            </Typography>
            
            {loadingHistory ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[1, 2].map(i => <Skeleton key={i} variant="rounded" height={50} sx={{ bgcolor: 'rgba(255,255,255,0.03)' }} />)}
              </Box>
            ) : history.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {history.map((h, i) => (
                  <HistoryItem key={i} item={h} />
                ))}
              </Box>
            ) : (
              <Typography sx={{ fontSize: 12, color: 'text.disabled', textAlign: 'center', py: 2, bgcolor: 'rgba(255,255,255,0.01)', borderRadius: 1.5 }}>
                No moderation activity yet.
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function HistoryItem({ item }) {
  const adminName = item.admin?.person?.names || item.admin?.username || 'Admin';
  const profilePic = item.admin?.person?.profilePicture;
  
  return (
    <Box sx={{ display: 'flex', gap: 1.5, p: 1.5, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)' }}>
      <Avatar src={profilePic} sx={{ width: 28, height: 28, fontSize: 12 }}>{adminName.charAt(0)}</Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>
            {adminName}
          </Typography>
          <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
          <StatusTinyBadge label={item.oldStatus} />
          <Typography sx={{ fontSize: 10, color: 'text.disabled' }}>→</Typography>
          <StatusTinyBadge label={item.newStatus} />
        </Box>

        {item.message && (
          <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 1, pl: 1, borderLeft: '2px solid rgba(255,215,0,0.3)' }}>
            "{item.message}"
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function StatusTinyBadge({ label }) {
  const color = STATUS_COLORS[label] || (label === 'pending' ? '#FFD700' : '#666');
  return (
    <Typography component="span" sx={{ fontSize: 9, fontWeight: 800, px: 1, py: 0.25, borderRadius: 4, bgcolor: `${color}15`, color: color, textTransform: 'uppercase' }}>
      {label}
    </Typography>
  );
}
