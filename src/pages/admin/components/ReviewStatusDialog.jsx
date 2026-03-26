import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  IconButton, 
  Box, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  TextField, 
  useTheme, 
  CircularProgress 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * ReviewStatusDialog
 * 
 * A focused dialog to update a review's status (Published or Rejected) with an optional admin comment.
 * 
 * Props:
 *  - open      {boolean}   — control visibility
 *  - onClose   {function}  — close the dialog
 *  - data      {object}    — the review object being updated
 *  - onConfirm {function}  async (status, message)
 */
export default function ReviewStatusDialog({ open, onClose, data, onConfirm }) {
  const theme = useTheme();
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const MAX_MESSAGE_LENGTH = 25;

  useEffect(() => {
    if (data && open) {
      // Standardize status for the radio selection
      const currentStatus = data.status?.toLowerCase();
      if (currentStatus === 'published' || currentStatus === 'rejected') {
        setStatus(data.status);
      } else {
        setStatus('Published'); // Default to published for new reviews
      }
      setMessage('');
    }
  }, [data, open]);

  const handleSubmit = async () => {
    setLoading(true);
    await onConfirm(status, message);
    setLoading(false);
  };

  if (!data) return null;

  const isChanged = status !== data.status || message.length > 0;

  return (
    <Dialog 
      open={open} 
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            bgcolor: '#111',
            borderRadius: '16px',
            border: '1px solid #1F1F1F',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
          }
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, color: 'white', fontWeight: 700 }}>
        Update Review Status
        <IconButton onClick={onClose} disabled={loading} size="small" sx={{ color: '#666', '&:hover': { color: 'white' } }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 2, borderColor: '#1F1F1F' }}>
        <Typography sx={{ color: '#888', mb: 2, fontSize: 13 }}>
          Updating moderation for: <strong style={{ color: 'white' }}>{data.fullName || data.client || data.name}</strong>
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, mb: 1, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            SELECT NEW STATUS
          </Typography>
          <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)}>
            <StatusOption value="Published" label="Publish to Website" color="#4ADE80" description="Visible to all users." />
            <StatusOption value="Rejected"  label="Reject Review"     color="#F87171" description="Hidden from public view." />
          </RadioGroup>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              ADMIN COMMENT (OPTIONAL)
            </Typography>
            <Typography sx={{ color: message.length === MAX_MESSAGE_LENGTH ? 'error.main' : '#4B5563', fontSize: 10, fontWeight: 700 }}>
              {message.length} / {MAX_MESSAGE_LENGTH}
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            placeholder="e.g. Validated and approved."
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: 13,
                color: 'white',
                bgcolor: '#0A0A0A',
                '& fieldset': { borderColor: '#1F1F1F' },
                '&:hover fieldset': { borderColor: '#333' },
                '&.Mui-focused fieldset': { borderColor: '#FFD700' }
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, bgcolor: '#111', justifyContent: 'flex-end', gap: 1 }}>
        <Button 
          onClick={onClose} 
          disabled={loading} 
          sx={{ textTransform: 'none', color: '#666', '&:hover': { color: 'white' } }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={loading || !isChanged} 
          variant="contained" 
          disableElevation
          sx={{ 
            textTransform: 'none',
            fontWeight: 700,
            px: 3,
            borderRadius: '8px',
            bgcolor: '#FFD700',
            color: 'black',
            '&:hover': { bgcolor: '#EAB308' },
            '&.Mui-disabled': { opacity: 0.5, bgcolor: '#FFD700' }
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Confirm Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function StatusOption({ value, label, color, description }) {
  return (
    <FormControlLabel 
      value={value} 
      control={
        <Radio 
          size="small"
          sx={{ 
            color: '#333', 
            '&.Mui-checked': { color } 
          }} 
        />
      } 
      label={
        <Box sx={{ ml: 0.5 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'white' }}>
            {label}
          </Typography>
          <Typography sx={{ fontSize: 11, color: '#666' }}>
            {description}
          </Typography>
        </Box>
      } 
      sx={{ 
        my: 0.5, 
        p: 1.5, 
        borderRadius: '12px',
        border: '1px solid #1F1F1F',
        width: '100%',
        mx: 0,
        transition: 'all 0.2s',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.03)', borderColor: '#333' }
      }}
    />
  );
}
