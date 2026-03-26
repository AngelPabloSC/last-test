import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Divider, Avatar, Skeleton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const STATUS_COLORS = {
  'New':         '#FFD700',
  'In Progress': '#60A5FA',
  'Completed':   '#4ADE80',
  'Canceled':    '#F87171',
};

export default function RequestViewDialog({ open, onClose, data, getHistory }) {
  const theme = useTheme();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (open && data?.id && getHistory) {
      loadHistory();
    }
  }, [open, data?.id]);

  const loadHistory = async () => {
    setLoadingHistory(true);
    const res = await getHistory(data.id);
    setHistory(res);
    setLoadingHistory(false);
  };

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
      <DialogContent dividers sx={{ pb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <InfoRow label="Client Name" value={data.names || data.name} />
            <InfoRow label="Contact Status" value={data.status} isStatus />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 4 }}>
            <InfoRow label="Email" value={data.email} />
            <InfoRow label="Phone" value={data.phone} />
          </Box>
          
          <Divider sx={{ my: 0.5 }} />
          
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: theme.palette.text.secondary, mb: 1, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Project Description
            </Typography>
            <Typography sx={{ fontSize: 13, p: 2, bgcolor: theme.palette.background.default, border: `1px solid ${theme.palette.divider}`, borderRadius: 1, minHeight: 60, color: theme.palette.text.secondary, lineHeight: 1.6 }}>
              {data.project || 'No description provided.'}
            </Typography>
          </Box>

          <Divider sx={{ my: 0.5 }} />

          {/* History Section */}
          <Box>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: theme.palette.text.secondary, mb: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Status History & Activity
            </Typography>
            
            {loadingHistory ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[1, 2].map(i => <Skeleton key={i} variant="rounded" height={60} sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} />)}
              </Box>
            ) : history.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {history.map((h) => (
                  <HistoryItem key={h.id} item={h} />
                ))}
              </Box>
            ) : (
              <Typography sx={{ fontSize: 13, color: '#555', fontStyle: 'italic', textAlign: 'center', py: 2 }}>
                No status updates recorded yet.
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function HistoryItem({ item }) {
  const theme = useTheme();
  const adminName = item.admin?.person?.names || item.admin?.username || 'Admin';
  const profilePic = item.admin?.person?.profilePicture;
  
  return (
    <Box sx={{ display: 'flex', gap: 1.75, p: 1.5, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid #1f1f1f' }}>
      <Avatar src={profilePic} sx={{ width: 32, height: 32, fontSize: 14 }}>{adminName.charAt(0)}</Avatar>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: theme.palette.text.primary }}>
            {adminName}
          </Typography>
          <Typography sx={{ fontSize: 11, color: theme.palette.text.disabled }}>
            {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 0.5 }}>
          <StatusTinyBadge label={item.oldStatus} />
          <Typography sx={{ fontSize: 11, color: '#444' }}>→</Typography>
          <StatusTinyBadge label={item.newStatus} />
        </Box>

        {item.message && (
          <Typography sx={{ fontSize: 12, color: '#888', mt: 1, pl: 1, borderLeft: '2px solid #333' }}>
            "{item.message}"
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function StatusTinyBadge({ label }) {
  const color = STATUS_COLORS[label] || '#666';
  return (
    <Typography component="span" sx={{ fontSize: 10, fontWeight: 700, p: '2px 8px', borderRadius: 4, bgcolor: `${color}15`, color: color }}>
      {label}
    </Typography>
  );
}

function InfoRow({ label, value, isStatus }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </Typography>
      {isStatus ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: STATUS_COLORS[value] || '#666' }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: STATUS_COLORS[value] || '#fff' }}>
            {value}
          </Typography>
        </Box>
      ) : (
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: theme.palette.text.primary }}>
          {value || '-'}
        </Typography>
      )}
    </Box>
  );
}
