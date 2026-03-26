import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField, InputAdornment, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

export default function RequestStatusDialog({ open, onClose, data, onConfirm }) {
  const theme = useTheme();
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const MAX_MESSAGE_LENGTH = 70;

  useEffect(() => {
    if (data && open) {
      setStatus(data.status || 'New');
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
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        Update Request Status
        <IconButton onClick={onClose} disabled={loading} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers sx={{ pt: 2 }}>
        <Typography sx={{ color: 'text.secondary', mb: 2, fontSize: 13 }}>
          Changing status for: <strong>{data.names || data.name}</strong>
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, color: theme.palette.text.disabled }}>
            NEW STATUS
          </Typography>
          <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)}>
            <Option value="New"         label="New"             color="#FFD700" />
            <Option value="In Progress" label="In Progress" color="#60A5FA" />
            <Option value="Completed"   label="Completed"   color="#4ADE80" />
            <Option value="Canceled"    label="Canceled"    color="#F87171" />
          </RadioGroup>
        </Box>

        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1.5, color: theme.palette.text.disabled }}>
            UPDATE MESSAGE (Internal)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Describe the reason or latest action taken..."
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
            helperText={`${message.length}/${MAX_MESSAGE_LENGTH} characters`}
            FormHelperTextProps={{
              sx: { 
                textAlign: 'right', 
                color: message.length === MAX_MESSAGE_LENGTH ? 'error.main' : 'text.secondary',
                fontSize: 10,
                fontWeight: 600
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: 13,
                bgcolor: 'rgba(255,255,255,0.02)',
                '& fieldset': { borderColor: theme.palette.divider },
                '&:hover fieldset': { borderColor: theme.palette.text.disabled },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' }
              }
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, bgcolor: 'background.paper' }}>
        <Button 
          onClick={onClose} 
          disabled={loading} 
          sx={{ textTransform: 'none', color: '#888' }}
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
            borderRadius: '6px'
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Confirm Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Option({ value, label, color }) {
  const theme = useTheme();
  return (
    <FormControlLabel 
      value={value} 
      control={
        <Radio 
          size="small"
          sx={{ 
            color: theme.palette.text.disabled, 
            '&.Mui-checked': { color } 
          }} 
        />
      } 
      label={
        <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
          {label}
        </Typography>
      } 
      sx={{ 
        my: 0.5, 
        p: 1, 
        borderRadius: 1,
        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
      }}
    />
  );
}
