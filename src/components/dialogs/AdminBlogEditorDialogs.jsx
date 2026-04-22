import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, TextField 
} from '@mui/material';
export const LinkDialog = ({ open, onClose, onConfirm, onRemove, url, setUrl }) => (
  <Dialog 
    open={open} 
    onClose={onClose}
    PaperProps={{ sx: { bgcolor: '#0A0A0A', border: '1px solid #333', borderRadius: '12px', minWidth: '350px' } }}
  >
    <DialogTitle sx={{ color: 'white', fontWeight: 700 }}>Add Link</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        fullWidth
        label="URL (https://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onConfirm(); }}
        variant="filled"
        sx={{ mt: 1, '& .MuiFilledInput-root': { bgcolor: '#141414' } }}
      />
    </DialogContent>
    <DialogActions sx={{ p: 2, pt: 0 }}>
      <Button onClick={onRemove} color="error" sx={{ mr: 'auto', textTransform: 'none' }}>Remove Link</Button>
      <Button onClick={onClose} sx={{ color: 'rgba(255,255,255,0.4)' }}>Cancel</Button>
      <Button onClick={onConfirm} variant="contained" disabled={!url?.trim()}>Apply</Button>
    </DialogActions>
  </Dialog>
);
