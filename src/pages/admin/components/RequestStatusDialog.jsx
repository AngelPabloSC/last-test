import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

export default function RequestStatusDialog({ open, onClose, data, onConfirm }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && open) {
      setStatus(data.status);
    }
  }, [data, open]);

  const handleSubmit = async () => {
    setLoading(true);
    await onConfirm(status);
    setLoading(false);
  };

  if (!data) return null;

  return (
    <Dialog 
      open={open} 
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Update Status
        <IconButton onClick={onClose} disabled={loading}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ color: 'text.secondary', mb: 3, fontSize: 14 }}>
          Change the status for <strong>{data.name}</strong>'s request:
        </Typography>
        
        <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)}>
          <Option value="nueva" label="Nueva (New)" color="#4ADE80" />
          <Option value="en_progreso" label="En Progreso (In Progress)" color="#60A5FA" />
          <Option value="completada" label="Completada (Completed)" color="#9CA3AF" />
          <Option value="cancelada" label="Cancelada (Canceled)" color="#F87171" />
        </RadioGroup>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading} sx={{ textTransform: 'none' }}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={loading || status === data.status} 
          variant="contained" 
          sx={{ 
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Option({ value, label, color }) {
  return (
    <FormControlLabel 
      value={value} 
      control={
        <Radio 
          size="small"
          sx={{ 
            color: '#444', 
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
        '&:hover': { bgcolor: 'rgba(255,255,255,0.03)' }
      }}
    />
  );
}
