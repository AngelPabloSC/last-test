import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';

/**
 * GlobalDeleteDialog
 * Generic confirmation dialog for deletion actions.
 */
export default function GlobalDeleteDialog({ 
  open, 
  onClose, 
  onConfirm, 
  title = 'Delete Item?', 
  description = 'Are you sure you want to delete this item? This action cannot be undone.', 
  loading = false 
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#0A0A0A',
          border: '1px solid #1F1F1F',
          borderRadius: '16px',
          minWidth: { xs: '90%', sm: '400px' },
          boxShadow: '0 24px 80px rgba(0,0,0,0.8)',
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#fff', fontWeight: 700, pt: 3.5 }}>
        <Box sx={{ bgcolor: 'rgba(244, 67, 54, 0.1)', p: 1, borderRadius: '10px', display: 'flex' }}>
          <DeleteIcon sx={{ color: '#F44336' }} />
        </Box>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'rgba(255,255,255,0.6)', mt: 1, fontSize: '0.95rem' }}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3.5, pt: 2, gap: 1 }}>
        <Button 
          onClick={onClose} 
          disabled={loading}
          sx={{ 
            color: 'rgba(255,255,255,0.4)', 
            fontWeight: 700, 
            textTransform: 'none',
            '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.05)' }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          disabled={loading}
          sx={{ 
            bgcolor: '#F44336', 
            color: '#fff', 
            fontWeight: 800, 
            px: 3, 
            py: 1,
            borderRadius: '10px',
            textTransform: 'none',
            boxShadow: '0 8px 16px rgba(244, 67, 54, 0.2)',
            '&:hover': { bgcolor: '#D32F2F', boxShadow: '0 10px 20px rgba(244, 67, 54, 0.3)' },
            '&.Mui-disabled': { bgcolor: 'rgba(244, 67, 54, 0.3)', color: 'rgba(255,255,255,0.3)' }
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} color="inherit" />
              Deleting...
            </Box>
          ) : (
            'Yes, Delete'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
