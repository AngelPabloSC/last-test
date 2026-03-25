import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function RequestViewDialog({ open, onClose, data }) {
  if (!data) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Request Details
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
          <InfoRow label="Client Name" value={data.name} />
          
          <Box sx={{ display: 'flex', gap: 4 }}>
            <InfoRow label="Email" value={data.email} />
            <InfoRow label="Phone" value={data.phone} />
          </Box>
          
          <Divider sx={{ my: 0.5 }} />
          
          <Box>
            <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Project Description
            </Typography>
            <Typography sx={{ fontSize: 14, p: 2, bgcolor: 'background.default', borderRadius: 1, minHeight: 80 }}>
              {data.project || 'Client needs a full estimate regarding roofing improvements and potential siding repairs due to recent storm damages.'}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
      <Typography sx={{ fontSize: 12, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 15, fontWeight: 500 }}>
        {value || '-'}
      </Typography>
    </Box>
  );
}
