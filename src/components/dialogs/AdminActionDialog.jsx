import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogContentText, 
  DialogActions, Button 
} from '@mui/material';

/**
 * CONFIGURATION MAPPER
 * Add new modules here to keep them symmetric.
 */
const DIALOG_CONFIG = {
  blog: {
    itemType: 'article',
    updateTitle: 'Update Article?',
    saveTitle: 'Save Article?',
    publishText: 'The article will be saved. If status is Published, it will be visible on the site.',
    updateText: 'Are you sure you want to apply these changes to the live article?',
    visibilityText: (pStatus) => `Are you sure you want to ${pStatus === 'Visible' ? 'publish' : 'hide'} this article? This change will be immediately reflected on the server.`
  },
  gallery: {
    itemType: 'project',
    updateTitle: 'Update Project?',
    saveTitle: 'Publish Project?',
    publishText: 'This will make the project visible immediately on the public site gallery. This is a final action.',
    updateText: 'Changes will be applied and visible immediately on the public site gallery once updated.',
    visibilityText: (pStatus) => `Are you sure you want to ${pStatus === 'Visible' ? 'publish' : 'hide'} this project? This change will be immediately reflected on the server.`
  }
};

/**
 * StatusToggleDialog
 * Unified dialog for "Visible/Hidden" status changes.
 */
export const StatusToggleDialog = ({ open, onClose, onConfirm, pendingStatus, context = 'blog' }) => {
  const config = DIALOG_CONFIG[context] || DIALOG_CONFIG.blog;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { bgcolor: '#0A0A0A', border: '1px solid #333', borderRadius: '12px', minWidth: '400px' } }}
    >
      <DialogTitle sx={{ color: 'white', fontWeight: 700, pt: 3 }}>
        Change Publication Status?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
          {config.visibilityText(pendingStatus)}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>Cancel</Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          sx={{ 
            fontWeight: 800, px: 3, 
            bgcolor: pendingStatus === 'Visible' ? 'primary.main' : 'warning.main', 
            color: '#000',
            '&:hover': { bgcolor: pendingStatus === 'Visible' ? 'primary.dark' : 'warning.dark' }
          }}
        >
          Yes, Change Status
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * ActionConfirmDialog
 * Unified dialog for "Save / Update" final confirmation.
 */
export default function AdminActionDialog({ open, onClose, onConfirm, isEdit, context = 'blog' }) {
  const config = DIALOG_CONFIG[context] || DIALOG_CONFIG.blog;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { bgcolor: '#0A0A0A', border: '1px solid #333', borderRadius: '12px', minWidth: '400px' } }}
    >
      <DialogTitle sx={{ color: 'white', fontWeight: 700, pt: 3 }}>
        {isEdit ? config.updateTitle : config.saveTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
          {isEdit ? config.updateText : config.publishText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" sx={{ fontWeight: 800, px: 3 }}>
          {isEdit ? 'Yes, Update' : 'Yes, Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
